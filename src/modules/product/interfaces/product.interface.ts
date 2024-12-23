import { Product } from "../schema/product.schema";
import { ProdcutDto } from "../dto/product.dto";

export interface ProductServiceInterface {
    createProduct(product: ProdcutDto): Promise<Product>;
    findAll(page: number, limit: number): Promise<{ products: Product[], total: number, totalPages: number }>;
    findOne(id: string): Promise<Product>;
    update(id: string, product: ProdcutDto): Promise<Product>;
    delete(id: string): Promise<Product>;
    searchProduct(searchTerm: string): Promise<Product[]>;
}
