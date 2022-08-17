<template>
  <q-page class="row flex flex-center bg-grey-3">
    <q-card class="q-ma-sm col-6 bg-blue-grey-2" bordered flat>
      <div class="text-center q-pa-sm">
        <span class="text-h5">{{ registerer ? "Criar Conta" : "Login" }}</span>
      </div>
      <div class="q-pa-md" v-if="registerer">
        <q-form @submit="CreateUser()" class="column" ref="myFormCreateUser">
          <q-input
            color="light-blue-10"
            outlined
            dense
            type="email"
            v-model="userData.UserMail"
            label="Digite o seu E-mail"
            reactive-rules
            :rules="[(val) => (val && val.length > 0) || 'E-mail inválido']"
          />
          <q-input
            reactive-rules
            color="light-blue-10"
            :type="isPwd ? 'password' : 'text'"
            outlined
            dense
            v-model="userData.UserPW"
            label="Digite sua senha"
            :rules="[
              (val) => (val !== null && val !== '') || 'Senha incorreta',
              (val) => val === ConfirmPassWord || 'Senhas diferentes'
            ]"
          >
            <q-btn
              flat
              dense
              :icon="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
            />
          </q-input>
          <q-input
            reactive-rules
            color="light-blue-10"
            :type="isPwd2 ? 'password' : 'text'"
            outlined
            dense
            v-model="ConfirmPassWord"
            label="Confirme a sua senha"
            :rules="[
              (val) => (val !== null && val !== '') || 'Senha incorreta',
              (val) => val === userData.UserPW || 'Senhas diferentes'
            ]"
          >
            <q-btn
              flat
              dense
              :icon="isPwd2 ? 'visibility_off' : 'visibility'"
              @click="isPwd2 = !isPwd2"
            />
          </q-input>

          <div>
            <div class="text-center">
              <q-btn
                label="Registrar-se"
                no-caps
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div v-else>
        <q-form ref="myFormLogin" @submit="Login()" class="column">
          <div class="col-5 q-px-md">
            <span class="text-subtitle2">E-mail</span>
            <q-input
              color="light-blue-10"
              no-caps
              outlined
              dense
              hide-bottom-space
              v-model="userData.UserMail"
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
              v-model="userData.UserPW"
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
              color="indigo"
            />
          </div>
        </q-form>
      </div>
      <div class="row q-pa-md justify-center">
        <span class="text-h5 col-auto q-px-md" v-if="registerer"
          >Já possui conta?</span
        >
        <q-btn
          class="col-auto"
          color="primary"
          :label="registerer ? 'Ir para Login' : 'Criar Conta'"
          no-caps
          @click="registerer = !registerer"
        />
      </div>
    </q-card>
  </q-page>
</template>
<script>
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/"
});
export default {
  name: "credentials",
  data() {
    return {
      ConfirmPassWord: "",
      accept: false,
      registerer: false,
      isPwd: true,
      isPwd2: true,
      teste: "",
      userData: { UserMail: "", UserPW: "" }
    };
  },
  methods: {
    Login() {
      this.$refs.myFormLogin.validate().then((success) => {
        api
          .post("credentials/login", this.userData)
          .then((res) => {
            this.$router.push({ name: "index" });
          })
          .catch((error) => {
            alert(`${error.response.data.mensagem}`);
          });
      });
    },
    CreateUser() {
      this.$refs.myFormCreateUser.validate().then((success) => {
        api
          .post("credentials/NewUser", this.userData)
          .then((res) => {
            this.teste = res;
            this.registerer = false;
          })
          .catch((error) => {
            alert(`Erro ao criar Login.\n${error.response.data.mensagem}`);
          });
      });
    },
    GetData() {
      api
        .get("credentials")
        .then((res) => {
          this.teste = res.data;
        })
        .catch((error) => {
          console.log(`Erro ao acessar o GetApi.\n${error}`);
        });
    }
  }
};
</script>
