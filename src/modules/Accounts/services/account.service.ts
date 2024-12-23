import { Injectable } from '@nestjs/common';
import { AdminService } from '../../admin/services/admin.service';
import { DriverService } from '../../driver/services/driver.service';
import { MarketService } from '../../market/services/market.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly adminService: AdminService,
    private readonly driverService: DriverService,
    private readonly marketService: MarketService,
  ) {}

  async findAll(page: number = 1) {
    const { admins, total: totalAdmins, totalPages: adminPages } = await this.adminService.findAll(page);
    const { drivers, total: totalDrivers, totalPages: driverPages } = await this.driverService.findAll(page);
    const { markets, total: totalMarkets, totalPages: marketPages } = await this.marketService.getsMarkets(page);

    const users = [
      ...admins.map(admin => ({ 
        ...admin, 
        role: 'Admin', 
        displayName: admin.name || 'Unnamed Admin' 
      })),
      ...drivers.map(driver => ({ 
        ...driver, 
        role: 'Driver', 
        displayName: `${driver.first_name || 'Unnamed'} ${driver.last_name || 'Driver'}`.trim()
      })),
      ...markets.map(market => {
        const { image, ...rest } = market; 
        return { 
          ...rest, 
          role: 'Market', 
          displayName: market.first_name || 'Unnamed Market' 
        };
      }),
    ];

    const totalPages = Math.max(adminPages, driverPages, marketPages);
    const total = totalAdmins + totalDrivers + totalMarkets;

    // Sort users by displayName
    const sortedUsers = users.sort((a, b) => a.displayName.localeCompare(b.displayName));

    return { users: sortedUsers, total, totalPages };
  }

  async searchUsers(searchTerm: string) {
    // Trim the search term and check if it's still empty
    const trimmedTerm = (searchTerm || '').trim();
  
    console.log(`Trimmed search term: '${trimmedTerm}'`);
  
    if (!trimmedTerm) {
      console.log('Search term is empty or invalid.');
      return [];
    }
    
    console.log(`Searching for term: ${trimmedTerm}`);
    
    const [adminResults, driverResults, marketResults] = await Promise.all([
      this.adminService.searchAdmins(trimmedTerm),
      this.driverService.searchDriver(trimmedTerm),
      this.marketService.searchMarket(trimmedTerm),
    ]);
  
    console.log('Admin search results:', adminResults);
    console.log('Driver search results:', driverResults);
    console.log('Market search results:', marketResults);
    
    const users = [
      ...adminResults.map(admin => ({ 
        ...admin, 
        role: 'Admin', 
        displayName: admin.name || 'Unnamed Admin' 
      })),
      ...driverResults.map(driver => ({ 
        ...driver, 
        role: 'Driver', 
        displayName: `${driver.first_name || 'Unnamed'} ${driver.last_name || 'Driver'}`.trim()
      })),
      ...marketResults.map(market => {
        const { image, ...rest } = market; 
        return { 
          ...rest, 
          role: 'Market', 
          displayName: market.first_name || 'Unnamed Market' 
        };
      }),
    ];
  
    console.log('Combined users before filtering:', users);
  
    const filteredUsers = users.filter(user => 
      user.displayName.toLowerCase().includes(trimmedTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(trimmedTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(trimmedTerm.toLowerCase())
    );
  
  
    return filteredUsers;
  }
  
  
}
