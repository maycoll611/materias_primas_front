<template>
  <v-col>
      <v-row class="justify-center">
        
        <v-col cols="12" md="4" sm="8" class="px-1 pb-0 pt-3">
          Modulo en desarrollo
          
        </v-col>
    </v-row>
  </v-col>
</template>

<script>
// import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  // components: { QrcodeStream },

  data () {
    return {
      isValid: undefined,
      camera: 'off',
      result: null,
    }
  },

  computed: {
  },

  methods: {
    iniciar(){
      this.camera = 'auto'
    },
    detener(){
      this.camera = 'off'
      this.result = null
    },
    resetValidationState () {
      this.isValid = undefined
    },

    onDecode (content) {
      this.result = content
      
    }
  }
}
</script>

<style>

</style>