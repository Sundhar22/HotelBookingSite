import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedHotelFacilities: string[];
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
}
const HotelFacilitiesFilter = ({ selectedHotelFacilities, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5 rounded-sm">
            <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
            {hotelFacilities.map((v) => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={v} checked={selectedHotelFacilities.includes(v)} onChange={onChange} />
                    <span >{v}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelFacilitiesFilter