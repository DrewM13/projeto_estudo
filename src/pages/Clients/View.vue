<template>

  <div class="q-pa-sm bg-grey-3 window-height">
    <q-card class="q-pa-none bg-grey-2 window-height">

      <q-card-section class="q-pt-sm q-pb-none q-px-sm row">
        <span class="text-h6 text-blue-grey-9 col">Visualizando dados do cliente: {{data.Nome}}</span>
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
  <span class="text-weight-medium col-5">Telefone:</span>
  <span class="col-auto">{{data.Telefone? data.Telefone :'-'}} </span>
    </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section>
    <div class="row items-center">
   <span class="text-weight-medium col-5">Celular:</span>
   <span class="col-auto">{{data.Celular}}</span>
  </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section>
    <div class="row items-center">
   <span class="text-weight-medium col-5">Email:</span>
   <span class="col-auto">{{data.Email? data.Email:'-'}}</span>
  </div>
   </q-item-section>
   </q-item>
   <q-item >
   <q-item-section>
    <div class="row items-center">
   <span class="text-weight-medium col-5" >CPF:</span>
   <span class="col-auto">{{data.CPF}}</span>
  </div>
   </q-item-section>
   </q-item>
   </q-list>

      </q-card-section>
    </q-card>

  </div>

</template>

<script>
  import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/"
});
export default {
  data () {
    return {
      text:'',
      columns: [
        {
          name: 'Nome',
          label: 'Nome',
          align: 'left',
          field: 'Nome',
          sortable: true
        },
        { name: 'Email',
         align: 'center',
         label: 'Email',
          field: 'Email',
           sortable: true },
        { name: 'Actions',
        label: 'Ações',
        field: 'Actions' ,
        align: 'center' }
      ],
      data:[]
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
     api.get(`clients/${this.$route.params.id}`)
     .then((res)=>{
       this.data=res.data.data[0]
      })
      .catch((error) => {
        alert(`${error}`);
      });
    },
    goBack(){
      this.$router.push({name:'list'})
    },
     editPage(){
      this.$router.push({name:'edit',params:{id:this.$route.params.id}})
    },
  }
}
</script>
