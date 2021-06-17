<template>
  <div>
    <div>{{ $store.state.count }}</div>
    <button @click="$store.commit('increment')">+</button>
  </div>
</template>
