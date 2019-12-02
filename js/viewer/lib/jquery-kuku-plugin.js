define(['jquery', 'underscore', 'Define'], function($, _, Define){
	if (!$.publish && !$.subscribe){

        (function(d){

            // source : https://github.com/phiggins42/bloody-jquery-plugins
            // the topic/subscription hash
            var cache = {};

            d.publish = function(/* String */topic, /* Array? */args){
                // summary:
                //		Publish some data on a named topic.
                // topic: String
                //		The channel to publish on
                // args: Array?
                //		The data to publish. Each array item is converted into an ordered
                //		arguments on the subscribed functions.
                //
                // example:
                //		Publish stuff on '/some/topic'. Anything subscribed will be called
                //		with a function signature like: function(a,b,c){ ... }
                //
                //	|		$.publish("/some/topic", ["a","b","c"]);
                cache[topic] && d.each(cache[topic], function(){

                    //2014. 11. 04 replace apply -> call
                    this.call(d, args || []);
                });
            };

            d.subscribe = function(/* String */topic, /* Function */callback){
                // summary:
                //		Register a callback on a named topic.
                // topic: String
                //		The channel to subscribe to
                // callback: Function
                //		The handler event. Anytime something is $.publish'ed on a
                //		subscribed channel, the callback will be called with the
                //		published array as ordered arguments.
                //
                // returns: Array
                //		A handle which can be used to unsubscribe this particular subscription.
                //
                // example:
                //	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
                //
                if(!cache[topic]){
                    cache[topic] = [];
                }
                cache[topic].push(callback);
                return [topic, callback]; // Array
            };

            d.unsubscribe = function(/* Array */handle){
                // summary:
                //		Disconnect a subscribed function for a topic.
                // handle: Array
                //		The return value from a $.subscribe call.
                // example:
                //	|	var handle = $.subscribe("/something", function(){});
                //	|	$.unsubscribe(handle);

                var t = handle[0];
                cache[t] && d.each(cache[t], function(idx){
                    if(this == handle[1]){
                        cache[t].splice(idx, 1);
                    }
                });
            };

        })($);
	}

    if (!$.fn.typeof){
        (function(o){
            o.typeof = function(node){
                if ( ! node){
                    return null;
                }

                var objectTypeClasses = [Define.CLASS.kkShape, Define.CLASS.kkImage, Define.CLASS.kkChart, Define.CLASS.kkPageBreak];
                var oType = { type : "none", realType : "none" };

                if (node.nodeType == 3){
                    oType.type = oType.realType = "text";
                }else{
                    var objClass = null;
                    _(objectTypeClasses).each(function(className){
                        if ($(node).hasClass(className)){
                            objClass = className;
                            return false;
                        }
                    });

                    if (objClass){
                        oType.type = "object";
                        oType.realType = objClass;
                    }
                }

                return oType;
            }
        })($);
    }

    if (!$.fn.attrAll) {
        (function(old) {
            $.fn.attrAll = function() {
                if(arguments.length === 0) {
                    if(this.length === 0) {
                        return null;
                    }

                    var obj = {};
                    $.each(this[0].attributes, function() {
                        if(this.specified) {
                            obj[this.name] = this.value;
                        }
                    });
                    return obj;
                }

                return old.apply(this, arguments);
            };
        })($.fn.attr);
    }

    if (!$.browser){
        (function(o){

            var browser;
            jQuery.uaMatch = function (ua) {
                ua = ua.toLowerCase();

                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                    /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            };

            // Don't clobber any existing jQuery.browser in case it's different
            if (!jQuery.browser) {
                matched = jQuery.uaMatch(navigator.userAgent);
                browser = {};

                if (matched.browser) {
                    browser[matched.browser] = true;
                    browser.version = matched.version;
                }

                // Chrome is Webkit, but Webkit is also Safari.
                if (browser.chrome) {
                    browser.webkit = true;
                } else if (browser.webkit) {
                    browser.safari = true;
                }

                browser.isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

                jQuery.browser = browser;
            }

        })($);
    }

    if(!$.fn.scrollIntoView) {
        (function ($) {
            var converter = {
                vertical: { x: false, y: true },
                horizontal: { x: true, y: false },
                both: { x: true, y: true },
                x: { x: true, y: false },
                y: { x: false, y: true }
            };

            var settings = {
                duration: "fast",
                direction: "both"
            };

            var rootrx = /^(?:html)$/i;

            // gets border dimensions
            var borders = function (domElement, styles) {
                styles = styles || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(domElement, null) : domElement.currentStyle);
                var px = document.defaultView && document.defaultView.getComputedStyle ? true : false;
                var b = {
                    top: (parseFloat(px ? styles.borderTopWidth : $.css(domElement, "borderTopWidth")) || 0),
                    left: (parseFloat(px ? styles.borderLeftWidth : $.css(domElement, "borderLeftWidth")) || 0),
                    bottom: (parseFloat(px ? styles.borderBottomWidth : $.css(domElement, "borderBottomWidth")) || 0),
                    right: (parseFloat(px ? styles.borderRightWidth : $.css(domElement, "borderRightWidth")) || 0)
                };
                return {
                    top: b.top,
                    left: b.left,
                    bottom: b.bottom,
                    right: b.right,
                    vertical: b.top + b.bottom,
                    horizontal: b.left + b.right
                };
            };

            var dimensions = function ($element) {
                var win = $(window);
                var isRoot = rootrx.test($element[0].nodeName);
                return {
                    border: isRoot ? { top: 0, left: 0, bottom: 0, right: 0} : borders($element[0]),
                    scroll: {
                        top: (isRoot ? win : $element).scrollTop(),
                        left: (isRoot ? win : $element).scrollLeft()
                    },
                    scrollbar: {
                        right: isRoot ? 0 : $element.innerWidth() - $element[0].clientWidth,
                        bottom: isRoot ? 0 : $element.innerHeight() - $element[0].clientHeight
                    },
                    rect: (function () {
                        var r = $element[0].getBoundingClientRect();
                        return {
                            top: isRoot ? 0 : r.top,
                            left: isRoot ? 0 : r.left,
                            bottom: isRoot ? $element[0].clientHeight : r.bottom,
                            right: isRoot ? $element[0].clientWidth : r.right
                        };
                    })()
                };
            };

            $.fn.extend({
                scrollIntoView: function (options) {
                    /// <summary>Scrolls the first element in the set into view by scrolling its closest scrollable parent.</summary>
                    /// <param name="options" type="Object">Additional options that can configure scrolling:
                    ///        duration (default: "fast") - jQuery animation speed (can be a duration string or number of milliseconds)
                    ///        direction (default: "both") - select possible scrollings ("vertical" or "y", "horizontal" or "x", "both")
                    ///        complete (default: none) - a function to call when scrolling completes (called in context of the DOM element being scrolled)
                    /// </param>
                    /// <return type="jQuery">Returns the same jQuery set that this function was run on.</return>

                    options = $.extend({}, settings, options);
                    options.direction = converter[typeof (options.direction) === "string" && options.direction.toLowerCase()] || converter.both;

                    var dirStr = "";
                    if (options.direction.x === true) dirStr = "horizontal";
                    if (options.direction.y === true) dirStr = dirStr ? "both" : "vertical";

                    var el = this.eq(0);
                    var scroller = el.closest(":scrollable(" + dirStr + ")");

                    // check if there's anything to scroll in the first place
                    if (scroller.length > 0)
                    {
                        scroller = scroller.eq(0);

                        var dim = {
                            e: dimensions(el),
                            s: dimensions(scroller)
                        };

                        var rel = {
                            top: dim.e.rect.top - (dim.s.rect.top + dim.s.border.top),
                            bottom: dim.s.rect.bottom - dim.s.border.bottom - dim.s.scrollbar.bottom - dim.e.rect.bottom,
                            left: dim.e.rect.left - (dim.s.rect.left + dim.s.border.left),
                            right: dim.s.rect.right - dim.s.border.right - dim.s.scrollbar.right - dim.e.rect.right
                        };

                        var animOptions = {};

                        // vertical scroll
                        if (options.direction.y === true)
                        {
                            if (rel.top < 0)
                            {
                                animOptions.scrollTop = dim.s.scroll.top + rel.top;
                            }
                            else if (rel.top > 0 && rel.bottom < 0)
                            {
                                animOptions.scrollTop = dim.s.scroll.top + Math.min(rel.top, -rel.bottom);
                            }
                        }

                        // horizontal scroll
                        if (options.direction.x === true)
                        {
                            if (rel.left < 0)
                            {
                                animOptions.scrollLeft = dim.s.scroll.left + rel.left;
                            }
                            else if (rel.left > 0 && rel.right < 0)
                            {
                                animOptions.scrollLeft = dim.s.scroll.left + Math.min(rel.left, -rel.right);
                            }
                        }

                        // scroll if needed
                        if (!$.isEmptyObject(animOptions))
                        {
                            if (rootrx.test(scroller[0].nodeName))
                            {
                                scroller = $("html,body");
                            }
                            scroller
                                .animate(animOptions, options.duration)
                                .eq(0) // we want function to be called just once (ref. "html,body")
                                .queue(function (next) {
                                    $.isFunction(options.complete) && options.complete.call(scroller[0]);
                                    next();
                                });
                        }
                        else
                        {
                            // when there's nothing to scroll, just call the "complete" function
                            $.isFunction(options.complete) && options.complete.call(scroller[0]);
                        }
                    }

                    // return set back
                    return this;
                }
            });

            var scrollValue = {
                auto: true,
                scroll: true,
                visible: false,
                hidden: false
            };

            $.extend($.expr[":"], {
                scrollable: function (element, index, meta, stack) {
                    var direction = converter[typeof (meta[3]) === "string" && meta[3].toLowerCase()] || converter.both;
                    var styles = (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(element, null) : element.currentStyle);
                    var overflow = {
                        x: scrollValue[styles.overflowX.toLowerCase()] || false,
                        y: scrollValue[styles.overflowY.toLowerCase()] || false,
                        isRoot: rootrx.test(element.nodeName)
                    };

                    // check if completely unscrollable (exclude HTML element because it's special)
                    if (!overflow.x && !overflow.y && !overflow.isRoot)
                    {
                        return false;
                    }

                    var size = {
                        height: {
                            scroll: element.scrollHeight,
                            client: element.clientHeight
                        },
                        width: {
                            scroll: element.scrollWidth,
                            client: element.clientWidth
                        },
                        // check overflow.x/y because iPad (and possibly other tablets) don't dislay scrollbars
                        scrollableX: function () {
                            return (overflow.x || overflow.isRoot) && this.width.scroll > this.width.client;
                        },
                        scrollableY: function () {
                            return (overflow.y || overflow.isRoot) && this.height.scroll > this.height.client;
                        }
                    };
                    return direction.y && size.scrollableY() || direction.x && size.scrollableX();
                }
            });
        })(jQuery);
    };
});