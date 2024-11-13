class IRepository {
    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor) {
        throw new Error("Método 'buscarPorAtributo()' no implementado");
    }

    obtenerMayoresDe30() {
        throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }
    crearSuperHeroe() {
        throw new Error("Método 'crearSuperHeroe()' no implementado");
    }
    actualizarSuperHeroe() {
        throw new Error("Método 'actualizarSuperHeroe()' no implementado");
    }
    borrarSuperHeroe() {
        throw new Error("Método 'actualizarSuperHeroe()' no implementado");
    }
    borrarSuperHeroePorNombre() {
        throw new Error("Método 'borrarSuperHeroePorNombre()' no implementado");
    }

}

export default IRepository;
