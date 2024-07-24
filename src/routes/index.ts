import { Router } from "express";
import producto from "./producto";
import categoria from "./categoria"
import factura from "./factura"

const routes = Router();

routes.use("/Productos",producto)
routes.use("/Categorias", categoria)
routes.use("/Facturas", factura)

export default routes;