!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports={noteToFrequency:function(t){return 440*Math.pow(2,(t-49)/12)},frequencyToNote:function(t){return 12*Math.log2(t/440)}}},function(t,e,n){n(2),t.exports=n(5)},function(t,e,n){const{Instrument:i}=n(3),r=n(4),o=n(0),s=new(window.AudioContext||window.webkitAudioContext);let a={};function c(t){const e=[49,51,53,56,58,61],n=e[Math.floor(t*e.length)];return o.noteToFrequency(n)}function u(t){const e=[49,52,54,56,59,61],n=e[Math.floor(t*e.length)];return o.noteToFrequency(n)}function l(t){const e=49+12*t;return o.noteToFrequency(e)}function f(t){var e=new XMLHttpRequest;e.open("GET",t,!0),e.responseType="arraybuffer",e.url=t,e.onload=function(){s.decodeAudioData(e.response,function(t){a[e.url]=t})},e.send()}function h(t){var e=s.createBufferSource();e.buffer=t,e.connect(s.destination),e.start(0)}window.onload=function(){let t=new i(s,l);f("static/sounds/bass_drum.wav"),f("static/sounds/hihat.wav");function e(){A=L}let n={main:t,drum:function(){A=400,h(a["static/sounds/bass_drum.wav"]),window.setTimeout(e,100)},hihat:function(){A=400,h(a["static/sounds/hihat.wav"]),window.setTimeout(e,100)}};r.attachMouseHandlers(n,document.getElementById("slider")),r.attachJoyconHandlers(n);let o=document.getElementById("state_label"),d=!1;document.getElementById("state_button").addEventListener("click",t=>{1==(d=!d)?o.innerHTML="Mouse":0==d&&(o.innerHTML="JoyCons"),r.toggleInputs()});const p=[l,c,u];let m=0,v=()=>{t.generator=p[m],scale_label.innerHTML=t.generator.name,++m>=p.length&&(m=0)};scale_button.addEventListener("click",v),v();let g=document.getElementById("slider");const y="#081920",b="#f45954",w="#60d4e1";window.addEventListener("resize",T,!1);let x=g.getContext("2d");function T(){g.width=window.innerWidth,g.height=window.innerHeight,E()}const L=10;let A=L,M=A,R=L,O=R,S=5;function E(){x.fillStyle=y,x.fillRect(0,0,g.width,g.height),x.stroke()}t.onplay=(t=>{R=t}),t.onpause=(t=>{R=L}),T(),window.requestAnimationFrame(function t(){E(),function(){O<R-S?O+=.08*(R-O):O>R+S&&(O-=.08*(O-R));let t=g.height/3;x.strokeStyle=w,x.beginPath(),x.lineWidth=5;for(let e=0;e<g.width;e+=2){let n=g.height/2.4+t*Math.sin((e+700)*Math.pow(O,3)*1e-10);x.lineTo(e,n)}x.stroke()}(),function(){M<A-S?M+=.2*(A-M):M>A+S&&(M-=.8*(O-A));let t=g.height/6;x.strokeStyle=b,x.beginPath(),x.lineWidth=5;for(let e=0;e<g.width;e+=2){let n=g.height/2.4+t*Math.sin((e+1500)*Math.pow(M,3)*1e-10);x.lineTo(e,n)}x.stroke()}(),window.requestAnimationFrame(t)})}},function(t,e,n){n(0);t.exports={Instrument:class{constructor(t,e){this.ctx=t,this.generator=e,this.volume=this.ctx.createGain(),this.volume.gain.setValueAtTime(0,this.ctx.currentTime),this.volume.connect(this.ctx.destination),this.leftGain=this.ctx.createGain(),this.leftGain.gain.setValueAtTime(.5,this.ctx.currentTime),this.leftGain.connect(this.volume),this.left=this.ctx.createOscillator(),this.left.type="square",this.left.connect(this.leftGain),this.left.start(),this.harmonicVolume=this.ctx.createGain(),this.harmonicVolume.gain.setValueAtTime(1.3,this.ctx.currentTime),this.harmonicVolume.connect(this.volume),this.harmonic=this.ctx.createOscillator(),this.harmonic.type="sine",this.harmonic.connect(this.harmonicVolume),this.harmonic.start(),this.rightGain=this.ctx.createGain(),this.rightGain.gain.setValueAtTime(.5,this.ctx.currentTime),this.rightGain.connect(this.volume),this.right=this.ctx.createOscillator(),this.right.type="sawtooth",this.right.connect(this.rightGain),this.right.start(),this.onplay=null,this.onpause=null}play(t,e){const n=this.generator(t);this.left.frequency.linearRampToValueAtTime(n,this.ctx.currentTime+.05),this.right.frequency.linearRampToValueAtTime(n,this.ctx.currentTime+.05),this.harmonic.frequency.linearRampToValueAtTime(2*n,this.ctx.currentTime+.05),this.leftGain.gain.linearRampToValueAtTime(1-e,this.ctx.currentTime+.05),this.rightGain.gain.linearRampToValueAtTime(e,this.ctx.currentTime+.05),0==this.volume.gain.value&&this.volume.gain.linearRampToValueAtTime(.1,this.ctx.currentTime+.05+.1),this.onplay&&this.onplay(n)}pause(){this.volume.gain.value>.1&&this.volume.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.4),this.onpause&&this.onpause()}}}},function(t,e){let n=!1,i=!0;t.exports={attachMouseHandlers:function(t,e){let i=!1;e.addEventListener("mousedown",r=>{if(n){const n=e.getBoundingClientRect(),o=1-(r.y-n.top)/e.clientHeight,s=(r.x-n.left)/e.clientWidth;t.main.play(o,s),i=!0}}),document.addEventListener("mouseup",e=>{i=!1,t.main.pause()}),e.addEventListener("mousemove",r=>{if(n&&i){const n=e.getBoundingClientRect(),i=1-(r.y-n.top)/e.clientHeight,o=(r.x-n.left)/e.clientWidth;t.main.play(i,o)}}),document.addEventListener("keypress",e=>{n&&("Space"==e.code?t.drum():"Enter"==e.code&&t.hihat())})},attachJoyconHandlers:function(t){let e=null,n=!1;e=setInterval(()=>{let e=navigator.getGamepads()[0],r=!1,o=!1;if(e.buttons[6].pressed&&(r=!0),e.buttons[7].pressed&&(o=!0),i){if(r){let n=(e.axes[2]+1)/2,i=(e.axes[3]+1)/2;t.main.play(n,i)}else t.main.pause();n||1!=e.axes[e.axes.length-2]?e.axes[e.axes.length-2]<.5&&(n=!1):(n=!0,o?t.hihat():t.drum())}}),window.addEventListener("gamepaddisconnected",t=>{clearInterval(e)})},toggleInputs:function(){n=!n,i=!i}}},function(t,e,n){var i=n(6);"string"==typeof i&&(i=[[t.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(8)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){(t.exports=n(7)(!1)).push([t.i,"html {\n    font-family: 'Open Sans', sans-serif;\n}\n\nbody {\n    margin: 0;\n    background-color: #081920;\n\n    height: 100%;\n    overflow: hidden;\n}\n\nh1 {\n    text-align: center;\n    color: #ffffff;\n}\n.joycon {\n    height: 100px; \n}\n\nlabel {\n    color: #ffffff;\n    font-family: 'Open Sans Light', sans-serif;\n}\n\na {\n    font-family: 'Open Sans', sans-serif;\n    right: 50px;\n    width: 120px;\n}\n\ndiv {\n    position: absolute;\n    top: 5px;\n    right: 10px;\n}\n\n.links {\n    position: absolute;\n    width: 35px;\n    height: 35px;\n    top: 5px;\n    left: 10px;\n    opacity: 0.6;\n    transition: 0.3s;\n}\n\n.links:hover {\n    opacity: 1.0;\n    transition: 0.3s;\n}\n\n#slider {\n    display: block;\n}\n",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var r=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(i),o=i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"});return[n].concat(o).concat([r]).join("\n")}return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var i={},r=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),o=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var i=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}e[t]=i}return e[t]}}(),s=null,a=0,c=[],u=n(9);function l(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(v(r.parts[s],e))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(v(r.parts[s],e));i[r.id]={id:r.id,refs:1,parts:a}}}}function f(t,e){for(var n=[],i={},r=0;r<t.length;r++){var o=t[r],s=e.base?o[0]+e.base:o[0],a={css:o[1],media:o[2],sourceMap:o[3]};i[s]?i[s].parts.push(a):n.push(i[s]={id:s,parts:[a]})}return n}function h(t,e){var n=o(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=c[c.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=o(t.insertAt.before,n);n.insertBefore(e,r)}}function d(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function p(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var i=function(){0;return n.nc}();i&&(t.attrs.nonce=i)}return m(e,t.attrs),h(t,e),e}function m(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function v(t,e){var n,i,r,o;if(e.transform&&t.css){if(!(o="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=o}if(e.singleton){var c=a++;n=s||(s=p(e)),i=y.bind(null,n,c,!1),r=y.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",m(e,t.attrs),h(t,e),e}(e),i=function(t,e,n){var i=n.css,r=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||o)&&(i=u(i));r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([i],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),r=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=p(e),i=function(t,e){var n=e.css,i=e.media;i&&t.setAttribute("media",i);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){d(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=r()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=f(t,e);return l(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var s=n[o];(a=i[s.id]).refs--,r.push(a)}t&&l(f(t,e),e);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function y(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r,o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:i+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}}]);