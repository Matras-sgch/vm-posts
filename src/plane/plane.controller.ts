import { Controller, Post, Body, Get, Delete, Param, Patch } from '@nestjs/common';
import { PlaneService } from './plane.service';
import { CreatePlaneDTO } from './dto/create-plane.dto';
import { Plane, UpdatePlane } from './interfaces/plane';

@Controller('planes')
export class PlaneController {
    constructor(private planeService: PlaneService) {}

    @Post('add') 
    async newPlane(@Body() plane: CreatePlaneDTO): Promise<Plane> {
        return await this.planeService.CreateNewPlane(plane)
    }

    @Get('all')
    async getPlanes(): Promise<Plane[]> {
        return await this.planeService.GetPlanes()
    }

    @Get(':id')
    async getPlane(@Param('id') id): Promise<Plane> {
        return await this.planeService.GetPlane(id)
    }

    @Delete(':id')
    async deletePlane(@Param('id') id): Promise<Plane> {
        return await this.planeService.DeletePlane(id)
    }


    @Patch(':id')
    async updatePlane(@Param('id') id, @Body() recordToUpdate: UpdatePlane ): Promise<Plane> {
        return await this.planeService.UpdatePlane(id, recordToUpdate)
    }
}
