/*健走有礼 @leaf

cron 59 10,20 * * * https://raw.githubusercontent.com/leafTheFish/DeathNote/main/jzyl.js

脚本库：https://github.com/leafTheFish/DeathNote/



[脚本说明]
微信小程序：健走有礼，存步数换现金提现，10W金币=1元

一天一两次即可，理论上跑一次就能完成任务

作者原本定时是 47 8,20 ；兑换的时候我发现是11点补货，那我们就10点59运行，正好可以卡11点


[青龙变量]

先注册，再打开重写重新进入小程序抓包

bwa.feierlaiedu.com的任意包，把header里的token值填到jzylCookie里，多账号换行或者@隔开

#健走有礼
export jzylCookie="token值"



[圈X重写]

[task_local]
#健走有礼
59 10,20 * * * https://raw.githubusercontent.com/leafTheFish/DeathNote/main/jzyl.js, tag=健走有礼, enabled=true

[MITM]
hostname = bwa.feierlaiedu.com
[rewrite_local]
https://bwa.feierlaiedu.com/api/v1/bbg/taskRecord/queryUserInfo url script-request-header https://raw.githubusercontent.com/leafTheFish/DeathNote/main/jzyl.js


*/
const $ = new Env("健走有礼");

//var CryptoJS = require("crypto-js");
//var fs = require("fs");
//fs.unlinkSync(__filename);

let envSplitor = ['\n','@']
let httpResult, httpReq, httpResp

let userCookie = ($.isNode() ? process.env.jzylCookie : $.getdata('jzylCookie')) || '';
let userList = []

let userIdx = 0
let userCount = 0

let extraTask = [
    //{taskType:0,name:"领取昨日步数"},
    {taskType:1,name:"添加小程序"},
    //{taskType:2,name:"完成微信授权"},
    //{taskType:3,name:"完成登录(绑定手机)"},
    
    //今天奖励：3次
    {taskType:10,name:"领取今日奖励"},
    {taskType:10,name:"领取今日奖励"},
    {taskType:10,name:"领取今日奖励"},
    
    //分享：3次
    {taskType:14,name:"分享视频"},
    {taskType:14,name:"分享视频"},
    {taskType:14,name:"分享视频"},
]
let extraStepTask = [
    //{taskType:4,name:"步数任务4"},
    //{taskType:5,name:"步数任务5"},
    {taskType:6,name:"邀请好友"},
    //{taskType:13,name:"步数任务13"},
]

