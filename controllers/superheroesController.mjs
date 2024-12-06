import { body, param, validationResult } from 'express-validator';
import manejarErroresDeValidacion from '../validation/validation.mjs';
import { 
    obtenerSuperheroesMayoresDe30, 
    obtenerTodosLosSuperheroes,
    obtenerSuperheroePorId, 
    buscarSuperheroesPorAtributo, 
    actualizarSuperHeroe, 
    borrarSuperHeroe, 
    borrarSuperHeroePorNombre, 
    crearSuperHeroe
} from '../Services/superheroesService.mjs';
import { renderizarListaSuperheroes, renderizarSuperheroe } from '../views/responseView.mjs';

// Controlador para obtener un superhéroe por ID
export async function obtenerSuperheroePorIdController(req, res) { 
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id); 
        if (superheroe) { 
            res.send(renderizarSuperheroe(superheroe)); 
        } else { 
            res.status(404).send({ mensaje: "Superhéroe no encontrado" }); 
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener el superhéroe", error: error.message });
    }
}

// Controlador para obtener todos los superhéroes
export async function obtenerTodosLosSuperheroesController(req, res) { 
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); 
        res.render('dashboard', { superheroes, title: 'Dashboard' });
    } catch (error) {
        res.status(500).send({
            mensaje: "Error al obtener la lista de superhéroes",
            error: error.message,
        });
    }
}

// Controlador para buscar superhéroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res) { 
    try {
        const { atributo, valor } = req.params; 
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor); 
        if (superheroes.length > 0) { 
            res.send(renderizarListaSuperheroes(superheroes)); 
        } else { 
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al buscar superhéroes", error: error.message });
    }
}

// Controlador para obtener superhéroes mayores de 30 años
export async function obtenerSuperheroesMayoresDe30Controller(req, res) { 
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30(); 
        res.send(renderizarListaSuperheroes(superheroes)); 
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener los superhéroes mayores de 30", error: error.message });
    }
}

// Controlador para crear un nuevo superhéroe
export async function crearSuperHeroeController(req, res) {
    try {
        const nuevoSuperheroe = {
            nombreSuperHeroe: req.body.nombreSuperHeroe.trim(),
            nombreReal: req.body.nombreReal.trim(),
            edad: parseInt(req.body.edad, 10),
            planetaOrigen: req.body.planetaOrigen.trim(),
            debilidad: req.body.debilidad.trim(),
            poderes: Array.isArray(req.body.poderes)
                ? req.body.poderes
                : req.body.poderes.split(',').map((p) => p.trim()),
            aliados: Array.isArray(req.body.aliados)
                ? req.body.aliados
                : req.body.aliados.split(',').map((a) => a.trim()),
            enemigos: Array.isArray(req.body.enemigos)
                ? req.body.enemigos
                : req.body.enemigos.split(',').map((e) => e.trim()),
        };
        const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
        res.status(201).redirect('/superheroes'); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar superhéroe', error: error.message });
    }
}

// Controlador para mostrar un superhéroe en el formulario de edición
export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id); 
        if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        res.render('editSuperhero', { superheroe, title: 'Editar Superhéroe' });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener el superhéroe para edición", error: error.message });
    }
}

// Controlador para actualizar un superhéroe editado
export async function actualizarSuperheroeEditadoController(req, res) {
    try {
        const { id } = req.params;
        const {
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poderes,
            aliados,
            enemigos,
        } = req.body;

        const superheroeActualizado = {
            nombreSuperHeroe,
            nombreReal,
            edad: parseInt(edad, 10), 
            planetaOrigen,
            debilidad,
            poderes: poderes.split(',').map((p) => p.trim()),
            aliados: aliados.split(',').map((a) => a.trim()),
            enemigos: enemigos.split(',').map((e) => e.trim()),
        };

        const resultado = await actualizarSuperHeroe(id, superheroeActualizado);
        if (!resultado) {
            return res.status(404).send('No se pudo actualizar el superhéroe.');
        }
        res.status(201).redirect('/superheroes'); 
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message });
    }
}

// Controlador para borrar un superhéroe por ID
export async function borrarSuperHeroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await borrarSuperHeroe(id);
        if (!superheroeEliminado) {
            return res.status(404).send('Superhéroe no encontrado o no se pudo eliminar.');
        }
        res.redirect('/superheroes');
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}

// Controlador para borrar un superhéroe por nombre
export async function borrarSuperHeroePorNombreController(req, res) {
    try {
        const { nombreSuperHeroe } = req.params;
        const heroeBorrado = await borrarSuperHeroePorNombre(nombreSuperHeroe);
        if (heroeBorrado) {
            res.status(200).send({ mensaje: `Superhéroe ${nombreSuperHeroe} borrado exitosamente` });
        } else {
            res.status(404).send({ mensaje: `Superhéroe ${nombreSuperHeroe} no encontrado` });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al borrar el superhéroe", error: error.message });
    }
}
