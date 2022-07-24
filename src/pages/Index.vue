<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
     <q-btn color="white" text-color="black" label="Standard" @click="teste()" />

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  Data(){
    return{

    }

  },
  methods:{
    teste(){
      this.$router.push({name:'register'})
    }
  }
}
</script>
