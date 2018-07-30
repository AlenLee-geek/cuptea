// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],       //购物车列表
    hasList:false,  //列表是否有数据
    totalPrice:0,    //选中商品总价
    selectAllStatus:true, //全选状态，默认全选
    selectedNum:0,  //选中商品的数量
    obj:{}
  
  },
  /**
  * 返回
  */
  goBack: function () {
    wx.navigateBack({

    })
  },
  /**
   * 选中当前商品
   */
  selectList:function(e){
    const index = e.currentTarget.dataset.index;
    
    let carts = this.data.carts;
    const selected = carts[index].selected;
    let selectAllStatus = this.data.selectAllStatus;
    carts[index].selected = !selected;
    this.setData({
      carts:carts,
      
    });
    wx.setStorage({
      key: 'carts',
      data: carts,
    });
    this.getTotalPrice();

  },
  /**
   * 购物车全部选中
   */
  selectAll:function(e){
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for(let i = 0; i<carts.length;i++){
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus:selectAllStatus,
      carts:carts
    });
    wx.setStorage({
      key: 'carts',
      data: carts,
    });
    this.getTotalPrice();

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
    let carts = wx.getStorageSync("carts");
    let hasList = that.data.hasList;
    if(carts){
        hasList = true;
    }
    this.setData({
      hasList:hasList,
      carts:carts
    });
    this.getTotalPrice();
  
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
   * 增加数量
   */
  addCount: function(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num ++;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    wx.setStorage({
      key: 'carts',
      data: carts,
    });
    this.getTotalPrice();
  },
  /**
   * 减少数量
   */
  minusCount: function(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <=1){
      return false;
    }
    num --;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    wx.setStorage({
      key: 'carts',
      data: carts,
    });
    this.getTotalPrice();
  },
  /**
   * 输入框修改数量
   */
  updateCount: function(e){
    const index = e.currentTarget.dataset.index;
    console.log(index);
    
    let num = e.detail.value;
    console.log(num);

    let carts = this.data.carts;
   
    if (num <=1){
       num = 1;
    }
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    wx.setStorage({
      key: 'carts',
      data: carts,
    });
    this.getTotalPrice();

  },

  /**
   * 计算总价
   */
  getTotalPrice:function(){
    let carts = this.data.carts;
    let total = 0;
    let seleted = 0;
    
    for(let i = 0; i<carts.length;i++){
     
      if(carts[i].selected){
        total += carts[i].num*carts[i].price;
        seleted +=1;
      }
    }

    this.setData({
      carts:carts,
      totalPrice:total.toFixed(2),
      selectedNum: seleted,
     
    })
  },
  /**
   * 下单
   */
  doOrder:function(){
    var that = this;
    var selectedNum = that.data.selectedNum;//通过选中商品的数量进行判断是否执行下单操作
    if(selectedNum == 0){
      wx.showToast({
        title: '请选择商品',
        icon:"none"
      });
    }else{
      wx.navigateTo({
        url: '../order/order',
      })
    }
  }
  
})