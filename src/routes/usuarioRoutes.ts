import { Router } from "express"
import { UsuarioController } from "../controllers/usuarioController.js"

const router = Router()
const usuarioController = new UsuarioController()

router.post("/usuario", usuarioController.crearUsuario)
router.post("/usuario/:idUsuario/rol/:idRol", usuarioController.asignarRolUsuario)

router.get("/usuario", usuarioController.obtenerUsuarios)
router.get("/usuario/:idUsuario", usuarioController.obtenerUsuario)

router.put("/usuario/:idUsuario", usuarioController.modificarUsuario)

router.delete("/usuario/:idUsuario", usuarioController.eliminarUsuario)
router.delete("/usuario/:idUsuario/rol/:idRol", usuarioController.quitarRolUsuario)

export default router