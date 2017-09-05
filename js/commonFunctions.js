'use strict';
var DOM={
	Get:{
		byId: function(id){
			return document.getElementById(id);
		},
		byTag:function(tag){
			return document.getElementsByTagName(tag);
		},
		byClass:function(className){
			return document.getElementsByClassName(className);
		},
		byName:function(name){
			return document.getElementsByName(name);
		},
		querySelectorAll: function(querySelector){
			return document.querySelectorAll(querySelector);
		},
		querySelector:function(querySelector){
			return document.querySelector(querySelector);
		}
	},

	create:function(el){
		return document.createElement(el);
	},

	append:function (el, target){
		return target.appendChild(el);
	},

	prepend:function (el, target){
		return target.insertBefore(el, target.firstChild);
	},

	remove:function (el){
		return el.parentNode.removeChild(el);
	},
	event:function(type, el, f){
		if(el.attachEvent=="function")
			return el.attachEvent(type, f)
		else
			return el.addEventListener(type, f);
	},
	addClass: function(el, className){
		return el.classList.add(className)
	},
	removeClass: function(el, className){
		return el.classList.remove(className)
	}
};