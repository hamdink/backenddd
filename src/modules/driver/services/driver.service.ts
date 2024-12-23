import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { Driver } from "../schema/driver.schema";
import { DriverDto } from "../dto/driver.dto";
import { DriverServiceInterface } from "../interfaces/driver.interface";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/modules/auth/services/auth.service";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { Roles } from "src/modules/common/enums/roles.enum";

@Injectable()
export class DriverService implements DriverServiceInterface {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async createDriver(driverDto: DriverDto): Promise<Driver> {
    const hashedPassword = await bcrypt.hash(driverDto.password, 10);
    const newDriver = new this.driverModel({ ...driverDto, password: hashedPassword });
    return newDriver.save();
  }

  async getAllDrivers(): Promise<Driver[]> {
    const drivers = await this.driverModel.find().exec();
    return drivers;
}


  // Pagination method remains for other use cases
  async findAll(page: number = 1): Promise<{ drivers: Driver[], total: number, totalPages: number }> {
    const perPage = 10;
    const drivers = await this.driverModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    const total = await this.driverModel.countDocuments().exec();
    const totalPages = Math.ceil(total / perPage);

    return { drivers, total, totalPages };
  }

  async findOne(id: string): Promise<Driver> {
    return this.driverModel.findById(id).exec();
  }

  async update(id: string, driver: Partial<Driver>): Promise<Driver> {
    if (driver.password) {
      const hashedPassword = await bcrypt.hash(driver.password, 10);
      driver.password = hashedPassword;
    }

    if (driver.email) {
      const existingDriver = await this.driverModel.findOne({ email: driver.email }).exec();
      if (existingDriver && existingDriver._id.toString() !== id) {
        throw new Error('A driver with this email already exists');
      }
    }

    return this.driverModel.findByIdAndUpdate(id, driver, { new: true }).exec();
  }

  async delete(id: string): Promise<Driver> {
    if (!id) throw new Error('Id is required');
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new Error('Driver not found');
    return this.driverModel.findByIdAndDelete(id).exec();
  }

  async searchDriver(searchTerm: string) {
    return this.driverModel.find({
      $or: [
        { first_name: new RegExp(searchTerm, 'i') },
        { last_name: new RegExp(searchTerm, 'i') },
        { email: new RegExp(searchTerm, 'i') },
        { role: new RegExp(searchTerm, 'i') },
      ],
    }).exec();
  }
  
  async login(loginDto: LoginDto): Promise<{ token: string, role: string, userId: string }> {
    const { token, role, userId } = await this.authService.login(loginDto);
    console.log(`DriverService login - role: ${role}`);
    if (role !== Roles.Driver) {
      throw new UnauthorizedException('Invalid login for driver');
    }
    return { token, role, userId };
  }
}
