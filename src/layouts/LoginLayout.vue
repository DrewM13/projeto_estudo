<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="tertiary">
      <q-toolbar>

      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',

  data () {
    return {
      // leftDrawerOpen: false
    }
  },
 }
</script>
