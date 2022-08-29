<template>

  <div class="q-pa-sm bg-grey-3">
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top-right>
       <q-btn color="green-9" rounded outline dense class="q-px-sm" icon="add " label="Adicionar" no-caps @click="addPage()"/>

      </template>
      <template v-slot:top-left>

          <span class="text-h6 text-blue-grey-7"><q-icon name="fas fa-list" /> Lista de Clientes</span>



      </template>
              <q-td
                slot="body-cell-Actions"
                slot-scope="props"
                :props="props"
              >
              <q-btn
            color="blue-grey-9"
            icon="far fa-eye"
            rounded
            flat
            dense
            size="10px"
            @click="viewPage(props.row.idClient)"
          >
            <q-tooltip
              content-class="bg-blue-grey-8 text-sm"
              :offset="[10, 10]"
              :delay="300"
            >
              Visualizar
            </q-tooltip>
          </q-btn>
              <q-btn
              color="amber-8"
               icon="fas fa-pen"
               flat
               round
               size="10px"
               dense
               @click="editPage(props.row.idClient)"
               >
               <q-tooltip
              content-class="bg-blue-grey-8 text-sm"
              :offset="[10, 10]"
              :delay="300"
            >
              Editar
            </q-tooltip>
              </q-btn>
              <q-btn
              color="red-7"
               icon="fas fa-trash"
               flat
               round
               size="10px"
               dense
               @click="deleteRow(props.row)"
               >
               <q-tooltip
               content-class="bg-blue-grey-8 text-sm"
              :offset="[10, 10]"
              :delay="300"
            >
              Excluir
            </q-tooltip>
              </q-btn>
              </q-td>
  </q-table>
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
          align: 'center',
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
  watch:{
    getData(){
      this.getData()
    }
  },

  methods:{
    getData(){
     api.get("clients")
     .then((res)=>{
       this.data=res.data.data
      })
      .catch((error) => {
        alert(`${error}`);
      });
    },
    viewPage(id){
      this.$router.push({name:'view',params:{id: id}})
    },
     editPage(id){
      this.$router.push({name:'edit',params:{id: id}})
    },
     addPage(){
      this.$router.push({name:'add'})
    },
    deleteRow(value){
      this.$q
        .dialog({
          title: 'Atenção!',
          message: 'Você realmente deseja excluir este cliente?',
          focus: 'cancel',
          cancel: {
            label: 'Não',
            color: 'blue-grey-7',
            rounded: true,
            dense: true,
            flat: true,
            noCaps: true

          },
          ok: {
            label: 'Sim',
            color: 'negative',
            rounded: true,
            dense: true,
            noCaps: true
          },
          persistent: true
        })
        .onOk(() => {
          api.delete(`clients/${value.idClient}`)
      .then((res)=>{
        alert(`Cliente ${value.Nome} deletado com sucesso`)
        this.getData()
      })
      .catch((error)=>
        alert(`${error}`)
      )
        })
    }

  }
}
</script>
