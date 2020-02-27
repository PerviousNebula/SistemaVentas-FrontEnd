import { Usuario, Persona, DetalleIngreso } from '../interfaces.index';

export interface Ingreso {
    idIngreso: number;
    idProveedor: number;
    idUsuario: number;
    tipo_comprobante: number;
    serie_comprobante: string;
    num_comprobante: string;
    fecha_hora: Date;
    impuesto: number;
    total: number;
    estado: string;
    detalles: DetalleIngreso[];
    usuario: Usuario;
    proveedor: Persona;
}
