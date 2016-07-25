/**
 * 限制输入框 v0.1beta
 * 基于jquery简单实现文本框输入限制
 * @auther Maxith chou
 */
$(document).ready(function(){bindInput();});
function bindInput(){
	var all = document.all ? document.all : $('input[type="text"]'),doms = new Array();
	for (var i = 0; i < all.length; i++) {
		var type = $(all[i]).attr('inputLimit');
		if(type != null){
			doms[doms.length] = all[i];
		}
	}
	for (var i = 0; i < doms.length; i++) {
		var item = doms[i],type = $(item).attr('inputLimit');
		switch (type){
			case 'number_only':
				item.onkeypress = function(event){
					var e = window.event||event,
						code = e.keyCode || e.which;
					return code>=48&&code<=57;
				};
				item.onblur = function(event){
					if(this.value.lastIndexOf(".")==(this.value.length-1)){
		                this.value = this.value.substr(0,this.value.length-1);
	                }else if(isNaN(this.value)){
	                    this.value = "";
	                }
				};
				item.onpaste = function(event){
					var s=clipboardData.getData('text');
	                if(!/\D/.test(s));
	                value=s.replace(/^0*/,'');
	                return false;
				};
				item.ondragenter = function(event){
					return false;
				};
				item.onkeyup = function(event){
					if(this.value.length >= 2){
						if(/(^0+)/.test(this.value))this.value=this.value.replace(/^0*/, '');
					}
				};
				break;
			case 'number_decimal':
				item.onkeypress = function(event){
					var e = window.event||event,
						code = e.keyCode || e.which;
					if(code == 46){
						if(this.value.length < 1){
							return false;
						}
	                    if(this.value.indexOf(".")!= -1){
	                        return false;
	                    }
	                }else{
	                    return code == 46||code>=48&&code<=57;
	                }
				};
				item.onblur = function(event){
					if(this.value.lastIndexOf(".")==(this.value.length-1)){
		                this.value = this.value.substr(0,this.value.length-1);
	                }else if(isNaN(this.value)){
	                    this.value = "";
	                }
				};
				item.onpaste = function(event){
					var s=clipboardData.getData('text');
	                if(!/\D/.test(s));
	                value=s.replace(/^0*/,'');
	                return false;
				};
				item.ondragenter = function(event){
					return false;
				};
				item.onkeyup = function(event){
					if(this.value.indexOf(".") == -1){
						if(this.value.length >= 2){
							if(/(^0+)/.test(this.value))this.value=this.value.replace(/^0*/, '');
						}
					}else{
						if(this.value.length == 1){
							this.value = '';
						}
					}
				};
				break;
			case 'number_integer':
				item.onkeypress = function(event){
					var e = window.event||event,
						code = e.keyCode || e.which;
					if(code == 45){
	                    if(getCursorPosition(this) > 0){
	                    	return false;
	                    }
						if(this.value.indexOf("-")!=-1){
	                        return false;
	                    }
	                }
					return code == 45||code>=48&&code<=57;
				};
				item.onblur = function(event){
					if(this.value.lastIndexOf(".")==(this.value.length-1)){
		                this.value = this.value.substr(0,this.value.length-1);
	                }else if(isNaN(this.value)){
	                    this.value = "";
	                }
				};
				item.onpaste = function(event){
					var s=clipboardData.getData('text');
	                if(!/\D/.test(s));
	                value=s.replace(/^0*/,'');
	                return false;
				};
				item.ondragenter = function(event){
					return false;
				};
				item.onkeyup = function(event){
					if(this.value.length >= 2){
						if(/(^0+)/.test(this.value))this.value=this.value.replace(/^0*/, '');
					}
				};
				break;
				//TODO 其余类型限制
		}
	}
}
/**
 * 光标位置判断
 */
function getCursorPosition(el){
     var pos = 0;
     if ('selectionStart' in el) {
         pos = el.selectionStart;
     } else if ('selection' in document) {
         el.focus();
         var Sel = document.selection.createRange();
         var SelLength = document.selection.createRange().text.length;
         Sel.moveStart('character', -el.value.length);
         pos = Sel.text.length - SelLength;
     }
     return pos;
 }
