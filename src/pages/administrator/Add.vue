<template>

  <div class="q-pa-sm bg-grey-3 window-height">
    <q-card class="q-pa-none bg-grey-2 window-height">

      <q-card-section class="q-pt-sm q-pb-none q-px-md row">
        <span class="text-h6 text-blue-grey-9 col">{{this.$route.params.id ? 'Editar':'Adicionar'}} morador {{this.$route.params.id ?data.username:''}}</span>
        {{data}}
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
      <span class="text-weight-medium col">Nome do morador: </span>
      <span class="col">
  <q-input dense rounded outlined lazy-rules hide-bottom-space :rules="[val=>val.length>0||'Valor inválido']" v-model="data.username" label="Digite o nome do morador" />
</span>
    </div>
   </q-item-section >
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Email: </span>
      <span class="col">
      <q-input dense rounded outlined hide-bottom-space v-model="data.email" lazy-rules :rules="[val=>val.length>0||'Valor inválido']" type="email" label="Digite o email do morador" />
    </span>
    </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">Senha: </span>
      <span class="col">
      <q-input dense rounded outlined v-model="data.password" label="Digite a senha do morador" />
    </span>
  </div>
   </q-item-section>
   </q-item>
   <q-item>
   <q-item-section class="q-pa-sm">
    <div class="row items-center">
      <span class="text-weight-medium col">permissão de administrador: </span>
      <span class="col">
      <q-checkbox left-label v-model="data.Adm" :label="data.Adm?'Sim':'Não'" />
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
            />{{this.$route.params.id? 'Editar morador':'Criar morador'}}</q-btn>
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
  import baseService from "src/http/baseService";

export default {
  mixins:[notify],
  data () {
    return {
      BaseService: new baseService(),
      data:{  "username": "", "password": "", "Adm": 0, "email": "" }
,
    }
  },
  mounted(){
    if (this.$route.params.id) {
      this.getData()
    }
    else{
       if (this.data.Adm===0) {
        this.data.Adm=false
       }
    }
  },
  methods:{
    getData(){
      this.BaseService.getUserById(this.$route.params.id)
     .then((res)=>{
       this.data=res.data.data[0]
       if (this.data.Adm===1) {
        this.data.Adm=true
       }
       else if (this.data.Adm===0) {
        this.data.Adm=false
       }
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    },
    goBack(){
      this.$router.push({name:'administrator'})
    },
    validate(){
      this.$refs.myForms.validate().then((res)=>{
            this.$route.params.id ? this.editData():this.sendData()
      })

    },
    sendData(){
      this.BaseService.addUser(this.data)
      .then((res)=>{
        const name=res.data.usuarioCriado.data.username
        this.successNotify(`Morador ${name} criado com sucesso!`);
        this.$router.push({name:'administrator'})
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    },
     editData(){
      this.BaseService.editUser(this.data)
      .then((res)=>{
        const name=res.data.data.username
        this.successNotify(`Morador ${name} editado com sucesso!`);
        this.$router.push({name:'administrator'})
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    }
  }
}
</script>
