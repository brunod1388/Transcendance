import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function post() {
  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Biographie",
      author: "Van Damme",
      genre: "romantic",
    }),
  });
}

async function addBook() {
  await post();
}
let one = false;

if (one === false) {
  addBook();
  one = true;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
