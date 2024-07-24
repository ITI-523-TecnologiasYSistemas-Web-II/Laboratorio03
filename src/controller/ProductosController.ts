import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";
import { ValidationError, validate } from "class-validator";
import { Categoria } from "../entity/Categoria";
class ProductosController{

    // cuando hago un llamado a un servidor y ahi dentro vendra la informacion
    static getAll= async(req: Request, resp: Response)=>{

        try {
            //instancia bd
            const repo= AppDataSource.getRepository(Producto);
            //consulta de bd por metodo find
            const  listaProductos= await repo.find({where:{estado:true}, relations:{categoria:true}}); //find es para jalar todos los datos

            //valido si trajo datos,sino devuelvo error
            if(listaProductos.length==0){
                return resp.status(404).json({message:"No hay datos registrados."});
            }

            console.log(listaProductos);
            //retorno los datos encontrados
            return resp.status(200).json(listaProductos);
        } catch (error) {
            return resp.status(404).json({message:"Error al acceder a la base de datos.."});
        }

    }

    static create= async(req: Request, resp: Response)=>{
        const repoProducto= AppDataSource.getRepository(Producto);

        try {
            // destructuring
            const {id,nombre,precio,stock,categoria}= req.body;

            //regla de negocio

            //validar si el producto ya existe
            let product = await repoProducto.findOne({where:{id}}); //encuentre uno o falle donde id sea igual a id
            if(product){
                return resp.status(400).json({message:"Ese producto ya existe en la base de datos"});
            }

            //instancia del objeto Producto
            product = new Producto;

            product.id= id;
            product.nombre = nombre;
            product.precio = precio;
            product.categoria = categoria;
            product.stock = stock;
            product.estado = true;

            //Validaciones con Class Validator
           // const validateOpt= {ValidationError:{target:false,value:false}};
            const errors = await validate(product,{validationError:{target:false,value:false}});

            if(errors.length>0){
                return resp.status(400).json(errors);
            }

            //valido la categoria
            const repoCategoria = AppDataSource.getRepository(Categoria);
            //let cat;
            try{
                await repoCategoria.findOneOrFail({where:{id:categoria}})
            } catch(ex){
                return resp.status(400).json({message:"No existe la categoria"})
            }

            await repoProducto.save(product);
            

        } catch (error) {
            return resp.status(400).json({message:"Error al guardar."});
        }
        return resp.status(200).json("PRODUCTO GUARDADO CORRECTAMENTE");
    }

    static getOne= async(req: Request, resp: Response)=>{
        try {

            const id = parseInt(req.params['id']);
            // validacion de más, por lo que vimos en clase
            if(!id){
                return resp.status(400).json({message:"Debe indicar el ID"});
            }

            const repo= AppDataSource.getRepository(Producto);

            try {
                const producto= await repo.findOneOrFail({where:{id, estado:true}, relations:{categoria:true}});
                return resp.status(200).json(producto);
            } catch (error) {
                return resp.status(400).json({message:"El producto no existe en la base de datos"});
            }

        } catch (error) {
            
        }
    }

    static delete= async(req: Request, resp: Response)=>{
        try {
            const id = parseInt(req.params['id']);
            const repo= AppDataSource.getRepository(Producto);
            if(!id){
                return resp.status(400).json({message:"Debe indicar un ID válido"});
            }

            const producto= await repo.findOneBy({id});
            if(!producto){
                return resp.status(404).json({message:"ERROR AL ENCONTRAR EL PRODUCTO"});
            }

            await repo.delete(id);

        } catch (error) {
            return resp.status(500).json({message: "ERROR AL INTENTAR ELIMINAR EL PRODUCTO"});
        }

        return resp.status(200).json("PRODUCTO ELIMINADO CORRECTAMENTE");
    }

    static update= async(req: Request, resp: Response)=>{
        const id = parseInt(req.params['id']);
        const repo= AppDataSource.getRepository(Producto);

        try {
            if(!id){
                return resp.status(400).json({message:"Debe indicar un ID válido"});
            }

            const producto= await repo.findOneBy({id});
            if(!producto){
                return resp.status(404).json({message:"ERROR AL ENCONTRAR EL PRODUCTO"});
            }

            const {nombre,precio,stock,categoria}= req.body

        //Actualizacion de los datos de producto
        producto.nombre = nombre;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.stock = stock;

        const errors = await validate(producto,{validationError:{target:false,value:false}})

        //valido la categoria
        const repoCategoria = AppDataSource.getRepository(Categoria);
        let cat;
        try{
            cat = await repoCategoria.findOneOrFail({where:{id:categoria}})
            
        } catch(ex){
            return resp.status(400).json({message:"No existe la categoria"})
        }

        producto.categoria = cat;

        //guardar datos
        await repo.save(producto);

        } catch (error) {
            return resp.status(500).json({message: "ERROR AL INTENTAR ACTUALIZAR EL PRODUCTO"});

        }

        return resp.status(200).json("PRODUCTO ACTUALIZADO CORRECTAMENTE");

    }
}

export default ProductosController; //forma de exponer los objetos