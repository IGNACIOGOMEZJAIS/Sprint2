import { obtenerSuperheroesMayoresDe30, obtenerTodosLosSuperheroes,obtenerSuperheroePorId, buscarSuperheroesPorAtributo, crearSuperHeroe, actualizarSuperHeroe, borrarSuperHeroe, borrarSuperHeroePorNombre } from '../Services/superheroesService.mjs';
import { renderizarListaSuperheroes, renderizarSuperheroe } from '../view/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) { 
const {id} = req.params; 
const superheroe = await obtenerSuperheroePorId(id); 
if (superheroe) { 
res.send(renderizarSuperheroe (superheroe)); 
} else { 
res.status(404).send({ mensaje: "Superhéroe no encontrado" }); 
} 
} 
export async function obtenerTodosLosSuperheroesController (req, res) { 
const superheroes = await obtenerTodosLosSuperheroes(); 
res.send(renderizarListaSuperheroes (superheroes)); 
} 
export async function buscarSuperheroesPorAtributoController (req, res) { 
const { atributo, valor } = req.params; 
const superheroes = await buscarSuperheroesPorAtributo(atributo, valor); 
if (superheroes.length > 0) { 
res.send(renderizarListaSuperheroes (superheroes)); 
} else { 
} 
res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" }) 
} 
export async function obtenerSuperheroesMayoresDe30Controller (req, res) { 
    const superheroes = await obtenerSuperheroesMayoresDe30(); res.send(renderizarListaSuperheroes (superheroes)); 
} 
export async function crearSuperHeroeController(req, res) {
    try {
        const heroe = req.body; 
        const nuevoHeroe = await crearSuperHeroe(heroe);
        res.status(201).send(nuevoHeroe); 
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el superhéroe' });
    }
}

export async function actualizarSuperHeroeController(req, res) {
    const { id } = req.params;
    const heroeData = req.body;

    try {
        const heroeActualizado = await actualizarSuperHeroe(id, heroeData);
        
        if (heroeActualizado) {
            res.status(200).send(heroeActualizado);
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el superhéroe' });
    }
}

    export async function borrarSuperHeroeController(req, res) {
        const { id } = req.params;
    
        try {
            const heroeBorrado = await borrarSuperHeroe(id); 
            
            if (heroeBorrado) {
                res.status(200).send({ mensaje: "Superhéroe borrado exitosamente" });
            } else {
                res.status(404).send({ mensaje: "Superhéroe no encontrado" });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error al borrar el superhéroe' });
        }
    }
    export async function borrarSuperHeroePorNombreController(req, res) {
        const { nombreSuperHeroe } = req.params;
    
        try {
            const heroeBorrado = await borrarSuperHeroePorNombre(nombreSuperHeroe);
            
            if (heroeBorrado) {
                res.status(200).send({ mensaje: `Superhéroe ${nombreSuperHeroe} borrado exitosamente` });
            } else {
                res.status(404).send({ mensaje: `Superhéroe ${nombreSuperHeroe} no encontrado` });
            }
        } catch (error) {
            res.status(500).send({ error: 'Error al borrar el superhéroe' });
        }
    }
