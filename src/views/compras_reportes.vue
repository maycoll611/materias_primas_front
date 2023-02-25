<template>
    <v-row clas="ma-0">
        <v-col class="pa-1" cols="12">
             
        </v-col>
        <v-col cols=12 md=3 sm=6 v-for="(item,i) of compras" :key="i">
            <v-card outlined >
                <v-card-title>
                    <v-row class="ma-0">
                        <span class="overline px-1">Compra N°: {{item.compra_codigo}}</span> 
                        <v-divider vertical></v-divider>   
                        <span class="caption px-1"> F: {{item.compra_fecha}}</span>
                    </v-row>
                    <v-row class="ma-0">
                        <span class="caption px-1"> F: {{item.compra_encargado}}</span>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row class="ma-0">
                        <v-col cols="1" class="pa-0 font-weight-black" align="right">ct</v-col>
                        <v-col cols="8" class="pa-0 font-weight-black" align="center">Descripcion</v-col>
                        <v-col cols="3" class="pa-0 font-weight-black">S.total.</v-col>
                    </v-row>
                    <v-row class="ma-0" v-for="(detalle ,i) of compra_detalles" :key="i">
                        <v-col v-if="item.compra_id == detalle.compras_compra_id" cols="1" class="pa-0" align="right">{{detalle.dtcompra_cantidad }}</v-col>
                        <v-col v-if="item.compra_id == detalle.compras_compra_id" cols="8" class="pa-0 font-italic caption">{{ detalle.dtcompra_um+'~'+detalle.dtcompra_descripcion +'('+ detalle.dtcompra_precio_unit+')'}}</v-col>
                        <v-col v-if="item.compra_id == detalle.compras_compra_id" cols="3" class="pa-0" align="right">{{detalle.dtcompra_total.toFixed(2)}}</v-col>
                    </v-row>
                    <v-row class="ma-0 font-weight-black">
                        <v-col cols="4" class="pa-0" >
                            
                        </v-col>
                        <v-col cols="4" class="pa-0 " align="right">
                            <span class="">
                                Total:
                            </span>
                        </v-col>
                        <v-col cols="4" class="pa-0" align="right">S/. {{(item.compra_subtotal).toFixed(2)}}</v-col>
                    </v-row>
                    <v-row class="ma-0">
                        <v-col cols="4" class="pa-0">
                            <!-- <v-switch
                                class="ma-0 pa-0"
                                v-model="igv"
                                inset
                                dense
                                hide-details
                                @change="verificar_igv"
                            ></v-switch> -->
                        </v-col>
                        <v-col cols="4" align="right" class="pa-0">
                            Igv
                        </v-col>
                        <v-col  cols="4" align="right" class="pa-0">
                            {{(item.compra_igv).toFixed(2)}}
                        </v-col>    
                    </v-row>
                    <v-row class="ma-0 font-weight-black">
                        <v-col cols="8" class="pa-0">

                        </v-col>
                        <v-col class="pa-0"  align="right" cols="4">
                            S/. {{(item.compra_total).toFixed(2)}}
                        </v-col>
                    </v-row>                    
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
export default {
    data:()=>({
        compras: [],
        compra_detalles:[],
        filtros:{
            compras_encargado:"",
            compras_fecha:"",
            compras_tipo:""
        },
    }),
    methods:{
        ...mapMutations(['cambiar_dialogo_loader']),
        listar_compras(){
            this.cambiar_dialogo_loader()
            axios.get('http://localhost:8000/api/compras_reportes',{params:this.usuario})
            .then(resp =>{
                console.log(resp)
                this.compras = resp.data.compras
                this.compra_detalles = resp.data.detalle_compras
                this.cambiar_dialogo_loader()
            }).catch(error=>{
                console.log(error)
            })       
        }
    },
    mounted(){
        // this.listar_compras()
    },
    computed:{
        ...mapState(['usuario'])
    }

}

</script>

<style scoped>
td.text-start{
    font-size: 5px;
    padding: 1px;
}
</style>