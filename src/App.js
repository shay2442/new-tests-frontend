import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [songs, setSongs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [likes, setLikes] = useState(0);
  const [books, setBooks] = useState([])

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
    .then((r) => r.json())
    .then((books) => setBooks(books))
  },[timerOn])

  useEffect(() => {
    fetch("http://localhost:3001/authors")
      .then((r) => r.json())
      .then((authors) =>
        setAuthors(authors.map((author) => ({ ...author, likes: 0 })))
      );
  }, [timerOn]);

  function handleLikes(e) {
    const newAuthors = authors.map((author) => {
      if (author.id === parseInt(e.target.id)) {
        return { ...author, likes: author.likes + 1 };
      } else {
        return { ...author };
      }
    });
    console.log("newAuthors", newAuthors);
    setAuthors(newAuthors);
  }

  function total() {
    books.map((book) => console.log(book.price.reduce((a,b) => parseInt(a + b))))
   
  }

  total()

  return (
    <div className="App">
      {time}
      <br></br>
      <button onClick={() => setTimerOn(true)}>Start</button>
      <button onClick={() => setTimerOn(false)}>Stop</button>
      <button onClick={() => setTime(0)}>Reset</button>
      <br></br>
      {authors.map((author) => {
        return (
          <h1>
            {author.name}
            <button id={author.id} onClick={handleLikes}>
              Like
            </button>
            {author.likes}
          </h1>
        );
      })}

      {books.map((book) => {
        return <h3>{book.title}, ${book.price}</h3>
      })}

      <h2>Total: $ {total}</h2>
    </div>
  );
}

export default App;
