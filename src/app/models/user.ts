import { Role } from "./role";


export interface User {
    id?: number;
    login:string;
    nom: string;
  prenom: string;
  email: string;
  password: string;
  role?: Role;
  profileImage:string;
}
