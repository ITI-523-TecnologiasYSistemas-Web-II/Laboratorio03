import "reflect-metadata"
import { DataSource } from "typeorm"
import { Categoria } from "./entity/Categoria"
import { Cliente } from "./entity/Cliente"
import { Factura } from "./entity/Factura"
import { DetalleFactura } from "./entity/DetalleFactura"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "lab03",
    synchronize: true,
    logging: false,
    entities: [Categoria,Cliente, Factura, DetalleFactura, Producto, Proveedor, Vendedor],
    migrations: [],
    subscribers: [],
})
