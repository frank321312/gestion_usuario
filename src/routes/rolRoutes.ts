import { Router } from "express";
import { RolController } from "../controllers/rolController.js";

const router = Router();
const rolController = new RolController();

router.post("/rol", rolController.crearRol);

router.get("/rol", rolController.obtenerRoles);

router.get("/rol/:idRol", rolController.obtenerRol);

router.put("/rol/:idRol", rolController.modificarRol);

router.delete("/rol/:idRol", rolController.eliminarRol);

export default router;
