import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "ERROR" | "SUCCESS";
    onClose(): void
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    console.log("Toast rendered")

    useEffect(
        () => {
            const timer = setTimeout(() => { onClose() }, 5000);
            return () => {
                clearTimeout(timer)
            }
        },
        [onClose]
    );


    const style = type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md " : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md"

    return (
        <div className={style}>

            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>

        </div>
    )
}

export default Toast;