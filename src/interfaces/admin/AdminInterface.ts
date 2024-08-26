
export interface AdminInterface{

    _id?:string;
    email:string;
    userName?:string;
    password: string;
    confirmPassword?: string;
    role?:'admin';
}