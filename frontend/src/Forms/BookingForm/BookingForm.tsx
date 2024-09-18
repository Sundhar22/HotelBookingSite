import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import * as api from "../../api-client";
import { UseAppContext } from "../../context/AppContext";
import { useSearchContext } from "../../context/SearchContext";
type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number;
};


const BookingForm = ({ currentUser, paymentIntent }: Props) => {

    const search = useSearchContext();
    const { id: hotelId } = useParams();
    const stripe = useStripe();
    const element = useElements();

    const { showToast } = UseAppContext()

    const { mutate: bookHotel, isLoading } = useMutation(api.createBooking, {

        onSuccess: () => {
            showToast({ message: "Booking created successfully", type: "SUCCESS" })
        }

        , onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }

    })


    const onSubmit = async (data: BookingFormData) => {
        if (!stripe || !element) return;

        const result = await stripe.confirmCardPayment(
            paymentIntent.clientSecret, {
            payment_method: {
                card: element.getElement(CardElement) as StripeCardElement,
                billing_details: {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email
                }
            }
        }
        )

        if (result.paymentIntent?.status === "succeeded") {
            bookHotel({ ...data, paymentIntentId: result.paymentIntent.id });
        }

    }

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultsCount,
            childCount: search.childrenCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        },
    });
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
        >
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("firstName")}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("lastName")}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>

                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: ${paymentIntent.totalCost}
                    </div>
                    <div className="text-xs">Includes taxes and charges</div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold"> Payment Details</h3>
                <CardElement
                    id="payment-element"
                    className="border rounded-md p-2 text-sm"
                />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold rounded-md hover:bg-blue-500 text-md disabled:bg-gray-500"
                >
                    {isLoading ? "Processing..." : "Confirm Booking"}
                </button>
            </div>
        </form>
    );
}

export default BookingForm