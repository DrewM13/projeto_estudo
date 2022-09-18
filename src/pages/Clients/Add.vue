<template>

  <div class="q-pa-sm bg-grey-3 window-height">
    <q-card class="q-pa-none bg-grey-2 window-height">

      <q-card-section class="q-pt-sm q-pb-none q-px-md row">
        <span class="text-h6 text-blue-grey-9 col">{{this.$route.params.id ? 'Editar':'Adicionar'}} cliente</span>
        <div class="text-blue-grey-9 col text-right">
          <div class="row q-gutter-x-sm">
            <div class="col">
           <q-btn
           outline
           icon="arrow_back"
           class="q-px-sm"
            color="blue-grey-5"
            label="Voltar"
            no-caps
            dense
            rounded
            @click="goBack()"
            />
          </div>

          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-md" >
        <q-form class="q-gutter-md" ref="myForms" @submit="validate()" >
        <q-list dense bordered flat separator class="bg-grey-2 text-blue-grey-9 rounded-borders">
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Nome: </span>
      <span class="col">
  <q-input dense rounded outlined lazy-rules hide-bottom-space :rules="[val=>val.length>0||'Valor inválido']" v-model="data.Nome" label="Digite o nome completo do cliente" />
</span>
    </div>
   </q-item-section >
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Email: </span>
      <span class="col">
      <q-input dense rounded outlined hide-bottom-space v-model="data.Email" lazy-rules :rules="[val=>val.length>0||'Valor inválido']" type="email" label="Digite o email do cliente" />
    </span>
    </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Telefone: </span>
      <span class="col">
      <q-input dense rounded outlined mask="####-####" v-model="data.Telefone" label="Digite o telefone do cliente" />
    </span>
  </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Celular: </span>
      <span class="col">
      <q-input dense rounded outlined mask="+## (##) #####-####" hide-bottom-space lazy-rules :rules="[val=>val.length>0||'Valor inválido']" v-model="data.Celular" label="Digite o celular do cliente" />
    </span>
  </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">CPF: </span>
      <span class="col">
      <q-input dense rounded outlined mask="###.###.###-##" lazy-rules hide-bottom-space :rules="[val=>val.length>0||'Valor inválido']" v-model="data.CPF" label="Digite o CPF do cliente" />
    </span>
  </div>
   </q-item-section>
   </q-item>
   <q-item>
    <q-item-section>
      <div class=" text-right q-pa-sm">
          <q-btn
          :color="this.$route.params.id?'amber-8':'green-9'"
          class="q-px-sm"
          rounded
           dense
           no-caps
           outline
            type="submit"
            >
            <q-icon
            left
            size="25px"
            :name="this.$route.params.id?'edit':'check'"
            />{{this.$route.params.id? 'Editar cliente':'Criar cliente'}}</q-btn>
        </div>
    </q-item-section>
   </q-item>
   </q-list>
</q-form>
      </q-card-section>
    </q-card>

  </div>

</template>

<script>
  import notify from "src/Mixins/notify";
  import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/"
});
export default {
  mixins:[notify],
  data () {
    return {
      data:{Nome:'',Telefone:'',Email:'',Celular:'',CPF:''},
    }
  },
  mounted(){
    if (this.$route.params.id) {
      this.getData()
    }
  },
  methods:{
    getData(){
     api.get(`clients/${this.$route.params.id}`)
     .then((res)=>{
       this.data=res.data.data[0]
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    },
    goBack(){
      this.$router.push({name:'clientList'})
    },
    validate(){
      this.$refs.myForms.validate().then((res)=>{
            this.$route.params.id ? this.editData():this.sendData()
      })

    },
    sendData(){
      api.post('clients/AddClient/',this.data)
      .then((res)=>{
        this.successNotify('Cliente criado com sucesso!');
        this.$router.push({name:'clientList'})
      })
      .catch((error) => {
        alert(`${error}`);
      });
    },
     editData(){
      api.patch(`clients/${this.$route.params.id}/`,this.data)
      .then((res)=>{
        this.successNotify('Cliente editado com sucesso!');
        this.$router.push({name:'clientList'})
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    }
  }
}
</script>
