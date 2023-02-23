import { useEffect } from "react";
import { useAuth } from "../context";
import Cookies from "js-cookie";

export function useSignup(res: any) {
    const [Auth, { updateUser, updateToken }] = useAuth();
    const token = Cookies.get("JWTtoken");

    var TFAuth = false;
    var code = "";

    useEffect(() => {
        if (token) {
            updateToken(token);
        }
        if (res.data["url"]) {
            TFAuth = true;
            code = res.data["url"];
            console.log("OUTPUT: ", code);
        } else {
            console.log("DATA: ", res.data);
            updateUser(res.data);
            console.log("AUTH: ", Auth);
        }
    }, [res]);

    /*            axios({
            method: "post",
            url: "http://localhost:3000/auth/signup",
            withCredentials: true,
            headers: { crossorigin: "true" },
            data: {
                username: username.value,
                email: mail.value,
                password: pwd.value,
                confirmPassword: repwd.value,
                enable2FA: false,
                code2FA: "",
            },
        })
            .then((res) => {
                console.log("Return: ", res.data);
            })
            .catch((error) => {
                if (error.res) {
                    console.log("Error return: ", error.res.data);
                }
            });
*/
    /*            socket.emit("newUser",
            {
                username: username.value,
                email: mail.value,
                password: pwd.value,
                confirmPassword: repwd.value,
            },
            (res: string) => {
                console.log(res);
            }
        );
*/

    return {
        TFAuth,
        code,
    };
}
