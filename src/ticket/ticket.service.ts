import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket, UpdateTicket } from './interfaces/ticket';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plane } from '../plane/interfaces/plane';

@Injectable()
export class TicketService {
    constructor(
        @InjectModel('Ticket')
        private readonly ticketModel: Model<Ticket>,
        @InjectModel('Planes')
        private readonly planeModel: Model<Plane>,
      ) {}
      async CreateNewTicket(doc: CreateTicketDTO): Promise<Ticket> {
        const newTicket = new this.ticketModel({ 
            route: doc.route,
            price: doc.price,
            seat: doc.seat,
            date: doc.date,
            time: doc.time,
            ownerId: doc.ownerId,
            planeId: doc.planeId,
        })
        let plane = await this.planeModel.findById(doc.planeId)

        if (!plane) {
            throw new NotFoundException('Plane not found')
        }

        if (plane.seatsLeft[doc.seat-1] === undefined || doc.seat >= plane.seats) {
            throw new NotFoundException('Seat is invalid')
        }

        delete plane.seatsLeft[doc.seat-1]
        await plane.save()  
        await newTicket.save()
        return newTicket
      }

      async GetTickets(ownerId: string): Promise<Ticket[]> {
        const tickets = await this.ticketModel.find({ ownerId })
        return tickets
    }

    async GetTicket(_id: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(_id)

        if (!ticket) {
            throw new NotFoundException('Invalid id')
        }

        return ticket
    }

async DeleteTicket(_id: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findByIdAndDelete(_id)

        if (!ticket) {
          throw new NotFoundException('Invalid id')
        }

        let plane = await this.planeModel.findById(ticket.ownerId)

        plane.seatsLeft[ticket.seat-1] = ticket.seat 
        await plane.save()

        return ticket
    }


    async UpdateTicket(_id: string, recordToUpdate: UpdateTicket): Promise<Ticket> {
      
      
        const updates = Object.keys(recordToUpdate)
        const allowedUpdates = ['price', 'date', 'time', 'ownerId', 'planeId']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            throw new NotFoundException('Invalid updates')
        }

        const ticket = await this.ticketModel.findOne({ _id })

        if (!ticket) {
            throw new NotFoundException('Invalid id')
        }



        updates.forEach((update) => ticket[update] = recordToUpdate[update])
        await ticket.save()
        return ticket
    }
}
