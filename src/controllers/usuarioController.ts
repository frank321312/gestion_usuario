import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entity/Usuario.js";
import { buscarRegistro, validarDatos } from "../functions/usuarioFunc.js";
import { Rol } from "../entity/Rol.js";
import { UsuarioRol } from "../entity/UsuarioRol.js";

export class UsuarioController {
    async crearUsuario(req: Request, res: Response) {
        try {
            const { nombre, email, usuario, pass } = req.body

            validarDatos(nombre, "El nombre")
            validarDatos(email, "El email")            
            validarDatos(usuario, "El usuario")
            validarDatos(pass, "La contraseña")

            const data = await AppDataSource.createQueryBuilder()
                .insert()
                .into(Usuario)
                .values({
                    ...req.body,
                    fechaCreacion: new Date(),
                    habilitado: false
                }).execute()

            res.status(201).json({ message: "Usuario creado", idUsuario: data.generatedMaps[0].idUsuario })
        } catch (error) {
            if (error.name == "ValidationError") {
                return res.status(400).json({ message: error.message })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el usuario" })
            }
        }
    }

    async obtenerUsuarios(req: Request, res: Response) {
        try {
            const data = await AppDataSource.getRepository(Usuario)
                .createQueryBuilder("usuario")
                .leftJoinAndSelect("usuario.usuarioRoles", "usuarioRoles")
                .leftJoinAndSelect("usuarioRoles.rol", "rol")
                .select([
                    "usuario.idUsuario", 
                    "usuario.nombre", 
                    "usuario.email", 
                    "usuario.usuario", 
                    "usuario.habilitado", 
                    "usuario.fechaCreacion", 
                    "usuarioRoles", 
                    "rol.nombre",
                    "rol.idRol"
                ]).orderBy("usuario.idUsuario", "ASC")
                .getMany()

            res.status(200).json({ usuarios: data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudieron obtener los usuarios" })
        }
    }

    async obtenerUsuario(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params
            const user = await buscarRegistro(Usuario, idUsuario, "usuario", "idUsuario")

            if (user == null) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            res.status(200).json({ usuario: user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo obtener al usuario" })
        }
    }

    async modificarUsuario(req: Request, res: Response) {
        try {
            const { nombre, email, usuario, pass } = req.body
            validarDatos(email, "El email")
            validarDatos(usuario, "El usuario")
            validarDatos(pass, "La contraseña")
            const user = await buscarRegistro(Usuario, req.params.idUsuario, "usuario", "idUsuario")
            const username = !nombre && user.nombre
            if (user == null) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            if (user.nombre != username) {
                return res.status(400).json({ message: "No puede modifcar el nombre" })
            }

            await AppDataSource.createQueryBuilder()
            .update(Usuario)
            .set({
                ...req.body
            }).where("idUsuario = :id", { id: req.params.idUsuario })
            .execute()

            res.status(204).send()
        } catch (error) {
            if (error.name == "ValidationError") {
                res.status(400).json({ message: error.message })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudieron guardar los cambios" })
            }
        }
    }

    async eliminarUsuario(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params

            const user = await buscarRegistro(Usuario, req.params.idUsuario, "usuario", "idUsuario")
            if (user == null) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            await AppDataSource.createQueryBuilder()
                .delete()
                .from(Usuario)
                .where("idUsuario = :idUsuario", { idUsuario })
                .execute()

            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo eliminar el usuario" })
        }
    }

    async asignarRolUsuario(req: Request, res: Response) {
        try {
            const { idUsuario, idRol } = req.params
            const rol = await AppDataSource.getRepository(Rol).find({ where: { idRol }})
            const user = await buscarRegistro(Usuario, idUsuario, "usuario", "idUsuario")
            if (user == null) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            if (rol.length == 0) {
                return res.status(404).json({ message: "Rol no encontrado" })
            }

            await AppDataSource.createQueryBuilder()
                .insert()
                .into(UsuarioRol)
                .values({
                    rol: rol[0],
                    usuario: user
                }).execute()

            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo asignar el rol al usuario" })
        }
    }

    async quitarRolUsuario(req: Request, res: Response) {
        try {
            const { idUsuario, idRol } = req.params
            const rol = await AppDataSource.getRepository(Rol).find({ where: { idRol }})
            const user = await buscarRegistro(Usuario, idUsuario, "usuario", "idUsuario")
            if (user == null) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            if (rol.length == 0) {
                return res.status(404).json({ message: "Rol no encontrado" })
            }

            await AppDataSource.createQueryBuilder()
                .delete()
                .from(UsuarioRol)
                .where("idUsuario = :idUsuario", { idUsuario })
                .andWhere("idRol = :idRol", { idRol })
                .execute()

            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo quitar el rol al usuario" })
        }
    }
}