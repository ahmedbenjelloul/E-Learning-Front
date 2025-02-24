import { User } from "./user";

export class Cours {
  idCours: number | null | undefined;
  titre?: string | null;
  prix?: number | null;
  description?: string | null;
  formateur: number | undefined;  // Mettre User au lieu de number
  
}
