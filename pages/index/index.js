//index.js
//获取应用实例
const app = getApp()
const storage = require("../../utils/storage")
const papa = require("../../utils/papaparse")

Page({
  data: {
    word:'',
    desc:'',
    words: []
  },
  /**
   * 听写按钮点击事件处理
   */
  toPlay:function(){
    wx.navigateTo({url:"../play/play"})
  },
  /**
   * 全删按钮点击事件处理
   */
  clear: function () {
    var content = this
    wx.showModal({
      title: '提示',
      content: '确认删除所有输入的单词吗',
      success(res) {
        if (res.confirm) {
          storage.clearWords()
          content.flushWords()
        }
      }
    })
  },
  /**
   * 添加按钮点击事件处理
   */
  add: function () {
    var word = this.data.word
    var desc = this.data.desc
    var words = storage.getWords()
    words.push({
      word:word,
      desc:desc
    })
    this.setData({
      word:"",
      desc:""
    })
    storage.setWords(words)
    this.flushWords()
  },
  /**
   * 删除按钮点击事件处理
   */
  del: function (event) {
    var index = event.currentTarget.dataset.index
    var newWords = new Array()
    var words = storage.getWords()
    for(var i=0;i<words.length;i++){
      if(i!=index){
        newWords.push(words[i])
      }
    }
    storage.setWords(newWords)
    this.flushWords()
  },
  /**
   * 单词输入
   */
  wordInput:function(e){
    this.setData({
      word: e.detail.value
    })
  },
  /**
   * 描述输入
   */
  descInput: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  onLoad: function (options) {
    var content = this
    content.setData({ words: storage.getWords()})
  },
  /**
   * 更新单词数据
   */
  flushWords:function(){
    var content = this
    content.setData({ words:storage.getWords()})
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
  }
})
