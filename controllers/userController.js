import path from "path";
import { agregarUser, verUsers, editarUser, eliminarUser} from "../queries/queries.js";
const __dirname = import.meta.dirname;


const verIndex = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const addUser = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const datos = [nombre, balance];
    const result = await agregarUser(datos);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const mostrarUsers = await verUsers();
    res.json(mostrarUsers);
  } catch (error) {
    res.send(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.query;
    const { nombre, balance } = req.body;

    const result = await editarUser(nombre, balance, id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await eliminarUser(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};




export { verIndex, addUser, getUsers, updateUsers, deleteUser };
