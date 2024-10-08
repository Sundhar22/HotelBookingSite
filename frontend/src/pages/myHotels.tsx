import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const MyHotels = () => {

    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.getMyHotel,
        {
            onError: () => { },
        }
    );

    if (!hotelData) {
        return <span>No Hotels found</span>;
    }


    return (
        <div>

            <span className="flex items-center justify-between">

                <h1 className="font-semibold text-xl">My-Hotel</h1>

                <button className="bg-blue-700 p-3 text-white font-semibold rounded">
                    <Link to={"/add-hotel"}>Add Hotel</Link>
                </button>


            </span>




            <div className="grid  gap-4">

                {
                    hotelData.map(

                        (hotel) => (

                            <div key={hotel._id} className="bg-white shadow-md hover:shadow-lg p-4 rounded">


                                <h1 className="font-semibold text-xl">{hotel.name}</h1>
                                <div className="grid grid-cols-3 gap-3 m-3 ">{


                                    hotel.imageUrls.map((urls, i) => (


                                        <img src={urls} key={i} alt={hotel.name} className="w-full h-40 object-cover rounded" />

                                    ))

                                }</div>

                                <p className="m-3 line-clamp-2">{hotel.description}</p>

                                <div className="grid grid-cols-2 gap-3 m-3">
                                    <span> <span className="font-semibold ">City:</span> {hotel.city}</span>
                                    <span> <span className="font-semibold ">Country:</span> {hotel.country}</span>
                                    <span> <span className="font-semibold ">Adults:</span> {hotel.adultCounts}</span>
                                    <span> <span className="font-semibold "> Children: </span>  {hotel.childrenCounts}</span>
                                    <span> <span className="font-semibold ">Price:</span>  {hotel.pricePer24h}</span>
                                    <span>  <span className="font-semibold ">Rating:</span>   {hotel.starRating}</span>
                                </div>

                                <div className="flex justify-end   "><button className=" bg-blue-700 px-3 py-1 text-white font-semibold text-sm rounded"><Link to={`/edit-hotel/${hotel._id}`}>Edit</Link></button> </div>


                            </div>

                        )
                    )
                }

            </div>
        </div>
    );
}

export default MyHotels;