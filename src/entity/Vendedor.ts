import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Vendedor {
    @PrimaryGeneratedColumn()
    @IsNotEmpty({ message: 'Debe indicar el ID.' })
    Codigo_vendedor: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del vendedor.' })
    Nombre_vendedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar los apellidos del vendedor.' })
    Apellidos_vendedor: string;

    @Column({ length: 500, nullable: false })
    @MaxLength(500, { message: 'Debe contener un máximo de 500 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar la direccion del vendedor.' })
    Direccion_vendedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el telefono del vendedor.' })
    Telefono_vendedor: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el celular del vendedor.' })
    Celular_vendedor: string;

    @OneToMany(() => Factura, (factura) => factura.vendedor)
    facturas: Factura[];
}
