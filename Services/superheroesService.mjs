import superHeroRepository from '../Repositories/SuperHeroesRepository.mjs';

export async function obtenerSuperheroePorId(id) { 
    return await superHeroRepository.obtenerPorId(id); 
} 
export async function obtenerTodosLosSuperheroes() { 
    return await superHeroRepository.obtenerTodos (); 
} 
export async function buscarSuperheroesPorAtributo(atributo, valor) { 
    return await superHeroRepository.buscarPorAtributo (atributo, valor); 
} 
export async function obtenerSuperheroesMayoresDe30() { 
    return await superHeroRepository.obtenerMayoresDe30(); 
} 
export async function crearSuperHeroe(heroe) { 
    return await superHeroRepository.crearSuperHeroe(heroe); 
} 
export async function actualizarSuperHeroe(id, heroeData) { 
    return await superHeroRepository.actualizarSuperHeroe(id, heroeData); 
}
export async function borrarSuperHeroe(id) { 
    return await superHeroRepository.borrarSuperHeroe(id); 
}
export async function borrarSuperHeroePorNombre(nombreSuperHeroe) {
    return await superHeroRepository.borrarSuperHeroePorNombre(nombreSuperHeroe);
}
