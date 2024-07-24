import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";
import { ValidationError, validate } from "class-validator";
import { Categoria } from "../entity/Categoria";

class CategoriasController{

    // cuando hago un llamado a un servidor y ahi dentro vendra la informacion
    static getAll= async(req: Request, resp: Response)=>{
        try {
            //instancia bd
            const repo= AppDataSource.getRepository(Categoria);
            //consulta de bd por metodo find
            const  lista= await repo.find({where:{estado:true}, relations:{Productos:true}}); //find es para jalar todos los datos

            //valido si trajo datos,sino devuelvo error
            if(lista.length==0){
                return resp.status(404).json({message:"No hay datos registrados."});
            }

            console.log(lista);
            //retorno los datos encontrados
            return resp.status(200).json(lista);
        } catch (error) {
            return resp.status(404).json({message:"Error al acceder a la base de datos.."});
        }
    }

    static getOne= async(req: Request, resp: Response)=>{
        try {

            const id = parseInt(req.params['id']);
            // validacion de más, por lo que vimos en clase
            if(!id){
                return resp.status(400).json({message:"Debe indicar el ID"});
            }

            const repo= AppDataSource.getRepository(Categoria);

            try {
                const categoria= await repo.findOneOrFail({where:{id, estado:true}, relations:{Productos:true}});
                return resp.status(200).json(categoria);
            } catch (error) {
                return resp.status(400).json({message:"La categoria con el ID indicado no existe en la base de datos"});
            }

        } catch (error) {
            return resp.status(400).json({message:"Error al cargar la categoria"});
        }
    }
}

export default CategoriasController; //forma de exponer los objetos