<template>

  <div class="q-pa-sm bg-grey-3 window-height">

    <q-table
      :data="data"
      :columns="columns"
      row-key="idUsers"
      :filter="filter"
      >
      <!-- selection="multiple"
      :selected.sync="selected" -->
    <template v-slot:top-right>
       <div class="row q-gutter-x-sm">
        <span class="col">
       <q-input outlined dense rounded debounce="300" v-model="filter" placeholder="Pesquisar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </span>
      <span class="col-auto text-right">
        <q-btn color="green-9" round dense icon="add" @click="addPage()"> <q-tooltip>
        Adicionar
       </q-tooltip>
      </q-btn>
    </span>
</div>
      </template>
      <template v-slot:top-left>

          <span class="text-h6 text-blue-grey-7"><q-icon name="fas fa-list" /> Lista de Moradores</span>





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
            @click="viewPage(props.row.idUsers)"
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
               @click="editPage(props.row.idUsers)"
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
  import notify from "src/Mixins/notify";
import baseService from "src/http/baseService";

export default {
  mixins:[notify],
  data () {
    return {
      BaseService: new baseService(),
      filter:'',
      // selected:[],
      columns: [
        {
          name: 'username',
          label: 'Usuário',
          align: 'center',
          field: 'username',
          sortable: true
        },
        { name: 'email',
         align: 'center',
         label: 'Email',
          field: 'email',
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

   this.BaseService.getDataAdm()
     .then((res)=>{
       this.data=res.data
      })
      .catch((error) => {
        this.errorNotify(`${error}`);
      });
    },
    viewPage(id){
      this.$router.push({name:'viewAdministrator',params:{id: id}})
    },
     editPage(id){
      this.$router.push({name:'editAdministrator',params:{id: id}})
    },
     addPage(){
      this.$router.push({name:'addAdministrator'})
    },
    deleteRow(value){
      console.log(value);
      this.$q
        .dialog({
          title: 'Atenção!',
          message: 'Você realmente deseja excluir este morador??',
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
          this.BaseService.deleteUser(value.idUsers)
      .then((res)=>{
        this.successNotify(`Morador ${value.username} deletado com sucesso`)
        this.getData()
      })
      .catch((error)=>
      this.errorNotify(`${error}`)
      )
        })
    }

  }
}
</script>
