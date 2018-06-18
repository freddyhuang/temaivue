import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        productId: '',
        agentCode:'woa',//代理商号
        buyDes:{},
        payData:"",
        product:{},
        StateDate:{}
    },
    getters: {
        changeState: state => {
            //相当于vue实例中的methods,用于处理公用data
            //自vuex 面向组件的数据处理
        }
    },
    mutations: {
        //写法与getters相类似
        //组件想要对于vuex 中的数据进行的处理
        //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
        //内部操作必须在此刻完成(同步)
        changeProductId(state,id){
        	window.localStorage.setItem('productId',id);
        	state.productId = id
        },
        changeProduct(state,product){
            var productStr = JSON.stringify(product);
        	window.localStorage.setItem('product',productStr);
        	state.product = product
        },
        addState(state,StateDate){
            var StateDateStr = JSON.stringify(StateDate);
        	window.localStorage.setItem('StateDate',StateDateStr);
        	state.StateDate = StateDate
        },
        changeAgentCode(state,agentCode){
        	window.localStorage.setItem('agentCode',agentCode);
        	state.agentCode = agentCode
        },
        addBuyDes(state,buyDesJson){
        	var buyDesJsonStr = JSON.stringify(buyDesJson);
        	window.localStorage.setItem('buyDes',buyDesJsonStr);
        	state.buyDes = buyDesJson
        },
        changePayDate(state,payData){
            console.log(1225)
            var payDataStr = JSON.stringify(payData);
            console.log(1227)
        	window.localStorage.setItem('payData',payDataStr);
        	state.payData = payData;
        }
    },
    modules: {
        //引入某一个state的以上集合的模块，会自动分别填充到上面，使得结构更加清晰
    }
});