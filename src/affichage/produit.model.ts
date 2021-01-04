
export interface IProduit {
  id?: number;
  reference?: string;
  nom?: string;
  codeBarre?: string;
  description?: string;
  etat?: boolean;
  marque?: string;
  nature?: string;
  stockMinimum?: number;
  quantiteVenteMax?: number;
  horsStock?: boolean;
  typeService?: boolean;
  datePremption?: string;
  prixHT?: number;
  tauxTVA?: number;
  prixTTC?: number;
  rating?: string;
  eligibleRemise?: boolean;
  remise?: number;
  debutPromo?: string;
  finPromo?: string;
  imageContentType?: string;
  image?: any;
  creeLe?: string;
  creePar?: string;
  modifieLe?: string;
  modifiePar?: string;
  categorieNom?: string;
  categorieId?: number;
  sousCategorieNom?: string;
  sousCategorieId?: number;
  uniteCode?: string;
  uniteId?: number;
}

export const defaultValue: Readonly<IProduit> = {
  etat: false,
  horsStock: false,
  typeService: false,
  eligibleRemise: false,
};
