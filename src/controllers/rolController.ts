import { Request, Response } from "express";
import { buscarRegistro, validarDatos } from "../functions/usuarioFunc.js";
import { AppDataSource } from "../data-source.js";
import { Rol } from "../entity/Rol.js";
import { Usuario } from "../entity/Usuario.js";
import { UsuarioRol } from "../entity/UsuarioRol.js";

interface IRol {
    crearRol(req: Request, res: Response): Promise<void>;
    obtenerRoles(req: Request, res: Response): Promise<Response<any, Record<string, string | number>>>
    obtenerRol(req: Request, res: Response): Promise<Response<any, Record<string, any>>>
    modificarRol(req: Request, res: Response): Promise<void>;
    eliminarRol(req: Request, res: Response): Promise<void>;}

export class RolController {
    async crearRol(req: Request, res: Response) {
        try {
            const { nombre } = req.body
            validarDatos(nombre, "El nombre")

            const data = await AppDataSource.createQueryBuilder()
                .insert()
                .into(Rol)
                .values({
                    ...req.body,
                    habilitado: true,
                    fechaCreacion: new Date()
                }).execute()

            res.status(201).json({ message: "Rol creado", idRol: data.generatedMaps[0].idRol })
        } catch (error) {
            if (error.name == "ValidationError") {
                res.status(400).json({ message: error.message })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el rol" })
            }
        }
    }

    async obtenerRoles(req: Request, res: Response): Promise<Response<Rol[], Record<string, any>>> {
        try {
            const data = await AppDataSource.getRepository(Rol).find()
            return res.status(200).json({ roles: data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "No se puedieron obtener los roles" })
        }
    }

    async obtenerRol(req: Request, res: Response) {
        try {
            const { idRol } = req.params
            const data = await AppDataSource.getRepository(Rol).find({ where: { idRol: idRol } })

            if (data[0] == null) {
                return res.status(404).json({ message: "Rol no encontrado" })
            }

            res.status(200).json({ rol: data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo obtener el rol" })
        }
    }

    async modificarRol(req: Request, res: Response) {
        try {
            const { idRol } = req.params
            const data = await AppDataSource.getRepository(Rol).find({ where: { idRol: idRol } })
            const rolName = !req.body.nombre && data[0].nombre
            if (data.length == 0) {
                return res.status(404).json({ message: "Rol no encontrado" })
            }

            if (data[0].nombre != rolName) {
                return res.status(400).json({ message: "El nombre no puede ser modificado" })
            }

            await AppDataSource.createQueryBuilder()
            .update(Rol)
            .set({
                ...req.body
            }).where("idRol = :idRol", { idRol })
            .execute()

            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo modificar el rol" })
        }
    }

    async eliminarRol(req: Request, res: Response) {
        try {
            const { idRol } = req.params
            const data = await AppDataSource.getRepository(Rol).find({ where: { idRol: idRol } })
            if (data.length == 0) {
                return res.status(404).json({ message: "Rol no encontrado" })
            }

            await AppDataSource.createQueryBuilder()
            .delete()
            .from(Rol)
            .where("idRol = :idRol", { idRol })
            .execute()

            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo eliminar el rol" })
        }
    }
}