// pages/doc/doc_list.js

import Papa from '../../utils/papaparse.js'
const storage = require("../../utils/storage")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = decodeURIComponent(options.file_url)
    var content = this
    wx.request({
      url: url,
      success:function(res){
        var temp = Papa.parse(res.data).data
        var count = 0
        var temp_files = []
        for (var i = 0; i < temp.length; i++) {
          for(var j=0;j<temp[i].length;j++){
            if(temp[i][j]!=""){
              temp_files[count++] = temp[i][j]
            }
          }
        }
        content.setData({
          files:temp_files
        })
      }
    })
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
    return {
      title: '单词听写',
      path: '/pages/index/index',
      imageUrl: "http://img1.ph.126.net/gtigWEVlA6XbXE9aFrB0ew==/2098114476501923011.jpg"
    }
  },
  /**
   * 覆盖单词列表按钮点击事件
   */
  newList:function(){
    var content = this
    wx.showModal({
      title: '确认覆盖吗',
      content: '覆盖后之前的听写列表会丢失',
      success:function(res){
        if (res.confirm) {
          storage.clearWords()
          var words = new Array()
          var files = content.data.files
          var length = files.length
          for (var i = 0; i < length; i++) {
            var word = {}
            word.word = files[i]
            word.desc = ''
            words.push(word)
          }
          storage.setWords(words)
          storage.getWords()
          wx.switchTab({
            url: '../index/index',
            success:function(e){
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  },
  /**
   * 追加列表按钮点击事件处理
   */
  addToList:function(){
    var content = this
    wx.showModal({
      title: '确认追加吗',
      content: '文档的单词会加在之前听写列表的后面',
      success:function(res){
        if(res.confirm){
          var words = storage.getWords()
          var files = content.data.files
          var length = files.length
          for(var i=0;i<length;i++){
            var word = {}
            word.word = files[i]
            word.desc = ''
            words.push(word)
          }
          storage.setWords(words)
          storage.getWords()
          wx.switchTab({
            url: '../index/index',
            success:function(e){
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            } 
          })
        }
      }
    })
  }
})