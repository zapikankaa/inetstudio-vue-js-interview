import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_APIURL,
})

export default new Vuex.Store({
  state: {
    users: [],
    filters: []
  },

  getters: {
    filteredUsers: state => {
      return state.users.filter(user => {
        let include = true

        for (let filter of state.filters) {

          switch (filter.name) {
            case 'country':
              if (user.country !== filter.value) include = false
              break
            case 'score':
              if (!eval(user.score + filter.value)) include = false
              break
          }
        }
        return include
      })
    }
  },

  mutations: {
    setUsers(state, users) {
      state.users = users.map(user => {
        user.addressShow = false
        return user
      })
    },

    updateFilters(state, newFilter) {
      const oldFilterIndex = state.filters.find(filter => filter.name === newFilter.name)

      if (newFilter.value && oldFilterIndex)
        state.filters.splice(oldFilterIndex, 1, newFilter)
      else if (!newFilter.value && oldFilterIndex)
        state.filters.splice(oldFilterIndex, 1)
      else if (newFilter.value && !oldFilterIndex)
        state.filters.push(newFilter)
      else return
    }
  },

  actions: {
    getUsers(context) {
      let users = []

      return HTTP.get('users')
        .then(response => {
          users = response.data
        })
        .catch(error => {
          console.log(error)
          users = [
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
              title: 'Brunch this weekend?',
              subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
              score: '5',
              country: 'usa',
              address: {
                city: 'New York',
              }
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
              title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
              subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
              score: '21',
              country: 'russia',
              address: {
                city: 'Saint Petersburg',
              }
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
              title: 'Oui oui',
              subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
              score: '8',
              country: 'russia',
              address: {
                city: 'Samara',
              }
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
              title: 'Birthday gift',
              subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
              score: '15',
              country: 'usa',
              address: {
                city: 'Seattle',
              }
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
              title: 'Recipe to try',
              subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
              score: '27',
              country: 'usa',
              address: {
                city: 'Detroit',
              }
            },
          ]
        })
        .finally(() => {
          context.commit('setUsers', users)
        })
    }
  }
})