let salt = 'nx351xq5cmy6lclm3gg0zoowhfd9uf5eo6is'
let UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN'
let miniAppVer = 'v2.4.5'
let fromType = '402'
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx
        this.name = this.index
        this.valid = false
        
        this.token = str
        this.hasFinishVideo = false
    }
    
    async getUserName() {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/customer/get`
            let body = ``
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                this.name = result.data.wechatName
                this.phone = result.data.phone
                this.valid = true
                console.log(`登录成功`)
                console.log(`昵称：${this.name}`)
            } else {
                console.log(`登录失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async queryUserInfo(isNotify=false) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/taskRecord/queryUserInfo`
            let body = ``
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                this.step = result.data.myStep
                if(isNotify) {
                    $.logAndNotify(`--------------- 账号[${this.index}] ---------------`)
                    $.logAndNotify(`昵称：${this.name}`)
                    $.logAndNotify(`步数：${this.step}`)
                } else {
                    console.log(`步数：${this.step}`)
                    if(!result.data.hasPhoneAuth) {
                        let task = {taskType:3,name:"完成登录(绑定手机)"}
                        await this.triggerTask(task)
                    }
                    if(result.data.yesterdayStatus==1) {
                        await this.getRewardKey()
                    }
                    /*
                    for(let item of result.data.unTriggerTaskList) {
                        if(item.status==0 || item.status) {
                            let task = {taskType:item.taskType, name:item.taskTypeName}
                            await this.triggerTask(task)
                        }
                    }
                    */
                }
            } else {
                console.log(`查询步数失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async queryNowVideoInfo() {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/videoInfo/queryNowVideoInfo`
            let body = ``
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                for(let video of result.data) {
                    if(video.isWatch == false) {
                        await this.startWatchVideo2(video)
                    }
                    if(this.hasFinishVideo) break;
                }
            } else {
                console.log(`账号[${this.name}]获取视频失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async startWatchVideo2(video) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/videoWatchRecord/startWatchVideo2`
            let body = `{"videoId":"${video.id}"}`
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                console.log(`账号[${this.name}]开始看视频，需观看${video.watchDuration}秒: ${video.desc}`)
                await $.wait(video.watchDuration*1000+500)
                await this.rewardWatchVideo(video,result.data)
            } else {
                console.log(`账号[${this.name}]看视频失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async rewardWatchVideo(video,watchId) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/videoRecord/trigger`
            let body = `{"taskType":12,"videoId":"${video.id}","watchId":"${watchId}"}`
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                console.log(`账号[${this.name}]看视频获得${result.data}步`)
                if(result.data == 0) this.hasFinishVideo = true
            } else {
                console.log(`账号[${this.name}]领取看视频奖励失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async getRewardKey() {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/videoInfo/getRewardKey`
            let body = `{"adUnitId":"adunit-1fec859de2a1ce12"}`
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                await this.triggerTask({taskType:0,name:"领取昨日步数"},result.data)
            } else {
                console.log(`获取视频rewardKey失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async triggerTask(task,randomId='') {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/taskRecord/triggerTask`
            let param = {"taskType":parseInt(task.taskType)}
            if(randomId) param.randomId = randomId
            let body = JSON.stringify(param)
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                if(result.data>0) console.log(`领取任务[${task.name}]奖励获得${result.data}步`)
            } else {
                console.log(`领取任务[${task.name}]奖励失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async receiveStepReward(task) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/taskRecord/receiveStepReward`
            let param = {"taskType":parseInt(task.taskType)}
            let body = JSON.stringify(param)
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                if(result.data>0) console.log(`领取步数任务[${task.name}]奖励获得${result.data}步`)
            } else {
                console.log(`领取步数任务[${task.name}]奖励失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async getInviteRecord(pageNo=1) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/redPacketRecord/record`
            let body = `{"pageNo":${pageNo},"pageSize":100}`
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                for(let item of result.data.dataList.sort(function(a,b) {return b.amount-a.amount})) {
                    if(item.status == 0) {
                        item.amount = item.amount/100
                        await this.withdraw(item)
                    }
                }
                if(result.data.length >= 100) {
                    await this.getInviteRecord(pageNo+1)
                }
            } else {
                console.log(`获取邀请提现列表失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async getExchangeList() {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/index/exchangeList`
            let body = ``
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                for(let item of result.data) {
                    if(item.status == false && this.step >= item.step) {
                        await this.withdraw(item)
                    }
                }
            } else {
                console.log(`获取提现列表失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async withdraw(item) {
        try {
            let url = `https://bwa.feierlaiedu.com/api/v1/bbg/common/withdraw`
            let param = {
                "type": item.type,
                "amount": item.amount,
                "amountId": item.amountId,
                "watchVideoToken": "",
                "randomId": "",
            }
            if(item.type == 3) {
                param = {
                    "type": item.type,
                    "recordId": item.id,
                }
            }
            let body = JSON.stringify(param)
            let urlObject = populateUrlObject(url,this.token,body)
            urlObject = genSign(urlObject)
            await httpRequest('post',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.code==0) {
                $.logAndNotify(`账号[${this.name}]提现[${item.amount}元]成功`)
            } else {
                console.log(`提现[${item.amount}元]失败: ${result.message}`)
            }
        } catch(e) {
            console.log(e)
        } finally {}
    }
    
    async userTask() {
        console.log(`\n--------------- 账号[${this.index}] ---------------`)
        await this.getUserName();
        if(!this.valid) return;
        await this.queryUserInfo();
        for(let task of extraTask) {
            await this.triggerTask(task)
        }
        for(let task of extraStepTask) {
            await this.receiveStepReward(task)
        }
    }
    
    async userWithdrawTask() {
        await this.queryUserInfo(true);
        await this.getInviteRecord();
        await this.getExchangeList();
    }
}

!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite()
    }else {
        //let nowtime = $.time('yyyy-MM-dd hh:mm:ss');
        //console.log(nowtime);
        
        if(!(await checkEnv())) return;
        
        for(let user of userList) {
            await user.userTask(); 
        }
        
        let validUserList = userList.filter(x => x.valid)
        if(validUserList.length == 0) return;
        
        console.log(`\n=============== 开始看视频 ===============`)
        let taskall = []
        for(let user of validUserList) {
            taskall.push(user.queryNowVideoInfo())
        }
        await Promise.all(taskall)
        console.log(`=============== 结束看视频 ===============`)
        
        console.log(`\n=============== 账户步数 ===============`)
        for(let user of validUserList) {
            await user.userWithdrawTask();
        }
        
        await $.showmsg();
    }
})()
.catch((e) => console.log(e))
.finally(() => $.done())

///////////////////////////////////////////////////////////////////
async function GetRewrite() {
    if($request.url.indexOf(`api/v1/bbg/taskRecord/queryUserInfo`) > -1) {
        let ck = $request.headers.token
        
        if(userCookie) {
            if(userCookie.indexOf(ck) == -1) {
                userCookie = userCookie + '\n' + ck
                $.setdata(userCookie, 'jzylCookie');
                ckList = userCookie.split('\n')
                $.msg(`获取第${ckList.length}个ck成功: ${ck}`)
            }
        } else {
            $.setdata(ck, 'jzylCookie');
            $.msg(`获取第1个ck成功: ${ck}`)
        }
    }
}

async function checkEnv() {
    if(userCookie) {
        let splitor = envSplitor[0];
        for(let sp of envSplitor) {
            if(userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for(let userCookies of userCookie.split(splitor)) {
            if(userCookies) userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
        console.log('未找到CK')
        return;
    }
    
    console.log(`共找到${userCount}个账号`)
    return true
}

////////////////////////////////////////////////////////////////////
function genSign(urlObject) {
    try {
        let timestamp = Math.floor(Date.now()/1000)
        let base64time = Base64.encode(timestamp.toString())
        let token = urlObject.headers.token
        let dataStr = ""
        if(urlObject.body) {
            let param = JSON.parse(urlObject.body)
            for(let keys of Object.keys(param).sort()) {
                dataStr += (keys+param[keys])
            }
        }
        let sign = MD5Encrypt(base64time+token+salt+dataStr)
        urlObject.headers.signature = sign
        urlObject.headers.timestamp = timestamp
    } catch(e) {
        console.log(e)
    } finally {
        return urlObject
    }
}

function populateUrlObject(url,token,body=''){
    let host = url.replace('//','/').split('/')[1]
    let urlObject = {
        url: url,
        headers: {
            'Host': host,
            'Connection': 'keep-alive',
            'token': token,
            'miniAppVer': miniAppVer,
            'fromType': fromType,
            'User-Agent': UA,
            'Referer': 'https://servicewechat.com/wx1d6a6ba2539f97cc/6/page-frame.html'
        },
        timeout: 5000,
    }
    if(body) {
        urlObject.body = body
        urlObject.headers['Content-Type'] =  'application/json; charset=UTF-8'
        urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
    }
    return urlObject;
}

async function httpRequest(method,url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if(resp.body) {
                        if(typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) {
                                httpResult = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}

////////////////////////////////////////////////////////////////////
//AES/DES加解密，CryptoJS
function EncryptCrypto(method,mode,padding,message,key,iv) {
    return CryptoJS[method].encrypt(
        CryptoJS.enc.Utf8.parse(message), 
        CryptoJS.enc.Utf8.parse(key), 
        {mode:CryptoJS.mode[mode], padding:CryptoJS.pad[padding], iv:CryptoJS.enc.Utf8.parse(iv)}
    ).ciphertext.toString(CryptoJS.enc.Base64);
}
function DecryptCrypto(method,mode,padding,message,key,iv) {
    return CryptoJS[method].decrypt(
        {ciphertext: CryptoJS.enc.Base64.parse(message)}, 
        CryptoJS.enc.Utf8.parse(key), 
        {mode:CryptoJS.mode[mode], padding:CryptoJS.pad[padding], iv:CryptoJS.enc.Utf8.parse(iv)}
    ).toString(CryptoJS.enc.Utf8);
}
//Base64加解密
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
//MD5
function MD5Encrypt(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}
//SHA1
function SHA1Encrypt(msg){function add(x,y){return((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000);}function SHA1hex(num){var sHEXChars="0123456789abcdef";var str="";for(var j=7;j>=0;j--)str+=sHEXChars.charAt((num>>(j*4))&0x0F);return str;}function AlignSHA1(sIn){var nblk=((sIn.length+8)>>6)+1,blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(i=0;i<sIn.length;i++)blks[i>>2]|=sIn.charCodeAt(i)<<(24-(i&3)*8);blks[i>>2]|=0x80<<(24-(i&3)*8);blks[nblk*16-1]=sIn.length*8;return blks;}function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function ft(t,b,c,d){if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}function kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}var x=AlignSHA1(msg);var w=new Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);t=add(add(rol(a,5),ft(j,b,c,d)),add(add(e,w[j]),kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}a=add(a,olda);b=add(b,oldb);c=add(c,oldc);d=add(d,oldd);e=add(e,olde);}SHA1Value=SHA1hex(a)+SHA1hex(b)+SHA1hex(c)+SHA1hex(d)+SHA1hex(e);return SHA1Value;}
////////////////////////////////////////////////////////////////////
function Env(name,env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name,env) {
            this.name = name
            this.notifyStr = ''
            this.startTime = (new Date).getTime()
            Object.assign(this,env)
            console.log(`${this.name} 开始运行：\n`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                o = this.getval(i),
                h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                    s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                    s = this.setval(JSON.stringify(o), i)
                }
            }
            else
                s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        send(m, t, e = (() => {})) {
            if(m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if(m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if(t.body && t.headers) {
                if(!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if(this.isSurge() || this.isLoon()) {
                if(this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1});
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if(m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                        hints: !1
                    })),
                $task.fetch(t).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "h+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        async showmsg() {
            if(!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
            if($.isNode()){
                var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }
        logAndNotify(str) {
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                 : this.isSurge() ? {
                    url: t
                }
                 : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                        s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                        s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
            s && h.push(s),
            i && h.push(i),
            console.log(h.join("\n"))
        }
        getMin(a,b){
            return ((a<b) ? a : b)
        }
        getMax(a,b){
            return ((a<b) ? b : a)
        }
        padStr(num,length,padding='0') {
            let numStr = String(num)
            let numPad = (length>numStr.length) ? (length-numStr.length) : 0
            let retStr = ''
            for(let i=0; i<numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr;
        }
        json2str(obj,c,encodeUrl=false) {
            let ret = []
            for(let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if(v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys+'='+v)
            }
            return ret.join(c);
        }
        str2json(str,decodeUrl=false) {
            let ret = {}
            for(let item of str.split('&')) {
                if(!item) continue;
                let idx = item.indexOf('=')
                if(idx == -1) continue;
                let k = item.substr(0,idx)
                let v = item.substr(idx+1)
                if(decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret;
        }
        randomString(len,charset='abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random()*charset.length));
            }
            return str;
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
            s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
            if(this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name,env)
}
