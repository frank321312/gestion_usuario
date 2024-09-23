import { AppDataSource } from "./data-source.js"
import express from 'express'
import usuarioRouter from './routes/usuarioRoutes.js'
import rolRouter from "./routes/rolRoutes.js"

AppDataSource.initialize().then(() => {
    console.log("Conexion exitosa")
}).catch(err => console.log(err))

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4006

app.use("/api", usuarioRouter)
app.use("/api", rolRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})