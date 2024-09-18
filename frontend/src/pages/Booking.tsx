
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { UseAppContext } from '../context/AppContext';
import { useSearchContext } from '../context/SearchContext';
import BookingForm from '../Forms/BookingForm/BookingForm';
const Booking = () => {

    const { stripePromise } = UseAppContext();
    const search = useSearchContext();
    const { id: hotelId } = useParams();

    const { data: currentUser } = useQuery(
        "fetchCurrentUser"
        , apiClient.fetchCurrentUser,
    );

    const { data: hotel } = useQuery(
        "fetchHotelByID",
        () => apiClient.getHotelById(hotelId as string),
        {
            enabled: !!hotelId,
        }
    );

    const [numberOfHrs, setNumberOfHrs] = useState<number>(0);


    const { data: paymentIntent } = useQuery(
        "createPaymentIntent",
        () => apiClient.createPaymentIntent(hotelId as string, numberOfHrs.toString()),
        {
            enabled: !!hotelId && numberOfHrs > 0
        }
    )


    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const hrs =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);

            setNumberOfHrs(Math.ceil(hrs));
        }
    }, [search.checkIn, search.checkOut]);

    if (!hotel) {
        return <></>;
    }

    return (
        <div className="grid md:grid-cols-[1fr_2fr] gap-3">
            <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultsCount}
                childCount={search.childrenCount}
                numberOf24Hrs={numberOfHrs}
                hotel={hotel}
            />
            {

                currentUser && paymentIntent &&
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: paymentIntent.client_secret }} >
                    <BookingForm currentUser={currentUser}  paymentIntent={paymentIntent}/>
                </Elements>
                
            }
        </div>
    );
}

export default Booking