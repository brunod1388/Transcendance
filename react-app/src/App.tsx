import "./App.scss";
import React from "react";
import { PropsWithChildren } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Subscribe from "./pages/Subscribe";
import Test from "./pages/TestPage";
import { useInvitation } from "./hooks";
import PongPage from "./pages/Pong";

function App() {
    // in the future use this to be sur to not access to the chat if no authentified
    // const { currentUser} = useContext(AuthContext);
    // Protect route against non authentificated users
    // needs to uncomment the if structure to work
    function ProtectedRoute(props: PropsWithChildren<any>): any {
        // if (!currentUser)
        //     return <Navigate to="/login" />;
        return props.children;
    }
    useInvitation();
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route index element={<Login />} />
                {/* TO DELETE LATER, only login and subscribe neeeded*/}
                <Route path="login" element={<Login />} />
                <Route path="subscribe" element={<Subscribe />} />
                <Route path="home" element={<Home />} />
                <Route path="test" element={<Test />} />
                <Route path="play" element={<Play />} />
                <Route path="pong" element={<PongPage />} />
                {/* <EventLayer /> */}
            </Route>
        </Routes>
    );
}
export { App };
export default App;

// import React from "react";

// import Switch from "./Switch";
// import Card from "./Card";
// import "./assets/styles/index.css";

// export default function App() {
//     return (
//         <div className="App">
//             <h1>React context api</h1>
//             <h2>Theme switch</h2>
//             <Card />
//             <Switch />
//         </div>
//     );
// }

// export { socket, App };
// export default App;
