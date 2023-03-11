import "./assets/styles/App.scss";
import React from "react";
import { PropsWithChildren } from "react";
import { Route, Routes } from "react-router-dom";
import { useInvitation } from "./hooks";
import {
    Login,
    Home,
    Play,
    Subscribe,
    TwoFactorAuth,
    Verify2FA
} from "./pages";

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
                <Route path="play" element={<Play />} />
                <Route path="twofactor" element={<TwoFactorAuth />} />
                <Route path="verify2fa" element={<Verify2FA />} />
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
