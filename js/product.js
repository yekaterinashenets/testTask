DOM.Get.byClass("product__title")[0].innerHTML=localStorage.name;
DOM.Get.byClass("product__description-price--value")[0].innerHTML=localStorage.price+"€";
DOM.Get.byClass("product__description-sizes--value")[0].innerHTML=localStorage.size;
DOM.Get.byClass("product__description-img")[0].setAttribute("src", localStorage.img);
var colors=JSON.parse(localStorage.colors);
if(colors.length!=0){
	var value="";
	for(var i=0, length=colors.length; i<length; i++){
		value+="<div class='"+colors[i]+"'></div>";
	}
	DOM.Get.byClass("product__description-colors--value")[0].innerHTML=value;
}
else{
	DOM.Get.byClass("product__description-colors")[0].innerHTML="";
	DOM.Get.byClass("product__description-colors")[0].style.display="none";
}
