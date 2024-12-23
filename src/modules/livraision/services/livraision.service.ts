import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livraison } from '../schema/livraision.schema';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { UpdateDriverDto } from '../dto/addDriver.dto';
import { LivraisonServiceInterface } from '../interfaces/livraision.interface';
import { Status } from '../../common/enums/status.enum';
import * as QRCode from 'qrcode';
import * as shortid from 'shortid';

@Injectable()
export class LivraisonService implements LivraisonServiceInterface {
    constructor(
        @InjectModel(Livraison.name) private livraisonModel: Model<Livraison>,
    ) {}

    async createLivraison(createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        const createdLivraison = new this.livraisonModel(createLivraisonDto);
    
        const shortId = shortid.generate();
        createdLivraison.shortId = shortId;
    
        const qrCodeData = await QRCode.toDataURL(`OrderID: ${shortId}`);
        createdLivraison.QRCode = qrCodeData;
    
        return createdLivraison.save();
    }

    async findAll(page: number = 1): Promise<{ livraisons: Livraison[], total: number, totalPages: number }> {
        const perPage = 10;
        const livraisons = await this.livraisonModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' })
            .populate('market')
            .populate('driver')
            .exec();

        const total = await this.livraisonModel.countDocuments().exec();
        const totalPages = Math.ceil(total / perPage);

        return { livraisons, total, totalPages };
    }

    async getAllOrder(): Promise<Livraison[]> {
        return this.livraisonModel.find().exec();
    }

    async findById(id: string): Promise<Livraison> {
        return this.livraisonModel
            .findById(id)
            .populate('client', '-password')
            .populate({
                path: 'products.productId',
                model: 'Product',
            })
            .populate('market')
            .populate('driver')
            .exec();
    }

    async findByCommande(numeroCommande: string): Promise<Livraison[]> {
        return this.livraisonModel
            .find({ NumeroCommande: numeroCommande })
            .populate('client', '-password')
            .populate({
                path: 'products.productId',
                model: 'Product',
            })
            .populate('market', '-password')
            .populate('driver', '-password')
            .exec();
    }

    async updateStatus(id: string, status: Status): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }

    async deleteCommande(id: string): Promise<Livraison> {
        return this.livraisonModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, createLivraisonDto, { new: true }).exec();
    }

    async updateDriver(id: string, updateDriverDto: UpdateDriverDto): Promise<Livraison> {
        const driverId = updateDriverDto.driver.toString(); 
        const distance = updateDriverDto.distance; 
        return this.livraisonModel.findByIdAndUpdate(
            id,
            { driver: driverId, distance: distance },  
            { new: true }
        ).exec();
    }
    

    async searchLivraison(searchTerm: string): Promise<Livraison[]> {
        const regex = new RegExp(searchTerm, 'i');
        return this.livraisonModel.find({
            $or: [
                { NumeroCommande: { $regex: regex } },
                { status: { $regex: regex } },
            ],
        })
        .populate('client', '-password')
        .populate({
            path: 'products.productId',
            model: 'Product',
        })
        .populate('market')
        .populate('driver')
        .exec();
    }

    async countPendingDeliveries(): Promise<number> {
        return this.livraisonModel.countDocuments({ status: 'En attente' }).exec();
    }

    async findLatestDeliveryForDriver(driverId: string): Promise<Livraison | null> {
        return this.livraisonModel
            .findOne({ driver: driverId })
            .sort({ createdAt: -1 })
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' })
            .populate('market')
            .populate('driver')
            .exec();
    }

    async findByShortId(shortId: string): Promise<Livraison | null> {
        return this.livraisonModel.findOne({ shortId }).exec();
    }
    async findByStatus(status: Status): Promise<Livraison[]> {
        return this.livraisonModel.find({ status }).populate('client', '-password').populate({ path: 'products.productId', model: 'Product' }).populate('market').populate('driver').exec();
    }
    async fetchByReference(reference: string): Promise<Livraison[]> {
        return this.livraisonModel.find({ reference: reference }) 
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' }) 
            .populate('market', '-image -password')
            .populate('driver')
            .exec();
    }
    
    async findByDriverAndDate(driverId: string, date: string): Promise<Livraison[]> {
        return this.livraisonModel.find({ driver: driverId, Date: date }).populate('client', '-password').populate({ path: 'products.productId', model: 'Product' }).populate('market','-password -image').populate('driver').exec();
    }
    async findByMarket(marketId: string, page: number = 1, searchTerm?: string): Promise<{ livraisons: Livraison[], total: number, totalPages: number }> {
        const perPage = 10;
        const query: any = { market: marketId };
    
        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            query.$or = [
                { NumeroCommande: { $regex: regex } },
                { status: { $regex: regex } },
                { 'client.first_name': { $regex: regex } },
                { 'driver.first_name': { $regex: regex } },
            ];
        }
    
        const livraisons = await this.livraisonModel
            .find(query)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' })
            .populate('market', '-password')
            .populate('driver', '-password')
            .exec();
    
        const total = await this.livraisonModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / perPage);
    
        return { livraisons, total, totalPages };
    }
    
    
}
