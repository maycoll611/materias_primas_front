<template>
    <v-row class="py-1 mx-0">
        <v-alert>modulo para proveedores</v-alert>
        <v-card-text>
            <!-- <v-form ref="form_nuevo_proveedor" v-model="valid_nuevo_proveedor" lazy-validation>
                <v-row class="mx-0 pt-3">
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                        <v-text-field :rules="requiredRules" v-model="proveedor_nuevo.razon_social" counter maxlength="10" required dense outlined label="RAZON SOCIAL"></v-text-field>                                                                                                               
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                        <v-text-field :rules="rucRules" v-model="proveedor_nuevo.ruc" counter="11"  dense outlined label="RUC"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="6">
                        <v-text-field :rules="requiredRules" v-model="proveedor_nuevo.direccion" dense hide-details outlined label="DIRECCION FISCAL"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                        <v-text-field v-model="proveedor_nuevo.numero" dense hide-details outlined label="NUMERO"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="6" md="3">
                        <v-text-field v-model="proveedor_nuevo.zona" dense hide-details outlined label="ZONA"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                        <v-text-field :rules="requiredRules" v-model="proveedor_nuevo.distrito" dense hide-details outlined label="DISTRITO"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                        <v-text-field :rules="requiredRules" v-model="proveedor_nuevo.provincia" dense hide-details outlined label="PROVINCIA"></v-text-field>
                    </v-col>
                    <v-col class=" py-0 px-1 text-body-2 py-2" cols="12" md="4">
                        <v-text-field :rules="requiredRules" v-model="proveedor_nuevo.departamento" dense hide-details outlined label="DEPARTAMENTO"></v-text-field>
                    </v-col>
                </v-row>
            </v-form> -->
        </v-card-text>
    </v-row>
</template>

<script>
export default {
    data:()=>({
        tabs:null,
        dialogo_detalle:false,
        header:[{text:"Id",value:"id",align:"d-none d-md-flex"},{text:"Nombres",value:"nombre"},{text:"Diario",value:"pago"},{text:"Op",value:"actions"}],
        items:[{id:1,nombre:"alejandro asqui",pago:40,cargo:"obrero"},
                {id:2,nombre:"Alicia santos",pago:45,cargo:"obrero"},
                {id:3,nombre:"romel agustin",pago:40,cargo:"obrero"},
                {id:4,nombre:"ronal mamamni",pago:45,cargo:"obrero"}],
        dates:["2021-02-01", "2021-02-02", "2021-02-03", "2021-02-04", "2021-02-05", "2021-02-06", "2021-02-07", "2021-02-08", "2021-02-09"],
        
    }),
    computed:{
        total(){
            return this.dates.length * 40
        }
    },
    methods:{
        detalle_personal(){
            this.dialogo_detalle=true
        }
    }
}
</script>

<style>

</style>