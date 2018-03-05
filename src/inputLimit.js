/**
 *  输入限制监听绑定
 *  TODO 更多限制,敬请期待..............
 */
//正整数
$(document).on({
    keypress: function (event) {
        var e = window.event || event,
            code = e.keyCode || e.which;
        if (code == 46) {
            if (this.value.length < 1) {
                return false;
            }
            if (this.value.indexOf(".") != -1) {
                return false;
            }
        } else {
            if (this.value.length != 0 && this.value.indexOf(".") != -1
                && (this.value.length - this.value.indexOf(".")) > 2
                && (getCursorPosition(this) - this.value.indexOf(".")) > 0) {
                return false;
            }
            return code == 46 || code >= 48 && code <= 57;
        }
    },
    blur: function (event) {
        if (this.value.lastIndexOf(".") == 0) {
            this.value = '0' + this.value;
        }
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    },
    paste: function (event) {
        var s = event.originalEvent.clipboardData.getData('text');
        if (!/\D/.test(s)) ;
        this.value = s.replace(/^0*/, '');
        return false;
    },
    dragenter: function (event) {
        return false;
    },
    keyup: function (event) {
        if (this.value.indexOf(".") == -1) {
            if (this.value.length >= 2) {
                if (/(^0+)/.test(this.value)) this.value = this.value.replace(/^0*/, '');
            }
        } else {
            if (this.value.length == 1) {
                this.value = '';
            }
        }
    }
}, '.input-limit-positive');

//负整数
$(document).on({
    keypress: function (event) {
        var e = window.event || event,
            code = e.keyCode || e.which;
        if (code == 46) {
            if (this.value.length < 1) {
                return false;
            }
            if (this.value.indexOf(".") != -1) {
                return false;
            }
        } else if (code == 45) {
            if (getCursorPosition(this) > 0) {
                return false;
            }
            if (this.value.indexOf("-") != -1) {
                return false;
            }
        } else {
            if (this.value.length != 0 && this.value.indexOf(".") != -1
                && (this.value.length - this.value.indexOf(".")) > 2
                && (getCursorPosition(this) - this.value.indexOf(".")) > 0) {
                return false;
            }
            return code == 45 || code == 46 || code >= 48 && code <= 57;
        }
    },
    blur: function (event) {
        if (this.value.lastIndexOf(".") == 0) {
            this.value = '0' + this.value;
        }
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    },
    paste: function (event) {
        var s = event.originalEvent.clipboardData.getData('text');
        if (!/\D/.test(s)) ;
        this.value = s.replace(/^0*/, '');
        return false;
    },
    dragenter: function (event) {
        return false;
    },
    keyup: function (event) {
        if (this.value.indexOf(".") == -1) {
            if (this.value.length >= 2) {
                if (/(^0+)/.test(this.value)) this.value = this.value.replace(/^0*/, '');
            }
        } else {
            if (this.value.length == 1) {
                this.value = '';
            }
        }
    }
}, '.input-limit-minus');
//浮点数
$(document).on({
    keypress: function (event) {
        var e = window.event || event,
            code = e.keyCode || e.which;
        if (code == 46) {
            if (this.value.length < 1) {
                return false;
            }
            if (this.value.indexOf(".") != -1) {
                return false;
            }
        } else {
            return code == 46 || code >= 48 && code <= 57;
        }
    },
    blur: function (event) {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    },
    paste: function (event) {
        var s = event.originalEvent.clipboardData.getData('text');
        if (!/\D/.test(s)) ;
        this.value = s.replace(/^0*/, '');
        return false;
    },
    dragenter: function (event) {
        return false;
    },
    keyup: function (event) {
        if (this.value.indexOf(".") == -1) {
            if (this.value.length >= 2) {
                if (/(^0+)/.test(this.value)) this.value = this.value.replace(/^0*/, '');
            }
        } else {
            if (this.value.length == 1) {
                this.value = '';
            }
        }
    }
}, '.input-limit-decimal');

$(document).on({
    keypress: function (event) {
        var e = window.event || event,
            code = e.keyCode || e.which;
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    },
    paste: function (event) {
        return false;
    },
    dragenter: function (event) {
        return false;
    }
}, '.input-limit-letter');
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