import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MarketService } from '../services/market.service';
import { CreateMarketDto } from '../dto/market.dto';
import { UpdateMarketDto } from '../dto/updateMarket.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { RolesDecorator } from '../../common/decorators/roles.decorator';
import { LoginDto } from '../../auth/dto/login.dto';
import { Roles } from '../../common/enums/roles.enum';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.createMarket(createMarketDto);
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.marketService.getsMarkets(page);
  }
  @Get('all')
  async getAll() {
    return this.marketService.getAllMarkets();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.marketService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.updateUser(id, updateMarketDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.marketService.deleteUser(id);
  }

  @Get('search/:name')
  async searchMarket(@Param('name') name: string) {
    return this.marketService.searchMarket(name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.marketService.login(loginDto);
  }

  @Patch(':id/decrease/:period')
  decreaseTotals(@Param('id') id: string, @Param('period') period: 'Matin' | 'Midi') {
    return this.marketService.decreaseTotals(id, period);
  }

  
}
