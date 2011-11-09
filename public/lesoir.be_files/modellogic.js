var Models = new Array();
function Model(MerkID,ModelID,ModelName) {
	this.MerkID = MerkID;
	this.ModelID = ModelID
	this.ModelName = ModelName;
}
function TruncateModels()
{	Models.length = 0;
}
function AddModels(MerkID) {
	for(var i = 1; i < arguments.length-1; i=i+2) {
		Models[Models.length] = new Model(MerkID, unescape(arguments[i]), unescape(arguments[i+1]));
	}	
}
function ModList(selectfield,MerkID,lang)
{	NewModelList(selectfield,MerkID,lang);
}
function NewModelList(selectfield,MerkID,lang) {
	selectfield.options.length = 1;
	var count = 0;
	for (var n = 0; n < Models.length; n++) {
		if (Models[n].MerkID == MerkID) {
			selectfield.options[selectfield.options.length] = new Option(Models[n].ModelName, Models[n].ModelID);
			count++;
		}		
	}
	if (count == 0 && MerkID != '') {
		selectfield.disabled = true;
		switch(lang) {
			case "nl":
			case "nl_long":
			case "nl_arrow":
				selectfield.options[0].text = 'geen modellen';
				break;
			case "fr":
			case "fr_long":
			case "fr_arrow":
				selectfield.options[0].text = 'pas de modèles';
				break;
			case "en":
			case "en_long":
			case "en_arrow":
				selectfield.options[0].text = 'no models';
				break;
			default:
				selectfield.options[0].text = 'geen modellen';
			}
	}
	else {
		selectfield.disabled = false;
		switch(lang) {
			case "nl" :
				selectfield.options[0].text = "-- model --";
				break
			case "fr" :
				selectfield.options[0].text = "-- modèle --";
				break
			case "en" :
				selectfield.options[0].text = "-- model --";
				break
			case "nl_long" :
				selectfield.options[0].text = "-- Kies een model --";
				break
			case "fr_long" :
				selectfield.options[0].text = "-- Choisissez un modèle --";
				break
			case "en_long" :
				selectfield.options[0].text = "-- Select model --";
				break
			case "nl_arrow" :
				selectfield.options[0].text = "» model";
				break
			case "fr_arrow" :
				selectfield.options[0].text = "» modèle";
				break
			case "en_arrow" :
				selectfield.options[0].text = "» model";
				break
			case "nl_arrowhtml" :
				selectfield.options[0].text = "\xBB model";
				break
			case "fr_arrowhtml" :
				selectfield.options[0].text = "\xBB modèle";
				break
			case "en_arrowhtml" :
				selectfield.options[0].text = "\xBB model";
				break
			default:
				selectfield.options[0].text = "» model";
			}
	}
}
/* Eurotax */
var oselect	
function LoadEuroTaxModellen(merkid, targetselectbox, taal)
{	oselect=document.getElementById(targetselectbox)
	oselect.options.length=1;					
	if (merkid != '')
	{	oselect.disabled=true;
		url = "eurotax_modellen.asp?lang=" + taal + "&merkid=" + merkid;		
		fdoAjaxXml(url,EndLoadEuroTaxModellen)						
	} 
}			
function EndLoadEuroTaxModellen()
{	oselect.options.length=1;
	if (responseXml)
	{	oxml = responseXml;						
		var model
		model = oxml.getElementsByTagName("model")				
		for (i=0;i<model.length;i++)
		{	id = model[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
			naam = model[i].getElementsByTagName("naam")[0].childNodes[0].nodeValue;					
			oselect.options[i+1] =  new Option(naam,id);							
		}
		oselect.disabled=false; 				
	}
}		
/* Years */
function writeYears()
{	var i;
	var d = new Date();	
	var curr_year = d.getFullYear();
	for (i=curr_year;i>= 1960;i--)
		document.write('<option value="'+ i +'">' + i +  '</option>');
	 document.write('<option>&lt;&nbsp;1960</option>');
}