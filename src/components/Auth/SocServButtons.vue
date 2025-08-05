<template>
  <div class="mw-250 main-block">
    <div class="row text-caption text-center" v-if="(googleLink || facebookLink) && false">
      <div class="col">
        {{$t('authSocServBlockTitle')}}:
      </div>
    </div>
    <div class="row mw-250 inner-block">
      <div class="col-12 col-md soc-button" v-if="googleLink">
        <q-btn :icon="'img:' + imagesPathWebServer + '/socserv_buttons/google_icon.png'" stretch dense no-wrap :stack="false" flat @click.prevent="openGoogleAuth()" color="primary" label="google"></q-btn>
      </div>
      <div class="col-12 col-md soc-button" v-if="facebookLink">
        <q-btn :icon="'img:' + imagesPathWebServer + '/socserv_buttons/facebook_icon.png'" stretch dense no-wrap :stack="false" flat @click.prevent="openFacebookAuth()" color="primary" label="facebook"></q-btn>
      </div>
    </div>
    <div v-if="errors.length > 0" class="text-negative">
      <p v-for="(error, index) in errors" :key="index">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: 'SocServButtons',
  props:{
    googleLink:{
      type:String
    },
    facebookLink:{
      type:String
    },
    errors:{
      type:Array
    }
  },
  setup (props) {
    const imagesPathWebServer  = inject('imagesPathWebServer')
    const openGoogleAuth = () => {
      if(!props.googleLink)
        return;
      window.open(props.googleLink, 'googleSocAuth', 'popup=yes,width=580,height=400')
    }

    const openFacebookAuth = () => {
      if(!props.facebookLink)
        return;
      window.open(props.facebookLink, 'facebookSocAuth', 'popup=yes,width=580,height=400')
    }

    return {
      openGoogleAuth,
      openFacebookAuth,
      imagesPathWebServer
    }
  }
}
</script>
<style scoped>
.inner-block{
  display: block;
  text-align: center;
}
.main-block{
  display: inline-block;
  vertical-align: text-top;
}
.mw-250{
  max-width: 250px;
}
.soc-button{
  display: inline-block;
  width: auto;
  padding:0 5px;
}
</style>
