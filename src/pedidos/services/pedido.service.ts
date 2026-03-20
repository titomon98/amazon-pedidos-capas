import { Injectable, NotFoundException } from '@nestjs/common'
import { Pedido } from '../models/pedidos.model'
import { PedidoRepository } from '../repositories/pedido.repository'
import { Status } from '../../common/enums/status.enum'

@Injectable()
export class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository) {}

    async findAll(): Promise<Pedido[]> {
        return this.pedidoRepository.findAll()
    }

    async findById(id: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findById(id)
        if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`)
        return pedido
    }

    async findByStatus(status: Status): Promise<Pedido[]> {
        return this.pedidoRepository.findByStatus(status)
    }

    async create(data: Partial<Pedido>): Promise<Pedido> {
        return this.pedidoRepository.create(data)
    }

    async update(id: number, data: Partial<Pedido>): Promise<Pedido> {
        await this.findById(id)
        const updated = await this.pedidoRepository.update(id, data)
        return updated!
    }

    async updateStatus(id: number, status: Status): Promise<Pedido> {
        await this.findById(id)
        const updated = await this.pedidoRepository.updateStatus(id, status)
        return updated!
    }

    async updateTotal(id: number, total: number): Promise<Pedido> {
        await this.findById(id)
        const updated = await this.pedidoRepository.updateTotal(id, total)
        return updated!
    }

    async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.pedidoRepository.delete(id)
    }
}