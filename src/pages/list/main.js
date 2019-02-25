import Vue from 'vue';
import App from './list';
Vue.config.errorHander = function(err) {
    if(console && console.error){
        console.error(err);
    }
}

const app = new Vue(App);
app.$mount();