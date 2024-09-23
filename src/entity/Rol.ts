import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioRol } from "./UsuarioRol.js";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn("uuid")
    idRol: string

    @Column()
    nombre: string

    @Column()
    habilitado: boolean

    @Column()
    fechaCreacion: Date

    @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
    @JoinColumn({ name: "idUsuarioRol" })
    usuarioRoles: UsuarioRol[]
}