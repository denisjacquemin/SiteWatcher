function idalgo_jsf_round_corner_05_02(txt_name,is_class_color,border,background,txt_type_display){var div_main=document.getElementById('idalgo_rca_'+txt_name);if(div_main){var txt_content=div_main.getElementsByTagName('div')[0].innerHTML;var class_border='';var color_border='';var class_background='';var color_background='';if(is_class_color){class_border=' '+border;class_background=' '+background;}else{color_border=' style="background-color:'+border+';"';color_background=' style="background-color:'+background+';"';}var txt_return='';if(txt_type_display=='full'||txt_type_display=='top'||txt_type_display=='left'||txt_type_display=='top_left'){txt_return+='<div class="div_idalgo_corner_05_2_topleft">';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_2"></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1"></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_50"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_3'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1"></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_2"></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_3"></div>';txt_return+='</div>';}if(txt_type_display=='full'||txt_type_display=='top'||txt_type_display=='right'||txt_type_display=='top_right'){txt_return+='<div class="div_idalgo_corner_05_2_topright">';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_2"></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1"></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_50"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_3'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1"></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_2"></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_3"></div>';txt_return+='</div>';}if(txt_type_display=='full'||txt_type_display=='bottom'||txt_type_display=='left'||txt_type_display=='bottom_left'){txt_return+='<div class="div_idalgo_corner_05_2_bottomleft">';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_3"></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_2"></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1"></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_1"></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_50"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_3'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_left div_idalgo_corner_w_2"></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_left div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div>';txt_return+='</div>';}if(txt_type_display=='full'||txt_type_display=='bottom'||txt_type_display=='right'||txt_type_display=='bottom_right'){txt_return+='<div class="div_idalgo_corner_05_2_bottomright">';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_3"></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_2"></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+'"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_40"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1"></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_1"></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_50"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_3'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_right div_idalgo_corner_w_2"></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_25"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_75"'+color_border+'></div><div class="div_idalgo_corner_right div_idalgo_corner_w_1'+class_border+' idalgo_opacity_90"'+color_border+'></div>';txt_return+='</div>';}if(txt_type_display=='full'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='top'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left_bottom'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right_bottom'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom_full'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='top_left'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom_full'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='top_right'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom_full'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='bottom'){txt_return+='<div class="div_idalgo_corner_05_2_top_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='bottom_left'){txt_return+='<div class="div_idalgo_corner_05_2_top_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='bottom_right'){txt_return+='<div class="div_idalgo_corner_05_2_top_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='left'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}if(txt_type_display=='right'){txt_return+='<div class="div_idalgo_corner_05_2_top'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_left_full'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_right'+class_border+'"'+color_border+'></div>';txt_return+='<div class="div_idalgo_corner_05_2_bottom'+class_border+'"'+color_border+'></div>';}txt_return+='<div class="div_idalgo_corner_05_2_content'+class_background+'"'+color_background+'>';txt_return+=txt_content;txt_return+='</div>';div_main.className='div_idalgo_corner_05_2_full_background';div_main.innerHTML=txt_return;}}