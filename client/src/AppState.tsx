import { createContext, type ProviderProps, useCallback, useContext, useEffect, useState } from "react";
import { requestWrapper } from "./requestWrapper";

type TLoggedUser = {
    id: string;
    login: string;
    name: string;
    password: string;
    avatar: string;
}

type TAppStateContext = {
    loggedUser: TLoggedUser | null;
    doLogin: (params: { login: string, password: string }) => void;
    doLogout: () => void;
};

const Context = createContext<TAppStateContext>({
    loggedUser: null,
    doLogin: () => { },
    doLogout: () => { },
});

type TAppStateContextParams = {};

export const AppStateProvider = ({ children }: ProviderProps<TAppStateContextParams>) => {
    const [loggedUser, setLoggedUser] = useState<TAppStateContext['loggedUser']>(null);

    const getLoggedUser = useCallback(() => {
        requestWrapper('private/me')
            .then((data) => setLoggedUser(data as TLoggedUser))
            .catch(() => setLoggedUser(null));
    }, [setLoggedUser]);

    const doLogin = useCallback(({ login, password }: { login: string, password: string }) => {
        requestWrapper(`auth`, {
            method: 'POST',
            body: JSON.stringify({ login, password }),
        })
            .then((data) => {
                const { token } = data as { token: string };
                localStorage.setItem('token', token);
                getLoggedUser();
            })
            .catch(error => console.error(error))
    }, [getLoggedUser]);

    const doLogout = useCallback(() => {
        localStorage.removeItem('token');
        getLoggedUser();
    }, []);

    useEffect(() => {
        getLoggedUser();
    }, []);

    return (
        <Context.Provider value={{
            loggedUser,
            doLogin,
            doLogout,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useAppStateContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useAppStateContext must be used within a AppStateProvider');
    }
    return context;
}