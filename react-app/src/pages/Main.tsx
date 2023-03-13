import { SocketProvider } from "../context";
import { Home } from "../components/home";

function Main() {

    return (
        <SocketProvider>
            <Home />
        </SocketProvider>
    );
}

export { Main };
