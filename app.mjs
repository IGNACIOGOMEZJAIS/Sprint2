import express from 'express'; 
import { connectDB } from './config/dbConfig.mjs'; 
import superHeroRoutes from './routes/superHeroRoutes.mjs'; 
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Conexión a la base de datos
connectDB(); 

// Configuración de rutas y vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.get('/', (req, res) => res.render('index', { title: 'Inicio' })); 
app.use('/superheroes', superHeroRoutes);

app.use((req, res) => { 
    res.status(404).render('404', { title: 'Página no encontrada' }); 
});

// Servidor
app.listen(PORT,'0.0.0.0' ,() => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
});
