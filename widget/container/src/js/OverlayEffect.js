/**
Copyright (c) 2006, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
* @class
* OverlayEffect encapsulates animation transitions that are executed when an Overlay is shown or hidden.
* @param {Overlay}	overlay		The Overlay that the animation should be associated with
* @param {object}	attrIn		The object literal representing the animation arguments to be used for the animate-in transition. The arguments for this literal are: attributes(object, see YAHOO.util.Anim for description), duration(float), and method(i.e. YAHOO.util.Easing.easeIn).
* @param {object}	attrOut		The object literal representing the animation arguments to be used for the animate-out transition. The arguments for this literal are: attributes(object, see YAHOO.util.Anim for description), duration(float), and method(i.e. YAHOO.util.Easing.easeIn).
* @param {Element}	targetElement	Optional. The target element that should be animated during the transition. Defaults to overlay.element.
* @constructor
*/
YAHOO.widget.OverlayEffect = function(overlay, attrIn, attrOut, targetElement) {
	this.overlay = overlay;

	this.attrIn = attrIn;
	this.attrOut = attrOut;

	this.targetElement = targetElement || overlay.element;

	this.beforeAnimateInEvent = new YAHOO.util.CustomEvent("beforeAnimateIn");
	this.beforeAnimateOutEvent = new YAHOO.util.CustomEvent("beforeAnimateOut");

	this.animateInCompleteEvent = new YAHOO.util.CustomEvent("animateInComplete");
	this.animateOutCompleteEvent = new YAHOO.util.CustomEvent("animateOutComplete");
}

/**
* Initializes the animation classes and events.
* @param {class}	Optional. The animation class to instantiate. Defaults to YAHOO.util.Anim. Other options include YAHOO.util.Motion.
*/
YAHOO.widget.OverlayEffect.prototype.init = function(animClass) {
	if (! animClass) {
		animClass = YAHOO.util.Anim;
	}
	this.animIn = new animClass(this.targetElement, this.attrIn.attributes, this.attrIn.duration, this.attrIn.method);
	this.animIn.onStart.subscribe(this.handleStartAnimateIn, this);
	this.animIn.onTween.subscribe(this.handleTweenAnimateIn, this);
	this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn, this);

	this.animOut = new animClass(this.targetElement, this.attrOut.attributes, this.attrOut.duration, this.attrOut.method);
	this.animOut.onStart.subscribe(this.handleStartAnimateOut, this);
	this.animOut.onTween.subscribe(this.handleTweenAnimateOut, this);
	this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut, this);
}

/**
* Triggers the in-animation.
*/
YAHOO.widget.OverlayEffect.prototype.animateIn = function() {
	this.beforeAnimateInEvent.fire();
	this.animIn.animate();
}

/**
* Triggers the out-animation.
*/
YAHOO.widget.OverlayEffect.prototype.animateOut = function() {
	this.beforeAnimateOutEvent.fire();
	this.animOut.animate();
}

/**
* The default onStart handler for the in-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleStartAnimateIn = function(type, args, obj) { }
/**
* The default onTween handler for the in-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleTweenAnimateIn = function(type, args, obj) { }
/**
* The default onComplete handler for the in-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleCompleteAnimateIn = function(type, args, obj) { }

/**
* The default onStart handler for the out-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleStartAnimateOut = function(type, args, obj) { }
/**
* The default onTween handler for the out-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleTweenAnimateOut = function(type, args, obj) { }
/**
* The default onComplete handler for the out-animation.
*/
YAHOO.widget.OverlayEffect.prototype.handleCompleteAnimateOut = function(type, args, obj) { }

