import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { UsuarioRol } from "./UsuarioRol.js"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    idUsuario: number

    @Column()
    nombre: string
    
    @Column()
    email: string

    @Column()
    usuario: string

    @Column()
    pass: string

    @Column()
    habilitado: boolean

    @Column()
    fechaCreacion: Date

    @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.usuario)
    @JoinColumn({ name: "idUsuarioRol" })
    usuarioRoles: UsuarioRol[]
}
