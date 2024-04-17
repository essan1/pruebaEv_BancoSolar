import db from "../config/db.js"

//1_ post

const agregarUser = async (datos) => {
    try {
        const query = {
            text: "insert into usuarios (nombre, balance) values ($1, $2) returning *",
            values: datos,
        };
        const result = await db.query(query);
        console.log(result.rows);
        return result.rows
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

//3__ delete

export {
    agregarUser,
    verUsers
}