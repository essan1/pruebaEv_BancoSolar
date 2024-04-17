    import express, { Router } from 'express';
     import path from 'path'
     import { agregarUser, verUsers }  from "../queries/queries.js"
     const router = express.Router();
     const __dirname = import.meta.dirname
     
     
     //ruta principal
     
     router.get('/', (req, res) => {
         res.sendFile(path.join(__dirname, '../views/index.html'))
     })


     //1_post
     router.post('/usuario', async (req, res) => {
        const {nombre, balance} = req.body;
        const user = [nombre, balance];
        const result = await agregarUser(user);
        res.json(result)
     })

     //2.ver
     router.get('/usuarios', async (req, res) => {
        const mostrarUsers = await verUsers();
        res.json(mostrarUsers)
     })
     
     
     //creamos nuestra ruta generica, simeprea al final
     router.get('*', (req, res) => {
         res.status(400);
         res.send('<h1><center>404 ERROR -- Pagina No Encontrada</center></h1>');
     })
     
     export default router;