import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Market } from '../schema/market.schema';
import { CreateMarketDto } from '../dto/market.dto';
import { UpdateMarketDto } from '../dto/updateMarket.dto';
import { AuthService } from '../../auth/services/auth.service';
import { MarketServiceInterface } from '../interfaces/market.interface';
import { LoginDto } from '../../auth/dto/login.dto';
import { GeocodingService } from '../../geocoding/services/geocoding.service';  

@Injectable()
export class MarketService implements MarketServiceInterface {
  constructor(
    @InjectModel(Market.name) private marketModel: Model<Market>,
    private readonly authService: AuthService,
    private readonly geocodingService: GeocodingService,  
  ) {}

  async createMarket(createMarketDto: CreateMarketDto) {
    const hashedPassword = await bcrypt.hash(createMarketDto.password, 10);

    // Fetch coordinates using GeocodingService
    const { latitude, longitude } = await this.geocodingService.getCoordinates(createMarketDto.address);

    const newMarket = new this.marketModel({ 
      ...createMarketDto, 
      password: hashedPassword,
      numberMaInitial: createMarketDto.numberMa, 
      numberMiInitial: createMarketDto.numberMi, 
      latitude,  
      longitude,
    });

    return newMarket.save();
  }

  async updateUser(id: string, updateMarketDto: UpdateMarketDto): Promise<Market> { 
    if (updateMarketDto.password) {
      updateMarketDto.password = await bcrypt.hash(updateMarketDto.password, 10);
    }

 
    if (updateMarketDto.address) {
      const { latitude, longitude } = await this.geocodingService.getCoordinates(updateMarketDto.address);
      updateMarketDto.latitude = latitude;
      updateMarketDto.longitude = longitude;
    }

    const updatedMarket = await this.marketModel.findByIdAndUpdate(id, updateMarketDto, { new: true });
    if (!updatedMarket) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }
    return updatedMarket;
  }

  async getsMarkets(page: number = 1): Promise<{ markets: Market[], total: number, totalPages: number }> {
    const perPage = 10;
    const markets = await this.marketModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    const total = await this.marketModel.countDocuments().exec();
    const totalPages = Math.ceil(total / perPage);

    return { markets, total, totalPages };
  }

  getUserById(id: string) {
    return this.marketModel.findById(id);
  }

  deleteUser(id: string) {
    return this.marketModel.findByIdAndDelete(id);
  }

  async searchMarket(searchTerm: string) {
    return this.marketModel.find({
      $or: [
        { first_name: new RegExp(searchTerm, 'i') },
        { email: new RegExp(searchTerm, 'i') },
        { role: new RegExp(searchTerm, 'i') },
      ],
    }).exec();
  }
  

  async login(loginDto: LoginDto): Promise<{ token: string, role: string }> {
    return this.authService.login(loginDto);
  }

  async resetTotals(id: string): Promise<Market> {
    const market = await this.marketModel.findById(id);
    if (!market) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }

    market.numberMa = market.numberMaInitial;
    market.numberMi = market.numberMiInitial;

    return market.save();
  }

  async getAllMarkets(): Promise<Market[]> {
    return this.marketModel.find().exec();
  }

  async decreaseTotals(id: string, period: 'Matin' | 'Midi'): Promise<Market> {
    const market = await this.marketModel.findById(id);
    if (!market) {
      throw new NotFoundException(`Market with ID ${id} not found`);
    }

    if (period === 'Matin') {
      market.numberMa = Math.max(market.numberMa - 1, 0);
    } else if (period === 'Midi') {
      market.numberMi = Math.max(market.numberMi - 1, 0);
    }

    return market.save();
  }
}
