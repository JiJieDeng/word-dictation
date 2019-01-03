/**
 * 缓存操作
 */
var storage = {

  default_inner_delay:3000,//默认循环间间隔时间
  default_outer_delay:5000,//默认单词间间隔时间
  default_loop_time:3,//每个单词循环朗读次数
  default_play_rate:4,//单词语速,
  default_random:false,//默认不乱序听写

  /**
   * 存单词
   */
  setWords:function(words){
    try {
      wx.setStorageSync('words_listen_list', words)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 取单词
   */
  getWords:function(){
    try {
      var value = wx.getStorageSync('words_listen_list')
      if (value) {
        return value
      }else{
        return new Array()
      }
    } catch (e) {
      return new Array()
    }
  },

  /**
   * 清空
   */
  clearWords:function(){
    try {
      wx.removeStorageSync('words_listen_list')
    } catch (e) {
    }
  },

  /**
   * 默认参数
   */
  getDefaultPlayParams:function(){
    var params = {}
    params.inner_delay = this.default_inner_delay
    params.outer_delay = this.default_outer_delay
    params.loop_time = this.default_loop_time
    params.play_rate = this.default_play_rate
    params.random = this.default_random
    return params
  },

  /**
   * 设置播放参数
   */
  setPlayParams:function(params){
    try {
      wx.setStorageSync('words_play_params',params)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 获取播放参数
   */
  getPlayParams:function(){
    try {
      var value = wx.getStorageSync('words_play_params')
      var flag = value.inner_delay > 0 && value.outer_delay > 0 && value.loop_time > 0 && value.play_rate>0
      if (flag) {
        return value
      } else {
        return storage.getDefaultPlayParams()
      }
    } catch (e) {
      return storage.getDefaultPlayParams()
    }
  },
  /**
   * 存gitee参数
   */
  setGitParams: function (params) {
    try {
      wx.setStorageSync('gitee_params_list', params)
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 取gitee参数
   */
  getGitParams: function () {
    try {
      var value = wx.getStorageSync('gitee_params_list')
      if (value) {
        return value
      } else {
        return new Array()
      }
    } catch (e) {
      return new Array()
    }
  }
}

module.exports = {
  setWords:storage.setWords,
  getWords:storage.getWords,
  setPlayParams:storage.setPlayParams,
  getPlayParams:storage.getPlayParams,
  clearWords:storage.clearWords,
  setGitParams: storage.setGitParams,
  getGitParams: storage.getGitParams
}