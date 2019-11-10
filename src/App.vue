<template>
  <v-app>
    <v-content>
      <div class="layout">
        <side-bar/>
        <tasks/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Tasks from './components/Tasks'
import SideBar from './components/SideBar'

export default {
  name: 'App',

  components: {
    Tasks,
    SideBar
  },

  data: () => ({
    //
  })
}
</script>

<style>
  .layout {
    display: flex;
  }
</style>
