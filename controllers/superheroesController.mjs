import { obtenerSuperheroesMayoresDe30, obtenerTodosLosSuperheroes,obtenerSuperheroePorId, buscarSuperheroesPorAtributo } from '../Services/superheroesService.mjs';
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