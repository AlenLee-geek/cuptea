// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAddress: false, //是否已经有用户的收货信息。
    itemList: [], //订单项列表
    payFee: 0, //订单应付费用
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this;
     const ctx = wx.createCanvasContext('border-bg');
     const imagePath = "../../assets/border-bg.png";
     ctx.drawImage(imagePath, 0, 0,400,10);
     ctx.draw();

     const carts = wx.getStorageSync("carts");
     let fee = 0;
     let list = carts.map((item) =>{
          if(item.selected){
            return item;
          }
     });
     for(let i = 0; i< list.length;i++){
        fee += parseFloat(list[i].price) * list[i].num;
     }

     that.setData({
       itemList: list,
       payFee: fee
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
  * 返回
  */
  goBack: function () {
    wx.navigateBack({

    })
  },
})