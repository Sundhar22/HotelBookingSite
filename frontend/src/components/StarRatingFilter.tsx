import React from "react";

type Props = {
    selectedRatings: string[];
    onChange(event: React.ChangeEvent<HTMLInputElement>): void
}
const StarRatingFilter = ({ selectedRatings, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5 rounded-sm">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {["5", "4", "3", "2", "1"].map((v) => (
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={v} checked={selectedRatings.includes(v)} onChange={onChange} />
                    <span >{v} {v === "1" ? "Star" : " Stars"}</span>
                </label>
            ))}
        </div>
    )
}

export default StarRatingFilter