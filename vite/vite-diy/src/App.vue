<template>
  <div>
    <span>count is {{ count }} * 2 = {{ double }}</span>
    <button @click="count++">+</button>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import {defineComponent} from '@vue/composition-api'

export default defineComponent({
  setup() {
    const count = ref(6)
    function add() {
      count.value++
    }
    const double = computed(() => count.value * 2)
    return {count, add, double}
  },
})
</script>
