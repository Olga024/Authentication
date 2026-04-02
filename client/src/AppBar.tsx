import { useCallback } from "react";
import { useAppStateContext } from "./AppState";
import { LoginForm } from "./LoginForm";

export const AppBar = () => {
    const { loggedUser, doLogout } = useAppStateContext();

    const handleOnLogout = useCallback(() => {
        doLogout();
    }, [doLogout])

    return (
        <div className="flex items-center justify-between bg-gray-100 py-8 px-10">
            {!loggedUser && <LoginForm />}
            {loggedUser && (
                <>
                    <div className="flex items-center space-x-3 mx-auto">
                        <span className="text-lg font-medium text-gray-700">Hello, {loggedUser.login}</span>
                        <img
                            src={loggedUser.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />
                    </div>
                    <button
                        className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg ml-auto"
                        onClick={handleOnLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}