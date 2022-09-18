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
import axios from "axios";
import notify from "src/Mixins/notify";
const api = axios.create({
  baseURL: "http://localhost:3000/"
});
export default {
  mixins:[notify],
  name: "credentials",
  data() {
    return {
      ConfirmPassWord: "",
      isPwd: true,
      isPwd2: true,
      userData: { email: "", password: "" },
      auth: null
    };
  },
  created(){this.checkCredentials()},
  methods: {
    datalogin(value) {
      api.interceptors.request.use(
        (config) => {
          if (this.userData !== null) {
            config.headers.Authorization =  `Bearer ${value.data.token}`;
            localStorage.setItem('token',value.data.token)

          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    Login() {
      this.$refs.myFormLogin.validate().then((success) => {
        api
        .post("credentials/", this.userData)
        .then((res) => {
            this.datalogin(res)
            this.$router.push({ name: "administrator" });
          })
          .catch((error) => {
            this.errorNotify(error.response.data.mensagem);
          });
      });
    },
    checkCredentials(){
      if(localStorage.token){
        // this.$router.push({name:'DashBoard'})
      }
    }
  }
};
</script>
