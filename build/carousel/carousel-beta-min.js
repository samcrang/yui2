(function(){var L;YAHOO.widget.Carousel=function(o,n){this._navBtns={prev:[],next:[]};this._pages={el:null,num:0,cur:0};YAHOO.widget.Carousel.superclass.constructor.call(this,o,n);};var Q=YAHOO.widget.Carousel,c=YAHOO.util.Dom,a=YAHOO.util.Event,l=YAHOO.lang;L="Carousel";var O={},E="afterScroll",Y="beforeHide",H="beforePageChange",f="beforeScroll",U="beforeShow",B="blur",T="focus",X="hide",N="itemAdded",k="itemRemoved",C="itemSelected",J="loadItems",G="navigationStateChange",P="noItems",d="pageChange",F="render",R="show",V="startAutoPlay",m="stopAutoPlay",I="uiUpdate";function W(){var o=this._firstItem,n;if(o>=this.get("numItems")-1){if(this.get("isCircular")){n=0;}else{this.stopAutoPlay();}}else{n=o+this.get("numVisible");}this.scrollTo.call(this,n);}function S(o,n){var p=document.createElement(o);n=n||{};if(n.className){c.addClass(p,n.className);}if(n.parent){n.parent.appendChild(p);}if(n.id){p.setAttribute("id",n.id);}if(n.content){if(n.content.nodeName){p.appendChild(n.content);}else{p.innerHTML=n.content;}}return p;}function b(p,o,n){var r;if(!p){return 0;}function q(u,t){var v;v=parseInt(c.getStyle(u,t),10);return l.isNumber(v)?v:0;}function s(u,t){var v;v=parseFloat(c.getStyle(u,t));return l.isNumber(v)?v:0;}if(typeof n=="undefined"){n="int";}switch(o){case"height":r=p.offsetHeight;if(r>0){r+=q(p,"marginTop")+q(p,"marginBottom");}else{r=s(p,"height")+q(p,"marginTop")+q(p,"marginBottom")+q(p,"borderTopWidth")+q(p,"borderBottomWidth")+q(p,"paddingTop")+q(p,"paddingBottom");}break;case"width":r=p.offsetWidth;if(r>0){r+=q(p,"marginLeft")+q(p,"marginRight");}else{r=s(p,"width")+q(p,"marginLeft")+q(p,"marginRight")+q(p,"borderLeftWidth")+q(p,"borderRightWidth")+q(p,"paddingLeft")+q(p,"paddingRight");}break;default:if(n=="int"){r=q(p,o);if(o=="marginRight"&&YAHOO.env.ua.webkit){r=q(p,"marginLeft");}}else{if(n=="float"){r=s(p,o);}else{r=c.getStyle(p,o);}}break;}return r;}function K(p){var q,o=0,n=false;if(this._itemsTable.numItems===0){return 0;}if(typeof p=="undefined"){if(this._itemsTable.size>0){return this._itemsTable.size;}}if(l.isUndefined(this._itemsTable.items[0])){return 0;}q=c.get(this._itemsTable.items[0].id);if(typeof p=="undefined"){n=this.get("isVertical");}else{n=p=="height";}if(n){o=b(q,"height");}else{o=b(q,"width");}if(typeof p=="undefined"){this._itemsTable.size=o;}return o;}function g(p){var o=0,n=0;o=K.call(this);n=o*p;if(this.get("isVertical")){n-=p;}return n;}function Z(){var r=this.get("firstVisible"),o=0,n=this.get("numItems"),p=this.get("numVisible"),q=this.get("revealAmount");o=r+p-1+(q?1:0);o=o>n-1?n-1:o;if(!this.getItem(r)||!this.getItem(o)){this.fireEvent(J,{ev:J,first:r,last:o,num:o-r});}}function e(n,o){o.scrollPageBackward();a.preventDefault(n);}function h(n,o){o.scrollPageForward();a.preventDefault(n);}function j(s,n){var v,x=this.CLASSES,o,u=this._firstItem,p=this.get("isCircular"),t=this.get("numItems"),w=this.get("numVisible"),r=n,q=u+w-1;v=w>1&&!p&&r>s;if(r>=0&&r<t){if(!l.isUndefined(this._itemsTable.items[r])){o=c.get(this._itemsTable.items[r].id);if(o){c.removeClass(o,x.SELECTED_ITEM);}}}if(l.isNumber(s)){s=parseInt(s,10);s=l.isNumber(s)?s:0;}else{s=u;}if(l.isUndefined(this._itemsTable.items[s])){this.scrollTo(s);}if(!l.isUndefined(this._itemsTable.items[s])){o=c.get(this._itemsTable.items[s].id);if(o){c.addClass(o,x.SELECTED_ITEM);}}if(s<u||s>q){if(v){this.scrollTo(u-w,true);}else{this.scrollTo(s);}}}function i(){var p=false,o=this.CLASSES,r,s,n,q;s=this.get("element").id;if(l.isUndefined(O[s])||!O[s].rendered){return;}n=this.get("navigation");q=this._firstItem+this.get("numVisible");if(n.prev){if(this.get("numItems")===0||this._firstItem===0){if(this.get("numItems")===0||!this.get("isCircular")){a.removeListener(n.prev,"click",e);c.addClass(n.prev,o.FIRST_NAV_DISABLED);for(r=0;r<this._navBtns.prev.length;r++){this._navBtns.prev[r].setAttribute("disabled","true");}this._prevEnabled=false;}else{p=!this._prevEnabled;}}else{p=!this._prevEnabled;}if(p){a.on(n.prev,"click",e,this);c.removeClass(n.prev,o.FIRST_NAV_DISABLED);for(r=0;r<this._navBtns.prev.length;r++){this._navBtns.prev[r].removeAttribute("disabled");}this._prevEnabled=true;}}p=false;if(n.next){if(q>=this.get("numItems")){if(!this.get("isCircular")){a.removeListener(n.next,"click",h);c.addClass(n.next,o.DISABLED);for(r=0;r<this._navBtns.next.length;r++){this._navBtns.next[r].setAttribute("disabled","true");}this._nextEnabled=false;}else{p=!this._nextEnabled;}}else{p=!this._nextEnabled;}if(p){a.on(n.next,"click",h,this);c.removeClass(n.next,o.DISABLED);for(r=0;r<this._navBtns.next.length;r++){this._navBtns.next[r].removeAttribute("disabled");}this._nextEnabled=true;}}this.fireEvent(G,{next:this._nextEnabled,prev:this._prevEnabled});}function M(q){var o,n,p;o=this.get("element").id;if(l.isUndefined(O[o])||!O[o].rendered){return;}p=this.get("numVisible");if(!l.isNumber(q)){q=Math.ceil(this.get("selectedItem")/p);}n=Math.ceil(this.get("numItems")/p);this._pages.num=n;this._pages.cur=q;if(n>this.CONFIG.MAX_PAGER_BUTTONS){this._updatePagerMenu();}else{this._updatePagerButtons();}}function A(n){if(!l.isObject(n)){return;}switch(n.ev){case N:this._syncUiForItemAdd(n);break;case k:this._syncUiForItemRemove(n);break;case J:this._syncUiForLazyLoading(n);break;}this.fireEvent(I);}function D(r,o,p){var t=this,s=t.get("currentPage"),q,n=t.get("numVisible");q=parseInt(t._firstItem/n,10);if(q!=s){t.setAttributeConfig("currentPage",{value:q});t.fireEvent(d,q);}if(!p){if(t.get("selectOnScroll")){if(r!=t._selectedItem){t.set("selectedItem",t._getSelectedItem(r));}}}delete t._autoPlayTimer;if(t.get("autoPlay")>0){t.startAutoPlay();}t.fireEvent(E,{first:r,last:o},t);}Q.getById=function(n){return O[n]?O[n].object:false;};YAHOO.extend(Q,YAHOO.util.Element,{_animObj:null,_carouselEl:null,_clipEl:null,_firstItem:0,_isAnimationInProgress:false,_itemsTable:null,_navBtns:null,_navEl:null,_nextEnabled:true,_pages:null,_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CAROUSEL_EL:"yui-carousel-element",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-carousel-button-disabled",FIRST_NAV:" yui-carousel-first-button",FIRST_NAV_DISABLED:"yui-carousel-first-button-disabled",FIRST_PAGE:"yui-carousel-nav-first-page",FOCUSSED_BUTTON:"yui-carousel-button-focus",HORIZONTAL:"yui-carousel-horizontal",NAVIGATION:"yui-carousel-nav",NEXT_NAV:" yui-carousel-next-button",NEXT_PAGE:"yui-carousel-next",NAV_CONTAINER:"yui-carousel-buttons",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-item-selected",SELECTED_NAV:"yui-carousel-nav-page-selected",VERTICAL:"yui-carousel-vertical",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,ITEM_LOADING:"<img "+'src="../../build/carousel/assets/ajax-loader.gif" '+'alt="Loading" '+'style="margin-top:-32px;position:relative;top:50%;">',MAX_PAGER_BUTTONS:5,MIN_WIDTH:99,NUM_VISIBLE:3},STRINGS:{NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(s,o){var q,r,n,p=this.get("numItems");
if(!s){return false;}if(l.isString(s)||s.nodeName){r=s.nodeName?s.innerHTML:s;}else{if(l.isObject(s)){r=s.content;}else{return false;}}q=s.className||"";n=s.id?s.id:c.generateId();if(l.isUndefined(o)){this._itemsTable.items.push({item:r,className:q,id:n});}else{if(o<0||o>=p){return false;}this._itemsTable.items.splice(o,0,{item:r,className:q,id:n});}this._itemsTable.numItems++;if(p<this._itemsTable.items.length){this.set("numItems",this._itemsTable.items.length);}this.fireEvent(N,{pos:o,ev:N});return true;},addItems:function(o){var p,r,q=true;if(!l.isArray(o)){return false;}for(p=0,r=o.length;p<r;p++){if(this.addItem(o[p][0],o[p][1])===false){q=false;}}return q;},blur:function(){this._carouselEl.blur();this.fireEvent(B);},clearItems:function(){var o=this.get("numItems");while(o>0){if(!this.removeItem(0)){}if(this._itemsTable.numItems===0){this.set("numItems",0);break;}o--;}this.fireEvent(P);},focus:function(){var r,s,t,q,w,v,x,o,p,n;v=this.get("element").id;if(l.isUndefined(O[v])||!O[v].rendered){return;}if(this._isAnimationInProgress){return;}n=this.get("selectedItem");x=this.get("numVisible");o=this.get("selectOnScroll");p=(n>=0)?this.getItem(n):null;r=this.get("firstVisible");w=r+x-1;t=(n<r||n>w);s=(p&&p.id)?c.get(p.id):null;q=this._itemsTable;if(!o&&t){s=(q&&q.items&&q.items[r])?c.get(q.items[r].id):null;}if(s){try{s.focus();}catch(u){}}this.fireEvent(T);},hide:function(){if(this.fireEvent(Y)!==false){this.removeClass(this.CLASSES.VISIBLE);this.fireEvent(X);}},init:function(p,o){var n=p,q=false;if(!p){return;}this._itemsTable={loading:{},numItems:0,items:[],size:0};if(l.isString(p)){p=c.get(p);}else{if(!p.nodeName){return;}}Q.superclass.init.call(this,p,o);if(p){if(!p.id){p.setAttribute("id",c.generateId());}q=this._parseCarousel(p);if(!q){this._createCarousel(n);}}else{p=this._createCarousel(n);}n=p.id;this.initEvents();if(q){this._parseCarouselItems();}if(!o||typeof o.isVertical=="undefined"){this.set("isVertical",false);}this._parseCarouselNavigation(p);this._navEl=this._setupCarouselNavigation();O[n]={object:this,rendered:false};Z.call(this);},initAttributes:function(n){n=n||{};Q.superclass.initAttributes.call(this,n);this.setAttributeConfig("carouselEl",{validator:l.isString,value:n.carouselEl||"OL"});this.setAttributeConfig("carouselItemEl",{validator:l.isString,value:n.carouselItemEl||"LI"});this.setAttributeConfig("currentPage",{readOnly:true,value:0});this.setAttributeConfig("firstVisible",{method:this._setFirstVisible,validator:this._validateFirstVisible,value:n.firstVisible||this.CONFIG.FIRST_VISIBLE});this.setAttributeConfig("selectOnScroll",{validator:l.isBoolean,value:n.selectOnScroll||true});this.setAttributeConfig("numVisible",{method:this._setNumVisible,validator:this._validateNumVisible,value:n.numVisible||this.CONFIG.NUM_VISIBLE});this.setAttributeConfig("numItems",{method:this._setNumItems,validator:this._validateNumItems,value:this._itemsTable.numItems});this.setAttributeConfig("scrollIncrement",{validator:this._validateScrollIncrement,value:n.scrollIncrement||1});this.setAttributeConfig("selectedItem",{method:this._setSelectedItem,validator:l.isNumber,value:-1});this.setAttributeConfig("revealAmount",{method:this._setRevealAmount,validator:this._validateRevealAmount,value:n.revealAmount||0});this.setAttributeConfig("isCircular",{validator:l.isBoolean,value:n.isCircular||false});this.setAttributeConfig("isVertical",{method:this._setOrientation,validator:l.isBoolean,value:n.isVertical||false});this.setAttributeConfig("navigation",{method:this._setNavigation,validator:this._validateNavigation,value:n.navigation||{prev:null,next:null,page:null}});this.setAttributeConfig("animation",{validator:this._validateAnimation,value:n.animation||{speed:0,effect:null}});this.setAttributeConfig("autoPlay",{validator:l.isNumber,value:n.autoPlay||0});},initEvents:function(){var n=this;n.on("keydown",n._keyboardEventHandler);n.on(E,i);n.on(N,A);n.on(k,A);n.on(C,n.focus);n.on(J,A);n.on(G,n.focus);n.on(P,function(o){n.scrollTo(0);i.call(n);M.call(n);});n.on(d,M,n);n.on(F,function(o){i.call(n,o);M.call(n,o);this._setClipContainerSize();});n.on("selectedItemChange",function(o){j.call(n,o.newValue,o.prevValue);if(o.newValue>=0){n._updateTabIndex(n.getElementForItem(o.newValue));}n.fireEvent(C,o.newValue);});n.on(I,function(o){i.call(n,o);M.call(n,o);});n.on("firstVisibleChange",function(o){if(!n.get("selectOnScroll")){if(o.newValue>=0){n._updateTabIndex(n.getElementForItem(o.newValue));}}});n.on("click",function(o){n._itemClickHandler(o);n._pagerClickHandler(o);});a.onFocus(n.get("element"),function(o,p){p._updateNavButtons(a.getTarget(o),true);},n);a.onBlur(n.get("element"),function(o,p){p._updateNavButtons(a.getTarget(o),false);},n);},isAnimating:function(){return this._isAnimationInProgress;},getElementForItem:function(n){if(n<0||n>=this.get("numItems")){return null;}if(this._itemsTable.numItems>n){if(!l.isUndefined(this._itemsTable.items[n])){return c.get(this._itemsTable.items[n].id);}}return null;},getElementForItems:function(){var o=[],n;for(n=0;n<this._itemsTable.numItems;n++){o.push(this.getElementForItem(n));}return o;},getItem:function(n){if(n<0||n>=this.get("numItems")){return null;}if(this._itemsTable.numItems>n){if(!l.isUndefined(this._itemsTable.items[n])){return this._itemsTable.items[n];}}return null;},getItems:function(n){return this._itemsTable.items;},getItemPositionById:function(q){var o=0,p=this._itemsTable.numItems;while(o<p){if(!l.isUndefined(this._itemsTable.items[o])){if(this._itemsTable.items[o].id==q){return o;}}o++;}return -1;},getVisibleItems:function(){var o=this.get("firstVisible"),q=o+this.get("numVisible"),p=[];while(o<q){p.push(this.getElementForItem(o));o++;}return p;},removeItem:function(o){var p,n=this.get("numItems");if(o<0||o>=n){return false;}p=this._itemsTable.items.splice(o,1);if(p&&p.length==1){this._itemsTable.numItems--;this.set("numItems",n-1);this.fireEvent(k,{item:p[0],pos:o,ev:k});return true;}return false;},render:function(o){var n=this.CLASSES;
this.addClass(n.CAROUSEL);if(!this._clipEl){this._clipEl=this._createCarouselClip();this._clipEl.appendChild(this._carouselEl);}if(o){this.appendChild(this._clipEl);this.appendTo(o);}else{if(!c.inDocument(this.get("element"))){return false;}this.appendChild(this._clipEl);}if(this.get("isVertical")){this.addClass(n.VERTICAL);}else{this.addClass(n.HORIZONTAL);}if(this.get("numItems")<1){return false;}this._reRender();return true;},scrollBackward:function(){this.scrollTo(this._firstItem-this.get("scrollIncrement"));},scrollForward:function(){this.scrollTo(this._firstItem+this.get("scrollIncrement"));},scrollPageBackward:function(){this.scrollTo(this._firstItem-this.get("numVisible"));},scrollPageForward:function(){this.scrollTo(this._firstItem+this.get("numVisible"));},scrollTo:function(AA,o){var n,s=this.get("animation"),q=this.get("isCircular"),z,y,x=this._firstItem,v=this.get("numItems"),w=this.get("numVisible"),r,u=this.get("currentPage"),p,t;if(AA==x){return;}if(this.isAnimating()){return;}if(AA<0){if(q){AA=v+AA;}else{return;}}else{if(v>0&&AA>v-1){if(this.get("isCircular")){AA=v-AA;}else{return;}}}y=(this._firstItem>AA)?"backward":"forward";t=x+w;t=(t>v-1)?v-1:t;p=this.fireEvent(f,{dir:y,first:x,last:t});if(p===false){return;}this.fireEvent(H,{page:u});z=x-AA;this._firstItem=AA;this.set("firstVisible",AA);Z.call(this);t=AA+w;t=(t>v-1)?v-1:t;r=g.call(this,z);n=s.speed>0;if(n){this._animateAndSetCarouselOffset(r,AA,t,o);}else{this._setCarouselOffset(r);D.call(this,AA,t,o);}},show:function(){var n=this.CLASSES;if(this.fireEvent(U)!==false){this.addClass(n.VISIBLE);this.fireEvent(R);}},startAutoPlay:function(){var n=this,o=this.get("autoPlay");if(o>0){if(!l.isUndefined(this._autoPlayTimer)){return;}this.fireEvent(V);this._autoPlayTimer=setTimeout(function(){W.call(n);},o);}},stopAutoPlay:function(){if(!l.isUndefined(this._autoPlayTimer)){clearTimeout(this._autoPlayTimer);delete this._autoPlayTimer;this.set("autoPlay",0);this.fireEvent(m);}},toString:function(){return L+(this.get?" (#"+this.get("id")+")":"");},_animateAndSetCarouselOffset:function(s,r,o,q){var p=this.get("animation"),n=null;if(this.get("isVertical")){n=new YAHOO.util.Motion(this._carouselEl,{points:{by:[0,s]}},p.speed,p.effect);}else{n=new YAHOO.util.Motion(this._carouselEl,{points:{by:[s,0]}},p.speed,p.effect);}this._isAnimationInProgress=true;n.onComplete.subscribe(this._animationCompleteHandler,{scope:this,first:r,last:o,dontSelect:q});n.animate();},_animationCompleteHandler:function(n,q,r){r.scope._isAnimationInProgress=false;D.call(r.scope,r.first,r.last,r.dontSelect);},_createCarousel:function(o){var n=this.CLASSES,p=c.get(o);if(!p){p=S("DIV",{className:n.CAROUSEL,id:o});}if(!this._carouselEl){this._carouselEl=S(this.get("carouselEl"),{className:n.CAROUSEL_EL});}return p;},_createCarouselClip:function(){return S("DIV",{className:this.CLASSES.CONTENT});},_createCarouselItem:function(n){return S(this.get("carouselItemEl"),{className:n.className,content:n.content,id:n.id});},_getSelectedItem:function(q){var n=this.get("isCircular"),p=this.get("numItems"),o=p-1;if(q<0){if(n){q=p+q;}else{q=this.get("selectedItem");}}else{if(q>o){if(n){q=q-p;}else{q=this.get("selectedItem");}}}return q;},_itemClickHandler:function(q){var n=this.get("element"),o,p,r=YAHOO.util.Event.getTarget(q);while(r&&r!=n&&r.id!=this._carouselEl){o=r.nodeName;if(o.toUpperCase()==this.get("carouselItemEl")){break;}r=r.parentNode;}if((p=this.getItemPositionById(r.id))>=0){this.set("selectedItem",this._getSelectedItem(p));}},_keyboardEventHandler:function(q){var p=a.getCharCode(q),o=false,n=0,r;if(this.isAnimating()){return;}switch(p){case 37:case 38:r=this.get("selectedItem");if(r==this._firstItem){n=r-this.get("numVisible");this.scrollTo(n);this.set("selectedItem",this._getSelectedItem(r-1));}else{n=this.get("selectedItem")-this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(n));}o=true;break;case 39:case 40:n=this.get("selectedItem")+this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(n));o=true;break;case 33:this.scrollPageBackward();o=true;break;case 34:this.scrollPageForward();o=true;break;}if(o){a.preventDefault(q);}},_pagerClickHandler:function(n){var q,o,p;o=a.getTarget(n);p=o.href||o.value;if(l.isString(p)&&p){q=p.lastIndexOf("#");if(q!=-1){p=this.getItemPositionById(p.substring(q+1));this.scrollTo(p);a.preventDefault(n);}}},_parseCarousel:function(p){var s,n,o,r,q;n=this.CLASSES;o=this.get("carouselEl");r=false;for(s=p.firstChild;s;s=s.nextSibling){if(s.nodeType==1){q=s.nodeName;if(q.toUpperCase()==o){this._carouselEl=s;c.addClass(this._carouselEl,this.CLASSES.CAROUSEL_EL);r=true;}}}return r;},_parseCarouselItems:function(){var r,n,o,q,p=this._carouselEl;n=this.get("carouselItemEl");for(r=p.firstChild;r;r=r.nextSibling){if(r.nodeType==1){q=r.nodeName;if(q.toUpperCase()==n){if(r.id){o=r.id;}else{o=c.generateId();r.setAttribute("id",o);}this.addItem(r);}}}},_parseCarouselNavigation:function(s){var o,n=this.CLASSES,r,q,p,t,u=false;t=c.getElementsByClassName(n.PREV_PAGE,"*",s);if(t.length>0){for(q in t){if(t.hasOwnProperty(q)){r=t[q];if(r.nodeName=="INPUT"||r.nodeName=="BUTTON"){this._navBtns.prev.push(r);}else{p=r.getElementsByTagName("INPUT");if(l.isArray(p)&&p.length>0){this._navBtns.prev.push(p[0]);}else{p=r.getElementsByTagName("BUTTON");if(l.isArray(p)&&p.length>0){this._navBtns.prev.push(p[0]);}}}}}o={prev:t};}t=c.getElementsByClassName(n.NEXT_PAGE,"*",s);if(t.length>0){for(q in t){if(t.hasOwnProperty(q)){r=t[q];if(r.nodeName=="INPUT"||r.nodeName=="BUTTON"){this._navBtns.next.push(r);}else{p=r.getElementsByTagName("INPUT");if(l.isArray(p)&&p.length>0){this._navBtns.next.push(p[0]);}else{p=r.getElementsByTagName("BUTTON");if(l.isArray(p)&&p.length>0){this._navBtns.next.push(p[0]);}}}}}if(o){o.next=t;}else{o={next:t};}}if(o){this.set("navigation",o);u=true;}return u;},_reRender:function(){O[this.get("element").id].rendered=true;this.fireEvent(F);},_setCarouselOffset:function(o){var n;n=this.get("isVertical")?"top":"left";
o+=o!==0?b(this._carouselEl,n):0;c.setStyle(this._carouselEl,n,o+"px");},_setupCarouselNavigation:function(){var q,o,n,t,r,s,p;n=this.CLASSES;r=c.getElementsByClassName(n.NAVIGATION,"DIV",this.get("element"));if(r.length===0){r=S("DIV",{className:n.NAVIGATION});this.insertBefore(r,c.getFirstChild(this.get("element")));}else{r=r[0];}this._pages.el=S("UL");r.appendChild(this._pages.el);t=this.get("navigation");if(l.isString(t.prev)||l.isArray(t.prev)){if(l.isString(t.prev)){t.prev=[t.prev];}for(q in t.prev){if(t.prev.hasOwnProperty(q)){this._navBtns.prev.push(c.get(t.prev[q]));}}}else{p=S("SPAN",{className:n.BUTTON+n.FIRST_NAV});c.setStyle(p,"visibility","visible");q=c.generateId();p.innerHTML='<button type="button" '+'id="'+q+'" name="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'">'+this.STRINGS.PREVIOUS_BUTTON_TEXT+"</button>";r.appendChild(p);q=c.get(q);this._navBtns.prev=[q];o={prev:[p]};}if(l.isString(t.next)||l.isArray(t.next)){if(l.isString(t.next)){t.next=[t.next];}for(q in t.next){if(t.next.hasOwnProperty(q)){this._navBtns.next.push(c.get(t.next[q]));}}}else{s=S("SPAN",{className:n.BUTTON+n.NEXT_NAV});c.setStyle(s,"visibility","visible");q=c.generateId();s.innerHTML='<button type="button" '+'id="'+q+'" name="'+this.STRINGS.NEXT_BUTTON_TEXT+'">'+this.STRINGS.NEXT_BUTTON_TEXT+"</button>";r.appendChild(s);q=c.get(q);this._navBtns.next=[q];if(o){o.next=[s];}else{o={next:[s]};}}if(o){this.set("navigation",o);}return r;},_setClipContainerSize:function(o,q){var r,n,s,t,u,v,p;s=this.get("isVertical");u=this.get("revealAmount");p=s?"height":"width";r=s?"top":"left";o=o||this._clipEl;if(!o){return;}q=q||this.get("numVisible");t=K.call(this,p);v=t*q;this._recomputeSize=(v===0);if(this._recomputeSize){return;}if(u>0){u=t*(u/100)*2;v+=u;n=parseFloat(c.getStyle(this._carouselEl,r));n=l.isNumber(n)?n:0;c.setStyle(this._carouselEl,r,n+(u/2)+"px");}if(s){v+=b(this._carouselEl,"marginTop")+b(this._carouselEl,"marginBottom")+b(this._carouselEl,"paddingTop")+b(this._carouselEl,"paddingBottom")+b(this._carouselEl,"borderTopWidth")+b(this._carouselEl,"borderBottomWidth");c.setStyle(o,p,(v-(q-1))+"px");}else{v+=b(this._carouselEl,"marginLeft")+b(this._carouselEl,"marginRight")+b(this._carouselEl,"paddingLeft")+b(this._carouselEl,"paddingRight")+b(this._carouselEl,"borderLeftWidth")+b(this._carouselEl,"borderRightWidth");c.setStyle(o,p,v+"px");}this._setContainerSize(o);},_setContainerSize:function(q,n){var o=this.CONFIG,r,p;r=this.get("isVertical");q=q||this._clipEl;n=n||(r?"height":"width");p=parseFloat(c.getStyle(q,n),10);p=l.isNumber(p)?p:0;if(r){p+=b(this._carouselEl,"marginTop")+b(this._carouselEl,"marginBottom")+b(this._carouselEl,"paddingTop")+b(this._carouselEl,"paddingBottom")+b(this._carouselEl,"borderTopWidth")+b(this._carouselEl,"borderBottomWidth")+b(this._navEl,"height");}else{p+=b(q,"marginLeft")+b(q,"marginRight")+b(q,"paddingLeft")+b(q,"paddingRight")+b(q,"borderLeftWidth")+b(q,"borderRightWidth");}this.setStyle(n,p+"px");if(r){p=K.call(this,"width");p=p<o.MIN_WIDTH?o.MIN_WIDTH:p;this.setStyle("width",p+"px");}},_setFirstVisible:function(n){if(n>=0&&n<this.get("numItems")){this.scrollTo(n);}else{n=this.get("firstVisible");}return n;},_setNavigation:function(n){if(n.prev){a.on(n.prev,"click",e,this);}if(n.next){a.on(n.next,"click",h,this);}},_setNumVisible:function(n){this._setClipContainerSize(this._clipEl,n);},_setNumItems:function(o){var n=this._itemsTable.numItems;if(l.isArray(this._itemsTable.items)){if(this._itemsTable.items.length!=n){n=this._itemsTable.items.length;this._itemsTable.numItems=n;}}if(o<n){while(n>o){this.removeItem(n-1);n--;}}return o;},_setOrientation:function(o){var n=this.CLASSES;if(o){this.replaceClass(n.HORIZONTAL,n.VERTICAL);}else{this.replaceClass(n.VERTICAL,n.HORIZONTAL);}this._itemsTable.size=0;return o;},_setRevealAmount:function(n){if(n>=0&&n<=100){n=parseInt(n,10);n=l.isNumber(n)?n:0;this._setClipContainerSize();}else{n=this.get("revealAmount");}return n;},_setSelectedItem:function(n){this._selectedItem=n;},_syncUiForItemAdd:function(q){var t=this._carouselEl,n,v,p=this._itemsTable,r=this.get("element").id,o,s,u;s=l.isUndefined(q.pos)?p.numItems-1:q.pos;if(!l.isUndefined(p.items[s])){v=p.items[s];if(v&&!l.isUndefined(v.id)){o=c.get(v.id);}}if(!o){n=this._createCarouselItem({className:v.className,content:v.item,id:v.id});if(l.isUndefined(q.pos)){if(!l.isUndefined(p.loading[s])){o=p.loading[s];}if(o){t.replaceChild(n,o);delete p.loading[s];}else{t.appendChild(n);}}else{if(!l.isUndefined(p.items[q.pos+1])){u=c.get(p.items[q.pos+1].id);}if(u){t.insertBefore(n,u);}else{}}}else{if(l.isUndefined(q.pos)){if(!c.isAncestor(this._carouselEl,o)){t.appendChild(o);}}else{if(!c.isAncestor(t,o)){if(!l.isUndefined(p.items[q.pos+1])){t.insertBefore(o,c.get(p.items[q.pos+1].id));}}}}if(l.isUndefined(O[r])||!O[r].rendered){this._reRender();}if(this.get("selectedItem")<0){this.set("selectedItem",this.get("firstVisible"));}},_syncUiForItemRemove:function(r){var n=this._carouselEl,p,q,o,s;o=this.get("numItems");q=r.item;s=r.pos;if(q&&(p=c.get(q.id))){if(p&&c.isAncestor(n,p)){a.purgeElement(p,true);n.removeChild(p);}if(this.get("selectedItem")==s){s=s>=o?o-1:s;this.set("selectedItem",s);}}else{}},_syncUiForLazyLoading:function(s){var o=this._carouselEl,r,p,n=this._itemsTable,q;for(p=s.first;p<=s.last;p++){r=this._createCarouselItem({content:this.CONFIG.ITEM_LOADING,id:c.generateId()});if(r){if(!l.isUndefined(n.items[s.last+1])){q=c.get(n.items[s.last+1].id);if(q){o.insertBefore(r,q);}else{}}else{o.appendChild(r);}}n.loading[p]=r;}},_updateNavButtons:function(r,o){var p,n=this.CLASSES,s,q=r.parentNode;if(!q){return;}s=q.parentNode;if(r.nodeName.toUpperCase()=="INPUT"&&c.hasClass(q,n.BUTTON)){if(o){if(s){p=c.getChildren(s);if(p){c.removeClass(p,n.FOCUSSED_BUTTON);}}c.addClass(q,n.FOCUSSED_BUTTON);}else{c.removeClass(q,n.FOCUSSED_BUTTON);}}},_updatePagerButtons:function(){var u=this.CLASSES,v=this._pages.cur,o,s,r,w,p=this.get("numVisible"),t=this._pages.num,q=this._pages.el;if(t===0){return;
}c.setStyle(q,"visibility","hidden");while(q.firstChild){q.removeChild(q.firstChild);}for(r=0;r<t;r++){if(l.isUndefined(this._itemsTable.items[r*p])){c.setStyle(q,"visibility","visible");break;}w=this._itemsTable.items[r*p].id;o=document.createElement("LI");if(!o){c.setStyle(q,"visibility","visible");break;}if(r===0){c.addClass(o,u.FIRST_PAGE);}if(r==v){c.addClass(o,u.SELECTED_NAV);}s='<a href="#'+w+'" tabindex="0"><em>'+this.STRINGS.PAGER_PREFIX_TEXT+" "+(r+1)+"</em></a>";o.innerHTML=s;q.appendChild(o);}c.setStyle(q,"visibility","visible");},_updatePagerMenu:function(){var u=this._pages.cur,r,q,s,v=this.get("numVisible"),p=this._pages.num,o=this._pages.el,t;if(p===0){return;}t=document.createElement("SELECT");if(!t){return;}c.setStyle(o,"visibility","hidden");while(o.firstChild){o.removeChild(o.firstChild);}for(q=0;q<p;q++){if(l.isUndefined(this._itemsTable.items[q*v])){c.setStyle(o,"visibility","visible");break;}s=this._itemsTable.items[q*v].id;r=document.createElement("OPTION");if(!r){c.setStyle(o,"visibility","visible");break;}r.value="#"+s;r.innerHTML=this.STRINGS.PAGER_PREFIX_TEXT+" "+(q+1);if(q==u){r.setAttribute("selected","selected");}t.appendChild(r);}r=document.createElement("FORM");if(!r){}else{r.appendChild(t);o.appendChild(r);}c.setStyle(o,"visibility","visible");},_updateTabIndex:function(n){if(n){if(this._focusableItemEl){this._focusableItemEl.tabIndex=-1;}this._focusableItemEl=n;n.tabIndex=0;}},_validateAnimation:function(n){var o=true;if(l.isObject(n)){if(n.speed){o=o&&l.isNumber(n.speed);}if(n.effect){o=o&&l.isFunction(n.effect);}else{if(!l.isUndefined(YAHOO.util.Easing)){n.effect=YAHOO.util.Easing.easeOut;}}}else{o=false;}return o;},_validateFirstVisible:function(o){var n=this.get("numItems");if(l.isNumber(o)){if(n===0&&o==n){return true;}else{return(o>=0&&o<this.get("numItems"));}}return false;},_validateNavigation:function(n){var o;if(!l.isObject(n)){return false;}if(n.prev){if(!l.isArray(n.prev)){return false;}for(o in n.prev){if(n.prev.hasOwnProperty(o)){if(!l.isString(n.prev[o].nodeName)){return false;}}}}if(n.next){if(!l.isArray(n.next)){return false;}for(o in n.next){if(n.next.hasOwnProperty(o)){if(!l.isString(n.next[o].nodeName)){return false;}}}}return true;},_validateNumItems:function(n){return l.isNumber(n)&&(n>=0);},_validateNumVisible:function(n){var o=false;if(l.isNumber(n)){o=n>0&&n<=this.get("numItems");}return o;},_validateRevealAmount:function(n){var o=false;if(l.isNumber(n)){o=n>=0&&n<100;}return o;},_validateScrollIncrement:function(n){var o=false;if(l.isNumber(n)){o=(n>0&&n<this.get("numItems"));}return o;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});