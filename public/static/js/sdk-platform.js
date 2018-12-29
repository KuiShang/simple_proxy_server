/**
 * demo : {@link http://172.25.47.49/hybrid/demo/platform.html platformDemo}
 * Created by tanxiangyuan on 2016/7/27.
 */
'use strict';
/**
 * tools
 */
(function (w) {

    w.wallet || (w.wallet = {});
    if (w.wallet.tools) {
        return;
    }
    /**
     * 应iOS要求,在调用invoke方法时,方法名加入后缀,用于直接映射native方法。android同意改造。
     * @param name
     * @returns {string}
     */
    function wrapperNativeName(name) {
        return name + ":callback:";
    }


 function wrapperNativeName1(name) {
        return name + ":callback:";
    }

    /**
     * @class WalletTools
     * @type {{invoke: w.wallet.tools.invoke, on: w.wallet.tools.on, safeFunction: w.wallet.tools.safeFunction, required: w.wallet.tools.required}}
     */
    wallet.tools = {
        /**
         * native 方法调用统一入口
         * @method
         * @param ns
         * @param methodName
         * @param param
         * @param callback
         */
        invoke: function (ns, methodName, param, callback) {
            console.log('1 js invoke');
            console.log('methodName:', methodName);
            console.log('param:', param);
            console.log('callback:', callback);
           return w[ns].invoke((methodName), param, callback);
        },

        /**
         * native 事件调用统一入口
         * @param ns
         * @param eventName
         * @param param
         * @param callback
         */
        on: function (ns, eventName, param, callback) {
				console.log('1 js on');

            w[ns].on(eventName, param, callback);
        },

        /**
         * 保证返回一个Function
         * @param cb
         * @returns {Function}
         */
        safeFunction: function (cb) {
            return cb || function () {
                };
        },
        /**
         * 做参数的必填验证
         * @param debug
         * @param requireObj
         * @param fnName
         * @returns {boolean}
         */
        required: function (debug, requireObj, fnName) {
            debug = !!debug;
            if (!requireObj) {
                return true;
            }
            for (var p in requireObj) {
                if (requireObj.hasOwnProperty(p) && !requireObj[p]) {
                    debug && fnName && console.log(fnName + '中,参数' + p + '必须填写!');
                    return false;
                }
            }
            return true;
        }
    }
})(window);



/**
 * platform sdk
 */
