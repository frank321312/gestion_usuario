import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario.js"
import { Rol } from "./entity/Rol.js"
import { UsuarioRol } from "./entity/UsuarioRol.js"
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario, Rol, UsuarioRol],
    migrations: [],
    subscribers: [],
})
