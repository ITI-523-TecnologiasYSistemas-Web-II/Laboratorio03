import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el ID.' })
    Codigo_proveedor: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del proveedor.' })
    Nombre_proveedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar los apellidos del proveedor.' })
    Apellidos_proveedor: string;

    @Column({ length: 500, nullable: false })
    @MaxLength(500, { message: 'Debe contener un máximo de 500 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar la direccion del proveedor.' })
    Direccion_proveedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar la provincia del proveedor.' })
    Provincia_proveedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el telefono del proveedor.' })
    Telefono_proveedor: string;

    @OneToMany(() => Producto, (productos) => productos.proveedor)
    productos: Producto[];
}
