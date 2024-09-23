import { EntityTarget, ObjectLiteral } from "typeorm"
import { AppDataSource } from "../data-source.js"
import { ValidationError } from "../errors/ValidationError.js"

export const validarDatos = (propiedad: string, campo: string) => {
    if (!propiedad || propiedad.length === 0) {
        throw new ValidationError(`${campo} no puede estar vacío`)
    }
}

export const buscarRegistro = async (entidad: EntityTarget<ObjectLiteral>, id: string | number, entity: string, campo: string) => {
    const data = await AppDataSource.getRepository(entidad)
        .createQueryBuilder(`${entity}`)
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
        ])
        .where(`${entity}.${campo} = :id`, { id })
        .getOne()

    return data
}