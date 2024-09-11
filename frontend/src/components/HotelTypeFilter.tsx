import React from "react";
import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedHotelTypes: string[];
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
}
const HotelTypeFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5 rounded-sm">
            <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
            {hotelTypes.map((v) => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={v} checked={selectedHotelTypes.includes(v)} onChange={onChange} />
                    <span >{v}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypeFilter