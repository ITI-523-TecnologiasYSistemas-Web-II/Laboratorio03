import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura {
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el ID.' })
    numero: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Debe indicar la cantidad.' })
    @IsNumber()
    cantidad: number;

    @ManyToOne(() => Factura, (factura) => factura.detallesFactura)
    factura: Factura;

    @ManyToOne(() => Producto, (producto) => producto.detallesFacturas)
    producto: Producto;
}
