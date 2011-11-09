//1: infos; 2: videos ; 3: portfolios
function multi_popup( fic ) {
	window.open( fic , 'multi_popup', 'height=550, width=970, top=100, left=100, toolbar=no, menubar=no, location=no, resizable=yes, scrollbars=no, status=no');
	return false;
}
function sound_popup( fic ) {	
	window.open('/special/popup_multimedia/popup_son.phtml?obj=' + fic, 'sounds_popup', 'height=100, width=300, top=300, left=300, toolbar=no, menubar=no, location=no, resizable=yes, scrollbars=no, status=no');	
	return false;
}


//popup les plus popup
function video_popup( link ) {
	var arr = splitf (link, "=");
	if ( arr.length > 0 ) {
		//il y a bien un parametre il faut impérativement que le nom de la video soit le dernier paramètre de l'url.
		var val=arr[arr.length-1];
		var url = "/special/popup_multimedia/popup_multimedia.phtml?mode=2&obj=" + val;
		return multi_popup( url ) ;
	}
	return false;
}	
function splitf( chaine, format ) {
	var reg=new RegExp("[" + format + "]+", "g");		
	var tableau=chaine.split(reg);
	return tableau;
}
function football_popup( slink ) {
	window.open(slink,'football_popup','width=750,height=720,toolbar=no,status=no,left=20,top=30');
}
function video_belga (slink) {
	window.open(slink,'belga_popup','height=650, width=880, top=100, left=100, toolbar=no, menubar=no, location=no, resizable=yes, scrollbars=no, status=no');
	return false;
}
function ftvlaunch(video,quality,pid) {
	  var LeftPosition = (screen.width) ? (screen.width-665)/2 : 0;
	  var TopPosition = (screen.height) ? (screen.height-430)/2 : 0;
	  var popwin = window.open('http://www.zoomin.tv/videoplayer/index.cfm?id='+video+'&mode=normal&quality='+ quality +'&pid='+ pid,'MTV6_window','toolbar=no,width=665,height=430,top='+TopPosition+',left='+LeftPosition+',directories=no,status=no,statusbar=0,scrollbars=no,resizable=no,menubar=no');
      popwin.focus();
}
function createCookie(name,value,days,timespan)
{
	defaultTime = days*24*60*60*1000 ;
	if (timespan)
	{
		defaultTime = 3*60*60*1000 ; 
	}
	if (days)
	{	var date = new Date();
		date.setTime(date.getTime()+(defaultTime));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";

	document.cookie = name+"="+value+expires+"; path=/; domain=.lesoir.be";
	if(!site_url.match(/lesoir/i)) {document.cookie = name+"="+value+expires+";"; } ;

}
if(LireCookie('fil_active')=='1') 
{
      	window.open('http://www.lesoir.be/actualite/le_fil_info/popup.php', 'filinfo', 'width=500, height=450, scrollbars=no, toolbar=no, resizable=yes'); 	
}
if(LireCookie('filsports_active')=='1') 
{
      	window.open('http://www.lesoir.be/actualite/le_fil_info_sports/popup.php', 'filinfo', 'width=500, height=450, scrollbars=no, toolbar=no, resizable=yes'); 	
}
function getCookieVal(offset)
{
  var endstr=document.cookie.indexOf (";", offset);
  if (endstr==-1) endstr=document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function LireCookie(nom)
{
  var arg=nom+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen)
  {
    var j=i+alen;
    if (document.cookie.substring(i, j)==arg) return getCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;

  }
  return null;
}

var dcookie = document.cookie ;
var cookie_str = dcookie.toString();
var site_index = /^http\:\/\/(www\.lesoir\.be|soirv52|selv61)\/?$|.*?la_une.*?|.*?index\.php/ ;
var site_url = window.location.toString() ;
var is_index = site_url.match(site_index) ;

var referrer_bypasssplash = /^http\:\/\/(archives\.lesoir\.be)\/m\/*?/ ;
var refe = document.referrer;
var bypasssplash = refe.match(referrer_bypasssplash);
//alert(dosplash);
	
if(!dcookie) {
	createCookie('init','1',1,true);	
}

if(typeof(ads_splash_active)=='undefined') var ads_splash_active=0;

//if ((is_index)&&(!site_url.match(/sports/))) {	
if (!site_url.match(/actunet/)) {
	
	if(ads_splash_active==1&&!bypasssplash) {
	var splash_active = /splash_active=([0-9])/i ;
		var matches_splash = cookie_str.match(splash_active) ;
		var path_splash = document.URL;
		var currentTime = new Date();
		var today = currentTime.getDay();
		if(LireCookie('splash_active_v2')==null) {
			createCookie('splash_active_v2',path_splash,1,false);
			if(LireCookie('splash_active_v2')==null) {
			} else {
				if(ads_splash_active==1) {
					document.location.href = 'http://www.lesoir.be/splash.html' ;						
				}
			}    	
		}
	}
		if(LireCookie('ai_check')==null) {
			createCookie('ai_check',path_splash,1,false);
		}		
}



