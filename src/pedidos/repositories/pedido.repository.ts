import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pedido } from '../models/pedidos.model'
import { Status } from '../../common/enums/status.enum'

@Injectable()
export class PedidoRepository {
    constructor(
        @InjectRepository(Pedido)
        private readonly repo: Repository<Pedido>
    ) {}

    async findAll(): Promise<Pedido[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<Pedido | null> {
        return this.repo.findOne({ where: { id } })
    }

    async findByStatus(status: Status): Promise<Pedido[]> {
        return this.repo.find({ where: { pedido_status: status } })
    }

    async create(data: Partial<Pedido>): Promise<Pedido> {
        const pedido = this.repo.create(data)
        return this.repo.save(pedido)
    }

    async update(id: number, data: Partial<Pedido>): Promise<Pedido | null> {
        await this.repo.update(id, data)
        return this.findById(id)
    }

    async updateStatus(id: number, status: Status): Promise<Pedido | null> {
        await this.repo.update(id, { pedido_status: status })
        return this.findById(id)
    }

    async updateTotal(id: number, total: number): Promise<Pedido | null> {
        await this.repo.update(id, { pedido_total: total })
        return this.findById(id)
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete(id)
        return (result.affected ?? 0) > 0
    }
}