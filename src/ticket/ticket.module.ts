import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './schemas/ticket.schema';
import { PlaneSchema } from '../plane/schemas/plane.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
    MongooseModule.forFeature([{ name: 'Planes', schema: PlaneSchema }])
  ],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
