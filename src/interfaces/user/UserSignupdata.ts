
export interface UserSignupdata {
    _id?: string;
    userName?:string|null,
    email:string|null,
    password:string |null,
    confirmPassword?:string|null;
    otp?:string[];
    role?:"user";
    isLogged?:boolean;
    
}