(function (w, tools) {
    w.wallet || (w.wallet = {});
    if (wallet.platform) {
        return;
    }

    /**
     * 根据类型获取SessionStorage or LocalStorage
     * @param debug
     * @param type
     * @returns {Storage}
     */
    function getStorageByType(debug, type) {
        if (type == 'session') {
            return w.sessionStorage;
        } else if (type == 'local') {
            return w.localStorage;
        } else {
            debug && console.log('unkown type : ' + type);
            return null;
        }
    }


    /**
     * 平台对外暴露的接口及事件对象
     * @class PlatformSDK
     * {@link http://wiki.cbpmgt.com/confluence/pages/viewpage.action?pageId=19693404 WIKI}
     */
    wallet.platform = {
        debug: false, //是否启用调试,再调试模式下参数检查情况会输出到控制台
        /**
         * 获取platform协议的实现情况,可用的事件、可用的接口、协议版本
         * @param callback
         */
        env: function (callback) {
            platform.env(callback);
        },



	

        /**
         * 调用app的分享功能
         * @param param {{}} { type(必填): String[text|web|view], channel(必填): String[WX|QQ|WB|MON|STOCK] }
         * @param callback {function}
         */
        share: function (param, callback) {//17
            if (tools.required(this.debug, {
                    "param": param,
                    "param.type": param && param.type,
                    "param.channel": param && param.channel
                }, 'share')) {
                if (['text', 'web', 'view'].indexOf(param.type) == -1) {
                    this.debug && console.log('不正确的分享类型:' + param.type);
                    return;
                }
                var channels = param.channel.split('|'),
                    expectChannel = ['WX', 'QQ', 'WB', 'MON', 'STOCK'];
                for (var l = channels.length; l > 0; l--) {
                    if (expectChannel.indexOf(channels[l - 1]) == -1) {
                        this.debug && console.log('不正确的分享渠道:' + param.channel);
                        return;
                    }
                }

                tools.invoke('platform', 'share', param, tools.safeFunction(callback));
            }
        },

        /**
         * 获取当前用户的基本信息
         * @param callback {function}
         */
        getUserInfo: function (callback) {//8
            if (tools.required(this.debug, {"callback": callback}, 'getUserInfo'))
                tools.invoke('platform', 'getUserInfo', {}, callback);
        },


	

        shareByOS: function (param, callback) {
            tools.invoke('platform', 'shareByOS', param,callback);
        },




      

	   /**
         * 关闭浏览器
         */
        close: function (param) {//4
            tools.invoke('platform', 'close', param);
        },


        /**
         * 关闭浏览器
         */
        setResult: function (param) {
            tools.invoke('platform', 'setResult', param);
        },



        /**
         * 放入本地缓存,考虑缓冲区已满的问题
        
         */
        putCache: function (json, callback) {//sdk实现
         
                tools.invoke('platform', 'putCache', json, callback);
          
        },


        /**
         * 从本地缓冲区获取数据,可以一次取多个key,以spliter分割,默认为';'
      
      
         */
         getCache: function (json, callback) {//sdk实现
         
            tools.invoke('platform', 'getCache', json, callback);
        },

        /**
         * 从缓冲区移除数据,可以一次删除多个key,以spliter分割,默认为';'
         */
        removeCache: function (json, callback) {//sdk实现
           
            tools.invoke('platform', 'removeCache',json, callback);
        },

        /**
         * 启动app模块
         * @param param {{}}
         * @param callback {function}
         */
        start: function (param, callback) {//15
            if (tools.required(this.debug, {
                    "param": param,
                    "param.name": param && param.name,
                    "param.param": param && param.param
                }, 'start')) {
                
                param.param = JSON.stringify(param.param);

                tools.invoke('platform', 'start', param, tools.safeFunction(callback));
            }
        },

        /**
         * 检查设备的网络状况
         *
         * @param callback {function} 回调参数 : { hasNetwork:boolean, netType:String(wifi|2G|3G|4G|unknow) }
         */
        checkNetwork: function (callback) {//3
            if (tools.required(this.debug, {"callback": callback}, 'checkNetwork')) {

                tools.invoke('platform', 'checkNetwork', {}, function (resp) {
                    if (resp && resp.code == 0 && resp.data) {
                        resp.data.hasNetwork = resp.data.hasNetwork ? true : false;
                    }
					 console.log('suwg get back '+resp);
                    callback(resp);
                });
            }
        },

        /**
         * 网络请求
         * @param param {{}}
         * @param callback {function}
         * @param errorCallback {function}
         */
        request: function (param, callback) {//18
     
            tools.invoke('platform', 'request', param,callback);
        },

        /**
         * 弹出toast
         * @param param {{}} { msg(必填):String }
         */
        toast: function (param) {//1
            if (tools.required(this.debug, {"param": param, "param.msg": param && param.msg}, 'toast')) {
                tools.invoke('platform', 'toast', param);
            }
        },

        /**
         * 弹出简单对话框
         * @param param {{}} { title(必填):String, msg(必填):String, cancelBtnText:String, cancelCallBack:function, okBtnText:String, okCallBack:function }
         */
        confirm: function (param) {//5
            if (tools.required(this.debug, {
                    "param": param,
                    "param.title": param && param.title,
                    "param.msg": param && param.msg
                }, 'confirm')) {

                tools.invoke('platform', 'confirm', param);
            }
        },

        /**
         * 设置浏览器标题
         * app默认使用页面title字段,手动调用此api会覆盖原有title
         * 只对当前页面有效
         * @param param {Object}
         */
         setTitle: function (param) {//12
           
                tools.invoke('platform', 'setTitle', param);
            
        },

       



  

	

        /**
         * 设置当前页面的菜单
         * 只对当前页面有效,刷新后需要重设
         * @param param {{}}
         * @param callback {function}
         */
        setMenu: function (param, callback) {//14
            if (tools.required(this.debug, {
                    "param": param,
                    "param.menus": param && param.menus
                }, 'setMenu')) {
                if (!Array.isArray(param.menus)) {
                    this.debug && console.log('setMenu,param.menues 必须是一个数组类型');
                    return;
                }
                for (var l = param.menus.length; l > 0; l--) {
                    var _menu = param.menus[l - 1];
                    if (!tools.required(this.debug, {
                            "param.menus.menuTitle": _menu.menuTitle,
                            "param.menus.menuAction": _menu.menuAction
                        }, 'setMenu')) {

                        return;
                    }
                }
                tools.invoke('platform', 'setMenu', param, tools.safeFunction(callback));
            }
        },

        /**
         * 埋点
         * 
         */
        buriedPoint: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {

                tools.invoke('platform', 'buriedPoint', param, callback);
           //  }
        },


		/**
         * 获取地理位置
         * getLocation
         */
        getLocation: function (callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {

                tools.invoke('platform', 'getLocation', {}, callback);
        //     }
        },


		

 /**
         * getUsersByNumber
         * 
         */
        getUsersByNumber: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'getUsersByNumber', param, callback);
           //  }
        },

	
 /**
         * getPhonesByNumber
         * 
         */
        getPhonesByNumber: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'getPhonesByNumber', param, callback);
           //  }
        },





        /**
         * 加密数据
         * 
         */
        encryption: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'encryption', param, callback);
           //  }
        },


		 /**
         * 解密
         * 
         */
        decode: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'decode', param, callback);
           //  }
        },



        /**
         * 加密数据
         * 
         */
        encryptionsynch: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
             return   tools.invoke('platform', 'encryptionsynch', param, callback);
           //  }
        },


		 /**
         * 解密
         * 
         */
        decodesynch: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
              return  tools.invoke('platform', 'decodesynch', param, callback);
           //  }
        },

		
		 /**
         * openWebView
         * 
         */
        openWebView: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'openWebView', param, callback);
           //  }
        },


		 /**
         * getscanCode
         * 
         */
        getScanCode: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'getScanCode', param, callback);
           //  }
        },



	 /**
         * getCokie
         * 
         */
        getCookie: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'getCookie', param, callback);
           //  }
        },




	 /**
         * setCookie
         * 
         */
        setCookie: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'setCookie', param, callback);
           //  }
        },



 /**
         * getInstallApps
         * 
         */
        getInstallApps: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'getInstallApps', param, callback);
           //  }
        },



 /**
         * checkInstallApps
         * 
         */
        checkInstallApps: function (param,callback) {//23
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'checkInstallApps', param, callback);
           //  }
        },







			/**
         * 获取图片
         * @param callback {function}
         */
        getPicture: function (callback) {//23
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'getPicture')) {

                tools.invoke('platform', 'getPicture', {}, callback);
            }
        },





        /**
         * 获取公共参数信息
         * @param callback {function}
         */
        getCommonInfo: function (callback) {//9
            if (tools.required(this.debug, {"callback": callback}, 'getCommonInfo')) {

                tools.invoke('platform', 'getCommonInfo', {}, callback);
            }
        },



  /**
         * reload
         * @param callback {function}
         */
        reload: function (param,callback) {//9
            if (tools.required(this.debug, {"callback": callback}, 'reload')) {

                tools.invoke('platform', 'reload', param, callback);
            }
        },






        /************ 事件监听 **************/




 /**
         * goNativeAction
         * 
         */
        goNativeAction: function (param,callback) {
          //  if (tools.required(this.debug, {
            //        "callback": callback
              //  }, 'getPicture')) {
                tools.invoke('platform', 'goNativeAction', param, callback);
           //  }
        },




        /**
         * app返回键监听
         * @param callback
         */
        onBackPress: function (callback) {//1

            console.log('suwg 1100 onBackPress  insdk');
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onBackPress')) {
                console.log('suwg 1101 onBackPress  insdk');
                tools.on('platform', 'onBackPress', {}, callback)
            }
            if(!callback) {
                console.log('suwg 1102 onBackPress  insdk');
                tools.on('platform', 'onBackPress', {}, callback)
            }
        },
        /**
         * webview关闭监听
         * @param callback
         */
        onClose: function (callback) {//2
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onClose')) {
                tools.on('platform', 'onClose', {}, callback)
            }
        },
        /**
         * 当前用户被登出监听
         * @param callback
         */
        onLogout: function (callback) {//3
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onLogout')) {
                tools.on('platform', 'onLogout', {}, callback)
            }
        },
        /**
         * 设备网络情况监听
         * @param callback
         */
        onNetChanged: function (callback) {//4
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onNetChanged')) {
                tools.on('platform', 'onNetChanged', {}, function (resp) {
                    if (resp && resp.code == 0 && resp.data) {
                        resp.data.hasNetwork = resp.data.hasNetwork ? true : false;
                    }
                    callback(resp);
                })
            }
        },
        /**
         * webview切到后台监听
         * @param callback
         */
        onBackground: function (callback) {//5
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onBackground')) {
                tools.on('platform', 'onBackground', {}, callback)
            }
        },
        /**
         * webview回到前台监听
         * 只有先触发onBackground才能触发onForeground
         * @param callback
         */
        onForeground: function (callback) {//6
            if (tools.required(this.debug, {
                    "callback": callback
                }, 'onForeground')) {
                tools.on('platform', 'onForeground', {}, callback)
            }
        },
        /**
         * 设备摇一摇监听
         * @param callback
         */
        onShake: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', 'onShake', {}, callback)
            //}
        },


	/**
         * 设备摇一摇监听
         * @param callback
         */
        onTitleBusiness: function (pa,callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', 'onTitleBusiness', pa, callback)
            //}
        },


   /**
         * onWaitPlug 等待插件下载完成
         * @param callback
         */
        onWaitPlug: function (callback) {
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', 'onWaitPlug', {}, callback)
            //}
        },

			



			



  /**
         * 
         * @param callback
         */
			 goLoginRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/account/loginByPwd', {}, callback)
            //}
        },

			  /**
         * 
         * @param callback
         */
			   goKYCRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/kyc/main', {}, callback)
            //}
        },


  /**
         * @param callback
         */
			   goSafeCenterRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/safecenter/main', {}, callback)
            //}
        },

			  /**
         * 
         * @param callback
         */
			   goBindT1Res: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/account/bindThe1', {}, callback)
            //}
        },


			  /**
         * 
         * @param callback
         */
			   goSetPaymentPasswordRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', 'Go_SetPaymentPassword_Res', {}, callback)
            //}
        },


			  /**
         * 
         * @param callback
         */
			   goBindCardRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/bank/management', {}, callback)
            //}
        },


  /**
         * 
         * @param callback
         */
			   goScanRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', '/scan/web', {}, callback)
            //}
        },

			  /**
         * 
         * @param callback
         */
			   goContactRes: function (callback) {//7
           // if (tools.required(this.debug, {
             //       "callback": callback
               // }, 'onShake')) {
                tools.on('platform', 'Go_Contact_Res', {}, callback)
            //}
        },




			
			  




        /**
         * app推送消息监听
         * @param busisessType 指定监听的业务类型
         * @param callback
         */
        onPush: function (busisessType, callback) {//8
            if (tools.required(this.debug, {
                    "busisessType": busisessType,
                    "callback": callback
                }, 'onPush')) {

                tools.on('platform', 'onPush', {
                    busisessType: busisessType
                }, callback)
            }
        }
    }
})(window, window.wallet.tools);
