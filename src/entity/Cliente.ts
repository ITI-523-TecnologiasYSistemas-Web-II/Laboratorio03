import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Cliente {
    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe indicar el RUC.' })
    Ruc_cliente: number;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el nombre del cliente.' })
    Nombre_cliente: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar los apellidos del cliente.' })
    Apellidos_cliente: string;

    @Column({ length: 500, nullable: false })
    @MaxLength(500, { message: 'Debe contener un máximo de 500 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar la direccion del cliente.' })
    Direccion_cliente: string;

    @Column({ length: 50, nullable: false })
    @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
    @IsNotEmpty({ message: 'Debe indicar el telefono del cliente.' })
    Telefono_cliente: string;

    @OneToMany(() => Factura, (factura) => factura.cliente)
    facturas: Factura[];
}
