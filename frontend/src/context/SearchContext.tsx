import React, { ReactNode, useState } from "react";

export type SearchContext = {

    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultsCount: number;
    childrenCount: number;
    hotelId?: string;
    saveSearchValue(
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultsCount: number,
        childrenCount: number,
        hotelId?: string
    ): void;
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: ReactNode;
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("destination") || "");
    const [checkIn, setCheckInDate] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOutDate] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultsCount, setAdultCount] = useState<number>(parseInt(sessionStorage.getItem("adultsCount") || '1'));
    const [childrenCount, setChildrenCount] = useState<number>(parseInt(sessionStorage.getItem("childrenCount") || '0'));
    const [hotelId, setHotelId] = useState<string>(sessionStorage.getItem("hotelId") || '');

    const saveSearchValue = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string) => {
        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultsCount", adultCount.toString());
        sessionStorage.setItem("childrenCount", childCount.toString());
        if (hotelId) {
            sessionStorage.setItem("hotelId", hotelId);
        }

        setDestination(destination);
        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);
        setAdultCount(adultCount);
        setChildrenCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
    };

    return (
        <SearchContext.Provider value={{ destination, checkIn, checkOut, adultsCount, childrenCount, hotelId, saveSearchValue }}>
            {children}
        </SearchContext.Provider>)

}


export const useSearchContext = () => React.useContext(SearchContext) as SearchContext;
