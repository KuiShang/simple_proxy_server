webpackJsonp([12],{AeIl:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Xxa5"),r=n.n(o),s=n("mvHQ"),a=n.n(s),i=n("exGp"),c=n.n(i),u=n("sMN7"),h=n("gvSL"),l=n("foCY"),m=n("JzG3"),d=n("gyMJ"),f=n("0Dnf"),p=n("UmZI"),v=n("Hds5"),b={name:"TransferThe1Account",components:{simpleCashier:h.a,feeConfirm:l.a,moneyInput:m.a},mixins:[p.a],data:function(){return{amount:"",cashierVisible:!1,feeConfirmVisible:!1,BUSI_SCENARIOS:f.b,TRANSFER_CHANNELS:f.h,ALL_BUSI_TYPE:f.a,number:"",customerObj:"",transactionNo:"",transOrderNo:"",showSuccesPhone:!1,remark:"",moneyFlag:!1,showContractEntry:!0,notRegistered:!1,notVerified:!1}},computed:{btnok:function(){return this.moneyFlag&&this.showSuccesPhone}},beforeRouteEnter:function(e,t,n){v.i(),n()},beforeRouteLeave:function(e,t,n){v.n(),n()},created:function(){var e=this;this.$SDK.setTitle({title:this.$t("toDolfinAccount"),mHeaderTitle:{showEnd:0,showBack:1}}),this.$SDK.onBackPress(function(){e.$router.push({name:"transfer"})}),"history"===this.$route.query.type&&(this.customerObj=JSON.parse(u.a.get("transfer_hisory_account")||""),this.$nextTick(function(){e.$refs.commonInput.currentValue=String(JSON.parse(u.a.get("transfer_hisory_account")||"").phone)}),this.showSuccesPhone=!0)},methods:{handleClick:function(){console.log("click"),this.confirm()},confirm:function(){var e=this;return c()(r.a.mark(function t(){var n,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.k)({version:e.$DeviceInfo.appVersion,recipientAccountNo:e.customerObj.customerId,amount:e.amount,currency:"THB",deviceMsg:a()(e.$DeviceInfo),busiType:f.i.NORMAL,transferChannel:f.h.ONT_FIN,remark:e.remark});case 2:1===(n=t.sent).data.resultCode?(e.transactionNo=n.data.resultData.transactionNo,e.transOrderNo=n.data.resultData.transOrderNo,e.cashierVisible=!0,v.r()):0===n.data.resultCode&&(o={code:n.data.errorData&&n.data.errorData.code||"",msg:n.data.errorData&&n.data.errorData.msg||""},v.r(o),e.hasPayError(n));case 4:case"end":return t.stop()}},t,e)}))()},gotoPhoneList:function(){var e=this;return c()(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("gotoPhoneList"),v.h(),t.next=4,e.$SDK.goNativeCustomContact();case 4:if(n=t.sent,console.log(n),0!==n.status){t.next=9;break}return console.log("未选择任何联系人"),t.abrupt("return");case 9:e.customerObj="",String(n.outData.phone).length>10?e.$refs.commonInput.currentValue=String(n.outData.phone).substring(0,10):e.$refs.commonInput.currentValue=n.outData.phone,e.notRegistered=!1,e.notVerified=!1,e.phoneblur();case 14:case"end":return t.stop()}},t,e)}))()},chooseNum:function(e){var t=this;return c()(r.a.mark(function n(){var o;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log(e),!(e.length<9)){n.next=3;break}return n.abrupt("return");case 3:return n.next=5,Object(d.s)({version:t.$DeviceInfo.appVersion,phone:e});case 5:1===(o=n.sent).data.resultCode?(t.customerObj=o.data.resultData,t.showSuccesPhone=!0):o.data.errorData.code===f.g.NOT_VERIFIED?(t.customerObj="",t.notVerified=!0,t.showSuccesPhone=!1):o.data.errorData.code===f.g.CUSTOMER_NO_EXIT?(t.customerObj="",t.notRegistered=!0,t.showSuccesPhone=!1):o.data.errorData.code===f.g.NOT_LOGIN?t.$SDK.goNativeAction(o.data.actionData):t.hasPayError(o);case 7:case"end":return n.stop()}},n,t)}))()},showCommonInput:function(){var e=this;this.customerObj="",this.notRegistered=!1,this.notVerified=!1,console.log(this.$refs.commonInput.$el.querySelector("input")),this.$nextTick(function(){e.$refs.commonInput.$el.querySelector("input").focus()})},paynow:function(){this.$router.push({name:"transferTh1Result",query:{transOrderNo:this.transOrderNo,transactionNo:this.transactionNo}})},phoneblur:function(){var e=this;console.log("blur"),this.showSuccesPhone=!1,this.$nextTick(function(){e.chooseNum(e.number),e.showContractEntry=!0})},receiveNotes:function(e){this.remark=e},receiveMoneyFlag:function(e){this.moneyFlag=e},inputFocus:function(){this.showContractEntry=!1},querySearch:function(e,t){var n=this;return c()(r.a.mark(function o(){var s;return r.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(!(e.length>2)){o.next=8;break}return o.next=3,n.$SDK.getPhonesByNumber(e);case 3:s=o.sent,console.log("phonelist:",s),t(s),o.next=9;break;case 8:t([]);case 9:case"end":return o.stop()}},o,n)}))()},handlePhoneClear:function(){this.notRegistered=!1,this.notVerified=!1}},watch:{cashierVisible:function(e){0==e?v.i():v.n()}}},g={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"blance-transfer-the1"},[o("div",{staticClass:"padtop"}),e._v(" "),o("div",{staticClass:"input-wraper"},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.customerObj,expression:"customerObj"}],staticClass:"phone-result-wrapper",on:{click:e.showCommonInput}},[o("p",{staticClass:"tit"},[e._v(e._s(this.$t("TransfertoPhoneNumber")))]),e._v(" "),o("div",{staticClass:"phone"},[o("span",[e._v(e._s(e.customerObj.phone)+" ")]),e._v(" "),o("span",{staticClass:"gray"},[e._v("/ ")]),e._v(" "),o("img",{staticClass:"img",attrs:{src:e.customerObj.iconUrl,alt:""}}),e._v(" "),o("span",{staticClass:"gray"},[e._v(" "+e._s(e.customerObj.customerName))])])]),e._v(" "),o("common-input",{directives:[{name:"show",rawName:"v-show",value:!e.customerObj,expression:"!customerObj"}],ref:"commonInput",attrs:{border:!1,maxlength:10,"show-suggest":!0,"style-obj":{right:".4rem"},"fetch-suggestions":e.querySearch,type:"tel",holder:this.$t("TransfertoPhoneNumber")},on:{blur:e.phoneblur,focus:e.inputFocus,chooseItem:e.chooseNum,handleClear:e.handlePhoneClear},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}}),e._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:e.showContractEntry,expression:"showContractEntry"}],staticClass:"custom-ico",attrs:{src:n("QsSU")},on:{click:e.gotoPhoneList}}),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.notRegistered,expression:"notRegistered"}],staticClass:"phone-result-wrapper2",on:{click:e.showCommonInput}},[o("span",{staticClass:"not-registed"},[e._v(e._s(this.$t("NoDolfinAccount")))])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.notVerified,expression:"notVerified"}],staticClass:"phone-result-wrapper2",on:{click:e.showCommonInput}},[o("span",{staticClass:"not-registed"},[e._v(e._s(this.$t("accountNotVerified")))])])],1),e._v(" "),o("moneyInput",{attrs:{"notes-entry":!0,"transfer-channel":e.TRANSFER_CHANNELS.ONT_FIN,"busi-scenarios":e.BUSI_SCENARIOS.TRANSFER},on:{addNotes:e.receiveNotes,moneyFlag:e.receiveMoneyFlag},model:{value:e.amount,callback:function(t){e.amount=t},expression:"amount"}}),e._v(" "),o("div",{staticClass:"btn-wraper"},[o("common-button",{attrs:{disabled:!e.btnok,type:"danger"},nativeOn:{click:function(t){return e.handleClick(t)}}},[e._v(e._s(this.$t("transfer")))])],1),e._v(" "),e.cashierVisible?o("simpleCashier",{attrs:{"cashier-visible":e.cashierVisible,"current-busi-type":e.ALL_BUSI_TYPE.TRANSFER_TH1,"transaction-no":e.transactionNo,"trans-order-no":e.transOrderNo},on:{"update:cashierVisible":function(t){e.cashierVisible=t},paynow:e.paynow}}):e._e()],1)},staticRenderFns:[]};var A=n("VU/8")(b,g,!1,function(e){n("ofve")},"data-v-b8dfd5f6",null);t.default=A.exports},QsSU:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAACXVJREFUeAHtXHtsFEUYn9lewaCCiIligkqiRKMmPlCIMZqWVhSF+kBDjxaMBgg+wsMYY9QIxkeID/QPNWKMtqVXY1QEglqK1PiHQfGVGGMwGiMkrRhoTfFRetcdf9+2a+/andnZ27m7Fmabze5+3zff43dzM998Oz3G7GERsAhYBCwCFgGLgEXAImARsAhYBCwCFgGLgEXAImARsAhYBI5rBLip6BtTrZWM8dWCidmc8dOEEMZ0m/Ixjh7OuUBshxDbHsbEi0uSc3dH0RcbjO3bv5rQdaTrBShafqyBKwNyAHS26dSTT107f/7Mf2Ry2fRE9kM+9909hzei3XKRT+Mx2mawQ61A7NRRV+iEEatHNza3zRXM/VjH0LEqw5lz/ZLF1a1h8TlhAko+d1cr+ccDUxODeEALfsXxgKUyRk0MYgGNWXiK0onjgKmLQezJUIYlZuZvMWlsk/HHEh2xLEAsl8bxuWBAI9f8duniueviODda2mKNMA2+xAI61tAxWoAYC34UsEebDb+9vT1xoLPvGsH4AuSkl0D7VJxnDlrpwLUTufx3nIlt06aO+6yioiIzyBsVl1EP9OYP90x0u488uL8jfR8QOwVDEv5GHDNAofNa8FYd6OjrRo7/sjP55Gfr5s3uGSFdAoIS6IaWtku5cDcgslkIYGKOf5wdDYo4RybmQ0Oq9R63u+cJ3ZndNwdfJzPmPoq2K5ua2x6rX1z9qs8r1VUK9CDIe1BJGRfonGDjA+kGiBgmTtjfmX6dCVEX2H81bdAHhPOVhtTOq86aWr4Mw0mvZlPjYtLJkHqyFGTjbgwpbGxtPfFAZ/pTAnmIGvMOukgn6Y6pKe/mUqBR5Sz6qg+5qsMOsWZcZ+UdkaShp3NAtzRmSVMjZKlRztkfRixEUNKU2rUe42tNhCaRREk32YjUyJCwAmieMmRDS03TO+3nYjx9SEcY6V034/xdrNiep9O7J5rGQTbIloaoURHpZHjBeZOf/uGnroswVi40alGizM2kn0HqVi5hD5A578A37ZFpZ5RvHp4ne3n27+k6zCtPwWc/vw5QJ8oHbLHbA5gFI0mBnjlzZhpWb29q+eQqwTKzhMsmZXvBudMrhAtw4h/Uw9x0n/IDRc/9IsGcmmRt1cEgi4PAv5VK7foow92tynEenYds1t9R8XOQrkLQpED7xupr53yOezpHHA3NrUaAZv2Zm0cozyLgPd2v4gTnxuStVYezyIG3yWTVwYb3d93I/3X3YpiYHihExAGbz0n5hhnSMdqwHaU6fDNuUQpwsWqpBsi+Dk8WbfznoGuozaBGMWijA2jGLpfFgCHjJ7xx3i7jy+jUhtrK+MhApDZlbeLQSw40vuZTsJSXrjIByEf5BqhsC5ue7XyVR2xXcqDLMqoMgTFHsF8jxvS/eFjbMNv/KzJwU3KgDcQwJlSUHOj+BO9QIeVyJs8cVA3BC2sbZjtEfSS2Mr0rRpmUMgSUQ6nkGjhOYxV4AyLKd1vDPCkaKPNGyWSkejQZ0h6dVSatxqSSW4sm5RJgNO3miAHMr3MIWQ9YeMzAO7v5WSStW6+NEOfJhFU2ZW3i0KVAF7NMilXmFmUQgr8UJUMYyGT4SyqdoTZVjfPgSYHGztAr89CXX5OyxAeqhrTC473uDiyvT1fJEY9kSFa5KoRcediHG2YoIl8BNAusKUTUryXu1RxQjVMJU+0izdxvGlt23kkFpOGyRCMeySjrHNQQthYtmvPLcB2FfB7hsG8Mq6oUHF7nPxf66iTKH3bT6RplBQ9VOVTn3sTL1xfweuoTjLO/kV+YQ84GbQ6ueFcYdvA02QqTMs2X9mgqk9Inb9qgTB/1ahSPNsj42XQPUFTg0BEeoJNKuXogozPDRjGrdr7f0h5dzDKp70x9surxptTOiwEaerb5A9+ArWRjyWLzusM0SoH2GxalTDpoDMOV29y8a22G9VeDNMH3wdD1nzJWtpZsGNIXSU0o0JG0xRBuadl5ZlqIBzOifznUmAaZPJuAD/B75Nebyjl/trb2OuWKNEYogU1LDnTTe59NZUePPton3LtNLoICowXYmExX9zGxsinV9gYbP/7J+tuu6ZTIGiVLJ0OjViTK8Eb6ZtHb+70r3HuKAPKQF1jVkk2yTT4MMQp3V5Ie7f8nlyv6VxQutHDNWNRMEaJ/C1LF16L8h1W45pESRe/RqVT7+V1HDn+NlCwOyC7ytC6cvwyeXQgt/0kOvpBP5NtIiMxQitqjG99uuyDjptsxTIQupXPD4985nLchYfiSj0vsTd5auR/ZA7LAoQP5tJN6f/c00Ze5ArdXukIgcxGXDEmE3Al2foZj29jbbRVLFlX/GCIdma0E2mSZlEBmrmgHIFogY2FxmHHxeoKVb04mK3/IjiwoDR5M22ilSKe30Eqldl+YYek6JvgyGiaydQTdk29I/toLAbZ06DBZJo0CMhYVPY7jrJt00oTpeMH68HCQgwCS0agt6SBdpJN0y2R9utcR0CE8n32igasUaFNlUtpIzvrFDp2ejF65I8HLZtTXVq+vqbn6iIH4PBWki3SSbrIRptfzFT57vocJa/KlQ8fAbtKcYVBTZa5Y/589L2OsnJ5LHfaEtx2OcNbUJwu7YZw218DyTdicvtLl7kZVSkll1gHfWf0wb/N6lPdoA7tJG1vaksgulPuc0cP+wld6XjF35ZMtskm2lajBdy8GpZAeUwF03N2k/ByA/IrKDQTbjbGzEuNopJ9kUOnU5ZFNsk0+KNt4MfBzlDIaTCnQccukGOcqcU6S+YDelEEOvLBuUdVemUyh6Z5t+OD5IjFGMVAsErY2GR+o+ijYblLO7l2anKvs8WrPzHHpn5IwXmMuye/AP66G4hgqoDKN3aT5zZacb1uavK4gNWeVvyoeluFbMdQtUMnIeDpAS4cOmdK4dCxE/uYJfn9cPabbk0/km2m9vj5peucLmL+KfSIt7sK3wbzqGBpFmsonbB9UXBZDjbRp0YHGWEOBFCQYaZSajPzGQT3lsYYOrx6hZ+eYldLFIBbQKPqULDUbNZ+cJgbxgBbOi6Mm4FI5oolBLKDp17EwgWwqVYyltkux6/xCGPkZC2hSMHnilDXYaPMaVleFnEvI1Kg5vFgRsxe7plexFizZNvAavxKrqzX4ocxZmCCO3Z/MFOwL5IEbS1Gfycbb3lsELAIWAYuARcAiYBGwCFgELAIWAYuARcAiYBGwCFgELAIWgTGGwH94jKPL/E4HiwAAAABJRU5ErkJggg=="},ofve:function(e,t){}});