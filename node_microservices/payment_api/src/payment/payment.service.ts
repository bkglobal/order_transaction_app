import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly model: Model<PaymentDocument>,
  ) {}

  async findOne(id: string): Promise<Payment> {
    return await this.model.findById(id).exec();
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await new this.model({
      ...createPaymentDto,
      createdAt: new Date(),
    }).save();
  }
}
