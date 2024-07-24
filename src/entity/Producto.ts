import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el ID.' })
    id: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del producto.' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'Debe indicar el precio.' })
    @IsNumber()
    precio: number;

    @Column()
    @IsPositive({ message: 'Debe indicar un valor positivo' })
    @IsNotEmpty({ message: 'Debe indicar el stock.' })
    stock: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @IsNotEmpty({ message: 'Debe indicar la categoría.' })
    categoria: Categoria;

    @Column({ default: true })
    estado: boolean;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
    proveedor: Proveedor;

    @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
    detallesFacturas: DetalleFactura[];
}
