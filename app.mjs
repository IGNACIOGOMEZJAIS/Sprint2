import express from 'express'; 
import { connectDB } from './config/dbConfig.mjs'; 
import countriesRoutes from './routes/countriesRoutes.mjs'; 
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import expressEjsLayouts from 'express-ejs-layouts';
const app = express(); 
const PORT = process.env.PORT || 3000; 

connectDB(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'Inicio' })); 
app.use('/paises',countriesRoutes);

app.use((req, res) => { 
    res.status(404).render('404', { title: 'Página no encontrada' }); 
});
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);  // Verifica si está enviando DELETE
    next();
});
// Servidor
app.listen(PORT,'0.0.0.0' ,() => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
});
