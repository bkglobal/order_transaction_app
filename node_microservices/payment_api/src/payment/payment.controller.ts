import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PaymentStatus } from './config';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const status: number = Math.round(Math.random());
    if (status) {
      createPaymentDto.status = PaymentStatus.paid;
      return await this.service.create(createPaymentDto);
    } else {
      throw new InternalServerErrorException('Payment Unsuccessfull');
    }
  }
}
