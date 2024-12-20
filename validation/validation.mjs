import { body, validationResult } from 'express-validator';

export default function manejarErroresDeValidacion(req, res, next) {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
}

const validarArrayOCadena = (campo, regex) =>
    body(campo)
        .custom((value) => {
            if (typeof value === 'string') {
                value = value.split(',').map((v) => v.trim());
            }
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error(`El campo "${campo}" debe ser un array con al menos un elemento`);
            }
            value.forEach((v) => {
                if (!regex.test(v)) {
                    throw new Error(`Cada elemento de "${campo}" debe cumplir con el formato válido`);
                }
            });
            return true;
        })
        .withMessage(`El campo "${campo}" debe ser un array o una cadena separada por comas con el formato adecuado`);

export const validarCrearPais = [
    // Nombre Oficial
    body('name.official')
        .trim()
        .notEmpty().withMessage('El nombre oficial es obligatorio')
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),

    // Capital (convertir en array si es una cadena de texto)
    body('capital')
        .custom((value) => {
            if (typeof value === 'string') {
                // Si es una cadena de texto, lo convertimos a un array separado por comas
                value = value.split(',').map((v) => v.trim());
            }
            // Validamos que ahora sea un array con los elementos correctos
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error('La capital debe ser un array con al menos un elemento');
            }
            value.forEach((v) => {
                if (typeof v !== 'string' || v.length < 3 || v.length > 90) {
                    throw new Error('Cada elemento de la capital debe tener entre 3 y 90 caracteres');
                }
            });
            return true; // Si todo es válido, devolvemos true
        })
        .withMessage('La capital debe ser un array o una cadena separada por comas'),

    // Fronteras (convertir en array si es una cadena de texto)
    body('borders')
        .custom((value) => {
            if (typeof value === 'string') {
                // Si es una cadena de texto, lo convertimos a un array separado por comas
                value = value.split(',').map((v) => v.trim());
            }
            // Validamos que ahora sea un array con los elementos correctos
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error('Las fronteras deben ser un array con al menos un código');
            }
            value.forEach((v) => {
                if (!/^[A-Z]{3}$/.test(v)) {
                    throw new Error('Cada código de frontera debe ser una cadena de 3 letras mayúsculas');
                }
            });
            return true; // Si todo es válido, devolvemos true
        })
        .withMessage('Las fronteras deben ser un array o una cadena separada por comas con códigos de 3 letras mayúsculas'),

    // Idiomas (convertir en array si es una cadena de texto)
    body('languages')
        .custom((value) => {
            if (typeof value === 'string') {
                // Si es una cadena de texto, lo convertimos a un array separado por comas
                value = value.split(',').map((v) => v.trim());
            }
            // Validamos que ahora sea un array con los elementos correctos
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error('Los idiomas deben ser un array con al menos un idioma');
            }
            value.forEach((v) => {
                if (typeof v !== 'string' || v.length < 3 || v.length > 60) {
                    throw new Error('Cada idioma debe ser una cadena de 3 a 60 caracteres');
                }
            });
            return true; // Si todo es válido, devolvemos true
        })
        .withMessage('Los idiomas deben ser un array o una cadena separada por comas'),
      
    // Área (número positivo)
    body('area')
        .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo'),

    // Población (número entero positivo)
    body('population')
        .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo'),

    // Gini (valor entre 0 y 100)
    body('gini')
        .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100'),

    manejarErroresDeValidacion,  // Llamada para manejar los errores de validación
];
export const validarEdit = [
    // Nombre Oficial
    body('name.official')
        .trim()
        .notEmpty().withMessage('El nombre oficial es obligatorio')
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),

    // Capital (convertir en array si es una cadena de texto)
    body('capital')
        .custom((value) => {
            if (typeof value === 'string') {
                // Si es una cadena de texto, lo convertimos a un array separado por comas
                value = value.split(',').map((v) => v.trim());
            }
            // Validamos que ahora sea un array con los elementos correctos
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error('La capital debe ser un array con al menos un elemento');
            }
            value.forEach((v) => {
                if (typeof v !== 'string' || v.length < 3 || v.length > 90) {
                    throw new Error('Cada elemento de la capital debe tener entre 3 y 90 caracteres');
                }
            });
            return true; // Si todo es válido, devolvemos true
        })
        .withMessage('La capital debe ser un array o una cadena separada por comas'),

    // Fronteras (convertir en array si es una cadena de texto)
    body('borders')
        .custom((value) => {
            if (typeof value === 'string') {
                // Si es una cadena de texto, lo convertimos a un array separado por comas
                value = value.split(',').map((v) => v.trim());
            }
            // Validamos que ahora sea un array con los elementos correctos
            if (!Array.isArray(value) || value.length === 0) {
                throw new Error('Las fronteras deben ser un array con al menos un código');
            }
            value.forEach((v) => {
                if (!/^[A-Z]{3}$/.test(v)) {
                    throw new Error('Cada código de frontera debe ser una cadena de 3 letras mayúsculas');
                }
            });
            return true; // Si todo es válido, devolvemos true
        })
        .withMessage('Las fronteras deben ser un array o una cadena separada por comas con códigos de 3 letras mayúsculas'),

      
    // Área (número positivo)
    body('area')
        .isFloat({ gt: 0 }).withMessage('El área debe ser un número positivo'),

    // Población (número entero positivo)
    body('population')
        .isInt({ gt: 0 }).withMessage('La población debe ser un número entero positivo'),

    // Gini (valor entre 0 y 100)
    body('gini')
        .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100'),

    manejarErroresDeValidacion,  // Llamada para manejar los errores de validación
];
