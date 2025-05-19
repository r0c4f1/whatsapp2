<script setup lang="ts">
import { onMounted, ref } from "vue";

let { changeChat } = defineProps<{
  changeChat: (foto: string, nombre: string) => void;
}>();

interface Contactos {
  id_contacto: number;
  id_room: string;
  id_usuario: number;
  nombre: string;
  foto: string;
  ult_msg: string;
  fecha_creacion: string;
}

let contactos = ref<Contactos[]>([]);

onMounted(async () => {
  let query = await fetch("http://localhost:3000/getContactos");
  let data = await query.json();

  contactos.value = data;

  console.log(contactos.value);
});
</script>

<template>
  <ul class="list bg-base-100 shadow-md">
    <li
      v-for="contacto of contactos"
      :key="contacto.id_room"
      @click="changeChat(contacto.foto, contacto.nombre)"
      class="list-row hover:bg-gray-100 cursor-pointer"
    >
      <div>
        <img class="size-10 rounded-box" :src="contacto.foto" />
      </div>
      <div>
        <div>{{ contacto.nombre }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ contacto.ult_msg }}
        </div>
      </div>
    </li>
  </ul>
</template>
