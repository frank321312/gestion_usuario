import { Router } from "express";
import { RolController } from "../controllers/rolController.js";
import { usuarioController } from "./usuarioRoutes.js";

const router = Router();
const rolController = new RolController();

router.post("/rol", rolController.crearRol);
router.post("/rol/:idRol/usuario/:idUsuario", usuarioController.asignarRolUsuario)

router.get("/rol", rolController.obtenerRoles);

router.get("/rol/:idRol", rolController.obtenerRol);

router.put("/rol/:idRol", rolController.modificarRol);

router.delete("/rol/:idRol", rolController.eliminarRol);
router.delete("/rol/:idRol/usuario/:idUsuario", usuarioController.eliminarUsuario)

export default router;
