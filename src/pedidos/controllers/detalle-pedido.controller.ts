import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common'
import { DetallePedidoService } from '../services/detalle-pedido.service'
import { DetallePedido } from '../models/detalle-pedido.model'

@Controller('detalle-pedidos')
export class DetallePedidoController {
    constructor(private readonly detallePedidoService: DetallePedidoService) {}

    @Get()
    findAll(): Promise<DetallePedido[]> {
        return this.detallePedidoService.findAll()
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
        return this.detallePedidoService.findById(id)
    }

    @Get('pedido/:pedidoId')
    findByPedidoId(@Param('pedidoId', ParseIntPipe) pedidoId: number): Promise<DetallePedido[]> {
        return this.detallePedidoService.findByPedidoId(pedidoId)
    }

    @Get('producto/:productoId')
    findByProductoId(@Param('productoId', ParseIntPipe) productoId: number): Promise<DetallePedido[]> {
        return this.detallePedidoService.findByProductoId(productoId)
    }

    @Post()
    create(@Body() data: Partial<DetallePedido>): Promise<DetallePedido> {
        return this.detallePedidoService.create(data)
    }

    @Post('bulk')
    createMany(@Body() data: Partial<DetallePedido>[]): Promise<DetallePedido[]> {
        return this.detallePedidoService.createMany(data)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<DetallePedido>
    ): Promise<DetallePedido> {
        return this.detallePedidoService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.detallePedidoService.delete(id)
    }

    @Delete('pedido/:pedidoId')
    deleteByPedidoId(@Param('pedidoId', ParseIntPipe) pedidoId: number): Promise<void> {
        return this.detallePedidoService.deleteByPedidoId(pedidoId)
    }
}