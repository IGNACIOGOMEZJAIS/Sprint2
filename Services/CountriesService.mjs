import countryRepository from '../Repositories/CountriesRepository.mjs';

export async function obtenerPaisPorId(id) { 
    return await countryRepository.obtenerPorId(id); 
} 



export async function obtenerTodosLosPaises() {
    try {
        // Obtener todos los países desde el repositorio
        const todosLosDatos = await countryRepository.obtenerTodos();

        // Procesar los datos con tolerancia a errores
        const paisesProcesados = todosLosDatos.map(pais => {
            const {
                _id,
                name,
                population,
                area,
                region,
                subregion,
                capital,
                flags,
                borders,
                timezones,
                gini,
                creador,
                languages,
            } = pais;

            return {
                _id,
                nombreComun: name?.common || 'Desconocido',
                nombreOficial: name?.official || 'Desconocido',
                poblacion: population || 0,
                area: area || 0,
                region: region || 'Desconocida',
                subregion: subregion || 'Desconocida',
                capital: capital,
                languages: Array.isArray(languages) ? languages : [],
                bandera: flags?.svg || '',
                timezones: Array.isArray(timezones) ? timezones : [],
                borders: Array.isArray(borders) ? borders : [],
                gini: gini || null,
                creador: creador || 'Desconocido',
            };
        });

        // Filtrar países con datos válidos, creados por Ignacio, y que incluyan "Spanish"
        const paisesIgnacio = paisesProcesados.filter(pais => {
            return (
                pais.nombreOficial !== 'Desconocido' &&
                pais.capital !== 'Desconocida' &&
                pais.area > 0 &&
                pais.poblacion > 0 &&
                pais.creador === 'Ignacio Agustin Gomez Jais' &&
                pais.languages.includes('Spanish') // Aquí verificamos que "languages" incluya "Spanish"
            );
        });

        // Log para saber cuántos países fueron creados por Ignacio
        console.log(`Se encontraron ${paisesIgnacio.length} países creados por Ignacio Agustin Gomez Jais que hablan español.`);

        // Retornar solo los países que cumplen los criterios
        return paisesIgnacio;
    } catch (error) {
        console.error('Error al obtener los países:', error.message || error);
        throw error;
    }
}


export async function crearPais(pais) { 
    const paisesCreados = await countryRepository.crearPais(pais); 
    return paisesCreados;
} 

export async function actualizarPais(id, paisData) { 
    return await countryRepository.actualizarPais(id, paisData); 
} 

export async function borrarPais(id) { 
    return await countryRepository.borrarPais(id); 
}


