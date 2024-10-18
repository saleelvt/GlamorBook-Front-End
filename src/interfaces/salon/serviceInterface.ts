


export interface ServiceInterface {
    _id?:string;
    serviceName:string;
    price:number;
    duration:number;
    availableSeats?:{seatNumber:number;isAvailable:boolean}[];
    availableTimeSlots: string[];
    salonId: string;
}