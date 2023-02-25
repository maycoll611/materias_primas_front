<template>
  <v-app class="pa-0">
    <v-dialog
      v-model="dialogo_loader"
      persistent
      width="300"
    >
      <v-card
        color="teal darken-3"
        dark
      >
        <v-card-text>
          Esperar por favor ...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0 rounded"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="alerta_snack.estado"
      :timeout="timeout"
      :color="alerta_snack.color"
      rounded
      outlined
      class="font-weight-black"
    >
      <span class="font-weight-black">
        {{ alerta_snack.texto }}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          rounded
          outlined
          dense
          :color="alerta_snack.color"
          v-bind="attrs"
          @click="cambiar_alerta({estado:false,texto:'',color:''})"
          class="font-weight-black px-0"
        >
          <v-icon dark>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  name: 'App',

  data: () => ({
    dates: ['2018-09-15', '2018-09-20'],
    eventos:["2018-09-15", "2018-09-11", "2018-09-12", "2018-09-18", "2018-09-13", "2018-09-19", "2018-09-20", "2018-09-14", "2018-09-21", "2018-09-07", "2018-09-06", "2018-09-05", "2018-09-03", "2018-09-10", "2018-09-16", "2018-09-17", "2018-09-09" ],
    menu: false,
    timeout: 5000
  }),
  mounted(){
    // this.cambiar_dialogo_loader()
  },
  methods:{
    ...mapMutations(['cambiar_dialogo_loader','cambiar_alerta'])    
  },
  computed:{
    ...mapState(['dialogo_loader','alerta_snack'])
  }
};
</script>
