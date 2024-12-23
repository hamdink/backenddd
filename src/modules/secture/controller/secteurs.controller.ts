import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SecteurService } from "../services/secteurs.service";
import { CreateSecteurDto } from "../dto/secture.dto";
import { UpdateSecteurDto } from "../dto/updateSecture.dto";

@Controller('secture')
export class SecteurController {
    constructor(private readonly secteurService: SecteurService) {}

    @Post()
    async create(@Body() createSecteurDto: CreateSecteurDto) {
        return this.secteurService.create(createSecteurDto);
    }

    @Get()
    async findAll(@Query('page') page: number = 1) {
        return this.secteurService.findAll(page);
    }

    @Get('all')
    async fetchAll() {
        return this.secteurService.fetchAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.secteurService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateSecteurDto: UpdateSecteurDto) {
        return this.secteurService.update(id, updateSecteurDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.secteurService.delete(id);
    }

    @Get('search/:name')
    async search(@Param('name') name: string) {
        return this.secteurService.search(name);
    }
}
