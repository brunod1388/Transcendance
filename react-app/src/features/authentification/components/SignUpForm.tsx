import { Input } from "../../../components/Input";
import { useInput } from "../../../hooks/useInput";

interface Props {
    divStyle: string;
}

export function SignUpForm(props: Props) {
    const { divStyle } = props;
    const username = useInput("", "Login", "login", "text", true);
    const mail = useInput("", "Email", "mail", "mail", true);
    const pwd = useInput("", "Password", "pwd", "password", true);
    const repwd = useInput("", "Re-type Password", "repwd", "password", true);

    return (
        <>
            <Input divStyle={divStyle} content={username} />
            <Input divStyle={divStyle} content={mail} />
            <Input divStyle={divStyle} content={pwd} />
            <Input divStyle={divStyle} content={repwd} />
        </>
    );
}
