import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario.js"
import { Rol } from "./entity/Rol.js"
import { UsuarioRol } from "./entity/UsuarioRol.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    // username: "postgres",
    // password: "password",
    username: "root",
    password: "Franchela12.",
    database: "gestion_usuario",
    synchronize: true,
    logging: false,
    entities: [Usuario, Rol, UsuarioRol],
    migrations: [],
    subscribers: [],
})
