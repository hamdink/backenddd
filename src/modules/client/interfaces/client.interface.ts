import { Client } from "../schema/client.schema";
import { ClientDto } from "../dto/client.dto";

export interface ClientServiceInterface {
    createClient(client: ClientDto): Promise<Client>;
    findAll(page: number): Promise<{ clients: Client[], total: number, totalPages: number }>;
    findById(id: string): Promise<Client>;
    update(id: string, client: Client): Promise<Client>;
    delete(id: string): Promise<Client>;
    searchClient(searchTerm: string): Promise<Client[]>;
}
