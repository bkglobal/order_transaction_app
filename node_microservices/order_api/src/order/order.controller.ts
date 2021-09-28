import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { OrderStates } from './config';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderPayment({
      user: createOrderDto.user,
      price: createOrderDto.price,
    }).pipe(
      map(async (response) => {
        console.log(response);
        createOrderDto.state = OrderStates.confirmed;
        const orderResultObj = await this.service.create(createOrderDto);
        setTimeout(() => {
          this.service.update(orderResultObj['_id'], {
            state: OrderStates.delivered,
          });
        }, 10000);
        return await this.service.create(createOrderDto);
      }),
      catchError(async (error) => {
        console.log(error);
        createOrderDto.state = OrderStates.cancelled;
        return await this.service.create(createOrderDto);
      }),
    );
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.service.update(id, updateOrderDto);
  }

  createOrderPayment(payload): Observable<any> {
    return this.httpService.post('http://localhost:3002/payment', payload);
  }
}
