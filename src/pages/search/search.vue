<template>
    <div class="container">
        <div class="search">
            <input class="search-input" :placeholder="subtitle"  focus @change="handleSearch" />
        </div>
        <div class="list">
            <div class="tips" v-if="loading">
                <div>
                    <img class="tips-img" src="/static/images/loading.gif" />
                    <span>加载中...</span>
                </div>
            </div>
            <navigator v-for="item in list" :key = "item.id" :url="'../item/main?id='+item.id" >
                <product :item="item"></product>
            </navigator>
            <div class="tips" v-if="list.length > 0" >
                <div v-if="hasMore">
                    <img class="tips-img" :src="'/static/images/loading.gif'" mode="aspectFill" />
                    <span class="span">正在玩命的加载中...</span>
                </div>
                <div v-else>
                    <span>没有东西可以加载了</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import douban from '../../utils/douban.js';
    import product from '../../components/product/product';

    export default {
        data(){
            return {
                page: 1,
                size: 20,
                subtitle: '请输入要搜索的内容',
                list: [],
                search: '',
                loading: false,
                hasMore: false
            }
        },
        components: {
            product
        },

        methods: {
            loadList(){
                
                this.subtitle="加载中...";
                this.hasMore = true;
                this.loading = true;
                let start = (this.page-1) * this.size;
                this.page = this.page + 1;
                douban({
                    url: '/v2/movie/search',
                    data: {
                        tag: this.search,
                        start: start,
                        count: this.size
                    }
                }).then(
                    res => {
                        this.loading = false;
                        this.hasMore = false;
                        this.subtitle = res.data.title;

                        if(!res.data.subjects.length) {
                            return ;

                        }

                        let result = [];
                        res.data.subjects.map((item) => {
                            result.push({
                                image: item.images.large,
                                id: item.id,
                                title: item.title,
                                average: item.rating.average,
                                original_title: item.original_title,
                                year: item.year,
                                directors: (item.directors.length && item.directors[0].name) || '没什么大不了'
                            })
                        })
                        console.log(result);
                        this.list = this.list.concat(result);
                        mpvue.stopPullDownRefresh();
                    }
                )
            },
            handleSearch(e){
                if(!e.target.value) return ;
                this.list = [];
                this.page = 1;
                this.subtitle = '加载中...',
                this.hasMore = true,
                this.loading = true,
                this.search = e.target.value;
                this.loadList();

            }
        },
        onPullDownRefresh: function(){
            this.list = [],
            this.page = 1;
            this.loadList();
        },
        onReachBottom: function(){
            this.loadList();
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

.search {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #ccc;
}

.search .search-input {
  padding: 20rpx 40rpx;
  color: #999;
  font-size: 38rpx;
  text-align: center;
}

.list {
  display: flex;
  flex: 1;
  flex-direction: column;
}


.list .tips {
  font-size: 28rpx;
  text-align: center;
  padding: 50rpx;
  color: #ccc;
}

.list .tips .tips-img,
.list .tips .span {
  vertical-align: middle;
}

.list .tips .tips-img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

</style>
