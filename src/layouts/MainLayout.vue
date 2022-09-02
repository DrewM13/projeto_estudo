<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="tertiary">
      <q-toolbar>
        <q-btn
          flat
          dense
          rounded
          :icon="leftDrawerOpen?'menu_open':'menu'"
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
            <q-btn class="text-h7" flat dense rounded color="primary" no-caps @click="loginPage()" icon="dashboard" label="Dashboard" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section >
            <q-btn class="text-h7" flat rounded dense color="primary" icon="manage_accounts" no-caps @click="administratorPage()" label="administrador" />

          </q-item-section>

        </q-item>

      <q-item clickable>
          <q-item-section >
            <q-btn class="text-h7" flat rounded dense color="primary" icon="list_alt" no-caps @click="ClientsPage()" label="Clientes" />

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
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods:{
    ClientsPage(){

      if (true) {
console.log(1);
        this.$router.push({name:'clientList'})
      }
    },
     loginPage(){
      this.$router.push({name:'credentials'})
    },
    administratorPage(){
      this.$router.push({name:'administrator'})
    }
  }
}
</script>
