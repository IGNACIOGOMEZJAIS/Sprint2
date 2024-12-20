import fetch from 'node-fetch';
import { crearPais } from '../Services/CountriesService.mjs';

export async function fetchAndCreateCountries(API_URL) {
    try {
        // Consumir la API
        const response = await fetch(API_URL);
        const countries = await response.json();

        // Filtrar y procesar los países que hablan español
        const spanishSpeakingCountries = countries.filter(country => {
            return country.languages && Object.values(country.languages).includes('Spanish');
        });

        const processedCountries = spanishSpeakingCountries.map(country => {
            const {
                translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings,
                car, coatOfArms, postalCode, demonyms, languages, gini, // Extraemos "languages" y "gini"
                ...remainingProperties
            } = country;

            // Convertir el objeto de idiomas a un array de strings
            const languageArray = languages ? Object.values(languages) : [];

            // Extraer el valor más reciente del índice Gini
            const giniValue = gini ? gini[Math.max(...Object.keys(gini).map(year => parseInt(year)))] : null;

            return {
                ...remainingProperties,
                languages: languageArray, // Ahora es un array de strings
                gini: giniValue, // Guardamos el valor más reciente de Gini
                creador: "Ignacio Agustin Gomez Jais"
            };
        });

        // Guardar los países en la base de datos
        for (const country of processedCountries) {
            try {
                await crearPais(country);
            } catch (dbError) {
                console.error(`Error al guardar el país ${country.name.common}:`, dbError.message);
            }
        }

        console.log('Países procesados y guardados exitosamente.');
    } catch (error) {
        console.error('Error al consumir o guardar los países:', error.message);
    }
}
