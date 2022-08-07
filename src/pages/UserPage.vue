<template>
  <q-page class="row flex flex-center bg-grey-3">
     <q-card class="q-ma-sm col-6 bg-blue-grey-2" bordered flat>
    <div class="text-center q-pa-sm">
        <span class="text-h5">{{registerer?'Criar Conta':'Login'}}</span>
    </div>
<div class="q-pa-md" v-if="registerer" >

  <q-form
    @submit="CreateUser()"
    class="column "
    ref="myFormCreateUser"
  >
    <q-input
    color="light-blue-10"
     outlined
     dense
     type="email"
     v-model="Email"
     label="Digite o seu E-mail"
     reactive-rules
     :rules="[ val => val && val.length > 0 || 'E-mail inválido']"/>
    <q-input
    color="light-blue-10"
     :type="isPwd?'password':'text'"
      outlined
      dense
      v-model="PassWord"
      label="Digite sua senha"
      :rules="[val => val !== null && val !== '' || 'Senha incorreta', val=>val === ConfirmPassWord|| 'Senhas diferentes']">
    <q-btn
    flat
    dense
    :icon="isPwd ? 'visibility_off' : 'visibility'"
     @click="isPwd = !isPwd" />
     </q-input>
    <q-input
    color="light-blue-10"
     :type="isPwd2?'password':'text'"
      outlined
      dense
      v-model="ConfirmPassWord"
      label="Confirme a sua senha"
      :rules="[val => val !== null && val !== ''||'Senha incorreta', val=>val === PassWord|| 'Senhas diferentes']" >
     <q-btn
      flat
      dense
      :icon="isPwd2 ? 'visibility_off' : 'visibility'"
     @click="isPwd2 = !isPwd2" />
    </q-input>

    <div>
       <div class="text-center">
    <q-btn label="Registrar-se" no-caps type="submit" color="primary"/>
    </div>
    </div>
  </q-form>
</div>
    <div v-else>
    <q-form ref="myFormLogin" @submit="Login()" class=" column" >
   <div class="col-5 q-px-md">
      <span class="text-subtitle2">E-mail</span>
      <q-input
      color="light-blue-10"
      no-caps
      outlined
      dense
      hide-bottom-space
      v-model="Email"
      type="email"
      label="Digite o seu E-mail*"
      reactive-rules
      :rules="[ val => val && val.length > 0 || 'E-mail inválido']" />
      </div>
       <div class="col-5 q-pa-md ">
        <span class="text-subtitle2">Senha</span>
         <q-input
         color="light-blue-10"
         hide-bottom-space
         no-caps
         :type="isPwd?'password':'text'"
         outlined
         dense
         v-model="PassWord"
         label="Digite sua senha*"
         lazy-rules
        :rules="[val => val !== null && val !== '' || 'Senha incorreta']">
        <q-btn flat dense :icon="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </q-input>
    </div>
    <div class="text-center q-py-md">
    <q-btn label="Entrar" type="submit" icon="login" no-caps color="primary"/>
    </div>
    </q-form>
    </div>
<div class="row q-pa-md justify-center">
  <span class="text-h5 col-auto q-px-md" v-if="registerer">Já possui conta?</span>
  <q-btn class="col-auto" color="primary" :label="registerer?'Ir para Login':'Criar Conta'" no-caps @click="registerer=!registerer" />
  </div>
      </q-card>
  </q-page>
</template>
<script>
export default {
  name: 'credentials',
  data () {
    return {
      Email: '',
      PassWord: '',
      ConfirmPassWord:'',
      accept: false,
      registerer:false,
      isPwd:true,
      isPwd2:true
    }
  },
  methods:{
    Login(){
      this.$refs.myFormLogin.validate().then(success =>{
        this.$router.push({name:'index'})
      })
    },
     CreateUser(){
      this.$refs.myFormCreateUser.validate().then(success =>{
       this.registerer = false
      })
    }
  }
}
</script>
