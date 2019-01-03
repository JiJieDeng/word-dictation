// pages/tools/tools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
   * 文档按钮点击事件处理
   */
  toDocIndex:function(){
    wx.navigateTo({
      url: '../doc/doc_index'
    })
  },
  /**
   * 扫描按钮点击事件
   */
  scann:function(){
    wx.showModal({
      title: '敬请期待',
      content: '下一个功能就是它了',
      showCancel:false
    })
  },
  /**
   * 分享按钮点击事件
   */
  share:function(){
    wx.showModal({
      title: '敬请期待',
      content: '下下一个功能就是它了',
      showCancel: false
    })
  }
})