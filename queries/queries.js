import db from "../config/db.js"

//1_ post

const agregarUser = async (datos) => {
    try {
        const query = {
            text: "insert into usuarios (nombre, balance) values ($1, $2) returning *",
            values: datos,
        };
        const result = await db.query(query);
        return result.rows[0]
    } catch (error) {
        console.log(error.message);
    }
}

//2_ ver 

const verUsers = async () => {
    try {
        const query = {
            text: "select * from usuarios"
        }
        const result = await db.query(query)
        return result.rows
    } catch (error) {
        console.log(error.message);
    }
}

//3__ editar

const editarUser = async(nombre, balance, id) => {
    try {
        const query = {
            text: "update usuarios set nombre = $1, balance = $2 where id = $3 returning *",
            values: [nombre, balance, id],
        };
        const result = await db.query(query);
        //validamos el que el cambio se haya ejecutado correctamente
        if (result.rowCount === 0 ){
            throw new Error('no se edito el user');
        } else {
            result.rows[0]
        }
    } catch (error) {
        console.log(error.message);
}
};

// 4__ deleteUser

const eliminarUser = async(id) => {
    try {
        const query = {
            text: "delete from usuarios where id = $1 returning *",
            values: [id]
        }
        const result = await db.query(query);
        if (result.rowCount === 0) {
            throw new Error('no se elimino el user');
        } else {
            result.rows[0]
        } return result.rows[0]
    } catch (error) {
        console.log(error);
    }
}


//agregar transfer 
const agregarTransfer = async (datos) => {
  //buscamos el id del emisor
  const { emisor, receptor, monto } = datos;
  const { id: emisorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];
  //buscamos el id del receptor
  const { id: receptorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];
  const registerTranfer = {
    text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
    values: [emisorId, receptorId, monto],
  };
  const updateBalanceEmisor = {
    text: "UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2 RETURNING *",
    values: [monto, emisor],
  };
  const updateBalanceReceptor = {
    text: "UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2 RETURNING *",
    values: [monto, receptor],
  };

  try {
    await pool.query("BEGIN");
    await pool.query(registerTranfer);
    await pool.query(updateBalanceEmisor);
    await pool.query(updateBalanceReceptor);
    await pool.query("COMMIT");
    return true;
  } catch (error) {
    await pool.query("ROLLBACK");
    return error;
  }
};

//ver trasnfers
const verTransfers = async () => {
  try {
    const querys = {
      text: `SELECT
        e.nombre AS emisor,
        r.nombre AS receptor,
        t.monto,
        t.fecha
      FROM
        transferencias t
      JOIN
        usuarios e ON t.emisor = e.id
      JOIN
        usuarios r ON t.receptor = r.id;`,
      rowMode: "array",
    };
    const result = await pool.query(querys);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    return error;
  }
};




export {
  agregarUser,
  verUsers,
  editarUser,
  eliminarUser,
  agregarTransfer,
  verTransfers,
};