
/**************Variables globales */
var idalgo_vg=new Array();
idalgo_vg['REF_LANGUAGE']=2;
idalgo_vg['LIVE']=new Array();
idalgo_vg['LIVE']['TXT_STATUSBAR']="... tout sur le foot!!";
idalgo_vg['LIVE']['IS_STATUSBAR']="1";
idalgo_vg['LIVE']['REFRESH_TTL']=new Array();
idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH']=60;
idalgo_vg['LIVE']['REFRESH_TTL']['NUM_NEXTREFRESH']=0;
idalgo_vg['LIVE']['REFRESH_TTL']['IS_CHRONO']=0;
idalgo_vg['LIVE']['LIST_LANGUAGE']=new Array();
idalgo_vg['LIVE']['LIST_LANGUAGE']['TXT_ACTION']=new Array();
idalgo_vg['LIVE']['LIST_LANGUAGE']['TXT_ACTION'][1]='BUT';
idalgo_vg['LIVE']['CROSS_DOMAIN']=false;
idalgo_vg['LIVE']['IS_GET']=0;

/************** Main */
function idalgo_jsf_main(){	
	idalgo_jsf_data_live();
}

/* chargement initial */
idalgo_jsf_main();

/* Rafraichissement Multiplex*/
function idalgo_jsf_multiplex_comment(txt_competition,ref_language){
	var obj = document.getElementById('idalgo_content_multiplex_refresh');
	if (obj) {
		var num_refresh = this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH'];
		if (num_refresh > 0) {
			window.clearTimeout(this.idalgo_vg['LIVE']['TIME_LOAD_MULTIPLEX']);
			this.idalgo_vg['LIVE']['TIME_LOAD_MULTIPLEX'] = window.setTimeout("loadModuleTargetSplash('" + document.getElementById('idalgo_content_multiplex_comment').parentNode.id + "','content_multiplex_comment','txt_competition=" + txt_competition + "&ref_language="+ref_language+"',false)", num_refresh * 1000);
			//window.setTimeout("idalgo_jsf_multiplex_comment_refresh()",1000);
			window.clearTimeout(this.idalgo_vg['LIVE']['TIME_COMMENT_MULTIPLEX']);
			this.idalgo_vg['LIVE']['TIME_COMMENT_MULTIPLEX'] = window.setTimeout("idalgo_jsf_multiplex_comment('" + txt_competition + "',"+ref_language+")", num_refresh * 1000);
		}
	}
	else {
		window.clearTimeout(this.idalgo_vg['LIVE']['TIME_COMMENT_MULTIPLEX']);
		this.idalgo_vg['LIVE']['TIME_COMMENT_MULTIPLEX'] =  window.setTimeout("idalgo_jsf_multiplex_comment('" + txt_competition + "',"+ref_language+")", 1000);
	}
}
function idalgo_jsf_multiplex_comment_refresh(){
	var obj=document.getElementById('idalgo_content_multiplex_refresh');
	if(obj){
		if(obj.innerHTML>1){obj.innerHTML=obj.innerHTML-1;} else {obj.parentNode.innerHTML='';}
	}
	window.setTimeout('idalgo_jsf_multiplex_comment_refresh()',1000);
}

/* Rafraichissement Match Live */
function idalgo_jsf_match_comment(ref_match,ref_language){
	var obj=document.getElementById('idalgo_content_match_refresh');
	if (obj) {
		var num_refresh = this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH'];
		if (num_refresh > 0) {
			window.clearTimeout(this.idalgo_vg['LIVE']['TIME_LOAD']);
			this.idalgo_vg['LIVE']['TIME_LOAD'] = window.setTimeout("loadModuleTargetSplash('idalgo_content_match_comment','content_match_comment','ref_match=" + ref_match + "&ref_language=" + ref_language + "',false)", num_refresh * 1000);
			//window.setTimeout("idalgo_jsf_match_comment_refresh()",1000);
			window.clearTimeout(this.idalgo_vg['LIVE']['TIME_COMMENT']);
			this.idalgo_vg['LIVE']['TIME_COMMENT'] = window.setTimeout("idalgo_jsf_match_comment(" + ref_match + "," + ref_language + ")", ( num_refresh) * 1000);
		}
	}
	else {
		window.clearTimeout(this.idalgo_vg['LIVE']['TIME_COMMENT']);
		this.idalgo_vg['LIVE']['TIME_COMMENT'] = window.setTimeout("idalgo_jsf_match_comment(" + ref_match + "," + ref_language + ")", 1000);
	}
}
function idalgo_jsf_match_comment_refresh(){
	var obj=document.getElementById('idalgo_content_match_refresh');
	if(obj){
//    if(obj.innerHTML>1){obj.innerHTML=obj.innerHTML-1;}
//        else {obj.parentNode.innerHTML='';}
        var sec = obj.getAttribute("num_second");
	    var txt = ""; 
        
		if( sec ){
        sec = sec -1;
        obj.setAttribute("num_second", sec);
            if( sec > 59 ){
                var minute = parseInt(sec/60);
                sec = sec%60;
                if( minute > 59 ){
                    var hour = parseInt(minute/60);
                    minute = minute%60;
                    if( hour > 23 ){
                        var day = parseInt(hour/24);
                        hour = hour %24;
                        txt = day + " "+obj.getAttribute("txt_day")+" "+
                                hour + " "+obj.getAttribute("txt_hour")+" "+
                                minute + " "+obj.getAttribute("txt_minute")+" "+
                                sec; 
                    }else{
                        txt = hour + " "+obj.getAttribute("txt_hour")+" "+
                                minute + " "+obj.getAttribute("txt_minute")+" "+
                                sec;
                    }
                }else{
                    txt = minute + " "+obj.getAttribute("txt_minute")+" "+sec;
                }
            }else{
                txt = sec;
            }
            obj.innerHTML = txt;
        }else{
            obj.parentNode.innerHTML='';
        }
	}	
	window.setTimeout('idalgo_jsf_match_comment_refresh()',1000);
}

/* Rafraichissement Time Line */
function idalgo_jsf_match_timeline(ref_match,ref_language){
	var num_refresh=60;
	if(num_refresh>0){
		window.setTimeout("loadModuleTargetSplash('"+document.getElementById('idalgo_content_match_timeline').parentNode.id+"','content_match_timeline','ref_match="+ref_match+"&ref_language="+ref_language+"',false)",num_refresh*1000);
		window.setTimeout("idalgo_jsf_match_timeline("+ref_match+","+ref_language+")",num_refresh*1000);
	}
}

/************** classe  AJAX*/
function idalgo_oObjAjax(){
	this.url="http://football.lesoir.be/cache/page/loadmodule.php";
	this.url_cross='/idalgo_cross_loadmodule_sport_football.php';
	this.makenode=function(oMainNode){
		var oMain=new Array();
		oMain['value']=oMainNode.nodeValue;
		/* Liste des attributs */
		var list_attribute=oMainNode.attributes;
		if(list_attribute){
			for(var key=0;key < list_attribute.length;key++){
				var o_attribute=list_attribute[key];
				oMain[o_attribute.nodeName.toUpperCase()]=o_attribute.nodeValue;
			}
		}
		/* Liste des Noeuds */
		var list_node_brother=new Array();
		var list_node=oMainNode.childNodes;
		for(var key=0;key<list_node.length;key++){
			var o_node=list_node[key];
			var txt_node=o_node.nodeName.toUpperCase();

			if(list_node_brother[txt_node]>=0) list_node_brother[txt_node]++; else list_node_brother[txt_node]=0;

			if(!oMain[txt_node]) oMain[txt_node]=new Array();
			oMain[txt_node].length=oMain[txt_node].length++;

			oMain[txt_node][list_node_brother[txt_node]]=this.makenode(o_node);
		}
		/* Valeur de retour */
		return oMain;
	};
	this.request=function(Callfunction_ArgList,CallbackFunction){
		var oXHR=null;
		var _this=this;
		if(window.XMLHttpRequest) oXHR=new XMLHttpRequest(); /* Firefox */
		else{
			try{ oXHR=new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e){ oXHR=new ActiveXObject("Microsoft.XMLHTTP"); }
		}
		oXHR.onreadystatechange=function(){
			if(oXHR.readyState==4){
				var oReturn=new Array();
				if (oXHR.status==200){
					var objXML=oXHR.responseXML;
					if(objXML.childNodes[0]){
						if (objXML.childNodes[0].nodeName=='xml') var o_node=objXML.childNodes[1];
						else var o_node=objXML.childNodes[0];
						var oRes=new Array();
						var oA = new idalgo_oObjAjax();
						oRes=oA.makenode(o_node);

						oReturn['error']=null;
						oReturn['value']=oRes;
						oReturn['count']=objXML.documentElement.getAttribute('count');
					}
					else{
						oReturn['error']='Error '+oXHR.status;
						oReturn['value']='cross_domaine_active';
						oReturn['count']=0;
					}
					CallbackFunction(oReturn);
				}
				else{
					if(!window.idalgo_vg['LIVE']['CROSS_DOMAIN']){
						window.idalgo_vg['LIVE']['CROSS_DOMAIN']=true;
						_this.request(Callfunction_ArgList,CallbackFunction);
					}
					else{
						oReturn['error']='Error '+oXHR.status;
						oReturn['value']='cross_domaine_active';
						oReturn['count']=0;
						CallbackFunction(oReturn);
					}
				}
			}
		};

		var txt_url=window.idalgo_vg['LIVE']['CROSS_DOMAIN']==true?this.url_cross:this.url;
		if(window.idalgo_vg['LIVE']['IS_GET']==1){
			try{
				oXHR.open("GET",txt_url+'?'+Callfunction_ArgList,true);
				oXHR.send(null);
			}
			catch(e){
				window.idalgo_vg['LIVE']['CROSS_DOMAIN']=true;
				oXHR.open("GET",this.url_cross+'?'+Callfunction_ArgList,true);
				oXHR.send(null);
			}
		}
		else{
			try{
				oXHR.open("POST",txt_url,true);
				oXHR.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
				oXHR.send(Callfunction_ArgList);
			}
			catch(e){
				window.idalgo_vg['LIVE']['CROSS_DOMAIN']=true;
				oXHR.open("POST",this.url_cross,true);
				oXHR.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
				oXHR.send(Callfunction_ArgList);
			}
		}
	};
	this.execute=function(sModule,sType,ParameterList,CallbackFunction){
		var CallFct_ArgLst='';
		var aPar=new Array();
		for(var key in ParameterList){
			if(typeof(ParameterList[key])=='number' || typeof(ParameterList[key])=='string'){
				aPar[aPar.length]=key+'='+encodeURIComponent(ParameterList[key]);
			}
		}
		var sPar=aPar.join('&');
		sPar='module='+sModule+'&type='+sType+'&args='+encodeURIComponent(sPar);
		this.request(sPar,CallbackFunction);
	};
}

