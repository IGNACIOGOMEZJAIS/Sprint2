import express from 'express'; 
import { actualizarPaisController,  borrarPaisController,  crearPaisController, editarPaisController, inicializarPaisesController, obtenerTodosLosPaisesController } from '../controllers/countriesController.mjs'; 
import { obtenerPaisPorId } from '../Services/CountriesService.mjs';
import { validarCrearPais, validarEdit } from '../validation/validation.mjs';
const router = express.Router(); 


router.get('/', obtenerTodosLosPaisesController);
router.get('/buscarID/:id', obtenerPaisPorId);
router.get('/agregar', (req, res) => { 
    res.render('addPais',{title:'Agregar'}); 
});
router.post('/agregar',validarCrearPais,(req, res) => {
    crearPaisController(req, res);
});



router.get('/editar/:id', editarPaisController); 
router.post('/editar/:id', validarEdit, actualizarPaisController);
router.delete('/delete/:id',borrarPaisController);
router.get('/cargar-paises', inicializarPaisesController);

export default router; 
