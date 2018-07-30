var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    showModalStatus:false, //弹窗的转态
    num:1,
    minusStatus: 'disabled',


    actionType: "addCart", //操作类型默认是“添加到购物车”
    chooseSpec: "", //已选的规格
    productInfo:{}, //商品的基本信息
    specs: [
      { spec: '30g * 12包', selected: true },
      { spec: '500g * 1盒', selected: false },
    ], //商品的规格信息
    swiperImgUrls:[
      '../../assets/c-tea-9.png',
      '../../assets/c-tea-11.jpg',
      '../../assets/c-tea-12.jpg',
    ], //商品轮播图
    
  },
  /**
  * 返回
  */
  goBack: function () {
    wx.navigateBack({
    
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      console.log(cur);
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 500;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

  

  },
  onShow:function(){
    //初始化商品数据
    var that = this;
    let chooseSpec = that.data.chooseSpec;
    let specs = that.data.specs;
    for(let i=0; i<specs.length;i++){
      if (specs[i].selected){
        chooseSpec = specs[i].spec;
      }
    }
    that.setData({
      productInfo: { id: 1, title: "政大白茶", image: '../../assets/c-tea-12.jpg', num: 1, price: 300, desc:'高山老茶树，香醇味浓' },
      
      chooseSpec: chooseSpec

    })
  },

  /**
   *  显示遮罩层
   * 
   */
  showModal: function (e) {

    let actionType = e.currentTarget.dataset.action;

   
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      actionType: actionType
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  /**
   * 选择商品规格
   */
  chooseSpec:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let specs = that.data.specs;
    let chooseSpec = that.data.chooseSpec;
    for(let i = 0;i<specs.length;i++){
      if(index == i){
        specs[i].selected = true;
        chooseSpec = specs[i].spec;
      }else{
        specs[i].selected = false;
      }
    };
    that.setData({
      specs: specs,
      chooseSpec: chooseSpec
    });
  },
  /**
   *  隐藏遮罩层
   */
  hideModal: function () {
   
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  /**
   * 确认操作
   */
  doAction:function(e){
    var that = this;
    let actionType = that.data.actionType;
    if ("addCart" == actionType){
      that.addToCart();
    }else{
      that.buyNow();
    }
  },
  /**
   * 加入购物车
   */
  addToCart:function(){
    console.log("加入购物车操作");
    var that = this;
    let carts = wx.getStorageSync("carts") || [];
    console.log(carts);
    let productInfo = that.data.productInfo;
    // 判断当前商品是否已经在购物车中
    let exits = carts.find((item) => {
      return item.id === productInfo.id;
    });

    if(exits){
      exits.num = parseInt(exits.num) + that.data.num;
    }else{
      carts.unshift({
        id: productInfo.id, 
        title: productInfo.title, 
        image: productInfo.image,
        num: that.data.num, 
        price: productInfo.price, 
        spec: that.data.chooseSpec,
        selected:true
      });
    }

    wx.setStorage({
      key: 'carts',
      data: carts,
      success:function(res){
        wx.showToast({
          title: '添加购物',
          content: 'success',
          duration: 3000,
          success:function(){
            that.hideModal();
            wx.navigateTo({
              url: '../cart/cart',
            })
          }
        });
      }
    })
  },
  /**
   * 立即购买
   */
  buyNow:function(){
    console.log('立即购买');
  },
  footerTap: app.footerTap
})