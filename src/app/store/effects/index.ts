import { CategoriasEffects } from './categorias.effects';
import { ArticulosEffects } from './articulos.effects';
import { RolesEffects } from './roles.effects';
import { UsuariosEffects } from './usuarios.effects';

export const effectsArr: any[] =
    [
        CategoriasEffects,
        ArticulosEffects,
        RolesEffects,
        UsuariosEffects
    ];

export * from './categorias.effects';
export * from './articulos.effects';
export * from './roles.effects';
export * from './usuarios.effects';
