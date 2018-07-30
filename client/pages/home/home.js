Page({
  data:{

  },
  /**
   * 进入用户中心
   */
  goUser:function(e){
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },
  /**
   * 点击优先商品
   */
  pickTea:function(e){
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },
  /**
   * 点击精选分类
   */
  goCategory:function(e){
    wx.navigateTo({
      url: '/pages/category/category',
    })
  }
});