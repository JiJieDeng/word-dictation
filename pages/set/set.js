// pages/set/set.js

const storage = require("../../utils/storage")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inner_delay: 100,
    outer_delay: 100,
    loop_time: 1,
    play_rate: 4,
    random: false,
    words: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setPlayParams(storage.getPlayParams())
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
   * 语音速度改变事件处理
   */
  playRateChange: function (e) {
    var rate = e.detail.value
    this.setData({
      play_rate: rate
    })
    storage.setPlayParams(this.getPlayParams())
  },
  /**
   * 循环次数改变事件处理
   */
  loopTimeChange: function (e) {
    var loop_time = e.detail.value
    this.setData({
      loop_time: loop_time
    })
    storage.setPlayParams(this.getPlayParams())
  },
  /**
   * 每次循环间隔时间改变事件处理
   */
  innerDelayChange: function (e) {
    var inner_delay = e.detail.value
    this.setData({
      inner_delay: inner_delay
    })
    storage.setPlayParams(this.getPlayParams())
  },
  /**
   * 每个单词间隔时间改变事件处理
   */
  outerDelayChange: function (e) {
    var outer_delay = e.detail.value
    this.setData({
      outer_delay: outer_delay
    })
    storage.setPlayParams(this.getPlayParams())
  },
  /**
   * 是否随机听写改变事件处理
   */
  randomChange: function (e) {
    var random = e.detail.value
    this.setData({
      random: random
    })
    storage.setPlayParams(this.getPlayParams())
  },
  /**
   * 生成播放参数
   */
  getPlayParams: function () {
    var params = {}
    params.inner_delay = this.data.inner_delay
    params.outer_delay = this.data.outer_delay
    params.loop_time = this.data.loop_time
    params.play_rate = this.data.play_rate
    params.random = this.data.random
    return params
  },
  /**
   * 设置播放参数
   */
  setPlayParams: function (params) {
    this.setData({
      inner_delay: params.inner_delay,
      outer_delay: params.outer_delay,
      loop_time: params.loop_time,
      play_rate: params.play_rate,
      random: params.random
    })
  }
})