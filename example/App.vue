<script lang="ts" setup>
import { DevtoolsDetector } from 'browser-devtools-detector'
import { ref } from 'vue'

const devtool = new DevtoolsDetector({
}).launch()

const statusRef = ref(false)

devtool.on('change', (status: boolean) => {
  statusRef.value = status
})
</script>

<template>
  <span>devtool status: {{ statusRef ? 'detected' : 'not detected' }}</span>
</template>
