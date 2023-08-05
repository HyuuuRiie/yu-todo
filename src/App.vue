<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-img
        class="pa-3 pt-7"
        src="beach.jpg"
        lazy-src='https://picsum.photos/id/11/10/6'
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img 
            src="widwod.jpg" 
            alt="Yu TO DO">
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Yu To DO</div>
        <div class="white--text text-subtitle-2">What Will You Do Today?</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
    app
    color="primary" 
    dark
    src="beach.jpg"
    prominent
    :height="$route.path === '/' ? '232' :'170'"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-container fluid class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">{{ $store.state.appTitle }}</v-app-bar-title>
        </v-row>
        <v-row>
         <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>     
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
 
  <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
  }),
  components: {
      'search': require('@/components/Tools/Search.vue').default,
      'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
      'field-add-task' : require('@/components/Todo/FieldAddTask.vue').default,
      'snackbar': require('@/components/Shared/Snackbar.vue').default,
      Footer
    },
    mounted() {
      this.$store.dispatch('getTasks');
    }
};
</script>
<style lang=sass>
  .header-container
    // max-width: none !important
    // note: adding fluid prop to v-container achieves the same result
    // fluid → removes viewport maximum-width size breakpoints
</style>
