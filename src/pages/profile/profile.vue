<template>
  <!-- <div>
    <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">获取头像</button>
    
      <image @tap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    
  </div> -->

<view class="container">
  <view class="userinfo">
    <button v-if="!hasUserInfo" open-type="getUserInfo" @getuserinfo="bindgetuserinfo"> 获取头像昵称 </button>
    <block wx:else>
      <image bindtap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
</template>
<script>
  export default {
    data(){
      return{
        motto: '',
        userInfo: {},
        hasUserInfo: false,
      }
    },
    methods: {
      bindgetuserinfo: function (e) {
        console.log(e)
        this.userInfo = e.mp.detail.userInfo
        this.hasUserInfo = true
        
      }
    }
  }
</script>
<style>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 200rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
</style>