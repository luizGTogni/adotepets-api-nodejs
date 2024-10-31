import { Prisma, type Pet } from '@prisma/client';

export interface FindAllParams {
  city: string;
  age?: number;
  size?: string;
  energy_level?: string;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