/************** Chargement des donn�es */
function idalgo_jsf_data_live(oResponse){
	if (!oResponse){
		idalgo_jsf_timeout_clear();
		idalgo_jsf_display_statusbar('load_init');
		var aArg=new Array();
		aArg['ref_language']=this.idalgo_vg['REF_LANGUAGE'];
		var oA = new idalgo_oObjAjax();
		oA.execute('xml_live','xml',aArg,idalgo_jsf_data_live);
		oA=null;
		return;
	}
	idalgo_jsf_display_statusbar('load_end');

	/*Erreur */
	if(!oResponse.value && !oResponse.error){
		idalgo_jsf_display_statusbar('error_init',this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH']);
		window.setTimeout('idalgo_jsf_data_live()',this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH']*1000);
		return;
	}
	else if (oResponse.error!=null){
		if(oResponse.value){
			if(oResponse.value!='cross_domaine_active'){
				idalgo_jsf_display_statusbar('error_init',this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH']);
				window.setTimeout('idalgo_jsf_data_live()',this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH']*1000);
			}
		}
		return;
	}

	/* Lecture des donn�es */
	/*this.idalgo_vg['LIVE']['__idalgo___test__']=oResponse; */
	if(oResponse['value']['MATCHLIST']){
		var o_matchlist=oResponse['value']['MATCHLIST'][0];
		this.idalgo_vg['LIVE']['TXT_FINISH']=o_matchlist['TXT_FINISH'];
		this.idalgo_vg['LIVE']['TXT_FINISH_FR']=o_matchlist['TXT_FINISH_FR'];
		this.idalgo_vg['LIVE']['TXT_FINISH_EN']=o_matchlist['TXT_FINISH_EN'];
		this.idalgo_vg['LIVE']['TXT_FINISH_ES']=o_matchlist['TXT_FINISH_ES'];
		this.idalgo_vg['LIVE']['TXT_FINISH_DE']=o_matchlist['TXT_FINISH_DE'];
		this.idalgo_vg['LIVE']['TXT_FINISH_IT']=o_matchlist['TXT_FINISH_IT'];
		this.idalgo_vg['LIVE']['TXT_FINISH_NL']=o_matchlist['TXT_FINISH_NL'];
		this.idalgo_vg['LIVE']['TXT_FINISH_PT']=o_matchlist['TXT_FINISH_PT'];
		this.idalgo_vg['LIVE']['TXT_FINISH_AR']=o_matchlist['TXT_FINISH_AR'];
		this.idalgo_vg['LIVE']['TXT_FINISH_RU']=o_matchlist['TXT_FINISH_RU'];
		if(this.idalgo_vg['LIVE']['LIST_MATCH_NEW']) delete this.idalgo_vg['LIVE']['LIST_MATCH_NEW'];

		var list_match=o_matchlist['MATCH'];
		if(list_match){
			this.idalgo_vg['LIVE']['LIST_MATCH_NEW']=new Array;
			for(var i=0;i < list_match.length;i++){
				var oMatch=list_match[i];
				var ref_match=oMatch['REF_MATCH'];
				this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match]=oMatch;

				if(oMatch['LIST_ACTION']){
					if(oMatch['LIST_ACTION'][0]['ACTION']){
						var list_action=oMatch['LIST_ACTION'][0]['ACTION'];
						var o_actionlist=new Array();
						for(var j=0;j<list_action.length;j++){
							var o_action=list_action[j];
							o_actionlist[o_action['REF_ACTION']]=o_action;
						}
						this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match]['LIST_ACTION']=o_actionlist;
					}
				}
				if(oMatch['LIST_COMMENT']){
					if(oMatch['LIST_COMMENT'][0]['COMMENT']){
						var list_comment=oMatch['LIST_COMMENT'][0]['COMMENT'];
						var o_commentlist=new Array();
						for(var j=0;j<list_comment.length;j++){
							var o_comment=list_comment[j];
							o_commentlist[o_comment['REF_COMMENT']]=o_comment;
						}
						this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match]['LIST_COMMENT']=o_commentlist;
					}
				}
			}
		}
		idalgo_jsf_load_live();

		if(!list_match){
			var num_nextlive=o_matchlist['NUM_NEXTLIVE'];
			if(num_nextlive>0){
				idalgo_vg['LIVE']['REFRESH_TTL']['NUM_NEXTREFRESH']=num_nextlive;
				window.setTimeout('idalgo_jsf_data_live()',num_nextlive*1000);
				idalgo_jsf_display_statusbar('next_live',o_matchlist['TIME_NEXTMATCH']);
			}
		}
	}
}

/************** Chargement et analyse des rencontres */
function idalgo_jsf_load_live(){

	idalgo_jsf_display_live_event_end();

	if(this.idalgo_vg['LIVE']['LIST_MATCH_OLD']){
		var list_oldmatch=this.idalgo_vg['LIVE']['LIST_MATCH_OLD'];
		if(this.idalgo_vg['LIVE']['LIST_MATCH_NEW']){
			var list_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'];
			for(var ref_match in list_match){
				var o_match=list_match[ref_match];
				var o_oldmatch=list_oldmatch[ref_match];

				if(o_oldmatch){
					if(o_match['REF_STATUS']!=o_oldmatch['REF_STATUS']) idalgo_jsf_display_live_change_status(ref_match);
					if(o_match['NUM_LOCALSCORE']!=o_oldmatch['NUM_LOCALSCORE']) idalgo_jsf_display_live_change_localscore(ref_match);
					if(o_match['NUM_VISITORSCORE']!=o_oldmatch['NUM_VISITORSCORE']) idalgo_jsf_display_live_change_visitorscore(ref_match);
					if(o_match['NUM_LOCALSCORE_EXTRATIME']!=o_oldmatch['NUM_LOCALSCORE_EXTRATIME']) idalgo_jsf_display_live_change_localscore(ref_match);
					if(o_match['NUM_VISITORSCORE_EXTRATIME']!=o_oldmatch['NUM_VISITORSCORE_EXTRATIME']) idalgo_jsf_display_live_change_visitorscore(ref_match);
					if(o_match['NUM_LOCALSCORE_PENALTY']!=o_oldmatch['NUM_LOCALSCORE_PENALTY']) idalgo_jsf_display_live_change_localscore(ref_match);
					if(o_match['NUM_VISITORSCORE_PENALTY']!=o_oldmatch['NUM_VISITORSCORE_PENALTY']) idalgo_jsf_display_live_change_visitorscore(ref_match);
					/* Actions*/
					var list_action=o_match['LIST_ACTION'];
					var list_oldaction=o_oldmatch['LIST_ACTION'];
					for(var ref_action in list_action){
						//if( typeof( list_action[ref_action] ) != 'function' ){
						if( list_action.hasOwnProperty(ref_action) ){
							if(list_oldaction){
								var o_action=list_action[ref_action];
								var o_oldaction=list_oldaction[ref_action];
							
								if(!o_oldaction) idalgo_jsf_display_live_change_action(ref_match,ref_action);
								else if( o_action['NUM_MINUTE'] != o_oldaction['NUM_MINUTE']) idalgo_jsf_display_live_change_action(ref_match,ref_action);
							}
							else
								idalgo_jsf_display_live_change_action(ref_match,ref_action);
						}
					}
					/* Comment */
					var list_comment=o_match['LIST_COMMENT'];
					var list_oldcomment=o_oldmatch['LIST_COMMENT'];
					for(var ref_comment in list_comment){
						if( list_comment.hasOwnProperty(ref_comment) ){
							if(list_oldcomment){
								var o_comment=list_comment[ref_comment];
								var o_oldcomment=list_oldcomment[ref_comment];
							
								if(!o_oldcomment) idalgo_jsf_display_live_change_comment(ref_match,ref_comment);
								else if(o_comment['NUM_COMMENT_VALUE'] != o_oldcomment['NUM_COMMENT_VALUE']) idalgo_jsf_display_live_change_comment(ref_match,ref_comment);
							}
							else
								idalgo_jsf_display_live_change_comment(ref_match,ref_comment);
						}
					}					
				}
				else
					idalgo_jsf_display_live_change_status(ref_match);
			}

			for(var ref_match in list_oldmatch){
				var o_match=list_match[ref_match];
				if(!o_match) idalgo_jsf_display_live_change_status(ref_match);
			}

			this.idalgo_vg['LIVE']['LIST_MATCH_OLD']=new Array();
			this.idalgo_vg['LIVE']['LIST_MATCH_OLD']=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'];
			idalgo_jsf_timeout_init();
		}
		else{
			for(var ref_match in list_oldmatch)
				idalgo_jsf_display_live_change_status(ref_match);
			delete this.idalgo_vg['LIVE']['LIST_MATCH_OLD'];
			idalgo_jsf_display_statusbar('normal','');
		}
		
	}
	else{
		if(this.idalgo_vg['LIVE']['LIST_MATCH_NEW']){
			this.idalgo_vg['LIVE']['LIST_MATCH_OLD']=new Array();
			this.idalgo_vg['LIVE']['LIST_MATCH_OLD']=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'];
			idalgo_jsf_timeout_init();
			for (var ref_match in this.idalgo_vg['LIVE']['LIST_MATCH_NEW']) {
				idalgo_jsf_display_widget_foot_change_status(this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match]);
			}
		}
	}
	if(idalgo_vg['LIVE']['REFRESH_TTL']['IS_CHRONO']==0) idalgo_jsf_timeout_chrono_exec();
}

/************** Gestion du temps */
function idalgo_jsf_timeout_clear(){
	if(this.idalgo_vg['LIVE']['REFRESH_TTL']['OBJECT']){
		window.clearTimeout(this.idalgo_vg['LIVE']['REFRESH_TTL']['OBJECT']);
	}
}
function idalgo_jsf_timeout_init(num_second){
	idalgo_jsf_timeout_clear();
	num_second=num_second?num_second:this.idalgo_vg['LIVE']['REFRESH_TTL']['NUM_TIMEREFRESH'];
	this.idalgo_vg['LIVE']['REFRESH_TTL']['SECONDS']=num_second;
	idalgo_jsf_timeout_exec();
}
function idalgo_jsf_timeout_exec(){
	TimeOut=this.idalgo_vg['LIVE']['REFRESH_TTL']['SECONDS'];
	if(TimeOut<=0){
		idalgo_jsf_timeout_clear();
		idalgo_jsf_data_live();
	}
	else{
		idalgo_jsf_display_statusbar('live_refresh',TimeOut);
		this.idalgo_vg['LIVE']['REFRESH_TTL']['SECONDS']=TimeOut-1;
		this.idalgo_vg['LIVE']['REFRESH_TTL']['OBJECT']=window.setTimeout('idalgo_jsf_timeout_exec()',1000);
	}
}

