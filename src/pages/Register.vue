<template>
  <q-page>
    <div class="text-center">
<div class="q-pa-md">

  <span class="text-h5">Registrar-se</span>
</div>
    </div>
    <q-form ref="myForm" @submit="register()" class="q-gutter-md q-pa-md column" >
    <div class="col-5">
      <q-input outlined dense v-model="name2" label="Your name *" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />
      </div>
       <div class="col-5">

         <q-input outlined dense  v-model="age" label="Your age *" lazy-rules
         :rules="[val => val !== null && val !== '' || 'Please type your age',val => val > 0 && val < 100 || 'Please type a real age']"/>
    </div>
    <q-toggle v-model="accept" label="I accept the license and terms" />
    <div class="text-center">
    <q-btn label="Submit" type="submit" color="positive"/>
    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
    </q-form>

    <div class="text-right q-pa-md absolute-bottom">
       <q-btn color="primary" dense rounded class="q-px-sm" no-caps label="Ir para página inicial" @click="mainPage()" />
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      name2: '',
      age: '',

      accept: false
    }
  },
  methods:{
    mainPage(){
      this.$router.push({name:'index'})
    },
    register(){
      this.$refs.myForm.validate().then(success =>{
        this.$router.push({name:'index'})
      })

    }
  }
}
</script>
