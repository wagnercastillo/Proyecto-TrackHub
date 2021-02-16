import { Schema, model } from 'mongoose'
export const ROLES = ["Administrador_General","Administrador_Cooperativo","Cliente"]
const rolesSchema = new Schema(
    {
        nombre: String
    },
    {
        versionKey: false
    }
);
  
export default model('Rol', rolesSchema)