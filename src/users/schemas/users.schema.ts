import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
},{
  timestamps: true
});

// UserSchema.virtual('Tickets', {
//   ref: 'Tickets',
//   localField: '_id',
//   foreignField: 'owner'
// })
