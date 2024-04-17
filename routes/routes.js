    import express, { Router } from 'express';
     import path from 'path'
     import {
       agregarUser,
       verUsers,
       editaruser,
       eliminarUser,
       agregarTransfer,
       verTransfers,
     } from "../queries/queries.js";
     const router = express.Router();
     const __dirname = import.meta.dirname
     
     
     //ruta principal
     
     router.get('/', (req, res) => {
         res.sendFile(path.join(__dirname, '../views/index.html'))
     })


     //1_post
     router.post('/usuario', async (req, res) => {
        try {
                    const { nombre, balance } = req.body;
                    const datos = [nombre, balance];
                    const result = await agregarUser(datos);
                    res.send(result.rows);
        } catch (error) {
            res.status(500).send(error.message)
        }
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


     /// creamos controllers, para enviar alla las queries