function idalgo_jsf_timeout_chrono_exec(){
	idalgo_vg['LIVE']['REFRESH_TTL']['IS_CHRONO']=0;
	if(this.idalgo_vg['LIVE']['LIST_MATCH_OLD']){
		var list_oldmatch=this.idalgo_vg['LIVE']['LIST_MATCH_OLD'];
		var is_live=false;
		for(var ref_match in list_oldmatch){
			var o_match=list_oldmatch[ref_match];
			var ref_status=parseInt(o_match['REF_STATUS']);
			if(ref_status>=7){
				is_live=true;
				/*idalgo_jsf_display_live_change_chrono_live(o_match); */
				idalgo_jsf_display_live_change_chrono_match_navigation(o_match);
				idalgo_jsf_display_live_change_chrono_content_result(o_match);
				idalgo_jsf_display_live_change_chrono_block_live(o_match);
			}
		}
		if(is_live){
			idalgo_vg['LIVE']['REFRESH_TTL']['IS_CHRONO']=1;
			window.setTimeout('idalgo_jsf_timeout_chrono_exec()',60000);
		}
	}
}

/************** Fonctions d'affichage */
function idalgo_jsf_display_live_change_status(ref_match){
	var o_match;
	if(this.idalgo_vg['LIVE']['LIST_MATCH_NEW']) o_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match];
	if(!o_match){
		o_match=this.idalgo_vg['LIVE']['LIST_MATCH_OLD'][ref_match];
		o_match['REF_STATUS']=2;
	}

	idalgo_jsf_display_live_change_status_block_matchlist(o_match);
	idalgo_jsf_display_live_change_status_match_navigation(o_match);
	idalgo_jsf_display_live_change_status_content_result(o_match);
	
	idalgo_jsf_display_widget_foot_change_status(o_match);
	idalgo_jsf_display_live_change_status_result_table(o_match);
	idalgo_jsf_display_live_change_status_block_match(o_match);
	
	idalgo_jsf_display_live_change_status_block_live(o_match);
}
function idalgo_jsf_display_live_change_localscore(ref_match){
	var o_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match];

	idalgo_jsf_display_live_change_score_block_matchlist(o_match);
	/*idalgo_jsf_display_live_change_localscore_live(o_match);*/
	idalgo_jsf_display_live_change_localscore_match_navigation(o_match);
	idalgo_jsf_display_live_change_localscore_content_result(o_match);
	idalgo_jsf_display_live_change_score_result_table(o_match);
	idalgo_jsf_display_live_change_event_content_result(o_match);
	idalgo_jsf_display_live_change_score_block_match(o_match);
	
	idalgo_jsf_display_live_change_localscore_block_live(o_match);
	idalgo_jsf_display_live_change_event_block_live(o_match);
	
	if(!this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']) this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']=new Array();
	if(!this.idalgo_vg['LIVE']['LIST_MATCH_EVENT'][ref_match]) this.idalgo_vg['LIVE']['LIST_MATCH_EVENT'][ref_match]=1;
}
function idalgo_jsf_display_live_change_visitorscore(ref_match){
	var o_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match];

	idalgo_jsf_display_live_change_score_block_matchlist(o_match);
	/*idalgo_jsf_display_live_change_visitorscore_live(o_match); */
	idalgo_jsf_display_live_change_visitorscore_match_navigation(o_match);
	idalgo_jsf_display_live_change_visitorscore_content_result(o_match);
	idalgo_jsf_display_live_change_score_result_table(o_match);
	idalgo_jsf_display_live_change_event_content_result(o_match);
	idalgo_jsf_display_live_change_score_block_match(o_match);
	
	idalgo_jsf_display_live_change_visitorscore_block_live(o_match);
	idalgo_jsf_display_live_change_event_block_live(o_match);
	
	if(!this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']) this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']=new Array();
	if(!this.idalgo_vg['LIVE']['LIST_MATCH_EVENT'][ref_match]) this.idalgo_vg['LIVE']['LIST_MATCH_EVENT'][ref_match]=1;
}
function idalgo_jsf_display_live_change_action(ref_match,ref_action){
	var o_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match];
	var o_action=o_match['LIST_ACTION'][ref_action];

	idalgo_jsf_display_live_change_action_content_result(o_match,o_action);
	idalgo_jsf_display_live_change_action_block_match(o_match);
}
function idalgo_jsf_display_live_change_comment(ref_match,ref_comment){
	var o_match=this.idalgo_vg['LIVE']['LIST_MATCH_NEW'][ref_match];
	var o_comment=o_match['LIST_COMMENT'][ref_comment];

	idalgo_jsf_display_live_change_comment_block_match(o_match,o_comment);	
}

function idalgo_jsf_display_live_event_end(){
	if(this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']){
		if(this.idalgo_vg['LIVE']['LIST_MATCH_EVENT'].length>0){
			for(var ref_match in this.idalgo_vg['LIVE']['LIST_MATCH_EVENT']) {
				var o_match=this.idalgo_vg['LIVE']['LIST_MATCH_OLD'][ref_match];
				if(o_match){
					idalgo_jsf_display_live_change_event_end_content_result(o_match);
					//idalgo_jsf_display_live_change_status_block_live(o_match);
					idalgo_jsf_display_live_change_event_end_block_live(o_match);
				}
			}
		}
	}
}

function idalgo_jsf_display_statusbar(sAlert,sTextOption){
    if( this.idalgo_vg['LIVE']['IS_STATUSBAR'] == 1 ){
    	if(!sTextOption){
    		sTextOption='';
    	}
    	switch(sAlert){
    		case 'normal'			: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']; break;
    		case 'load_init'		: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Chargement en cours...'; break;
    		case 'load_end'			: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Chargement termin\351...'; break;
    		case 'load_live'		: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Mise \340 jour en cours...'; break;
    		case 'error_init'		: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Re-Chargement pr\351vu dans '+sTextOption+' secondes...'; break;
    		case 'load_match_init'	: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Chargement de la rencontre '+sTextOption+'...'; break;
    		case 'live_refresh'		: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+' - Mise \340 jour dans '+sTextOption+' secondes...'; break;
    		case 'next_live'		: window.status=this.idalgo_vg['LIVE']['TXT_STATUSBAR']+" - Prochain live \340 "+sTextOption+'...'; break;
    		default: window.status=''; break;
    	}
    }
}

/**************Divers */
function idalgo_jsf_misc_makematchtime(RefStatus,DateLive,DateSrv){
	var oDateLive=idalgo_jsf_misc_makedate(DateLive);
	var oDateSrv=idalgo_jsf_misc_makedate(DateSrv);

	var sMinuteMatch='';
	var NumMinute='';

	oDateLive=Math.ceil(oDateLive/(60*1000));
	oDateSrv=Math.ceil(oDateSrv/(60*1000));
	switch(parseInt(RefStatus)){
		case 7:
			NumMinute=oDateSrv-oDateLive;
			if(NumMinute>45) sMinuteMatch='45\'+'+(NumMinute-45);
			else sMinuteMatch=NumMinute+'\'';
			break;
		case 8:
			NumMinute=45+oDateSrv-oDateLive;
			if(NumMinute>90) sMinuteMatch='90\'+'+(NumMinute-90);
			else sMinuteMatch=NumMinute+'\'';
			break;
		case 9:
			NumMinute=90+oDateSrv-oDateLive;
			if(NumMinute>105) sMinuteMatch='105\'+'+(NumMinute-105);
			else sMinuteMatch=NumMinute+'\'';
			break;
		case 10:
			NumMinute=105+oDateSrv-oDateLive;
			if(NumMinute>120) sMinuteMatch='120\'+'+(NumMinute-120);
			else sMinuteMatch=NumMinute+'\'';
			break;
		default:
			break;
	}
	return sMinuteMatch;
}
function idalgo_jsf_misc_makedate(sDate){
	var aDateTime=sDate.split(' ');
	var aDate=aDateTime[0].split('-');
	var aTime=aDateTime[1].split(':');
	var dDate = new Date(aDate[0], aDate[1]-1, aDate[2], aTime[0], aTime[1], aTime[2]);
	return dDate;
}

/************** BLOCK_MATCHLIST */
function idalgo_jsf_display_live_change_status_block_matchlist(o_match){
	var txt_module='block_matchlist';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_score='idalgo_live_'+txt_module+'_'+ref_match+'_score';
		var txt_score_link='idalgo_live_'+txt_module+'_'+ref_match+'_score_link';
		var txt_status_area='idalgo_live_'+txt_module+'_'+ref_match+'_status_area';
		var txt_status_background='idalgo_live_'+txt_module+'_'+ref_match+'_status_background';
		var txt_status_content='idalgo_live_'+txt_module+'_'+ref_match+'_status_content';
		var txt_status_time='idalgo_live_'+txt_module+'_'+ref_match+'_status_time';

		var o_score=document.getElementById(txt_score);
		var o_score_link=document.getElementById(txt_score_link);
		/*var o_localscore=document.getElementById(txt_localscore);*/
		/*var o_visitorscore=document.getElementById(txt_visitorscore);*/
		var o_status_area=document.getElementById(txt_status_area);
		var o_status_background=document.getElementById(txt_status_background);
		var o_status_content=document.getElementById(txt_status_content);
		var o_status_time=document.getElementById(txt_status_time);

		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
		switch(o_match['REF_STATUS']){
			case 0:
				/*if(o_localscore) o_localscore.parentNode.removeChild(o_localscore);*/
				/*if(o_visitorscore) o_visitorscore.parentNode.removeChild(o_visitorscore);*/
				if(o_status_area) o_status_area.style.display='none';
				if(o_status_time) o_status_time.style.display='block';
				if(o_score) o_score.className='div_idalgo_block_matchlist_match_score idalgo_picture_preview_small';
				if(o_score_link) o_score_link.innerHTML='';
				break;
			case 4:
			case 5:
			case 6:
				/*if(o_localscore) o_localscore.parentNode.removeChild(o_localscore);*/
				/*if(o_visitorscore) o_visitorscore.parentNode.removeChild(o_visitorscore);*/
				if(o_status_area) o_status_area.style.display='block';
				if(o_status_background) o_status_background.className='div_idalgo_block_matchlist_status_content idalgo_color_bg_status_stop';
				if(o_status_content) o_status_content.innerHTML=o_match['TXT_STATUS_SHORTNAME'];
				if(o_status_time) o_status_time.style.display='none';
				if(o_score) o_score.className='div_idalgo_block_matchlist_match_score idalgo_picture_preview_small';
				if(o_score_link) o_score_link.innerHTML='';
				break;
			default:
				o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
				var is_live=(o_match['REF_STATUS']==1||o_match['REF_STATUS']==2||o_match['REF_STATUS']==3)?false:true;
				var class_score='idalgo_color_bg_status_end';
				if(is_live==true) {
					if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10||o_match['REF_STATUS']==11)
						class_score='idalgo_color_bg_status_playing';
					else
						class_score='idalgo_color_bg_status_stop';
				}

				if(o_status_area) o_status_area.style.display='block';
				if(o_status_background) o_status_background.className='div_idalgo_block_matchlist_status_content '+class_score;
				if(o_status_content) o_status_content.innerHTML=is_live==true?o_match['TXT_STATUS_SHORTNAME']:this.idalgo_vg['LIVE']['TXT_FINISH'];
				if(o_status_time) o_status_time.style.display='none';
				if(o_score){
					if(is_live==true) o_score.className='div_idalgo_block_matchlist_match_score';
					else o_score.className='div_idalgo_block_matchlist_match_score';
				}
				if(o_score_link){
					if(is_live==true){
						o_score_link.href='';
						if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10||o_match['REF_STATUS']==11)
							o_score_link.className='a_idalgo_block_matchlist_match_score idalgo_font_02 idalgo_font_size_14 idalgo_color_status_playing';
						else
							o_score_link.className='a_idalgo_block_matchlist_match_score idalgo_font_02 idalgo_font_size_14 idalgo_color_status_stop';
					}
					else{
						o_score_link.href='';
						o_score_link.className='a_idalgo_block_matchlist_match_score idalgo_font_02 idalgo_font_size_14 idalgo_color_status_end';
					}
					o_score_link.innerHTML=o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
					o_score_link.innerHTML=o_score_link.innerHTML+"<span class='idalgo_color_grey_05'>&nbsp;-&nbsp;</span>";
					o_score_link.innerHTML=o_score_link.innerHTML+(o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE']);
				}
				break;
		}
	}
}
function idalgo_jsf_display_live_change_score_block_matchlist(o_match){
	var txt_module='block_matchlist';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_score_link='idalgo_live_'+txt_module+'_'+ref_match+'_score_link';
		var o_score_link=document.getElementById(txt_score_link);
		if(o_score_link){
			o_score_link.innerHTML=o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
			o_score_link.innerHTML=o_score_link.innerHTML+"<span class='idalgo_color_grey_05'>-</span>";
			o_score_link.innerHTML=o_score_link.innerHTML+(o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE']);
		}
	}
}

