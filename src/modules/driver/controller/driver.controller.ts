import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { DriverService } from "../services/driver.service";
import { Driver } from "../schema/driver.schema";
import { DriverDto } from "../dto/driver.dto";
import { JwtAuthGuard } from "src/modules/common/guard/jwt-auth.guard";
import { LoginDto } from "src/modules/auth/dto/login.dto";

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() driver: DriverDto) {
      return this.driverService.createDriver(driver);
  }

  @Get('all')
  async getAllDrivers() {
      return this.driverService.getAllDrivers();
  }

  @Get()
  async findAll(@Query('page') page: number) {
      return this.driverService.findAll(page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return this.driverService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() driver: Driver) {
      return this.driverService.update(id, driver);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
      return this.driverService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:name')
  async searchDriver(@Param('name') name: string) {
      return this.driverService.searchDriver(name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
      return this.driverService.login(loginDto);
  }
}
