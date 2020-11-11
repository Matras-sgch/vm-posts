import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlane, Plane } from './interfaces/plane';
import { CreatePlaneDTO } from './dto/create-plane.dto';

@Injectable()
export class PlaneService {
    constructor(
        @InjectModel('Planes')
        private readonly planeModel: Model<Plane>,
      ) {}
      async CreateNewPlane(doc: CreatePlaneDTO): Promise<Plane> {
        let seatsLeft = []
        for (let i = 0; i < doc.seats; i++) {
            seatsLeft.push(i+1)
        }
        const newPlane = new this.planeModel({ 
            name: doc.name, 
            route: doc.route, 
            seats: doc.seats, 
            date: doc.date, 
            time: doc.time,
            seatsLeft
        })
        await newPlane.save()
        return newPlane
      }

      async GetPlanes(): Promise<Plane[]> {
          const planes = await this.planeModel.find()
          return planes
      }

      async GetPlane(id: string): Promise<Plane> {
          const plane = await this.planeModel.findById(id)
          return plane
      }

      async DeletePlane(_id: string): Promise<Plane> {
          const plane = await this.planeModel.findByIdAndDelete(_id)

          if (!plane) {
            throw new NotFoundException('Invalid id')
          }

          return plane
      }


      async UpdatePlane(_id: string, recordToUpdate: UpdatePlane): Promise<Plane> {
        
        // if(!plane) {
        //     throw new NotFoundException('Could not find any plane.')
        // }
        // const { name, age, seats, route, date } = recordToUpdate
        // await this.planeModel.
        const updates = Object.keys(recordToUpdate)
        const allowedUpdates = ['name', 'seats', 'route', 'date']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            throw new NotFoundException('Invalid updates')
        }

        const plane = await this.planeModel.findOne({ _id })

            if (!plane) {
                throw new NotFoundException('Invalid id')
            }

            updates.forEach((update) => plane[update] = recordToUpdate[update])
            await plane.save()
            return plane
      }
}
