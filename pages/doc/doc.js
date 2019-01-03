// pages/doc/doc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    owner:'dengjijie',//仓库拥有者
    repo:'tingxie',//仓库
    sha:'master',//分支名
    sha_tree:'master',//文件夹
    folder_icon:'https://gitee.com/dengjijie/tingxie/raw/master/图片/folder_icon.png',
    file_icon:'https://gitee.com/dengjijie/tingxie/raw/master/图片/file_icon.png',
    file_url:''//文件原始地址路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content = this
    if(typeof (options.owner) != "undefined"){
      content.setData({
        owner:decodeURIComponent(options.owner)
      })
    }
    if (typeof (options.repo) != "undefined") {
      content.setData({
        repo: decodeURIComponent(options.repo)
      })
    }
    if (typeof (options.sha_tree) != "undefined") {
      content.setData({
        sha_tree: decodeURIComponent(options.sha_tree)
      })
    }
    if (typeof (options.sha) != "undefined") {
      content.setData({
        sha: decodeURIComponent(options.sha)
      })
    }
    if (typeof (options.file_url) != "undefined") {
      var file_url = content.data.file_url
      content.setData({
        file_url: decodeURIComponent(file_url+options.file_url)
      })
    }

    wx.request({
      url: 'https://gitee.com/api/v5/repos/' + content.data.owner + '/' + content.data.repo + '/git/gitee/trees/' + content.data.sha_tree,
success: function (res){
  if(res.statusCode==404){
    wx.showToast({
      title: '请求数据失败',
      icon:'none'
    })
    setTimeout(function () {
      wx.navigateBack()
    }, 1000)
  }
  var files = res.data.tree
  for(var i=0;i<files.length;i++){
    if (files[i].type == 'tree') {
      files[i].url = 'doc?owner=' + content.data.owner + '&repo=' + content.data.repo + '&sha='+content.data.sha+'&sha_tree=' + files[i].sha + '&file_url=' + content.data.file_url + files[i].path + '/'
    }
    if (files[i].type == 'blob') {
      files[i].url = 'doc_list?file_url=https://gitee.com/' + content.data.owner + '/' + content.data.repo + '/raw/' + content.data.sha + '/' + content.data.file_url+files[i].path
    }
 }
  content.setData({
    files:files
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
  }
})