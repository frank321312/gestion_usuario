import { AppDataSource } from "./data-source.js"
import express, { Request, Response } from 'express'
import usuarioRouter from './routes/usuarioRoutes.js'
import rolRouter from "./routes/rolRoutes.js"
import { Rol } from "./entity/Rol.js"
import { Usuario } from "./entity/Usuario.js"

AppDataSource.initialize().then(async () => {
    const existeRol = await AppDataSource.getRepository(Rol).find({where: { nombre: "Administrador" }})
    if (existeRol.length == 0) {
        const rolRepository = AppDataSource.getRepository(Rol)
        const usuarioRepository = AppDataSource.getRepository(Usuario)
        const roles = [
            {
                idRol: "a5f86a17-16e3-4f65-9ddf-2d0bd933341d",
                nombre: 'Administrador',
                habilitado: true,
                fechaCreacion: new Date(),
            },
            {
                idRol: "a9f86a97-16e3-4f65-9ddf-2d0bd933341d",
                nombre: 'Editor',
                habilitado: true,
                fechaCreacion: new Date(),
            },
            {
                idRol: "a9f86a17-16e3-4f65-9ddf-2d0bd933341d",
                nombre: 'Usuario',
                habilitado: false,
                fechaCreacion: new Date(),
            }
        ]
        const usuarios = [
            { nombre: 'Juan Pérez', email: 'juan.perez@example.com', usuario: 'juanp', pass: 'password123', habilitado: true, fechaCreacion: new Date() },
            { nombre: 'María Gómez', email: 'maria.gomez@example.com', usuario: 'mariag', pass: 'password456', habilitado: true, fechaCreacion: new Date() },
            { nombre: 'Luis Fernández', email: 'luis.fernandez@example.com', usuario: 'luisf', pass: 'password789', habilitado: false, fechaCreacion: new Date() }
        ]
        rolRepository.save(roles)
        usuarioRepository.save(usuarios)
    }
    console.log("Conexion exitosa")
}).catch(err => console.log(err))

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4006

app.use("/api", usuarioRouter)
app.use("/api", rolRouter)

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})