/************** MATCH NAVIGATION */
function idalgo_jsf_display_live_change_status_match_navigation(o_match){
	var txt_module='content_match_navigation';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var o_status=document.getElementById(txt_status);
		var o_localscore=document.getElementById(txt_localscore);
		var o_visitorscore=document.getElementById(txt_visitorscore);

		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
		switch(o_match['REF_STATUS']){
			case 0:
				if(o_localscore){
					o_localscore.className='idalgo_color_bg_grey_01 idalgo_color_white idalgo_font_02 idalgo_font_size_28';
					o_localscore.innerHTML='';
				}
				if(o_visitorscore){
					o_visitorscore.className='idalgo_color_bg_grey_01 idalgo_color_white idalgo_font_02 idalgo_font_size_28';
					o_visitorscore.innerHTML='';
				}
				if(o_status){
					o_status.innerHTML='';
					o_status.className='div_content_idalgo_match_navigation_competition_title idalgo_font_01 idalgo_font_size_24';
				}
				break;
			case 1:
			case 2:
			case 3:
				if(o_localscore) o_localscore.className='idalgo_color_bg_status_end idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_visitorscore) o_visitorscore.className='idalgo_color_bg_status_end idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_status){
					o_status.innerHTML=this.idalgo_vg['LIVE']['TXT_FINISH'];
					o_status.className='div_content_idalgo_match_navigation_competition_title idalgo_font_01 idalgo_font_size_24 idalgo_color_status_end';
				}
				break;
			case 4:
			case 5:
			case 6:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
				if(o_localscore) o_localscore.className='idalgo_color_bg_status_stop idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_visitorscore) o_visitorscore.className='idalgo_color_bg_status_stop idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_status){
					o_status.innerHTML=o_match['TXT_STATUS_NAME'];
					o_status.className='div_content_idalgo_match_navigation_competition_title idalgo_font_01 idalgo_font_size_24 idalgo_color_status_stop';
				}
				break;
			default:
				if(o_localscore) o_localscore.className='idalgo_color_bg_status_playing idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_visitorscore) o_visitorscore.className='idalgo_color_bg_status_playing idalgo_color_white idalgo_font_02 idalgo_font_size_28';
				if(o_status){
					o_status.innerHTML=o_match['TXT_STATUS_SHORTNAME'];
					if(o_match['TXT_MINUTE']!='') o_status.innerHTML=o_status.innerHTML+'-'+o_match['TXT_MINUTE'];
					o_status.className='div_content_idalgo_match_navigation_competition_title idalgo_font_01 idalgo_font_size_24 idalgo_color_status_playing';
				}
				break;
		}
	}
}
function idalgo_jsf_display_live_change_localscore_match_navigation(o_match){
	var txt_module='content_match_navigation';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var o_localscore=document.getElementById(txt_localscore);
		if(o_localscore)
			o_localscore.innerHTML=o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
	}
}
function idalgo_jsf_display_live_change_visitorscore_match_navigation(o_match){
	var txt_module='content_match_navigation';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var o_visitorscore=document.getElementById(txt_visitorscore);
		if(o_visitorscore)
			o_visitorscore.innerHTML=o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE'];
	}
}
function idalgo_jsf_display_live_change_chrono_match_navigation(o_match){
	var txt_module='content_match_navigation';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];

	if(o_module){
		var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
		var o_status=document.getElementById(txt_status);

		var txt_minute=idalgo_jsf_misc_makematchtime(o_match['REF_STATUS'],o_match['DATE_LIVE'],o_match['DATE_NOW']);
		var txt_title=o_match['TXT_STATUS_SHORTNAME']+'-'+txt_minute;
		if(o_status) o_status.innerHTML=txt_title;
	}
}

