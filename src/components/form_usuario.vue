<template>
    <v-container>
        <v-row class="ma-0">
            <v-col cols=12>
                {{usuario}}
            </v-col>
            <v-col cols=12>
                <v-btn color="teal" rounded-pill @click="asignar_valores()">Asignar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data:()=>({
        
    }),
    methods:{
        ...mapMutations('usuarios_store',['cambiar_data_usuario']),
        asignar_valores(){
            this.cambiar_data_usuario({
            usuario_id:'001', //int(11) AI PK 
            usuario_nombre:'maycoll123', //varchar(45) 
            usuario_pw:'123456', //varchar(50) 
            usuario_detalle_nombre:'maycoll quijo condori', //varchar(100) 
            usuario_dni:'72039966', //char(8) 
            usuario_fecha:'1995-12-06', //varchar(45) 
            usuario_correo:'maycollqujocondori@gmail.com', //varchar(100) 
            usuario_cargo:'administrador', //enum('administrador','empleado','gerente') 
            usuario_area:'logistica', //varchar(45) 
        })
        }
    },
    computed:{
        ...mapState('usuarios_store',['usuario'])
    }
}
</script>

<style lang="scss" scoped>

</style>