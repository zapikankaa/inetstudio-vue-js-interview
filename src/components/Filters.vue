<template>
  <div>
    <v-select
      v-for="filter in filters"
      :key="filter.name"
      :v-model="filter.selected"
      :items="filter.items"
      clearable
      :label="'Filter by ' + filter.name"
      @input="onInput($event, filter.name)"
  ></v-select>
  </div>
</template>

<script>
export default {
  name: 'Filters',

  data: () => ({
    filters: [
      {
        name: 'country',
        items: [ 'russia', 'usa' ],
        selected: ''
      },
      {
        name: 'score',
        items: [ '> 20', '< 10' ],
        selected: ''
      }
    ]
  }),

  methods: {
    onInput(e, filterName) {
      this.$store.commit('updateFilters', { name: filterName, value: e })
    }
  }
}
</script>