/************** RESULTATS */
function idalgo_jsf_display_live_change_status_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	if(o_module||o_module_live_score){
		var txt_score_preview='idalgo_live_'+txt_module+'_'+ref_match+'_preview';
		var txt_score_stop='idalgo_live_'+txt_module+'_'+ref_match+'_stop';
		var txt_score_score='idalgo_live_'+txt_module+'_'+ref_match+'_score';
		var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
		var txt_status_area='idalgo_live_'+txt_module+'_'+ref_match+'_status_area';
		var txt_status_area_time='idalgo_live_'+txt_module+'_'+ref_match+'_status_area_time';
		var txt_status_background='idalgo_live_'+txt_module+'_'+ref_match+'_status_background';
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var txt_extratimescore='idalgo_live_'+txt_module+'_'+ref_match+'_extratimescore';
		var txt_penaltyscore='idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';

		var o_score_preview=document.getElementById(txt_score_preview);
		var o_score_stop=document.getElementById(txt_score_stop);
		var o_score_score=document.getElementById(txt_score_score);
		var o_status=document.getElementById(txt_status);
		var o_status_area=document.getElementById(txt_status_area);
		var o_status_area_time=document.getElementById(txt_status_area_time);
		var o_status_background=document.getElementById(txt_status_background);
		var o_localscore=document.getElementById(txt_localscore);
		var o_visitorscore=document.getElementById(txt_visitorscore);
		var o_extratimescore=document.getElementById(txt_extratimescore);
		var o_penaltyscore=document.getElementById(txt_penaltyscore);

		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
		switch(o_match['REF_STATUS']){
			case 0:
				if(o_score_preview) o_score_preview.style.display='';
				if(o_score_stop) o_score_stop.style.display='none';
				if(o_score_score) o_score_score.style.display='none';
				if(o_localscore) o_localscore.className='idalgo_color_status_not_played idalgo_font_02 idalgo_font_size_18';
				if(o_visitorscore) o_visitorscore.className='idalgo_color_status_not_played idalgo_font_02 idalgo_font_size_18';
				if(o_status) o_status.innerHTML='';
				if(o_status_area) o_status_area.style.display='none';
				if(o_status_area_time) o_status_area_time.style.display='block';
				if(o_status_background) o_status_background.className='div_idalgo_block_matchlist_status_content idalgo_color_bg_status_not_played';
				if(o_extratimescore) o_extratimescore.style.display='none';
				if(o_penaltyscore) o_penaltyscore.style.display='none';
				break;
			case 4:
			case 5:
			case 6:
				if(o_score_preview) o_score_preview.style.display='none';
				if(o_score_stop) { o_score_stop.style.display=''; o_score_stop.innerHTML=o_match['TXT_STATUS_SHORTNAME']; }
				if(o_score_score) o_score_score.style.display='none';
				if(o_localscore) o_localscore.className='idalgo_color_status_stop idalgo_font_02 idalgo_font_size_18';
				if(o_visitorscore) o_visitorscore.className='idalgo_color_status_stop idalgo_font_02 idalgo_font_size_18';
				if(o_status) o_status.innerHTML='';
				if(o_status_area) o_status_area.style.display='none';
				if(o_status_area_time) o_status_area_time.style.display='block';
				if(o_extratimescore) o_extratimescore.style.display='none';
				if(o_penaltyscore) o_penaltyscore.style.display='none';
				break;
			default:
				if(o_match['REF_STATUS']==1||o_match['REF_STATUS']==2||o_match['REF_STATUS']==3){
					var txt_minute=this.idalgo_vg['LIVE']['TXT_FINISH'];
					var class_color_bg='idalgo_color_bg_status_end';
					var class_color='idalgo_color_status_end';
				}
				if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10){
					var txt_minute=(o_match['TXT_MINUTE']!='')?o_match['TXT_MINUTE']:'-';
					var class_color_bg='idalgo_color_bg_status_playing';
					var class_color='idalgo_color_status_playing';
				}
				if(o_match['REF_STATUS']==11){
					var txt_minute=o_match['TXT_STATUS_SHORTNAME'];
					var class_color_bg='idalgo_color_bg_status_playing';
					var class_color='idalgo_color_status_playing';
				}
				if(o_match['REF_STATUS']==12||o_match['REF_STATUS']==13||o_match['REF_STATUS']==14||o_match['REF_STATUS']==15||o_match['REF_STATUS']==16){
					var txt_minute=o_match['TXT_STATUS_SHORTNAME'];
					var class_color_bg='idalgo_color_bg_status_stop';
					var class_color='idalgo_color_status_stop';
				}
				if(o_score_preview) o_score_preview.style.display='none';
				if(o_score_stop) o_score_stop.style.display='none';
				if(o_score_score) o_score_score.style.display='';
				if(o_status) o_status.innerHTML=txt_minute;
				if(o_localscore) o_localscore.className='span_idalgo_content_result_date_match_score_local '+class_color+' idalgo_font_02 idalgo_font_size_18';
				if(o_visitorscore) o_visitorscore.className='span_idalgo_content_result_date_match_score_visitor '+class_color+' idalgo_font_02 idalgo_font_size_18';
				if(o_status_area) o_status_area.style.display='block';
				if(o_status_area_time) o_status_area_time.style.display='none';
				if(o_status_background) o_status_background.className=class_color_bg+' div_idalgo_block_matchlist_status_content';
				if(o_extratimescore) {
					if(o_match['IS_EXTRATIME']==1&&o_match['IS_PENALTY']==0) {
						o_extratimescore.className=class_color+' span_idalgo_content_result_date_match_score_extra idalgo_font_01 idalgo_font_size_12';
						o_extratimescore.style.display='';
					}
					else
						o_extratimescore.style.display='none';
				}
				if(o_penaltyscore) {
					if(o_match['IS_PENALTY']==1) {
						o_penaltyscore.className=class_color+' span_idalgo_content_result_date_match_score_extra idalgo_font_01 idalgo_font_size_12';
						o_penaltyscore.style.display='';
					}
					else
						o_penaltyscore.style.display='none';
				}
				break;
		}
	}
}
function idalgo_jsf_display_live_change_localscore_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	if(o_module||o_module_live_score){
		var num_score=o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
		var num_penalty=o_match['NUM_LOCALSCORE_PENALTY']+' '+o_match['TXT_STATUS_SHORTNAME']+' '+o_match['NUM_VISITORSCORE_PENALTY'];
		
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var txt_localalert='idalgo_live_'+txt_module+'_'+ref_match+'_local_alert';
		var txt_penalty = 'idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';
		
		var o_localscore=document.getElementById(txt_localscore);
		var o_localalert=document.getElementById(txt_localalert);
		var o_penalty	=document.getElementById(txt_penalty);
		if(o_localscore) o_localscore.innerHTML=num_score;
		if( o_match['IS_PENALTY']==1 && o_penalty) o_penalty.innerHTML = num_penalty;
		if(num_score>0)
			if(o_localalert) 
				o_localalert.innerHTML=this.idalgo_vg['LIVE']['LIST_LANGUAGE']['TXT_ACTION'][1];
	}
}
function idalgo_jsf_display_live_change_visitorscore_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	if(o_module||o_module_live_score){
		var num_score=o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE'];
		var num_penalty=o_match['NUM_LOCALSCORE_PENALTY']+' '+o_match['TXT_STATUS_SHORTNAME']+' '+o_match['NUM_VISITORSCORE_PENALTY'];
		
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var txt_visitoralert='idalgo_live_'+txt_module+'_'+ref_match+'_visitor_alert';
		var txt_penalty = 'idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';

		var o_visitorscore=document.getElementById(txt_visitorscore);
		var o_visitoralert=document.getElementById(txt_visitoralert);
		var o_penalty	=document.getElementById(txt_penalty);
		
		if(o_visitorscore) o_visitorscore.innerHTML=num_score;
		if( o_match['IS_PENALTY']==1 && o_penalty) o_penalty.innerHTML = num_penalty;
		if(num_score>0)
			if(o_visitoralert) 
				o_visitoralert.innerHTML=this.idalgo_vg['LIVE']['LIST_LANGUAGE']['TXT_ACTION'][1];
	}
}
function idalgo_jsf_display_live_change_chrono_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	if(o_module||o_module_live_score){
		var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
		var o_status=document.getElementById(txt_status);

		if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10){
			var txt_minute=idalgo_jsf_misc_makematchtime(o_match['REF_STATUS'],o_match['DATE_LIVE'],o_match['DATE_NOW']);
			var txt_title=txt_minute;
			if(o_status) o_status.innerHTML=txt_title;
		}
	}
}
function idalgo_jsf_display_live_change_event_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	var class_local='idalgo_font_size_11';
	var class_visitor='idalgo_font_size_11';
	if(parseInt(o_match['NUM_LOCALSCORE'])>parseInt(o_match['NUM_VISITORSCORE'])) class_local='idalgo_font_size_14';
	if(parseInt(o_match['NUM_LOCALSCORE'])<parseInt(o_match['NUM_VISITORSCORE'])) class_visitor='idalgo_font_size_14';

	if(o_module||o_module_live_score){
		var txt_matchline='idalgo_live_'+txt_module+'_'+ref_match+'_match';
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var txt_scoreseparate='idalgo_live_'+txt_module+'_'+ref_match+'_scoreseparate';
		var txt_local='idalgo_live_'+txt_module+'_'+ref_match+'_local';
		var txt_visitor='idalgo_live_'+txt_module+'_'+ref_match+'_visitor';

		var o_matchline=document.getElementById(txt_matchline);
		var o_localscore=document.getElementById(txt_localscore);
		var o_visitorscore=document.getElementById(txt_visitorscore);
		var o_scoreseparate=document.getElementById(txt_scoreseparate);
		var o_local=document.getElementById(txt_local);
		var o_visitor=document.getElementById(txt_visitor);

		if(o_matchline) o_matchline.className='div_idalgo_content_result_date_match idalgo_color_bg_02';
		if(o_localscore) o_localscore.className='span_idalgo_content_result_date_match_score_local idalgo_color_white idalgo_font_02 idalgo_font_size_18';
		if(o_visitorscore) o_visitorscore.className='span_idalgo_content_result_date_match_score_visitor idalgo_color_white idalgo_font_02 idalgo_font_size_18';
		if(o_scoreseparate) o_scoreseparate.className='span_idalgo_content_result_date_match_score_separate idalgo_color_white idalgo_font_02 idalgo_font_size_18';
		if(o_local) o_local.className='a_idalgo_content_result_date_match_team_local idalgo_color_white idalgo_font_01 '+class_local;
		if(o_visitor) o_visitor.className='a_idalgo_content_result_date_match_team_visitor idalgo_color_white idalgo_font_01 '+class_visitor;
	}
}
function idalgo_jsf_display_live_change_event_end_content_result(o_match){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];

	var class_local='idalgo_font_size_11';
	var class_visitor='idalgo_font_size_11';
	if(o_match['NUM_LOCALSCORE']>o_match['NUM_VISITORSCORE']) class_local='idalgo_font_size_14';
	if(o_match['NUM_LOCALSCORE'] < o_match['NUM_VISITORSCORE']) class_visitor='idalgo_font_size_14';

	var class_status='idalgo_color_status_playing';
	if(o_match['REF_STATUS']==1||o_match['REF_STATUS']==2||o_match['REF_STATUS']==3) class_status='idalgo_color_status_end';
	if(o_match['REF_STATUS']==12||o_match['REF_STATUS']==13||o_match['REF_STATUS']==14||o_match['REF_STATUS']==15||o_match['REF_STATUS']==16) class_status='idalgo_color_status_stop';

	if(o_module||o_module_live_score){
		var txt_matchline='idalgo_live_'+txt_module+'_'+ref_match+'_match';
		var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
		var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
		var txt_scoreseparate='idalgo_live_'+txt_module+'_'+ref_match+'_scoreseparate';
		var txt_local='idalgo_live_'+txt_module+'_'+ref_match+'_local';
		var txt_visitor='idalgo_live_'+txt_module+'_'+ref_match+'_visitor';
		var txt_localalert='idalgo_live_'+txt_module+'_'+ref_match+'_local_alert';
		var txt_visitoralert='idalgo_live_'+txt_module+'_'+ref_match+'_visitor_alert';

		var o_matchline=document.getElementById(txt_matchline);
		var o_localscore=document.getElementById(txt_localscore);
		var o_visitorscore=document.getElementById(txt_visitorscore);
		var o_scoreseparate=document.getElementById(txt_scoreseparate);
		var o_local=document.getElementById(txt_local);
		var o_visitor=document.getElementById(txt_visitor);
		var o_localalert=document.getElementById(txt_localalert);
		var o_visitoralert=document.getElementById(txt_visitoralert);

		if(o_matchline) o_matchline.className='div_idalgo_content_result_date_match';
		if(o_localscore) o_localscore.className='span_idalgo_content_result_date_match_score_local '+class_status+' idalgo_font_02 idalgo_font_size_18';
		if(o_visitorscore) o_visitorscore.className='span_idalgo_content_result_date_match_score_visitor '+class_status+' idalgo_font_02 idalgo_font_size_18';
		if(o_scoreseparate) o_scoreseparate.className='span_idalgo_content_result_date_match_score_separate idalgo_color_grey_05 idalgo_font_02 idalgo_font_size_18';
		if(o_local) o_local.className='a_idalgo_content_result_date_match_team_local idalgo_color_grey_05 idalgo_font_01 '+class_local;
		if(o_visitor) o_visitor.className='a_idalgo_content_result_date_match_team_visitor idalgo_color_grey_05 idalgo_font_01 '+class_visitor;
		if(o_localalert) o_localalert.innerHTML='';
		if(o_visitoralert) o_visitoralert.innerHTML='';
	}
}
function idalgo_jsf_display_live_change_action_content_result(o_match,o_action){
	var txt_module='content_result';
	var txt_module_live_score='content_live';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var o_module_live_score=document.getElementById('idalgo_'+txt_module_live_score);
	var ref_match=o_match['REF_MATCH'];
	if (o_action['REF_ACTIONTYPE'] == 3 || o_action['REF_ACTIONTYPE'] == 2) { // rouge ou double jaune
		if (o_module || o_module_live_score) {
			var txt_team = '_visitor';
			var class_team = 'div_idalgo_content_result_date_match_red_visitor';
			if (o_match['REF_LOCALTEAM'] == o_action['REF_TEAM']) {
				txt_team = '_local';
				class_team = 'div_idalgo_content_result_date_match_red_local';
			}
			
			var txt_team = 'idalgo_live_' + txt_module + '_' + ref_match + txt_team;
			
			var o_team = document.getElementById(txt_team);
			
			if (o_team) {
				var oDiv = document.createElement('div');
				oDiv.className = class_team + " idalgo_picture_action_red3";
				o_team.parentNode.appendChild(oDiv);
			}
		}
	}
}
/**************	Widget Foot */
function idalgo_jsf_display_reset_live(){
	var championship=new Array(32,5,3,1,2,4);
	var europa=new Array(20,18);
	for (var ref_comp in championship) {
		var class_off='div_idalgo_competition_li idalgo_size_competition idalgo_picture_off';
		var div_comp = document.getElementById('div_idalgo_competition_'+championship[ref_comp]);
		if( div_comp ){
			div_comp.setAttribute("live","");
			if (div_comp.getAttribute("active") == "off") {
				div_comp.className = class_off;
			}
		}
	}
	for (var ref_comp in europa) {
		var class_off='div_idalgo_competition_li idalgo_size_competition idalgo_picture_off';
		var div_comp = document.getElementById('div_idalgo_competition_'+europa[ref_comp]);
		if( div_comp ){
			div_comp.setAttribute("live","");
			if (div_comp.getAttribute("active") == "off") {
				div_comp.className = class_off;
			}
		}	
	}
}
function idalgo_jsf_display_widget_foot_change_status(o_match){
	var ref_match = parseInt(o_match["REF_MATCH"]);
	var module = document.getElementById("div_idalgo_widget_foot_result_line_"+ref_match);
	if (module) {
		var ref_competition = module.getAttribute("ref_competition");
		var status = parseInt(o_match['REF_STATUS']);
		if (!this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH']) {
			this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'] = new Array();
		}
		if (!this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition]) {
			this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition] = new Array();
		}
		if (status > 6) {
			var ind = jsf_contains(this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition],ref_match );
			if (ind == -1) {				
				this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition].push( ref_match );
				
				if (this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition].length == 1) {
					idalgo_jsf_display_widget_foot_start_live(ref_competition);
				}							
			}
		}else{
			var ind = jsf_contains(this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition],ref_match );
			if (ind >= 0) {
				this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition].splice(ind,1);
	
				if (this.idalgo_vg['LIVE']['WIDGET_LIST_MATCH'][ref_competition].length == 0) {
					idalgo_jsf_display_widget_foot_stop_live(ref_competition);
				}
			}
		}
	}
}

