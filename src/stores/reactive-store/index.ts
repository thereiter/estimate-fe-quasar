import {reactive} from "vue";

export const appStore = reactive({
  isLoading: false,
  isAuthorized:false,
  isAuthorizedInitial:false,
  isAutoRegister:false,
  isAutoRegisterGenerateMail:false,
  login:null,
  userId:null,
  personalLink: '/personal/',
  errors:[],
})

export default {
  appStore
}
