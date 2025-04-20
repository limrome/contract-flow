export interface IUser {
    type: "seller" | "manager";
    email: string;
    id: number;
    password: string;
    phone: string;
    company_name: string;
    name: string;
}