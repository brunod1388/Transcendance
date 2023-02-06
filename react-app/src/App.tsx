// import "./App.css";
// import React from "react";
// import routes from "./data/routes";
// import { io, Socket } from "socket.io-client";
// import { EventLayer } from "./components/EventLayer/EventLayer";

// const SERVER_URL = "http://localhost:3000";
// const socket: Socket = io(SERVER_URL);

// function App() {
//     return (
//         <div className="app">
// 			{ routes }
//             <EventLayer />
//         </div>
//     );
// }
// export { socket, App };
// export default App;

import React from "react";

import Switch from "./Switch";
import Card from "./Card";
import "./assets/styles/index.css";

export default function App() {
    return (
        <div className="App">
            <h1>React context api</h1>
            <h2>Theme switch</h2>
            <Card />
            <Switch />
        </div>
    );
}
