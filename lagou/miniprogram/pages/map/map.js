// pages/map/map.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
import {CDN_PATH} from '../../config/appConfig';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
			latitude: 40.040415,
			longitude: 116.273511
    },
    markers: [{
      id: 0,
      iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
      latitude: 40.040415,
      longitude: 116.273511,
      width: 30,
      height: 30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'E5KBZ-ZIP3S-V5GOA-6ATYF-GAGGH-JAB5I'
    })
    this.getUserLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  onBindTap(event) {
    console.log(event);
    const latitude = event.detail.latitude;
    const longitude = event.detail.longitude;

    let location = this._getInfoByLatLong(latitude, longitude);
    console.log('location...');
    console.log(location);

    

  },

  _getInfoByLatLong(latitude, longitude) {

    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: ((res, data) => {
        this.setData({
          location: {
            latitude,
            longitude
          },
          markers: [{
            id: 0,
            callout: {
              content: data.reverseGeocoderResult.formatted_addresses.recommend,
              display: 'ALWAYS',
              padding: 10,
              borderRadius: 2
            },
			     	iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
			     	latitude: latitude,
			     	longitude: longitude,
			     	width: 30,
			     	height: 30
			     }]
          })
        }),
      })
  },

  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      success: (result)=>{
        const {latitude, longitude} = result;
        this.setData({
          location: {
            latitude,
            longitude
          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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

  }
})