import { Driver } from "../schema/driver.schema";
import { DriverDto } from "../dto/driver.dto";
import { LoginDto } from "src/modules/auth/dto/login.dto";

export interface DriverServiceInterface {
  createDriver(driverDto: DriverDto): Promise<Driver>;
  findAll(page: number): Promise<{ drivers: Driver[], total: number, totalPages: number }>;
  findOne(id: string): Promise<Driver>;
  update(id: string, driver: Driver): Promise<Driver>;
  delete(id: string): Promise<Driver>;
  searchDriver(searchTerm: string): Promise<Driver[]>;
  login(loginDto: LoginDto): Promise<{ token: string, role: string }>;
}
