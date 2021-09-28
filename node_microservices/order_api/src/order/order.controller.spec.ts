import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderModule } from './order.module';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';

describe('OrderController', () => {
  let controller: OrderController;
  // let orderSerice: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
      imports: [HttpModule, Order],
      controllers: [OrderController],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    // orderSerice = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Get all orders', async () => {
    controller.index().then((result) => {
      expect(result).toEqual(expect.arrayContaining([expect.any({})]));
    });
  });
});
