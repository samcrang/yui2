(function(){var B=YAHOO.util,F=YAHOO.lang,L,J,K={},G={},N=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,M=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,H=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var O=function(Q){if(!E.HYPHEN.test(Q)){return Q;}if(K[Q]){return K[Q];}var R=Q;while(E.HYPHEN.exec(R)){R=R.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}K[Q]=R;return R;};var P=function(R){var Q=G[R];if(!Q){Q=new RegExp("(?:^|\\s+)"+R+"(?:\\s+|$)");G[R]=Q;}return Q;};if(N.defaultView&&N.defaultView.getComputedStyle){L=function(Q,T){var S=null;if(T=="float"){T="cssFloat";}var R=Q.ownerDocument.defaultView.getComputedStyle(Q,"");if(R){S=R[O(T)];}return Q.style[T]||S;};}else{if(N.documentElement.currentStyle&&H){L=function(Q,S){switch(O(S)){case"opacity":var U=100;try{U=Q.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(T){try{U=Q.filters("alpha").opacity;}catch(T){}}return U/100;case"float":S="styleFloat";default:var R=Q.currentStyle?Q.currentStyle[S]:null;return(Q.style[S]||R);}};}else{L=function(Q,R){return Q.style[R];};}}if(H){J=function(Q,R,S){switch(R){case"opacity":if(F.isString(Q.style.filter)){Q.style.filter="alpha(opacity="+S*100+")";if(!Q.currentStyle||!Q.currentStyle.hasLayout){Q.style.zoom=1;}}break;case"float":R="styleFloat";default:Q.style[R]=S;}};}else{J=function(Q,R,S){if(R=="float"){R="cssFloat";}Q.style[R]=S;};}var D=function(Q,R){return Q&&Q.nodeType==1&&(!R||R(Q));};YAHOO.util.Dom={get:function(S){if(S){if(S.nodeType||S.item){return S;}if(typeof S==="string"){return N.getElementById(S);}if("length" in S){var T=[];for(var R=0,Q=S.length;R<Q;++R){T[T.length]=B.Dom.get(S[R]);}return T;}return S;}return null;},getStyle:function(Q,S){S=O(S);var R=function(T){return L(T,S);};return B.Dom.batch(Q,R,B.Dom,true);},setStyle:function(Q,S,T){S=O(S);var R=function(U){J(U,S,T);};B.Dom.batch(Q,R,B.Dom,true);},getXY:function(Q){var R=function(S){if((S.parentNode===null||S.offsetParent===null||this.getStyle(S,"display")=="none")&&S!=S.ownerDocument.body){return false;}return I(S);};return B.Dom.batch(Q,R,B.Dom,true);},getX:function(Q){var R=function(S){return B.Dom.getXY(S)[0];};return B.Dom.batch(Q,R,B.Dom,true);},getY:function(Q){var R=function(S){return B.Dom.getXY(S)[1];};return B.Dom.batch(Q,R,B.Dom,true);},setXY:function(Q,T,S){var R=function(W){var V=this.getStyle(W,"position");if(V=="static"){this.setStyle(W,"position","relative");V="relative";}var Y=this.getXY(W);if(Y===false){return false;}var X=[parseInt(this.getStyle(W,"left"),10),parseInt(this.getStyle(W,"top"),10)];if(isNaN(X[0])){X[0]=(V=="relative")?0:W.offsetLeft;}if(isNaN(X[1])){X[1]=(V=="relative")?0:W.offsetTop;}if(T[0]!==null){W.style.left=T[0]-Y[0]+X[0]+"px";}if(T[1]!==null){W.style.top=T[1]-Y[1]+X[1]+"px";}if(!S){var U=this.getXY(W);if((T[0]!==null&&U[0]!=T[0])||(T[1]!==null&&U[1]!=T[1])){this.setXY(W,T,true);}}};B.Dom.batch(Q,R,B.Dom,true);},setX:function(R,Q){B.Dom.setXY(R,[Q,null]);},setY:function(Q,R){B.Dom.setXY(Q,[null,R]);},getRegion:function(Q){var R=function(S){if((S.parentNode===null||S.offsetParent===null||this.getStyle(S,"display")=="none")&&S!=S.ownerDocument.body){return false;}var T=B.Region.getRegion(S);return T;};return B.Dom.batch(Q,R,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(U,Y,V,W){U=F.trim(U);Y=Y||"*";V=(V)?B.Dom.get(V):null||N;if(!V){return[];}var R=[],Q=V.getElementsByTagName(Y),X=P(U);for(var S=0,T=Q.length;S<T;++S){if(X.test(Q[S].className)){R[R.length]=Q[S];if(W){W.call(Q[S],Q[S]);}}}return R;},hasClass:function(S,R){var Q=P(R);var T=function(U){return Q.test(U.className);};return B.Dom.batch(S,T,B.Dom,true);},addClass:function(R,Q){var S=function(T){if(this.hasClass(T,Q)){return false;}T.className=F.trim([T.className,Q].join(" "));return true;};return B.Dom.batch(R,S,B.Dom,true);},removeClass:function(S,R){var Q=P(R);var T=function(W){var V=false,X=W.className;if(R&&X&&this.hasClass(W,R)){W.className=X.replace(Q," ");if(this.hasClass(W,R)){this.removeClass(W,R);}W.className=F.trim(W.className);if(W.className===""){var U=(W.hasAttribute)?"class":"className";W.removeAttribute(U);}V=true;}return V;};return B.Dom.batch(S,T,B.Dom,true);},replaceClass:function(T,R,Q){if(!Q||R===Q){return false;}var S=P(R);var U=function(V){if(!this.hasClass(V,R)){this.addClass(V,Q);return true;}V.className=V.className.replace(S," "+Q+" ");if(this.hasClass(V,R)){this.removeClass(V,R);}V.className=F.trim(V.className);return true;};return B.Dom.batch(T,U,B.Dom,true);},generateId:function(Q,S){S=S||"yui-gen";var R=function(T){if(T&&T.id){return T.id;}var U=S+YAHOO.env._id_counter++;if(T){T.id=U;}return U;};return B.Dom.batch(Q,R,B.Dom,true)||R.apply(B.Dom,arguments);},isAncestor:function(R,S){R=B.Dom.get(R);S=B.Dom.get(S);var Q=false;if((R&&S)&&(R.nodeType&&S.nodeType)){if(R.contains&&R!==S){Q=R.contains(S);}else{if(R.compareDocumentPosition){Q=!!(R.compareDocumentPosition(S)&16);}}}else{}return Q;},inDocument:function(Q){return this.isAncestor(N.documentElement,Q);},getElementsBy:function(X,R,S,U){R=R||"*";S=(S)?B.Dom.get(S):null||N;if(!S){return[];}var T=[],W=S.getElementsByTagName(R);for(var V=0,Q=W.length;V<Q;++V){if(X(W[V])){T[T.length]=W[V];if(U){U(W[V]);}}}return T;},batch:function(U,X,W,S){U=(U&&(U.tagName||U.item))?U:B.Dom.get(U);if(!U||!X){return false;}var T=(S)?W:window;if(U.tagName||U.length===undefined){return X.call(T,U,W);}var V=[];for(var R=0,Q=U.length;R<Q;++R){V[V.length]=X.call(T,U[R],W);}return V;},getDocumentHeight:function(){var R=(N.compatMode!="CSS1Compat")?N.body.scrollHeight:N.documentElement.scrollHeight;var Q=Math.max(R,B.Dom.getViewportHeight());return Q;},getDocumentWidth:function(){var R=(N.compatMode!="CSS1Compat")?N.body.scrollWidth:N.documentElement.scrollWidth;var Q=Math.max(R,B.Dom.getViewportWidth());return Q;},getViewportHeight:function(){var Q=self.innerHeight;
var R=N.compatMode;if((R||H)&&!C){Q=(R=="CSS1Compat")?N.documentElement.clientHeight:N.body.clientHeight;}return Q;},getViewportWidth:function(){var Q=self.innerWidth;var R=N.compatMode;if(R||H){Q=(R=="CSS1Compat")?N.documentElement.clientWidth:N.body.clientWidth;}return Q;},getAncestorBy:function(Q,R){while((Q=Q.parentNode)){if(D(Q,R)){return Q;}}return null;},getAncestorByClassName:function(R,Q){R=B.Dom.get(R);if(!R){return null;}var S=function(T){return B.Dom.hasClass(T,Q);};return B.Dom.getAncestorBy(R,S);},getAncestorByTagName:function(R,Q){R=B.Dom.get(R);if(!R){return null;}var S=function(T){return T.tagName&&T.tagName.toUpperCase()==Q.toUpperCase();};return B.Dom.getAncestorBy(R,S);},getPreviousSiblingBy:function(Q,R){while(Q){Q=Q.previousSibling;if(D(Q,R)){return Q;}}return null;},getPreviousSibling:function(Q){Q=B.Dom.get(Q);if(!Q){return null;}return B.Dom.getPreviousSiblingBy(Q);},getNextSiblingBy:function(Q,R){while(Q){Q=Q.nextSibling;if(D(Q,R)){return Q;}}return null;},getNextSibling:function(Q){Q=B.Dom.get(Q);if(!Q){return null;}return B.Dom.getNextSiblingBy(Q);},getFirstChildBy:function(Q,S){var R=(D(Q.firstChild,S))?Q.firstChild:null;return R||B.Dom.getNextSiblingBy(Q.firstChild,S);},getFirstChild:function(Q,R){Q=B.Dom.get(Q);if(!Q){return null;}return B.Dom.getFirstChildBy(Q);},getLastChildBy:function(Q,S){if(!Q){return null;}var R=(D(Q.lastChild,S))?Q.lastChild:null;return R||B.Dom.getPreviousSiblingBy(Q.lastChild,S);},getLastChild:function(Q){Q=B.Dom.get(Q);return B.Dom.getLastChildBy(Q);},getChildrenBy:function(R,T){var S=B.Dom.getFirstChildBy(R,T);var Q=S?[S]:[];B.Dom.getNextSiblingBy(S,function(U){if(!T||T(U)){Q[Q.length]=U;}return false;});return Q;},getChildren:function(Q){Q=B.Dom.get(Q);if(!Q){}return B.Dom.getChildrenBy(Q);},getDocumentScrollLeft:function(Q){Q=Q||N;return Math.max(Q.documentElement.scrollLeft,Q.body.scrollLeft);},getDocumentScrollTop:function(Q){Q=Q||N;return Math.max(Q.documentElement.scrollTop,Q.body.scrollTop);},insertBefore:function(R,Q){R=B.Dom.get(R);Q=B.Dom.get(Q);if(!R||!Q||!Q.parentNode){return null;}return Q.parentNode.insertBefore(R,Q);},insertAfter:function(R,Q){R=B.Dom.get(R);Q=B.Dom.get(Q);if(!R||!Q||!Q.parentNode){return null;}if(Q.nextSibling){return Q.parentNode.insertBefore(R,Q.nextSibling);}else{return Q.parentNode.appendChild(R);}},getClientRegion:function(){var S=B.Dom.getDocumentScrollTop(),R=B.Dom.getDocumentScrollLeft(),T=B.Dom.getViewportWidth()+R,Q=B.Dom.getViewportHeight()+S;return new B.Region(S,T,Q,R);}};var I=function(){if(N.documentElement.getBoundingClientRect){return function(S){var T=S.getBoundingClientRect(),R=Math.round;var Q=S.ownerDocument;return[R(T.left+B.Dom.getDocumentScrollLeft(Q)),R(T.top+B.Dom.getDocumentScrollTop(Q))];};}else{return function(S){var T=[S.offsetLeft,S.offsetTop];var R=S.offsetParent;var Q=(M&&B.Dom.getStyle(S,"position")=="absolute"&&S.offsetParent==S.ownerDocument.body);if(R!=S){while(R){T[0]+=R.offsetLeft;T[1]+=R.offsetTop;if(!Q&&M&&B.Dom.getStyle(R,"position")=="absolute"){Q=true;}R=R.offsetParent;}}if(Q){T[0]-=S.ownerDocument.body.offsetLeft;T[1]-=S.ownerDocument.body.offsetTop;}R=S.parentNode;while(R.tagName&&!E.ROOT_TAG.test(R.tagName)){if(R.scrollTop||R.scrollLeft){T[0]-=R.scrollLeft;T[1]-=R.scrollTop;}R=R.parentNode;}return T;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"@VERSION@",build:"@BUILD@"});