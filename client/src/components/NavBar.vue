<script setup lang="ts">
defineProps<{
  foto?: string;
  nameChat?: string;
}>();
</script>

<template>
  <div class="navbar bg-[#128C7E] shadow-sm border-b border-[#ddd]">
    <div class="flex-1 flex items-center">
      <img
        :src="foto"
        alt=""
        v-show="nameChat"
        class="w-10 ms-8 rounded-lg m-2"
      />
      <a
        class="text-white"
        :class="[nameChat !== undefined ? 'ms-5' : 'text-xl font-bold ms-4']"
        >{{ nameChat === undefined ? "WhastApp 2" : nameChat }}</a
      >
    </div>
    <div class="flex-none" v-show="!nameChat">
      <ul class="menu menu-horizontal">
        <li>
          <button
            class="rounded-lg"
            popovertarget="popover-1"
            style="anchor-name: --anchor-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </button>
          <ul
            class="dropdown menu w-max rounded-box bg-base-100 shadow-sm"
            popover
            id="popover-1"
            style="position-anchor: --anchor-1"
          >
            <li><a>Agregar Contacto</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
