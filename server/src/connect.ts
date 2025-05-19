import { createConnection, MysqlError } from "mysql";
import { VARIABLES } from "./conf.js";

const conn = createConnection({
  host: VARIABLES.host,
  user: VARIABLES.user,
  password: VARIABLES.password,
  database: VARIABLES.database,
});

conn.connect((err: MysqlError) => {
  if (err) {
    console.log(`Error en la conexion de la bd: ${err}`);

    conn.end();

    return;
  }
  console.log("Conectado correctamente");
});

export { conn };
