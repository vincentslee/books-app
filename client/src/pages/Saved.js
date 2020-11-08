import React, { Component } from "react";
import { Row, Container } from "../components/Grid";
import { Booklist, BookListItem } from "../components/Booklist";
import API from "../API";

class Saved extends Component {

  state = {
    savedBooks: [],
  }

  componentDidMount() {
    this.loadSavedBooks();
  }

  loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({ savedBooks: res.data }))
  }

  deleteSavedBook = (event, googleId) => {
    event.preventDefault();
    API.deleteSavedBook(googleId)
      .then(res => this.loadSavedBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <div>
            <h1>Library</h1>
          </div>
        </Row>
        <Row>
          <div>
            <h4>Saved Books</h4>
            {!this.state.savedBooks.length ? (
              <h6>No books</h6>
            ) : (
                <Booklist>
                  {this.state.savedBooks.map(book => {
                    return (
                      <BookListItem
                        key={book.googleId}
                        googleId={book.googleId}
                        title={book.title}
                        authors={book.authors}
                        description={book.description}
                        thumbnail={book.thumbnail}
                        href={book.href}
                        pageCount={book.pageCount}
                        saved={true}
                        clickEvent={this.deleteSavedBook}
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

export default Saved;