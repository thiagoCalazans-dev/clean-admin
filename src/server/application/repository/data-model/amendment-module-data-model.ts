export interface AmendmentModule {
  id: string;
  amendmentId: string;
  moduleId: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AmendmentModuleCreate {
  amendmentId: string;
  moduleId: string;
  value: number;
}
