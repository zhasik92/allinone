(function(){var f=YAHOO.util.Dom,j=YAHOO.util.Event;var e=Alfresco.util.encodeHTML;Alfresco.module.Sites=function(l){return Alfresco.module.Sites.superclass.constructor.call(this,"Alfresco.module.Sites",l,["button","menu","container"])};YAHOO.extend(Alfresco.module.Sites,Alfresco.component.Base,{options:{siteId:"",siteTitle:"",favouriteSites:{}},onReady:function c(){YAHOO.Bubbling.on("favouriteSiteAdded",this.onFavouriteSiteAdded,this);YAHOO.Bubbling.on("favouriteSiteRemoved",this.onFavouriteSiteRemoved,this);YAHOO.Bubbling.on("siteDeleted",this.onSiteDeleted,this);this.preferencesService=new Alfresco.service.Preferences();var n=Alfresco.util.findValueByDotNotation(this.preferencesService.get(),Alfresco.service.Preferences.FAVOURITE_SITES,null);var m=Alfresco.constants.URL_SERVICECONTEXT+"modules/header/sites",l={htmlid:this.id};if(n){l.favsites=YAHOO.lang.JSON.stringify(n)}if(this.options.siteId!==""){l.siteId=this.options.siteId}Alfresco.util.Ajax.request({url:m,dataObj:l,successCallback:{fn:this.onTemplateLoaded,scope:this},failureMessage:"Could not load module template from '"+m+"'.",scope:this,execScripts:true})},onTemplateLoaded:function b(l){var m=document.createElement("div");m.innerHTML=l.serverResponse.responseText;document.body.insertBefore(m,document.body.firstChild);this.widgets.sitesButton=new YAHOO.widget.Button(this.id,{type:"menu",menu:this.id+"-sites-menu",lazyloadmenu:false})},showCreateSite:function i(){Alfresco.module.getCreateSiteInstance().show()},onFavouriteSiteAdded:function g(m,l){var n=l[1];if(n&&n.shortName!==null){this.options.favouriteSites[n.shortName]=n.title;this._renderFavouriteSites()}},onFavouriteSiteRemoved:function k(m,l){var n=l[1];if(n&&n.shortName!==null){if(n.shortName in this.options.favouriteSites){delete this.options.favouriteSites[n.shortName];this._renderFavouriteSites()}}},onSiteDeleted:function h(m,l){var n=l[1];if(n&&n.site!==null){if(n.site.shortName in this.options.favouriteSites){delete this.options.favouriteSites[n.site.shortName];this._renderFavouriteSites()}}},_renderFavouriteSites:function a(){var q=[],n,m=this.widgets.sitesButton.getMenu(),l,o,p;for(n in this.options.favouriteSites){if(this.options.favouriteSites.hasOwnProperty(n)){q.push(n)}}q.sort();l=m.getItemGroups()[0];for(o=0,p=l.length;o<p;o++){m.removeItem(0,0,true)}f.setStyle(this.id+"-favouritesContainer","display",q.length>0?"block":"none");f.setStyle(this.id+"-favouriteSites","display",q.length>0?"block":"none");for(o=0,p=q.length;o<p;o++){m.addItem({text:e(this.options.favouriteSites[q[o]]),url:Alfresco.util.uriTemplate("sitedashboardpage",{site:q[o]})},0)}if(this.options.siteId.length!==0){f.setStyle(this.id+"-addFavourite","display",this.options.siteId in this.options.favouriteSites?"none":"block")}m.render()},addAsFavourite:function d(){var m={shortName:this.options.siteId,title:this.options.siteTitle},n=this;var l={failureCallback:{fn:function(o,p){Alfresco.util.PopupManager.displayPrompt({text:n.msg("message.save.failure")})},scope:this},successCallback:{fn:function(o,p){YAHOO.Bubbling.fire("favouriteSiteAdded",p.site)},scope:this,obj:{site:m}}};this.preferencesService.favouriteSite(m.shortName,l)}})})();var moduleSites=new Alfresco.module.Sites("null");