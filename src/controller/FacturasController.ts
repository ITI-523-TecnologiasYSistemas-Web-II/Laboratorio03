import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";
import { ValidationError, validate } from "class-validator";
import { Cliente } from "../entity/Cliente";
import { Vendedor } from "../entity/Vendedor";

class FacturasController {

    static getAll = async (req: Request, resp: Response) => {
        try {
            const repo = AppDataSource.getRepository(Factura);
            const listaFacturas = await repo.find({ relations: { cliente: true, vendedor: true, detallesFactura: true } });

            if (listaFacturas.length == 0) {
                return resp.status(404).json({ message: "No hay datos registrados." });
            }

            return resp.status(200).json(listaFacturas);
        } catch (error) {
            return resp.status(404).json({ message: "Error al acceder a la base de datos." });
        }
    }

    static create = async (req: Request, resp: Response) => {
        const repoFactura = AppDataSource.getRepository(Factura);

        try {
            const { numero, fecha, vendedor, cliente, detallesFactura } = req.body;

            let factura = await repoFactura.findOne({ where: { numero } });
            if (factura) {
                return resp.status(400).json({ message: "Esa factura ya existe en la base de datos" });
            }

            factura = new Factura();
            factura.numero = numero;
            factura.fecha = fecha;
            factura.vendedor = vendedor;
            factura.cliente = cliente;
            factura.detallesFactura = detallesFactura;

            const errors = await validate(factura, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return resp.status(400).json(errors);
            }

            const repoVendedor = AppDataSource.getRepository(Vendedor);
            try {
                await repoVendedor.findOneOrFail({ where: { Codigo_vendedor: vendedor } });
            } catch (ex) {
                return resp.status(400).json({ message: "No existe el vendedor" });
            }

            const repoCliente = AppDataSource.getRepository(Cliente);
            try {
                await repoCliente.findOneOrFail({ where: { Ruc_cliente: cliente } });
            } catch (ex) {
                return resp.status(400).json({ message: "No existe el cliente" });
            }

            await repoFactura.save(factura);
        } catch (error) {
            return resp.status(400).json({ message: "Error al guardar." });
        }
        return resp.status(200).json("FACTURA GUARDADA CORRECTAMENTE");
    }

    static getOne = async (req: Request, resp: Response) => {
        try {
            const numero = parseInt(req.params['numero']);
            if (!numero) {
                return resp.status(400).json({ message: "Debe indicar el número de factura" });
            }

            const repo = AppDataSource.getRepository(Factura);
            try {
                const factura = await repo.findOneOrFail({ where: { numero }, relations: { cliente: true, vendedor: true, detallesFactura: true } });
                return resp.status(200).json(factura);
            } catch (error) {
                return resp.status(400).json({ message: "La factura no existe en la base de datos" });
            }
        } catch (error) {
            return resp.status(500).json({ message: "Error al acceder a la base de datos" });
        }
    }

    static delete = async (req: Request, resp: Response) => {
        try {
            const numero = parseInt(req.params['numero']);
            const repo = AppDataSource.getRepository(Factura);
            if (!numero) {
                return resp.status(400).json({ message: "Debe indicar un número de factura válido" });
            }

            const factura = await repo.findOneBy({ numero });
            if (!factura) {
                return resp.status(404).json({ message: "ERROR AL ENCONTRAR LA FACTURA" });
            }

            await repo.delete(numero);
        } catch (error) {
            return resp.status(500).json({ message: "ERROR AL INTENTAR ELIMINAR LA FACTURA" });
        }

        return resp.status(200).json("FACTURA ELIMINADA CORRECTAMENTE");
    }

    static update = async (req: Request, resp: Response) => {
        const numero = parseInt(req.params['numero']);
        const repo = AppDataSource.getRepository(Factura);

        try {
            if (!numero) {
                return resp.status(400).json({ message: "Debe indicar un número de factura válido" });
            }

            const factura = await repo.findOneBy({ numero });
            if (!factura) {
                return resp.status(404).json({ message: "ERROR AL ENCONTRAR LA FACTURA" });
            }

            const { fecha, vendedor, cliente, detallesFactura } = req.body;

            factura.fecha = fecha;
            factura.vendedor = vendedor;
            factura.cliente = cliente;
            factura.detallesFactura = detallesFactura;

            const errors = await validate(factura, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return resp.status(400).json(errors);
            }

            const repoVendedor = AppDataSource.getRepository(Vendedor);
            try {
                await repoVendedor.findOneOrFail({ where: { Codigo_vendedor: vendedor } });
            } catch (ex) {
                return resp.status(400).json({ message: "No existe el vendedor" });
            }

            const repoCliente = AppDataSource.getRepository(Cliente);
            let cli;
            try {
                cli = await repoCliente.findOneOrFail({ where: { Ruc_cliente: cliente } });
            } catch (ex) {
                return resp.status(400).json({ message: "No existe el cliente" });
            }

            factura.cliente = cli;

            await repo.save(factura);
        } catch (error) {
            return resp.status(500).json({ message: "ERROR AL INTENTAR ACTUALIZAR LA FACTURA" });
        }

        return resp.status(200).json("FACTURA ACTUALIZADA CORRECTAMENTE");
    }
}

export default FacturasController;
