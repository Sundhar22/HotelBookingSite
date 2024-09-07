import exp from "constants";

// definition UserType-> type of user
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };

export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCounts: number;
    childrenCounts: number;
    facilities: string[];
    imageUrls: string[];
    pricePer24h: number;
    starRating: number;
    lastUpdated: Date;
  };

  export type searchResponseType={

    data:HotelType[];
    pagination:{
      totalHotels:number;
      page:number;
      pages:number;
    }


  }