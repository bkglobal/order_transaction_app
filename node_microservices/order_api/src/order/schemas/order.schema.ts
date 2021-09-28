import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStates } from '../config';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  products?: string[];

  @Prop({ required: true, type: String, enum: OrderStates })
  state: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
