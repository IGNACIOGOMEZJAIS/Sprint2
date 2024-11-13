import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        const query = { [atributo]: new RegExp(valor, 'i') };
        return await SuperHero.find(query);
    }

    async crearSuperHeroe(heroe) {
        return await SuperHero.create(heroe);
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            $expr: { $gte: [{ $size: "$poderes" }, 2] } 
        });
    }
    async actualizarSuperHeroe(id, heroeData) {
        return await SuperHero.findByIdAndUpdate(id, heroeData, { new: true });
    }
    async borrarSuperHeroe(id) {
        return await SuperHero.findByIdAndDelete(id,{ new: true });
    }
    async borrarSuperHeroePorNombre(nombreSuperHeroe) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe });
    }
    
}

export default new SuperHeroRepository();
