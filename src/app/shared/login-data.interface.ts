import {IUser} from "./user.interface";
export interface ILoginData {
loginP: string;
hashed: string;
user: IUser;
accessFlow?: string;
}
