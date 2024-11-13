import express from 'express'; 
import { 
obtenerSuperheroePorIdController, 
obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller,
crearSuperHeroeController,
actualizarSuperHeroeController,
borrarSuperHeroeController,
borrarSuperHeroePorNombreController, 
} from '../controllers/superheroesController.mjs'; 
const router = express. Router(); 
router.get('/heroes', obtenerTodosLosSuperheroesController); 
router.get('/heroes/:id', obtenerSuperheroePorIdController); 
router.get('/heroes/buscar/nuevo/:atributo/:valor', buscarSuperheroesPorAtributoController); 
router.get('/heroes/mayor/mayores-30', obtenerSuperheroesMayoresDe30Controller); 
router.post('/heroes', crearSuperHeroeController); 
router.put('/heroes/:id', actualizarSuperHeroeController);
router.delete('/heroes/:id', borrarSuperHeroeController);
router.delete('/heroes/nombre/:nombreSuperHeroe', borrarSuperHeroePorNombreController);
export default router; 
