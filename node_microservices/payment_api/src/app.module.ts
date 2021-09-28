import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    PaymentModule,
    MongooseModule.forRoot(
      'mongodb+srv://acfpuser:r8WQ68fcKrIU19lC@cluster0.opvmn.mongodb.net/orderPaymentDb?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
