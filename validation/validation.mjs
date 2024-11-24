import { body, validationResult } from 'express-validator';
    export default function manejarErroresDeValidacion(req, res, next) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
}
const validarArrayOCadena = (campo) =>
    body(campo)
        .custom((value) => {
            if (typeof value === 'string') {
                value = value.split(',').map((v) => v.trim());
            }
            return (
                Array.isArray(value) &&
                value.length >= 1 &&
                value.every((v) => v.length >= 3 && v.length <= 60)
            );
        })
        .withMessage(
            `El campo "${campo}" debe contener al menos un elemento y cada uno debe tener entre 3 y 60 caracteres`
        );

export const validarCrearSuperHeroe = [
    body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    body('edad')
        .notEmpty().withMessage('La edad es obligatoria')
        .isNumeric().withMessage('La edad debe ser un número')
        .custom((value) => value >= 0).withMessage('La edad no puede ser negativa'),
    validarArrayOCadena('poderes'),
    validarArrayOCadena('aliados'),
    validarArrayOCadena('enemigos'),
    manejarErroresDeValidacion,
];
