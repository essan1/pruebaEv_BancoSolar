import express from "express";

import {
  verIndex,
  addUser,
  getUsers,
  updateUsers,
  deleteUser,
} from "../controllers/userController.js";

import {
  addTransfer,
  getTransfers,
} from "../controllers/transferController.js";

const router = express.Router();

//ruta principal
router.get("/", verIndex);

//1_post
router.post("/usuario", addUser);

//2.ver
router.get("/usuarios", getUsers);

//3. Editar
router.put("/usuario", updateUsers);

//4. delete
router.delete("/usuario", deleteUser);

//5. transferencia ahcer
router.post("/transferencia", addTransfer);

//6. transferencia ver
router.get("/transferencias", getTransfers);

//ruta generica
router.get("*", (req, res) => {
  res.status(400);
  res.send("<h1><center>404 ERROR -- Pagina No Encontrada</center></h1>");
});

export default router;
