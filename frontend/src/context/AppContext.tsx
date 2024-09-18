import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";
import Toast from "../components/Toast";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;


type ToastMessage = {
    message: string;
    type: "ERROR" | "SUCCESS";
}

type AppContext = {
    showToast(toast: ToastMessage): void;
    isLogin: boolean;
    stripePromise: Promise<Stripe | null>;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);


const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {


    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery('validateToken', apiClient.validateToken, { retry: false })


    return (
        <AppContext.Provider value={
            {
                showToast: (toast: ToastMessage) => {
                    setToast(toast);
                },
                isLogin: !isError,
                stripePromise: stripePromise
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