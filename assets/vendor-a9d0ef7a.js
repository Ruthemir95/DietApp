function n(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var e={exports:{}},t={};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function(n){function e(n,e){var t=n.length;n.push(e);n:for(;0<t;){var a=t-1>>>1,l=n[a];if(!(0<r(l,e)))break n;n[a]=e,n[t]=l,t=a}}function t(n){return 0===n.length?null:n[0]}function a(n){if(0===n.length)return null;var e=n[0],t=n.pop();if(t!==e){n[0]=t;n:for(var a=0,l=n.length,i=l>>>1;a<i;){var u=2*(a+1)-1,o=n[u],s=u+1,c=n[s];if(0>r(o,t))s<l&&0>r(c,o)?(n[a]=c,n[s]=t,a=s):(n[a]=o,n[u]=t,a=u);else{if(!(s<l&&0>r(c,t)))break n;n[a]=c,n[s]=t,a=s}}}return e}function r(n,e){var t=n.sortIndex-e.sortIndex;return 0!==t?t:n.id-e.id}if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;n.unstable_now=function(){return l.now()}}else{var i=Date,u=i.now();n.unstable_now=function(){return i.now()-u}}var o=[],s=[],c=1,f=null,b=3,p=!1,d=!1,v=!1,y="function"==typeof setTimeout?setTimeout:null,_="function"==typeof clearTimeout?clearTimeout:null,m="undefined"!=typeof setImmediate?setImmediate:null;function g(n){for(var r=t(s);null!==r;){if(null===r.callback)a(s);else{if(!(r.startTime<=n))break;a(s),r.sortIndex=r.expirationTime,e(o,r)}r=t(s)}}function h(n){if(v=!1,g(n),!d)if(null!==t(o))d=!0,F(k);else{var e=t(s);null!==e&&N(h,e.startTime-n)}}function k(e,r){d=!1,v&&(v=!1,_(P),P=-1),p=!0;var l=b;try{for(g(r),f=t(o);null!==f&&(!(f.expirationTime>r)||e&&!M());){var i=f.callback;if("function"==typeof i){f.callback=null,b=f.priorityLevel;var u=i(f.expirationTime<=r);r=n.unstable_now(),"function"==typeof u?f.callback=u:f===t(o)&&a(o),g(r)}else a(o);f=t(o)}if(null!==f)var c=!0;else{var y=t(s);null!==y&&N(h,y.startTime-r),c=!1}return c}finally{f=null,b=l,p=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var w,x=!1,I=null,P=-1,T=5,C=-1;function M(){return!(n.unstable_now()-C<T)}function L(){if(null!==I){var e=n.unstable_now();C=e;var t=!0;try{t=I(!0,e)}finally{t?w():(x=!1,I=null)}}else x=!1}if("function"==typeof m)w=function(){m(L)};else if("undefined"!=typeof MessageChannel){var j=new MessageChannel,E=j.port2;j.port1.onmessage=L,w=function(){E.postMessage(null)}}else w=function(){y(L,0)};function F(n){I=n,x||(x=!0,w())}function N(e,t){P=y((function(){e(n.unstable_now())}),t)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(n){n.callback=null},n.unstable_continueExecution=function(){d||p||(d=!0,F(k))},n.unstable_forceFrameRate=function(n){0>n||125<n||(T=0<n?Math.floor(1e3/n):5)},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_getFirstCallbackNode=function(){return t(o)},n.unstable_next=function(n){switch(b){case 1:case 2:case 3:var e=3;break;default:e=b}var t=b;b=e;try{return n()}finally{b=t}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break;default:n=3}var t=b;b=n;try{return e()}finally{b=t}},n.unstable_scheduleCallback=function(a,r,l){var i=n.unstable_now();switch("object"==typeof l&&null!==l?l="number"==typeof(l=l.delay)&&0<l?i+l:i:l=i,a){case 1:var u=-1;break;case 2:u=250;break;case 5:u=1073741823;break;case 4:u=1e4;break;default:u=5e3}return a={id:c++,callback:r,priorityLevel:a,startTime:l,expirationTime:u=l+u,sortIndex:-1},l>i?(a.sortIndex=l,e(s,a),null===t(o)&&a===t(s)&&(v?(_(P),P=-1):v=!0,N(h,l-i))):(a.sortIndex=u,e(o,a),d||p||(d=!0,F(k))),a},n.unstable_shouldYield=M,n.unstable_wrapCallback=function(n){var e=b;return function(){var t=b;b=e;try{return n.apply(this,arguments)}finally{b=t}}}}(t),e.exports=t;var a=e.exports;export{n as g,a as s};