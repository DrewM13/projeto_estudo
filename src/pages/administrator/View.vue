<template>

  <div class="q-pa-sm bg-grey-3 window-height">
    <q-card class="q-pa-none bg-grey-2 window-height">

      <q-card-section class="q-pt-sm q-pb-none q-px-sm row">
        <span class="text-h6 text-blue-grey-9 col">Visualizando dados do morador: {{data.username}}</span>
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
            <div class="col-auto">

            <q-btn
            color="amber-8"
            no-caps
            dense
            rounded
            outline
            @click="editPage()"
            class="q-px-sm"
            >
          <q-icon
           left
           size="15px"
            name="fas fa-pen"
            />
            Editar
          </q-btn></div>

          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-sm " >
        <q-list dense bordered flat separator class="bg-grey-2 text-blue-grey-9 rounded-borders">


   <q-item >
   <q-item-section>
    <div class="row items-center">
   <span class="text-weight-medium col-5">Nome do morador:</span>
   <span class="col-auto">{{data.username}}</span>
  </div> <div class="row items-center">
   <span class="text-weight-medium col-5">Email:</span>
   <span class="col-auto">{{data.email}}</span>
  </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section>

   <q-expansion-item  dense-toggle dense icon="manage_accounts" label="Permissões:">
   <q-card>

   <q-card-section>
    <div class="row items-center">
    <span class="text-weight-medium col-5">Administrador</span>
  <span class="col-auto">{{data.Adm===1?'Sim':'Não'}}</span>
</div>
   </q-card-section>
   </q-card>
   </q-expansion-item>


   </q-item-section>
   </q-item>
   </q-list>

      </q-card-section>
    </q-card>

  </div>

</template>

<script>
  import notify from "src/Mixins/notify";
import baseService from 'src/http/baseService';
export default {
  mixins:[notify],
  data () {
    return {
      data:[],
      BaseService: new baseService()
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.BaseService.getUserById(this.$route.params.id)
     .then((res)=>{
       this.data=res.data.data[0]
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    },
    goBack(){
      this.$router.push({name:'administrator'})
    },
     editPage(){
      this.$router.push({name:'editAdministrator',params:{id:this.$route.params.id}})
    },
  }
}
</script>
