// pages/play/play.js
const storage = require("../../utils/storage")
const urlHeader = "https://dict.youdao.com/dictvoice"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play:false,
    audios:[],//单词语音
    cur:0,//当前播放
    delay:1000,//延时播放毫秒数
    inner_delay:3000,//每次朗读间时间间隔
    outer_delay:5000,//每两个单词间间隔
    loopTime:3,//单个单词朗读次数
    loopCur:0,//当前朗读次数
    play_rate:4,//播放速度
    random:false//是否随机播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#483D8B',
      animation: {}
    })
    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    })

    this.setPlayParams(storage.getPlayParams())

    var words = storage.getWords()

    if(this.data.random){
      words = this.shuffle(words)
    }

    var audios = new Array(words.length)
    var url = urlHeader +"?rate="+this.data.play_rate+"&le=auto&audio="
    for(var i=0;i<words.length;i++){
      audios[i] = wx.createInnerAudioContext()
      audios[i].src = url+words[i].word
      audios[i].onEnded(this.callBack)
    }
    this.setData({
      audios:audios
    })
  },
  /**
   * 播放按钮点击事件处理
   */
  play:function(){
    if(this.data.play){
      this.pause()
    }else{
      this.start()
    }
  },
  /**
   * 播放完成回调事件处理
   * 重要哦
   * 主要逻辑都在这里处理
   */
  callBack:function(){
    var cur = this.data.cur
    var loopCur = this.data.loopCur
    var content = this

    //判断每个单词是否朗读了loopTime次
    if (loopCur+1<this.data.loopTime){
      this.setData({
        loopCur:loopCur+1,
        delay:content.data.inner_delay
      })
    }else{
      cur++
      this.setData({
        cur:cur,
        loopCur: 0,
        delay: content.data.outer_delay
      })
    }
    if(cur<this.data.audios.length){
      setTimeout(function () {
        if (content.data.play) {
          content.data.audios[cur].play()
        }
      },this.data.delay)
    }else{
      this.end()
    }
  },
  /**
   * 开始播放
   */
  start:function(){
    var content = this
    var cur = this.data.cur
    if (cur < this.data.audios.length) {
      content.setData({
        play:true
      })
      setTimeout(function(){
        if (content.data.audios[content.data.cur].paused && content.data.play) {
          content.data.audios[content.data.cur].play()
        }
      },this.data.inner_delay)
    }
  },
  /**
   * 暂停播放
   */
  pause: function () {
    var content = this
    var cur = this.data.cur
    if (cur < this.data.audios.length) {
      content.setData({
        play:false
      })
      if (!this.data.audios[this.data.cur].paused) {
        this.data.audios[this.data.cur].pause()
      }
    }
  },
  /**
   * 播放结束
   */
  end:function(){
    this.setData({ 
      play: false,
      paused:true,
      cur:0
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
      title: '坚持才有收获',
      path: '/pages/desc/desc',
      imageUrl: "https://gitee.com/dengjijie/tingxie/raw/master/图片/play_share.jpg"
    }
  },
  /**
   * 设置播放参数
   */
  setPlayParams: function (params) {
    this.setData({
      inner_delay: params.inner_delay,
      outer_delay: params.outer_delay,
      loopTime: params.loop_time,
      play_rate: params.play_rate,
      random: params.random
    })
  },
  /**
   * 随机打乱数组
   */
  shuffle:function (words) {
    var len = words.length
    for(var i = 0; i<len;i++){
      var end = len - 1
      var index = (Math.random() * (end + 1)) >> 0
      var t = words[end]
      words[end] = words[index]
      words[index] = t
    }
    return words
   }
})