import { param } from "express-validator";
import manejarErroresDeValidacion from "./validation.mjs";

export const validarActualizarSuperHeroe = [
    param('id').isMongoId().withMessage('El ID proporcionado no es válido'),
    manejarErroresDeValidacion
];