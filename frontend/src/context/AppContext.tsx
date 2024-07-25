import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";

type ToastMessage = {
    message: string;
    type: "ERROR" | "SUCCESS";
}

type AppContext = {
    showToast(toast: ToastMessage): void;
    isLogin: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);




export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {


    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const isValid = useQuery('validateToken', apiClient.validateToken, {
        retry: false
    }) 

    return (
        <AppContext.Provider value={
            {
                showToast: (toast: ToastMessage) => { setToast(toast); },
                isLogin: !isValid,
            }
        }>
             {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    );

}

export const UseAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}