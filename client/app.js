//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
       

        qcloud.setLoginUrl(config.service.loginUrl);
        qcloud.login({
          success: function(userInfo){
            console.log('登入成功',userInfo);
          },
          fail:function(err){
            console.log("登入失败",err);
          }
        })
       

    }
})