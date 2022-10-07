<template>
  <v-container>
    <v-row
        align="center"
        justify="center"
        class="ma-4"
    >
      <v-col cols="12">
        <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
        />
      </v-col>

      <v-col
          cols="12"
          md="4"
      >

        <filters></filters>

      </v-col>

      <v-col
          cols="12"
          md="4"
      >
        <v-card
            max-width="450"
            class="mx-auto"
        >

          <users-list></users-list>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Filters from './Filters'
  import UsersList from './UsersList'

  export default {
    name: 'ContentBlock',

    components: {
      Filters,
      UsersList
    },

    data: () => ({

    }),
  }
</script>
