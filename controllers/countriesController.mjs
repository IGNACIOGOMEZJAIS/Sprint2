import { body, param, validationResult } from 'express-validator';
import manejarErroresDeValidacion from '../validation/validation.mjs';
import {fetchAndCreateCountries} from "../Services/ApiPaises.mjs";
import {
    obtenerPaisPorId,
    obtenerTodosLosPaises,
    crearPais,
    actualizarPais,
    borrarPais,
} from '../Services/CountriesService.mjs';
import countries from '../models/countries.mjs';

export async function obtenerPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);
        if (pais) {
            res.status(200).json(pais);
        } else {
            res.status(404).send({ mensaje: "País no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener el país", error: error.message });
    }
}

export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises();
        res.render('dashboard', { paises, title: 'Dashboard' });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener la lista de países", error: error.message });
    }
}



export async function crearPaisController(req, res) {
    try {
        // Validar los datos recibidos
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores.array() });
        }

        if (req.body.capital && typeof req.body.capital === 'string') {
            req.body.capital = req.body.capital
                .split(',')
                .map(ciudad => ciudad.trim()); 
            }
        if (req.body.timezones && typeof req.body.timezones === 'string') {
            // Asegurarnos de que sea una cadena de texto válida
            req.body.timezones = req.body.timezones
                .split(',') // Separar por coma
                .map(timezones => timezones.trim()); 
            }
        if (req.body.languages && typeof req.body.languages === 'string') {
            // Asegurarnos de que sea una cadena de texto válida
            req.body.languages = req.body.languages
                .split(',') // Separar por coma
                .map(languages => languages.trim()); 
            }
        if (req.body.borders && typeof req.body.borders === 'string') {
            // Asegurarnos de que sea una cadena de texto válida
            req.body.borders = req.body.borders
                .split(',') // Separar por coma
                .map(borders => borders.trim()); 
            }
        if (req.body.latlng && typeof req.body.latlng === 'string') {
            req.body.latlng = req.body.latlng
                .split(',') // Separar por coma
                .map(coord => parseFloat(coord.trim())); // Convertir cada parte en número
        }

        const nuevoPais = { ...req.body };

        // Crear una nueva instancia del modelo de país

        // Guardar en la base de datos
        const nuevoPaisGuardado = await crearPais(nuevoPais);

        // Enviar la respuesta al cliente
        res.status(201).redirect('/paises');  // Redirige a la lista de países después de guardar el nuevo país
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error al crear el país", error: error.message });
    }
}



export async function borrarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisEliminado = await borrarPais(id);
        if (!paisEliminado) {
            res.status(404).send({ mensaje: "País no encontrado o no se pudo eliminar" });
        } 
        res.redirect('/paises');
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el país", error: error.message });
    }
}
export async function editarPaisController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id); 
        console.log(pais);
        if (!pais) {
            return res.status(404).send('País no encontrado');
        }
        res.render('editCountry', { pais, title: 'Editar País' });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener el país para edición", error: error.message });
    }
}

// Controlador para actualizar un país editado
export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisData = req.body;

        // Validar los datos recibidos
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores.array() });
        }

        // Actualizar el país en la base de datos
        const paisActualizado = await actualizarPais(id, paisData);

        if (!paisActualizado) {
            return res.status(404).send('No se pudo actualizar el país.');
        }

        res.status(201).redirect('/paises');  // Redirige a la lista de países después de actualizar
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el país", error: error.message });
    }
}
export async function inicializarPaisesController(req, res) {
    try {
        const API_URL = 'https://restcountries.com/v3.1/all';
        await fetchAndCreateCountries(API_URL);
        res.status(200).send('Países cargados exitosamente.');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar los países', error: error.message });
    }
}


