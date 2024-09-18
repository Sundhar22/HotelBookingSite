import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as api from "../api-client";
import GuestInfoForm from "../Forms/GuestInfoForm/GuestInfoForm";
const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-none lg:px-8">
                {children}
            </div>
        </div>
    );
};
const HotelDetail = () => {

    const { id } = useParams();

    const { data: hotel } = useQuery(
        "getHotelById", async () => {
            return api.getHotelById(id as string || "")

        },
        {
            enabled: !!id,
        }

    );
    console.log(hotel);
    return (
        <Container>
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="flex">
                            {Array.from({ length: hotel?.starRating || 0 }).map(() => (
                                <AiFillStar key={Math.random()} className="fill-yellow-400" />
                            ))}
                        </span>
                        <h1 className="text-3xl font-bold">{hotel?.name}</h1>
                    </div>
                    <p className="whitespace-pre-line">{hotel?.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {hotel?.imageUrls.map((image) => (
                        <div key={image} className="h-[300px]">
                            <img
                                src={image}
                                alt={hotel.name}
                                className="rounded-md w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    {hotel?.facilities.map((facility) => (
                        <div key={facility} className="border border-slate-300 rounded-sm p-3">
                            {facility}
                        </div>
                    ))}
                </div>

                <GuestInfoForm
                    hotelId={hotel?._id || ""}
                    pricePer24hrs={hotel?.pricePer24h || 0}
                />
            </div>
        </Container>
    )
}

export default HotelDetail

