<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="tertiary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list  dense bordered flat separator class=" rounded-borders">

        <q-item clickable>
          <q-item-section>
            <q-btn class="text-h7" flat dense rounded color="primary" no-caps @click="loginPage()" icon="person" label="Página inicial" />
          </q-item-section>

        </q-item>
 <q-item clickable>
          <q-item-section >
            <q-btn class="text-h7" flat rounded dense color="primary" icon="list_alt" no-caps @click="listClientsPage()" label="Clientes" />

          </q-item-section>

        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods:{
    listClientsPage(){
      this.$router.push({name:'list'})
    },
     loginPage(){
      this.$router.push({name:'credentials'})
    }
  }
}
</script>
