export interface salonInterface {
  _id?: string;
  userName?: string | null;
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  address?: string | null;
  city?: string | null;
  salonName?: string | null;
  state?: string | null;
  zipCode?: string | null;
  phone?: string | null;
  otp?: string[];
  profilePicture?:string |null;
  images?:string[]|null
  role?:"salon";
  status?:string|null;
  seat?:object[]
  latitude?: number | null; // Add latitude
  longitude?: number | null; // Add longitude
}
