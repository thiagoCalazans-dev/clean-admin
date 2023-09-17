export interface Supplier {
  id: string;
  name: string;
  corporateName: string;
  cnpj: string;
  zipcode: string;
  city: string;
  neighborhood: string;
  address: string;
  number: number;
  observation?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SupplierCreate {
  name: string;
  corporateName: string;
  cnpj: string;
  zipcode: string;
  city: string;
  neighborhood: string;
  address: string;
  number: number;
  observation?: string;
  
}
