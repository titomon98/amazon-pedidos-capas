import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common'
import { PedidoService } from '../services/pedido.service'
import { Pedido } from '../models/pedidos.model'
import { Status } from '../../common/enums/status.enum'

@Controller('pedidos')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}

    @Get()
    findAll(): Promise<Pedido[]> {
        return this.pedidoService.findAll()
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
        return this.pedidoService.findById(id)
    }

    @Get('status/:status')
    findByStatus(@Param('status', ParseIntPipe) status: Status): Promise<Pedido[]> {
        return this.pedidoService.findByStatus(status)
    }

    @Post()
    create(@Body() data: Partial<Pedido>): Promise<Pedido> {
        return this.pedidoService.create(data)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Pedido>
    ): Promise<Pedido> {
        return this.pedidoService.update(id, data)
    }

    @Put(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ParseIntPipe) status: Status
    ): Promise<Pedido> {
        return this.pedidoService.updateStatus(id, status)
    }

    @Put(':id/total')
    updateTotal(
        @Param('id', ParseIntPipe) id: number,
        @Body('total') total: number
    ): Promise<Pedido> {
        return this.pedidoService.updateTotal(id, total)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.pedidoService.delete(id)
    }
}