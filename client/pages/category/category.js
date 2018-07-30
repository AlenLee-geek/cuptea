Page({
  /**
   * 返回
   */
  goBack: function () {
    wx.navigateBack({
     
    })
  },
  /**点击查看详情 */
  goDetail:function(e){
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
});