// pages/doc/doc_index.js
const storage = require("../../utils/storage")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'dengjijie',
    repo:'tingxie',
    sha:'单词目录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var params = storage.getGitParams()
    if(typeof(params.owner)!='undefined'){
      this.setData({
        owner:params.owner
      })
    }
    if (typeof (params.repo) != 'undefined') {
      this.setData({
        repo: params.repo
      })
    }
    if (typeof (params.sha) != 'undefined') {
      this.setData({
        sha: params.sha
      })
    }
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
   * 所有者输入事件处理
   */
  ownerInput:function(res){
    this.setData({
      owner:res.detail.value
    })
  },
  /**
   * 仓库输入事件处理
   */
  repoInput: function (res) {
    this.setData({
      repo: res.detail.value
    })
  },
  /**
   * 分支输入事件处理
   */
  shaInput: function (res) {
    this.setData({
      sha: res.detail.value
    })
  },
  /**
   * 恢复默认按钮点击事件处理
   */
  restore:function(){
    this.setData({
      owner:'dengjijie',
      repo:'tingxie',
      sha:'单词目录'
    })
  },
  /**
   * 使用教程按钮点击事件处理
   */
  toDesc:function(){
    wx.switchTab({
      url: '../../pages/desc/desc'
    })
  },
  /**
   * 进入仓库按钮点击事件处理
   */
  toDoc:function(){
    this.save()
    var content = this
    wx.navigateTo({
      url: '../doc/doc?owner=' + content.data.owner + '&repo=' + content.data.repo + '&sha=' + content.data.sha + '&sha_tree=' + content.data.sha
    })
  },
  /**
   * 保存参数
   */
  save:function(){
    var params = {}
    params.owner = this.data.owner
    params.repo = this.data.repo
    params.sha = this.data.sha
    storage.setGitParams(params)
  }
})