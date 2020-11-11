import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { Ticket, UpdateTicket } from './interfaces/ticket';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @Post('add') 
    async newTicket(@Body() ticket: CreateTicketDTO): Promise<Ticket> {
        return await this.ticketService.CreateNewTicket(ticket)
    }

    @Get('all')
    async getTickets(@Body() ownerId: string): Promise<Ticket[]> {
        return await this.ticketService.GetTickets(ownerId)
    }

    @Get(':id')
    async getPlane(@Param('id') id): Promise<Ticket> {
        return await this.ticketService.GetTicket(id)
    }

    @Delete(':id')
    async deleteTicket(@Param('id') id): Promise<Ticket> {
        return await this.ticketService.DeleteTicket(id)
    }


    @Patch(':id')
    async updateTicket(@Param('id') id, @Body() recordToUpdate: UpdateTicket ): Promise<Ticket> {
        return await this.ticketService.UpdateTicket(id, recordToUpdate)
    }
}
