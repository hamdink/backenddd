import { CreateSecteurDto } from "../dto/secture.dto";
import { Secteur } from "../schema/secteurs.schema";
import { UpdateSecteurDto } from "../dto/updateSecture.dto";

export interface SecteurServiceInterface {
    create(createSecteurDto: CreateSecteurDto): Promise<Secteur>;
    findAll(page: number, limit: number): Promise<{ secteurs: Secteur[], total: number, totalPages: number }>;
    findOne(id: string): Promise<Secteur>;
    update(id: string, updateSecteurDto: UpdateSecteurDto): Promise<Secteur>;
    delete(id: string): Promise<Secteur>;
    search(name: string): Promise<Secteur[]>;
}
