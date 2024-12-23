import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { LivraisonService } from '../services/livraision.service';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { UpdateDriverDto } from '../dto/addDriver.dto';
import { Livraison } from '../schema/livraision.schema';
import { Status } from '../../common/enums/status.enum';
import { UpdateLivraisonStatusDto } from '../dto/update-livraison-status.dto';

@Controller('livraison')
export class LivraisonController {
    constructor(private readonly livraisonService: LivraisonService) {}

    @Post()
    async create(@Body() createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.createLivraison(createLivraisonDto);
    }

    @Get()
    async findAll(@Query('page') page: number = 1): Promise<{ livraisons: Livraison[], total: number, totalPages: number }> {
        return this.livraisonService.findAll(page);
    }

    @Get(':NumeroCommande')
    async findByCommande(@Param('NumeroCommande') NumeroCommande: string): Promise<Livraison[]> {
        return this.livraisonService.findByCommande(NumeroCommande);
    }

    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Body() updateLivraisonStatusDto: UpdateLivraisonStatusDto): Promise<Livraison> {
        const { status } = updateLivraisonStatusDto;
        return this.livraisonService.updateStatus(id, status);
    }

    @Patch(':id/driver')
    async updateDriver(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto): Promise<Livraison> {
        return this.livraisonService.updateDriver(id, updateDriverDto);
    }

    @Delete(':id')
    async deleteCommande(@Param('id') id: string): Promise<Livraison> {
        return this.livraisonService.deleteCommande(id);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Livraison> {
        return this.livraisonService.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonService.update(id, updateLivraisonDto);
    }

    @Get('search/:search')
    async searchLivraison(@Param('search') search: string): Promise<Livraison[]> {
        return this.livraisonService.searchLivraison(search);
    }

    @Get('pending/count')
    async getPendingDeliveriesCount(): Promise<{ count: number }> {
        const count = await this.livraisonService.countPendingDeliveries();
        return { count };
    }

    @Get('all')
    async getAllOrder(): Promise<Livraison[]> {
        return this.livraisonService.getAllOrder();
    }

    @Patch('scan-qr/:id')
    async scanQRCode(@Param('id') id: string): Promise<Livraison> {
        return this.livraisonService.updateStatus(id, Status.LIVRE);
    }
    
    @Get('latest/:driverId')
    async getLatestDeliveryForDriver(@Param('driverId') driverId: string): Promise<Livraison | null> {
        return this.livraisonService.findLatestDeliveryForDriver(driverId);
    }

    @Get('shortId/:shortId')
    async findByShortId(@Param('shortId') shortId: string): Promise<Livraison> {
        return this.livraisonService.findByShortId(shortId);
    }
    @Get('byStatus/:status')
    async findByStatus(@Param('status') status: Status): Promise<Livraison[]> {
        return this.livraisonService.findByStatus(status);
    }
    @Get('reference/:ref')
    async findByRef(@Param('ref') ref: string): Promise<Livraison[]> {
        return this.livraisonService.fetchByReference(ref);
    }
    @Get('driver/:driverId')
    async findByDriverAndDate(@Param('driverId') driverId: string, @Query('date') date: string): Promise<Livraison[]> {
        return this.livraisonService.findByDriverAndDate(driverId, date);
    }
    @Get('market/:marketId')
    async findByMarket(
        @Param('marketId') marketId: string,
        @Query('page') page: number = 1,
        @Query('searchTerm') searchTerm?: string
    ): Promise<{ livraisons: Livraison[], total: number, totalPages: number }> {
        return this.livraisonService.findByMarket(marketId, page, searchTerm);
    }
    
}
