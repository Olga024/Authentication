import { useCallback } from "react";
import { useAppStateContext } from "./AppState";
import { LoginForm } from "./LoginForm";

export const AppBar = () => {
    const { loggedUser, doLogout } = useAppStateContext();

    const handleOnLogout = useCallback(() => {
        doLogout();
    }, [doLogout])

    return <div className="flex bg-gray-100 py-8">
        <div className="flex-1 pl-10">Neto Social</div>
        {!loggedUser && <LoginForm />}
        {loggedUser && <>
            <div className="flex items-center justify-center px-4 py-2">Hello, {loggedUser.login}</div>
            <img
                src={loggedUser.avatar}
                style={{
                    display: 'block',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid black',
                    margin: '0 10px'
                }}
            />
            <button className="bg-red-100 border-2 border-red-700 rounded-lg pr-20 text-red-700 flex items-center justify-center px-4 py-2"
                onClick={handleOnLogout}
            >Logout</button>
        </>}
    </div>
}