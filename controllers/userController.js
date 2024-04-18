import path from "path";
/* import { agregarUser } from "../queries/queries.js" */
const __dirname = import.meta.dirname;


const verIndex = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

export { verIndex };
