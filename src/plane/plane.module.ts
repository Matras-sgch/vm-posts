import { Module } from '@nestjs/common';
import { PlaneService } from './plane.service';
import { PlaneController } from './plane.controller';
import { PlaneSchema } from './schemas/plane.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Planes', schema: PlaneSchema }])],
  providers: [PlaneService],
  controllers: [PlaneController]
})
export class PlaneModule {}
