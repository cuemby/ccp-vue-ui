<template>
  <div class="w-full">
    <div class="flex items-center">
      <div class="relative w-full">
        <input :type="type" :id="labelText"
               :name="name"
               :value="modelValue"
               class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border
              appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none placeholder:invisible focus:placeholder:visible focus:ring-0
               peer"
               :class="[invalid ? 'border-red-300 focus:border-red-300':'border-gray-300 focus:border-blueCuemby-600',
               disabled ? 'text-gray-400':'']"
               :placeholder="placeholder"
               v-bind:class="[customClass]"
               @input="changeValue($event)"
               :disabled="disabled"
        >
        <label :for="labelText"
               class="absolute text-sm  dark:text-slate-400 duration-300
             transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
              bg-white dark:bg-black px-2 peer-focus:px-2
              peer-focus:text-blueCuemby-600
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-1/2
              peer-placeholder-shown:top-1/2
              peer-focus:top-2 peer-focus:scale-75
              peer-focus:-translate-y-4 left-1"
               :class="[disabled ? '':'',
               invalid ? 'text-red-500 peer-focus:dark:text-red-500  peer-focus:text-red-500':'text-gray-500 peer-focus:dark:text-blueCuemby-600']"
        >
          {{ labelText }}<span v-if="required" class="text-red-600">*</span></label>
        <div v-if="popper" class="absolute inset-y-0 right-0 flex items-center pr-3 border-l m-2">
          <Popper arrow :placement="popperDirection" style="display: inherit;">
            <img :src="iconQuestion" alt="" class="ml-4">
            <template #content>
              <div>{{ popperText }}</div>
            </template>
          </Popper>
        </div>
      </div>
    </div>
    <ul v-if="errors">
      <li class="text-xs ml-2 mt-0.5 text-red-600"
          v-for="error in errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs, ref} from 'vue';
import iconQuestion from "../assets/icons/providers/icon_circle_question.svg"
import Popper from "@/components/Popper/Popper.vue";

export default defineComponent({
  components: { Popper },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      require: true,
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    customClass: {
      type: String,
      required: false,
    },
    popper: {
      type: Boolean,
      default: false,
    },
    popperText: {
      type: String,
      required: false,
    },
    popperDirection: {
      type: String,
      required: false,
      default: 'right',
    },
    name: {
      type: String,
      required: false
    },
    errors: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const changeValue = (e: Event) => {
      emit('update:modelValue', e.target?.value);
    }
    return {
      changeValue,
      ...toRefs(props),
      iconQuestion
    }
  }
})
</script>

<style scoped>

</style>