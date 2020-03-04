import { Usuario, DetalleVenta, Persona } from '../interfaces.index';

export interface Venta {
    idVenta: number;
    idCliente: number;
    idUsuario: number;
    tipo_comprobante: string;
    serie_comprobante: string;
    num_comprobante: string;
    fecha_hora: string;
    impuesto: number;
    total: number;
    estado: string;
    detalles: DetalleVenta[];
    usuario: Usuario;
    persona: Persona;
}
