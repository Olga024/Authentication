import { useCallback, useState } from "react";
import { useAppStateContext } from "./AppState";


export const LoginForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { doLogin } = useAppStateContext();

    const handleLogin = useCallback(({ target: { value } }: any) => {
        setLogin(value);
    }, [setLogin]);

    const handlePassword = useCallback(({ target: { value } }: any) => {
        setPassword(value);
    }, [setPassword])

    const handleOnSubmit = useCallback(() => {
        if (login.length > 1 && password.length > 1) {
            doLogin({ login, password });
        }
    }, [login, password]);

    return (<>
        <input
            placeholder="Username"
            onKeyUp={handleLogin}
        />
        <input
            placeholder="Password"
            type="password"
            onKeyUp={handlePassword}
        />
        <button
            className="bg-gray-100 border-2 border-lime-700 rounded-lg pr-20 text-lime-700 flex items-center justify-center px-4 py-2"
            onClick={handleOnSubmit}
        >Login</button>
    </>
    );
}