/*
@肥皂 3.31 省钱钱
一天2-3毛
抓包 ： 点赚钱-广告赚钱  找到https://api.youlaizhuan.com/VideoApi 链接
抓取请求体的全部数据：格式如下：

c=GetUniadVideoList&d={}&s=xxxxxxxxxxx&ts=xxxxx&a=xxxxx&t=xxxxx&v=1.8.16&deviceid=xxxxxx
注意格式，c是等于GetUniadVideoList id是等于{}  如果id = %7B%7D 自己去url解码或者替换成{}

变量名 sqqbody  多账号@隔开

cron 0 9 * * * sqq.js 一天一次

*/
var _0xodC='jsjiami.com.v6',_0xodC_=['‮_0xodC'],_0x1409=[_0xodC,'WcOYK34=','wqB1w6/DtjQ=','wpLnnrXpkL7pkLLljLflrJPmiLLCsQ==','wrF5w7LDsD/CpA==','w5XCi8KU','w53nn5TpkaHpkZ/kuq3lipLCmw==','HcOOw4zChsKi','cyrCjcKDwqU=','EMOow6Y=','POedrumRpOmRl+S5l+WLjFY=','RsO+w5hhw7pbw4RJwr8=','VhjCssK6w73DvBU=','ExofUcKb','w5MVw6LDusOc','wrfDhElgw5dJwos=','wrbDuWM=','w6c2w5s3','w7LCksO2wrdd','CMOow6rDmCjojaDljp3miJTliK/vvb0=','w57CgcKHPTvCvw==','wrnDncODwrTCtl8Rw6Qgw63CqsKvKw==','w7TCl1k=','BMOzPWAnw4V/','wqRXw7nCkzjDtkk=','w6PCtMOawr9sUyw7wrw=','ccOHw6J+w4M=','wqhJwrfCssK3w5l6wpvCrgZeNQlP5YSl','wrbDs2rCqgNZ','fMOxAEVK','wrvCsMK+wokiWw==','w6vDolTCiFs=','dRjDrg==','wrjlvKXlpq/jgLXnnbbpkqTpk4A=','w5zDnQ1bwqQ=','Ylx2w5TCkQ==','wrTCtMKkwo0+','KMOmRsOVZsO3w5c=','TcOYNm8=','w5/CgcKaLD/CoMOvCg==','55y36ZOe6ZGk','WFMSUFw=','w6TCi0M=','w7LCqHTDnwk=','U8OcJ8KAD8KJQg==','WsOGKWhME3c=','JEjDkg==','cVU8fg==','wpVXw6rDogA=','wqR7w7bDoD/ojaflj7bmi4rlipfvvqs=','wrnDm8OLwrLCrQ==','URxmbMOCwoHDgcO/aQ==','NcOVw67CnMKf','w79KHkwbeRBVw5zCmsOSacKgwrUgw67CpcKmw6TDtX7CpsK/GkDCn8KtScOMwoPCtn/DnA0Nw7dYwqfCjWzDj8KvXMOjwovDq8KBw5tpw6fCusKfw7t7wo1UF8Kew70ywrbDghvDvsKJPlU/wpvCklrCiBRIwo8eUAdlVWnCnQ0zCMKDwpXCmnjCmnrDkcKUwqnDvcOow73Cj8Olw6hAFsKsYhkJwoDDt8KFwpTDrcOJCMKrecKia3wLKMOAw4DDpmbDgn3DrsK6w6DDnMKxE8KKFCgowoZEbsOxGQ5yCMOswpnCqcKow77DosKLRB91w6EPKyDDhkR3QsOrYATDgsKNwo8QGUYNwqZ6JcO9wp51AMKzwp9uMsOddsOtJlbDtFXDnirDhyE+NsOF','C8O7w6/Cm8KhMXMfdcKzw4QQw4bCtXFNXMOsw7PDm0Exw7oEw4YNVWfClzfChwVO','wpdxY1LCkcOww7HDiSBrwqjCsQBfLcKzwpjDtcKE','FcOTw6nCjcKLwobDhsKc','w6wUw5wkwoI=','BWLDvcO/Jw==','w4tWwpXDv8Kr','NMODw4zDvhA=','TnTDkMOlOQ==','w48Iw67DjcOf','QFZiw7fCqQ==','w4snw4Mxwpc=','wplJQDjCow==','wpJ5w4hnw5c=','wpF7Yww=','RcOlw5l8','wq/DoFXCrg8=','GcOuQsOaaA==','D17DpQ==','w7jnn4fpkIDpk5Xljpjph4fkuJ3lipXDuA==','w5vDsmrCsyo=','GsOCIcKWZA==','w6MBw7kQwpY=','DMOAI8KCQA==','Xw3Cs8KewqA=','w7LDhTNRwqw=','wqHDj8OXwrLCng==','WiTCisKqwpbDsw==','OlTDh8OYTw==','w7HDvFzChFc=','w5V6wrPDvA==','w4hNwpXDisKh','w7znnIDpkrvpk43ljZPlrJPmipTCnw==','QijCkMKhwoc=','UFwbWhA=','w7fDvlw=','w5zDnQ1bwqRYIA==','c8OAw7p7w5Y=','XiTChcKpwofDqcKU','w47DtG7CsAoLdQ==','wrLDvjzCpsOF','X313w7zCjA==','ExEjcsKewpnCig==','VEEQ','eVvDlMOW','55y66ZCI6ZO3','w5fCgMKQAgo=','w4TCqw9gw7E=','e1XDng==','TSUQwr7CpQ==','w5LDhxNEwpk=','w4gLw6DDtsO2wpg2wpnCtgVDOAwjPWtvVsOKwrh/HjTDmm46wq5ZO37CmzpWw7zDtmzDpXFxwqJuw7g1a8Oywot9UsOUQwXDpMKLwo0nw7bDtsOSw5vCh8KZQcOEDRXDp8KrVHgzwpAVw7ktezIAWE00bcO6w4nCoVtvaGrCrsK9RynCv3sULsOhOBXDiMKvw4jCl8KCwoXCv8KZMS/CvAlYDCxJwofDgsORCMKCW01fOMOeJMOKw4zDg8OIwpbCh8K8woQSwoVPOG1YAgE9w4rCpCMPWMOJwod9w60qw4QXf0TCosKBBwg9LsKuw7XDhsK8w5ouw5bCoWPDtFPChcOIfMK/XQDCv8KiC3zDn8O9w7sENifDvTLCl8KuHQfDlg==','TcKZZg==','w7nDhMOmwq3DtcOwV8Onw5jDrSIcFsO/F3B2KxY=','wq3DlsObwqY=','a3M+wpXCliAKYMOZwqHCk2DCo8OFw7RxwpLDpng=','w7vDqcO5O8O9','wqlTw4jDlgU=','wqROw67DqD4=','wrzCvMKewoEc','w6lyw77CsFE=','wrrDjjzCm8OiG8Kb','wqYHwpdXw4rCu2XDrwLDusKXQsK3ehl2AQbDiyd/wo0Nwr14w4keUChaw4bDv8O8UV5g','wqzDsWbCohg=','c8Oww6RPw4c=','w4vDnlHCnh4=','QRvDi0cS','YsOSPXoONmLDpsOAw5A=','w4gZw7QTwoA=','w7DCrRF6w6HCjcOb','EcO3KEk1','GzfOwVjsHjhqziami.comzWK.xv6wH=='];if(function(_0x43df43,_0x16377b,_0x461c4c){function _0x5e8d28(_0x4385eb,_0x1d72b4,_0x15d614,_0x4fa47f,_0x2031ca,_0xbacfc7){_0x1d72b4=_0x1d72b4>>0x8,_0x2031ca='po';var _0x3b415c='shift',_0x2140a3='push',_0xbacfc7='‮';if(_0x1d72b4<_0x4385eb){while(--_0x4385eb){_0x4fa47f=_0x43df43[_0x3b415c]();if(_0x1d72b4===_0x4385eb&&_0xbacfc7==='‮'&&_0xbacfc7['length']===0x1){_0x1d72b4=_0x4fa47f,_0x15d614=_0x43df43[_0x2031ca+'p']();}else if(_0x1d72b4&&_0x15d614['replace'](/[GzfOwVHhqzzWKxwH=]/g,'')===_0x1d72b4){_0x43df43[_0x2140a3](_0x4fa47f);}}_0x43df43[_0x2140a3](_0x43df43[_0x3b415c]());}return 0xdb232;};return _0x5e8d28(++_0x16377b,_0x461c4c)>>_0x16377b^_0x461c4c;}(_0x1409,0x109,0x10900),_0x1409){_0xodC_=_0x1409['length']^0x109;};function _0x2753(_0x298a41,_0x9ceb8c){_0x298a41=~~'0x'['concat'](_0x298a41['slice'](0x1));var _0x2d7910=_0x1409[_0x298a41];if(_0x2753['wkXoPA']===undefined){(function(){var _0x47be52=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x432b1d='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x47be52['atob']||(_0x47be52['atob']=function(_0x1fd5ba){var _0x59f833=String(_0x1fd5ba)['replace'](/=+$/,'');for(var _0x2b4cd2=0x0,_0x1b47e5,_0x7c9740,_0x582091=0x0,_0x31860e='';_0x7c9740=_0x59f833['charAt'](_0x582091++);~_0x7c9740&&(_0x1b47e5=_0x2b4cd2%0x4?_0x1b47e5*0x40+_0x7c9740:_0x7c9740,_0x2b4cd2++%0x4)?_0x31860e+=String['fromCharCode'](0xff&_0x1b47e5>>(-0x2*_0x2b4cd2&0x6)):0x0){_0x7c9740=_0x432b1d['indexOf'](_0x7c9740);}return _0x31860e;});}());function _0x5cff0b(_0x3fdbca,_0x9ceb8c){var _0x18aa23=[],_0x578222=0x0,_0x5327c2,_0xe0d1be='',_0x280004='';_0x3fdbca=atob(_0x3fdbca);for(var _0x5ea265=0x0,_0x58842c=_0x3fdbca['length'];_0x5ea265<_0x58842c;_0x5ea265++){_0x280004+='%'+('00'+_0x3fdbca['charCodeAt'](_0x5ea265)['toString'](0x10))['slice'](-0x2);}_0x3fdbca=decodeURIComponent(_0x280004);for(var _0x8cb3cb=0x0;_0x8cb3cb<0x100;_0x8cb3cb++){_0x18aa23[_0x8cb3cb]=_0x8cb3cb;}for(_0x8cb3cb=0x0;_0x8cb3cb<0x100;_0x8cb3cb++){_0x578222=(_0x578222+_0x18aa23[_0x8cb3cb]+_0x9ceb8c['charCodeAt'](_0x8cb3cb%_0x9ceb8c['length']))%0x100;_0x5327c2=_0x18aa23[_0x8cb3cb];_0x18aa23[_0x8cb3cb]=_0x18aa23[_0x578222];_0x18aa23[_0x578222]=_0x5327c2;}_0x8cb3cb=0x0;_0x578222=0x0;for(var _0x3c159f=0x0;_0x3c159f<_0x3fdbca['length'];_0x3c159f++){_0x8cb3cb=(_0x8cb3cb+0x1)%0x100;_0x578222=(_0x578222+_0x18aa23[_0x8cb3cb])%0x100;_0x5327c2=_0x18aa23[_0x8cb3cb];_0x18aa23[_0x8cb3cb]=_0x18aa23[_0x578222];_0x18aa23[_0x578222]=_0x5327c2;_0xe0d1be+=String['fromCharCode'](_0x3fdbca['charCodeAt'](_0x3c159f)^_0x18aa23[(_0x18aa23[_0x8cb3cb]+_0x18aa23[_0x578222])%0x100]);}return _0xe0d1be;}_0x2753['sVbUgv']=_0x5cff0b;_0x2753['gAyBlx']={};_0x2753['wkXoPA']=!![];}var _0x13d3ba=_0x2753['gAyBlx'][_0x298a41];if(_0x13d3ba===undefined){if(_0x2753['XIBxji']===undefined){_0x2753['XIBxji']=!![];}_0x2d7910=_0x2753['sVbUgv'](_0x2d7910,_0x9ceb8c);_0x2753['gAyBlx'][_0x298a41]=_0x2d7910;}else{_0x2d7910=_0x13d3ba;}return _0x2d7910;};const $=new Env('省钱钱');let status;status=(status=$[_0x2753('‮0','UZSA')](_0x2753('‫1','0*wL'))||'1')>0x1?''+status:'';let sqqbodyArr=[],sqqbodycount='';let sqqbody=($['isNode']()?process[_0x2753('‮2','a3DL')]['sqqbody']:$[_0x2753('‫3','tdl(')](_0x2753('‫4','X[cM')))||'';let id='',title='';!(async()=>{var _0x498aa4={'DMHvW':function(_0x44de0f,_0xa65700){return _0x44de0f!==_0xa65700;},'uktQC':_0x2753('‫5','E5YG'),'UFXOi':function(_0x46708e,_0x395f43){return _0x46708e<_0x395f43;},'cipmj':function(_0x216345,_0x505205){return _0x216345+_0x505205;},'nMlLZ':function(_0x15c517){return _0x15c517();}};if(_0x498aa4[_0x2753('‮6','an^n')](typeof $request,_0x498aa4['uktQC'])){await sqqbodyck();}else{sqqbodyArr=sqqbody['split']('@');console['log'](_0x2753('‫7','lRuD')+sqqbodyArr[_0x2753('‮8','Xu5Z')]+'个账号-------------\x0a');for(let _0x134ea3=0x0;_0x498aa4[_0x2753('‫9','JHRw')](_0x134ea3,sqqbodyArr[_0x2753('‮a','(w1T')]);_0x134ea3++){sqqbody=sqqbodyArr[_0x134ea3];$[_0x2753('‫b','!@2R')]=_0x498aa4['cipmj'](_0x134ea3,0x1);console[_0x2753('‫c','ZMIc')](_0x2753('‫d','ePpi')+$[_0x2753('‮e','ccMh')]+'】');await _0x498aa4[_0x2753('‮f','o56A')](sqqlb);}}})()[_0x2753('‫10','(w1T')](_0x131270=>$['logErr'](_0x131270))[_0x2753('‫11','vMb6')](()=>$[_0x2753('‫12','JHRw')]());function sqqbodyck(){var _0x558caf={'GgCKb':function(_0xfc8ebe,_0x8d9c31){return _0xfc8ebe>_0x8d9c31;},'hiKGR':_0x2753('‫13','UZSA'),'kuDYm':function(_0x44fb5c,_0x4d1935){return _0x44fb5c-_0x4d1935;},'ECwgQ':function(_0x5d1843,_0x2b5452){return _0x5d1843+_0x2b5452;},'kDPBC':_0x2753('‫14','G5ZA')};if(_0x558caf[_0x2753('‮15','dFE8')]($request[_0x2753('‫16','a3DL')]['indexOf'](_0x558caf[_0x2753('‮17','^YV9')]),-0x1)){const _0x494bfa=JSON['stringify']($request[_0x2753('‫18','jTK)')]);if(_0x494bfa)$['setdata'](_0x558caf['kuDYm'](_0x494bfa['x']-api,key),_0x2753('‫19','JHRw')+status);$['log'](_0x494bfa);$[_0x2753('‫1a','Bi)!')]($[_0x2753('‮1b','dFE8')],'',_0x558caf[_0x2753('‮1c','Pq04')](_0x558caf['kDPBC'],''+status)+_0x2753('‮1d','Pq04'));}}function sqqlb(_0x1672da=0x0){var _0x345139={'eCjvG':function(_0x2fc8ef,_0x2e63fa){return _0x2fc8ef-_0x2e63fa;},'LYHyB':'token获取成功！','iMOwY':function(_0xe6e5c7,_0x4a3191){return _0xe6e5c7===_0x4a3191;},'HDMCV':'Uwglw','YNiVm':function(_0x3e7166,_0x13bbd8){return _0x3e7166==_0x13bbd8;},'JltRE':_0x2753('‫1e','0*wL'),'LGxob':_0x2753('‮1f','N!GR'),'jTKwY':_0x2753('‮20','metN'),'BpucR':'https://api.youlaizhuan.com/VideoApi','TmscN':_0x2753('‮21','ePpi'),'oHJDK':_0x2753('‮22',']AY1'),'KNcwn':'187','CabEf':_0x2753('‮23','^A^r')};return new Promise(_0x264198=>{var _0x3e0a0f={'jVOBS':function(_0x8c9057){return _0x8c9057();},'hrlZq':function(_0x554c5d,_0x20804e){return _0x554c5d>_0x20804e;},'FJPsB':_0x2753('‮24','metN'),'zUpQF':function(_0x48ee0b,_0x4cf19d){return _0x345139[_0x2753('‫25','w$vn')](_0x48ee0b,_0x4cf19d);},'SlmdG':function(_0x5228ec,_0x423165){return _0x5228ec-_0x423165;},'RVqNZ':_0x345139[_0x2753('‮26','Bi)!')],'aRNjn':function(_0x4423a7,_0x4ac634){return _0x345139[_0x2753('‫27','3lch')](_0x4423a7,_0x4ac634);},'uvQcx':_0x345139[_0x2753('‮28','$WOe')],'iLWSB':function(_0x5a2b6b,_0x461b37){return _0x345139[_0x2753('‫29','dT6W')](_0x5a2b6b,_0x461b37);},'GvZop':_0x345139[_0x2753('‮2a','lRuD')],'vcleP':'nOsrM','kcedG':function(_0x315b5e,_0x54d52a){return _0x315b5e<_0x54d52a;},'YeErb':_0x345139[_0x2753('‫2b','o56A')],'ndcIP':_0x345139['jTKwY']};let _0x53ed9a={'url':_0x345139[_0x2753('‫2c','w$vn')],'headers':{'user-agent':_0x345139['TmscN'],'Content-Type':_0x345139[_0x2753('‮2d','^A^r')],'Content-Length':_0x345139['KNcwn'],'Host':_0x345139[_0x2753('‫2e','VuyY')],'Connection':'Keep-Alive','Accept-Encoding':_0x2753('‫2f','^A^r')},'body':sqqbody};$[_0x2753('‫30','an^n')](_0x53ed9a,async(_0x239798,_0x1f6160,_0x50a7df)=>{if(_0x3e0a0f['aRNjn'](_0x3e0a0f[_0x2753('‫31','Xu5Z')],_0x2753('‫32','vMb6'))){$[_0x2753('‮33','$L03')](_0x2753('‮34','DgQJ')+_0x33b862['M']);}else{try{if(_0x2753('‫35','ZVn^')!==_0x2753('‮36','EF5M')){_0x3e0a0f[_0x2753('‫37','w$vn')](_0x264198);}else{const _0x33b862=JSON[_0x2753('‫38','EF5M')](_0x50a7df);if(_0x3e0a0f[_0x2753('‮39','Jo$a')](_0x33b862['H'],!![])){if(_0x3e0a0f[_0x2753('‮3a','ccMh')]!==_0x3e0a0f['vcleP']){for(let _0x1473e5=0x0;_0x3e0a0f[_0x2753('‮3b','0*wL')](_0x1473e5,_0x33b862['D'][0x0]['id'][_0x2753('‫3c','Jo$a')]);_0x1473e5++){var _0x273ee8=_0x3e0a0f[_0x2753('‮3d','$L03')][_0x2753('‫3e','!@2R')]('|'),_0x56faa1=0x0;while(!![]){switch(_0x273ee8[_0x56faa1++]){case'0':await $[_0x2753('‮3f','3lch')](0x3e8);continue;case'1':id=_0x33b862['D'][_0x1473e5]['id'];continue;case'2':await _0x3e0a0f[_0x2753('‮40','3lch')](sqqrw);continue;case'3':$['log'](_0x2753('‫41','^A^r')+title);continue;case'4':title=_0x33b862['D'][_0x1473e5][_0x2753('‫42','Jo$a')];continue;}break;}}}else{if(_0x3e0a0f[_0x2753('‮43','TY[0')]($request[_0x2753('‮44','!@2R')][_0x2753('‫45','ccMh')](_0x3e0a0f[_0x2753('‫46','an^n')]),-0x1)){const _0x224d25=JSON['stringify']($request[_0x2753('‫47','Jo$a')]);if(_0x224d25)$[_0x2753('‮48','ZVn^')](_0x3e0a0f[_0x2753('‫49','8MTk')](_0x3e0a0f[_0x2753('‮4a','o56A')](_0x224d25['x'],api),key),_0x2753('‫4b','N!GR')+status);$[_0x2753('‮4c','TY[0')](_0x224d25);$['msg']($[_0x2753('‫4d','dT6W')],'',_0x2753('‫4e','jTK)')+(''+status)+_0x3e0a0f['RVqNZ']);}}}else{if(_0x3e0a0f[_0x2753('‮4f','UZSA')]===_0x2753('‮50','ximf')){$[_0x2753('‮51','dT6W')]('\x0a省钱钱匹配任务:'+_0x33b862['M']);}else{_0x264198();}}}}catch(_0x56bd82){}finally{_0x264198();}}},_0x1672da);});}function sqqrw(_0x3963e6=0x0){var _0x2367ad={'wESqj':_0x2753('‫52','IV8v'),'qVLBW':function(_0x3601e1){return _0x3601e1();},'RooBI':function(_0x5c5eff,_0x147ab6){return _0x5c5eff-_0x147ab6;},'uAtEb':function(_0xa6ccfc,_0x5d41d5){return _0xa6ccfc+_0x5d41d5;},'yGUST':'省钱钱','tZsmo':function(_0x2934c9,_0x4bc916){return _0x2934c9!==_0x4bc916;},'kiNoJ':_0x2753('‫53','ccMh'),'vgboo':_0x2753('‫54','lRuD'),'FzNGS':'application/x-www-form-urlencoded','vOKJu':_0x2753('‫55','EF5M'),'XlBKz':_0x2753('‫56','tb18'),'ANBAE':_0x2753('‫57','0*wL'),'raaMs':_0x2753('‮58','IV8v')};return new Promise(_0x29c592=>{var _0x16fc94={'szMAj':function(_0x3e8cc3,_0x5b08e9){return _0x2367ad['RooBI'](_0x3e8cc3,_0x5b08e9);},'VqxeF':function(_0x27352a,_0x1448c3){return _0x27352a-_0x1448c3;},'dHHmW':function(_0x5d86bd,_0x51cd9d){return _0x2367ad[_0x2753('‫59','Y$a$')](_0x5d86bd,_0x51cd9d);},'hxLTP':_0x2367ad[_0x2753('‮5a','Pq04')]};if(_0x2367ad[_0x2753('‮5b','Pq04')](_0x2367ad[_0x2753('‫5c','(w1T')],_0x2753('‮5d','xLEC'))){let _0xdd8dbf=sqqbody[_0x2753('‮5e','8MTk')]('{}','{\x22id\x22:\x22'+id+'\x22}');let _0x2ff7cb={'url':_0x2753('‮5f','5Az['),'headers':{'user-agent':_0x2367ad[_0x2753('‫60','Xu5Z')],'Content-Type':_0x2367ad[_0x2753('‮61','an^n')],'Content-Length':_0x2367ad[_0x2753('‫62','ZVn^')],'Host':_0x2367ad[_0x2753('‮63','ZMIc')],'Connection':_0x2753('‫64','JHRw'),'Accept-Encoding':_0x2367ad[_0x2753('‮65','w$vn')]},'body':_0xdd8dbf[_0x2753('‮66','ximf')](_0x2367ad[_0x2753('‮67','tdl(')],'c=WriteUniadVideoComplete')};$[_0x2753('‫68','JHRw')](_0x2ff7cb,async(_0x5d81f8,_0x42ff2a,_0x42a820)=>{try{const _0x2119b9=JSON[_0x2753('‫69','Pq04')](_0x42a820);if(_0x2119b9['H']==!![]){$[_0x2753('‫c','ZMIc')](_0x2753('‮6a','tb18')+_0x2119b9['D']['content']+'获得'+_0x2119b9['D'][_0x2753('‫6b','Pq04')]);await $['wait'](0xbb8);await sqqrw();}else{$[_0x2753('‫6c','UZSA')](_0x2753('‮6d','(w1T')+_0x2119b9['H']);}}catch(_0x41e94a){}finally{if(_0x2367ad[_0x2753('‮6e',']AY1')]===_0x2753('‮6f','Jo$a')){_0x2367ad['qVLBW'](_0x29c592);}else{$[_0x2753('‮70','$WOe')](_0x2753('‫71','G5ZA')+result['H']);}}},_0x3963e6);}else{const _0x51f165=JSON[_0x2753('‫72','an^n')]($request['headers']);if(_0x51f165)$[_0x2753('‫73','rca*')](_0x16fc94[_0x2753('‮74','N!GR')](_0x16fc94[_0x2753('‮75','lRuD')](_0x51f165['x'],api),key),_0x2753('‫76','Ocz#')+status);$[_0x2753('‮77','Xu5Z')](_0x51f165);$['msg']($[_0x2753('‮78','w$vn')],'',_0x16fc94['dHHmW'](_0x16fc94[_0x2753('‮79','E5YG')](_0x16fc94['hxLTP'],''+status),_0x2753('‫7a','$WOe')));}});};_0xodC='jsjiami.com.v6';


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