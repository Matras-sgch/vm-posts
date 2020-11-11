import * as mongoose from 'mongoose';

export const PlaneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  route: {
      type: String,
      required: true,
  },
  seats: {
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
seatsLeft: {
  type: [Number],
  required: true,
}
},{
  timestamps: true
});
