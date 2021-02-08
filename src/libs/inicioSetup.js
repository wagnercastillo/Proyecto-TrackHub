import Rol from '../models/Rol'

export const createRoles = async () => {
    try {
        const count = await Rol.estimatedDocumentCount()
        if (count > 0) return;
        const values = await Promise.all([
            new Rol({ nombre: 'Administrador_General' }).save(),
            new Rol({ nombre: 'Administrador_Cooperativo' }).save(),
            new Rol({ nombre: 'Cliente' }).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error)
    }
}