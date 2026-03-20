import { Injectable, NotFoundException } from '@nestjs/common'
import { DetallePedido } from '../models/detalle-pedido.model'
import { DetallePedidoRepository } from '../repositories/detalle-pedido.repository'

@Injectable()
export class DetallePedidoService {
    constructor(private readonly detallePedidoRepository: DetallePedidoRepository) {}

    async findAll(): Promise<DetallePedido[]> {
        return this.detallePedidoRepository.findAll()
    }

    async findById(id: number): Promise<DetallePedido> {
        const detalle = await this.detallePedidoRepository.findById(id)
        if (!detalle) throw new NotFoundException(`Detalle con id ${id} no encontrado`)
        return detalle
    }

    async findByPedidoId(pedidoId: number): Promise<DetallePedido[]> {
        return this.detallePedidoRepository.findByPedidoId(pedidoId)
    }

    async findByProductoId(productoId: number): Promise<DetallePedido[]> {
        return this.detallePedidoRepository.findByProductoId(productoId)
    }

    async create(data: Partial<DetallePedido>): Promise<DetallePedido> {
        return this.detallePedidoRepository.create(data)
    }

    async createMany(data: Partial<DetallePedido>[]): Promise<DetallePedido[]> {
        return this.detallePedidoRepository.createMany(data)
    }

    async update(id: number, data: Partial<DetallePedido>): Promise<DetallePedido> {
        await this.findById(id)
        const updated = await this.detallePedidoRepository.update(id, data)
        return updated!
    }

    async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.detallePedidoRepository.delete(id)
    }

    async deleteByPedidoId(pedidoId: number): Promise<void> {
        await this.detallePedidoRepository.deleteByPedidoId(pedidoId)
    }
}