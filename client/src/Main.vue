<script setup lang="ts">
import Contactos from "./components/Contactos.vue";
import NavBar from "./components/NavBar.vue";
import Chat from "./components/Chat.vue";
import { ref } from "vue";

let fotoChat = ref("");
let nombreChat = ref("");
let selectedChat = ref(false);

function changeChat(foto: string, nombre: string) {
  fotoChat.value = foto;
  nombreChat.value = nombre;
  console.log(fotoChat.value);
  selectedChat.value = true;
}
</script>

<template>
  <div class="grid grid-cols-3 h-[100dvh] container mx-auto">
    <aside class="col-span bg-[#128C7E]">
      <NavBar />
      <Contactos :change-chat="changeChat" />
    </aside>
    <main class="col-span-2 bg-gray-200">
      <Chat
        :foto-chat="fotoChat"
        :nombre-chat="nombreChat"
        v-if="selectedChat"
      />
      <div
        class="flex items-center bg-[#c7c7c7] justify-center h-[100%]"
        v-else
      >
        <img class="w-[30%]" src="/noSelectedChat.webp" alt="" />
      </div>
    </main>
  </div>
</template>
