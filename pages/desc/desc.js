Page({
  data: {
    qqgroupcode: "http://img1.ph.126.net/xcyCd5cCWygb6DI3uE6ZRg==/6631518565471478773.png",
wechatcode:"http://img1.ph.126.net/rQEum9klihWmyVE0ULv6eQ==/5717504444900975164.jpg"
  },
  /**
   * 复制按钮点击事件处理
   */
  copy:function(event){
    wx.setClipboardData({
      data: event.currentTarget.dataset.value,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 预览图片
   */
  previewImage:function(event){
    var url = event.currentTarget.dataset.src
    wx.previewImage({
      current: url,
      urls: [url]
    })
  },
  /**
   * 播放诗歌
   */
  play:function(){
    var audio_1 = wx.createInnerAudioContext()
    var audio_2 = wx.createInnerAudioContext()
    var url = "https://dict.youdao.com/dictvoice?rate=4&le=auto&audio="
    url += "In Flanders fields the poppies blow;"
    url += "Between the crosses, row on row;"
    url += "That mark our place; and in the sky;"
    url += "The larks, still bravely singing, fly;"
    url += "Scarce heard amid the guns below;"
    url += "We are the Dead. Short days ago;"
    url += "We lived, felt dawn, saw sunset glow;"
    url += "Loved and were loved, and now we lie;"
    audio_1.src = url
    url = "https://dict.youdao.com/dictvoice?rate=4&le=auto&audio="
    url += "In Flanders fields;"
    url += "Take up our quarrel with the foe;"
    url += "To you from failing hands we throw;"
    url += "The torch; be yours to hold it high;"
    url += "If ye break faith with us who die;"
    url += "We shall not sleep;"
    url += "Though poppies grow;"
    url += "In Flanders fields."
    audio_2.src = url
    audio_1.onEnded(function(){
      audio_2.play()
    })
    audio_1.play()
  },
  onLoad: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '今天也要好好学英语',
      path: '/pages/desc/desc',
      imageUrl: "https://gitee.com/dengjijie/tingxie/raw/master/图片/desc_share.jpg"
    }
  }
})