function idalgo_jsf_display_widget_foot_start_live(ref_competition){
	var div_competition = document.getElementById("div_idalgo_competition_"+ref_competition);
	if (div_competition) {
		var class_off_live = 'div_idalgo_competition_li idalgo_size_competition idalgo_picture_off_live';
		div_competition.setAttribute("live", "live");
		if (div_competition.getAttribute("active") == "off") {
			div_competition.className = class_off_live;
		}
	}
}
function idalgo_jsf_display_widget_foot_stop_live(ref_competition){
	var div_competition = document.getElementById("div_idalgo_competition_"+ref_competition);
	if (div_competition) {
		var class_off = 'div_idalgo_competition_li idalgo_size_competition idalgo_picture_off';
		div_competition.setAttribute("live", "");
		if (div_competition.getAttribute("active") == "off") {
			div_competition.className = class_off;
		}
	}
}
function jsf_contains(obj,val){
	var i = obj.length;
	while (i--) {
		if (obj[i] == val) {
			return i;
		}
	}
	return -1;
}

/**************	RESULT_TAB	*/
function idalgo_jsf_display_live_change_status_result_table(o_match){
	var ref_match = parseInt(o_match["REF_MATCH"]);
	var module = document.getElementById("idalgo_header_result_table");
	if (module) {
		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
		switch (o_match['REF_STATUS']) {
			case 0:
				var color = "idalgo_color_status_not_played";
				break;
			case 1:case 2:case 3:
				var color = "idalgo_color_status_end";
				break;
			case 4:case 5:case 6: case 12:case 13:case 14:case 15:case 16:
				var color = "idalgo_color_status_stop";
				break;
			case 7:case 8: case 9: case 10: case 11:
				var color = "idalgo_color_status_playing";
				break;		
			default:
				var color = "idalgo_color_status_not_played";
				break;
		}
		
		var local_span = document.getElementById('span_local_'+ref_match);
		var local_span_penalty = document.getElementById('span_local_penalty_'+ref_match);
		var visitor_span = document.getElementById('span_visitor_'+ref_match);
		var visitor_span_penalty = document.getElementById('span_visitor_penalty_'+ref_match);
		if( local_span ){
			local_span.className=local_span.getAttribute('class_list')+' '+ color;
		}
		if( local_span_penalty ){
			local_span_penalty.className=local_span_penalty.getAttribute('class_list')+' '+ color;
			if( (o_match['IS_PENALTY'] == 1) || (o_match['REF_STATUS']==11))	local_span_penalty.style.display='block';
		}
		if( visitor_span){
			visitor_span.className=visitor_span.getAttribute('class_list')+' '+ color;
		}
		if( visitor_span_penalty ){
			visitor_span_penalty.className=visitor_span_penalty.getAttribute('class_list')+' '+ color;
			if( (o_match['IS_PENALTY'] == 1) || (o_match['REF_STATUS']==11))	visitor_span_penalty.style.display='block';
		}
	}
}
function idalgo_jsf_display_live_change_score_result_table(o_match){
		var ref_match = parseInt(o_match["REF_MATCH"]);
	var module = document.getElementById("idalgo_header_result_table");
	if (module) {
		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);		
		if( o_match['IS_PENALTY'] == 0){
			var local_score = o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
			var visitor_score = o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE'];
			var local_span = document.getElementById('span_local_'+ref_match);
			var visitor_span = document.getElementById('span_visitor_'+ref_match);
			if( local_span ){
				local_span.innerHTML=local_score;
			}
			if( visitor_span){
				visitor_span.innerHTML=visitor_score;
			}
		}else{
			var local_score = o_match['NUM_LOCALSCORE_PENALTY'];
			var visitor_score =o_match['NUM_VISITORSCORE_PENALTY'];
			var local_span = document.getElementById('span_local_penalty_'+ref_match);
			var visitor_span = document.getElementById('span_visitor_penalty_'+ref_match);
			if( local_span ){
				local_span.innerHTML=local_score;
			}
			if( visitor_span){
				visitor_span.innerHTML=visitor_score;
			}
		}
	}
}

/************** BLOCK_MATCHLIST */
function idalgo_jsf_display_live_change_status_block_match(o_match){
	var txt_module='block_match';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];
	if( o_module ){
		o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
		var txt_status = "span_idalgo_block_match_content_info_time_"+ref_match;
		var div_penalty 		= "div_idalgo_block_match_line_score_penalty_"+ref_match;
		if( o_match['REF_STATUS'] != 0 ){
			var o_status = document.getElementById(txt_status);
			if( o_status ){
				var language = o_status.getAttribute('txt_language');
				if (language) {
					if (o_match["REF_STATUS"] == 1 || o_match["REF_STATUS"] == 2 || o_match["REF_STATUS"] == 3) 
						o_status.innerHTML = this.idalgo_vg['LIVE']['TXT_FINISH'+language];
					else 
						o_status.innerHTML = o_match['TXT_STATUS_SHORTNAME'+language];
				}
			}
			if ((o_match['IS_PENALTY'] == 1) || (o_match['REF_STATUS']==11)) {
				var o_div_penalty = document.getElementById(div_penalty);
				if (o_div_penalty) {
					o_div_penalty.style.display = 'block';
				}
			}
		}
	}
}
function idalgo_jsf_display_live_change_score_block_match(o_match){
	var txt_module='block_match';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];
	if( o_module ){
		var txt_score 			= "span_idalgo_block_match_content_info_score_"+ref_match;
		var txt_score_penalty	= "span_idalgo_block_match_content_info_score_penalty_"+ref_match;
		var o_score = document.getElementById(txt_score);
		if( o_score ){
			var local_score = o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
			var visitor_score = o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE'];
			o_score.innerHTML = local_score+' - '+visitor_score;
		}
		if( o_match['IS_PENALTY'] == 1){
			var o_score_penalty = document.getElementById(txt_score_penalty);
			if( o_score_penalty ){
				var local_score = o_match['NUM_LOCALSCORE_PENALTY'];
				var visitor_score =o_match['NUM_VISITORSCORE_PENALTY'];		
				o_score_penalty.innerHTML = local_score+' - '+visitor_score;		
			}
		}
	}
}
function idalgo_jsf_display_live_change_action_block_match(o_match){
	var txt_module='block_match';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];
	if (o_module) {
		var txt_div = "div_idalgo_block_match_content_info_action_"+ref_match;
		var o_div = document.getElementById( txt_div );
		if (o_div) {
			var language = o_div.getAttribute('txt_language');
			if (language) {
				o_div.innerHTML = "";
				var localteam = o_match['REF_LOCALTEAM'];
				var i_local = 0;
				var i_visitor = 0;
				var local = new Array();
				var visitor = new Array();
				for (var action in o_match['LIST_ACTION']) {
					if( o_match['LIST_ACTION'].hasOwnProperty(action) ){
						if (o_match['LIST_ACTION'][action]['REF_TEAM'] == localteam) {
							local[i_local] = o_match['LIST_ACTION'][action];
							i_local++;
						}
						else {
							visitor[i_visitor] = o_match['LIST_ACTION'][action];
							i_visitor++;
						}
					}
				}
				// Transcription du php
				var max = (i_local > i_visitor ? i_local : i_visitor);
				for (var i = 0; i < max; i++) {
					var div = document.createElement('div');
					div.className = "div_idalgo_block_match_line";
					var local_action = local[i];
					var visitor_action = visitor[i];
					if (local_action) {
						if (local_action['IS_OWNGOAL'] == 1) {
							var txt = local_action['TXT_OWNGOAL' + language] + ' ' + local_action['TXT_NICKNAME'];
						}
						else {
							var txt = local_action['TXT_NICKNAME'];
						}
						if (local_action['REF_ACTIONTYPE'] == 6) {
							if (local_action['REF_ACTIONDETAIL'] == 8) {
								var logo = "idalgo_picture_action_penalty_in";
							}
							else {
								var logo = "idalgo_picture_action_penalty_out";
							}
						}
						else {
							var logo = (local_action['REF_ACTIONTYPE'] == 1 ? "idalgo_picture_action_goal" : (local_action['REF_ACTIONTYPE'] == 2 ? "idalgo_picture_action_yellow_red" : "idalgo_picture_action_red"));
						}
						var node_local = document.createElement('div');
						node_local.className = "div_idalgo_block_match_content_info_action_local";
						var node_link = document.createElement('a');
						node_link.innerHTML = txt;
						node_link.className = "a_idalgo_block_match_content_info_action_local_player idalgo_font_01 idalgo_font_size_11 idalgo_color_grey_05";
						node_link.href = local_action['TXT_LINK'];
						var node_minute = document.createElement('span');
						node_minute.innerHTML = (local_action['NUM_MINUTE'] ? local_action['NUM_MINUTE'] + '\'' : "");
						node_minute.className = "span_idalgo_block_match_content_info_action_local_minute idalgo_font_01 idalgo_font_size_11 idalgo_color_grey_04";
						var node_logo = document.createElement('div');
						node_logo.className = "div_idalgo_block_match_content_info_action_local_logo " + logo;
						node_local.appendChild(node_link);
						node_local.appendChild(node_minute);
						node_local.appendChild(node_logo);
						div.appendChild(node_local);
					}
					if (visitor_action) {
						if (visitor_action['IS_OWNGOAL'] == 1) {
							var txt = visitor_action['TXT_NICKNAME'] + ' ' + visitor_action['TXT_OWNGOAL'+language];
						}
						else {
							var txt = visitor_action['TXT_NICKNAME'];
						}
						if (visitor_action['REF_ACTIONTYPE'] == 6) {
							if (visitor_action['REF_ACTIONDETAIL'] == 8) {
								var logo = "idalgo_picture_action_penalty_in";
							}
							else {
								var logo = "idalgo_picture_action_penalty_out";
							}
						}
						else {
							var logo = (visitor_action['REF_ACTIONTYPE'] == 1 ? "idalgo_picture_action_goal" : (visitor_action['REF_ACTIONTYPE'] == 2 ? "idalgo_picture_action_yellow_red" : "idalgo_picture_action_red"));
						}
						var node_visitor = document.createElement('div');
						node_visitor.className = "div_idalgo_block_match_content_info_action_visitor";
						var node_link = document.createElement('a');
						node_link.innerHTML = txt;
						node_link.className = "a_idalgo_block_match_content_info_action_visitor_player idalgo_font_01 idalgo_font_size_11 idalgo_color_grey_05";
						node_link.href = visitor_action['TXT_LINK'];
						var node_minute = document.createElement('span');
						node_minute.innerHTML = (visitor_action['NUM_MINUTE'] ? visitor_action['NUM_MINUTE'] + '\'' : "");
						node_minute.className = "span_idalgo_block_match_content_info_action_visitor_minute idalgo_font_01 idalgo_font_size_11 idalgo_color_grey_04";
						var node_logo = document.createElement('div');
						node_logo.className = "div_idalgo_block_match_content_info_action_visitor_logo " + logo;
						node_visitor.appendChild(node_link);
						node_visitor.appendChild(node_minute);
						node_visitor.appendChild(node_logo);
						div.appendChild(node_visitor);
					}
					
					o_div.appendChild(div);
				}
			}
		}
	}
}
function idalgo_jsf_display_live_change_comment_block_match(o_match,o_comment){
	var txt_module='block_match';
	var o_module=document.getElementById('idalgo_'+txt_module);
	var ref_match=o_match['REF_MATCH'];
	if (o_module) {
		var txt_div = "div_idalgo_block_match_comment_"+ref_match;
		var txt_a 	= "a_idalgo_block_match_comment_"+ref_match;
		var o_div = document.getElementById(txt_div);
		var o_a = document.getElementById(txt_a);
		if( o_div ){
			var language = o_div.getAttribute('txt_language');
			if (language) {
				if (o_comment['NUM_COMMENT_LENGTH' + language] > 0) {
					o_div.style.display = 'block';
					if (o_a) {
						o_a.innerHTML = o_comment['TXT_MINUTE'] + '. ' + o_comment['TXT_COMMENT'][0]["#CDATA-SECTION"][0]["value"];
					}
				}
			}
		}
	}
}

