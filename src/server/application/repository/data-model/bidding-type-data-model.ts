export interface BiddingType {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BiddingTypeCreate {
  name: string;
}
