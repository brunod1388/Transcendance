import { Input } from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";

interface Props {
    divStyle: string;
}

export function LogInForm(props: Props) {
    const { divStyle } = props;
    const username = useInput("", "Login", "login", "text", true);
    const password = useInput("", "Password", "password", "password", true);

    return (
        <>
            <Input divStyle={divStyle} content={username} />
            <Input divStyle={divStyle} content={password} />
        </>
    );
}
