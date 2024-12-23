import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientDto } from "../dto/client.dto";
import { Client } from "../schema/client.schema";
import { ClientServiceInterface } from "../interfaces/client.interface";
import { GeocodingService } from "../../geocoding/services/geocoding.service";  // Import the GeocodingService

@Injectable()
export class ClientService implements ClientServiceInterface {
    constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>,
        private readonly geocodingService: GeocodingService  
    ) {}

    async createClient(clientDto: ClientDto): Promise<Client> {
        const { address1, address2 } = clientDto;
    
        // Fetch the coordinates for the given address1
        const coordinates = await this.geocodingService.getCoordinates(address1);
        
        if (!coordinates) {
            throw new Error('Unable to fetch coordinates for the provided address');
        }
    
        // Add the longitude and latitude to the client data
        const clientData = {
            ...clientDto,
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
            address2: address2, // Ensure address2 is included in the client data
        };
    
        const createdClient = new this.clientModel(clientData);
        return createdClient.save();
    }
    async findAll(page: number = 1): Promise<{ clients: Client[], total: number, totalPages: number }> {
        const perPage = 10;  
        const clients = await this.clientModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage) 
            .exec();

        const total = await this.clientModel.countDocuments().exec();
        const totalPages = Math.ceil(total / perPage);

        return { clients, total, totalPages };
    }

    async update(id: string, clientDto: Partial<ClientDto>): Promise<Client> {
        const { address1 } = clientDto;

        let updatedData = { ...clientDto };

        if (address1) {
            // Fetch the coordinates if the address is being updated
            const coordinates = await this.geocodingService.getCoordinates(address1);
            if (!coordinates) {
                throw new Error('Unable to fetch coordinates for the updated address');
            }
            updatedData = {
                ...updatedData,
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
            };
        }

        return this.clientModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true }).exec();
    }

    async delete(id: string): Promise<Client> {
        return this.clientModel.findByIdAndDelete(id).exec();
    }

    async searchClient(searchTerm: string): Promise<Client[]> {
        const regex = new RegExp(searchTerm, 'i');
        return this.clientModel.find({
            $or: [
                { first_name: { $regex: regex } },
                { last_name: { $regex: regex } }
            ]
        }).exec();
    }

    async getAllClients(): Promise<Client[]> {
        return this.clientModel.find().exec();
    }

    async findById(id: string): Promise<Client> {
        return this.clientModel.findById(id).exec(); 
    }
}
