export interface Module {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModuleCreate {
  name: string;
}
