import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProdcutDto } from "../dto/product.dto";
import { Product } from "../schema/product.schema";
import { ProductServiceInterface } from "../interfaces/product.interface";

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(@InjectModel(Product.name) private productsModle: Model<Product>) {}

    async createProduct(product: Product): Promise<Product> {
        const newProduct = new this.productsModle(product);
        return newProduct.save();
    }

    async create(product: ProdcutDto): Promise<Product> {
        const newProduct = new this.productsModle(product);
        return newProduct.save();
    }

    async findAllNoPage(): Promise<Product[]> {
        return this.productsModle.find().exec();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number, totalPages: number }> {
        const skip = (page - 1) * limit;
        const total = await this.productsModle.countDocuments();
        const products = await this.productsModle.find().skip(skip).limit(limit).exec();
        const totalPages = Math.ceil(total / limit);

        return {
            products,
            total,
            totalPages,
        };
    }
  
    async findOne(id: string): Promise<Product> {
        return this.productsModle.findById(id).exec();
    }

    async update(id: string, product: ProdcutDto): Promise<Product> {
        return this.productsModle.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(id: string): Promise<Product> {
        if (!id) throw new Error('Id is required');
        if (!await this.productsModle.findById(id)) throw new Error('Product not found');
        return this.productsModle.findByIdAndDelete(id);
    }

    async searchProduct(searchTerm: string): Promise<Product[]> {    
        const regex = new RegExp(searchTerm, 'i');
        return this.productsModle.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        }).exec();
    }
}
