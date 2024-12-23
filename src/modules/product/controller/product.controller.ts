import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { ConfigService } from "@nestjs/config";
import { Product } from "../schema/product.schema";
import { ProdcutDto } from "../dto/product.dto";


 @Controller('product')
 export class ProductController{
    constructor(
        private readonly productService: ProductService,
        private readonly configService: ConfigService,
      ) {}
      @Post()
        async create(@Body() productDto: ProdcutDto): Promise<Product> {
            return this.productService.create(productDto);
        }
        @Get()
        async findAll(@Query('page') page: number){
            return this.productService.findAll(page);
        }
        @Get('all')
        async findAllNoPage(){
            return this.productService.findAllNoPage();
        }
        @Get(':id')
        async findOne(@Param('id') id: string) {
            return this.productService.findOne(id);
        }
        @Patch(':id')
        async update(@Param('id') id: string, @Body() product: ProdcutDto) {
            return this.productService.update(id, product);
        }
        @Delete(':id')
        async delete(@Param('id') id: string) {
            return this.productService.delete(id);
        }
        @Get('search/:name')
        async searchProduct(@Param('name') name: string) {
            return this.productService.searchProduct(name);
        }
 }