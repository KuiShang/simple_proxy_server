webpackJsonp([21],{"13vT":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Xxa5"),n=s.n(a),i=s("exGp"),r=s.n(i),o=s("Du/2"),c={name:"BillCompany",data:function(){return{showDelete:!1,number:"",historyList:[]}},created:function(){var t=this;setTimeout(function(){t.$store.commit(o.d,"The Metropolitan Electricty"),t.$store.commit(o.c,!0)},10),this.setTitle(),this.initData()},methods:{setTitle:function(){},initData:function(){var t=this;return r()(n.a.mark(function e(){var s,a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/th/wallet/billpayment/queryKeyInHistory",{params:{version:t.$DeviceInfo.appVersion,customerId:t.customerId}});case 2:if("000000"===(s=e.sent).data.code){e.next=6;break}return console.log("error"),e.abrupt("return");case 6:a=s.data.data,Array.isArray(a)?t.historyList=a:console.error(a+" is not array");case 8:case"end":return e.stop()}},e,t)}))()},handleClick:function(){this.$router.push({name:"billDetail",query:{transactionNo:this.number}})},removeHisory:function(t){console.log(t)}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bill-keyin-wrapper"},[s("div",{staticClass:"post"},[s("span",{staticClass:"img"}),t._v(" "),s("span",{staticClass:"des",domProps:{textContent:t._s(t.$route.params.companyname)}}),t._v(" "),s("span",{staticClass:"line"})]),t._v(" "),s("div",{staticClass:"content"},[s("p",{staticClass:"label"},[t._v("CA/Refence Number")]),t._v(" "),s("common-field",{attrs:{type:"number",label:"",placeholder:"Enter reference number"},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}}),t._v(" "),s("p",{staticClass:"tips"},[t._v("Your contract account number will be auto-saved for future pay-ment")]),t._v(" "),s("div",{staticClass:"btn-wraper"},[s("common-button",{attrs:{type:"danger"},nativeOn:{click:function(e){return t.handleClick(e)}}},[t._v("Next")])],1),t._v(" "),s("div",{staticClass:"hisory-record"},[s("div",{staticClass:"title"},[s("span",{staticClass:"text"},[t._v("Hisory record")]),t._v(" "),s("i",{staticClass:"del",on:{click:function(e){t.showDelete=!t.showDelete}}})]),t._v(" "),s("ul",{staticClass:"records"},[s("li",{staticClass:"item"},[s("span",[t._v("45351874999 Jack")]),t._v(" "),s("common-icon",{directives:[{name:"show",rawName:"v-show",value:t.showDelete,expression:"showDelete"}],staticClass:"custom-ico",attrs:{name:"delete_fill",size:".9rem"},on:{click:function(e){t.removeHisory(1)}}})],1),t._v(" "),s("li",{staticClass:"item"},[t._v("\n          45351874999 Jack\n        ")]),t._v(" "),s("li",{staticClass:"item"},[t._v("\n          45351874999 Jack\n        ")])])])],1)])},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("x45B")},"data-v-eaa280e6",null);e.default=u.exports},x45B:function(t,e){}});