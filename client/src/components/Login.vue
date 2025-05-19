<script setup lang="ts"></script>

<template>
  <div class="container mx-auto h-[100vh] flex justify-center items-center">
    <div class="card w-96 bg-base-100 card-lg shadow-sm">
      <div class="card-body">
        <h2 class="card-title">Validar número</h2>
        <form action="">
          <input
            type="text"
            class="input validator"
            required
            placeholder="Escribe tu número"
          />
        </form>
        <div class="justify-end card-actions">
          <button class="btn btn-primary">Enviar Codigo</button>
        </div>
      </div>
    </div>
  </div>
</template>
