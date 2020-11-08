import React, { Component } from "react";
import { Row, Container } from "../components/Grid";
import Button from "../components/Button";
import { Booklist, BookListItem } from "../components/Booklist";
import API from "../API";

class Search extends Component {

  state = {
    books: [],
    bookSearch: "",
    savedBooks: [],
    searched: ""
  };

  componentDidMount() {
    this.loadSavedBooks();
  }

  checkIfSaved = googleId => {
    for (let i in this.state.savedBooks) {
      if (this.state.savedBooks[i].googleId === googleId) return true;
    }
    return false;
  }

  checkSavedDate = googleId => {
    for (let i in this.state.savedBooks) {
      if (this.state.savedBooks[i].googleId === googleId) return API.getDate(this.state.savedBooks[i]._id);
    }
    return null;
  }

  loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res => {
        this.setState({ savedBooks: res.data });
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      searched: this.state.bookSearch,
      bookSearch: ""
    });
    API.getBooks(this.state.bookSearch)
      .then(res => this.setState({ books: res.data }, () => console.log(res.data)))
      .catch(err => console.log(err));
  };

  deleteSavedBook = (event, googleId) => {
    event.preventDefault();
    API.deleteSavedBook(googleId)
      .then(res => this.loadSavedBooks())
      .catch(err => console.log(err));
  };

  handleSave = (event, googleId, title, authors, description, href, pageCount, thumbnail) => {
    event.preventDefault();
    API.saveBook({ googleId, title, authors, description, href, pageCount, thumbnail })
      .then(res => this.loadSavedBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <div>
            <h1>Google Books Library</h1>
          </div>
        </Row>
        <Row>
          <div>
            <h4>Search</h4>
            <form>
              <div>
                <label htmlFor="bookSearch">Name of Book or Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="bookSearch"
                  name="bookSearch"
                  value={this.state.bookSearch}
                  onChange={this.handleInputChange} />
              </div>
              <Button onClick={this.handleFormSubmit}>Search</Button>
            </form>
          </div>
        </Row>
        <Row>
          <div>
            {this.state.searched === "" ? (
            <h4>Search Results</h4>
            ) : (
              <h4>Search Results for {this.state.searched}</h4>
            )}
            {!this.state.books.length ? (
              <h6>Nothing found.</h6>
            ) : (
                <Booklist>
                  {this.state.books.map(book => {
                    return (
                      <BookListItem
                        key={book.volumeInfo.infoLink}
                        googleId={book.id}
                        title={book.volumeInfo.title || "Title Not Found"}
                        authors={book.volumeInfo.authors || ["Author Not Found"]}
                        description={book.volumeInfo.description || "No description available"}
                        thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "img/placeholder.png"}
                        href={book.volumeInfo.infoLink}
                        pageCount={book.volumeInfo.pageCount}
                        saved={this.checkIfSaved(book.id)}
                        clickEvent={this.checkIfSaved(book.id)
                          ? this.deleteSavedBook
                          : this.handleSave}
                      />
                    );
                  })}
                </Booklist>
              )}
          </div>
        </Row>
      </Container>
    )
  }
}

export default Search;