<template>
    <v-container class="fluid">
        <v-card class="outlined" color="cyan lighten-2" hidden>
            <v-card-title class="head" >
                Estimada erika... Aceptas ser mi novia ? 
            </v-card-title>
            <v-card-text>
                <v-row class="py-3">
                    <v-col height="200" cols=1 class="pa-1" align="center" v-for="items of array" :key="items.id" @mouseout.prevent="funcion_no(items)">
                        <v-btn :color="items.valor?'teal':'deep-orange lighten-1'" 
                                class="rounded-pill" 
                                dense
                                @click="funcion_si(items)">
                            {{items.valor?'Si':'NO'}}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <p align="end" class="overline pa-0 ma-0 px-3"> by: Myk</p>
        </v-card>
        <v-dialog
        transition
        v-model="dialogo"
        max-width="450"
        >
            <v-card>
                <v-card-title primary-title class="red lighten-1">
                    Aceptas...!!!!!!
                </v-card-title>
                <v-card-text class="pa-2">
                    SABÍA QUE ACEPTARIAS MI AMOR... TE AMO!!!
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card>
            <v-btn dense color="teal" @click="funcion_pdf">pdf</v-btn>
            <iframe :src="pdf_data" class="border-round" width="100%" height="700"></iframe>
        </v-card>
    </v-container>
</template>
<script>
import {jsPDF} from "jspdf"
export default{
    data:()=>({
        array:[],
        dialogo:false,
        pdf_data:''
    }),
    mounted(){
        this.generar()
    },
    methods:{
        funcion_pdf(){
            const doc = new jsPDF()
            doc.text("Hello world!", 10, 10);
            this.pdf_data =  doc.output('datauristring')
        },
        funcion_si(item){
            if(item.valor == 1){
                this.dialogo = true
            }else{
                this.array[item.id].valor=1
            }
        },
        funcion_no(item){
            console.log(item)
            if(item.valor == 0){
                this.array[item.id].valor=1
            }
            // this.array[id] = 
        },
        generar(){
            
            for(var i = 0; i<156;i++){
                var aleatorio =Math.round(Math.random())
                var objeto = {id: i,valor:aleatorio,funcion:'funcion_si'}
                this.array.push(objeto)
            }
        }
    }
}
</script>