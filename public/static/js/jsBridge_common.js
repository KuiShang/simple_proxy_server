/**
 实现托管匿名函数托管  suwg

 * Created by tanxiangyuan on 2016/7/27.
 * Modified by yaohaiyang@jd.com on 2017/02/27.
 */

/*eslint-disable*/

(function(w) {
    var class2type = {},
      _hasOwn = class2type.hasOwnProperty;
  
    /*防止重复加载*/
    if (typeof w['jsBridge'] != 'undefined') {
      return;
    }
  
    /*JSBridge*/
    function JSBridge() {
      /*全局调用回调*/
      this.invokeCallStore = {};
      /*事件回调*/
      this.eventCallStore = {};
      /*参数回调*/
      this.paramCallStore = {};
    }

    function getSysType (str) {
        var ua = navigator.userAgent.toLowerCase();
        var isIOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
        var isAndroid = ua.indexOf('android') > -1 || false;
        // var isJdIdApp = getCookie("from") && getCookie("from").substring(0,3) == "app" ? true : false;
      
        var result = {
            isIOS: isIOS,
            isAndroid: isAndroid,
            // isJdIdApp: isJdIdApp
        }
      
        return result[str];
    }
  
    JSBridge.prototype = {
      invoke: function(namespace, methodName, param, callback) {
       console.log('3 js invoke');
        if (!methodName) {
          throw new Error('methodName is required!');
        }
        /* 检查不通过时返回异常消息对象 */
        if (getSysType('isAndroid')) {
          var nativeNS = checkAndBuildNameSpace(namespace);
  
          if (isPlainObject(nativeNS) && typeof callback === 'function') {
            callback(nativeNS);
            return;
          }
        }

        /* 处理param function -> functionName */
        if (isPlainObject(param)) {
          dealCallbackOfParam(param);
        }
        /* 处理callback function -> functionName */
       var res;
        console.log('messge:', JSON.stringify(param))
       if (getSysType('isIOS')) {
        message = {'methodName':methodName,'params':JSON.stringify(param),'callback':addCall(callback, methodName)};
        res = window.webkit.messageHandlers.invoke.postMessage(message);
       } else if (getSysType('isAndroid')) {
        res= w[nativeNS].invoke(methodName, JSON.stringify(param), addCall(callback, methodName));
       } else {
         console.error('系统判断错误，无法判断出是Android或ios,请检查ua')
       }
      // console.log("33"+JSON.stringify(res)+" "+res+" "+nativeNS);
       return res;
      },
      on: function(namespace, eventName, param, callback) {
        if (!eventName) {
          throw new Error('eventName is required!');
        }

          /* 检查不通过时返回异常消息对象 */
        if (getSysType('isAndroid')) {
          var nativeNS = checkAndBuildNameSpace(namespace);
  
          if (isPlainObject(nativeNS) && typeof callback === 'function') {
            callback(nativeNS);
            return;
          }
        }

        /* 处理param function -> functionName */
        if (isPlainObject(param)) {
          dealCallbackOfParam(param);
        }
        var res;
        /* 处理callback function -> functionName */
        if (getSysType('isIOS')) {
          message = {'methodName':eventName,'params':JSON.stringify(param),'callback':addEventCall(callback)};
          res = window.webkit.messageHandlers.on.postMessage(message);
         } else if (getSysType('isAndroid')) {
          res = w[nativeNS].on(eventName, JSON.stringify(param), addEventCall(callback));
         } else {
           console.error('系统判断错误，无法判断出是Android或ios,请检查ua')
         }
         return res
      },
      env: function(namespace, callback) {
        /* 检查不通过时返回异常消息对象 */
        var nativeNS = checkAndBuildNameSpace(namespace);
  
        if (isPlainObject(nativeNS) && typeof callback === 'function') {
          callback(nativeNS);
          return;
        }
        /* 处理callback function -> functionName */
        w[nativeNS].env(addCall(callback, 'env'));
      }
    };
  
    /*格式化异常消息*/
    function formateErrorResp(msg) {
      return {
        code: 1,
        msg: msg
      }
    }
  
    /*检查创建命名空间*/
    function checkAndBuildNameSpace(nameSpace) {
      if (!nameSpace) {
        throw new Error('nameSpace is required!');
      }
  
      var nativeNS = '_' + nameSpace;
  
      if (typeof w[nativeNS] === 'undefined') {
        return formateErrorResp('命名空间[' + nativeNS + ']不支持。');
      }
      return nativeNS;
    }
  
    /* 批量添加参数中的回调 */
    function dealCallbackOfParam(param) {
      for (var p in param) {
        if (hasOwn(param, p) && typeof param[p] === 'function') {
          param[p] = addParamCall(param[p]);
        } else if (isPlainObject(param[p])) {
          dealCallbackOfParam(param[p]);
        } else if (Array.isArray(param[p])) {
          for (var length = param[p].length; length > 0; length--) {
            dealCallbackOfParam(param[p][length - 1]);
          }
        }
      }
    }
  
    /**
     * 添加 paramCallStore 事件回调
     * @param {Function} cb 回调函数
     */
    function addParamCall(cb) {
      return _addCall('paramCallStore', cb);
    }
    /**
     * 添加 eventCallStore 事件回调
     * @param {Function} cb [回调函数]
     */
    function addEventCall(cb) {
      return _addCall('eventCallStore', cb);
    }
  
    /**
     * 添加 invokeCallStore 事件回调，回调执行完毕清除之。
     * @param {Function} cb         [回调函数]
     * @param {[type]}   methodName [方法名称]
     */
    function addCall(cb, methodName) {
      if (!cb) {
        return '';
      }
      var callId = uniqueId(methodName);
      w.jsBridge['invokeCallStore'][callId] = {
        _t: new Date().getTime(),
        _m: methodName,
        fn: function(resp) {
          cb && cb(resp && JSON.parse(resp));
          delete w.jsBridge['invokeCallStore'][callId];
        }
      };
      return 'jsBridge.invokeCallStore.' + callId + '.fn';
    }

    /**
     * 向 invokeCallStore|paramCallStore|eventCallStore 中添加回调.
     * @param {[type]}   callType [回调类型]
     * @param {Function} cb       [回调]
     */
    function _addCall(callType, cb) {
      if (!cb) {
        return '';
      }
      var callId = uniqueId();
      w.jsBridge[callType][callId] = function(resp) {
        cb && cb(resp && JSON.parse(resp));
      };
      return 'jsBridge.' + callType + '.' + callId;
    }
  
    /*----tools---*/
    function isPlainObject(obj) {
      if (type(obj) !== "object" || obj.nodeType) {
        return false;
      }
      if (obj.constructor && !hasOwn(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    }
  
    function type(obj) {
      if (obj == null) {
        return obj + "";
      }
  
      return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
    }
  
    function hasOwn(o, p) {
      return _hasOwn.call(o, p);
    }
  
    function uniqueId(methodName) {
      return ('__u' + new Date().getTime() + Math.random()+"_"+methodName).replace(/\./, '');
    }
  
    w.jsBridge = new JSBridge();
  
    w.platform = {
      invoke: function(methodName, param, callback) {
      console.log('2 js invoke');
      if(jsBridge){
       var res= jsBridge.invoke('platform', methodName, param, callback);
     //console.log("22"+JSON.stringify(res)+" "+res);
      return res;
      }
  
      },
      on: function(eventName, param, callback) {
        jsBridge && jsBridge.on('platform', eventName, param, callback);
      },
      env: function(callback) {
        jsBridge && jsBridge.env('platform', callback);
      }
    };
  
    /*jsbridge ready*/
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('platformReady', false, false);
    document.dispatchEvent(evt);
  })(window);
  
  
   console.log('b2 injs');
