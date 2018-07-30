Page({
  /**
   * 返回
   */
  goBack:function(){
    wx.navigateBack({
      
    })
  },
  /**
   * 预览图片
   */
  viewImage:function(e){
    console.log(e);
    var {url} = e.curentTarget.dataset;
    wx.previewImage({
      urls: [url],
    })
  }
});