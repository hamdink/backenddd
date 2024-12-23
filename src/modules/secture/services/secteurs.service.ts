import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Secteur } from '../schema/secteurs.schema';
import { CreateSecteurDto } from '../dto/secture.dto';
import { SecteurServiceInterface } from '../interfaces/secture.interface';
import { UpdateSecteurDto } from '../dto/updateSecture.dto';

@Injectable()
export class SecteurService implements SecteurServiceInterface {
  constructor(@InjectModel(Secteur.name) private secteurModel: Model<Secteur>) {}

  async create(createSecteurDto: CreateSecteurDto): Promise<Secteur> {
    const createdSecteur = new this.secteurModel(createSecteurDto);
    return createdSecteur.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ secteurs: Secteur[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    const secteurs = await this.secteurModel.find().skip(skip).limit(limit).exec();
    const total = await this.secteurModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);

    return { secteurs, total, totalPages };
  }

  async findOne(id: string): Promise<Secteur> {
    return this.secteurModel.findById(id).exec();
  }

  async update(id: string, updateSecteurDto: UpdateSecteurDto): Promise<Secteur> {
    return this.secteurModel.findByIdAndUpdate(id, updateSecteurDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Secteur> {
    return this.secteurModel.findByIdAndDelete(id).exec();
  }

  async search(query: string): Promise<Secteur[]> {
    const regex = new RegExp(query, 'i');
    const codePostal = parseInt(query, 10);

    return this.secteurModel.find({
        $or: [
            { name: { $regex: regex } },
            { codesPostaux: codePostal }
        ]
    }).exec();
}

  async fetchAll(): Promise<Secteur[]> {
    return this.secteurModel.find().exec();
  }
}
