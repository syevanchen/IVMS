(function(){var aa=function(ba){if(!ba){throw new Error("The Signavio Mashup API needs a configuration."); }
if("string"==typeof ba.element){ba.element=document.getElementById(ba.element);}
if("string"==typeof ba.server){this.server=ba.server;}
this.config=ba;this.init();};aa.prototype={server:"http://academic.signavio.com",init:function(){this.writeContent(this.setupIFrame());},onLoaded:function(){this.Ext=this.frame.Ext;this.ORYX=this.frame.ORYX;this.Ajax=this.frame.Ajax;this.$A=this.frame.$A;this.Template=this.frame.Template;this.Ext.data.HttpProxy.prototype.load=function(){};this.setupEditor();},onRendered:function(){var ca=this.editor.getCanvas(),size=this.getShapeSize(),zoom=this.config.zoom,me=this,width=this.document.offsetWidth,height=this.document.offsetHeight;if("undefined"==typeof zoom){zoom=100;if(this.config.overflowX=="fit"){zoom=Math.min(zoom,(width/(size.width()+20))*100);}
if(this.config.overflowY=="fit"){zoom=Math.min(zoom,(height/(size.height()+20))*100);}}
zoom=Math.max(Math.min(zoom,100),1)/100;ca.node.setAttributeNS(null,"transform","scale("+zoom+")");ca.setSize({width:((size.width()+20)*zoom),height:((size.height()+20)*zoom)});ca.node.setAttribute("transform",me.editor.getCanvas().node.getAttribute("transform")+" translate("+(-1*(size.upperLeft().x-10))+", "+(-1*(size.upperLeft().y-10))+")");var da=function(st){me.frame.SVGElement=SVGElement;var ea=new me.frame.DOMParser();var fa=ea.parseFromString('<svg xmlns="http://www.w3.org/2000/svg">'+st+'</svg>',"text/xml");return fa.childNodes[0].childNodes[0];};var ga=function(ha){if("string"==typeof ha){ha=ca.getChildShapeByResourceId(ha);}
if(ha instanceof me.ORYX.Core.Shape){me.editor.handleEvents({type:me.ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"Overlay_focus"+(ha.id),shapes:me.$A([ha]),node:da(["<rect ","class='x-focus-rectangle' ","x='-5' ","y='-5' ","width='",(ha.bounds.width()+10),"' ","height='",(ha.bounds.height()+10),"' ","stroke='#AD0F5B' stroke-width='2' ","fill='none' ","rx='4' ry='4' ","></rect>"].join("")),nodePosition:"NW"});return;}
if("object"!=typeof ha){return;}
if("undefined"===typeof ha.nodes){ha.nodes=ca.getChildNodes(true);}
var ia=me.$A([].concat(ha.nodes)).map(function(ja){return ja instanceof me.ORYX.Core.Shape?ja:ca.getChildShapeByResourceId(ja);}).compact();if(ha.properties){var ka=ha.template||"<text stroke='none'>#{0}</text>";var la=ha.templateFn instanceof Function?ha.templateFn:function(){return ka;};var ma=[].concat(ha.properties);for(var i=0,size=ia.length;i<size;++i){var na=ia[i];if(na instanceof me.ORYX.Core.Shape){var oa=[];for(var j=0,ps=ma.length;j<ps;++j){var pa=na.properties[ma[j]];if(pa===undefined){pa=na.hiddenProperties[ma[j]];}
if(pa===undefined){pa="";}
oa.push(pa);}
me.editor.handleEvents({type:me.ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:na.id,shapes:me.$A([na]),node:da(new me.Template(la(oa,na)).evaluate(oa)),nodePosition:ha.position||"NE"});}}}
if(ha.attributes){me.editor.handleEvents({type:me.ORYX.CONFIG.EVENT_OVERLAY_SHOW,id:"Overlay_attribtues"+(Math.round(Math.random()*1000000)),shapes:ia,attributes:ha.attributes});}};this.$A([].concat(this.config.focus)).each(ga);if(this.config.click instanceof Function){var qa=this.config.click;this.editor.registerOnEvent("click",function(ra,sa){if(sa instanceof me.ORYX.Core.Shape){qa.call(qa,sa,me.editor,ra);}});}
var ta=document.createElement("div");ta.innerHTML='<a href="http://www.signavio.com" style="display:block;position:absolute;left:3px;bottom:20px;width:80px;height:30px;color:transparent;background-image:url('+this.server+'/mashup/img/signavio.png);background-attachment:scroll;background-origin:initial;background-clip:initial;background-color:transparent;cursor:pointer;z-index:100;background-position:0px 0px;background-repeat:no-repeat no-repeat; ">&nbsp;</a>';ca.getScrollNode().appendChild(ta);this.ORYX.Editor.prototype._finishedLoading.apply(this.editor,[]);if(this.config.callback instanceof Function){this.config.callback.call(this.config.callback,this.editor,this);}},setupEditor:function(){var me=this;this.ORYX.availablePlugins=this.getPlugins();this.ORYX.Editor.prototype._loadStencilSetExtensionConfig=function(){};this.ORYX.Editor.prototype._generateGUI=function(){this.layout_regions={center:new me.Ext.Panel({region:'center',cls:'x-panel-editor-center',autoScroll:true,items:{layout:"fit",autoHeight:true,el:this.getCanvas().rootNode.parentNode}}),east:{collapse:function(){}},west:{collapse:function(){}}};this.layout=new me.Ext.Viewport({layout:'border',items:[this.layout_regions.center]});this.getCanvas().rootNode.parentNode.style.border="none";};this.load(function(ua){me.editor=new me.ORYX.Editor({id:'oryx-canvas123',fullscreen:true,stencilset:{url:ua.stencilset.namespace},model:ua});me.editor._finishedLoading=function(){me.beforeFinishedRendered();};});},beforeFinishedRendered:function(){var va=[],count=0,me=this;var wa=function(){if(--count===0){for(var i=0,size=va.length;i<size;++i){va[i].changeCallbacks.pop();}
me.onRendered();}};this.editor.getCanvas().getChildShapes(true).each(function(xa){xa.getLabels().each(function(ya){if(ya.isUpdating()&&++count){ya.changeCallbacks.push(wa);va.push(ya);}});});if(count===0){this.onRendered();}},load:function(fn){var me=this;this.loadModelData(function(za){me.loadStencilData(za,function(Aa){var Ba=me.frame.Ajax.Request.prototype.initialize;me.frame.Ajax.Request.prototype.initialize=function(Ca,Da){if(Ca.indexOf(za.stencilset.url)>=0&&"function"===typeof Da.onSuccess){Da.onSuccess.call(this,{responseText:me.frame.Object.toJSON(Aa)});}
else{Ba.apply(this,arguments);}};fn(za);});});},loadModelData:function(fn){var Ea=this.config.url+"/json?",model,me=this;if(this.config.authToken){Ea+="authkey="+(this.config.authToken.split("_")[1]||this.config.authToken);}
this.loadData(Ea,fn);},loadStencilData:function(Fa,fn){var Ga=this.config.url.replace(/\/p\/.*$/,"")+"/p/editor_stencilset?";Ga+="embedsvg=true";Ga+="&namespace="+(Fa.stencilset.namespace||Fa.stencilset.url).replace("#","%23");if(this.config.authToken){Ga+="&authkey="+(this.config.authToken.split("_")[2]||"");}
this.loadData(Ga,fn);},loadData:function(Ha,fn){Ha=Ha.indexOf("?")>=0?Ha:Ha+"?";Ha=Ha.slice(Ha.length-2)=="?"?Ha:Ha+"&";var Ia="data_"+(Math.round(Math.random()*1000000000));Ha+="_dc="+(Math.round(Math.random()*1000000));Ha+="&jsonp=var "+(Ia)+"=";var Ja=this.frame.document.createElement("script"),me=this;Ja.setAttribute("type","text/javascript");Ja.setAttribute("src",Ha);Ja.addEventListener("load",function(){fn(me.frame[Ia]);delete me.frame[Ia];},true);this.frame.document.getElementsByTagName("head")[0].appendChild(Ja);},setupIFrame:function(){if(!this.config.element){throw new Error("The Mashup api needs an element.");}
var Ka=document.createElement("iframe");Ka.style.width=(this.config.width||"100%")+("number"==typeof this.config.width?"px":"");Ka.style.height=(this.config.height||"100%")+("number"==typeof this.config.height?"px":"");Ka.style.border="none";this.config.element.appendChild(Ka);this.document=Ka;return Ka;},writeContent:function(La){var Ma=La.contentWindow,me=this,url=this.server,isDebug=this.config.isDebug===true||this.config.debug===true,script='ORYX.CONFIG.ORYX_NEW_URL = "/";'+'ORYX.CONFIG.PANEL_LEFT_COLLAPSED = true;'+'ORYX._loadPlugins = function(){};'+'ORYX.CONFIG.BACKEND_SWITCH = false;'+'ORYX.CONFIG.EXPLORER_PATH ="'+url+'/explorer";'+'ORYX.CONFIG.BLANK_IMAGE = "'+url+'/libs/ext-2.0.2/resources/images/default/tree/loading.gif";';this.frame=Ma;Ma.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xmlns:b3mn="http://b3mn.org/2007/b3mn" xmlns:ext="http://b3mn.org/2007/ext" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:atom="http://b3mn.org/2007/atom+xhtml">'+'<head profile="http://purl.org/NET/erdf/profile"><title>Mashup | Signavio</title>'+'<s'+'cript src="'+url+'/libs/prototype-1.5.1.js" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/libs/path_parser.js" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/libs/ext-2.0.2/adapter/ext/ext-base.js" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/libs/ext-2.0.2/ext-all-debug.js" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/libs/ext-2.0.2/color-field.js" type="text/javascript"></s'+'cript>'+'<style media="screen" type="text/css"> @import url("'+url+'/libs/ext-2.0.2/resources/css/ext-all.css"); @import url("'+url+'/libs/ext-2.0.2/resources/css/xtheme-darkgray.css"); </style>'+'<link rel="Stylesheet" media="screen" href="'+url+'/editor/css/theme_norm.css?version=4.2.0" type="text/css" />'+'<link rel="Stylesheet" media="screen" href="'+url+'/editor/css/theme_norm_signavio.css?version=4.2.0" type="text/css" />'+'<s'+'cript src="'+url+'/editor/i18n/translation_zh_CN.js?version=4.2.0" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/editor/i18n/translation_signavio_zh_CN.js?version=4.2.0" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/libs/utils.js?version=4.2.0" type="text/javascript"></s'+'cript>'+'<s'+'cript src="'+url+'/editor/oryx'+(isDebug?'.debug':'')+'.js?version=4.2.0" type="text/javascript"></s'+'cript>'+'<link rel="schema.dc" href="http://purl.org/dc/elements/1.1/" />'+'<link rel="schema.dcTerms" href="http://purl.org/dc/terms/" />'+'<link rel="schema.b3mn" href="http://b3mn.org" />'+'<link rel="schema.oryx" href="http://oryx-editor.org/" />'+'<link rel="schema.raziel" href="http://raziel.org/" />'+'<s'+'cript type="text/javascript">'+script+'</s'+'cript>'+'<s'+'tyle type="text/css">'+'.ORYX_Editor {'+'background:none repeat scroll 0 0 white !important;'+'border:none !important;'+'height:100% !important;'+'margin:0 !important;'+'overflow:auto !important;'+'width:100% !important;'+'}'+'</s'+'tyle>'+'</head>'+'<body style="overflow:hidden;" class="">'+'</body>'+'</html>');Ma.document.close();Ma.onOryxResourcesLoaded=function(){me.onLoaded();};},getPlugins:function(){var Na=[{"name":"Signavio.Plugins.Loading","source":"signavio.js","properties":[]},{"name":"Signavio.Plugins.GlossaryRename","source":"glossaryRename.js","properties":[]},{"name":"ORYX.Plugins.Toolbar","source":"toolbar.js","properties":[]},{"name":"ORYX.Plugins.Loading","source":"loading.js","properties":[]},{"name":"ORYX.Plugins.ProcessLink","source":"processLink.js","properties":[],"requires":{"namespaces":["http://b3mn.org/stencilset/epc#","http://b3mn.org/stencilset/bpmn1.1#"]}},{"name":"ORYX.Plugins.Overlay","source":"overlay.js","properties":[]},{"name":"ORYX.Plugins.BPMN11","source":"bpmn11.js","properties":[],"requires":{"namespaces":["http://b3mn.org/stencilset/bpmn1.1#","http://b3mn.org/stencilset/timjpdl3#","http://b3mn.org/stencilset/jbpm4#"]}},{"name":"Signavio.Plugins.Linking","source":"linking.js","properties":[]},{"name":"ORYX.Plugins.ProcessmapSupport","source":"processmapSupport.js","properties":[],"requires":{"namespaces":["http://www.signavio.com/stencilsets/processmap#"]}},{"name":"ORYX.Plugins.OrganigramSupport","source":"organigramSupport.js","properties":[],"requires":{"namespaces":["http://www.signavio.com/stencilsets/organigram#"]}},{"name":"ORYX.Plugins.BPMN2_0","source":"bpmn2.0/bpmn2.0.js","properties":[],"requires":{"namespaces":["http://b3mn.org/stencilset/bpmn2.0#","http://www.signavio.com/saperion#","http://www.signavio.com/stencilsets/processmap#","http://b3mn.org/stencilset/bpmn2.0choreography#"]}},{"name":"ORYX.Plugins.BPMN2CONVERSATION","source":"bpmn2.0/bpmn2conversation.js","properties":[],"requires":{"namespaces":["http://b3mn.org/stencilset/bpmn2.0conversation#"]}},{"name":"ORYX.Plugins.Bpmn2_0Choreography","source":"bpmn2.0/bpmn2.0choreography.js","properties":[],"requires":{"namespaces":["http://b3mn.org/stencilset/bpmn2.0choreography#"]}}];for(var i=0,size=Na.length;i<size;++i){if(Na[i].requires){Na[i].requires.namespaces=this.$A(Na[i].requires.namespaces);}
Na[i].properties=this.$A([]);}
return this.$A(Na);},getShapeSize:function(){var x1,y1,x2,y2,me=this;if(this.Ext.isIE9){var bb=this.editor.getCanvas().getRootNode().childNodes[1].childNodes[0].childNodes[1].getBBox();x1=bb.x;y1=bb.y;x2=bb.x+bb.width;y2=bb.y+bb.height;var Oa=function(Pa,Qa,Ra,Sa){if(!Pa&&!Qa&&!Ra&&!Sa){return;}
x1=Math.min(x1,Pa);y1=Math.min(y1,Qa);x2=Math.max(x2,Ra);y2=Math.max(y2,Sa);};this.editor.getCanvas().getChildShapes(false).each(function(Ta){if(Ta instanceof me.ORYX.Core.Edge){Oa(Ta.bounds.a.x,Ta.bounds.a.y,Ta.bounds.b.x,Ta.bounds.b.y);Ta.getLabels().each(function(Ua){var Va=Ua.node.getBBox();Oa(Va.x,Va.y,Va.x+Va.width,Va.y+Va.height);});}});}
else{try{var pe=9;var Wa=this.editor.getCanvas().getRootNode().childNodes[1].childNodes[0].childNodes[1].getBBox();var Xa=this.editor.getCanvas().getRootNode().childNodes[1].childNodes[0].childNodes[2].getBBox();if(!Wa.x&&!Wa.y&&!Wa.width&&!Wa.height){Wa=Xa;}
if(!Xa.x&&!Xa.y&&!Xa.width&&!Xa.height){Xa=Wa;}
x1=Math.min(Wa.x,Xa.x+pe);y1=Math.min(Wa.y,Xa.y+pe);x2=Math.max(Wa.x+Wa.width,Xa.x+Xa.width-pe);y2=Math.max(Wa.y+Wa.height,Xa.y+Xa.height-pe);}
catch(e){var Ya;this.editor.getCanvas().getChildShapes(true).each(function(Za){var $a=Za.absoluteBounds();if(!Ya){Ya=$a.clone();}
else{Ya.include($a);}});return Ya;}}
return new this.ORYX.Core.Bounds(x1,y1,x2,y2);}};(window.addEventListener||window.attachEvent)("load",function(){var ab=document.getElementsByTagName("script");for(var i=0,size=ab.length;i<size;++i){var cb=ab[i];if(cb&&!cb.getAttribute("src")&&(cb.getAttribute("type")||"").toLowerCase()==="text/plain"){var db="config_"+(Math.round(Math.random()*1000000000));try{(function(){eval(db+" = "+cb.textContent);}());if(window[db]&&window[db]
instanceof Object&&"string"==typeof window[db].url){window[db].element=cb.parentNode;new aa(window[db]);delete window[db];}}
catch(e){throw new Error("Config of the SVG API could not been loaded. Please be asure that the configuration is correctly defined.")}}}},false);}());