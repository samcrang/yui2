if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var A=YAHOO.lang,B={isArray:function(C){if(C){return A.isNumber(C.length)&&A.isFunction(C.splice);}return false;},isBoolean:function(C){return typeof C==="boolean";},isFunction:function(C){return typeof C==="function";},isNull:function(C){return C===null;},isNumber:function(C){return typeof C==="number"&&isFinite(C);},isObject:function(C){return(C&&(typeof C==="object"||A.isFunction(C)))||false;},isString:function(C){return typeof C==="string";},isUndefined:function(C){return typeof C==="undefined";},hasOwnProperty:function(C,D){if(Object.prototype.hasOwnProperty){return C.hasOwnProperty(D);}return !A.isUndefined(C[D])&&C.constructor.prototype[D]!==C[D];},_IEEnumFix:function(E,D){if(YAHOO.env.ua.ie){var G=["toString","valueOf"],C;for(C=0;C<G.length;C=C+1){var H=G[C],F=D[H];if(A.isFunction(F)&&F!=Object.prototype[H]){E[H]=F;}}}},extend:function(G,H,E){if(!H||!G){throw new Error("extend failed, please check that "+"all dependencies are included.");}var D=function(){};D.prototype=H.prototype;G.prototype=new D();G.prototype.constructor=G;G.superclass=H.prototype;if(H.prototype.constructor==Object.prototype.constructor){H.prototype.constructor=H;}if(E){for(var C in E){G.prototype[C]=E[C];}A._IEEnumFix(G.prototype,E);}},augmentObject:function(G,F){if(!F||!G){throw new Error("Absorb failed, verify dependencies.");}var C=arguments,E,H,D=C[2];if(D&&D!==true){for(E=2;E<C.length;E=E+1){G[C[E]]=F[C[E]];}}else{for(H in F){if(D||!G[H]){G[H]=F[H];}}A._IEEnumFix(G,F);}},augmentProto:function(F,E){if(!E||!F){throw new Error("Augment failed, verify dependencies.");}var C=[F.prototype,E.prototype];for(var D=2;D<arguments.length;D=D+1){C.push(arguments[D]);}A.augmentObject.apply(this,C);},dump:function(C,H){var E,G,J=[],K="{...}",D="f(){...}",I=", ",F=" => ";if(!A.isObject(C)){return C+"";}else{if(C instanceof Date||("nodeType" in C&&"tagName" in C)){return C;}else{if(A.isFunction(C)){return D;}}}H=(A.isNumber(H))?H:3;if(A.isArray(C)){J.push("[");for(E=0,G=C.length;E<G;E=E+1){if(A.isObject(C[E])){J.push((H>0)?A.dump(C[E],H-1):K);}else{J.push(C[E]);}J.push(I);}if(J.length>1){J.pop();}J.push("]");}else{J.push("{");for(E in C){if(A.hasOwnProperty(C,E)){J.push(E+F);if(A.isObject(C[E])){J.push((H>0)?A.dump(C[E],H-1):K);}else{J.push(C[E]);}J.push(I);}}if(J.length>1){J.pop();}J.push("}");}return J.join("");},substitute:function(R,D,K){var H,G,F,N,O,Q,M=[],E,I="dump",L=" ",C="{",P="}";for(;;){H=R.lastIndexOf(C);if(H<0){break;}G=R.indexOf(P,H);if(H+1>=G){break;}E=R.substring(H+1,G);N=E;Q=null;F=N.indexOf(L);if(F>-1){Q=N.substring(F+1);N=N.substring(0,F);}O=D[N];if(K){O=K(N,O,Q);}if(A.isObject(O)){if(A.isArray(O)){O=A.dump(O,parseInt(Q,10));}else{Q=Q||"";var J=Q.indexOf(I);if(J>-1){Q=Q.substring(4);}if(O.toString===Object.prototype.toString||J>-1){O=A.dump(O,parseInt(Q,10));}else{O=O.toString();}}}else{if(!A.isString(O)&&!A.isNumber(O)){O="~-"+M.length+"-~";M[M.length]=E;}}R=R.substring(0,H)+O+R.substring(G+1);}for(H=M.length-1;H>=0;H=H-1){R=R.replace(new RegExp("~-"+H+"-~"),"{"+M[H]+"}","g");}return R;},trim:function(C){try{return C.replace(/^\s+|\s+$/g,"");}catch(D){return C;}},merge:function(){var F={},D=arguments;for(var E=0,C=D.length;E<C;E=E+1){A.augmentObject(F,D[E],true);}return F;},later:function(J,D,K,F,G){J=J||0;D=D||{};var E=K,I=F,H,C;if(A.isString(K)){E=D[K];}if(!E){throw new TypeError("method undefined");}if(!A.isArray(I)){I=[F];}H=function(){E.apply(D,I);};C=(G)?setInterval(H,J):setTimeout(H,J);return{interval:G,cancel:function(){if(this.interval){clearInterval(C);}else{clearTimeout(C);}}};},isValue:function(C){return(A.isObject(C)||A.isString(C)||A.isNumber(C)||A.isBoolean(C));}};B.augmentObject(A,B,true);YAHOO.util.Lang=A;A.augment=A.augmentProto;YAHOO.augment=A.augmentProto;YAHOO.extend=A.extend;})();YAHOO.register("yahoo",YAHOO,{version:"@VERSION@",build:"@BUILD@"});