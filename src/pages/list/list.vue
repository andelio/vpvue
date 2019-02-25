<template>
    <div class="container">
        <div class="list">
            <navigator
                v-for="item in list"
                :key ="item.id"
                :url = "'../item/main?id='+item.id"
            >
                <product :item="item"></product>
            </navigator>
        </div>
    </div>

</template>

<script>
import douban from '../../utils/douban.js';
import product from '../../components/product/product.vue';
export default{
    data() {
        return {
            title:'加载中...',
            type: '',
            page: 1,
            size:20,
            list: [

            ]
        }
    },
    components:{
        product
    },
    methods: {
        loadList: function(){
            douban({
                url: '/v2/movie/' + this.type,
                data: {
                    count: this.size,
                    start: this.page++
                },
                loading: true
            }).then(
                res => {
                    if(!res.data.subjects) return;
                    let result = [];
                    res.data.subjects.map((item)=>{
                        result.push({
                            image: item.images.large,
                            id: item.id,
                            average: item.rating.average,
                            original_title: item.original_title,
                            year: item.year,
                            directors: item.directors[0].name
                        })
                    })
                    this.list = result;
                    this.title = res.data.title;
                }
            )
        }
    },
    beforeMount: function(){
        this.title = this.$root.$mp.query.title || this.title;

        this.type = this.$root.$mp.query.key || this.type;
        
        this.loadList();
    },
    mounted(){
        mpvue.setNavigationBarTitle({
            title: this.title + '电影》豆瓣'
        })
    }
}
</script>

<style scoped>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
}

.list {
  display: flex;
  flex: 1;
  flex-direction: column;
}


</style>
