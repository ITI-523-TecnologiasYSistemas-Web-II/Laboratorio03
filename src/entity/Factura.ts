import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vendedor } from "./Vendedor";
import { Cliente } from "./Cliente";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el ID.' })
    numero: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Debe indicar la fecha de la factura.' })
    fecha: Date;

    @ManyToOne(() => Vendedor, (vendedor) => vendedor.facturas)
    vendedor: Vendedor;

    @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
    cliente: Cliente;

    @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura, { cascade: true })
    detallesFactura: DetalleFactura[];
}
