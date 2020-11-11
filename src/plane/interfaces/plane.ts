import { Document } from 'mongoose';

export interface Plane extends Document {
    readonly name: string;
    readonly seats: number;
    readonly route: string;
    readonly date: string;
    readonly time: string;
    readonly seatsLeft: number[];
  }

export interface UpdatePlane {
    readonly name?: string;
    readonly seats?: number;
    readonly route?: string;
    readonly date?: string;
    readonly time?: string;
    readonly seatsLeft?: number[];
  }