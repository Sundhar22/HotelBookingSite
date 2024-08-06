import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Toast from "../components/Toast";

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

    const { isError } = useQuery('validateToken', apiClient.validateToken, {retry: false})


    return (
        <AppContext.Provider value={
            {
                showToast: (toast: ToastMessage) => {
                    setToast(toast);
                },
                isLogin: !isError,
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