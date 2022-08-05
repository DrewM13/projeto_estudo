<template>
  <q-page>
    <div>
      <div class="absolute-bottom-right q-pa-md">
        <q-btn class="q-px-sm" color="primary" no-caps rounded dense label="Ir para página teste" @click="teste()" />
      </div>
    </div>






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
