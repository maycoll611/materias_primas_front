<template>
    <v-row class="ma-0" align="center">
        <v-col cols=12>
            <v-card>
                <v-tabs
                v-model="tab"
                background-color="teal"
                centered
                dark
                icons-and-text
                >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">
                    Individual 
                    <v-icon>mdi-card</v-icon>
                </v-tab>

                <v-tab href="#tab-2">
                    Resultados 2022 
                    <v-icon>mdi-card</v-icon>
                </v-tab>

                <v-tab href="#tab-3">
                    Listado
                    <v-icon>mdi-format-list-numbered-rtl</v-icon>
                </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="tab-1">
                        <v-card>
                            <v-card-text class="pa-1 pt-3">
                                <v-col cols=12 class="py-0">
                                    <v-form ref="form_buscar_codigo" @submit.prevent="buscar_codigo_db" v-model="validar_buscar_codigo" lazy-validation>
                                        <v-row class="mx-0 px-1">
                                            <v-col cols="9"  class="px-1">
                                                <v-text-field  clear-icon="mdi-close-circle" rounded counter="11" clearable :rules="codigoRules" v-model="buscar_codigo" dense outlined label="Codigo" required></v-text-field>
                                            </v-col>
                                            <v-col cols="3" class="px-1 pt-5 text-center" align-items="center">
                                                <v-btn color="teal" rounded :disabled="!validar_buscar_codigo" small type="submit"><v-icon>mdi-magnify</v-icon><span class="d-sm-none d-none d-md-flex">Buscar</span></v-btn>
                                            </v-col>
                                        </v-row>
                                        
                                    </v-form>
                                </v-col>
                                <v-col cols=12>
                                    <v-card>
                                        <v-card-text class="py-1">
                                            <p class="my-1"><strong>MAT: </strong> <span v-if="resultado_individual">{{resultado_individual[0]?resultado_individual[0].material:''}}</span>, <strong>UM: </strong> <span v-if="resultado_individual">{{resultado_individual[0]?resultado_individual[0].unimed:''}}</span>, <strong>UBIC: </strong> <span v-if="resultado_individual">{{resultado_individual[0]?resultado_individual[0].ubicacion:''}}</span></p>
                                            <p class="my-1"><strong>DESC: </strong> <span v-if="resultado_individual">{{resultado_individual[0]?resultado_individual[0].descripcion:''}}</span> </p>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-text class="py-1 px-1" v-if="resultado_individual">
                                            <v-card v-for="(item,i) of resultado_individual" :key="i" outlined class="pa-1 mb-2" :color="item.observacion == 'SIN OBSERVACION'? parseInt(item.diferencia) < 0?'red lighten-4':'green lighten-4':'orange lighten-4'">
                                                <p class="my-1"><strong>AÑO:</strong> {{item.PERIODO}},<strong> ALM:</strong>{{item.almacen}} </p>
                                                <p class="my-1"><strong>SAP: </strong> {{(item.stock_sap)?(parseFloat(item.stock_sap)).toFixed(2):"0"}}, <strong>FISICO: </strong> {{(item.encontrado)?(parseFloat(item.encontrado)).toFixed(2):"0"}} {{'( '+ item.unimed+')'}}, <strong>DIF: </strong> {{(item.diferencia)?(parseFloat(item.diferencia)).toFixed(2):"0"}}</p>
                                                <p class="my-1"><strong>OBS: </strong> {{item.observacion}} </p>
                                                <p class="my-1"><strong>ENCARGADO: </strong>  </p>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-card-text>
                            <v-card-actions>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="tab-2">
                        <v-card>
                            <v-card-title>
                            Resultados 2022
                            <v-spacer></v-spacer>
                            <!-- {{proveedores1}} -->
                            <v-text-field
                                v-model="buscar_data_material"
                                append-icon="mdi-magnify"
                                label="Buscar"
                                append-outer-icon="mdi-filter-menu"
                                @click:append-outer="filtrar_materiales()"
                                dense
                                outlined
                                rounded
                                hide-details
                            ></v-text-field>
                            </v-card-title>

                            <v-data-table
                            class="elevation-2 text-caption"
                            dense
                            mobile-breakpoint
                            style="font-size: 8px"
                            item-class="pa-5"
                            light
                            :headers="headers_materiales"
                            :items="data_materiales"
                            :search="buscar_data_material"
                            @click:row="material_row"
                            >
                            </v-data-table>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item value="tab-3">
                        <v-card>
                            <v-card-title>
                            Materiales
                            <v-spacer></v-spacer>
                            <!-- {{proveedores1}} -->
                            <v-text-field
                                v-model="buscar_data_material"
                                append-icon="mdi-magnify"
                                label="Buscar"
                                append-outer-icon="mdi-filter-menu"
                                @click:append-outer="filtrar_materiales()"
                                dense
                                outlined
                                rounded
                                hide-details
                            ></v-text-field>
                            </v-card-title>

                            <v-data-table
                            class="elevation-2 text-caption"
                            dense
                            mobile-breakpoint
                            style="font-size: 8px"
                            item-class="pa-5"
                            light
                            :headers="headers_materiales"
                            :items="data_materiales"
                            :search="buscar_data_material"
                            @click:row="material_row"
                            >
                            </v-data-table>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
        <v-dialog v-model="dialog_filtro_materiales" max-width="500">
                <v-card >
                    <v-card-title color="teal">
                        Filtros para consulta
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form_anular_guia" v-model="validate_form_filtro_materiales">
                            <v-row class="mx-0 pt-3">
                                
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="12">
                                    <v-combobox
                                    v-model="filtro_materiales.almacen"
                                    :items="combo_almacenes"
                                    label="Select Almacen"
                                    item-value="almacen_1"
                                    item-text="almacen_1"
                                    chips
                                    clearable
                                    outlined
                                    dense
                                    rounded
                                    ></v-combobox>
                                    {{filtro_materiales.almacen}}
                                    <!-- <v-text-field rounded v-model="anulacion.motivo_descripcion" dense outlined label="Motivo de la anulacion"></v-text-field> -->
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12" md="12">
                                    <v-combobox
                                    v-model="filtro_materiales.rack"
                                    :items="combo_racks"
                                    label="Select Rack"
                                    item-value="rack"
                                    item-text="rack"
                                    chips
                                    clearable
                                    outlined
                                    dense
                                    rounded
                                    ></v-combobox>
                                    {{filtro_materiales.rack}}
                                    <!-- <v-text-field rounded v-model="anulacion.motivo_descripcion" dense outlined label="Motivo de la anulacion"></v-text-field> -->
                                </v-col>
                                <v-col class=" pa-1 text-body-2 py-2" cols="12">
                                    <v-row class="ma-0">
                                        <v-spacer></v-spacer>
                                        <v-btn rounded color="primary" small @click="get_materiales">Aplicar</v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>    
    </v-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
