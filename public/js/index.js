const app = Vue.createApp({

    data(){
        return {
            threads : [],
        }
    },

    methods: {
        async getThreads(language){
            this.threads = [];
            var ax = await axios.get('/thread/get-by-language/' + language);
            if(ax.status === 200){
                for(var i = 0; i < ax.data.length; i++){
                    this.threads.push(ax.data[i]);
                }
            }
        }
    }, 
    async mounted() {
        this.threads = [];
        var ax = await axios.get('/thread/latest');
        if(ax.status === 200){
            for(var i = 0; i < ax.data.length; i++){
                this.threads.push(ax.data[i]);
            }
        }
    }

}).mount('#app');