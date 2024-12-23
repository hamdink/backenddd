import { Livraison } from "../schema/livraision.schema";
import { CreateLivraisonDto } from "../dto/livraison.dto";
import { UpdateDriverDto } from "../dto/addDriver.dto";

export interface LivraisonServiceInterface {
    createLivraison(livraison: CreateLivraisonDto): Promise<Livraison>;
    findAll(page: number): Promise<{ livraisons: Livraison[], total: number, totalPages: number }>;
    findById(id: string): Promise<Livraison>;
    findByCommande(numeroCommande: string): Promise<Livraison[]>;
    updateStatus(id: string, status: string): Promise<Livraison>;
    deleteCommande(id: string): Promise<Livraison>;
    update(id: string, livraison: CreateLivraisonDto): Promise<Livraison>;
    searchLivraison(search: string): Promise<Livraison[]>;
    updateDriver(id: string, updateDriverDto: UpdateDriverDto): Promise<Livraison>;
}
