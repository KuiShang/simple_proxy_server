webpackJsonp([16],{P1xU:function(t,e){},fXiC:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("mvHQ"),s=n.n(a),o=n("Xxa5"),r=n.n(o),i=n("exGp"),c=n.n(i),u=n("Dd8w"),l=n.n(u),m=n("sMN7"),h=n("gvSL"),f=n("NYxO"),d=n("0Dnf"),A=n("gyMJ"),v=n("JzG3"),b=n("UmZI"),p=n("lxZ4"),C=n("Hds5"),k={name:"TransferBankAccount",components:{moneyInput:v.a,simpleCashier:h.a,toast:p.a},mixins:[b.a],data:function(){return{showDialog:!1,showContractEntry:!0,amount:"",isChoosing:!1,BUSI_SCENARIOS:d.b,ALL_BUSI_TYPE:d.a,TRANSFER_CHANNELS:d.h,fee:"",moneyFlag:!1,number:"",cashierVisible:!1,transactionNo:"",transOrderNo:"",isActive:!1,cardId:"",accountNo:"",accountName:"",bankIconUrl:""}},computed:l()({btnok:{get:function(){return"history"===this.$route.query.type?this.moneyFlag:this.moneyFlag&&10==this.number.length&&""!==this.bankCode}}},Object(f.b)(["bankCode","bankLogo","bankName"])),beforeRouteEnter:function(t,e,n){C.J(),n()},beforeRouteLeave:function(t,e,n){C.N(),n()},created:function(){var t=this;return c()(r.a.mark(function e(){var n,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("进入bankacount"),t.$SDK.setTitle({title:t.$t("toBankAcount"),mHeaderTitle:{showEnd:0,showBack:1}}),t.$SDK.onBackPress(function(){t.$router.push({name:"transfer"})}),"new"===t.$route.query.type?(m.a.remove("number"),m.a.remove("amount")):"history"===t.$route.query.type?(n=JSON.parse(m.a.get("transfer_hisory_account")),t.accountNo=n.accountNo,t.accountName=n.accountName,t.bankIconUrl=n.bankIconUrl,t.cardId=n.cardId):"bankList"===t.$route.query.refer&&m.a.get("number")&&(t.isActive=!0,t.$nextTick(function(){t.$refs.commonInput.currentValue=m.a.get("number")||""})),!sessionStorage.getItem("bankAcountFee")){e.next=9;break}t.fee=sessionStorage.getItem("bankAcountFee"),console.log(t.fee),e.next=13;break;case 9:return e.next=11,Object(A.B)({busiScenarios:d.b.TRANSFER,transferChannel:d.h.BANK_ACOUNT});case 11:1===(a=e.sent).data.resultCode?(sessionStorage.setItem("bankAcountFee",a.data.resultData.fee),t.fee=a.data.resultData.fee):0===a.data.resultCode&&t.hasPayError(a);case 13:case"end":return e.stop()}},e,t)}))()},methods:l()({},Object(f.c)({}),{cancle:function(){this.showDialog=!1},closeDialog:function(){this.showDialog=!1,this.init()},phoneblur:function(){this.showContractEntry=!0},inputFocus:function(){C.H(),this.showContractEntry=!1},handlePhoneClear:function(){},reChoose:function(){},handleClick:function(){0==this.fee?this.init():this.showDialog=!0},init:function(){var t=this;return c()(r.a.mark(function e(){var n,a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.k)({amount:t.amount,fee:t.fee,currency:"THB",deviceMsg:s()(t.$DeviceInfo),transferChannel:d.h.BANK_ACOUNT,bankAccount:t.number,bankName:"history"===t.$route.query.type?t.accountName:t.bankName,cardId:t.cardId,busiType:d.i.NORMAL});case 2:1===(n=e.sent).data.resultCode?(t.transactionNo=n.data.resultData.transactionNo,t.transOrderNo=n.data.resultData.transOrderNo,t.cashierVisible=!0,C.S()):0===n.data.resultCode&&(a={code:n.data.errorData&&n.data.errorData.code||"",msg:n.data.errorData&&n.data.errorData.msg||""},C.S(a),t.hasPayError(n));case 4:case"end":return e.stop()}},e,t)}))()},paynow:function(){console.log("pay now"),this.$router.push({name:"transferTh1Result",query:{transOrderNo:this.transOrderNo,transactionNo:this.transactionNo}})},phoneInput:function(){m.a.set("number",this.number)},inputMoney:function(){m.a.set("amount",this.amount)},receiveMoneyFlag:function(t){this.moneyFlag=t},chooseBank:function(){C.I(),this.$router.push({name:"chooseBank"})},moneyLimitOk:function(){"bankList"===this.$route.query.refer&&(this.$refs.moneyInput.amount=m.a.get("amount")||"")},getReceiver:function(){C.O(),this.$router.push({name:"chooseReceiver"})}}),watch:{cashierVisible:function(t){0==t?C.J():C.N()}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"transfer-tobank"},[a("div",{staticClass:"transfer-notice"},["en"==this._i18n.locale?[t._v("\n      Money transfered will be succeed within "),a("span",[t._v(" 1 ")]),t._v(" working day\n    ")]:[t._v("\n      การโอนเงินจะสำเร็จภายใน "),a("span",[t._v(" 1 ")]),t._v(" วันทำการ\n    ")]],2),t._v(" "),"history"==this.$route.query.type?a("div",{staticClass:"recent-transfer",on:{click:t.getReceiver}},[a("img",{staticClass:"bank-logo",attrs:{src:t.bankIconUrl,alt:""}}),t._v(" "),a("div",{staticClass:"content-wrapper",on:{click:t.reChoose}},[a("div",{staticClass:"bank-no"},[t._v("\n        "+t._s(t._f("fixStars")(t.accountNo))+"\n      ")]),t._v(" "),a("div",{staticClass:"bank-name"},[t._v("\n        "+t._s(t.accountName)+"\n      ")])]),t._v(" "),a("common-icon",{staticClass:"custom-ico",attrs:{name:"more",size:".4rem"}})],1):a("div",{staticClass:"transfer-info"},[a("div",{staticClass:"choose-account"},[a("common-input",{ref:"commonInput",staticClass:"phone-input",attrs:{border:!1,maxlength:10,"is-active":t.isActive,"show-suggest":!1,"style-obj":{right:0},type:"tel",holder:this.$t("AccountNumber")},on:{"update:isActive":function(e){t.isActive=e},blur:t.phoneblur,focus:t.inputFocus,handleClear:t.handlePhoneClear,input:t.phoneInput},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}}),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.showContractEntry,expression:"showContractEntry"}],staticClass:"custom-ico",attrs:{src:n("v+3d")},on:{click:t.getReceiver}})],1),t._v(" "),a("div",{staticClass:"choose-bank",class:{pd40:"bankList"==this.$route.query.refer,chooseColor:"bankList"==this.$route.query.refer},on:{click:t.chooseBank}},["bankList"==this.$route.query.refer?[a("img",{staticClass:"bank-icon",attrs:{src:t.bankLogo}}),t._v("\n        "+t._s(t.bankName)+"\n      ")]:[t._v("\n        "+t._s(this.$t("ChooseBank"))+"\n      ")],t._v(" "),a("common-icon",{staticClass:"custom-ico",attrs:{name:"more",size:".4rem"}})],2)]),t._v(" "),a("moneyInput",{ref:"moneyInput",attrs:{"notes-entry":!1,"transfer-channel":t.TRANSFER_CHANNELS.BANK_ACOUNT,"busi-scenarios":t.BUSI_SCENARIOS.TRANSFER,"has-fee":!0,fee:t.fee},on:{moneyFlag:t.receiveMoneyFlag,moneyLimitOk:t.moneyLimitOk,input:t.inputMoney},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),t._v(" "),a("div",{staticClass:"btn-wraper"},[a("common-button",{attrs:{disabled:!t.btnok,type:"danger"},nativeOn:{click:function(e){return t.handleClick(e)}}},[t._v(t._s(this.$t("transfer")))])],1),t._v(" "),t.cashierVisible?a("simpleCashier",{attrs:{"cashier-visible":t.cashierVisible,"current-busi-type":t.ALL_BUSI_TYPE.TRANSFER_BANKACCOUNT,"transaction-no":t.transactionNo,"trans-order-no":t.transOrderNo},on:{"update:cashierVisible":function(e){t.cashierVisible=e},paynow:t.paynow}}):t._e(),t._v(" "),t.showDialog?a("toast",{attrs:{"show-cancle":!0,"title-position":0},on:{cancle:t.cancle,closeDialog:t.closeDialog}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("p",{staticClass:"tit"},[t._v(t._s(this.$t("TransferAmount")))]),t._v(" "),a("p",{staticClass:"amount"},[a("span",[t._v("฿")]),t._v(t._s(t._f("thousandBitSeparator")(t._f("tofloat")(-(-t.amount-t.fee)))))]),t._v(" "),a("p",{staticClass:"text"},[t._v(t._s(this.$t("Receiverwillreceive"))+" "),a("span",[t._v("฿ "+t._s(t._f("thousandBitSeparator")(t._f("tofloat")(t.amount))))])]),t._v(" "),a("p",{staticClass:"text"},[t._v(t._s(this.$t("Servicefee"))+" "),a("span",[t._v("฿ "+t._s(t._f("thousandBitSeparator")(t._f("tofloat")(t.fee))))])])]),t._v(" "),a("p",{attrs:{slot:"cancle"},slot:"cancle"},[t._v(t._s(this.$t("CANCEL")))]),t._v(" "),a("p",{attrs:{slot:"confirm"},slot:"confirm"},[t._v(t._s(this.$t("OK")))])]):t._e()],1)},staticRenderFns:[]};var g=n("VU/8")(k,_,!1,function(t){n("P1xU")},"data-v-49e96608",null);e.default=g.exports},"v+3d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAvBJREFUeAHt3MFOFEEQgOHujScTTQSvPgSJBs8mZr3gA0iCN7iCT8ATAFe5SQIPABc3Jp41mvAigokmHmlrRo7dy1anqmnivzd6pqq7vu3sdGaYDoEPAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIICATiDqTl/s7KOT2YsQ4nYK6XkM8XFKyaWfxUZz81kxxiRj/SFj/RJCOth4M/18c5TuDFOAs7Pv9y9/X+5J0s3ecUtM/9DD4dKDpXdra0//lM7Ttt/TBsw7/+evi305vpnmndT5sesJsiW1DJNwy2q4ZjP66PjTNIWrj1YD6yFPDJNXG+svZxZjmVgkGXPEq22zXL0kMqzJDjrFZ734mI3DsCYzaLlqL5sV2Ekiy5pML4YlH7mSn8tF5rR0/DbbZWyvZWwr3mNoAi1r0/O369Nd72Jq8sua/4nEuUOb/XTUFPk/xQDd6NsGGuhGAo26YUYD3UigUTfMaKAbCTTqhhkNdCOBRt0wo4FuJNCom0Y3leZX8+F45vr0S25omT1Jml9J+Sg/HWUb0yNAm3KWkwFdtjE9ArQpZzkZ0GUb0yNdrDp6WBWYqmaSMaMzKB5NQHuoZnICnUHxaALaQzWTE+gMikdTF6sOq3sdPa9emNEe0zeTE+gMikcT0B6qmZxAZ1A8moD2UM3k7GLV0fNqIWNW1cSMrmLTBwGtN6uKALqKTR8EtN6sKgLoKjZ9ENB6s6oIoKvY9EFA682qIoCuYtMHAa03q4oAuopNHwS03qwqotFNpbgij6t2q0boHhTlPXDX/xoeK2gCfb17gPuL7TXfiYytJkwdY/bTITtsXah77zzAsiYz6BDTt87d9MMzrMkOOk0O9JV0HmFYkxn0sJuWvChy2DndwsMbarHaIWzo1Ax6SPbo4fJOiPH9sEnf8Pdd/IxjlxrGWgwLcHlbadwyM4Ud2Shz9U5tmZnC1xDDvseWmYbfGakQQAABBBBAAAEEEEAAAQQQQACBWxf4C7HffejK11rQAAAAAElFTkSuQmCC"}});