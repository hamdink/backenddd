
import { Admin } from '../schema/admin.schema';
import { LoginDto } from '../../auth/dto/login.dto';
import { AdminDto } from '../dto/admin.dto';

export interface AdminServiceInterface {
  create(adminDto: AdminDto): Promise<Admin>;
  findAll(page: number): Promise<{ admins: Admin[], total: number, totalPages: number }>;
  findOne(id: string): Promise<Admin>;
  update(id: string, admin: Admin): Promise<Admin>;
  delete(id: string): Promise<Admin>;
  login(loginDto: LoginDto): Promise<{ token: string }>;
  getJwtSecret(): { secret: string };
}
