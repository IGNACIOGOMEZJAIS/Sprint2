import express from 'express'; 
import {connectDB } from './config/dbConfig.mjs'; 
import superHeroRoutes from './routes/superHeroRoutes.mjs'; 
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const app = express(); 
const PORT = process.env.PORT || 3000; 
app.use(express.json()); 
connectDB(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/api', superHeroRoutes); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Manejo de errores para rutas no encontradas 
app.get('/', (req, res) => res.render('index'));
app.use('/superheroes', superHeroRoutes);

// Configurar carpeta de archivos estáticos
app.use(express.static('public'));

app.use((req, res) => { 
    res.status(404).send({ mensaje: "Ruta no encontrada" }); 
}); 
// Iniciar el servidor 
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
}); 
