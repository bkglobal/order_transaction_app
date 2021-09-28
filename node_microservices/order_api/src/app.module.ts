import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    OrderModule,
    MongooseModule.forRoot(
      'mongodb+srv://acfpuser:r8WQ68fcKrIU19lC@cluster0.opvmn.mongodb.net/orderPaymentDb?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
