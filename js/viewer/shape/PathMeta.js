define('PathMeta', function() {
    return {
		"roundrect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(0.5*adj["adj"]*w),
					getA: function(v){
						return (v/(0.5*w));
					},					
					min:0,
					max:(0.5*wh)
				}
			}
		},

		"snip1rect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:((1-adj["adj"])*w),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:(w-(0.5*wh))
				}
			}
		},

		"snip2samerect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj1" : {
					aix:"x",
					fix:0,
					getV:((1-adj["adj1"])*w),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:(w-(0.5*wh))
				},
				"adj2" : {
					aix:"x",
					fix:h,
					getV:((adj["adj2"])*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:((0.5*wh))
				}				
			}
		},

		"snip2diagrect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj1" : {
					aix:"x",
					fix:0,
					getV:(adj["adj1"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*wh)
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:((1-adj["adj2"])*w),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:(w-(0.5*wh))
				}
			}
		},

		"sniproundrect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj1" : {
					aix:"x",
					fix:0,
					getV:(adj["adj1"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*wh)
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:((1-adj["adj2"])*w),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:(w-(0.5*wh))
				}
			}
		},

		"round1rect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:((1-adj["adj"])*wl),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:(wl-(0.5*wh))
				}
			}
		},


		"round2samerect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*wl),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*wl)
				}
			}
		},

		"round2diagrect":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*wl),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*wl)
				}
			}
		},

		"triangle":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:w
				}
			}
		},

		"parallelogram":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:w
				}
			}
		},

		"trapezoid":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*w)
				}
			}
		},

		"hexagon":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*w)
				}
			}
		},

		"octagon":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV:(adj["adj"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*w)
				}
			}
		},

		"frame":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:0,
					getV:(adj["adj1"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:(0.5*w)
				}
			}
		},

		"diagstripe":function(w,h,adj){
			return {
				"adj" : {
					aix:"y",
					fix:0,
					getV:(adj["adj"]*h),
					getA: function(v){
						return (v/h);
					},					
					min:0,
					max:h
				}
			}
		},

		"halfframe":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:0,
					getV:(adj["adj1"]*h),
					getA: function(v){
						return (v/h);
					},					
					min:0,
					max:h
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(adj["adj2"]*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:w
				}
			}
		},

		"bracketpair":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }
			return {
				"adj" : {
					aix:"y",
					fix:0,
					getV:(0.5*adj["adj"]*h),
					getA: function(v){
						return (v/(0.5*h));
					},					
					min:0,
					max:(0.25*wh)
				}
			}
		},

		"bracepair":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0,
					getV:(0.5*adj["adj"]*h),
					getA: function(v){
						return (v/(0.5*h));
					},					
					min:0,
					max:(0.14*wh)
				}
			}
		},

		"leftbrace":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj1" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5*adj["adj1"]*h),
					getA: function(v){
						return (v/(0.5*h));
					},					
					min:0,
					max:(0.25*wh)
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:(adj["adj2"]*h),
					getA: function(v){
						return (v/h);
					},					
					min:(adj["adj1"])*h,
					max:(1-adj["adj1"])*h
				},
			}
		},

		"rightbrace":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj1" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5*adj["adj1"]*h),
					getA: function(v){
						return (v/(0.5*h));
					},					
					min:0,
					max:(0.25*wh)
				},
				"adj2" : {
					aix:"y",
					fix:w,
					getV:(adj["adj2"]*h),
					getA: function(v){
						return (v/h);
					},					
					min:(adj["adj1"])*h,
					max:(1-adj["adj1"])*h
				},
			}
		},

		"leftbracket":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5*adj["adj"]*h),
					getA: function(v){
						return (v/(0.5*h));
					},					
					min:0,
					max:(0.25*wh)
				}
			}
		},

		"rightarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:0,
					getV: (0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-(v/(0.5*h)));
					},					
					min: 0.5*h,
					max: 0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(w-(adj['adj2']*h)),
					getA:function(v){
						return ((w-v)/h);
					},
					min: w,
					max: 0
				}
			};
		},

		"leftarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:w,
					getV:(0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-(v/(0.5*h)));
					},					
					min:0.5*h,
					max:0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(adj["adj2"]*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:w
				}
			}
		},
		
		"uparrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:h,
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/(0.5*w)));
					},					
					min:0.5*w,
					max:0
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:(adj['adj2']*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:h
				}
			}
		},

		"downarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:0,
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/(0.5*w)));
					},					
					min:0.5*w,
					max:0
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:((1-adj['adj2'])*h),
					getA:function(v){
						return (1-(v/h));
					},
					min:0,
					max:h
				}
			}
		},
			
		"leftrightarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:w-(adj['adj2']*w),
					getV:(0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-(v/(0.5*h)));
					},					
					min:0.5*h,
					max:0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(adj['adj2']*w),
					getA:function(v){
						return (v/w);
					},
					min:0.5*w,
					max:0
				}
			}
		},

		"updownarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:h-(adj['adj2']*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/(0.5*w)));
					},					
					min:0.5*w,
					max:0
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:(adj['adj2']*h),
					getA:function(v){
						return (v/h);
					},
					min:0.5*h,
					max:0
				}
			}
		},

		"quadarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:(adj['adj3']*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/(0.5*w)));
					},					
					min:0.5*w,
					max:Math.max((adj['adj3']*w),((0.5-adj['adj2'])*w))
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(0.5-adj['adj2'])*w,
					getA:function(v){
						return (0.5-(v/w));
					},
					min:0,
					max:Math.max((adj['adj3']*w),(0.5*(1-adj['adj1'])*w))
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:(adj['adj3']*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:0.25*h
				}
			}
		},
			
		"leftrightuparrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:(adj['adj3']*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/(0.5*w)));
					},					
					min:0.5*w,
					max:Math.max((adj['adj3']*w),((0.5-adj['adj2'])*w))
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(0.5-adj['adj2'])*w,
					getA:function(v){
						return (0.5-(v/w));
					},
					min:0,
					max:0.5*w
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:(adj['adj3']*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:0.25*h
				}
			}
		},

		"bentarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:h,
					getV:(adj['adj1']*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:2*(adj['adj2'])*h
				},
				"adj2" : {
					aix:"y",
					fix:w,
					getV:2*(adj['adj2'])*h,
					getA:function(v){
						return 0.5*(v/h);
					},
					min:(adj['adj1']*w),
					max:h
				},
				"adj3" : {
					aix:"x",
					fix:0,
					getV:((1-adj['adj3'])*w),
					getA:function(v){
						return (1-(v/w));
					},
					min:w,
					max:(adj['adj4']*w)
				},
				"adj4" : {
					aix:"x",
					fix:0,
					getV:(adj['adj4']*w),
					getA:function(v){
						return (v/w);
					},
					min:0,
					max:((1-adj['adj3'])*w)
				}
			}
		},

		"uturnarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:h,
					getV:(adj['adj1']*w),
					getA: function(v){
						return (v/w);
					},					
					min:0,
					max:2*(adj['adj2'])*h
				},
				"adj2" : {
					aix:"x",
					fix:h,
					getV:(1-2*(adj['adj2']))*w,
					getA:function(v){
						return 0.5*(1-(v/w));
					},
					min:w,
					max:(adj['adj1']*w)
				},
				"adj3" : {
					aix:"y",
					fix:((1-2*adj['adj2'])*w),
					getV:(((1-adj['adj3'])-(1-adj['adj5']))*h),
					getA:function(v){
						return (1-(v/h)-(1-adj['adj5']));
					},
					min:(adj['adj1']*w),
					max:(adj['adj5'])*h
				},
				"adj4" : {
					aix:"x",
					fix:0,
					getV:(adj['adj4']*w),
					getA:function(v){
						return (v/w);
					},
					min:0,
					max:w
				},
				"adj5" : {
					aix:"y",
					fix:w,
					getV:(adj['adj5']*h),
					getA:function(v){
						return (v/h);
					},
					min:((adj['adj3']*h)+(adj['adj4']*w)),
					max:h
				}
			}
		},

		"leftuparrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:h,
					getV:((1-adj['adj1'])*w),
					getA: function(v){
						return (1-(v/w));
					},					
					min:w,
					max:0.5*w
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(1-(2*adj['adj2']))*w,
					getA:function(v){
						return 0.5*(1-(v/w));
					},
					min:w,
					max:0
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:(adj['adj3']*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:0.5*h
				}
			}
		},

		"stripedrightarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:0,
					getV: (0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-(v/(0.5*h)));
					},					
					min: 0.5*h,
					max: 0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:((1-adj['adj2'])*w),
					getA:function(v){
						return (1-(v/w));
					},
					min: w,
					max: 0
				}
			};
		},

		"notchedrightarrow":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:w,
					getV: (0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-(v/(0.5*h)));
					},					
					min: 0.5*h,
					max: 0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:((1-adj['adj2'])*w),
					getA:function(v){
						return (1-(v/w));
					},
					min: w,
					max: 0
				}
			};
		},

		"homeplate":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV: (1-adj['adj'])*w,
					getA: function(v){
						return (1-(v/w));
					},					
					min: w,
					max: 0
				}
			};
		},

		"chevron":function(w,h,adj){
			return {
				"adj" : {
					aix:"x",
					fix:0,
					getV: (1-adj['adj'])*w,
					getA: function(v){
						return (1-(v/w));
					},					
					min: w,
					max: 0
				}
			};
		},		

		"rightarrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:((1-adj['adj3'])*w),
					getV:(0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-2*(v/h));
					},					
					min:0.5*h,
					max:0
				},
				"adj2" : {
					aix:"y",
					fix:w,
					getV:(0.5*(adj['adj2']))*h,
					getA:function(v){
						return (2*(v/h));
					},
					min:0,
					max:0.5*h
				},
				"adj3" : {
					aix:"x",
					fix:0,
					getV:((1-adj['adj3'])*w),
					getA:function(v){
						return (1-(v/w));
					},
					min:w,
					max:(adj['adj4']*w)
				},
				"adj4" : {
					aix:"x",
					fix:0,
					getV:(adj['adj4']*w),
					getA:function(v){
						return (v/w);
					},
					min:0,
					max:((1-adj['adj3'])*w)
				}
			}
		},

		"leftarrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:(adj['adj3']*w),
					getV:(0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-2*(v/h));
					},					
					min:0.5*h,
					max:0
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:(0.5-adj['adj2'])*h,
					getA:function(v){
						return (0.5-(v/h));
					},
					min:0,
					max:0.5*h
				},
				"adj3" : {
					aix:"x",
					fix:0,
					getV:((adj['adj3'])*w),
					getA:function(v){
						return ((v/w));
					},
					min:0,
					max:(1-adj['adj4'])*w
				},
				"adj4" : {
					aix:"x",
					fix:0,
					getV:(1-adj['adj4'])*w,
					getA:function(v){
						return (1-(v/w));
					},
					min:0,
					max:((1-adj['adj3'])*w)
				}
			}
		},

		"uparrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:(adj['adj3']*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-2*(v/w));
					},					
					min:0.5*w,
					max:0
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:(0.5-adj['adj2'])*w,
					getA:function(v){
						return (0.5-(v/w));
					},
					min:0,
					max:0.5*w
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:((adj['adj3'])*h),
					getA:function(v){
						return ((v/h));
					},
					min:0,
					max:(1-adj['adj4'])*h
				},
				"adj4" : {
					aix:"y",
					fix:0,
					getV:(1-adj['adj4'])*h,
					getA:function(v){
						return (1-(v/h));
					},
					min:0,
					max:((1-adj['adj3'])*h)
				}
			}
		},

		"downarrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:((1-adj['adj3'])*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-2*(v/w));
					},					
					min:0.5*w,
					max:0
				},
				"adj2" : {
					aix:"x",
					fix:h,
					getV:(adj['adj2'])*w,
					getA:function(v){
						return ((v/w));
					},
					min:0,
					max:0.5*w
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:((1-adj['adj3'])*h),
					getA:function(v){
						return 1-(v/h);
					},
					min:h,
					max:(adj['adj4']*h)
				},
				"adj4" : {
					aix:"y",
					fix:0,
					getV:(adj['adj4'])*h,
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:((1-adj['adj3'])*h)
				}
			}
		},

		"leftrightarrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"y",
					fix:((0.5*adj['adj3'])*w),
					getV:(0.5*(1-adj['adj1'])*h),
					getA: function(v){
						return (1-2*(v/h));
					},					
					min:0.5*h,
					max:((0.5-adj['adj2']))*h
				},
				"adj2" : {
					aix:"y",
					fix:0,
					getV:((0.5-adj['adj2']))*h,
					getA:function(v){
						return (0.5-(v/h));
					},
					min:0,
					max:0.5*h
				},
				"adj3" : {
					aix:"x",
					fix:0,
					getV:((0.5*adj['adj3'])*w),
					getA:function(v){
						return 2*(v/w);
					},
					min:0,
					max:((0.5*(1-adj['adj4']))*w)
				},
				"adj4" : {
					aix:"x",
					fix:h,
					getV:((0.5*(1-adj['adj4']))*w),
					getA:function(v){
						return (1-2*(v/w));
					},
					min:((adj['adj3'])*w),
					max:(0.5*w)
				}
			}
		},

		"quadarrowcallout":function(w,h,adj){
			return {
				"adj1" : {
					aix:"x",
					fix:((adj['adj3'])*h),
					getV:(0.5*(1-adj['adj1'])*w),
					getA: function(v){
						return (1-2*(v/w));
					},					
					min:0.5*h,
					max:((0.5-adj['adj2']))*w
				},
				"adj2" : {
					aix:"x",
					fix:0,
					getV:((0.5-adj['adj2']))*w,
					getA:function(v){
						return (0.5-(v/w));
					},
					min:0,
					max:0.5*w
				},
				"adj3" : {
					aix:"y",
					fix:w,
					getV:((adj['adj3'])*h),
					getA:function(v){
						return (v/h);
					},
					min:0,
					max:((0.5*(1-adj['adj4']))*h)
				},
				"adj4" : {
					aix:"y",
					fix:0,
					getV:((0.5*(1-adj['adj4']))*h),
					getA:function(v){
						return (1-2*(v/h));
					},
					min:((adj['adj3'])*h),
					max:(0.5*h)
				}
			}
		},
		
		"star4":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star5":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star6":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star7":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star8":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star10":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star12":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star16":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star24":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},

		"star32":function(w,h,adj){
			var wh = 0;
			var wl = 0;
			if(w >= h){ wh = h; wl = w; }else{ wh = w; wl = h; }

			return {
				"adj" : {
					aix:"y",
					fix:0.5*w,
					getV:(0.5-adj["adj"])*h,
					getA: function(v){
						return (0.5-(v/h));
					},					
					min:0,
					max:(0.5*h)
				}
			}
		},
		_ver:"20150701"

	}
});