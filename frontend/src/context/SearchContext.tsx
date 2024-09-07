import React, { useState ,ReactNode} from "react";

export type SearchContext = {

    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultsCount: number;
    childrenCount: number;
    hotelId: string;
    saveSearchValue(
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultsCount: number,
        childrenCount: number,
    ): void;
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps ={
    children: ReactNode;
}

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckInDate] = useState<Date>(new Date());
    const [checkOut, setCheckOutDate] = useState<Date>(new Date());
    const [adultsCount, setAdultCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

    const saveSearchValue = (destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hotelId?: string) => {
    
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


export const useSearchContext = () => {
    const context = React.useContext(SearchContext);
    return context as SearchContext;
}