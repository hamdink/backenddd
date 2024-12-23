import { Controller, Post, Body, Get, Param, Patch, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../dto/client.dto';
import { Client } from '../schema/client.schema';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() client: ClientDto) {
        return this.clientService.createClient(client);
    }

    @Get()
    async findAll(@Query('page') page: number = 1) {
        return this.clientService.findAll(page);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() client: Partial<Client>) {

        const updatedClient = await this.clientService.update(id, client);
        return updatedClient;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedClient = await this.clientService.delete(id);
        return deletedClient;
    }

    @Get('search/:name')
    async searchClient(@Param('name') name: string) {
        return this.clientService.searchClient(name);
    }

    @Get('all')
    async getAllClients() {
        return this.clientService.getAllClients();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Client> {
        return this.clientService.findById(id);
    }
}
