import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
      route: {
          type: String,
          required: true,
      },
      seat: {
          type: Number,
          required: true,
      },
      price: {
        type: Number,
        required: true,
    },
      date: {
          type: String,
          required: true,
      },
      time: {
          type: String,
          required: true,
      },
      ownerId: {
        type: String,
        required: true,
    },
    planeId: {
        type: String,
        required: true,
    }
  },{
  timestamps: true
  }
);