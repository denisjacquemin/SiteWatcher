(function(){
	var idalgo_js_class_iepngfix={
		list_image:[],
		add_image:function(obj){
			if(!this.list_image[obj.uniqueID]){
				this.list_image[obj.uniqueID]=obj;
				this.execute(obj);
			}
		},
		execute_all:function(){
			var txt_navigator=navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
			var is_ie=(txt_navigator!=null && Number(txt_navigator[1])<7 && document.all);
			if(is_ie){
				for(i=0;i < document.all.length;i++){
					var node=document.all[i];
					this.execute(node);
				}
			}
		},
		execute:function(node){
			var obj_image=node.currentStyle.backgroundImage;
			if(obj_image){
				if(obj_image.match(/\.png/)!=null){
					var txt_file=obj_image.substring(5,obj_image.length-2);
					var obj_image=new Image();
					obj_image.src=txt_file;

					node.style.backgroundImage="none";

					var div=document.createElement('div');
					div.style.filter		="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+txt_file+"', sizingMethod='crop')";
					div.style.position		='absolute';
					div.style.top			=this.idalgo_js_iepngfix_get_position(node.currentStyle.backgroundPositionY);
					div.style.left			=this.idalgo_js_iepngfix_get_position(node.currentStyle.backgroundPositionX);
					div.style.marginTop		=this.idalgo_js_iepngfix_get_margin(node.currentStyle.backgroundPositionY,obj_image.height);
					div.style.marginLeft	=this.idalgo_js_iepngfix_get_margin(node.currentStyle.backgroundPositionX,obj_image.width);
					div.style.width			=obj_image.width+'px';
					div.style.height		=obj_image.height+'px';
					div.style.overflow		='hidden';
					node.appendChild(div);
				}
			}
		},
		idalgo_js_iepngfix_get_position:function(txt_value){
			var txt_return=txt_value;
			switch(txt_value){
				case 'center'	: txt_return='50%'; break;
				case 'left'		: txt_return='0px'; break;
				case 'right'	: txt_return='100%'; break;
				case 'top'		: txt_return='0px'; break;
				case 'bottom'	: txt_return='100%'; break;
			}
			return txt_return;
		},
		idalgo_js_iepngfix_get_margin:function(txt_value,num_value){
			var txt_return='0px';
			switch(txt_value){
				case 'center'	: txt_return=(-num_value/2)+'px'; break;
				case 'bottom'	: 
				case 'right'	: txt_return=(-num_value)+'px'; break;
			}
			return txt_return;
		}
	}
	var txt_navigator=navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
	var is_ie=(txt_navigator!=null && Number(txt_navigator[1])<7 && document.all);
	if(is_ie){
		window.idalgo_iepngfix=idalgo_js_class_iepngfix;
	}
}())