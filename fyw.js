/*
@肥皂 3.5 放羊娃

青龙抓取签到接口的全部请求体：
格式  变量名fywtoken  Authorization=xxxxxxxxxxxxx   Authorization的全部值
https://api.fywa.com.cn/ 接口链接。

3.29更新。加入有邀请的用户每天自动提取奖励(适合多号有徒弟的)
一天运行一次就行了。。。。。。。不用一天十次
提现金额自己更改脚本19行  

cron 0 9 * * * fyw.js 一天一次
*/
const $ = new Env('放羊娃');
let status;
status = (status = ($.getval("fywstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let fywtokenArr = [], fywcount = ''
let fywtoken = ($.isNode() ? process.env.fywtoken : $.getdata('fywtoken')) || '';
let fywuid = '', fywid = '', fywsign = '',fywtxid = ''
let txje = '10' //自定义提现金额。10 = 0.1 元

!(async () => {
  if (typeof $request !== "undefined") {
    await fywck()

  } else {
    fywtokenArr = fywtoken.split('@')
    console.log(`------------- 共${fywtokenArr.length}个账号-------------\n`)
    for (let i = 0; i < fywtokenArr.length; i++) {
      fywtoken = fywtokenArr[i]
      $.index = i + 1;
      console.log(`\n开始【放羊娃${$.index}】`)
      //await fywbind()
      await fytq()
      for(let x = 0; x < 10; x++){
        await fywhq()
        await $.wait(5000)
        await fywtx()
      }
      


      

    }
  }

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//数据获取


function fywck() {
  if ($request.url.indexOf("article/list") > -1) {
    const fywtoken = JSON.stringify($request.body)
    if (fywtoken) $.setdata(fywtoken, `fywtoken${status}`)
    $.log(fywtoken)
    $.msg($.name, "", '放羊娃' + `${status}` + 'token获取成功！')
  }
}

//获取用户id
function fywhq(timeout = 0) {
    return new Promise((resolve) => {
      
      let url = {
        url: 'https://api.fywa.com.cn/api/user/extract/get_accounts',
        headers: JSON.parse(`{"Authorization":"${fywtoken}","oaid":"6f6c81f84e42283d2a18855cc26de2be","Client_Type":"android","versioncode":"121","version":"1.2.1","Model":"meizu 16sPro","Manufacturer":"meizu","Android-Version":"10","Host":"api.fywa.com.cn","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.8."}`),
        
      }
      $.get(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.code == 200) {
            
            $.log(`\n放羊娃获取用户id:${result.data.lists[0].userId}`)
            
            fywuid = result.data.lists[0].userId
            fywtxid = result.data.lists[0].id
            await fywqq()
            
          } else {
            $.log(`\n放羊娃获取uid:${result.msg}`)
  
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      }, timeout)
    })
  }

  //提取奖励
function fytq(timeout = 0) {
  return new Promise((resolve) => {
    
    let url = {
      url: 'https://api.fywa.com.cn/api/user/coin/receive',
      headers: JSON.parse(`{"Authorization":"${fywtoken}","oaid":"6f6c81f84e42283d2a18855cc26de2be","Client_Type":"android","versioncode":"121","version":"1.2.1","Model":"meizu 16sPro","Manufacturer":"meizu","Android-Version":"10","Host":"api.fywa.com.cn","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.8."}`),
      
    }
    $.get(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.code == 200) {
          
          $.log(`\n放羊娃领取收益:${result.msg}`)
          
        } else {
          $.log(`\n放羊娃:${result.msg}`)

        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

  //提现
function fywtx(timeout = 0) {
    return new Promise((resolve) => {
      
      let url = {
        url: 'https://api.fywa.com.cn/api/user/extract/apply',
        headers: JSON.parse(`{"Authorization":" ${fywtoken}","oaid":"6f6c81f84e42283d2a18855cc26de2be","client_type":"android","versioncode":"121","version":"1.2.1","Model":"meizu 16sPro","Manufacturer":"meizu","Android-Version":"10","Content-Type":"application/json; charset=utf-8","Content-Length":"49","Host":"api.fywa.com.cn","Connection":" Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.8.0"}`),
        body : `{"applyExtractMoney":${txje},"extractAccountId":${fywtxid}}`
      }
      $.post(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.code == 200) {
            
            $.log(`\n放羊娃提现:${result.msg}`)
            
          } else {
            $.log(`\n放羊娃提现:${result.msg}`)
  
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      }, timeout)
    })
  }
//请求广告
function fywqq(timeout = 0) {
  return new Promise((resolve) => {
    
    let url = {
      url: 'https://api.fywa.com.cn/api/task?taskId=10',
      headers: JSON.parse(`{"Authorization":"${fywtoken}","oaid":"6f6c81f84e42283d2a18855cc26de2be","Client_Type":"android","versioncode":"121","version":"1.2.1","Model":"meizu 16sPro","Manufacturer":"meizu","Android-Version":"10","Host":"api.fywa.com.cn","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.8."}`),
      
    }
    $.get(url, async (err, resp, data) => {
      try {
        const result = JSON.parse(data)
        if (result.code == 200) {
          
          $.log(`\n放羊娃请求广告:${result.msg}`)
          await fywgg1()
          
        } else {
          $.log(`\n放羊娃请求广告:${result.msg}`)

        }
      } catch (e) {
        //$.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//广告1
function fywgg1(timeout = 0) {
    return new Promise((resolve) => {
      
      let url = {
        url: 'https://incentive.8ziben.com/api/sdk/incentive/trade',
        headers: JSON.parse(`{"Content-Type":" application/x-www-form-urlencoded","Content-Length":" 996","User-Agent":" Dalvik/2.1.0 (Linux; U; Android 10; 16s Pro Build/QKQ1.191222.002)","Host":" incentive.8ziben.com","Connection":" Keep-Alive","Accept-Encoding":" gzip"}`),
        body : `mdid=52fcb6f3-9213-439d-9b20-bbd2b0e25286&data=%7B%22zj_adID%22%3A%22J6371357270%22%2C%22ad_type%22%3A%22RewardVideo%22%2C%22zjpm%22%3A%22gdt%22%2C%22zjpm_id%22%3A%228072692066715477%22%2C%22ltimes%22%3A1646390219872%2C%22etimes%22%3A0%2C%22pstime%22%3A0%2C%22petime%22%3A0%2C%22vDuration%22%3A0%2C%22userID%22%3A%22${fywuid}%22%2C%22reward_amount%22%3A10%2C%22reward_name%22%3A%22%E5%88%9B%E8%A7%81%E6%BF%80%E5%8A%B1%E8%A7%86%E9%A2%91%22%2C%22extra%22%3A%22%7B%5C%22time%5C%22%3A%5C%221646390218663%5C%22%2C%5C%22taskId%5C%22%3A%5C%2210%5C%22%7D%22%2C%22event_links%22%3A%5B%7B%22event%22%3A%22onZjAdLoaded%22%2C%22message%22%3A1646390219872%2C%22times%22%3A1646390219872%7D%5D%7D&appName=%E6%94%BE%E7%BE%8A%E5%A8%83&appVer=1.2.1&sign=cfac2d720efcfd099463c79fd05c689c&token=token&zj_adID=J6371357270&vaid=335fg45fwe&aaid=a4315de6b6a54d0ab908868628db90ec&appPkgName=com.ainong.shepherdboy&appId=Z0409815622&xToken=&sdkVer=2.0&applicationId=com.ainong.shepherdboy&oaid=6f6c81f84e42283d2a18855cc26de2be`
      }
      $.post(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.code == 200) {
            
            $.log(`\n放羊娃广告id:${result.data.trans_id}`)
            fywid = result.data.trans_id
            await fywyz()
            await $.wait(500)
          } else {
            $.log(`\n放羊娃广告id:${data}`)
  
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      }, timeout)
    })
  }
  //放羊娃广告验证
  function fywyz(timeout = 0) {
    return new Promise((resolve) => {
      
      let url = {
        url: `https://api.fywa.com.cn/api/cjad/app/callback?taskId=10&transid=${fywid}&pid=J6371357270`,
        headers: JSON.parse(`{"Authorization":"${fywtoken}","oaid":"6f6c81f84e42283d2a18855cc26de2be","Client_Type":"android","versioncode":"121","version":"1.2.1","Model":"meizu 16sPro","Manufacturer":"meizu","Android-Version":"10","Host":"api.fywa.com.cn","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.8."}`),
        
      }
      $.get(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.code == 200) {
            
            $.log(`\n放羊娃广告验证:${result.msg}`)
            await $.wait(500)
            await fywgg2()
            
          } else {
            $.log(`\n放羊娃广告验证:${result.msg}`)
  
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      }, timeout)
    })
  }
  //广告2
  function fywgg2(timeout = 0) {
    return new Promise((resolve) => {
        fywsign = md5(`${fywid}42552ba7cc681fed73ac94592a7b62b6`)
      let url = {
        url: `https://incentive.8ziben.com/api/sdk/incentive?trade_id=${fywid}&reward_amount=10&user_id=${fywuid}&appId=Z0409815622&reward_name=%E5%88%9B%E8%A7%81%E6%BF%80%E5%8A%B1%E8%A7%86%E9%A2%91&sign=${fywsign}&extrainfo={%22time%22:%221646390218663%22,%22taskId%22:%2210%22}&zj_adID=J6371357270`,
        headers: JSON.parse(`{"Content-Type":" application/x-www-form-urlencoded","Content-Length":" 996","User-Agent":" Dalvik/2.1.0 (Linux; U; Android 10; 16s Pro Build/QKQ1.191222.002)","Host":" incentive.8ziben.com","Connection":" Keep-Alive","Accept-Encoding":" gzip"}`),
        
      }
      $.get(url, async (err, resp, data) => {
        try {
          const result = JSON.parse(data)
          if (result.data.isValid == true) {
            
            $.log(`\n放羊娃领取奖励成功`)
            
            
          } else {
            $.log(`\n放羊娃领取奖励失败`+data)
  
          }
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      }, timeout)
    })
  }
//封装md5
function md5(a) {
  function b(a, b) {
    return a << b | a >>> 32 - b
  }

  function c(a, b) {
    var c, d, e, f, g;
    return e = 2147483648 & a,
      f = 2147483648 & b,
      c = 1073741824 & a,
      d = 1073741824 & b,
      g = (1073741823 & a) + (1073741823 & b),
      c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
  }

  function d(a, b, c) {
    return a & b | ~a & c
  }

  function e(a, b, c) {
    return a & c | b & ~c
  }

  function f(a, b, c) {
    return a ^ b ^ c
  }

  function g(a, b, c) {
    return b ^ (a | ~c)
  }

  function h(a, e, f, g, h, i, j) {
    return a = c(a, c(c(d(e, f, g), h), j)),
      c(b(a, i), e)
  }

  function i(a, d, f, g, h, i, j) {
    return a = c(a, c(c(e(d, f, g), h), j)),
      c(b(a, i), d)
  }

  function j(a, d, e, g, h, i, j) {
    return a = c(a, c(c(f(d, e, g), h), j)),
      c(b(a, i), d)
  }

  function k(a, d, e, f, h, i, j) {
    return a = c(a, c(c(g(d, e, f), h), j)),
      c(b(a, i), d)
  }

  function l(a) {
    for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)
      b = (i - i % 4) / 4,
        h = i % 4 * 8,
        g[b] = g[b] | a.charCodeAt(i) << h,
        i++;
    return b = (i - i % 4) / 4,
      h = i % 4 * 8,
      g[b] = g[b] | 128 << h,
      g[f - 2] = c << 3,
      g[f - 1] = c >>> 29,
      g
  }

  function m(a) {
    var b, c, d = "", e = "";
    for (c = 0; 3 >= c; c++)
      b = a >>> 8 * c & 255,
        e = "0" + b.toString(16),
        d += e.substr(e.length - 2, 2);
    return d
  }

  function n(a) {
    a = a.replace(/\r\n/g, "\n");
    for (var b = "", c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192),
        b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
          b += String.fromCharCode(d >> 6 & 63 | 128),
          b += String.fromCharCode(63 & d | 128))
    }
    return b
  }

  var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11,
    I = 16, J = 23, K = 6, L = 10, M = 15, N = 21;
  for (a = n(a),
    x = l(a),
    t = 1732584193,
    u = 4023233417,
    v = 2562383102,
    w = 271733878,
    o = 0; o < x.length; o += 16)
    p = t,
      q = u,
      r = v,
      s = w,
      t = h(t, u, v, w, x[o + 0], y, 3614090360),
      w = h(w, t, u, v, x[o + 1], z, 3905402710),
      v = h(v, w, t, u, x[o + 2], A, 606105819),
      u = h(u, v, w, t, x[o + 3], B, 3250441966),
      t = h(t, u, v, w, x[o + 4], y, 4118548399),
      w = h(w, t, u, v, x[o + 5], z, 1200080426),
      v = h(v, w, t, u, x[o + 6], A, 2821735955),
      u = h(u, v, w, t, x[o + 7], B, 4249261313),
      t = h(t, u, v, w, x[o + 8], y, 1770035416),
      w = h(w, t, u, v, x[o + 9], z, 2336552879),
      v = h(v, w, t, u, x[o + 10], A, 4294925233),
      u = h(u, v, w, t, x[o + 11], B, 2304563134),
      t = h(t, u, v, w, x[o + 12], y, 1804603682),
      w = h(w, t, u, v, x[o + 13], z, 4254626195),
      v = h(v, w, t, u, x[o + 14], A, 2792965006),
      u = h(u, v, w, t, x[o + 15], B, 1236535329),
      t = i(t, u, v, w, x[o + 1], C, 4129170786),
      w = i(w, t, u, v, x[o + 6], D, 3225465664),
      v = i(v, w, t, u, x[o + 11], E, 643717713),
      u = i(u, v, w, t, x[o + 0], F, 3921069994),
      t = i(t, u, v, w, x[o + 5], C, 3593408605),
      w = i(w, t, u, v, x[o + 10], D, 38016083),
      v = i(v, w, t, u, x[o + 15], E, 3634488961),
      u = i(u, v, w, t, x[o + 4], F, 3889429448),
      t = i(t, u, v, w, x[o + 9], C, 568446438),
      w = i(w, t, u, v, x[o + 14], D, 3275163606),
      v = i(v, w, t, u, x[o + 3], E, 4107603335),
      u = i(u, v, w, t, x[o + 8], F, 1163531501),
      t = i(t, u, v, w, x[o + 13], C, 2850285829),
      w = i(w, t, u, v, x[o + 2], D, 4243563512),
      v = i(v, w, t, u, x[o + 7], E, 1735328473),
      u = i(u, v, w, t, x[o + 12], F, 2368359562),
      t = j(t, u, v, w, x[o + 5], G, 4294588738),
      w = j(w, t, u, v, x[o + 8], H, 2272392833),
      v = j(v, w, t, u, x[o + 11], I, 1839030562),
      u = j(u, v, w, t, x[o + 14], J, 4259657740),
      t = j(t, u, v, w, x[o + 1], G, 2763975236),
      w = j(w, t, u, v, x[o + 4], H, 1272893353),
      v = j(v, w, t, u, x[o + 7], I, 4139469664),
      u = j(u, v, w, t, x[o + 10], J, 3200236656),
      t = j(t, u, v, w, x[o + 13], G, 681279174),
      w = j(w, t, u, v, x[o + 0], H, 3936430074),
      v = j(v, w, t, u, x[o + 3], I, 3572445317),
      u = j(u, v, w, t, x[o + 6], J, 76029189),
      t = j(t, u, v, w, x[o + 9], G, 3654602809),
      w = j(w, t, u, v, x[o + 12], H, 3873151461),
      v = j(v, w, t, u, x[o + 15], I, 530742520),
      u = j(u, v, w, t, x[o + 2], J, 3299628645),
      t = k(t, u, v, w, x[o + 0], K, 4096336452),
      w = k(w, t, u, v, x[o + 7], L, 1126891415),
      v = k(v, w, t, u, x[o + 14], M, 2878612391),
      u = k(u, v, w, t, x[o + 5], N, 4237533241),
      t = k(t, u, v, w, x[o + 12], K, 1700485571),
      w = k(w, t, u, v, x[o + 3], L, 2399980690),
      v = k(v, w, t, u, x[o + 10], M, 4293915773),
      u = k(u, v, w, t, x[o + 1], N, 2240044497),
      t = k(t, u, v, w, x[o + 8], K, 1873313359),
      w = k(w, t, u, v, x[o + 15], L, 4264355552),
      v = k(v, w, t, u, x[o + 6], M, 2734768916),
      u = k(u, v, w, t, x[o + 13], N, 1309151649),
      t = k(t, u, v, w, x[o + 4], K, 4149444226),
      w = k(w, t, u, v, x[o + 11], L, 3174756917),
      v = k(v, w, t, u, x[o + 2], M, 718787259),
      u = k(u, v, w, t, x[o + 9], N, 3951481745),
      t = c(t, p),
      u = c(u, q),
      v = c(v, r),
      w = c(w, s);
  var O = m(t) + m(u) + m(v) + m(w);
  return O.toLowerCase()
}
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }