import React from "react";


function Navigation() {
  return (
    <nav>
      <a href="/">Library</a>

      <ul>
        <li>
          <a href="/">Search</a>
        </li>
        <li>
          <a href="/saved">View Library</a>
        </li>
      </ul>

    </nav>
  )
};

export default Navigation;