/**
* A pre-configured OverlayEffect instance that can be used for fading an overlay in and out.
* @param {Overlay}	The Overlay object to animate
* @param {float}	The duration of the animation
* @type OverlayEffect
*/
YAHOO.widget.OverlayEffect.FADE = function(overlay, dur) {
	var fade = new YAHOO.widget.OverlayEffect(overlay, { attributes:{opacity: {from:0, to:1}}, duration:dur, method:YAHOO.util.Easing.easeIn }, { attributes:{opacity: {to:0}}, duration:dur, method:YAHOO.util.Easing.easeOut} );

	fade.handleStartAnimateIn = function(type,args,obj) {
		YAHOO.util.Dom.addClass(obj.overlay.element, "hide-select");
		
		if (! obj.overlay.underlay) {
			obj.overlay.cfg.refireEvent("underlay");
		}

		if (obj.overlay.underlay) {
			obj.initialUnderlayOpacity = YAHOO.util.Dom.getStyle(obj.overlay.underlay, "opacity");
			obj.overlay.underlay.style.filter = null;
		}

		YAHOO.util.Dom.setStyle(obj.overlay.element, "visibility", "visible"); 
		YAHOO.util.Dom.setStyle(obj.overlay.element, "opacity", 0);
	}

	fade.handleCompleteAnimateIn = function(type,args,obj) {
		YAHOO.util.Dom.removeClass(obj.overlay.element, "hide-select");

		if (obj.overlay.element.style.filter) {
			obj.overlay.element.style.filter = null;
		}			
		
		if (obj.overlay.underlay) {
			YAHOO.util.Dom.setStyle(obj.overlay.underlay, "opacity", obj.initialUnderlayOpacity);
		}

		obj.overlay.cfg.refireEvent("iframe");
		obj.animateInCompleteEvent.fire();
	}

	fade.handleStartAnimateOut = function(type, args, obj) {
		YAHOO.util.Dom.addClass(obj.overlay.element, "hide-select");

		if (obj.overlay.underlay) {
			obj.overlay.underlay.style.filter = null;
		}
	}

	fade.handleCompleteAnimateOut =  function(type, args, obj) { 
		YAHOO.util.Dom.removeClass(obj.overlay.element, "hide-select");
		if (obj.overlay.element.style.filter) {
			obj.overlay.element.style.filter = null;
		}				
		YAHOO.util.Dom.setStyle(obj.overlay.element, "visibility", "hidden");
		YAHOO.util.Dom.setStyle(obj.overlay.element, "opacity", 1); 

		obj.overlay.cfg.refireEvent("iframe");

		obj.animateOutCompleteEvent.fire();
	};	

	fade.init();
	return fade;
};


/**
* A pre-configured OverlayEffect instance that can be used for sliding an overlay in and out.
* @param {Overlay}	The Overlay object to animate
* @param {float}	The duration of the animation
* @type OverlayEffect
*/
YAHOO.widget.OverlayEffect.SLIDE = function(overlay, dur) {
	var x = overlay.cfg.getProperty("x") || YAHOO.util.Dom.getX(overlay.element);
	var y = overlay.cfg.getProperty("y") || YAHOO.util.Dom.getY(overlay.element);

	var clientWidth = YAHOO.util.Dom.getClientWidth();
	var offsetWidth = overlay.element.offsetWidth;

	var slide = new YAHOO.widget.OverlayEffect(overlay, { 
															attributes:{ points: { to:[x, y] } }, 
															duration:dur, 
															method:YAHOO.util.Easing.easeIn 
														}, 
														{ 
															attributes:{ points: { to:[(clientWidth+25), y] } },
															duration:dur, 
															method:YAHOO.util.Easing.easeOut
														} 
												);

	slide.handleStartAnimateIn = function(type,args,obj) {
		obj.overlay.element.style.left = (-25-offsetWidth) + "px";
		obj.overlay.element.style.top  = y + "px";
	}
	
	slide.handleTweenAnimateIn = function(type, args, obj) {


		var pos = YAHOO.util.Dom.getXY(obj.overlay.element);

		var currentX = pos[0];
		var currentY = pos[1];

		if (YAHOO.util.Dom.getStyle(obj.overlay.element, "visibility") == "hidden" && currentX < x) {
			YAHOO.util.Dom.setStyle(obj.overlay.element, "visibility", "visible");
		}

		obj.overlay.cfg.setProperty("xy", [currentX,currentY], true);
		obj.overlay.cfg.refireEvent("iframe");
	}
	
	slide.handleCompleteAnimateIn = function(type, args, obj) {
		obj.overlay.cfg.setProperty("xy", [x,y], true);
		obj.startX = x;
		obj.startY = y;
		obj.overlay.cfg.refireEvent("iframe");
		obj.animateInCompleteEvent.fire();
	}

	slide.handleStartAnimateOut = function(type, args, obj) {
		var clientWidth = YAHOO.util.Dom.getViewportWidth();
		
		var pos = YAHOO.util.Dom.getXY(obj.overlay.element);

		var x = pos[0];
		var y = pos[1];

		var currentTo = obj.animOut.attributes.points.to;
		obj.animOut.attributes.points.to = [(clientWidth+25), y];
	}

	slide.handleTweenAnimateOut = function(type, args, obj) {
		var pos = YAHOO.util.Dom.getXY(obj.overlay.element);

		var x = pos[0];
		var y = pos[1];

		obj.overlay.cfg.setProperty("xy", [x,y], true);
		obj.overlay.cfg.refireEvent("iframe");
	}

	slide.handleCompleteAnimateOut = function(type, args, obj) { 
		YAHOO.util.Dom.setStyle(obj.overlay.element, "visibility", "hidden");		
		var offsetWidth = obj.overlay.element.offsetWidth;

		obj.overlay.cfg.setProperty("xy", [x,y]);
		obj.animateOutCompleteEvent.fire();
	};	

	slide.init(YAHOO.util.Motion);
	return slide;
}
