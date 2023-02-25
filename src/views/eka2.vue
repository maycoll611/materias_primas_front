<template>
    <v-container class="" :fluid="false">
        <v-card class="outlined pa-1" color="cyan lighten-3">
            <v-card-title class="head" >
                Estimada erika... Aceptas ser mi novia ? 
            </v-card-title>
            <v-card-text>
                <v-row class="py-3">
                    <v-col height="200" 
                            cols=2 class="pa-1" align="center"
                            v-for="items of array" :key="items.id" 
                            >
                            <v-card height="35" class="pa-0" elevation="0" color="transparent">
                                <div :hidden="items.estado?false:true">
                                    <v-btn :color="items.valor?'teal':'deep-orange lighten-1'" 
                                            class="rounded-pill" 
                                            dense
                                            @mouseover="items.valor?'':generar_aleatorio_entre(0,78,items.id)"
                                            @click="funcion_si(items)">
                                            <v-icon>{{items.valor ?'mdi-heart':'mdi-heart-broken'}}</v-icon>
                                        {{items.valor?'Si ACEPTO':'NO ACEPTO'}}
                                    </v-btn>
                                </div>
                            </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <p align="end" class="overline pa-0 ma-0 px-3"> by: Myk</p>
        </v-card>
        <v-dialog
        transition
        v-model="dialogo"
        max-width="500"
        >
            <v-card>
                <v-card-title primary-title class="red lighten-1">
                    <v-icon>mdi-heart-multiple</v-icon>
                    <v-icon>mdi-heart-multiple</v-icon>
                    <v-icon>mdi-heart-multiple</v-icon>
                       Aceptas...!!!!!!
                </v-card-title>
                <v-card-text class="pa-2">
                    <v-col cols=12> SABÍA QUE ACEPTARIAS MI AMOR... TE AMO!!!</v-col>
                    <v-col cols=12>
                        <v-img src="erika.jpeg"></v-img>
                    </v-col>
                    
                </v-card-text>
            </v-card>
        </v-dialog>
        
    </v-container>
</template>
<script>

export default{
    data:()=>({
        array:[],
        dialogo:false
    }),
    mounted(){
        this.generar()
        this.generar_aleatorio_entre(0,78,0)
    },
    methods:{
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
            
            for(var i = 0; i<78;i++){
                //var aleatorio =Math.round(Math.random())
                var objeto = {id: i,valor:0,estado:0}
                this.array.push(objeto)
            } 
            this.array[50].valor = 1
            this.array[50].estado = 1
        },
        generar_aleatorio_entre(inicio,fin,exepto){
            var aleatorio = Math.floor(Math.random() * (fin - inicio)+inicio)
            console.log(aleatorio)
            if(aleatorio == exepto || aleatorio == 50){
                console.log(aleatorio+" contra"+exepto)
                
                this.generar_aleatorio_entre(0,55,exepto)
                
            }else{
                //console.log(aleatorio)
                this.array[aleatorio].valor = 0
                this.array[aleatorio].estado = 1
                this.array[exepto].valor = 0
                this.array[exepto].estado = 0
            }
        }
    }
}
</script>