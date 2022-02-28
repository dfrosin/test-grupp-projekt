<script></script>

<style>
  p {
    font-weight: bold;
  }
</style>

<template>
  <h1>Hej</h1>
  <button @click="sendApi">Skicka</button>
  <input v-model="userName" />
</template>

const firebaseConfig = {