export default {
    data:()=>({
        combo_almacenes:[],
        combo_racks:[],
        dialog_filtro_materiales:false,
        buscar_data_material:'',
        headers_materiales:[],
        data_materiales:[],
        filtro_materiales:{
            almacen:{almacen_1: "1A" },
            rack:{ rack: "01" },
            periodo:'2021'
        },
        // filtro_materiales:{
        //     codigo:'',
        //     almacen:[4000,'AOVH'],
        //     encargado:'',
        //     descripcion:'',
        // },
        tab:null,
        buscar_codigo:'',
        validar_buscar_codigo:null,
        validate_form_filtro_materiales:null,
        codigoRules:[
            v => (!!v) || 'Campo Ruc requerido',
            v => (v && v.length <= 9 && v.length >= 6) || 'Codigo valido de 6 a 9 caracteres'],
        inventario_2021:[],
        resultado_individual:[]
    }),
    methods:{
        ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta']),
        restaurar(){
            
            this.$route.push({name:'preguntas'})
        },
        get_materiales(){
            this.cambiar_dialogo_loader()
            let mi_promesa = new Promise((resolve,reject)=>{
                try {
                    let variable = 0
                    let intervalo = setInterval(function(){
                        console.log('valor: '+ variable)
                        if(variable == 4){
                            clearInterval(intervalo)
                            resolve('terminado con exito')
                        }else{
                            variable++
                        }
                        // variable ==3?clearInterval(intervalo) resolve():variable++
                    },1000)
                    // setTimeout(function(){
                    //     console.log('entrando a promise')
                    // resolve('echo')
                    // },2000)
                    
                } catch (error) {
                    reject(error)
                }
            })
            mi_promesa.then((resp)=>{
                    console.log(resp)
                     console.log('consiguiendo datos de materiales de almacen')
                    this.dialog_filtro_materiales=false
                    // this.$refs.form_material.reset()
                    this.cambiar_dialogo_loader()
            })
            
              
        },
        filtrar_materiales(){
            this.cambiar_dialogo_loader()

            axios.post(this.host+'api/get_almacenes_racks').then(resp =>{
                console.log(resp)
                this.combo_almacenes = resp.data.almacenes
                this.combo_racks = resp.data.racks
                this.cambiar_dialogo_loader()
                this.dialog_filtro_materiales = true
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Problemas conexios server...!'})
            })
            

        },
        material_row(item){
            console.log(item)
        },
        buscar_codigo_db(){
            this.cambiar_dialogo_loader()
            this.resultado_individual = []
            axios.post(this.host+'api/consultar_codigo',{material:this.buscar_codigo}).then(resp =>{
                console.log(resp)
                
            if((resp.data).length != 0){
                resp.data.forEach(element => {
                    element.forEach(element1 => {
                        this.resultado_individual.push(element1)
                    });
                });
                
            }else{
                this.cambiar_alerta({estado:true,color:'red darken-2',texto:'Ningun registro para:'+this.buscar_codigo+'... !'})
            }
                
                this.cambiar_dialogo_loader()
            }).catch((error)=>{
                console.log(error)
                this.cambiar_dialogo_loader()
                // this.cambiar_alerta({estado:true,color:'red darken-2',texto:'No se puede guardar error servidor...!'})
            })
            console.log(this.resultado_individual)
        }
       
    },
    mounted(){
        // this.listar_preguntas()
    },
    computed:{
        ...mapState(['usuario','host'])
    }
    
}

</script>

<style scoped>
td.text-start{
    font-size: 5px;
    padding: 1px;
}
</style>