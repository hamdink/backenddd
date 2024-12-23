import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from '../services/admin.service';
import { Admin } from '../schema/admin.schema';
import { AdminDto } from '../dto/admin.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { RolesDecorator } from '../../common/decorators/roles.decorator';
import { LoginDto } from '../../auth/dto/login.dto';
import { Roles } from '../../common/enums/roles.enum';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() adminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(adminDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Admin)
  async findAll(@Param('page') page: number = 1) {
    return this.adminService.findAll(page);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Admin)
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Admin)
  async update(@Param('id') id: string, @Body() admin: Admin) {
    return this.adminService.update(id, admin);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.Admin)
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}