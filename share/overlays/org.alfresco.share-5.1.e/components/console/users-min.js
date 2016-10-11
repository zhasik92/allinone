(function(){var f=YAHOO.util.Dom,D=YAHOO.util.Event,v=YAHOO.util.Element;var w=Alfresco.util.encodeHTML;Alfresco.ConsoleUsers=function(ah){this.name="Alfresco.ConsoleUsers";Alfresco.ConsoleUsers.superclass.constructor.call(this,ah);Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["button","container","datasource","datatable","paginator","json","history"],this.onComponentsLoaded,this);YAHOO.Bubbling.on("viewUserClick",this.onViewUserClick,this);var Q=this;SearchPanelHandler=function Z(){SearchPanelHandler.superclass.constructor.call(this,"search")};YAHOO.extend(SearchPanelHandler,Alfresco.ConsolePanelHandler,{isSearching:false,selectedUser:null,deauthorizeDialog:null,reauthorizeDialog:null,fileUploadOriginalMessages:null,onLoad:function F(){Q.widgets.searchButton=Alfresco.util.createYUIButton(Q,"search-button",Q.onSearchClick);Q.widgets.newuserButton=Alfresco.util.createYUIButton(Q,"newuser-button",Q.onNewUserClick);Q.widgets.uploadUsersButton=Alfresco.util.createYUIButton(Q,"uploadusers-button",Q.onUploadUsersClick);var aj=function(ak){if(!ak.json.data.creationAllowed){Q.widgets.newuserButton.set("disabled",true);Q.widgets.uploadUsersButton.set("disabled",true)}};Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI+"api/authentication",successCallback:{fn:aj,scope:this},failureMessage:Q._msg("message.authenticationdetails-failure",w(Q.group))});this._setupDataTable();var ai=f.get(Q.id+"-search-text");new YAHOO.util.KeyListener(ai,{keys:YAHOO.util.KeyListener.KEY.ENTER},{fn:function(){Q.onSearchClick()},scope:Q,correctScope:true},"keydown").enable()},onShow:function W(){f.get(Q.id+"-search-text").focus()},onUpdate:function X(){var ak=f.get(Q.id+"-search-text");ak.value=Q.searchTerm;if(!this.isSearching&&Q.searchTerm!==undefined&&Q.searchTerm.length>=Q.options.minSearchTermLength){this.isSearching=true;var ao=this;ao._setDefaultDataTableErrors(Q.widgets.pagingDataTable.widgets.dataTable);Q.widgets.pagingDataTable.widgets.dataTable.set("MSG_EMPTY",Q._msg("message.searching"));var an=Q.widgets.pagingDataTable.widgets.dataTable.getRecordSet().getLength()-Q.widgets.pagingDataTable.currentMaxItems;Q.widgets.pagingDataTable.widgets.dataTable.deleteRows(an,Q.widgets.pagingDataTable.widgets.dataTable.getRecordSet().getLength());Q.widgets.pagingDataTable.currentSortKey=null;Q.widgets.pagingDataTable.currentDir=null;var al=function aj(ap,aq,ar){ao._enableSearchUI();ao._setDefaultDataTableErrors(Q.widgets.pagingDataTable.widgets.dataTable);Q.widgets.pagingDataTable.widgets.dataTable.onDataReturnInitializeTable.call(Q.widgets.pagingDataTable.widgets.dataTable,ap,aq,ar)};var am=function ai(aq,ar){ao._enableSearchUI();if(ar.status==401){window.location.reload()}else{try{var ap=YAHOO.lang.JSON.parse(ar.responseText);Q.widgets.pagingDataTable.widgets.dataTable.set("MSG_ERROR",ap.message);Q.widgets.pagingDataTable.widgets.dataTable.showTableMessage(Alfresco.util.encodeHTML(ap.message),YAHOO.widget.DataTable.CLASS_ERROR);ao._setResultsMessage("message.noresults")}catch(at){ao._setDefaultDataTableErrors(Q.widgets.pagingDataTable.widgets.dataTable)}}};Q.widgets.pagingDataTable.widgets.dataSource.sendRequest(ao._buildSearchParams(Q.searchTerm+" [hint:useCQ]")+"&startIndex=0&pageSize="+Q.options.maxSearchResults,{success:al,failure:am,scope:Q,argument:{}});ao._setResultsMessage("message.searchingFor",w(Q.searchTerm));Q.widgets.searchButton.set("disabled",true);YAHOO.lang.later(2000,ao,function(){if(ao.isSearching){if(!ao.widgets.feedbackMessage){ao.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.searching",Q.name),spanClass:"wait",displayTime:0})}else{if(!ao.widgets.feedbackMessage.cfg.getProperty("visible")){ao.widgets.feedbackMessage.show()}}}},[])}},_enableSearchUI:function ad(){if(this.widgets.feedbackMessage&&this.widgets.feedbackMessage.cfg.getProperty("visible")){this.widgets.feedbackMessage.hide()}Q.widgets.searchButton.set("disabled",false);this.isSearching=false},_setupDataTable:function ab(){var aj=function aj(aE,aH,aA,ax){var aC=aH.getData("authorizationStatus");if("NEVER_AUTHORIZED"!=aC){var az=aH.getData("isAdminAuthority");var aB=(aC=="AUTHORIZED");var aD="";var aF=false;var aG="";if(az&&aB){aD=Q.msg("deauthorize.dialog.cannot.deauthorize.admin");aF=true;aG="deauthorize-disabled"}else{if(aB){aG="deauthorize-enabled"}else{aG="reauthorize-enabled"}}var ay=new YAHOO.widget.Button({container:aE,title:aD,disabled:aF});ay.addClass(aG);if(aB){ay.on("click",function(aI){Q.selectedUser=aH.getData("userName");Q.onDeauthorizedButtonClick(aI,aE)},null,Q)}else{ay.on("click",function(aI){Q.selectedUser=aH.getData("userName");Q.onReauthorizedButtonClick(aI,aE,Q)},null,Q)}}};var au=function au(ay,ax,az,aA){ay.innerHTML=w(Q._msg("label.authorization.status."+aA))};var aw=function aw(ay,ax,az,aA){if(ax.getData("isDeleted")){ay.innerHTML=w(Q._msg("label.authorization.deleted"))}};var al=function al(aA,az,aB,aC){f.setStyle(aA,"min-height","64px");f.setStyle(aA.parentNode,"width",aB.width+"px");f.setStyle(aA.parentNode,"border-right","1px solid #D7D7D7");var ax=Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png";if(az.getData("avatar")!==undefined){ax=Alfresco.constants.PROXY_URI+az.getData("avatar")+"?c=queue&ph=true"}if(az.getData("isDeleted")){ax=Alfresco.constants.URL_RESCONTEXT+"components/images/deleted-user-photo-64.png"}f.setStyle(aA,"background-image","url('"+ax+"')");f.setStyle(aA,"background-repeat","no-repeat");f.setStyle(aA,"background-position","22px 50%");var ay=(az.getData("enabled")?"enabled":"disabled");aA.innerHTML='<img class="indicator" alt="'+Q._msg("label."+ay)+'" src="'+Alfresco.constants.URL_RESCONTEXT+"components/images/account_"+ay+'.png" alt="" />'};var ai=function ai(aC,aB,aD,aE){if(!aB.getData("isDeleted")){var aA=aB.getData("firstName"),az=aB.getData("lastName"),ay=aA+" "+(az?az:""),ax=document.createElement("a");ax.innerHTML=w(ay);YAHOO.util.Event.addListener(ax,"click",function(aF){YAHOO.Bubbling.fire("viewUserClick",{username:aB.getData("userName")})},null,Q);aC.appendChild(ax)}};var aq=function aq(az,ay,aB,aC){var ax=ay.getData("quota");var aA=(ax!==-1?Alfresco.util.formatFileSize(ax):"");az.innerHTML=aA};var ak=function aq(ay,ax,az,aA){ay.innerHTML=Alfresco.util.formatFileSize(ax.getData("sizeCurrent"))};var ap=function ap(ay,ax,az,aA){ay.innerHTML=w(aA)};var av=function av(ay,ax,aB){var aA=ay.getData("sizeCurrent"),az=ax.getData("sizeCurrent");if(aB){return(aA<az?1:(aA>az?-1:0))}return(aA<az?-1:(aA>az?1:0))};var ao=function ao(ay,ax,aB){var aA=ay.getData("quota"),az=ax.getData("quota");if(aB){return(aA<az?1:(aA>az?-1:0))}return(aA<az?-1:(aA>az?1:0))};var an=[{key:"avatar",label:"",sortable:false,formatter:al,width:70},{key:"fullName",label:Q._msg("label.name"),sortable:true,formatter:ai},{key:"userName",label:Q._msg("label.username"),sortable:true,formatter:ap},{key:"jobtitle",label:Q._msg("label.jobtitle"),sortable:true,formatter:ap},{key:"email",label:Q._msg("label.email"),sortable:true,formatter:ap},{key:"usage",label:Q._msg("label.usage"),sortable:true,sortOptions:{sortFunction:av},formatter:ak},{key:"quota",label:Q._msg("label.quota"),sortable:true,sortOptions:{sortFunction:ao},formatter:aq}];if(Q.options.showAuthorizationStatus==true){an.push({key:"authorizationStatus",label:Q._msg("label.authorization"),sortable:true,formatter:au});an.push({key:"isDeleted",label:Q._msg("label.authorization.isdeleted"),sortable:true,formatter:aw});an.push({key:"deauthorizeAction",label:Q._msg("label.authorization.actions"),sortable:false,formatter:aj})}var ar=this;var am=Q;Q.widgets.pagingDataTable=new Alfresco.util.DataTable({dataTable:{config:{generateRequest:function(ay,aA){var aC=(ay.pagination.page-1)*ay.pagination.rowsPerPage;var az=encodeURIComponent((ay.sortedBy)?ay.sortedBy.key:aA.getColumnSet().keys[0].getKey());var ax=(ay.sortedBy&&ay.sortedBy.dir===YAHOO.widget.DataTable.CLASS_DESC)?"desc":"asc";am.widgets.pagingDataTable.currentSortKey=az;am.widgets.pagingDataTable.currentDir=ax;var aB="?sortBy="+az+"&dir="+ax;if(Q.searchTerm){aB=aB+"&filter="+encodeURIComponent(Q.searchTerm)+"&startIndex="+aC+"&pageSize="+ay.pagination.rowsPerPage}return aB}},container:Q.id+"-datatable",columnDefinitions:an},dataSource:{url:Alfresco.constants.PROXY_URI+"api/people",pagingResolver:function(ay,aA,ax,az){return"startIndex="+ay+"&pageSize="+aA+"&"+ar._buildSearchParams(Q.searchTerm+" [hint:useCQ]").substring(1)+"&sortBy="+ax+"&dir="+az},defaultFilter:{filterId:"all"},config:{responseType:YAHOO.util.DataSource.TYPE_JSON,responseSchema:{resultsList:"people"}}},paginator:{history:false,hide:false,config:{containers:[Q.id+"-paginator"],rowsPerPage:Q.options.maxSearchResults}}});Q.widgets.pagingDataTable.widgets.dataSource.doBeforeParseData=function at(ay,ax){ar._setResultsMessage("message.results",w(Q.searchTerm),ax.paging.totalItems);return ax}},_setDefaultDataTableErrors:function J(ai){var aj=Alfresco.util.message;ai.set("MSG_EMPTY",Q._msg("message.empty","Alfresco.ConsoleUsers"));ai.set("MSG_ERROR",Q._msg("message.error","Alfresco.ConsoleUsers"))},_buildSearchParams:function ac(ai){return"?filter="+encodeURIComponent(ai)},_setResultsMessage:function S(al,ak,aj){var ai=f.get(Q.id+"-search-bar");ai.innerHTML=Q._msg(al,ak,aj)}});new SearchPanelHandler();ViewPanelHandler=function U(){ViewPanelHandler.superclass.constructor.call(this,"view")};YAHOO.extend(ViewPanelHandler,Alfresco.ConsolePanelHandler,{onLoad:function F(){Q.widgets.gobackButton=Alfresco.util.createYUIButton(Q,"goback-button",Q.onGoBackClick);Q.widgets.deleteuserButton=Alfresco.util.createYUIButton(Q,"deleteuser-button",Q.onDeleteUserClick);Q.widgets.edituserButton=Alfresco.util.createYUIButton(Q,"edituser-button",Q.onEditUserClick)},onBeforeShow:function ag(){f.get(Q.id+"-view-title").innerHTML="";f.setStyle(Q.id+"-view-main","visibility","hidden")},onShow:function W(){window.scrollTo(0,0)},onUpdate:function X(){var ai=function(ao){var ar=function(aw,av){f.get(Q.id+aw).innerHTML=av?w(av):""};var am=YAHOO.lang.JSON.parse(ao.serverResponse.responseText);var au=f.getElementsByClassName("view-photoimg","img");for(var al in au){au[al].src=am.avatar?Alfresco.constants.PROXY_URI+am.avatar+"?c=force":Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png"}var aq=am.firstName,at=am.lastName,aj=aq+" "+(at?at:"");ar("-view-title",aj);ar("-view-name",aj);ar("-view-jobtitle",am.jobtitle);ar("-view-organization",am.organization);ar("-view-bio",am.persondescription?am.persondescription:"");ar("-view-location",am.location);ar("-view-email",am.email);ar("-view-telephone",am.telephone);ar("-view-mobile",am.mobile);ar("-view-skype",am.skype);ar("-view-instantmsg",am.instantmsg);ar("-view-googleusername",am.googleusername);ar("-view-companyname",am.organization);var ap="";ap+=am.companyaddress1?(w(am.companyaddress1)+"<br/>"):"";ap+=am.companyaddress2?(w(am.companyaddress2)+"<br/>"):"";ap+=am.companyaddress3?(w(am.companyaddress3)+"<br/>"):"";ap+=am.companypostcode?(w(am.companypostcode)+"<br/>"):"";f.get(Q.id+"-view-companyaddress").innerHTML=ap;ar("-view-companytelephone",am.companytelephone);ar("-view-companyfax",am.companyfax);ar("-view-companyemail",am.companyemail);ar("-view-username",Q.currentUserId);ar("-view-enabled",am.enabled?Q._msg("label.enabled"):Q._msg("label.disabled"));ar("-view-quota",(am.quota!==-1?Alfresco.util.formatFileSize(am.quota):""));ar("-view-usage",Alfresco.util.formatFileSize(am.sizeCurrent));var an=function(){return this.displayName};for(var al=0,ak=am.groups.length;al<ak;am.groups[al++].toString=an){}ar("-view-groups",am.groups.join(", "));f.setStyle(Q.id+"-view-main","visibility","visible")};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/people/"+encodeURIComponent(Q.currentUserId)+"?groups=true",method:Alfresco.util.Ajax.GET,successCallback:{fn:ai,scope:Q},failureMessage:Q._msg("message.getuser-failure",w(Q.currentUserId))})}});new ViewPanelHandler();CreatePanelHandler=function E(){CreatePanelHandler.superclass.constructor.call(this,"create")};YAHOO.extend(CreatePanelHandler,Alfresco.ConsolePanelHandler,{_visible:false,_groups:[],_form:null,onLoad:function F(){YAHOO.Bubbling.on("itemSelected",this.onGroupSelected,this);YAHOO.Bubbling.on("removeGroupCreate",this.onRemoveGroupCreate,this);Q.widgets.createuserOkButton=Alfresco.util.createYUIButton(Q,"createuser-ok-button",Q.onCreateUserOKClick);Q.widgets.createuserAnotherButton=Alfresco.util.createYUIButton(Q,"createuser-another-button",Q.onCreateUserAnotherClick);Q.widgets.createuserCancelButton=Alfresco.util.createYUIButton(Q,"createuser-cancel-button",Q.onCreateUserCancelClick);var ak=new Alfresco.forms.Form(Q.id+"-create-form");ak.setSubmitElements([Q.widgets.createuserOkButton,Q.widgets.createuserAnotherButton]);ak.addValidation(Q.id+"-create-firstname",Alfresco.forms.validation.mandatory,null,"keyup");ak.addValidation(Q.id+"-create-email",Alfresco.forms.validation.mandatory,null,"keyup");ak.addValidation(Q.id+"-create-email",Alfresco.forms.validation.email,null,"change",Q._msg("Alfresco.forms.validation.email.message"));ak.addValidation(Q.id+"-create-username",Alfresco.forms.validation.mandatory,null,"keyup");ak.addValidation(Q.id+"-create-username",Alfresco.forms.validation.nodeName,null,"keyup",Q._msg("Alfresco.forms.validation.nodeName.message"));ak.addValidation(Q.id+"-create-username",Alfresco.forms.validation.length,{min:Q.options.minUsernameLength,max:100,crop:true,includeWhitespace:false},"keyup",Q._msg("Alfresco.forms.validation.length.message"));ak.addValidation(Q.id+"-create-password",Alfresco.forms.validation.mandatory,null,"keyup");ak.addValidation(Q.id+"-create-password",Alfresco.forms.validation.length,{min:Q.options.minPasswordLength,max:100,crop:true},"change",Q._msg("Alfresco.forms.validation.length.message"));ak.addValidation(Q.id+"-create-verifypassword",Alfresco.forms.validation.mandatory,null,"keyup");ak.addValidation(Q.id+"-create-verifypassword",Alfresco.forms.validation.length,{min:Q.options.minPasswordLength,max:100,crop:true},"change",Q._msg("Alfresco.forms.validation.length.message"));ak.addValidation(Q.id+"-create-quota",Alfresco.forms.validation.number,null,"keyup");ak.init();this._form=ak;var al=f.get(Q.id+"-create-form");if(al){var ai=al.getElementsByTagName("input");for(var aj=0;aj<ai.length;aj++){YAHOO.util.Event.addListener(ai[aj],"keyup",this._enterKeyListener)}}Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"components/people-finder/group-finder",dataObj:{htmlid:Q.id+"-create-groupfinder"},successCallback:{fn:this.onGroupFinderLoaded,scope:this},failureMessage:"Could not load Group Finder component",execScripts:true})},onGroupFinderLoaded:function K(aj){var ai=f.get(Q.id+"-create-groupfinder");ai.innerHTML=aj.serverResponse.responseText;Q.modules.createGroupFinder=Alfresco.util.ComponentManager.get(Q.id+"-create-groupfinder");Q.modules.createGroupFinder.setOptions({viewMode:Alfresco.GroupFinder.VIEW_MODE_COMPACT,singleSelectMode:false,wildcardPrefix:false})},_enterKeyListener:function P(ai){if(ai&&ai.keyCode==13){Q.onCreateUserOKClick()}},onGroupSelected:function T(aj,ai){if(this._visible){this.addGroup(ai[1])}},addGroup:function N(an){var al=false;for(var ak=0,aj=this._groups.length;ak<aj;ak++){if(this._groups[ak]!=null&&this._groups[ak].itemName===an.itemName){al=true;break}}if(!al){this._groups.push(an);var am=f.get(Q.id+"-create-groups");var ai=(this._groups.length-1);var ao=document.createElement("span");ao.setAttribute("id",Q.id+"_group"+ai);ao.setAttribute("title",Q._msg("label.removegroup"));f.addClass(ao,"group-item");ao.innerHTML=w(an.displayName);am.appendChild(ao);Alfresco.util.useAsButton(ao,function(aq,ap){YAHOO.Bubbling.fire("removeGroupCreate",{id:ap.idx});YAHOO.Bubbling.fire("itemDeselected",{eventGroup:Q.modules.createGroupFinder,itemName:ap.group.itemName})},{idx:ai,group:an})}},getGroups:function aa(){var ai=[];for(var ak=0,aj=this._groups.length;ak<aj;ak++){if(this._groups[ak]!=null){ai.push(this._groups[ak].itemName)}}return ai},onRemoveGroupCreate:function M(al,ai){var aj=ai[1].id;var ak=f.get(Q.id+"_group"+aj);ak.parentNode.removeChild(ak);this._groups[aj]=null},onBeforeShow:function ag(){f.setStyle(Q.id+"-create-main","visibility","hidden");this.clear()},clear:function V(){var ai=function(aj){f.get(Q.id+aj).value=""};ai("-create-firstname");ai("-create-lastname");ai("-create-email");ai("-create-username");ai("-create-password");ai("-create-verifypassword");ai("-create-quota");f.get(Q.id+"-create-disableaccount").checked=false;f.get(Q.id+"-create-quotatype").value="gb";this._groups=[];f.get(Q.id+"-create-groups").innerHTML="";if(Q.modules.createGroupFinder){Q.modules.createGroupFinder.clearResults()}if(this._form!==null){this._form.init()}YAHOO.Bubbling.fire("allItemsDeselected",{eventGroup:Q.modules.createGroupFinder})},onShow:function W(){this._visible=true;window.scrollTo(0,0);f.setStyle(Q.id+"-create-main","visibility","visible");f.get(Q.id+"-create-firstname").focus()},onHide:function G(){this._visible=false}});new CreatePanelHandler();UpdatePanelHandler=function af(){UpdatePanelHandler.superclass.constructor.call(this,"update")};YAHOO.extend(UpdatePanelHandler,Alfresco.ConsolePanelHandler,{_visible:false,_removedGroups:[],_addedGroups:[],_originalGroups:[],_groups:[],_photoReset:false,_form:null,onLoad:function F(){YAHOO.Bubbling.on("itemSelected",this.onGroupSelected,this);YAHOO.Bubbling.on("removeGroupUpdate",this.onRemoveGroupUpdate,this);Q.widgets.updateuserSaveButton=Alfresco.util.createYUIButton(Q,"updateuser-save-button",Q.onUpdateUserOKClick);Q.widgets.updateuserCancelButton=Alfresco.util.createYUIButton(Q,"updateuser-cancel-button",Q.onUpdateUserCancelClick);Q.widgets.updateuserClearPhotoButton=Alfresco.util.createYUIButton(Q,"updateuser-clearphoto-button",Q.onUpdateUserClearPhotoClick);var ai=new Alfresco.forms.Form(Q.id+"-update-form");ai.setSubmitElements(Q.widgets.updateuserSaveButton);ai.addValidation(Q.id+"-update-firstname",Alfresco.forms.validation.mandatory,null,"keyup");ai.addValidation(Q.id+"-update-email",Alfresco.forms.validation.mandatory,null,"keyup");ai.addValidation(Q.id+"-update-email",Alfresco.forms.validation.email,null,"keyup");ai.addValidation(Q.id+"-update-quota",Alfresco.forms.validation.number,null,"keyup");ai.init();this._form=ai;Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"components/people-finder/group-finder",dataObj:{htmlid:Q.id+"-update-groupfinder"},successCallback:{fn:this.onGroupFinderLoaded,scope:this},failureMessage:"Could not load Group Finder component",execScripts:true})},onGroupFinderLoaded:function K(aj){var ai=f.get(Q.id+"-update-groupfinder");ai.innerHTML=aj.serverResponse.responseText;Q.modules.updateGroupFinder=Alfresco.util.ComponentManager.get(Q.id+"-update-groupfinder");Q.modules.updateGroupFinder.setOptions({viewMode:Alfresco.GroupFinder.VIEW_MODE_COMPACT,singleSelectMode:false,wildcardPrefix:false})},onGroupSelected:function T(aj,ai){if(this._visible){this.addGroup(ai[1])}},addGroup:function N(al){var aj=false;if(Alfresco.util.findInArray(this._groups,al.itemName,"itemName")){aj=true}if(!aj){this._groups.push(al);var ak=f.get(Q.id+"-update-groups"),ai=(this._groups.length-1),am=document.createElement("span");am.setAttribute("id",Q.id+"_group"+ai);am.setAttribute("title",Q._msg("label.removegroup"));f.addClass(am,"group-item");am.innerHTML=w(al.displayName);ak.appendChild(am);Alfresco.util.useAsButton(am,function(ao,an){YAHOO.Bubbling.fire("removeGroupUpdate",{id:an.idx,itemName:an.group.itemName});YAHOO.Bubbling.fire("itemDeselected",{eventGroup:Q.modules.updateGroupFinder,itemName:an.group.itemName})},{idx:ai,group:al});aj=false;if(Alfresco.util.findInArray(this._originalGroups,al.itemName,"itemName")){aj=true}if(!aj){this._addedGroups.push(al.itemName)}if(Alfresco.util.arrayContains(this._removedGroups,al.itemName)){Alfresco.util.arrayRemove(this._removedGroups,al.itemName)}}},onRemoveGroupUpdate:function I(am,ai){var an=ai[1].id,ak=ai[1].itemName;var al=Alfresco.util.findInArray(this._groups,ak,"itemName");if(al!=null){var aj=f.get(Q.id+"_group"+an);aj.parentNode.removeChild(aj);Alfresco.util.arrayRemove(this._groups,al);if(Alfresco.util.findInArray(this._originalGroups,al.itemName,"itemName")){this._removedGroups.push(al.itemName)}if(Alfresco.util.arrayContains(this._addedGroups,al.itemName)){Alfresco.util.arrayRemove(this._addedGroups,al.itemName)}}},getAddedGroups:function Y(){return this._addedGroups},getRemovedGroups:function ae(){return this._removedGroups},resetGroups:function H(){this._groups=[];this._addedGroups=[];this._removedGroups=[];f.get(Q.id+"-update-groups").innerHTML=""},setPhotoReset:function R(){this._photoReset=true},getPhotoReset:function L(){return this._photoReset},onBeforeShow:function ag(){f.get(Q.id+"-update-title").innerHTML="";f.setStyle(Q.id+"-update-main","visibility","hidden")},onShow:function W(){this._visible=true;window.scrollTo(0,0)},onHide:function G(){this._visible=false},onUpdate:function X(){var ai=this;var aj=function(ap){var ar=function(ax,aw){f.get(Q.id+ax).value=aw};var av=function(ay,aw,ax){if(ax["{http://www.alfresco.org/model/content/1.0}"+aw]){f.get(Q.id+ay).setAttribute("disabled",true)}};var ao=YAHOO.lang.JSON.parse(ap.serverResponse.responseText);var au=f.getElementsByClassName("update-photoimg","img");for(var an in au){au[an].src=ao.avatar?Alfresco.constants.PROXY_URI+ao.avatar+"?c=force":Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png"}var aq=ao.firstName,at=ao.lastName,al=aq+" "+(at?at:"");f.get(Q.id+"-update-title").innerHTML=w(al);ar("-update-firstname",aq);av("-update-firstname","firstName",ao.immutability);ar("-update-lastname",at);av("-update-lastname","lastName",ao.immutability);ar("-update-email",ao.email);av("-update-email","email",ao.immutability);if(!ao.capabilities.isMutable){f.get(Q.id+"-update-old-password").setAttribute("disabled",true);f.get(Q.id+"-update-password").setAttribute("disabled",true);f.get(Q.id+"-update-verifypassword").setAttribute("disabled",true);f.get(Q.id+"-update-disableaccount").setAttribute("disabled",true)}ar("-update-old-password","");ar("-update-password","");ar("-update-verifypassword","");var ak=ao.quota;if(ak!==-1){if(ak<Alfresco.util.BYTES_MB){ak=Math.round(ak/Alfresco.util.BYTES_KB);f.get(Q.id+"-update-quotatype").value="kb"}else{if(ak<Alfresco.util.BYTES_GB){ak=Math.round(ak/Alfresco.util.BYTES_MB);f.get(Q.id+"-update-quotatype").value="mb"}else{ak=Math.round(ak/Alfresco.util.BYTES_GB);f.get(Q.id+"-update-quotatype").value="gb"}}ar("-update-quota",ak.toString())}else{ar("-update-quota","")}f.get(Q.id+"-update-disableaccount").checked=(ao.enabled==false);ai.resetGroups();YAHOO.Bubbling.fire("allItemsDeselected",{eventGroup:Q.modules.updateGroupFinder});ai._originalGroups=ao.groups;for(var an=0,am=ao.groups.length;an<am;an++){ai.addGroup({itemName:ao.groups[an].itemName,displayName:ao.groups[an].displayName});YAHOO.Bubbling.fire("itemSelected",{eventGroup:Q.modules.updateGroupFinder,itemName:ao.groups[an].itemName,displayName:ao.groups[an].displayName})}if(Q.currentUserId.toLowerCase()===Alfresco.constants.USERNAME.toLowerCase()){f.setStyle(Q.id+"-oldpassword-wrapper","display","block")}else{f.setStyle(Q.id+"-oldpassword-wrapper","display","none")}f.setStyle(Q.id+"-update-main","visibility","visible");ai._form.validate()};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/people/"+encodeURIComponent(Q.currentUserId)+"?groups=true",method:Alfresco.util.Ajax.GET,successCallback:{fn:aj,scope:Q},failureMessage:Q._msg("message.getuser-failure",w(Q.currentUserId))})}});new UpdatePanelHandler();CSVResultsPanelHandler=function O(){CSVResultsPanelHandler.superclass.constructor.call(this,"csvresults")};YAHOO.extend(CSVResultsPanelHandler,Alfresco.ConsolePanelHandler,{onLoad:function F(){Q.widgets.csvGobackButton=Alfresco.util.createYUIButton(Q,"csv-goback-button",Q.onGoBackClick)},onShow:function W(){if(Q.csvResults){var ak;var am=Q.csvResults.successful;if(am&&am.length>0&&Q.csvResults.successful[0].response){am=am[0].response;if(am.data&&am.data.users){Q.fileUpload.hide();ak=new YAHOO.util.DataSource(am.data.users);ak.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;ak.responseSchema={fields:["username","uploadStatus"]};if(am.data.addedUsers==0){Alfresco.util.PopupManager.displayMessage({text:Q._msg("message.csvupload.failure")})}else{if(am.data.addedUsers==am.data.totalUsers){Alfresco.util.PopupManager.displayMessage({text:Q._msg("message.csvupload.success",am.data.addedUsers)})}else{var ai=am.data.totalUsers-am.data.addedUsers;Alfresco.util.PopupManager.displayMessage({text:Q._msg("message.csvupload.partialSuccess",am.data.addedUsers,ai)})}}var al=[{key:"username",label:Q._msg("label.username"),sortable:true,resizeable:true},{key:"uploadStatus",label:Q._msg("label.uploadStatus"),sortable:true,resizeable:true}];var aj=new YAHOO.widget.DataTable(Q.id+"-csvresults-datatable",al,ak);f.removeClass(Q.id+"-csvresults-success","hidden");f.addClass(Q.id+"-csvresults-failure","hidden")}else{Q.fileUpload.hide();Alfresco.util.PopupManager.displayMessage({text:Q._msg("message.csvupload.error")});f.get(Q.id+"-csvresults-error").innerHTML=am.message;f.addClass(Q.id+"-csvresults-success","hidden");f.removeClass(Q.id+"-csvresults-failure","hidden")}}else{}}}});new CSVResultsPanelHandler();return this};YAHOO.extend(Alfresco.ConsoleUsers,Alfresco.ConsoleTool,{options:{minSearchTermLength:1,maxSearchResults:100,minUsernameLength:2,minPasswordLength:3,showAuthorizationStatus:false,docsEdition:"community"},currentUserId:"",searchTerm:undefined,csvResults:undefined,onReady:function m(){this.popups.deleteDialog=Alfresco.util.createYUIPanel("deleteDialog",{width:"36em",text:'<div class="yui-u" style="text-align:center"><br/>'+this._msg("panel.delete.msg")+"<br/><br/>"+this._msg("panel.delete.note")+"<br/><br/></div>",buttons:[{text:this._msg("button.delete"),handler:{fn:this.onDeleteUserOK,scope:this}},{text:this._msg("button.cancel"),handler:{fn:this.onDeleteUserCancel,scope:this},isDefault:true}]},{type:YAHOO.widget.SimpleDialog});this.popups.deleteDialog.setHeader(this._msg("panel.delete.header"));Alfresco.ConsoleUsers.superclass.onReady.call(this)},onStateChanged:function t(H,F){var G=this.decodeHistoryState(F[1].state);if(G.panel){this.showPanel(G.panel)}if(G.search!==undefined&&this.currentPanelId==="search"){var E=G.search;this.searchTerm=E;this.updateCurrentPanel()}if(G.userid&&(this.currentPanelId==="view"||this.currentPanelId==="create"||this.currentPanelId==="update")){this.currentUserId=G.userid;this.updateCurrentPanel()}},onSearchClick:function C(H,G){var F=f.get(this.id+"-search-text");var E=YAHOO.lang.trim(F.value);if(E.length<this.options.minSearchTermLength){Alfresco.util.PopupManager.displayMessage({text:this._msg("message.minimum-length",this.options.minSearchTermLength)});return}this.refreshUIState({search:E})},onDeauthorizedButtonClick:function n(G,N){var I=this;var J=[{text:this.msg("deauthorize.dialog.deauthorize.confirm.ok"),handler:function K(){this.hide();Alfresco.util.Ajax.request({method:Alfresco.util.Ajax.POST,url:Alfresco.constants.PROXY_URI+"api/deauthorize",requestContentType:Alfresco.util.Ajax.JSON,dataObj:{username:I.selectedUser},successCallback:{fn:function O(){Alfresco.util.PopupManager.displayMessage({text:I.msg("message.deauthorize.success")});YAHOO.lang.later(2000,this,function(){window.location.reload()})},scope:I},failureCallback:{fn:function P(R){var Q=YAHOO.lang.JSON.parse(R.serverResponse.responseText).message;Alfresco.util.PopupManager.displayPrompt({text:I.msg("message.deauthorize.failure",Q)})},scope:I}})}},{text:this.msg("deauthorize.dialog.deauthorize.confirm.cancel"),handler:function L(){this.hide()},isDefault:true}];this.deauthorizeDialog=new YAHOO.widget.Dialog(this.id+"-deauthorizeuserdialog",{width:"35em",modal:true,fixedcenter:true,close:false,buttons:J});var M=this.msg("deauthorize.dialog.header",this.selectedUser);var E=this.msg("deauthorize.dialog.checkbox.message");var F=this.msg("deauthorize.dialog.message",this.options.docsEdition)+'<br><br>&nbsp;&nbsp;<input type="checkbox" name="isAgreed" id="isAgreedID" value="1" />&nbsp;'+E;this.deauthorizeDialog.setHeader(M);this.deauthorizeDialog.setBody(F);this.deauthorizeDialog.render(N.parentNode.parentNode.firstChild);this.deauthorizeDialog.getButtons()[0]._setDisabled(true);var H=f.get("isAgreedID");YAHOO.util.Event.addListener(H,"change",function(P,O){I.deauthorizeDialog.getButtons()[0]._setDisabled(!O.checked)},H,this);this.deauthorizeDialog.show()},onReauthorizedButtonClick:function x(H,E,F){var G=this;var I=function(L){if(!G.reauthorizeDialog){G.reauthorizeDialog=Alfresco.util.ComponentManager.findFirst("Alfresco.HtmlUpload")}var K={uploadURL:"api/enterprise/restoredb",mode:G.reauthorizeDialog.MODE_SINGLE_UPLOAD,onFileUploadComplete:{fn:function(O){if(O.successful[0].response.status.result!="success"){Alfresco.util.PopupManager.displayMessage({text:F._msg("reauthorize.dialog.fail"),effect:null})}else{Alfresco.util.PopupManager.displayMessage({text:F._msg("reauthorize.dialog.success"),effect:null})}YAHOO.lang.later(2000,this,function(){window.location.reload()})},scope:G}};G.reauthorizeDialog.show(K);var J=f.get(G.reauthorizeDialog.id+"-extension-message");var N=f.get(G.reauthorizeDialog.id+"-select-file-message");if(!G.fileUploadOriginalMessages){G.fileUploadOriginalMessages={};G.fileUploadOriginalMessages.originalExtesnsionSpan=J.innerHTML;G.fileUploadOriginalMessages.originalSelectFileMessage=N.innerHTML;G.fileUploadOriginalMessages.originalTitle=G.reauthorizeDialog.widgets.titleText.innerHTML;G.fileUploadOriginalMessages.originalTitleUploadButtonLable=G.reauthorizeDialog.widgets.uploadButton._button.innerHTML}G.reauthorizeDialog.widgets.titleText.innerHTML=F._msg("reauthorize.dialog.title",G.selectedUser);G.reauthorizeDialog.widgets.uploadButton._button.innerHTML=F._msg("reauthorize.dialog.button.ok");J.innerHTML=F._msg("reauthorize.dialog.message",G.selectedUser+":"+YAHOO.lang.JSON.parse(L.serverResponse.responseText).restoreKey);N.innerHTML="";var M=f.get(G.reauthorizeDialog.id+"-singleUploadTip-span");f.addClass(M,"hidden");D.preventDefault(H)};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/enterprise/restoredb?username="+encodeURIComponent(G.selectedUser),method:Alfresco.util.Ajax.GET,successCallback:{fn:I,scope:F}})},onUploadUsersClick:function l(I,G){if(!this.fileUpload){this.fileUpload=Alfresco.util.ComponentManager.findFirst("Alfresco.HtmlUpload")}var F={uploadURL:"api/people/upload.html",mode:this.fileUpload.MODE_SINGLE_UPLOAD,onFileUploadComplete:{fn:this.onUsersUploadComplete,scope:this}};if(this.fileUploadOriginalMessages){var E=f.get(this.fileUpload.id+"-extension-message");var J=f.get(this.fileUpload.id+"-select-file-message");E.innerHTML=this.fileUploadOriginalMessages.originalExtesnsionSpan;J.innerHTML=this.fileUploadOriginalMessages.originalSelectFileMessage;this.fileUpload.widgets.titleText.innerHTML=this.fileUploadOriginalMessages.originalTitle;this.fileUpload.widgets.uploadButton._button.innerHTML=this.fileUploadOriginalMessages.originalTitleUploadButtonLable}this.fileUpload.show(F);var H=f.get(this.fileUpload.id+"-singleUploadTip-span");f.addClass(H,"hidden");D.preventDefault(I)},onUsersUploadComplete:function y(E){this.csvResults=E;this.refreshUIState({panel:"csvresults"})},onNewUserClick:function u(F,E){this.refreshUIState({panel:"create"})},onEditUserClick:function k(F,E){this.refreshUIState({panel:"update"})},onViewUserClick:function h(G,F){var E=F[1].username;this.refreshUIState({panel:"view",userid:E})},onGoBackClick:function z(F,E){this.refreshUIState({panel:"search"})},onDeleteUserClick:function A(F,E){this.popups.deleteDialog.show()},onDeleteUserOK:function o(E){Alfresco.util.Ajax.request({method:Alfresco.util.Ajax.DELETE,url:Alfresco.constants.PROXY_URI+"api/people/"+encodeURIComponent(this.currentUserId),successCallback:{fn:this.onDeletedUser,scope:this},failureMessage:this._msg("panel.delete.fail")})},onDeletedUser:function d(E){this.popups.deleteDialog.hide();Alfresco.util.PopupManager.displayMessage({text:this._msg("message.delete-success")});this.refreshUIState({panel:"search"})},onDeleteUserCancel:function a(E){this.popups.deleteDialog.hide()},onCreateUserOKClick:function j(H,E){var G=this._getCurrentPanel()._form;if(G.validate()){var F=function(I){window.scrollTo(0,0);Alfresco.util.PopupManager.displayMessage({text:this._msg("message.create-success")});this.refreshUIState({panel:"search"})};this._createUser(F)}else{G._setAllFieldsAsVisited()}},onCreateUserAnotherClick:function q(I,E){var H=this._getCurrentPanel()._form;if(H.validate()){var G=this;var F=function(J){window.scrollTo(0,0);Alfresco.util.PopupManager.displayMessage({text:G._msg("message.create-success")});this._getCurrentPanel().clear();f.get(G.id+"-create-firstname").focus()};this._createUser(F)}else{H._setAllFieldsAsVisited()}},onCreateUserCancelClick:function s(F,E){if(this.widgets.selectedItem){this.widgets.selectedItem.set("disabled",true)}this.refreshUIState({panel:"search"})},onUpdateUserOKClick:function B(I,E){var H=this._getCurrentPanel()._form;if(H.validate()){var G=this;var F=function(J){window.scrollTo(0,0);Alfresco.util.PopupManager.displayMessage({text:G._msg("message.update-success")});G.refreshUIState({panel:"view"})};this._updateUser(F)}else{H._setAllFieldsAsVisited()}},onUpdateUserCancelClick:function p(F,E){this.refreshUIState({panel:"view"})},onUpdateUserClearPhotoClick:function c(F,E){f.get(this.id+"-update-photoimg").src=Alfresco.constants.URL_RESCONTEXT+"components/images/no-user-photo-64.png";this._getCurrentPanel().setPhotoReset()},encodeHistoryState:function r(G){var E={};if(this.currentPanelId!==""){E.panel=this.currentPanelId}if(this.currentUserId!==""){E.userid=this.currentUserId}if(this.searchTerm!==undefined){E.search=this.searchTerm}var F="";if(G.panel||E.panel){F+="panel="+encodeURIComponent(G.panel?G.panel:E.panel)}if(G.userid||E.userid){if(F.length!==0){F+="&"}F+="userid="+encodeURIComponent(G.userid?G.userid:E.userid)}if(G.search!==undefined||E.search!==undefined){if(F.length!==0){F+="&"}F+="search="+encodeURIComponent(G.search!==undefined?G.search:E.search)}return F},_createUser:function g(M){var K=this;var H=function(N){return YAHOO.lang.trim(f.get(K.id+N).value)};var L=H("-create-password");var E=H("-create-verifypassword");if(L!==E){Alfresco.util.PopupManager.displayMessage({text:this._msg("message.password-validate-failure")});return}var I=H("-create-username");var F=this._calculateQuota(K.id+"-create");var G=this._getCurrentPanel().getGroups();var J={userName:I,password:L,firstName:H("-create-firstname"),lastName:H("-create-lastname"),email:H("-create-email"),disableAccount:f.get(K.id+"-create-disableaccount").checked,quota:F,groups:G};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/people",method:Alfresco.util.Ajax.POST,dataObj:J,requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:M,scope:this},failureCallback:{fn:function(O){if(O.serverResponse.status===409){Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:this._msg("message.create-user-exists")})}else{var N=Alfresco.util.parseJSON(O.serverResponse.responseText);Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:this._msg("message.create-failure",N?N.message:O.serverResponse.statusText)})}},scope:this}})},_updateUser:function b(P){var L=this;var M=(this.currentUserId.toLowerCase()===Alfresco.constants.USERNAME.toLowerCase());var I=function(Q){return f.get(L.id+Q).value};var E=function(Q){var R=function(S){if(YAHOO.lang.trim(I("-update-password")).length!==0){var T={newpw:YAHOO.lang.trim(I("-update-password"))};if(M==true){T.oldpw=YAHOO.lang.trim(I("-update-old-password"))}Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/person/changepassword/"+encodeURIComponent(L.currentUserId),method:Alfresco.util.Ajax.POST,dataObj:T,requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:P,scope:L},failureMessage:L._msg("message.password-failure")})}else{P.call()}};if(this._getCurrentPanel().getPhotoReset()){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"slingshot/profile/resetavatar/"+encodeURIComponent(this.currentUserId),method:Alfresco.util.Ajax.PUT,requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:R,scope:this},failureCallback:{fn:function(S){Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:this._msg("message.clear-photo-failure")});R.call()},scope:this}})}else{R.call()}};var O=I("-update-old-password");var N=I("-update-password");var F=I("-update-verifypassword");if(YAHOO.lang.trim(N).length!==0){if(M==true&&(YAHOO.lang.trim(O).length===0)){Alfresco.util.PopupManager.displayMessage({text:this._msg("message.password-validate-oldpw")});return}if(YAHOO.lang.trim(N).length<this.options.minPasswordLength){Alfresco.util.PopupManager.displayMessage({text:this._msg("message.password-validate-length",this.options.minPasswordLength)});return}if(N!==F){Alfresco.util.PopupManager.displayMessage({text:this._msg("message.password-validate-failure")});return}}var G=this._calculateQuota(L.id+"-update");var J=this._getCurrentPanel().getAddedGroups();var H=this._getCurrentPanel().getRemovedGroups();var K={firstName:I("-update-firstname"),lastName:I("-update-lastname"),email:I("-update-email"),disableAccount:f.get(L.id+"-update-disableaccount").checked,quota:G,addGroups:J,removeGroups:H};Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"api/people/"+encodeURIComponent(this.currentUserId),method:Alfresco.util.Ajax.PUT,dataObj:K,requestContentType:Alfresco.util.Ajax.JSON,successCallback:{fn:E,scope:this},failureCallback:{fn:function(R){var Q=Alfresco.util.parseJSON(R.serverResponse.responseText);Alfresco.util.PopupManager.displayPrompt({title:this._msg("message.failure"),text:this._msg("message.update-failure",Q.message)})},scope:this}})},_calculateQuota:function i(G){var F=-1;var H=f.get(G+"-quota").value;if(H.length!==0){try{F=parseInt(H);if(F>=0){var E=f.get(G+"-quotatype").value;if(E==="gb"){F*=Alfresco.util.BYTES_GB}else{if(E==="mb"){F*=Alfresco.util.BYTES_MB}else{if(E==="kb"){F*=Alfresco.util.BYTES_KB}}}}else{F=-1}}catch(I){}}return F},_msg:function e(E){return Alfresco.util.message.call(this,E,"Alfresco.ConsoleUsers",Array.prototype.slice.call(arguments).slice(1))}})})();