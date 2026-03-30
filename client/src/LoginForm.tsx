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

    const handleOnSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (login.length > 1 && password.length > 1) {
            doLogin({ login, password });
        }
    }, [login, password, doLogin]);

    return (<>
        <div className="flex flex-col items-center space-y-4 p-6 max-w-md mx-auto">
            <form onSubmit={handleOnSubmit}>
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="user (или demo)"
                    autoComplete="username"
                    value={login}
                    onChange={handleLogin}
                />
                <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="password (или demo2026)"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePassword}
                />
                <button
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >Login</button>
            </form>
        </div>
    </>
    );
}