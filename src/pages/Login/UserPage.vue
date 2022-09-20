<template>
  <q-page class="row flex flex-center bg-grey-3">
    <q-card class="q-ma-sm col-6 bg-blue-grey-2" bordered flat>
      <div class="text-center q-pa-sm">
        <span class="text-h5">Login</span>
      </div>
      <div>
        <q-form ref="myFormLogin" @submit="Login()" class="column">
          <div class="col-5 q-px-md">
            <span class="text-subtitle2">E-mail</span>
            <q-input
              color="light-blue-10"
              no-caps
              outlined
              dense
              hide-bottom-space
              v-model="userData.email"
              :rules="[(val) => (val && val.length > 0) || 'E-mail inválido']"
              type="email"
              label="Digite o seu E-mail"
            />
          </div>
          <div class="col-5 q-pa-md">
            <span class="text-subtitle2">Senha</span>
            <q-input
              color="light-blue-10"
              hide-bottom-space
              no-caps
              :type="isPwd ? 'password' : 'text'"
              outlined
              dense
              v-model="userData.password"
              :rules="[(val) => (val && val.length > 0) || 'Senha inválida']"
              label="Digite sua senha"
            >
              <q-btn
                flat
                dense
                :icon="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </q-input>
          </div>
          <div class="text-center q-py-md">
            <q-btn
              label="Entrar"
              type="submit"
              icon="far fa-user"
              no-caps
              color="primary"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import baseService from 'src/http/baseService'
import notify from "src/Mixins/notify";

export default {
  mixins:[notify],
  name: "credentials",
  data() {
    return {
      BaseService: new baseService(),
      isPwd: true,
      isPwd2: true,
      userData: { email: "", password: "" },
    };
  },
  mounted(){this.checkCredentials()},
  methods: {
    Login() {
      this.$refs.myFormLogin.validate().then((success) => {
        if(success)
        this.BaseService.Login(this.userData)
        .then((res) => {
          localStorage.setItem('token',res.token)
            this.$router.push({ name: "DashBoard" });
          })
          .catch((error) => {
            this.errorNotify('Falha de autenticação');
          });
      });
    },
    checkCredentials(){
      if(localStorage.token){
        this.$router.push({name:'DashBoard'})
      }
    }
  }
};
</script>
