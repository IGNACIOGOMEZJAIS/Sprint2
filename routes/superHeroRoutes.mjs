import express from 'express'; 
import { 
obtenerSuperheroePorIdController, 
obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller,
crearSuperHeroeController,
borrarSuperHeroeController,
borrarSuperHeroePorNombreController,
editarSuperheroeController,
actualizarSuperheroeEditadoController,
} from '../controllers/superheroesController.mjs'; 
import { validarCrearSuperHeroe } from '../validation/validation.mjs';
import { validarActualizarSuperHeroe } from '../validation/actualizarValidar.mjs';
const router = express. Router(); 
router.get('/', obtenerTodosLosSuperheroesController);
router.get('/buscarID/:id', obtenerSuperheroePorIdController);
router.get('/agregar', (req, res) => { 
    res.render('addSuperhero'); 
});
router.get('/heroes/buscar/nuevo/:atributo/:valor', buscarSuperheroesPorAtributoController); 
router.get('/heroes/mayor/mayores-30', obtenerSuperheroesMayoresDe30Controller); 
router.post('/agregar',validarCrearSuperHeroe,(req, res) => {
    crearSuperHeroeController(req, res);
});
router.get('/:id/editar', editarSuperheroeController);



router.post('/:id/editar',validarActualizarSuperHeroe,actualizarSuperheroeEditadoController);
router.delete('/:id', borrarSuperHeroeController);
router.delete('/heroes/nombre/:nombreSuperHeroe', borrarSuperHeroePorNombreController);
export default router; 
