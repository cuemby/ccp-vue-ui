<template>
  <Popper v-bind="$attrs" hover openDelay="200" closeDelay="100">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script>
import {defineComponent} from "vue";
import Popper from "vue3-popper";

export default defineComponent({
  components: {
    Popper,
  },
})
</script>

<style scoped>
:deep(.popper) {
  background: #EDF2FF;
  padding: 8px;
  border-radius: 8px;
  color: #374151;
  font-weight: normal;
  font-size: 14px;
  z-index: 9999;
  width: 200px;
}

:deep(.popper #arrow::before) {
  background: #EDF2FF;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #EDF2FF;
}
</style>