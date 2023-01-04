import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyComponent from './test';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function post () 
{
	fetch('http://localhost:3000/books',
		{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({title: "Biographie", author: "Van Damme", genre: "romantic"})
		});
	
}

async function addBook() {
	await post();
}
let one = false;

if (one === false){
	addBook();
	one = true;
}

root.render(
  <React.StrictMode>
    <App />
	<MyComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
