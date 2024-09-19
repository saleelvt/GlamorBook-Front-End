export  interface SalonInterface {
  _id?: string;
  userName: string 
  email: string 
  password: string
  confirmPassword?: string |null
  city?: string | null;
  salonName?: string 
  state?: string | null;
  phone?: string | null;
  otp?: string[];
  profilePicture?:string |null;
  images?:string[]|null
  licenseDocument?: string;
  role?:"salon";
  status?:string|null;
  seat?: { seatNumber: number; description?: string }[]; // Structured array for seats
  latitude?: number | null; // Add latitude
  longitude?: number | null; // Add longitude
}



