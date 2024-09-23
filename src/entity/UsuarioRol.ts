import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";

@Entity()
export class UsuarioRol {
    @PrimaryGeneratedColumn()
    idUsuarioRol: number

    @ManyToOne(() => Rol, (rol) => rol.usuarioRoles)
    @JoinColumn({ name: "idRol" })
    rol: Rol

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRoles)
    @JoinColumn({ name: "idUsuario" })
    usuario: Relation<Usuario>
}