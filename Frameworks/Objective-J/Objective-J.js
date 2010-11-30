var ObjectiveJ={};
(function(_1,_2){
if(!this.JSON){
JSON={};
}
(function(){
function f(n){
return n<10?"0"+n:n;
};
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(_3){
return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z";
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(_4){
return this.valueOf();
};
}
var cx=new RegExp("[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _5=new RegExp("[\\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g");
var _6,_7,_8={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},_9;
function _a(_b){
_5.lastIndex=0;
return _5.test(_b)?"\""+_b.replace(_5,function(a){
var c=_8[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_b+"\"";
};
function _c(_d,_e){
var i,k,v,_f,_10=_6,_11,_12=_e[_d];
if(_12&&typeof _12==="object"&&typeof _12.toJSON==="function"){
_12=_12.toJSON(_d);
}
if(typeof _9==="function"){
_12=_9.call(_e,_d,_12);
}
switch(typeof _12){
case "string":
return _a(_12);
case "number":
return isFinite(_12)?String(_12):"null";
case "boolean":
case "null":
return String(_12);
case "object":
if(!_12){
return "null";
}
_6+=_7;
_11=[];
if(Object.prototype.toString.apply(_12)==="[object Array]"){
_f=_12.length;
for(i=0;i<_f;i+=1){
_11[i]=_c(i,_12)||"null";
}
v=_11.length===0?"[]":_6?"[\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"]":"["+_11.join(",")+"]";
_6=_10;
return v;
}
if(_9&&typeof _9==="object"){
_f=_9.length;
for(i=0;i<_f;i+=1){
k=_9[i];
if(typeof k==="string"){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}else{
for(k in _12){
if(Object.hasOwnProperty.call(_12,k)){
v=_c(k,_12);
if(v){
_11.push(_a(k)+(_6?": ":":")+v);
}
}
}
}
v=_11.length===0?"{}":_6?"{\n"+_6+_11.join(",\n"+_6)+"\n"+_10+"}":"{"+_11.join(",")+"}";
_6=_10;
return v;
}
};
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_13,_14,_15){
var i;
_6="";
_7="";
if(typeof _15==="number"){
for(i=0;i<_15;i+=1){
_7+=" ";
}
}else{
if(typeof _15==="string"){
_7=_15;
}
}
_9=_14;
if(_14&&typeof _14!=="function"&&(typeof _14!=="object"||typeof _14.length!=="number")){
throw new Error("JSON.stringify");
}
return _c("",{"":_13});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(_16,_17){
var j;
function _18(_19,key){
var k,v,_1a=_19[key];
if(_1a&&typeof _1a==="object"){
for(k in _1a){
if(Object.hasOwnProperty.call(_1a,k)){
v=_18(_1a,k);
if(v!==_46){
_1a[k]=v;
}else{
delete _1a[k];
}
}
}
}
return _17.call(_19,key,_1a);
};
cx.lastIndex=0;
if(cx.test(_16)){
_16=_16.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(_16.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+_16+")");
return typeof _17==="function"?_18({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
var _1b=new RegExp("([^%]+|%[\\+\\-\\ \\#0]*[0-9\\*]*(.[0-9\\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])","g");
var _1c=new RegExp("(%)([\\+\\-\\ \\#0]*)([0-9\\*]*)((.[0-9\\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])");
_2.sprintf=function(_1d){
var _1d=arguments[0],_1e=_1d.match(_1b),_1f=0,_20="",arg=1;
for(var i=0;i<_1e.length;i++){
var t=_1e[i];
if(_1d.substring(_1f,_1f+t.length)!=t){
return _20;
}
_1f+=t.length;
if(t.charAt(0)!="%"){
_20+=t;
}else{
var _21=t.match(_1c);
if(_21.length!=8||_21[0]!=t){
return _20;
}
var _22=_21[1],_23=_21[2],_24=_21[3],_25=_21[4],_26=_21[6],_27=_21[7];
var _28=null;
if(_24=="*"){
_28=arguments[arg++];
}else{
if(_24!=""){
_28=Number(_24);
}
}
var _29=null;
if(_25==".*"){
_29=arguments[arg++];
}else{
if(_25!=""){
_29=Number(_25.substring(1));
}
}
var _2a=(_23.indexOf("-")>=0);
var _2b=(_23.indexOf("0")>=0);
var _2c="";
if(RegExp("[bBdiufeExXo]").test(_27)){
var num=Number(arguments[arg++]);
var _2d="";
if(num<0){
_2d="-";
}else{
if(_23.indexOf("+")>=0){
_2d="+";
}else{
if(_23.indexOf(" ")>=0){
_2d=" ";
}
}
}
if(_27=="d"||_27=="i"||_27=="u"){
var _2e=String(Math.abs(Math.floor(num)));
_2c=_2f(_2d,"",_2e,"",_28,_2a,_2b);
}
if(_27=="f"){
var _2e=String((_29!=null)?Math.abs(num).toFixed(_29):Math.abs(num));
var _30=(_23.indexOf("#")>=0&&_2e.indexOf(".")<0)?".":"";
_2c=_2f(_2d,"",_2e,_30,_28,_2a,_2b);
}
if(_27=="e"||_27=="E"){
var _2e=String(Math.abs(num).toExponential(_29!=null?_29:21));
var _30=(_23.indexOf("#")>=0&&_2e.indexOf(".")<0)?".":"";
_2c=_2f(_2d,"",_2e,_30,_28,_2a,_2b);
}
if(_27=="x"||_27=="X"){
var _2e=String(Math.abs(num).toString(16));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0x":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(_27=="b"||_27=="B"){
var _2e=String(Math.abs(num).toString(2));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0b":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(_27=="o"){
var _2e=String(Math.abs(num).toString(8));
var _31=(_23.indexOf("#")>=0&&num!=0)?"0":"";
_2c=_2f(_2d,_31,_2e,"",_28,_2a,_2b);
}
if(RegExp("[A-Z]").test(_27)){
_2c=_2c.toUpperCase();
}else{
_2c=_2c.toLowerCase();
}
}else{
var _2c="";
if(_27=="%"){
_2c="%";
}else{
if(_27=="c"){
_2c=String(arguments[arg++]).charAt(0);
}else{
if(_27=="s"||_27=="@"){
_2c=String(arguments[arg++]);
}else{
if(_27=="p"||_27=="n"){
arg++;
_2c="";
}
}
}
}
_2c=_2f("","",_2c,"",_28,_2a,false);
}
_20+=_2c;
}
}
return _20;
};
function _2f(_32,_33,_34,_35,_36,_37,_38){
var _39=(_32.length+_33.length+_34.length+_35.length);
if(_37){
return _32+_33+_34+_35+pad(_36-_39," ");
}else{
if(_38){
return _32+_33+pad(_36-_39,"0")+_34+_35;
}else{
return pad(_36-_39," ")+_32+_33+_34+_35;
}
}
};
function pad(n,ch){
return Array(MAX(0,n)+1).join(ch);
};
CPLogDisable=false;
var _3a="Cappuccino";
var _3b=["fatal","error","warn","info","debug","trace"];
var _3c=_3b[3];
var _3d={};
for(var i=0;i<_3b.length;i++){
_3d[_3b[i]]=i;
}
var _3e={};
CPLogRegister=function(_3f,_40,_41){
CPLogRegisterRange(_3f,_3b[0],_40||_3b[_3b.length-1],_41);
};
CPLogRegisterRange=function(_42,_43,_44,_45){
var min=_3d[_43];
var max=_3d[_44];
if(min!==_46&&max!==_46&&min<=max){
for(var i=min;i<=max;i++){
CPLogRegisterSingle(_42,_3b[i],_45);
}
}
};
CPLogRegisterSingle=function(_47,_48,_49){
if(!_3e[_48]){
_3e[_48]=[];
}
for(var i=0;i<_3e[_48].length;i++){
if(_3e[_48][i][0]===_47){
_3e[_48][i][1]=_49;
return;
}
}
_3e[_48].push([_47,_49]);
};
CPLogUnregister=function(_4a){
for(var _4b in _3e){
for(var i=0;i<_3e[_4b].length;i++){
if(_3e[_4b][i][0]===_4a){
_3e[_4b].splice(i--,1);
}
}
}
};
function _4c(_4d,_4e,_4f){
if(_4f==_46){
_4f=_3a;
}
if(_4e==_46){
_4e=_3c;
}
var _50=(typeof _4d[0]=="string"&&_4d.length>1)?_2.sprintf.apply(null,_4d):String(_4d[0]);
if(_3e[_4e]){
for(var i=0;i<_3e[_4e].length;i++){
var _51=_3e[_4e][i];
_51[0](_50,_4e,_4f,_51[1]);
}
}
};
CPLog=function(){
_4c(arguments);
};
for(var i=0;i<_3b.length;i++){
CPLog[_3b[i]]=(function(_52){
return function(){
_4c(arguments,_52);
};
})(_3b[i]);
}
var _53=function(_54,_55,_56){
var now=new Date();
_55=(_55==null?"":" ["+CPLogColorize(_55,_55)+"]");
if(typeof _2.sprintf=="function"){
return _2.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s: %s",now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds(),_56,_55,_54);
}else{
return now+" "+_56+_55+": "+_54;
}
};
CPLogConsole=function(_57,_58,_59,_5a){
if(typeof console!="undefined"){
var _5b=(_5a||_53)(_57,_58,_59);
var _5c={"fatal":"error","error":"error","warn":"warn","info":"info","debug":"debug","trace":"debug"}[_58];
if(_5c&&console[_5c]){
console[_5c](_5b);
}else{
if(console.log){
console.log(_5b);
}
}
}
};
CPLogColorize=function(_5d,_5e){
return _5d;
};
CPLogAlert=function(_5f,_60,_61,_62){
if(typeof alert!="undefined"&&!CPLogDisable){
var _63=(_62||_53)(_5f,_60,_61);
CPLogDisable=!confirm(_63+"\n\n(Click cancel to stop log alerts)");
}
};
var _64=null;
CPLogPopup=function(_65,_66,_67,_68){
try{
if(CPLogDisable||window.open==_46){
return;
}
if(!_64||!_64.document){
_64=window.open("","_blank","width=600,height=400,status=no,resizable=yes,scrollbars=yes");
if(!_64){
CPLogDisable=!confirm(_65+"\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
return;
}
_69(_64);
}
var _6a=_64.document.createElement("div");
_6a.setAttribute("class",_66||"fatal");
var _6b=(_68||_53)(_65,_68?_66:null,_67);
_6a.appendChild(_64.document.createTextNode(_6b));
_64.log.appendChild(_6a);
if(_64.focusEnabled.checked){
_64.focus();
}
if(_64.blockEnabled.checked){
_64.blockEnabled.checked=_64.confirm(_6b+"\nContinue blocking?");
}
if(_64.scrollEnabled.checked){
_64.scrollToBottom();
}
}
catch(e){
}
};
var _6c="<style type=\"text/css\" media=\"screen\"> body{font:10px Monaco,Courier,\"Courier New\",monospace,mono;padding-top:15px;} div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} div[wrap=\"yes\"] > div{white-space:normal;} .fatal{background-color:#ffb2b3;} .error{background-color:#ffe2b2;} .warn{background-color:#fdffb2;} .info{background-color:#e4ffb2;} .debug{background-color:#a0e5a0;} .trace{background-color:#99b9ff;} .enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} [enabled=\"no\"]{opacity:0.25;} ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} </style>";
function _69(_6d){
var doc=_6d.document;
doc.writeln("<html><head><title></title>"+_6c+"</head><body></body></html>");
doc.title=_3a+" Run Log";
var _6e=doc.getElementsByTagName("head")[0];
var _6f=doc.getElementsByTagName("body")[0];
var _70=window.location.protocol+"//"+window.location.host+window.location.pathname;
_70=_70.substring(0,_70.lastIndexOf("/")+1);
var div=doc.createElement("div");
div.setAttribute("id","header");
_6f.appendChild(div);
var ul=doc.createElement("ul");
ul.setAttribute("id","enablers");
div.appendChild(ul);
for(var i=0;i<_3b.length;i++){
var li=doc.createElement("li");
li.setAttribute("id","en"+_3b[i]);
li.setAttribute("class",_3b[i]);
li.setAttribute("onclick","toggle(this);");
li.setAttribute("enabled","yes");
li.appendChild(doc.createTextNode(_3b[i]));
ul.appendChild(li);
}
var ul=doc.createElement("ul");
ul.setAttribute("id","options");
div.appendChild(ul);
var _71={"focus":["Focus",false],"block":["Block",false],"wrap":["Wrap",false],"scroll":["Scroll",true],"close":["Close",true]};
for(o in _71){
var li=doc.createElement("li");
ul.appendChild(li);
_6d[o+"Enabled"]=doc.createElement("input");
_6d[o+"Enabled"].setAttribute("id",o);
_6d[o+"Enabled"].setAttribute("type","checkbox");
if(_71[o][1]){
_6d[o+"Enabled"].setAttribute("checked","checked");
}
li.appendChild(_6d[o+"Enabled"]);
var _72=doc.createElement("label");
_72.setAttribute("for",o);
_72.appendChild(doc.createTextNode(_71[o][0]));
li.appendChild(_72);
}
_6d.log=doc.createElement("div");
_6d.log.setAttribute("class","enerror endebug enwarn eninfo enfatal entrace");
_6f.appendChild(_6d.log);
_6d.toggle=function(_73){
var _74=(_73.getAttribute("enabled")=="yes")?"no":"yes";
_73.setAttribute("enabled",_74);
if(_74=="yes"){
_6d.log.className+=" "+_73.id;
}else{
_6d.log.className=_6d.log.className.replace(new RegExp("[\\s]*"+_73.id,"g"),"");
}
};
_6d.scrollToBottom=function(){
_6d.scrollTo(0,_6f.offsetHeight);
};
_6d.wrapEnabled.addEventListener("click",function(){
_6d.log.setAttribute("wrap",_6d.wrapEnabled.checked?"yes":"no");
},false);
_6d.addEventListener("keydown",function(e){
var e=e||_6d.event;
if(e.keyCode==75&&(e.ctrlKey||e.metaKey)){
while(_6d.log.firstChild){
_6d.log.removeChild(_6d.log.firstChild);
}
e.preventDefault();
}
},"false");
window.addEventListener("unload",function(){
if(_6d&&_6d.closeEnabled&&_6d.closeEnabled.checked){
CPLogDisable=true;
_6d.close();
}
},false);
_6d.addEventListener("unload",function(){
if(!CPLogDisable){
CPLogDisable=!confirm("Click cancel to stop logging");
}
},false);
};
CPLogDefault=(typeof window==="object"&&window.console)?CPLogConsole:CPLogPopup;
var _46;
if(typeof window!=="undefined"){
window.setNativeTimeout=window.setTimeout;
window.clearNativeTimeout=window.clearTimeout;
window.setNativeInterval=window.setInterval;
window.clearNativeInterval=window.clearInterval;
}
NO=false;
YES=true;
nil=null;
Nil=null;
NULL=null;
ABS=Math.abs;
ASIN=Math.asin;
ACOS=Math.acos;
ATAN=Math.atan;
ATAN2=Math.atan2;
SIN=Math.sin;
COS=Math.cos;
TAN=Math.tan;
EXP=Math.exp;
POW=Math.pow;
CEIL=Math.ceil;
FLOOR=Math.floor;
ROUND=Math.round;
MIN=Math.min;
MAX=Math.max;
RAND=Math.random;
SQRT=Math.sqrt;
E=Math.E;
LN2=Math.LN2;
LN10=Math.LN10;
LOG2E=Math.LOG2E;
LOG10E=Math.LOG10E;
PI=Math.PI;
PI2=Math.PI*2;
PI_2=Math.PI/2;
SQRT1_2=Math.SQRT1_2;
SQRT2=Math.SQRT2;
function _75(_76){
this._eventListenersForEventNames={};
this._owner=_76;
};
_75.prototype.addEventListener=function(_77,_78){
var _79=this._eventListenersForEventNames;
if(!_7a.call(_79,_77)){
var _7b=[];
_79[_77]=_7b;
}else{
var _7b=_79[_77];
}
var _7c=_7b.length;
while(_7c--){
if(_7b[_7c]===_78){
return;
}
}
_7b.push(_78);
};
_75.prototype.removeEventListener=function(_7d,_7e){
var _7f=this._eventListenersForEventNames;
if(!_7a.call(_7f,_7d)){
return;
}
var _80=_7f[_7d],_81=_80.length;
while(_81--){
if(_80[_81]===_7e){
return _80.splice(_81,1);
}
}
};
_75.prototype.dispatchEvent=function(_82){
var _83=_82.type,_84=this._eventListenersForEventNames;
if(_7a.call(_84,_83)){
var _85=this._eventListenersForEventNames[_83],_86=0,_87=_85.length;
for(;_86<_87;++_86){
_85[_86](_82);
}
}
var _88=(this._owner||this)["on"+_83];
if(_88){
_88(_82);
}
};
var _89=0,_8a=null,_8b=[];
function _8c(_8d){
var _8e=_89;
if(_8a===null){
window.setNativeTimeout(function(){
var _8f=_8b,_90=0,_91=_8b.length;
++_89;
_8a=null;
_8b=[];
for(;_90<_91;++_90){
_8f[_90]();
}
},0);
}
return function(){
var _92=arguments;
if(_89>_8e){
_8d.apply(this,_92);
}else{
_8b.push(function(){
_8d.apply(this,_92);
});
}
};
};
var _93=null;
if(window.ActiveXObject!==_46){
var _94=["Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.6.0"],_95=_94.length;
while(_95--){
try{
var _96=_94[_95];
new ActiveXObject(_96);
_93=function(){
return new ActiveXObject(_96);
};
break;
}
catch(anException){
}
}
}
if(!_93){
_93=window.XMLHttpRequest;
}
CFHTTPRequest=function(){
this._isOpen=false;
this._requestHeaders={};
this._mimeType=null;
this._eventDispatcher=new _75(this);
this._nativeRequest=new _93();
var _97=this;
this._stateChangeHandler=function(){
_aa(_97);
};
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
if(CFHTTPRequest.AuthenticationDelegate!==nil){
this._eventDispatcher.addEventListener("HTTP403",function(){
CFHTTPRequest.AuthenticationDelegate(_97);
});
}
};
CFHTTPRequest.UninitializedState=0;
CFHTTPRequest.LoadingState=1;
CFHTTPRequest.LoadedState=2;
CFHTTPRequest.InteractiveState=3;
CFHTTPRequest.CompleteState=4;
CFHTTPRequest.AuthenticationDelegate=nil;
CFHTTPRequest.prototype.status=function(){
try{
return this._nativeRequest.status||0;
}
catch(anException){
return 0;
}
};
CFHTTPRequest.prototype.statusText=function(){
try{
return this._nativeRequest.statusText||"";
}
catch(anException){
return "";
}
};
CFHTTPRequest.prototype.readyState=function(){
return this._nativeRequest.readyState;
};
CFHTTPRequest.prototype.success=function(){
var _98=this.status();
if(_98>=200&&_98<300){
return YES;
}
return _98===0&&this.responseText()&&this.responseText().length;
};
CFHTTPRequest.prototype.responseXML=function(){
var _99=this._nativeRequest.responseXML;
if(_99&&(_93===window.XMLHttpRequest)){
return _99;
}
return _9a(this.responseText());
};
CFHTTPRequest.prototype.responsePropertyList=function(){
var _9b=this.responseText();
if(CFPropertyList.sniffedFormatOfString(_9b)===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(this.responseXML());
}
return CFPropertyList.propertyListFromString(_9b);
};
CFHTTPRequest.prototype.responseText=function(){
return this._nativeRequest.responseText;
};
CFHTTPRequest.prototype.setRequestHeader=function(_9c,_9d){
this._requestHeaders[_9c]=_9d;
};
CFHTTPRequest.prototype.getResponseHeader=function(_9e){
return this._nativeRequest.getResponseHeader(_9e);
};
CFHTTPRequest.prototype.getAllResponseHeaders=function(){
return this._nativeRequest.getAllResponseHeaders();
};
CFHTTPRequest.prototype.overrideMimeType=function(_9f){
this._mimeType=_9f;
};
CFHTTPRequest.prototype.open=function(_a0,_a1,_a2,_a3,_a4){
this._isOpen=true;
this._URL=_a1;
this._async=_a2;
this._method=_a0;
this._user=_a3;
this._password=_a4;
return this._nativeRequest.open(_a0,_a1,_a2,_a3,_a4);
};
CFHTTPRequest.prototype.send=function(_a5){
if(!this._isOpen){
delete this._nativeRequest.onreadystatechange;
this._nativeRequest.open(this._method,this._URL,this._async,this._user,this._password);
this._nativeRequest.onreadystatechange=this._stateChangeHandler;
}
for(var i in this._requestHeaders){
if(this._requestHeaders.hasOwnProperty(i)){
this._nativeRequest.setRequestHeader(i,this._requestHeaders[i]);
}
}
if(this._mimeType&&"overrideMimeType" in this._nativeRequest){
this._nativeRequest.overrideMimeType(this._mimeType);
}
this._isOpen=false;
try{
return this._nativeRequest.send(_a5);
}
catch(anException){
this._eventDispatcher.dispatchEvent({type:"failure",request:this});
}
};
CFHTTPRequest.prototype.abort=function(){
this._isOpen=false;
return this._nativeRequest.abort();
};
CFHTTPRequest.prototype.addEventListener=function(_a6,_a7){
this._eventDispatcher.addEventListener(_a6,_a7);
};
CFHTTPRequest.prototype.removeEventListener=function(_a8,_a9){
this._eventDispatcher.removeEventListener(_a8,_a9);
};
function _aa(_ab){
var _ac=_ab._eventDispatcher;
_ac.dispatchEvent({type:"readystatechange",request:_ab});
var _ad=_ab._nativeRequest,_ae=["uninitialized","loading","loaded","interactive","complete"];
if(_ae[_ab.readyState()]==="complete"){
var _af="HTTP"+_ab.status();
_ac.dispatchEvent({type:_af,request:_ab});
var _b0=_ab.success()?"success":"failure";
_ac.dispatchEvent({type:_b0,request:_ab});
_ac.dispatchEvent({type:_ae[_ab.readyState()],request:_ab});
}else{
_ac.dispatchEvent({type:_ae[_ab.readyState()],request:_ab});
}
};
function _b1(_b2,_b3,_b4){
var _b5=new CFHTTPRequest();
if(_b2.pathExtension()==="plist"){
_b5.overrideMimeType("text/xml");
}
if(_2.asyncLoader){
_b5.onsuccess=_8c(_b3);
_b5.onfailure=_8c(_b4);
}else{
_b5.onsuccess=_b3;
_b5.onfailure=_b4;
}
_b5.open("GET",_b2.absoluteString(),_2.asyncLoader);
_b5.send("");
};
_2.asyncLoader=YES;
_2.Asynchronous=_8c;
_2.determineAndDispatchHTTPRequestEvents=_aa;
var _b6=0;
objj_generateObjectUID=function(){
return _b6++;
};
CFPropertyList=function(){
this._UID=objj_generateObjectUID();
};
CFPropertyList.DTDRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
CFPropertyList.XMLRE=/^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
CFPropertyList.FormatXMLDTD="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
CFPropertyList.Format280NorthMagicNumber="280NPLIST";
CFPropertyList.FormatOpenStep=1,CFPropertyList.FormatXML_v1_0=100,CFPropertyList.FormatBinary_v1_0=200,CFPropertyList.Format280North_v1_0=-1000;
CFPropertyList.sniffedFormatOfString=function(_b7){
if(_b7.match(CFPropertyList.XMLRE)){
return CFPropertyList.FormatXML_v1_0;
}
if(_b7.substr(0,CFPropertyList.Format280NorthMagicNumber.length)===CFPropertyList.Format280NorthMagicNumber){
return CFPropertyList.Format280North_v1_0;
}
return NULL;
};
CFPropertyList.dataFromPropertyList=function(_b8,_b9){
var _ba=new CFMutableData();
_ba.setRawString(CFPropertyList.stringFromPropertyList(_b8,_b9));
return _ba;
};
CFPropertyList.stringFromPropertyList=function(_bb,_bc){
if(!_bc){
_bc=CFPropertyList.Format280North_v1_0;
}
var _bd=_be[_bc];
return _bd["start"]()+_bf(_bb,_bd)+_bd["finish"]();
};
function _bf(_c0,_c1){
var _c2=typeof _c0,_c3=_c0.valueOf(),_c4=typeof _c3;
if(_c2!==_c4){
_c2=_c4;
_c0=_c3;
}
if(_c0===YES||_c0===NO){
_c2="boolean";
}else{
if(_c2==="number"){
if(FLOOR(_c0)===_c0){
_c2="integer";
}else{
_c2="real";
}
}else{
if(_c2!=="string"){
if(_c0.slice){
_c2="array";
}else{
_c2="dictionary";
}
}
}
}
return _c1[_c2](_c0,_c1);
};
var _be={};
_be[CFPropertyList.FormatXML_v1_0]={"start":function(){
return CFPropertyList.FormatXMLDTD+"<plist version = \"1.0\">";
},"finish":function(){
return "</plist>";
},"string":function(_c5){
return "<string>"+_c6(_c5)+"</string>";
},"boolean":function(_c7){
return _c7?"<true/>":"<false/>";
},"integer":function(_c8){
return "<integer>"+_c8+"</integer>";
},"real":function(_c9){
return "<real>"+_c9+"</real>";
},"array":function(_ca,_cb){
var _cc=0,_cd=_ca.length,_ce="<array>";
for(;_cc<_cd;++_cc){
_ce+=_bf(_ca[_cc],_cb);
}
return _ce+"</array>";
},"dictionary":function(_cf,_d0){
var _d1=_cf._keys,_95=0,_d2=_d1.length,_d3="<dict>";
for(;_95<_d2;++_95){
var key=_d1[_95];
_d3+="<key>"+key+"</key>";
_d3+=_bf(_cf.valueForKey(key),_d0);
}
return _d3+"</dict>";
}};
var _d4="A",_d5="D",_d6="f",_d7="d",_d8="S",_d9="T",_da="F",_db="K",_dc="E";
_be[CFPropertyList.Format280North_v1_0]={"start":function(){
return CFPropertyList.Format280NorthMagicNumber+";1.0;";
},"finish":function(){
return "";
},"string":function(_dd){
return _d8+";"+_dd.length+";"+_dd;
},"boolean":function(_de){
return (_de?_d9:_da)+";";
},"integer":function(_df){
var _e0=""+_df;
return _d7+";"+_e0.length+";"+_e0;
},"real":function(_e1){
var _e2=""+_e1;
return _d6+";"+_e2.length+";"+_e2;
},"array":function(_e3,_e4){
var _e5=0,_e6=_e3.length,_e7=_d4+";";
for(;_e5<_e6;++_e5){
_e7+=_bf(_e3[_e5],_e4);
}
return _e7+_dc+";";
},"dictionary":function(_e8,_e9){
var _ea=_e8._keys,_95=0,_eb=_ea.length,_ec=_d5+";";
for(;_95<_eb;++_95){
var key=_ea[_95];
_ec+=_db+";"+key.length+";"+key;
_ec+=_bf(_e8.valueForKey(key),_e9);
}
return _ec+_dc+";";
}};
var _ed="xml",_ee="#document",_ef="plist",_f0="key",_f1="dict",_f2="array",_f3="string",_f4="true",_f5="false",_f6="real",_f7="integer",_f8="data";
var _f9=function(_fa,_fb,_fc){
var _fd=_fa;
_fd=(_fd.firstChild);
if(_fd!==NULL&&((_fd.nodeType)===8||(_fd.nodeType)===3)){
while((_fd=(_fd.nextSibling))&&((_fd.nodeType)===8||(_fd.nodeType)===3)){
}
}
if(_fd){
return _fd;
}
if((String(_fa.nodeName))===_f2||(String(_fa.nodeName))===_f1){
_fc.pop();
}else{
if(_fd===_fb){
return NULL;
}
_fd=_fa;
while((_fd=(_fd.nextSibling))&&((_fd.nodeType)===8||(_fd.nodeType)===3)){
}
if(_fd){
return _fd;
}
}
_fd=_fa;
while(_fd){
var _fe=_fd;
while((_fe=(_fe.nextSibling))&&((_fe.nodeType)===8||(_fe.nodeType)===3)){
}
if(_fe){
return _fe;
}
var _fd=(_fd.parentNode);
if(_fb&&_fd===_fb){
return NULL;
}
_fc.pop();
}
return NULL;
};
CFPropertyList.propertyListFromData=function(_ff,_100){
return CFPropertyList.propertyListFromString(_ff.rawString(),_100);
};
CFPropertyList.propertyListFromString=function(_101,_102){
if(!_102){
_102=CFPropertyList.sniffedFormatOfString(_101);
}
if(_102===CFPropertyList.FormatXML_v1_0){
return CFPropertyList.propertyListFromXML(_101);
}
if(_102===CFPropertyList.Format280North_v1_0){
return _103(_101);
}
return NULL;
};
var _d4="A",_d5="D",_d6="f",_d7="d",_d8="S",_d9="T",_da="F",_db="K",_dc="E";
function _103(_104){
var _105=new _106(_104),_107=NULL,key="",_108=NULL,_109=NULL,_10a=[],_10b=NULL;
while(_107=_105.getMarker()){
if(_107===_dc){
_10a.pop();
continue;
}
var _10c=_10a.length;
if(_10c){
_10b=_10a[_10c-1];
}
if(_107===_db){
key=_105.getString();
_107=_105.getMarker();
}
switch(_107){
case _d4:
_108=[];
_10a.push(_108);
break;
case _d5:
_108=new CFMutableDictionary();
_10a.push(_108);
break;
case _d6:
_108=parseFloat(_105.getString());
break;
case _d7:
_108=parseInt(_105.getString(),10);
break;
case _d8:
_108=_105.getString();
break;
case _d9:
_108=YES;
break;
case _da:
_108=NO;
break;
default:
throw new Error("*** "+_107+" marker not recognized in Plist.");
}
if(!_109){
_109=_108;
}else{
if(_10b){
if(_10b.slice){
_10b.push(_108);
}else{
_10b.setValueForKey(key,_108);
}
}
}
}
return _109;
};
function _c6(_10d){
return _10d.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
function _10e(_10f){
return _10f.replace(/&quot;/g,"\"").replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
function _9a(_110){
if(window.DOMParser){
return (new window.DOMParser().parseFromString(_110,"text/xml").documentElement);
}else{
if(window.ActiveXObject){
XMLNode=new ActiveXObject("Microsoft.XMLDOM");
var _111=_110.match(CFPropertyList.DTDRE);
if(_111){
_110=_110.substr(_111[0].length);
}
XMLNode.loadXML(_110);
return XMLNode;
}
}
return NULL;
};
CFPropertyList.propertyListFromXML=function(_112){
var _113=_112;
if(_112.valueOf&&typeof _112.valueOf()==="string"){
_113=_9a(_112);
}
while(((String(_113.nodeName))===_ee)||((String(_113.nodeName))===_ed)){
_113=(_113.firstChild);
}
if(_113!==NULL&&((_113.nodeType)===8||(_113.nodeType)===3)){
while((_113=(_113.nextSibling))&&((_113.nodeType)===8||(_113.nodeType)===3)){
}
}
if(((_113.nodeType)===10)){
while((_113=(_113.nextSibling))&&((_113.nodeType)===8||(_113.nodeType)===3)){
}
}
if(!((String(_113.nodeName))===_ef)){
return NULL;
}
var key="",_114=NULL,_115=NULL,_116=_113,_117=[],_118=NULL;
while(_113=_f9(_113,_116,_117)){
var _119=_117.length;
if(_119){
_118=_117[_119-1];
}
if((String(_113.nodeName))===_f0){
key=((String((_113.firstChild).nodeValue)));
while((_113=(_113.nextSibling))&&((_113.nodeType)===8||(_113.nodeType)===3)){
}
}
switch(String((String(_113.nodeName)))){
case _f2:
_114=[];
_117.push(_114);
break;
case _f1:
_114=new CFMutableDictionary();
_117.push(_114);
break;
case _f6:
_114=parseFloat(((String((_113.firstChild).nodeValue))));
break;
case _f7:
_114=parseInt(((String((_113.firstChild).nodeValue))),10);
break;
case _f3:
if((_113.getAttribute("type")==="base64")){
_114=(_113.firstChild)?CFData.decodeBase64ToString(((String((_113.firstChild).nodeValue)))):"";
}else{
_114=_10e((_113.firstChild)?((String((_113.firstChild).nodeValue))):"");
}
break;
case _f4:
_114=YES;
break;
case _f5:
_114=NO;
break;
case _f8:
_114=new CFMutableData();
_114.bytes=(_113.firstChild)?CFData.decodeBase64ToArray(((String((_113.firstChild).nodeValue))),YES):[];
break;
default:
throw new Error("*** "+(String(_113.nodeName))+" tag not recognized in Plist.");
}
if(!_115){
_115=_114;
}else{
if(_118){
if(_118.slice){
_118.push(_114);
}else{
_118.setValueForKey(key,_114);
}
}
}
}
return _115;
};
kCFPropertyListOpenStepFormat=CFPropertyList.FormatOpenStep;
kCFPropertyListXMLFormat_v1_0=CFPropertyList.FormatXML_v1_0;
kCFPropertyListBinaryFormat_v1_0=CFPropertyList.FormatBinary_v1_0;
kCFPropertyList280NorthFormat_v1_0=CFPropertyList.Format280North_v1_0;
CFPropertyListCreate=function(){
return new CFPropertyList();
};
CFPropertyListCreateFromXMLData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateXMLData=function(_11a){
return CFPropertyList.dataFromPropertyList(_11a,CFPropertyList.FormatXML_v1_0);
};
CFPropertyListCreateFrom280NorthData=function(data){
return CFPropertyList.propertyListFromData(data,CFPropertyList.Format280North_v1_0);
};
CFPropertyListCreate280NorthData=function(_11b){
return CFPropertyList.dataFromPropertyList(_11b,CFPropertyList.Format280North_v1_0);
};
CPPropertyListCreateFromData=function(data,_11c){
return CFPropertyList.propertyListFromData(data,_11c);
};
CPPropertyListCreateData=function(_11d,_11e){
return CFPropertyList.dataFromPropertyList(_11d,_11e);
};
CFDictionary=function(_11f){
this._keys=[];
this._count=0;
this._buckets={};
this._UID=objj_generateObjectUID();
};
var _120=Array.prototype.indexOf,_7a=Object.prototype.hasOwnProperty;
CFDictionary.prototype.copy=function(){
return this;
};
CFDictionary.prototype.mutableCopy=function(){
var _121=new CFMutableDictionary(),keys=this._keys,_122=this._count;
_121._keys=keys.slice();
_121._count=_122;
var _123=0,_124=this._buckets,_125=_121._buckets;
for(;_123<_122;++_123){
var key=keys[_123];
_125[key]=_124[key];
}
return _121;
};
CFDictionary.prototype.containsKey=function(aKey){
return _7a.apply(this._buckets,[aKey]);
};
CFDictionary.prototype.containsValue=function(_126){
var keys=this._keys,_127=this._buckets,_95=0,_128=keys.length;
for(;_95<_128;++_95){
if(_127[keys[_95]]===_126){
return YES;
}
}
return NO;
};
CFDictionary.prototype.count=function(){
return this._count;
};
CFDictionary.prototype.countOfKey=function(aKey){
return this.containsKey(aKey)?1:0;
};
CFDictionary.prototype.countOfValue=function(_129){
var keys=this._keys,_12a=this._buckets,_95=0,_12b=keys.length,_12c=0;
for(;_95<_12b;++_95){
if(_12a[keys[_95]]===_129){
++_12c;
}
}
return _12c;
};
CFDictionary.prototype.keys=function(){
return this._keys.slice();
};
CFDictionary.prototype.valueForKey=function(aKey){
var _12d=this._buckets;
if(!_7a.apply(_12d,[aKey])){
return nil;
}
return _12d[aKey];
};
CFDictionary.prototype.toString=function(){
var _12e="{\n",keys=this._keys,_95=0,_12f=this._count;
for(;_95<_12f;++_95){
var key=keys[_95];
_12e+="\t"+key+" = \""+String(this.valueForKey(key)).split("\n").join("\n\t")+"\"\n";
}
return _12e+"}";
};
CFMutableDictionary=function(_130){
CFDictionary.apply(this,[]);
};
CFMutableDictionary.prototype=new CFDictionary();
CFMutableDictionary.prototype.copy=function(){
return this.mutableCopy();
};
CFMutableDictionary.prototype.addValueForKey=function(aKey,_131){
if(this.containsKey(aKey)){
return;
}
++this._count;
this._keys.push(aKey);
this._buckets[aKey]=_131;
};
CFMutableDictionary.prototype.removeValueForKey=function(aKey){
var _132=-1;
if(_120){
_132=_120.call(this._keys,aKey);
}else{
var keys=this._keys,_95=0,_133=keys.length;
for(;_95<_133;++_95){
if(keys[_95]===aKey){
_132=_95;
break;
}
}
}
if(_132===-1){
return;
}
--this._count;
this._keys.splice(_132,1);
delete this._buckets[aKey];
};
CFMutableDictionary.prototype.removeAllValues=function(){
this._count=0;
this._keys=[];
this._buckets={};
};
CFMutableDictionary.prototype.replaceValueForKey=function(aKey,_134){
if(!this.containsKey(aKey)){
return;
}
this._buckets[aKey]=_134;
};
CFMutableDictionary.prototype.setValueForKey=function(aKey,_135){
if(_135===nil||_135===_46){
this.removeValueForKey(aKey);
}else{
if(this.containsKey(aKey)){
this.replaceValueForKey(aKey,_135);
}else{
this.addValueForKey(aKey,_135);
}
}
};
CFData=function(){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFData.prototype.propertyList=function(){
if(!this._propertyList){
this._propertyList=CFPropertyList.propertyListFromString(this.rawString());
}
return this._propertyList;
};
CFData.prototype.JSONObject=function(){
if(!this._JSONObject){
try{
this._JSONObject=JSON.parse(this.rawString());
}
catch(anException){
}
}
return this._JSONObject;
};
CFData.prototype.rawString=function(){
if(this._rawString===NULL){
if(this._propertyList){
this._rawString=CFPropertyList.stringFromPropertyList(this._propertyList,this._propertyListFormat);
}else{
if(this._JSONObject){
this._rawString=JSON.stringify(this._JSONObject);
}else{
throw new Error("Can't convert data to string.");
}
}
}
return this._rawString;
};
CFData.prototype.bytes=function(){
return this._bytes;
};
CFData.prototype.base64=function(){
return this._base64;
};
CFMutableData=function(){
CFData.call(this);
};
CFMutableData.prototype=new CFData();
function _136(_137){
this._rawString=NULL;
this._propertyList=NULL;
this._propertyListFormat=NULL;
this._JSONObject=NULL;
this._bytes=NULL;
this._base64=NULL;
};
CFMutableData.prototype.setPropertyList=function(_138,_139){
_136(this);
this._propertyList=_138;
this._propertyListFormat=_139;
};
CFMutableData.prototype.setJSONObject=function(_13a){
_136(this);
this._JSONObject=_13a;
};
CFMutableData.prototype.setRawString=function(_13b){
_136(this);
this._rawString=_13b;
};
CFMutableData.prototype.setBytes=function(_13c){
_136(this);
this._bytes=_13c;
};
CFMutableData.prototype.setBase64String=function(_13d){
_136(this);
this._base64=_13d;
};
var _13e=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],_13f=[];
for(var i=0;i<_13e.length;i++){
_13f[_13e[i].charCodeAt(0)]=i;
}
CFData.decodeBase64ToArray=function(_140,_141){
if(_141){
_140=_140.replace(/[^A-Za-z0-9\+\/\=]/g,"");
}
var pad=(_140[_140.length-1]=="="?1:0)+(_140[_140.length-2]=="="?1:0),_142=_140.length,_143=[];
var i=0;
while(i<_142){
var bits=(_13f[_140.charCodeAt(i++)]<<18)|(_13f[_140.charCodeAt(i++)]<<12)|(_13f[_140.charCodeAt(i++)]<<6)|(_13f[_140.charCodeAt(i++)]);
_143.push((bits&16711680)>>16);
_143.push((bits&65280)>>8);
_143.push(bits&255);
}
if(pad>0){
return _143.slice(0,-1*pad);
}
return _143;
};
CFData.encodeBase64Array=function(_144){
var pad=(3-(_144.length%3))%3,_145=_144.length+pad,_146=[];
if(pad>0){
_144.push(0);
}
if(pad>1){
_144.push(0);
}
var i=0;
while(i<_145){
var bits=(_144[i++]<<16)|(_144[i++]<<8)|(_144[i++]);
_146.push(_13e[(bits&16515072)>>18]);
_146.push(_13e[(bits&258048)>>12]);
_146.push(_13e[(bits&4032)>>6]);
_146.push(_13e[bits&63]);
}
if(pad>0){
_146[_146.length-1]="=";
_144.pop();
}
if(pad>1){
_146[_146.length-2]="=";
_144.pop();
}
return _146.join("");
};
CFData.decodeBase64ToString=function(_147,_148){
return CFData.bytesToString(CFData.decodeBase64ToArray(_147,_148));
};
CFData.decodeBase64ToUtf16String=function(_149,_14a){
return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(_149,_14a));
};
CFData.bytesToString=function(_14b){
return String.fromCharCode.apply(NULL,_14b);
};
CFData.encodeBase64String=function(_14c){
var temp=[];
for(var i=0;i<_14c.length;i++){
temp.push(_14c.charCodeAt(i));
}
return CFData.encodeBase64Array(temp);
};
CFData.bytesToUtf16String=function(_14d){
var temp=[];
for(var i=0;i<_14d.length;i+=2){
temp.push(_14d[i+1]<<8|_14d[i]);
}
return String.fromCharCode.apply(NULL,temp);
};
CFData.encodeBase64Utf16String=function(_14e){
var temp=[];
for(var i=0;i<_14e.length;i++){
var c=_14e.charCodeAt(i);
temp.push(_14e.charCodeAt(i)&255);
temp.push((_14e.charCodeAt(i)&65280)>>8);
}
return CFData.encodeBase64Array(temp);
};
var _14f,_150,_151=0;
function _152(){
if(++_151!==1){
return;
}
_14f={};
_150={};
};
function _153(){
_151=MAX(_151-1,0);
if(_151!==0){
return;
}
delete _14f;
delete _150;
};
var _154=new RegExp("^"+"(?:"+"([^:/?#]+):"+")?"+"(?:"+"(//)"+"("+"(?:"+"("+"([^:@]*)"+":?"+"([^:@]*)"+")?"+"@"+")?"+"([^:/?#]*)"+"(?::(\\d*))?"+")"+")?"+"([^?#]*)"+"(?:\\?([^#]*))?"+"(?:#(.*))?");
var _155=["url","scheme","authorityRoot","authority","userInfo","user","password","domain","portNumber","path","queryString","fragment"];
function _156(aURL){
if(aURL._parts){
return aURL._parts;
}
var _157=aURL.string(),_158=_157.match(/^mhtml:/);
if(_158){
_157=_157.substr("mhtml:".length);
}
if(_151>0&&_7a.call(_150,_157)){
aURL._parts=_150[_157];
return aURL._parts;
}
aURL._parts={};
var _159=aURL._parts,_15a=_154.exec(_157),_95=_15a.length;
while(_95--){
_159[_155[_95]]=_15a[_95]||NULL;
}
_159.portNumber=parseInt(_159.portNumber,10);
if(isNaN(_159.portNumber)){
_159.portNumber=-1;
}
_159.pathComponents=[];
if(_159.path){
var _15b=_159.path.split("/"),_15c=_159.pathComponents,_95=0,_15d=_15b.length;
for(;_95<_15d;++_95){
var _15e=_15b[_95];
if(_15e){
_15c.push(_15e);
}else{
if(_95===0){
_15c.push("/");
}
}
}
_159.pathComponents=_15c;
}
if(_158){
_159.url="mhtml:"+_159.url;
_159.scheme="mhtml:"+_159.scheme;
}
if(_151>0){
_150[_157]=_159;
}
return _159;
};
CFURL=function(aURL,_15f){
aURL=aURL||"";
if(aURL instanceof CFURL){
if(!_15f){
return aURL;
}
var _160=aURL.baseURL();
if(_160){
_15f=new CFURL(_160.absoluteURL(),_15f);
}
aURL=aURL.string();
}
if(_151>0){
var _161=aURL+" "+(_15f&&_15f.UID()||"");
if(_7a.call(_14f,_161)){
return _14f[_161];
}
_14f[_161]=this;
}
if(aURL.match(/^data:/)){
var _162={},_95=_155.length;
while(_95--){
_162[_155[_95]]="";
}
_162.url=aURL;
_162.scheme="data";
_162.pathComponents=[];
this._parts=_162;
this._standardizedURL=this;
this._absoluteURL=this;
}
this._UID=objj_generateObjectUID();
this._string=aURL;
this._baseURL=_15f;
};
CFURL.prototype.UID=function(){
return this._UID;
};
var _163={};
CFURL.prototype.mappedURL=function(){
return _163[this.absoluteString()]||this;
};
CFURL.setMappedURLForURL=function(_164,_165){
_163[_164.absoluteString()]=_165;
};
CFURL.prototype.schemeAndAuthority=function(){
var _166="",_167=this.scheme();
if(_167){
_166+=_167+":";
}
var _168=this.authority();
if(_168){
_166+="//"+_168;
}
return _166;
};
CFURL.prototype.absoluteString=function(){
if(this._absoluteString===_46){
this._absoluteString=this.absoluteURL().string();
}
return this._absoluteString;
};
CFURL.prototype.toString=function(){
return this.absoluteString();
};
function _169(aURL){
aURL=aURL.standardizedURL();
var _16a=aURL.baseURL();
if(!_16a){
return aURL;
}
var _16b=((aURL)._parts||_156(aURL)),_16c,_16d=_16a.absoluteURL(),_16e=((_16d)._parts||_156(_16d));
if(_16b.scheme||_16b.authority){
_16c=_16b;
}else{
_16c={};
_16c.scheme=_16e.scheme;
_16c.authority=_16e.authority;
_16c.userInfo=_16e.userInfo;
_16c.user=_16e.user;
_16c.password=_16e.password;
_16c.domain=_16e.domain;
_16c.portNumber=_16e.portNumber;
_16c.queryString=_16b.queryString;
_16c.fragment=_16b.fragment;
var _16f=_16b.pathComponents;
if(_16f.length&&_16f[0]==="/"){
_16c.path=_16b.path;
_16c.pathComponents=_16f;
}else{
var _170=_16e.pathComponents,_171=_170.concat(_16f);
if(!_16a.hasDirectoryPath()&&_170.length){
_171.splice(_170.length-1,1);
}
if(_16f.length&&(_16f[0]===".."||_16f[0]===".")){
_172(_171,YES);
}
_16c.pathComponents=_171;
_16c.path=_173(_171,_16f.length<=0||aURL.hasDirectoryPath());
}
}
var _174=_175(_16c),_176=new CFURL(_174);
_176._parts=_16c;
_176._standardizedURL=_176;
_176._standardizedString=_174;
_176._absoluteURL=_176;
_176._absoluteString=_174;
return _176;
};
function _173(_177,_178){
var path=_177.join("/");
if(path.length&&path.charAt(0)==="/"){
path=path.substr(1);
}
if(_178){
path+="/";
}
return path;
};
function _172(_179,_17a){
var _17b=0,_17c=0,_17d=_179.length,_17e=_17a?_179:[],_17f=NO;
for(;_17b<_17d;++_17b){
var _180=_179[_17b];
if(_180===""){
continue;
}
if(_180==="."){
_17f=_17c===0;
continue;
}
if(_180!==".."||_17c===0||_17e[_17c-1]===".."){
_17e[_17c]=_180;
_17c++;
continue;
}
if(_17c>0&&_17e[_17c-1]!=="/"){
--_17c;
}
}
if(_17f&&_17c===0){
_17e[_17c++]=".";
}
_17e.length=_17c;
return _17e;
};
function _175(_181){
var _182="",_183=_181.scheme;
if(_183){
_182+=_183+":";
}
var _184=_181.authority;
if(_184){
_182+="//"+_184;
}
_182+=_181.path;
var _185=_181.queryString;
if(_185){
_182+="?"+_185;
}
var _186=_181.fragment;
if(_186){
_182+="#"+_186;
}
return _182;
};
CFURL.prototype.absoluteURL=function(){
if(this._absoluteURL===_46){
this._absoluteURL=_169(this);
}
return this._absoluteURL;
};
CFURL.prototype.standardizedURL=function(){
if(this._standardizedURL===_46){
var _187=((this)._parts||_156(this)),_188=_187.pathComponents,_189=_172(_188,NO);
var _18a=_173(_189,this.hasDirectoryPath());
if(_187.path===_18a){
this._standardizedURL=this;
}else{
var _18b=_18c(_187);
_18b.pathComponents=_189;
_18b.path=_18a;
var _18d=new CFURL(_175(_18b),this.baseURL());
_18d._parts=_18b;
_18d._standardizedURL=_18d;
this._standardizedURL=_18d;
}
}
return this._standardizedURL;
};
function _18c(_18e){
var _18f={},_190=_155.length;
while(_190--){
var _191=_155[_190];
_18f[_191]=_18e[_191];
}
return _18f;
};
CFURL.prototype.string=function(){
return this._string;
};
CFURL.prototype.authority=function(){
var _192=((this)._parts||_156(this)).authority;
if(_192){
return _192;
}
var _193=this.baseURL();
return _193&&_193.authority()||"";
};
CFURL.prototype.hasDirectoryPath=function(){
var _194=this._hasDirectoryPath;
if(_194===_46){
var path=this.path();
if(!path){
return NO;
}
if(path.charAt(path.length-1)==="/"){
return YES;
}
var _195=this.lastPathComponent();
_194=_195==="."||_195==="..";
this._hasDirectoryPath=_194;
}
return _194;
};
CFURL.prototype.hostName=function(){
return this.authority();
};
CFURL.prototype.fragment=function(){
return ((this)._parts||_156(this)).fragment;
};
CFURL.prototype.lastPathComponent=function(){
if(this._lastPathComponent===_46){
var _196=this.pathComponents(),_197=_196.length;
if(!_197){
this._lastPathComponent="";
}else{
this._lastPathComponent=_196[_197-1];
}
}
return this._lastPathComponent;
};
CFURL.prototype.path=function(){
return ((this)._parts||_156(this)).path;
};
CFURL.prototype.pathComponents=function(){
return ((this)._parts||_156(this)).pathComponents;
};
CFURL.prototype.pathExtension=function(){
var _198=this.lastPathComponent();
if(!_198){
return NULL;
}
_198=_198.replace(/^\.*/,"");
var _199=_198.lastIndexOf(".");
return _199<=0?"":_198.substring(_199+1);
};
CFURL.prototype.queryString=function(){
return ((this)._parts||_156(this)).queryString;
};
CFURL.prototype.scheme=function(){
var _19a=this._scheme;
if(_19a===_46){
_19a=((this)._parts||_156(this)).scheme;
if(!_19a){
var _19b=this.baseURL();
_19a=_19b&&_19b.scheme();
}
this._scheme=_19a;
}
return _19a;
};
CFURL.prototype.user=function(){
return ((this)._parts||_156(this)).user;
};
CFURL.prototype.password=function(){
return ((this)._parts||_156(this)).password;
};
CFURL.prototype.portNumber=function(){
return ((this)._parts||_156(this)).portNumber;
};
CFURL.prototype.domain=function(){
return ((this)._parts||_156(this)).domain;
};
CFURL.prototype.baseURL=function(){
return this._baseURL;
};
CFURL.prototype.asDirectoryPathURL=function(){
if(this.hasDirectoryPath()){
return this;
}
var _19c=this.lastPathComponent();
if(_19c!=="/"){
_19c="./"+_19c;
}
return new CFURL(_19c+"/",this);
};
function _19d(aURL){
if(!aURL._resourcePropertiesForKeys){
aURL._resourcePropertiesForKeys=new CFMutableDictionary();
}
return aURL._resourcePropertiesForKeys;
};
CFURL.prototype.resourcePropertyForKey=function(aKey){
return _19d(this).valueForKey(aKey);
};
CFURL.prototype.setResourcePropertyForKey=function(aKey,_19e){
_19d(this).setValueForKey(aKey,_19e);
};
CFURL.prototype.staticResourceData=function(){
var data=new CFMutableData();
data.setRawString(_19f.resourceAtURL(this).contents());
return data;
};
function _106(_1a0){
this._string=_1a0;
var _1a1=_1a0.indexOf(";");
this._magicNumber=_1a0.substr(0,_1a1);
this._location=_1a0.indexOf(";",++_1a1);
this._version=_1a0.substring(_1a1,this._location++);
};
_106.prototype.magicNumber=function(){
return this._magicNumber;
};
_106.prototype.version=function(){
return this._version;
};
_106.prototype.getMarker=function(){
var _1a2=this._string,_1a3=this._location;
if(_1a3>=_1a2.length){
return null;
}
var next=_1a2.indexOf(";",_1a3);
if(next<0){
return null;
}
var _1a4=_1a2.substring(_1a3,next);
if(_1a4==="e"){
return null;
}
this._location=next+1;
return _1a4;
};
_106.prototype.getString=function(){
var _1a5=this._string,_1a6=this._location;
if(_1a6>=_1a5.length){
return null;
}
var next=_1a5.indexOf(";",_1a6);
if(next<0){
return null;
}
var size=parseInt(_1a5.substring(_1a6,next),10),text=_1a5.substr(next+1,size);
this._location=next+1+size;
return text;
};
var _1a7=0,_1a8=1<<0,_1a9=1<<1,_1aa=1<<2,_1ab=1<<3,_1ac=1<<4;
var _1ad={},_1ae={},_1af=new Date().getTime(),_1b0=0,_1b1=0;
CFBundle=function(aURL){
aURL=_1b2(aURL).asDirectoryPathURL();
var _1b3=aURL.absoluteString(),_1b4=_1ad[_1b3];
if(_1b4){
return _1b4;
}
_1ad[_1b3]=this;
this._bundleURL=aURL;
this._resourcesDirectoryURL=new CFURL("Resources/",aURL);
this._staticResource=NULL;
this._isValid=NO;
this._loadStatus=_1a7;
this._loadRequests=[];
this._infoDictionary=new CFDictionary();
this._eventDispatcher=new _75(this);
};
CFBundle.environments=function(){
return ["Browser","ObjJ"];
};
CFBundle.bundleContainingURL=function(aURL){
aURL=new CFURL(".",_1b2(aURL));
var _1b5,_1b6=aURL.absoluteString();
while(!_1b5||_1b5!==_1b6){
var _1b7=_1ad[_1b6];
if(_1b7&&_1b7._isValid){
return _1b7;
}
aURL=new CFURL("..",aURL);
_1b5=_1b6;
_1b6=aURL.absoluteString();
}
return NULL;
};
CFBundle.mainBundle=function(){
return new CFBundle(_1b8);
};
function _1b9(_1ba,_1bb){
if(_1bb){
_1ae[_1ba.name]=_1bb;
}
};
CFBundle.bundleForClass=function(_1bc){
return _1ae[_1bc.name]||CFBundle.mainBundle();
};
CFBundle.prototype.bundleURL=function(){
return this._bundleURL;
};
CFBundle.prototype.resourcesDirectoryURL=function(){
return this._resourcesDirectoryURL;
};
CFBundle.prototype.resourceURL=function(_1bd,_1be,_1bf){
if(_1be){
_1bd=_1bd+"."+_1be;
}
if(_1bf){
_1bd=_1bf+"/"+_1bd;
}
var _1c0=(new CFURL(_1bd,this.resourcesDirectoryURL())).mappedURL();
return _1c0.absoluteURL();
};
CFBundle.prototype.mostEligibleEnvironmentURL=function(){
if(this._mostEligibleEnvironmentURL===_46){
this._mostEligibleEnvironmentURL=new CFURL(this.mostEligibleEnvironment()+".environment/",this.bundleURL());
}
return this._mostEligibleEnvironmentURL;
};
CFBundle.prototype.executableURL=function(){
if(this._executableURL===_46){
var _1c1=this.valueForInfoDictionaryKey("CPBundleExecutable");
if(!_1c1){
this._executableURL=NULL;
}else{
this._executableURL=new CFURL(_1c1,this.mostEligibleEnvironmentURL());
}
}
return this._executableURL;
};
CFBundle.prototype.infoDictionary=function(){
return this._infoDictionary;
};
CFBundle.prototype.valueForInfoDictionaryKey=function(aKey){
return this._infoDictionary.valueForKey(aKey);
};
CFBundle.prototype.hasSpritedImages=function(){
var _1c2=this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites")||[],_95=_1c2.length,_1c3=this.mostEligibleEnvironment();
while(_95--){
if(_1c2[_95]===_1c3){
return YES;
}
}
return NO;
};
CFBundle.prototype.environments=function(){
return this._infoDictionary.valueForKey("CPBundleEnvironments")||["ObjJ"];
};
CFBundle.prototype.mostEligibleEnvironment=function(_1c4){
_1c4=_1c4||this.environments();
var _1c5=CFBundle.environments(),_95=0,_1c6=_1c5.length,_1c7=_1c4.length;
for(;_95<_1c6;++_95){
var _1c8=0,_1c9=_1c5[_95];
for(;_1c8<_1c7;++_1c8){
if(_1c9===_1c4[_1c8]){
return _1c9;
}
}
}
return NULL;
};
CFBundle.prototype.isLoading=function(){
return this._loadStatus&_1a8;
};
CFBundle.prototype.isLoaded=function(){
return this._loadStatus&_1ac;
};
CFBundle.prototype.load=function(_1ca){
if(this._loadStatus!==_1a7){
return;
}
this._loadStatus=_1a8|_1a9;
var self=this,_1cb=this.bundleURL(),_1cc=new CFURL("..",_1cb);
if(_1cc.absoluteString()===_1cb.absoluteString()){
_1cc=_1cc.schemeAndAuthority();
}
_19f.resolveResourceAtURL(_1cc,YES,function(_1cd){
var _1ce=_1cb.absoluteURL().lastPathComponent();
self._staticResource=_1cd._children[_1ce]||new _19f(_1cb,_1cd,YES,NO);
function _1cf(_1d0){
self._loadStatus&=~_1a9;
var _1d1=_1d0.request.responsePropertyList();
self._isValid=!!_1d1||CFBundle.mainBundle()===self;
if(_1d1){
self._infoDictionary=_1d1;
}
if(!self._infoDictionary){
_1d3(self,new Error("Could not load bundle at \""+path+"\""));
return;
}
if(self===CFBundle.mainBundle()&&self.valueForInfoDictionaryKey("CPApplicationSize")){
_1b1=self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable")||0;
}
_1d7(self,_1ca);
};
function _1d2(){
self._isValid=CFBundle.mainBundle()===self;
self._loadStatus=_1a7;
_1d3(self,new Error("Could not load bundle at \""+self.bundleURL()+"\""));
};
new _b1(new CFURL("Info.plist",self.bundleURL()),_1cf,_1d2);
});
};
function _1d3(_1d4,_1d5){
_1d6(_1d4._staticResource);
_1d4._eventDispatcher.dispatchEvent({type:"error",error:_1d5,bundle:_1d4});
};
function _1d7(_1d8,_1d9){
if(!_1d8.mostEligibleEnvironment()){
return _1da();
}
_1db(_1d8,_1dc,_1da);
_1dd(_1d8,_1dc,_1da);
if(_1d8._loadStatus===_1a8){
return _1dc();
}
function _1da(_1de){
var _1df=_1d8._loadRequests,_1e0=_1df.length;
while(_1e0--){
_1df[_1e0].abort();
}
this._loadRequests=[];
_1d8._loadStatus=_1a7;
_1d3(_1d8,_1de||new Error("Could not recognize executable code format in Bundle "+_1d8));
};
function _1dc(){
if((typeof CPApp==="undefined"||!CPApp||!CPApp._finishedLaunching)&&typeof OBJJ_PROGRESS_CALLBACK==="function"&&_1b1){
OBJJ_PROGRESS_CALLBACK(MAX(MIN(1,_1b0/_1b1),0),_1b1,_1d8.bundlePath());
}
if(_1d8._loadStatus===_1a8){
_1d8._loadStatus=_1ac;
}else{
return;
}
_1d6(_1d8._staticResource);
function _1e1(){
_1d8._eventDispatcher.dispatchEvent({type:"load",bundle:_1d8});
};
if(_1d9){
_1e2(_1d8,_1e1);
}else{
_1e1();
}
};
};
function _1db(_1e3,_1e4,_1e5){
var _1e6=_1e3.executableURL();
if(!_1e6){
return;
}
_1e3._loadStatus|=_1aa;
new _b1(_1e6,function(_1e7){
try{
_1b0+=_1e7.request.responseText().length;
_1e8(_1e3,_1e7.request.responseText(),_1e6);
_1e3._loadStatus&=~_1aa;
_1e4();
}
catch(anException){
_1e5(anException);
}
},_1e5);
};
function _1e9(_1ea){
return "mhtml:"+new CFURL("MHTMLTest.txt",_1ea.mostEligibleEnvironmentURL());
};
function _1eb(_1ec){
if(_1ed===_1ee){
return new CFURL("dataURLs.txt",_1ec.mostEligibleEnvironmentURL());
}
if(_1ed===_1ef||_1ed===_1f0){
return new CFURL("MHTMLPaths.txt",_1ec.mostEligibleEnvironmentURL());
}
return NULL;
};
function _1dd(_1f1,_1f2,_1f3){
if(!_1f1.hasSpritedImages()){
return;
}
_1f1._loadStatus|=_1ab;
if(!_1f4()){
return _1f5(_1e9(_1f1),function(){
_1dd(_1f1,_1f2,_1f3);
});
}
var _1f6=_1eb(_1f1);
if(!_1f6){
_1f1._loadStatus&=~_1ab;
return _1f2();
}
new _b1(_1f6,function(_1f7){
try{
_1b0+=_1f7.request.responseText().length;
_1e8(_1f1,_1f7.request.responseText(),_1f6);
_1f1._loadStatus&=~_1ab;
}
catch(anException){
_1f3(anException);
}
_1f2();
},_1f3);
};
var _1f8=[],_1ed=-1,_1f9=0,_1ee=1,_1ef=2,_1f0=3;
function _1f4(){
return _1ed!==-1;
};
function _1f5(_1fa,_1fb){
if(_1f4()){
return;
}
_1f8.push(_1fb);
if(_1f8.length>1){
return;
}
_1f8.push(function(){
var size=0,_1fc=CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
if(!_1fc){
return;
}
switch(_1ed){
case _1ee:
size=_1fc.valueForKey("data");
break;
case _1ef:
case _1f0:
size=_1fc.valueForKey("mhtml");
break;
}
_1b1+=size;
});
_1fd([_1ee,"data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",_1ef,_1fa+"!test",_1f0,_1fa+"?"+_1af+"!test"]);
};
function _1fe(){
var _1ff=_1f8.length;
while(_1ff--){
_1f8[_1ff]();
}
};
function _1fd(_200){
if(_200.length<2){
_1ed=_1f9;
_1fe();
return;
}
var _201=new Image();
_201.onload=function(){
if(_201.width===1&&_201.height===1){
_1ed=_200[0];
_1fe();
}else{
_201.onerror();
}
};
_201.onerror=function(){
_1fd(_200.slice(2));
};
_201.src=_200[1];
};
function _1e2(_202,_203){
var _204=[_202._staticResource];
function _205(_206){
for(;_206<_204.length;++_206){
var _207=_204[_206];
if(_207.isNotFound()){
continue;
}
if(_207.isFile()){
var _208=new _320(_207.URL());
if(_208.hasLoadedFileDependencies()){
_208.execute();
}else{
_208.loadFileDependencies(function(){
_205(_206);
});
return;
}
}else{
if(_207.URL().absoluteString()===_202.resourcesDirectoryURL().absoluteString()){
continue;
}
var _209=_207.children();
for(var name in _209){
if(_7a.call(_209,name)){
_204.push(_209[name]);
}
}
}
}
_203();
};
_205(0);
};
var _20a="@STATIC",_20b="p",_20c="u",_20d="c",_20e="t",_20f="I",_210="i";
function _1e8(_211,_212,_213){
var _214=new _106(_212);
if(_214.magicNumber()!==_20a){
throw new Error("Could not read static file: "+_213);
}
if(_214.version()!=="1.0"){
throw new Error("Could not read static file: "+_213);
}
var _215,_216=_211.bundleURL(),file=NULL;
while(_215=_214.getMarker()){
var text=_214.getString();
if(_215===_20b){
var _217=new CFURL(text,_216),_218=_19f.resourceAtURL(new CFURL(".",_217),YES);
file=new _19f(_217,_218,NO,YES);
}else{
if(_215===_20c){
var URL=new CFURL(text,_216),_219=_214.getString();
if(_219.indexOf("mhtml:")===0){
_219="mhtml:"+new CFURL(_219.substr("mhtml:".length),_216);
if(_1ed===_1f0){
var _21a=_219.indexOf("!"),_21b=_219.substring(0,_21a),_21c=_219.substring(_21a);
_219=_21b+"?"+_1af+_21c;
}
}
CFURL.setMappedURLForURL(URL,new CFURL(_219));
var _218=_19f.resourceAtURL(new CFURL(".",URL),YES);
new _19f(URL,_218,NO,YES);
}else{
if(_215===_20e){
file.write(text);
}
}
}
}
};
CFBundle.prototype.addEventListener=function(_21d,_21e){
this._eventDispatcher.addEventListener(_21d,_21e);
};
CFBundle.prototype.removeEventListener=function(_21f,_220){
this._eventDispatcher.removeEventListener(_21f,_220);
};
CFBundle.prototype.onerror=function(_221){
throw _221.error;
};
CFBundle.prototype.bundlePath=function(){
return this._bundleURL.absoluteURL().path();
};
CFBundle.prototype.path=function(){
CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
return this.bundlePath.apply(this,arguments);
};
CFBundle.prototype.pathForResource=function(_222){
return this.resourceURL(_222).absoluteString();
};
var _223={};
function _19f(aURL,_224,_225,_226){
this._parent=_224;
this._eventDispatcher=new _75(this);
var name=aURL.absoluteURL().lastPathComponent()||aURL.schemeAndAuthority();
this._name=name;
this._URL=aURL;
this._isResolved=!!_226;
if(_225){
this._URL=this._URL.asDirectoryPathURL();
}
if(!_224){
_223[name]=this;
}
this._isDirectory=!!_225;
this._isNotFound=NO;
if(_224){
_224._children[name]=this;
}
if(_225){
this._children={};
}else{
this._contents="";
}
};
_19f.rootResources=function(){
return _223;
};
_2.StaticResource=_19f;
function _1d6(_227){
_227._isResolved=YES;
_227._eventDispatcher.dispatchEvent({type:"resolve",staticResource:_227});
};
_19f.prototype.resolve=function(){
if(this.isDirectory()){
var _228=new CFBundle(this.URL());
_228.onerror=function(){
};
_228.load(NO);
}else{
var self=this;
function _229(_22a){
self._contents=_22a.request.responseText();
_1d6(self);
};
function _22b(){
self._isNotFound=YES;
_1d6(self);
};
new _b1(this.URL(),_229,_22b);
}
};
_19f.prototype.name=function(){
return this._name;
};
_19f.prototype.URL=function(){
return this._URL;
};
_19f.prototype.contents=function(){
return this._contents;
};
_19f.prototype.children=function(){
return this._children;
};
_19f.prototype.parent=function(){
return this._parent;
};
_19f.prototype.isResolved=function(){
return this._isResolved;
};
_19f.prototype.write=function(_22c){
this._contents+=_22c;
};
function _22d(_22e){
var _22f=_22e.schemeAndAuthority(),_230=_223[_22f];
if(!_230){
_230=new _19f(new CFURL(_22f),NULL,YES,YES);
}
return _230;
};
_19f.resourceAtURL=function(aURL,_231){
aURL=_1b2(aURL).absoluteURL();
var _232=_22d(aURL),_233=aURL.pathComponents(),_95=0,_234=_233.length;
for(;_95<_234;++_95){
var name=_233[_95];
if(_7a.call(_232._children,name)){
_232=_232._children[name];
}else{
if(_231){
if(name!=="/"){
name="./"+name;
}
_232=new _19f(new CFURL(name,_232.URL()),_232,YES,YES);
}else{
throw new Error("Static Resource at "+aURL+" is not resolved (\""+name+"\")");
}
}
}
return _232;
};
_19f.prototype.resourceAtURL=function(aURL,_235){
return _19f.resourceAtURL(new CFURL(aURL,this.URL()),_235);
};
_19f.resolveResourceAtURL=function(aURL,_236,_237){
aURL=_1b2(aURL).absoluteURL();
_238(_22d(aURL),_236,aURL.pathComponents(),0,_237);
};
_19f.prototype.resolveResourceAtURL=function(aURL,_239,_23a){
_19f.resolveResourceAtURL(new CFURL(aURL,this.URL()).absoluteURL(),_239,_23a);
};
function _238(_23b,_23c,_23d,_23e,_23f){
var _240=_23d.length;
for(;_23e<_240;++_23e){
var name=_23d[_23e],_241=_7a.call(_23b._children,name)&&_23b._children[name];
if(!_241){
_241=new _19f(new CFURL(name,_23b.URL()),_23b,_23e+1<_240||_23c,NO);
_241.resolve();
}
if(!_241.isResolved()){
return _241.addEventListener("resolve",function(){
_238(_23b,_23c,_23d,_23e,_23f);
});
}
if(_241.isNotFound()){
return _23f(null,new Error("File not found: "+_23d.join("/")));
}
if((_23e+1<_240)&&_241.isFile()){
return _23f(null,new Error("File is not a directory: "+_23d.join("/")));
}
_23b=_241;
}
_23f(_23b);
};
function _242(aURL,_243,_244){
var _245=_19f.includeURLs(),_246=new CFURL(aURL,_245[_243]).absoluteURL();
_19f.resolveResourceAtURL(_246,NO,function(_247){
if(!_247){
if(_243+1<_245.length){
_242(aURL,_243+1,_244);
}else{
_244(NULL);
}
return;
}
_244(_247);
});
};
_19f.resolveResourceAtURLSearchingIncludeURLs=function(aURL,_248){
_242(aURL,0,_248);
};
_19f.prototype.addEventListener=function(_249,_24a){
this._eventDispatcher.addEventListener(_249,_24a);
};
_19f.prototype.removeEventListener=function(_24b,_24c){
this._eventDispatcher.removeEventListener(_24b,_24c);
};
_19f.prototype.isNotFound=function(){
return this._isNotFound;
};
_19f.prototype.isFile=function(){
return !this._isDirectory;
};
_19f.prototype.isDirectory=function(){
return this._isDirectory;
};
_19f.prototype.toString=function(_24d){
if(this.isNotFound()){
return "<file not found: "+this.name()+">";
}
var _24e=this.name();
if(this.isDirectory()){
var _24f=this._children;
for(var name in _24f){
if(_24f.hasOwnProperty(name)){
var _250=_24f[name];
if(_24d||!_250.isNotFound()){
_24e+="\n\t"+_24f[name].toString(_24d).split("\n").join("\n\t");
}
}
}
}
return _24e;
};
var _251=NULL;
_19f.includeURLs=function(){
if(_252){
return _252;
}
var _252=[];
if(!_1.OBJJ_INCLUDE_PATHS&&!_1.OBJJ_INCLUDE_URLS){
_252=["Frameworks","Frameworks/Debug"];
}else{
_252=(_1.OBJJ_INCLUDE_PATHS||[]).concat(_1.OBJJ_INCLUDE_URLS||[]);
}
var _253=_252.length;
while(_253--){
_252[_253]=new CFURL(_252[_253]).asDirectoryPathURL();
}
return _252;
};
var _254="accessors",_255="class",_256="end",_257="function",_258="implementation",_259="import",_25a="each",_25b="outlet",_25c="action",_25d="new",_25e="selector",_25f="super",_260="var",_261="in",_262="pragma",_263="mark",_264="=",_265="+",_266="-",_267=":",_268=",",_269=".",_26a="*",_26b=";",_26c="<",_26d="{",_26e="}",_26f=">",_270="[",_271="\"",_272="@",_273="#",_274="]",_275="?",_276="(",_277=")",_278=/^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,_279=/^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,_27a=/^[a-zA-Z_$](\w|$)*$/;
function _27b(_27c){
this._index=-1;
this._tokens=(_27c+"\n").match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
this._context=[];
return this;
};
_27b.prototype.push=function(){
this._context.push(this._index);
};
_27b.prototype.pop=function(){
this._index=this._context.pop();
};
_27b.prototype.peek=function(_27d){
if(_27d){
this.push();
var _27e=this.skip_whitespace();
this.pop();
return _27e;
}
return this._tokens[this._index+1];
};
_27b.prototype.next=function(){
return this._tokens[++this._index];
};
_27b.prototype.previous=function(){
return this._tokens[--this._index];
};
_27b.prototype.last=function(){
if(this._index<0){
return NULL;
}
return this._tokens[this._index-1];
};
_27b.prototype.skip_whitespace=function(_27f){
var _280;
if(_27f){
while((_280=this.previous())&&_278.test(_280)){
}
}else{
while((_280=this.next())&&_278.test(_280)){
}
}
return _280;
};
_2.Lexer=_27b;
function _281(){
this.atoms=[];
};
_281.prototype.toString=function(){
return this.atoms.join("");
};
_2.preprocess=function(_282,aURL,_283){
return new _284(_282,aURL,_283).executable();
};
_2.eval=function(_285){
return eval(_2.preprocess(_285).code());
};
var _284=function(_286,aURL,_287){
this._URL=new CFURL(aURL);
_286=_286.replace(/^#[^\n]+\n/,"\n");
this._currentSelector="";
this._currentClass="";
this._currentSuperClass="";
this._currentSuperMetaClass="";
this._buffer=new _281();
this._preprocessed=NULL;
this._dependencies=[];
this._tokens=new _27b(_286);
this._flags=_287;
this._classMethod=false;
this._executable=NULL;
this._classLookupTable={};
this._classVars={};
var _288=new objj_class();
for(var i in _288){
this._classVars[i]=1;
}
this.preprocess(this._tokens,this._buffer);
};
_284.prototype.setClassInfo=function(_289,_28a,_28b){
this._classLookupTable[_289]={superClassName:_28a,ivars:_28b};
};
_284.prototype.getClassInfo=function(_28c){
return this._classLookupTable[_28c];
};
_284.prototype.allIvarNamesForClassName=function(_28d){
var _28e={},_28f=this.getClassInfo(_28d);
while(_28f){
for(var i in _28f.ivars){
_28e[i]=1;
}
_28f=this.getClassInfo(_28f.superClassName);
}
return _28e;
};
_2.Preprocessor=_284;
_284.Flags={};
_284.Flags.IncludeDebugSymbols=1<<0;
_284.Flags.IncludeTypeSignatures=1<<1;
_284.prototype.executable=function(){
if(!this._executable){
this._executable=new _290(this._buffer.toString(),this._dependencies,this._URL);
}
return this._executable;
};
_284.prototype.accessors=function(_291){
var _292=_291.skip_whitespace(),_293={};
if(_292!=_276){
_291.previous();
return _293;
}
while((_292=_291.skip_whitespace())!=_277){
var name=_292,_294=true;
if(!/^\w+$/.test(name)){
throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
}
if((_292=_291.skip_whitespace())==_264){
_294=_291.skip_whitespace();
if(!/^\w+$/.test(_294)){
throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
}
if(name=="setter"){
if((_292=_291.next())!=_267){
throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
}
_294+=":";
}
_292=_291.skip_whitespace();
}
_293[name]=_294;
if(_292==_277){
break;
}
if(_292!=_268){
throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
}
}
return _293;
};
_284.prototype.brackets=function(_295,_296){
var _297=[];
while(this.preprocess(_295,NULL,NULL,NULL,_297[_297.length]=[])){
}
if(_297[0].length===1){
_296.atoms[_296.atoms.length]="[";
_296.atoms[_296.atoms.length]=_297[0][0];
_296.atoms[_296.atoms.length]="]";
}else{
var _298=new _281();
if(_297[0][0].atoms[0]==_25f){
_296.atoms[_296.atoms.length]="objj_msgSendSuper(";
_296.atoms[_296.atoms.length]="{ receiver:self, super_class:"+(this._classMethod?this._currentSuperMetaClass:this._currentSuperClass)+" }";
}else{
_296.atoms[_296.atoms.length]="objj_msgSend(";
_296.atoms[_296.atoms.length]=_297[0][0];
}
_298.atoms[_298.atoms.length]=_297[0][1];
var _299=1,_29a=_297.length,_29b=new _281();
for(;_299<_29a;++_299){
var pair=_297[_299];
_298.atoms[_298.atoms.length]=pair[1];
_29b.atoms[_29b.atoms.length]=", "+pair[0];
}
_296.atoms[_296.atoms.length]=", \"";
_296.atoms[_296.atoms.length]=_298;
_296.atoms[_296.atoms.length]="\"";
_296.atoms[_296.atoms.length]=_29b;
_296.atoms[_296.atoms.length]=")";
}
};
_284.prototype.directive=function(_29c,_29d,_29e){
var _29f=_29d?_29d:new _281(),_2a0=_29c.next();
if(_2a0.charAt(0)==_271){
_29f.atoms[_29f.atoms.length]=_2a0;
}else{
if(_2a0===_255){
_29c.skip_whitespace();
return;
}else{
if(_2a0===_258){
this.implementation(_29c,_29f);
}else{
if(_2a0===_259){
this._import(_29c);
}else{
if(_2a0===_25e){
this.selector(_29c,_29f);
}
}
}
}
}
if(!_29d){
return _29f;
}
};
_284.prototype.hash=function(_2a1,_2a2){
var _2a3=_2a2?_2a2:new _281(),_2a4=_2a1.next();
if(_2a4===_262){
_2a4=_2a1.skip_whitespace();
if(_2a4===_263){
while((_2a4=_2a1.next()).indexOf("\n")<0){
}
}
}else{
throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \""+_2a4+"\"."));
}
};
_284.prototype.implementation=function(_2a5,_2a6){
var _2a7=_2a6,_2a8="",_2a9=NO,_2aa=_2a5.skip_whitespace(),_2ab="Nil",_2ac=new _281(),_2ad=new _281();
if(!(/^\w/).test(_2aa)){
throw new Error(this.error_message("*** Expected class name, found \""+_2aa+"\"."));
}
this._currentSuperClass="objj_getClass(\""+_2aa+"\").super_class";
this._currentSuperMetaClass="objj_getMetaClass(\""+_2aa+"\").super_class";
this._currentClass=_2aa;
this._currentSelector="";
if((_2a8=_2a5.skip_whitespace())==_276){
_2a8=_2a5.skip_whitespace();
if(_2a8==_277){
throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \""+_2aa+"\"."));
}
if(_2a5.skip_whitespace()!=_277){
throw new SyntaxError(this.error_message("*** Improper Category Definition for class \""+_2aa+"\"."));
}
_2a7.atoms[_2a7.atoms.length]="{\nvar the_class = objj_getClass(\""+_2aa+"\")\n";
_2a7.atoms[_2a7.atoms.length]="if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\""+_2aa+"\\\"\");\n";
_2a7.atoms[_2a7.atoms.length]="var meta_class = the_class.isa;";
}else{
if(_2a8==_267){
_2a8=_2a5.skip_whitespace();
if(!_27a.test(_2a8)){
throw new SyntaxError(this.error_message("*** Expected class name, found \""+_2a8+"\"."));
}
_2ab=_2a8;
_2a8=_2a5.skip_whitespace();
}
_2a7.atoms[_2a7.atoms.length]="{var the_class = objj_allocateClassPair("+_2ab+", \""+_2aa+"\"),\nmeta_class = the_class.isa;";
if(_2a8==_26d){
var _2ae={},_2af=0,_2b0=[],_2b1,_2b2={};
while((_2a8=_2a5.skip_whitespace())&&_2a8!=_26e){
if(_2a8===_272){
_2a8=_2a5.next();
if(_2a8===_254){
_2b1=this.accessors(_2a5);
}else{
if(_2a8!==_25b){
throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@"+_2a8+"')."));
}
}
}else{
if(_2a8==_26b){
if(_2af++===0){
_2a7.atoms[_2a7.atoms.length]="class_addIvars(the_class, [";
}else{
_2a7.atoms[_2a7.atoms.length]=", ";
}
var name=_2b0[_2b0.length-1];
_2a7.atoms[_2a7.atoms.length]="new objj_ivar(\""+name+"\")";
_2ae[name]=1;
_2b0=[];
if(_2b1){
_2b2[name]=_2b1;
_2b1=NULL;
}
}else{
_2b0.push(_2a8);
}
}
}
if(_2b0.length){
throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
}
if(_2af){
_2a7.atoms[_2a7.atoms.length]="]);\n";
}
if(!_2a8){
throw new SyntaxError(this.error_message("*** Expected '}'"));
}
this.setClassInfo(_2aa,_2ab==="Nil"?null:_2ab,_2ae);
var _2ae=this.allIvarNamesForClassName(_2aa);
for(ivar_name in _2b2){
var _2b3=_2b2[ivar_name],_2b4=_2b3["property"]||ivar_name;
var _2b5=_2b3["getter"]||_2b4,_2b6="(id)"+_2b5+"\n{\nreturn "+ivar_name+";\n}";
if(_2ac.atoms.length!==0){
_2ac.atoms[_2ac.atoms.length]=",\n";
}
_2ac.atoms[_2ac.atoms.length]=this.method(new _27b(_2b6),_2ae);
if(_2b3["readonly"]){
continue;
}
var _2b7=_2b3["setter"];
if(!_2b7){
var _2b8=_2b4.charAt(0)=="_"?1:0;
_2b7=(_2b8?"_":"")+"set"+_2b4.substr(_2b8,1).toUpperCase()+_2b4.substring(_2b8+1)+":";
}
var _2b9="(void)"+_2b7+"(id)newValue\n{\n";
if(_2b3["copy"]){
_2b9+="if ("+ivar_name+" !== newValue)\n"+ivar_name+" = [newValue copy];\n}";
}else{
_2b9+=ivar_name+" = newValue;\n}";
}
if(_2ac.atoms.length!==0){
_2ac.atoms[_2ac.atoms.length]=",\n";
}
_2ac.atoms[_2ac.atoms.length]=this.method(new _27b(_2b9),_2ae);
}
}else{
_2a5.previous();
}
_2a7.atoms[_2a7.atoms.length]="objj_registerClassPair(the_class);\n";
}
if(!_2ae){
var _2ae=this.allIvarNamesForClassName(_2aa);
}
while((_2a8=_2a5.skip_whitespace())){
if(_2a8==_265){
this._classMethod=true;
if(_2ad.atoms.length!==0){
_2ad.atoms[_2ad.atoms.length]=", ";
}
_2ad.atoms[_2ad.atoms.length]=this.method(_2a5,this._classVars);
}else{
if(_2a8==_266){
this._classMethod=false;
if(_2ac.atoms.length!==0){
_2ac.atoms[_2ac.atoms.length]=", ";
}
_2ac.atoms[_2ac.atoms.length]=this.method(_2a5,_2ae);
}else{
if(_2a8==_273){
this.hash(_2a5,_2a7);
}else{
if(_2a8==_272){
if((_2a8=_2a5.next())==_256){
break;
}else{
throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@"+_2a8+"\"."));
}
}
}
}
}
}
if(_2ac.atoms.length!==0){
_2a7.atoms[_2a7.atoms.length]="class_addMethods(the_class, [";
_2a7.atoms[_2a7.atoms.length]=_2ac;
_2a7.atoms[_2a7.atoms.length]="]);\n";
}
if(_2ad.atoms.length!==0){
_2a7.atoms[_2a7.atoms.length]="class_addMethods(meta_class, [";
_2a7.atoms[_2a7.atoms.length]=_2ad;
_2a7.atoms[_2a7.atoms.length]="]);\n";
}
_2a7.atoms[_2a7.atoms.length]="}";
this._currentClass="";
};
_284.prototype._import=function(_2ba){
var _2bb="",_2bc=_2ba.skip_whitespace(),_2bd=(_2bc!==_26c);
if(_2bc===_26c){
while((_2bc=_2ba.next())&&_2bc!==_26f){
_2bb+=_2bc;
}
if(!_2bc){
throw new SyntaxError(this.error_message("*** Unterminated import statement."));
}
}else{
if(_2bc.charAt(0)===_271){
_2bb=_2bc.substr(1,_2bc.length-2);
}else{
throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \""+_2bc+"\"."));
}
}
this._buffer.atoms[this._buffer.atoms.length]="objj_executeFile(\"";
this._buffer.atoms[this._buffer.atoms.length]=_2bb;
this._buffer.atoms[this._buffer.atoms.length]=_2bd?"\", YES);":"\", NO);";
this._dependencies.push(new _2be(new CFURL(_2bb),_2bd));
};
_284.prototype.method=function(_2bf,_2c0){
var _2c1=new _281(),_2c2,_2c3="",_2c4=[],_2c5=[null];
_2c0=_2c0||{};
while((_2c2=_2bf.skip_whitespace())&&_2c2!==_26d&&_2c2!==_26b){
if(_2c2==_267){
var type="";
_2c3+=_2c2;
_2c2=_2bf.skip_whitespace();
if(_2c2==_276){
while((_2c2=_2bf.skip_whitespace())&&_2c2!=_277){
type+=_2c2;
}
_2c2=_2bf.skip_whitespace();
}
_2c5[_2c4.length+1]=type||null;
_2c4[_2c4.length]=_2c2;
if(_2c2 in _2c0){
throw new SyntaxError(this.error_message("*** Method ( "+_2c3+" ) uses a parameter name that is already in use ( "+_2c2+" )"));
}
}else{
if(_2c2==_276){
var type="";
while((_2c2=_2bf.skip_whitespace())&&_2c2!=_277){
type+=_2c2;
}
_2c5[0]=type||null;
}else{
if(_2c2==_268){
if((_2c2=_2bf.skip_whitespace())!=_269||_2bf.next()!=_269||_2bf.next()!=_269){
throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
}
}else{
_2c3+=_2c2;
}
}
}
}
if(_2c2===_26b){
_2c2=_2bf.skip_whitespace();
if(_2c2!==_26d){
throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. "+"Semi-colons are allowed only to terminate the method signature, before the open brace."));
}
}
var _2c6=0,_2c7=_2c4.length;
_2c1.atoms[_2c1.atoms.length]="new objj_method(sel_getUid(\"";
_2c1.atoms[_2c1.atoms.length]=_2c3;
_2c1.atoms[_2c1.atoms.length]="\"), function";
this._currentSelector=_2c3;
if(this._flags&_284.Flags.IncludeDebugSymbols){
_2c1.atoms[_2c1.atoms.length]=" $"+this._currentClass+"__"+_2c3.replace(/:/g,"_");
}
_2c1.atoms[_2c1.atoms.length]="(self, _cmd";
for(;_2c6<_2c7;++_2c6){
_2c1.atoms[_2c1.atoms.length]=", ";
_2c1.atoms[_2c1.atoms.length]=_2c4[_2c6];
}
_2c1.atoms[_2c1.atoms.length]=")\n{ with(self)\n{";
_2c1.atoms[_2c1.atoms.length]=this.preprocess(_2bf,NULL,_26e,_26d);
_2c1.atoms[_2c1.atoms.length]="}\n}";
if(this._flags&_284.Flags.IncludeDebugSymbols){
_2c1.atoms[_2c1.atoms.length]=","+JSON.stringify(_2c5);
}
_2c1.atoms[_2c1.atoms.length]=")";
this._currentSelector="";
return _2c1;
};
_284.prototype.preprocess=function(_2c8,_2c9,_2ca,_2cb,_2cc){
var _2cd=_2c9?_2c9:new _281(),_2ce=0,_2cf="";
if(_2cc){
_2cc[0]=_2cd;
var _2d0=false,_2d1=[0,0,0];
}
while((_2cf=_2c8.next())&&((_2cf!==_2ca)||_2ce)){
if(_2cc){
if(_2cf===_275){
++_2d1[2];
}else{
if(_2cf===_26d){
++_2d1[0];
}else{
if(_2cf===_26e){
--_2d1[0];
}else{
if(_2cf===_276){
++_2d1[1];
}else{
if(_2cf===_277){
--_2d1[1];
}else{
if((_2cf===_267&&_2d1[2]--===0||(_2d0=(_2cf===_274)))&&_2d1[0]===0&&_2d1[1]===0){
_2c8.push();
var _2d2=_2d0?_2c8.skip_whitespace(true):_2c8.previous(),_2d3=_278.test(_2d2);
if(_2d3||_27a.test(_2d2)&&_278.test(_2c8.previous())){
_2c8.push();
var last=_2c8.skip_whitespace(true),_2d4=true,_2d5=false;
if(last==="+"||last==="-"){
if(_2c8.previous()!==last){
_2d4=false;
}else{
last=_2c8.skip_whitespace(true);
_2d5=true;
}
}
_2c8.pop();
_2c8.pop();
if(_2d4&&((!_2d5&&(last===_26e))||last===_277||last===_274||last===_269||_279.test(last)||last.charAt(last.length-1)==="\""||last.charAt(last.length-1)==="'"||_27a.test(last)&&!/^(new|return|case|var)$/.test(last))){
if(_2d3){
_2cc[1]=":";
}else{
_2cc[1]=_2d2;
if(!_2d0){
_2cc[1]+=":";
}
var _2ce=_2cd.atoms.length;
while(_2cd.atoms[_2ce--]!==_2d2){
}
_2cd.atoms.length=_2ce;
}
return !_2d0;
}
if(_2d0){
return NO;
}
}
_2c8.pop();
if(_2d0){
return NO;
}
}
}
}
}
}
}
_2d1[2]=MAX(_2d1[2],0);
}
if(_2cb){
if(_2cf===_2cb){
++_2ce;
}else{
if(_2cf===_2ca){
--_2ce;
}
}
}
if(_2cf===_257){
var _2d6="";
while((_2cf=_2c8.next())&&_2cf!==_276&&!(/^\w/).test(_2cf)){
_2d6+=_2cf;
}
if(_2cf===_276){
if(_2cb===_276){
++_2ce;
}
_2cd.atoms[_2cd.atoms.length]="function"+_2d6+"(";
if(_2cc){
++_2d1[1];
}
}else{
_2cd.atoms[_2cd.atoms.length]=_2cf+"= function";
}
}else{
if(_2cf==_272){
this.directive(_2c8,_2cd);
}else{
if(_2cf==_273){
this.hash(_2c8,_2cd);
}else{
if(_2cf==_270){
this.brackets(_2c8,_2cd);
}else{
_2cd.atoms[_2cd.atoms.length]=_2cf;
}
}
}
}
}
if(_2cc){
throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
}
if(!_2c9){
return _2cd;
}
};
_284.prototype.selector=function(_2d7,_2d8){
var _2d9=_2d8?_2d8:new _281();
_2d9.atoms[_2d9.atoms.length]="sel_getUid(\"";
if(_2d7.skip_whitespace()!=_276){
throw new SyntaxError(this.error_message("*** Expected '('"));
}
var _2da=_2d7.skip_whitespace();
if(_2da==_277){
throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
}
_2d8.atoms[_2d8.atoms.length]=_2da;
var _2db,_2dc=true;
while((_2db=_2d7.next())&&_2db!=_277){
if(_2dc&&/^\d+$/.test(_2db)||!(/^(\w|$|\:)/.test(_2db))){
if(!(/\S/).test(_2db)){
if(_2d7.skip_whitespace()==_277){
break;
}else{
throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
}
}else{
throw new SyntaxError(this.error_message("*** Illegal character '"+_2db+"' in @selector()."));
}
}
_2d9.atoms[_2d9.atoms.length]=_2db;
_2dc=(_2db==_267);
}
_2d9.atoms[_2d9.atoms.length]="\")";
if(!_2d8){
return _2d9;
}
};
_284.prototype.error_message=function(_2dd){
return _2dd+" <Context File: "+this._URL+(this._currentClass?" Class: "+this._currentClass:"")+(this._currentSelector?" Method: "+this._currentSelector:"")+">";
};
function _2be(aURL,_2de){
this._URL=aURL;
this._isLocal=_2de;
};
_2.FileDependency=_2be;
_2be.prototype.URL=function(){
return this._URL;
};
_2be.prototype.isLocal=function(){
return this._isLocal;
};
_2be.prototype.toMarkedString=function(){
var _2df=this.URL().absoluteString();
return (this.isLocal()?_210:_20f)+";"+_2df.length+";"+_2df;
};
_2be.prototype.toString=function(){
return (this.isLocal()?"LOCAL: ":"STD: ")+this.URL();
};
var _2e0=0,_2e1=1,_2e2=2,_2e3=0;
function _290(_2e4,_2e5,aURL,_2e6){
if(arguments.length===0){
return this;
}
this._code=_2e4;
this._function=_2e6||NULL;
this._URL=_1b2(aURL||new CFURL("(Anonymous"+(_2e3++)+")"));
this._fileDependencies=_2e5;
if(_2e5.length){
this._fileDependencyStatus=_2e0;
this._fileDependencyCallbacks=[];
}else{
this._fileDependencyStatus=_2e2;
}
if(this._function){
return;
}
this.setCode(_2e4);
};
_2.Executable=_290;
_290.prototype.path=function(){
return this.URL().path();
};
_290.prototype.URL=function(){
return this._URL;
};
_290.prototype.functionParameters=function(){
var _2e7=["global","objj_executeFile","objj_importFile"];
return _2e7;
};
_290.prototype.functionArguments=function(){
var _2e8=[_1,this.fileExecuter(),this.fileImporter()];
return _2e8;
};
_290.prototype.execute=function(){
var _2e9=_2ea;
_2ea=CFBundle.bundleContainingURL(this.URL());
var _2eb=this._function.apply(_1,this.functionArguments());
_2ea=_2e9;
return _2eb;
};
_290.prototype.code=function(){
return this._code;
};
_290.prototype.setCode=function(code){
this._code=code;
var _2ec=this.functionParameters().join(",");
this._function=new Function(_2ec,code);
};
_290.prototype.fileDependencies=function(){
return this._fileDependencies;
};
_290.prototype.hasLoadedFileDependencies=function(){
return this._fileDependencyStatus===_2e2;
};
var _2ed=0,_2ee=[],_2ef={};
_290.prototype.loadFileDependencies=function(_2f0){
var _2f1=this._fileDependencyStatus;
if(_2f0){
if(_2f1===_2e2){
return _2f0();
}
this._fileDependencyCallbacks.push(_2f0);
}
if(_2f1===_2e0){
if(_2ed){
throw "Can't load";
}
_2f2(this);
}
};
function _2f2(_2f3){
_2ee.push(_2f3);
_2f3._fileDependencyStatus=_2e1;
var _2f4=_2f3.fileDependencies(),_95=0,_2f5=_2f4.length,_2f6=_2f3.referenceURL(),_2f7=_2f6.absoluteString(),_2f8=_2f3.fileExecutableSearcher();
_2ed+=_2f5;
for(;_95<_2f5;++_95){
var _2f9=_2f4[_95],_2fa=_2f9.isLocal(),URL=_2f9.URL(),_2fb=(_2fa&&(_2f7+" ")||"")+URL;
if(_2ef[_2fb]){
if(--_2ed===0){
_2fc();
}
continue;
}
_2ef[_2fb]=YES;
_2f8(URL,_2fa,_2fd);
}
};
function _2fd(_2fe){
--_2ed;
if(_2fe._fileDependencyStatus===_2e0){
_2f2(_2fe);
}else{
if(_2ed===0){
_2fc();
}
}
};
function _2fc(){
var _2ff=_2ee,_95=0,_300=_2ff.length;
_2ee=[];
for(;_95<_300;++_95){
_2ff[_95]._fileDependencyStatus=_2e2;
}
for(_95=0;_95<_300;++_95){
var _301=_2ff[_95],_302=_301._fileDependencyCallbacks,_303=0,_304=_302.length;
for(;_303<_304;++_303){
_302[_303]();
}
_301._fileDependencyCallbacks=[];
}
};
_290.prototype.referenceURL=function(){
if(this._referenceURL===_46){
this._referenceURL=new CFURL(".",this.URL());
}
return this._referenceURL;
};
_290.prototype.fileImporter=function(){
return _290.fileImporterForURL(this.referenceURL());
};
_290.prototype.fileExecuter=function(){
return _290.fileExecuterForURL(this.referenceURL());
};
_290.prototype.fileExecutableSearcher=function(){
return _290.fileExecutableSearcherForURL(this.referenceURL());
};
var _305={};
_290.fileExecuterForURL=function(aURL){
var _306=_1b2(aURL),_307=_306.absoluteString(),_308=_305[_307];
if(!_308){
_308=function(aURL,_309,_30a){
_290.fileExecutableSearcherForURL(_306)(aURL,_309,function(_30b){
if(!_30b.hasLoadedFileDependencies()){
throw "No executable loaded for file at URL "+aURL;
}
_30b.execute(_30a);
});
};
_305[_307]=_308;
}
return _308;
};
var _30c={};
_290.fileImporterForURL=function(aURL){
var _30d=_1b2(aURL),_30e=_30d.absoluteString(),_30f=_30c[_30e];
if(!_30f){
_30f=function(aURL,_310,_311){
_152();
_290.fileExecutableSearcherForURL(_30d)(aURL,_310,function(_312){
_312.loadFileDependencies(function(){
_312.execute();
_153();
if(_311){
_311();
}
});
});
};
_30c[_30e]=_30f;
}
return _30f;
};
var _313={},_314={};
_290.fileExecutableSearcherForURL=function(_315){
var _316=_315.absoluteString(),_317=_313[_316],_318={};
if(!_317){
_317=function(aURL,_319,_31a){
var _31b=(_319&&_315||"")+aURL,_31c=_314[_31b];
if(_31c){
return _31d(_31c);
}
var _31e=(aURL instanceof CFURL)&&aURL.scheme();
if(_319||_31e){
if(!_31e){
aURL=new CFURL(aURL,_315);
}
_19f.resolveResourceAtURL(aURL,NO,_31d);
}else{
_19f.resolveResourceAtURLSearchingIncludeURLs(aURL,_31d);
}
function _31d(_31f){
if(!_31f){
throw new Error("Could not load file at "+aURL);
}
_314[_31b]=_31f;
_31a(new _320(_31f.URL()));
};
};
_313[_316]=_317;
}
return _317;
};
var _321={};
function _320(aURL){
aURL=_1b2(aURL);
var _322=aURL.absoluteString(),_323=_321[_322];
if(_323){
return _323;
}
_321[_322]=this;
var _324=_19f.resourceAtURL(aURL).contents(),_325=NULL,_326=aURL.pathExtension();
if(_324.match(/^@STATIC;/)){
_325=_327(_324,aURL);
}else{
if(_326==="j"||!_326){
_325=_2.preprocess(_324,aURL,_284.Flags.IncludeDebugSymbols);
}else{
_325=new _290(_324,[],aURL);
}
}
_290.apply(this,[_325.code(),_325.fileDependencies(),aURL,_325._function]);
this._hasExecuted=NO;
};
_2.FileExecutable=_320;
_320.prototype=new _290();
_320.prototype.execute=function(_328){
if(this._hasExecuted&&!_328){
return;
}
this._hasExecuted=YES;
_290.prototype.execute.call(this);
};
_320.prototype.hasExecuted=function(){
return this._hasExecuted;
};
function _327(_329,aURL){
var _32a=new _106(_329);
var _32b=NULL,code="",_32c=[];
while(_32b=_32a.getMarker()){
var text=_32a.getString();
if(_32b===_20e){
code+=text;
}else{
if(_32b===_20f){
_32c.push(new _2be(new CFURL(text),NO));
}else{
if(_32b===_210){
_32c.push(new _2be(new CFURL(text),YES));
}
}
}
}
var fn=_320._lookupCachedFunction(aURL);
if(fn){
return new _290(code,_32c,aURL,fn);
}
return new _290(code,_32c,aURL);
};
var _32d={};
_320._cacheFunction=function(aURL,fn){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
_32d[aURL]=fn;
};
_320._lookupCachedFunction=function(aURL){
aURL=typeof aURL==="string"?aURL:aURL.absoluteString();
return _32d[aURL];
};
var _32e=1,_32f=2,_330=4,_331=8;
objj_ivar=function(_332,_333){
this.name=_332;
this.type=_333;
};
objj_method=function(_334,_335,_336){
this.name=_334;
this.method_imp=_335;
this.types=_336;
};
objj_class=function(_337){
this.isa=NULL;
this.super_class=NULL;
this.sub_classes=[];
this.name=NULL;
this.info=0;
this.ivars=[];
this.method_list=[];
this.method_hash={};
this.method_store=function(){
};
this.method_dtable=this.method_store.prototype;
this.allocator=function(){
};
this._UID=-1;
};
objj_object=function(){
this.isa=NULL;
this._UID=-1;
};
class_getName=function(_338){
if(_338==Nil){
return "";
}
return _338.name;
};
class_isMetaClass=function(_339){
if(!_339){
return NO;
}
return ((_339.info&(_32f)));
};
class_getSuperclass=function(_33a){
if(_33a==Nil){
return Nil;
}
return _33a.super_class;
};
class_setSuperclass=function(_33b,_33c){
_33b.super_class=_33c;
_33b.isa.super_class=_33c.isa;
};
class_addIvar=function(_33d,_33e,_33f){
var _340=_33d.allocator.prototype;
if(typeof _340[_33e]!="undefined"){
return NO;
}
_33d.ivars.push(new objj_ivar(_33e,_33f));
_340[_33e]=NULL;
return YES;
};
class_addIvars=function(_341,_342){
var _343=0,_344=_342.length,_345=_341.allocator.prototype;
for(;_343<_344;++_343){
var ivar=_342[_343],name=ivar.name;
if(typeof _345[name]==="undefined"){
_341.ivars.push(ivar);
_345[name]=NULL;
}
}
};
class_copyIvarList=function(_346){
return _346.ivars.slice(0);
};
class_addMethod=function(_347,_348,_349,_34a){
if(_347.method_hash[_348]){
return NO;
}
var _34b=new objj_method(_348,_349,_34a);
_347.method_list.push(_34b);
_347.method_dtable[_348]=_34b;
if(!((_347.info&(_32f)))&&(((_347.info&(_32f)))?_347:_347.isa).isa===(((_347.info&(_32f)))?_347:_347.isa)){
class_addMethod((((_347.info&(_32f)))?_347:_347.isa),_348,_349,_34a);
}
return YES;
};
class_addMethods=function(_34c,_34d){
var _34e=0,_34f=_34d.length,_350=_34c.method_list,_351=_34c.method_dtable;
for(;_34e<_34f;++_34e){
var _352=_34d[_34e];
if(_34c.method_hash[_352.name]){
continue;
}
_350.push(_352);
_351[_352.name]=_352;
}
if(!((_34c.info&(_32f)))&&(((_34c.info&(_32f)))?_34c:_34c.isa).isa===(((_34c.info&(_32f)))?_34c:_34c.isa)){
class_addMethods((((_34c.info&(_32f)))?_34c:_34c.isa),_34d);
}
};
class_getInstanceMethod=function(_353,_354){
if(!_353||!_354){
return NULL;
}
var _355=_353.method_dtable[_354];
return _355?_355:NULL;
};
class_getClassMethod=function(_356,_357){
if(!_356||!_357){
return NULL;
}
var _358=(((_356.info&(_32f)))?_356:_356.isa).method_dtable[_357];
return _358?_358:NULL;
};
class_respondsToSelector=function(_359,_35a){
return class_getClassMethod(_359,_35a)!=NULL;
};
class_copyMethodList=function(_35b){
return _35b.method_list.slice(0);
};
class_replaceMethod=function(_35c,_35d,_35e){
if(!_35c||!_35d){
return NULL;
}
var _35f=_35c.method_dtable[_35d],_360=NULL;
if(_35f){
_360=_35f.method_imp;
}
_35f.method_imp=_35e;
return _360;
};
var _361=function(_362){
var meta=(((_362.info&(_32f)))?_362:_362.isa);
if((_362.info&(_32f))){
_362=objj_getClass(_362.name);
}
if(_362.super_class&&!((((_362.super_class.info&(_32f)))?_362.super_class:_362.super_class.isa).info&(_330))){
_361(_362.super_class);
}
if(!(meta.info&(_330))&&!(meta.info&(_331))){
meta.info=(meta.info|(_331))&~(0);
objj_msgSend(_362,"initialize");
meta.info=(meta.info|(_330))&~(_331);
}
};
var _363=new objj_method("forward",function(self,_364){
return objj_msgSend(self,"forward::",_364,arguments);
});
class_getMethodImplementation=function(_365,_366){
if(!((((_365.info&(_32f)))?_365:_365.isa).info&(_330))){
_361(_365);
}
var _367=_365.method_dtable[_366];
if(!_367){
_367=_363;
}
var _368=_367.method_imp;
return _368;
};
var _369={};
objj_allocateClassPair=function(_36a,_36b){
var _36c=new objj_class(_36b),_36d=new objj_class(_36b),_36e=_36c;
if(_36a){
_36e=_36a;
while(_36e.superclass){
_36e=_36e.superclass;
}
_36c.allocator.prototype=new _36a.allocator;
_36c.method_store.prototype=new _36a.method_store;
_36c.method_dtable=_36c.method_store.prototype;
_36d.method_store.prototype=new _36a.isa.method_store;
_36d.method_dtable=_36d.method_store.prototype;
_36c.super_class=_36a;
_36d.super_class=_36a.isa;
}else{
_36c.allocator.prototype=new objj_object();
}
_36c.isa=_36d;
_36c.name=_36b;
_36c.info=_32e;
_36c._UID=objj_generateObjectUID();
_36d.isa=_36e.isa;
_36d.name=_36b;
_36d.info=_32f;
_36d._UID=objj_generateObjectUID();
return _36c;
};
var _2ea=nil;
objj_registerClassPair=function(_36f){
_1[_36f.name]=_36f;
_369[_36f.name]=_36f;
_1b9(_36f,_2ea);
};
class_createInstance=function(_370){
if(!_370){
throw new Error("*** Attempting to create object with Nil class.");
}
var _371=new _370.allocator();
_371.isa=_370;
_371._UID=objj_generateObjectUID();
return _371;
};
var _372=function(){
};
_372.prototype.member=false;
with(new _372()){
member=true;
}
if(new _372().member){
var _373=class_createInstance;
class_createInstance=function(_374){
var _375=_373(_374);
if(_375){
var _376=_375.isa,_377=_376;
while(_376){
var _378=_376.ivars,_379=_378.length;
while(_379--){
_375[_378[_379].name]=NULL;
}
_376=_376.super_class;
}
_375.isa=_377;
}
return _375;
};
}
object_getClassName=function(_37a){
if(!_37a){
return "";
}
var _37b=_37a.isa;
return _37b?class_getName(_37b):"";
};
objj_lookUpClass=function(_37c){
var _37d=_369[_37c];
return _37d?_37d:Nil;
};
objj_getClass=function(_37e){
var _37f=_369[_37e];
if(!_37f){
}
return _37f?_37f:Nil;
};
objj_getMetaClass=function(_380){
var _381=objj_getClass(_380);
return (((_381.info&(_32f)))?_381:_381.isa);
};
ivar_getName=function(_382){
return _382.name;
};
ivar_getTypeEncoding=function(_383){
return _383.type;
};
objj_msgSend=function(_384,_385){
if(_384==nil){
return nil;
}
var isa=_384.isa;
if(!((((isa.info&(_32f)))?isa:isa.isa).info&(_330))){
_361(isa);
}
var _386=isa.method_dtable[_385];
if(!_386){
_386=_363;
}
var _387=_386.method_imp;
switch(arguments.length){
case 2:
return _387(_384,_385);
case 3:
return _387(_384,_385,arguments[2]);
case 4:
return _387(_384,_385,arguments[2],arguments[3]);
}
return _387.apply(_384,arguments);
};
objj_msgSendSuper=function(_388,_389){
var _38a=_388.super_class;
arguments[0]=_388.receiver;
if(!((((_38a.info&(_32f)))?_38a:_38a.isa).info&(_330))){
_361(_38a);
}
var _38b=_38a.method_dtable[_389];
if(!_38b){
_38b=_363;
}
var _38c=_38b.method_imp;
return _38c.apply(_388.receiver,arguments);
};
method_getName=function(_38d){
return _38d.name;
};
method_getImplementation=function(_38e){
return _38e.method_imp;
};
method_setImplementation=function(_38f,_390){
var _391=_38f.method_imp;
_38f.method_imp=_390;
return _391;
};
method_exchangeImplementations=function(lhs,rhs){
var _392=method_getImplementation(lhs),_393=method_getImplementation(rhs);
method_setImplementation(lhs,_393);
method_setImplementation(rhs,_392);
};
sel_getName=function(_394){
return _394?_394:"<null selector>";
};
sel_getUid=function(_395){
return _395;
};
sel_isEqual=function(lhs,rhs){
return lhs===rhs;
};
sel_registerName=function(_396){
return _396;
};
objj_eval=function(_397){
var url=_2.pageURL;
var _398=_2.asyncLoader;
_2.asyncLoader=NO;
var _399=_2.preprocess(_397,url,0);
if(!_399.hasLoadedFileDependencies()){
_399.loadFileDependencies();
}
_1._objj_eval_scope={};
_1._objj_eval_scope.objj_executeFile=_290.fileExecuterForURL(url);
_1._objj_eval_scope.objj_importFile=_290.fileImporterForURL(url);
var code="with(_objj_eval_scope){"+_399._code+"\n//*/\n}";
var _39a;
_39a=eval(code);
_2.asyncLoader=_398;
return _39a;
};
_2.objj_eval=objj_eval;
_152();
var _39b=new CFURL(window.location.href),_39c=document.getElementsByTagName("base"),_39d=_39c.length;
if(_39d>0){
var _39e=_39c[_39d-1],_39f=_39e&&_39e.getAttribute("href");
if(_39f){
_39b=new CFURL(_39f,_39b);
}
}
var _3a0=new CFURL(window.OBJJ_MAIN_FILE||"main.j"),_1b8=new CFURL(".",new CFURL(_3a0,_39b)).absoluteURL(),_3a1=new CFURL("..",_1b8).absoluteURL();
if(_1b8===_3a1){
_3a1=new CFURL(_3a1.schemeAndAuthority());
}
_19f.resourceAtURL(_3a1,YES);
_2.pageURL=_39b;
_2.bootstrap=function(){
_3a2();
};
function _3a2(){
_19f.resolveResourceAtURL(_1b8,YES,function(_3a3){
var _3a4=_19f.includeURLs(),_95=0,_3a5=_3a4.length;
for(;_95<_3a5;++_95){
_3a3.resourceAtURL(_3a4[_95],YES);
}
_290.fileImporterForURL(_1b8)(_3a0.lastPathComponent(),YES,function(){
_153();
_3ab(function(){
var _3a6=window.location.hash.substring(1),args=[];
if(_3a6.length){
args=_3a6.split("/");
for(var i=0,_3a5=args.length;i<_3a5;i++){
args[i]=decodeURIComponent(args[i]);
}
}
var _3a7=window.location.search.substring(1).split("&"),_3a8=new CFMutableDictionary();
for(var i=0,_3a5=_3a7.length;i<_3a5;i++){
var _3a9=_3a7[i].split("=");
if(!_3a9[0]){
continue;
}
if(_3a9[1]==null){
_3a9[1]=true;
}
_3a8.setValueForKey(decodeURIComponent(_3a9[0]),decodeURIComponent(_3a9[1]));
}
main(args,_3a8);
});
});
});
};
var _3aa=NO;
function _3ab(_3ac){
if(_3aa){
return _3ac();
}
if(window.addEventListener){
window.addEventListener("load",_3ac,NO);
}else{
if(window.attachEvent){
window.attachEvent("onload",_3ac);
}
}
};
_3ab(function(){
_3aa=YES;
});
if(typeof OBJJ_AUTO_BOOTSTRAP==="undefined"||OBJJ_AUTO_BOOTSTRAP){
_2.bootstrap();
}
function _1b2(aURL){
if(aURL instanceof CFURL&&aURL.scheme()){
return aURL;
}
return new CFURL(aURL,_1b8);
};
objj_importFile=_290.fileImporterForURL(_1b8);
objj_executeFile=_290.fileExecuterForURL(_1b8);
objj_import=function(){
CPLog.warn("objj_import is deprecated, use objj_importFile instead");
objj_importFile.apply(this,arguments);
};
})(window,ObjectiveJ);
