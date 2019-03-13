import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000',
    activeUser: '',
    rejected: false
  },
  mutations: {
    setActiveUser(state, user){
      state.activeUser = user;
    },
    toggleRejected(state){
      state.rejected = !state.rejected;
    }
  },
  actions: {
    async login(ctx, loginData){
      
      try {
        
        // post username + password to /auth, receive auth token  
        let token = await Axios.post(`${ctx.state.apiUrl}/auth`, loginData)
        console.log(token);
        // Set token in session storage
        sessionStorage.setItem('vueauthdemo', token.data.authToken);
        // update activeUser for UI ( ex. "Greger is logged in." )
        ctx.commit('setActiveUser', token.data.username);
        ctx.dispatch('getProducts');
      } catch(err) {

          ctx.commit('toggleRejected');
        setTimeout(()=>{
          ctx.commit('toggleRejected');
        }, 1000)

        console.error(err);      
      }
  
    },
    async getProducts(ctx){
      let opt ={
        headers: {
          authorization:`Bearer ${sessionStorage.getItem('vueauthdemo')}`
        }
      }
      let products = await Axios.get(`${ctx.state.apiUrl}/products`, opt );
      console.log(products);
    }
  }
})
