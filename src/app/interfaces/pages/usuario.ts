export interface Usuario {
    idUsuario: number;
    idRol: number;
    rol: string;
    nombre: string;
    tipo_documento: string;
    num_documento: string;
    direccion: string;
    telefono: string;
    email: string;
    password: string;
    password_hash: string;
    imgUrl: string;
    activo: boolean;
    act_password: boolean;
}
