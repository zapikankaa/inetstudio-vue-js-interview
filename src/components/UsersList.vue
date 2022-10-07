<template>
  <v-list three-line>
    <v-subheader
        v-text="'List'"
    ></v-subheader>

    <transition-group name="fade" tag="div">
    <template v-for="(item, index) in users">

      <v-divider
        v-if="index !== 0"
        :key="index"
        :inset="true"
      ></v-divider>

      <v-list-item
        :key="item.title"
      >
        <v-list-item-avatar
          @click="item.addressShow = !item.addressShow"
        >
          <v-tooltip
            v-model="item.addressShow"
            bottom
          >
            <template v-slot:activator='{ attrs }'>
              <v-img
                class="cursor"
                :src="item.avatar"
                v-bind="attrs"
              ></v-img>
            </template>
            <span>{{ getAddressText(item) }}</span>
          </v-tooltip>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    </transition-group>
  </v-list>
</template>

<script>
export default {
  name: 'UsersList',
  data: () => {
    return {

    }
  },
  computed: {
    users() {
      return this.$store.getters.filteredUsers
    }
  },
  created() {
    this.$store.dispatch('getUsers')
  },
  methods: {
    getAddressText(user) {
      return `${ user.country.toUpperCase() }, ${ user.address.city }`
    }
  }
}
</script>

<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active 
  transition: all 1s

.fade-enter, .fade-leave-to
  opacity: 0
  transform: translateY(30px)

.cursor
  cursor: pointer
</style>