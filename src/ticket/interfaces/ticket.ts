import { Document } from 'mongoose';

export interface Ticket extends Document {
  readonly route: String;
  readonly seat: number;
  readonly price: Number;
  readonly date: String;
  readonly time: String;
  readonly ownerId: String;
  readonly planeId: String;
}

export interface UpdateTicket {
  readonly route?: String;
  readonly seat?: number;
  readonly price?: Number;
  readonly date?: String;
  readonly time?: String;
  readonly ownerId?: String;
  readonly planeId?: String;
}