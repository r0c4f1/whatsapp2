<script setup lang="ts">
import { io, Socket } from "socket.io-client";
import NavBar from "./NavBar.vue";
import { ref, watch } from "vue";

let { fotoChat, nombreChat } = defineProps<{
  fotoChat: string;
  nombreChat: string;
}>();

// Tipos (deben coincidir con el servidor)
interface ServerToClientEvents {
  message: (data: { text: string; userId: string }) => void;
  chatMessage: (msg: string, isSending: boolean) => void;
}
interface ClientToServerEvents {
  message: (data: { text: string; userId: string }) => void;
  chatMessage: (data: string, idUser: string, idContacto: string) => void;
  joinChat: (usuarioId: string, contactoId: string) => void;
}
type Message = {
  text: string;
  isSending: boolean;
  hour: string;
};

const URL = "http://localhost:3000"; // URL del servidor
const newMessage = defineModel();
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);

// socket.connect(); comprueba la conexion al socket

function obtenerHoraFormateadaDesdeDate(date = new Date()) {
  let hora = date.getHours();
  const minutos = date.getMinutes();
  const periodo = hora >= 12 ? "PM" : "AM";

  // Convertir hora a formato 12-Horas
  hora = hora % 12 || 12;

  return {
    hora,
    minutos,
    periodo,
    toString() {
      return `${hora}:${minutos.toString().padStart(2, "0")} ${periodo}`;
    },
  };
}

async function sendMessage() {
  let msg = newMessage.value as string;
  let dato = {
    text: msg,
    date: obtenerHoraFormateadaDesdeDate().toString(),
  };

  let query = await fetch(`${URL}/setMessages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dato),
  });

  let data = await query.json();

  console.log(data);

  messages.value.push({
    text: msg,
    isSending: true,
    hour: new Date().toLocaleTimeString(),
  });
  socket.emit("chatMessage", msg, nombreChat, fotoChat);
}
let messages = ref<Message[]>([]);

socket.on("chatMessage", (message: string, isSending: boolean) => {
  //  if (remitenteId !== 'tu-id') { // Evitar duplicados si el remitente eres tú
  //   console.log('Mensaje de:', remitenteId, 'Contenido:', mensaje);
  //   // Actualizar el estado de Vue para mostrar el mensaje en el chat correcto
  // }
  messages.value.push({
    text: message,
    isSending,
    hour: new Date().toLocaleTimeString(),
  });
});

socket.emit("chatMessage", newMessage.value as string, nombreChat, fotoChat);
socket.emit("joinChat", nombreChat, fotoChat);

watch(
  () => nombreChat,
  () => {
    socket.emit("joinChat", nombreChat, fotoChat);
  }
);
</script>

<template>
  <div class="flex flex-col h-screen bg-[#F0F2F5]">
    <!-- Encabezado -->
    <header>
      <NavBar :foto="fotoChat" :name-chat="nombreChat" />
    </header>
    <!-- Área de mensajes -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Mensaje recibido -->

      <div
        :class="[!message.isSending ? 'chat chat-start' : 'chat chat-end']"
        v-for="message in messages"
      >
        <div
          :class="[
            !message.isSending
              ? 'chat-bubble bg-white text-[#3B4A54]'
              : 'chat-bubble bg-[#128C7E] text-primary-content',
          ]"
        >
          {{ message.text }}
        </div>
        <div class="chat-footer opacity-50 text-xs mt-1">
          {{ message.hour }}
        </div>
      </div>
    </div>

    <!-- Input para enviar mensajes -->
    <div class="p-4 border-t border-base-300 bg-base-200">
      <div class="flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Escribe un mensaje..."
          class="input input-bordered flex-1 bg-base-100"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" class="btn bg-[#128c86]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos personalizados (opcional) */
.chat-bubble {
  max-width: 70%;
}
</style>
