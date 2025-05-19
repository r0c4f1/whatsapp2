import Express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { VARIABLES } from "./conf.js";
import { conn } from "./connect.js";

const app = Express();
app.use(
  cors({
    origin: VARIABLES.uri_client,
  })
);
app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);

const server = createServer(app);

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  chatMessage: (msg: string, isSending: boolean) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  chatMessage: (message: string, idUser: string, idContacto: string) => void;
  joinChat: (usuarioId: string, contactoId: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: VARIABLES.uri_client, // URL del frontend (Vite)
  },
});

app.get("/getContactos", (req, res) => {
  conn.query(
    "SELECT * FROM contactos WHERE id_room LIKE '%04248907707%'",
    (err, data) => {
      if (err) {
        console.log(err);
        res.json([]);
      }
      res.json(data);
    }
  );
});

app.post("/setMessages", (req, res) => {
  console.log(req.body);
  res.json("ok");
});

io.on("connection", (socket) => {
  socket.on("joinChat", async (usuarioId: string, contactoId: string) => {
    socket.join(`${usuarioId}-${contactoId}`);
  });

  socket.on(
    "chatMessage",
    (message: string, idUser: string, idContacto: string) => {
      const roomId = generarRoomId(idUser, idContacto);

      socket.to(`${idUser}-${idContacto}`).emit("chatMessage", message, false);
    }
  );
});

function generarRoomId(id1: string, id2: string): string {
  return [id1, id2].sort().join("-"); // Ej: "user1-user2"
}

server.listen(VARIABLES.port, () => {
  console.log("server running at http://localhost:3000");
});
