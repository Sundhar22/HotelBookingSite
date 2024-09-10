import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import { HotelType } from "../../../backend/src/shared/types"
type SearchResultCardProps = {
    hotel: HotelType
}

const SearchResultCard = ({ hotel }: SearchResultCardProps) => {
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-8 border border-slate-300 rounded-lg p-8">

                <div className="w-full h-[300px]">
                    <img src={hotel.imageUrls[0]} alt="hotel images" className="w-full h-full object-cover object-center" />
                </div>

                <div className="grid grid-rows-[1fr_2f_1fr]">
                    <div>
                        <div className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => <AiFillStar className="fill-yellow-400" />)}
                            <span className="ml-1 text-sm">{hotel.type}</span>

                        </div>
                        <Link className="text-xl font-semibold" to={`/detail/${hotel._id}`}>{hotel.name}</Link>
                    </div>

                    <div>
                        <p className="line-clamp-4 pt-3">{hotel.description}</p>
                    </div>

                    <div >
                        <div className="flex items-center justify-between pt-3 md:justify-start md:gap-2">
                            <div className="flex flex-wrap lg:flex-nowrap gap-1 items-center">
                                {hotel.facilities.slice(0, 3).map((facility) => (
                                    <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                        {facility}
                                    </span>
                                ))}
                            </div>
                            {hotel.facilities.length > 3 && (
                                <span className="text-sm col-span-3">
                                    +{hotel.facilities.length - 3} more
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-1 ">
                            <span className="font-bold">£{hotel.pricePer24h} per 24 hours</span>
                            <Link
                                to={`/detail/${hotel._id}`}
                                className="bg-blue-600 text-white h-full p-2 font-bold text-base rounded-sm max-w-fit hover:bg-blue-500"
                            >
                                View More
                            </Link>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default SearchResultCard