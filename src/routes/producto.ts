import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes = Router();

routes.get("", ProductosController.getAll)
routes.post("", ProductosController.create)
routes.get("/getOne/:id",ProductosController.getOne)
routes.delete("/getOne/:id", ProductosController.delete)
routes.put("/getOne/:id", ProductosController.update)

export default routes;