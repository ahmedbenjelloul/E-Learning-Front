import { Role } from "./role";

export interface RegisterRequest {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  role?: Role;
  login:string;
  profileImage:string;
 
  
}