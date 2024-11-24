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
import { renderizarListaSuperheroes } from '../views/responseView.mjs';




export async function obtenerSuperheroePorIdController(req, res) { 
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id); 
    if (superheroe) { 
        res.send(renderizarSuperheroe(superheroe)); 
    } else { 
        res.status(404).send({ mensaje: "Superhéroe no encontrado" }); 
    } 
}

export async function obtenerTodosLosSuperheroesController(req, res) { 
    try{
        const superheroes = await obtenerTodosLosSuperheroes(); 
        res.render('dashboard', { superheroes });

    }catch(error){
        res.status(500).send({
            mensaje: "Error al obtener la lista de superhéroes",
            error: error.message,
          });
    }
}
    
        
    

export async function buscarSuperheroesPorAtributoController(req, res) { 
    const { atributo, valor } = req.params; 
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor); 
    if (superheroes.length > 0) { 
        res.send(renderizarListaSuperheroes(superheroes)); 
    } else { 
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) { 
    const superheroes = await obtenerSuperheroesMayoresDe30(); 
    res.send(renderizarListaSuperheroes(superheroes)); 
}





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
      res.status(500).json({ error: 'Error al agregar superhéroe: ' + error.message });
    }
  }





  
      export async function editarSuperheroeController (req, res){
        try {
          const { id } = req.params;
          const superheroe = await obtenerSuperheroePorId(id); 
      
          if (!superheroe) {
            return res.status(404).send('Superhéroe no encontrado');
          }
      
          res.render('editSuperhero', { superheroe });
        } catch (error) {
          console.error('Error al obtener el superhéroe para edición:', error);
          res.status(500).send('Error interno del servidor');
        }
      };

      export async function actualizarSuperheroeEditadoController (req, res){
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
      
          const poderesArray = poderes.split(',').map(p => p.trim());
          const aliadosArray = aliados.split(',').map(a => a.trim());
          const enemigosArray = enemigos.split(',').map(e => e.trim());
      
          const superheroeActualizado = {
            nombreSuperHeroe,
            nombreReal,
            edad: parseInt(edad, 10), 
            planetaOrigen,
            debilidad,
            poderes: poderesArray,
            aliados: aliadosArray,
            enemigos: enemigosArray,
          };
      
          const resultado = await actualizarSuperHeroe(id, superheroeActualizado);
      
          if (!resultado) {
            return res.status(404).send('No se pudo actualizar el superhéroe.');
          }
      
          res.status(201).redirect('/superheroes'); 
        } catch (error) {
          console.error('Error al actualizar el superhéroe:', error);
          res.status(500).send('Error interno del servidor');
        }
      };


    export async function borrarSuperHeroeController(req, res) {
        try {
          const { id } = req.params;
      
          const superheroeEliminado = await borrarSuperHeroe(id);
      
          if (!superheroeEliminado) {
            return res.status(404).send('Superhéroe no encontrado o no se pudo eliminar.');
          }
      
          res.redirect('/superheroes');
        } catch (error) {
          console.error('Error al eliminar el superhéroe:', error);
          res.status(500).send('Error interno del servidor');
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

    
