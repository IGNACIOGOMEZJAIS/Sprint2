import countries from '../models/countries.mjs';
import IRepository from './IRepository.mjs';

class CountriesRepository extends IRepository {
    async obtenerPorId(id) {
        return await countries.findById(id);
    }

    async obtenerTodos() {
        return await countries.find({});
    }

   
    async crearPais(country) {
        const paisesCreados = await countries.create(country);
        return paisesCreados;
        return await countries.create(country);
    }

   
    async actualizarPais(id, PaisData) {
        return await countries.findByIdAndUpdate(id, PaisData, { new: true });
    }
    async borrarPais(id) {
        return await countries.findByIdAndDelete(id,{ new: true });
    }
    
    
}

export default new CountriesRepository();
