import { CategoriasEffects } from './categorias.effects';
import { ArticulosEffects } from './articulos.effects';
import { RolesEffects } from './roles.effects';
import { UsuariosEffects } from './usuarios.effects';
import { ClientesEffects } from './clientes.effects';
import { ProveedoresEffects } from './proveedores.effects';
import { IngresosEffects } from './ingresos.effects';
import { VentasEffects } from './ventas.effects';

export const effectsArr: any[] =
    [
        CategoriasEffects,
        ArticulosEffects,
        RolesEffects,
        UsuariosEffects,
        ClientesEffects,
        ProveedoresEffects,
        IngresosEffects,
        VentasEffects
    ];

export * from './categorias.effects';
export * from './articulos.effects';
export * from './roles.effects';
export * from './usuarios.effects';
export * from './clientes.effects';
export * from './proveedores.effects';
export * from './ingresos.effects';
export * from './ventas.effects';