/************** BLOCK_LIVE */
function idalgo_jsf_display_util_get_tab(ref_status){
    if(ref_status > 6) return 0;
    if(ref_status == 1 || ref_status == 2 || ref_status == 3 ) return 1;
    return 2;
}
function idalgo_jsf_display_util_get_mini_menu(obj_tab, ref_competition){
    var menu = obj_tab.getElementsByTagName('ul')[0].getElementsByTagName('a');
    for(var i=0;i<menu.length;i++){
        var a = menu[i];
        if(a.getAttribute('ref_competition') == ref_competition)
            return a;
    }
    return null;
}

function idalgo_jsf_display_live_change_match(from_tab,to_tab, li_match){
    // Maj FROM*
    var from_ul_group = li_match.parentNode; 
    var from_li_competition = from_ul_group.parentNode.parentNode.parentNode;
    var from_page = document.getElementById('ul_idalgo_block_live_content_'+from_tab);
    var from_menu = from_page.parentNode.parentNode.parentNode.previousSibling.getElementsByTagName('ul')[0].getElementsByTagName('li')[from_tab];
    var to_page = document.getElementById('ul_idalgo_block_live_content_'+to_tab);
    var to_menu = to_page.parentNode.parentNode.parentNode.previousSibling.getElementsByTagName('ul')[0].getElementsByTagName('li')[to_tab];
    var ref_competition = from_li_competition.getAttribute('ref_competition');
    var ref_group = parseInt(from_ul_group.parentNode.getAttribute('ref_group') );
    
    from_ul_group.setAttribute('num_match', parseInt(from_ul_group.getAttribute('num_match')) -1 );
    from_li_competition.setAttribute('num_match', from_ul_group.getAttribute('num_match'));
    from_page.setAttribute('num_match', parseInt(from_page.getAttribute('num_match')) -1 );
    if( parseInt(from_ul_group.getAttribute('num_match')) == 0){
        from_ul_group.parentNode.style.display = 'none';
        if( parseInt(from_li_competition.getAttribute('num_match')) == 0){
            from_li_competition.style.display = 'none';
            var a_menu = idalgo_jsf_display_util_get_mini_menu(from_li_competition.parentNode.parentNode, ref_competition);
            a_menu.parentNode.style.display = 'none';
            if( a_menu.getAttribute('is_selected') == 1 ){
                jsf_idalgo_show_competition(a_menu.parentNode.parentNode.getElementsByTagName('ul')[0].getElementsByTagName('a')[0],false);
            }
        }
        if( parseInt(from_page.getAttribute('num_match')) ==0 ){
            /* Passer à un nouvel onglet :
             * Cacher le parentNode, trouver un nouvel onglet*/
            from_menu.style.display='none';
            if(from_menu.getAttribute('is_selected') == 1 ){
                jsf_idalgo_show_tab(to_menu.getElementsByTagName('a')[0], to_tab, false);
            }
        }
    }
    li_match.parentNode.removeChild(li_match);
    // Maj TO*
    to_page.setAttribute('num_match', parseInt(to_page.getAttribute('num_match')) +1 );
    var div_competition = document.getElementById('idalgo_block_competition_'+to_tab+'_'+ref_competition);
    var li_competition = div_competition.parentNode;
    li_competition.setAttribute('num_match', parseInt(li_competition.getAttribute('num_match')) +1 );
    li_competition.style.display = '';
    if( div_competition.getAttribute('is_multigroup') == 1){
        // TODO
        var child = div_competition.childNodes;
        for(var i = 0;i<child.length;i++){
            if( parseInt(child[i].getAttribute('ref_group')) == ref_group){
                var ul_group = child[i].getElementsByTagName('ul')[0];
                continue;
            }
        }
    }else{
        var ul_group = div_competition.getElementsByTagName('ul')[0];
    }
    to_menu.style.display='';
    var a_menu = idalgo_jsf_display_util_get_mini_menu(to_page.parentNode, ref_competition);
    a_menu.parentNode.style.display = '';
    a_menu.setAttribute('num_match', parseInt(a_menu.getAttribute('num_match')) +1 );
    
    ul_group.setAttribute('num_match', parseInt(ul_group.getAttribute('num_match')) +1 );
    ul_group.parentNode.style.display='';
    ul_group.appendChild(li_match);
    li_match.setAttribute('ref_tab',to_tab);
        
}
function idalgo_jsf_display_live_change_status_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    if(o_module){
        var txt_score_preview='idalgo_live_'+txt_module+'_'+ref_match+'_preview';
        var txt_score_stop='idalgo_live_'+txt_module+'_'+ref_match+'_stop';
        var txt_score_score='idalgo_live_'+txt_module+'_'+ref_match+'_score';
        var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
        var txt_status_area='idalgo_live_'+txt_module+'_'+ref_match+'_status_area';
        var txt_status_area_time='idalgo_live_'+txt_module+'_'+ref_match+'_status_area_time';
        var txt_status_background='idalgo_live_'+txt_module+'_'+ref_match+'_status_background';
        var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
        var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
        var txt_extratimescore='idalgo_live_'+txt_module+'_'+ref_match+'_extratimescore';
        var txt_penaltyscore='idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';
        var txt_li_match='li_idalgo_'+txt_module+'_match_'+ref_match;

        var o_score_preview=document.getElementById(txt_score_preview);
        var o_score_stop=document.getElementById(txt_score_stop);
        var o_score_score=document.getElementById(txt_score_score);
        var o_status=document.getElementById(txt_status);
        var o_status_area=document.getElementById(txt_status_area);
        var o_status_area_time=document.getElementById(txt_status_area_time);
        var o_status_background=document.getElementById(txt_status_background);
        var o_localscore=document.getElementById(txt_localscore);
        var o_visitorscore=document.getElementById(txt_visitorscore);
        var o_extratimescore=document.getElementById(txt_extratimescore);
        var o_penaltyscore=document.getElementById(txt_penaltyscore);
        var o_li_match=document.getElementById(txt_li_match);
        
        o_match['REF_STATUS']=parseInt(o_match['REF_STATUS']);
        switch(o_match['REF_STATUS']){
            case 0:
                if(o_score_preview) o_score_preview.style.display='';
                if(o_score_stop) o_score_stop.style.display='none';
                if(o_score_score) o_score_score.style.display='none';
                if(o_localscore) o_localscore.className='idalgo_color_status_not_played idalgo_font_02 idalgo_font_size_18';
                if(o_visitorscore) o_visitorscore.className='idalgo_color_status_not_played idalgo_font_02 idalgo_font_size_18';
                if(o_status) o_status.innerHTML='';
                if(o_status_area) o_status_area.style.display='none';
                if(o_status_area_time) o_status_area_time.style.display='block';
                if(o_status_background) o_status_background.className='div_idalgo_block_live_status_content idalgo_color_bg_status_not_played';
                if(o_extratimescore) o_extratimescore.style.display='none';
                if(o_penaltyscore) o_penaltyscore.style.display='none';
                break;
            case 4:
            case 5:
            case 6:
                if(o_score_preview) o_score_preview.style.display='none';
                if(o_score_stop) { o_score_stop.style.display=''; o_score_stop.innerHTML=o_match['TXT_STATUS_SHORTNAME']; }
                if(o_score_score) o_score_score.style.display='none';
                if(o_localscore) o_localscore.className='idalgo_color_status_stop idalgo_font_02 idalgo_font_size_18';
                if(o_visitorscore) o_visitorscore.className='idalgo_color_status_stop idalgo_font_02 idalgo_font_size_18';
                if(o_status) o_status.innerHTML='';
                if(o_status_area) o_status_area.style.display='none';
                if(o_status_area_time) o_status_area_time.style.display='block';
                if(o_extratimescore) o_extratimescore.style.display='none';
                if(o_penaltyscore) o_penaltyscore.style.display='none';
                break;
            default:
                if(o_match['REF_STATUS']==1||o_match['REF_STATUS']==2||o_match['REF_STATUS']==3){
                    var txt_minute=this.idalgo_vg['LIVE']['TXT_FINISH'];
                    var class_color_bg='idalgo_color_bg_status_end';
                    var class_color='idalgo_color_status_end';
                }
                if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10){
                    var txt_minute=(o_match['TXT_MINUTE']!='')?o_match['TXT_MINUTE']:'-';
                    var class_color_bg='idalgo_color_bg_status_playing';
                    var class_color='idalgo_color_status_playing';
                }
                if(o_match['REF_STATUS']==11){
                    var txt_minute=o_match['TXT_STATUS_SHORTNAME'];
                    var class_color_bg='idalgo_color_bg_status_playing';
                    var class_color='idalgo_color_status_playing';
                }
                if(o_match['REF_STATUS']==12||o_match['REF_STATUS']==13||o_match['REF_STATUS']==14||o_match['REF_STATUS']==15||o_match['REF_STATUS']==16){
                    var txt_minute=o_match['TXT_STATUS_SHORTNAME'];
                    var class_color_bg='idalgo_color_bg_status_stop';
                    var class_color='idalgo_color_status_stop';
                }
                if(o_score_preview) o_score_preview.style.display='none';
                if(o_score_stop) o_score_stop.style.display='none';
                if(o_score_score) o_score_score.style.display='';
                if(o_status) o_status.innerHTML=txt_minute;
                if(o_localscore) o_localscore.className='span_idalgo_block_live_date_match_score_local '+class_color+' idalgo_font_02 idalgo_font_size_18';
                if(o_visitorscore) o_visitorscore.className='span_idalgo_block_live_date_match_score_visitor '+class_color+' idalgo_font_02 idalgo_font_size_18';
                if(o_status_area) o_status_area.style.display='block';
                if(o_status_area_time) o_status_area_time.style.display='none';
                if(o_status_background) o_status_background.className=class_color_bg+' div_idalgo_block_live_status_content';
                if(o_extratimescore) {
                    if(o_match['IS_EXTRATIME']==1&&o_match['IS_PENALTY']==0) {
                        o_extratimescore.className=class_color+' span_idalgo_block_live_date_match_score_extra idalgo_font_01 idalgo_font_size_12';
                        o_extratimescore.style.display='';
                    }
                    else
                        o_extratimescore.style.display='none';
                }
                if(o_penaltyscore) {
                    if(o_match['IS_PENALTY']==1) {
                        o_penaltyscore.className=class_color+' span_idalgo_block_live_date_match_score_extra idalgo_font_01 idalgo_font_size_12';
                        o_penaltyscore.style.display='';
                    }
                    else
                        o_penaltyscore.style.display='none';
                }
                break;
        }
        var from_tab = o_li_match.getAttribute('ref_tab');
        var to_tab = idalgo_jsf_display_util_get_tab(o_match['REF_STATUS']);
        if( to_tab != from_tab ){
            idalgo_jsf_display_live_change_match(from_tab, to_tab, o_li_match)
        }
    }
}
function idalgo_jsf_display_live_change_localscore_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    if(o_module){
        var num_score=o_match['IS_EXTRATIME']==1?o_match['NUM_LOCALSCORE_EXTRATIME']:o_match['NUM_LOCALSCORE'];
        var num_penalty=o_match['NUM_LOCALSCORE_PENALTY']+' '+o_match['TXT_STATUS_SHORTNAME']+' '+o_match['NUM_VISITORSCORE_PENALTY'];
        
        var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
        var txt_penalty = 'idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';
        
        var o_localscore=document.getElementById(txt_localscore);
        var o_penalty   =document.getElementById(txt_penalty);
        if(o_localscore) o_localscore.innerHTML=num_score;
        if( o_match['IS_PENALTY']==1 && o_penalty) o_penalty.innerHTML = num_penalty;
    }
}
function idalgo_jsf_display_live_change_visitorscore_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    if(o_module){
        var num_score=o_match['IS_EXTRATIME']==1?o_match['NUM_VISITORSCORE_EXTRATIME']:o_match['NUM_VISITORSCORE'];
        var num_penalty=o_match['NUM_LOCALSCORE_PENALTY']+' '+o_match['TXT_STATUS_SHORTNAME']+' '+o_match['NUM_VISITORSCORE_PENALTY'];
        
        var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
        var txt_penalty = 'idalgo_live_'+txt_module+'_'+ref_match+'_penaltyscore';

        var o_visitorscore=document.getElementById(txt_visitorscore);
        var o_penalty   =document.getElementById(txt_penalty);
        
        if(o_visitorscore) o_visitorscore.innerHTML=num_score;
        if( o_match['IS_PENALTY']==1 && o_penalty) o_penalty.innerHTML = num_penalty;
    }
}
function idalgo_jsf_display_live_change_chrono_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    if(o_module){
        var txt_status='idalgo_live_'+txt_module+'_'+ref_match+'_status';
        var o_status=document.getElementById(txt_status);

        if(o_match['REF_STATUS']==7||o_match['REF_STATUS']==8||o_match['REF_STATUS']==9||o_match['REF_STATUS']==10){
            var txt_minute=idalgo_jsf_misc_makematchtime(o_match['REF_STATUS'],o_match['DATE_LIVE'],o_match['DATE_NOW']);
            var txt_title=txt_minute;
            if(o_status) o_status.innerHTML=txt_title;
        }
    }
}
function idalgo_jsf_display_live_change_event_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    var class_local='idalgo_font_size_11';
    var class_visitor='idalgo_font_size_11';
    if(parseInt(o_match['NUM_LOCALSCORE'])>parseInt(o_match['NUM_VISITORSCORE'])) class_local='idalgo_font_size_14';
    if(parseInt(o_match['NUM_LOCALSCORE'])<parseInt(o_match['NUM_VISITORSCORE'])) class_visitor='idalgo_font_size_14';

    if(o_module){
        var txt_matchline='idalgo_live_'+txt_module+'_'+ref_match+'_match';
        var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
        var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
        var txt_scoreseparate='idalgo_live_'+txt_module+'_'+ref_match+'_scoreseparate';
        var txt_local='idalgo_live_'+txt_module+'_'+ref_match+'_local';
        var txt_visitor='idalgo_live_'+txt_module+'_'+ref_match+'_visitor';

        var o_matchline=document.getElementById(txt_matchline);
        var o_localscore=document.getElementById(txt_localscore);
        var o_visitorscore=document.getElementById(txt_visitorscore);
        var o_scoreseparate=document.getElementById(txt_scoreseparate);
        var o_local=document.getElementById(txt_local);
        var o_visitor=document.getElementById(txt_visitor);

        if(o_matchline) o_matchline.className='div_idalgo_block_live_match idalgo_color_bg_02';
        if(o_localscore) o_localscore.className='span_idalgo_block_live_match_score_local idalgo_color_white idalgo_font_01 idalgo_font_size_14';
        if(o_visitorscore) o_visitorscore.className='span_idalgo_block_live_match_score_visitor idalgo_color_white idalgo_font_01 idalgo_font_size_14';
        if(o_scoreseparate) o_scoreseparate.className='span_idalgo_block_live_match_score_separate idalgo_color_white idalgo_font_01 idalgo_font_size_14';
        if(o_local) o_local.className='a_idalgo_block_live_match_team_local idalgo_color_white idalgo_font_01 '+class_local;
        if(o_visitor) o_visitor.className='a_idalgo_block_live_match_team_visitor idalgo_color_white idalgo_font_01 '+class_visitor;
    }
}
function idalgo_jsf_display_live_change_event_end_block_live(o_match){
    var txt_module='block_live';
    var o_module=document.getElementById('idalgo_'+txt_module);
    var ref_match=o_match['REF_MATCH'];

    var class_local='idalgo_font_size_11';
    var class_visitor='idalgo_font_size_11';
    if(o_match['NUM_LOCALSCORE']>o_match['NUM_VISITORSCORE']) class_local='idalgo_font_size_14';
    if(o_match['NUM_LOCALSCORE'] < o_match['NUM_VISITORSCORE']) class_visitor='idalgo_font_size_14';

    var class_status='idalgo_color_status_playing';
    if(o_match['REF_STATUS']==1||o_match['REF_STATUS']==2||o_match['REF_STATUS']==3) class_status='idalgo_color_status_end';
    if(o_match['REF_STATUS']==12||o_match['REF_STATUS']==13||o_match['REF_STATUS']==14||o_match['REF_STATUS']==15||o_match['REF_STATUS']==16) class_status='idalgo_color_status_stop';

    if(o_module){
        var txt_matchline='idalgo_live_'+txt_module+'_'+ref_match+'_match';
        var txt_localscore='idalgo_live_'+txt_module+'_'+ref_match+'_localscore';
        var txt_visitorscore='idalgo_live_'+txt_module+'_'+ref_match+'_visitorscore';
        var txt_scoreseparate='idalgo_live_'+txt_module+'_'+ref_match+'_scoreseparate';
        var txt_local='idalgo_live_'+txt_module+'_'+ref_match+'_local';
        var txt_visitor='idalgo_live_'+txt_module+'_'+ref_match+'_visitor';
        var txt_localalert='idalgo_live_'+txt_module+'_'+ref_match+'_local_alert';
        var txt_visitoralert='idalgo_live_'+txt_module+'_'+ref_match+'_visitor_alert';

        var o_matchline=document.getElementById(txt_matchline);
        var o_localscore=document.getElementById(txt_localscore);
        var o_visitorscore=document.getElementById(txt_visitorscore);
        var o_scoreseparate=document.getElementById(txt_scoreseparate);
        var o_local=document.getElementById(txt_local);
        var o_visitor=document.getElementById(txt_visitor);
        var o_localalert=document.getElementById(txt_localalert);
        var o_visitoralert=document.getElementById(txt_visitoralert);

        if(o_matchline) o_matchline.className='div_idalgo_block_live_match';
        if(o_localscore) o_localscore.className='span_idalgo_block_live_match_score_local '+class_status+' idalgo_font_01 idalgo_font_size_14';
        if(o_visitorscore) o_visitorscore.className='span_idalgo_block_live_match_score_visitor '+class_status+' idalgo_font_01 idalgo_font_size_14';
        if(o_scoreseparate) o_scoreseparate.className='span_idalgo_block_live_match_score_separate idalgo_color_grey_05 idalgo_font_01 idalgo_font_size_14';
        if(o_local) o_local.className='a_idalgo_block_live_match_team_local idalgo_color_grey_05 idalgo_font_01 '+class_local;
        if(o_visitor) o_visitor.className='a_idalgo_block_live_match_team_visitor idalgo_color_grey_05 idalgo_font_01 '+class_visitor;
        if(o_localalert) o_localalert.innerHTML='';
        if(o_visitoralert) o_visitoralert.innerHTML='';
    }
}