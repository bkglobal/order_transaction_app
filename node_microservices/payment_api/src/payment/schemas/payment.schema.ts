import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentStatus } from '../config';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true, type: String, enum: PaymentStatus })
  status: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
