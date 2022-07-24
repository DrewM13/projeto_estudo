<template>
  <q-page class="flex flex-center">
    <h1>teste</h1>
    <div> <q-btn color="white" text-color="black" label="Standard" @click="teste()" />
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Register',
  Data(){
    return{

    }

  },
  methods:{
    teste(){
      this.$router.push({name:'index'})
    }
  }
}
</script>
