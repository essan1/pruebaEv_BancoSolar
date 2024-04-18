import { agregarTransfer, verTransfers } from "../queries/queries.js";

const addTransfer = async(req, res) => {
        try {
             const {emisor, receptor, monto} = req.body;
             const datos = [emisor, receptor, monto];
             const result = await agregarTransfer(datos);
             res.status(200).send(result);
        } catch (error) {
            console.log(error.message);
        }
     }

const getTransfers = async (req, res) => {
  try {
    const result = await verTransfers();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export { addTransfer, getTransfers };