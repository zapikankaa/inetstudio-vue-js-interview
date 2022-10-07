<template>
  <v-select
      v-model="variant"
      :items="items"
      :clearable="clearable"
      :label="label"
  ></v-select>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    label: {
      type: String,
      required: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>