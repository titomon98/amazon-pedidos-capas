import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pedido } from './pedidos/models/pedidos.model'
import { DetallePedido } from './pedidos/models/detalle-pedido.model'
import { PedidoRepository } from './pedidos/repositories/pedido.repository'
import { DetallePedidoRepository } from './pedidos/repositories/detalle-pedido.repository'
import { PedidoService } from './pedidos/services/pedido.service'
import { DetallePedidoService } from './pedidos/services/detalle-pedido.service'
import { PedidoController } from './pedidos/controllers/pedido.controller'
import { DetallePedidoController } from './pedidos/controllers/detalle-pedido.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? 'Jose2598@', //Aqui va su propia contraseña. Si no hay nada se pone null
      database: process.env.DB_NAME ?? 'pedidos_db',
      entities: [Pedido, DetallePedido],
      synchronize: true, // solo para desarrollo, en produccion usar migraciones
    }),
    TypeOrmModule.forFeature([Pedido, DetallePedido])
  ],
  controllers: [PedidoController, DetallePedidoController],
  providers: [PedidoRepository, DetallePedidoRepository, PedidoService, DetallePedidoService]
})
export class AppModule {}