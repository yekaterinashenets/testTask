var checkBoxes = DOM.Get.byClass("navbar__left-checkbox"),
catalogM = DOM.Get.byClass("catalog__men")[0],
catalogW = DOM.Get.byClass("catalog__women")[0],
catalogC = DOM.Get.byClass("catalog__children")[0],
options = DOM.Get.byClass("sort__select-option"),
sortValueEl =  DOM.Get.byClass("sort__value")[0],
sortSelectEl = DOM.Get.byClass("sort__select")[0];



sort(sortValueEl.innerHTML,["catalog__men-slider","catalog__women-slider","catalog__children-slider"]);

DOM.event("click", DOM.Get.byId("navbar__right-button"), function(el){
	for(var i=0; i<checkBoxes.length; i++){
		checkBoxes[i].checked=true;
		checkBoxes[i].dispatchEvent(new Event("change"));
	}

})

for(var i=0; i<checkBoxes.length; i++){
	DOM.event("change", checkBoxes[i], function(el){
		if(el.target.checked){
			switch (el.target.id){
				case "men":
					catalogM.style.display="block";
					initSlider("men");
					break;
				case "women":
					catalogW.style.display="block";
					initSlider("women");
					break;
				case "children":
					catalogC.style.display="block";
					initSlider("children");
					break;
			}
		}
		else{
			switch (el.target.id){
				case "men":
					catalogM.style.display="none";
					break;
				case "women":
					catalogW.style.display="none";
					break;
				case "children":
					catalogC.style.display="none";
					break;
			}
		}
		
	});
}

checkBoxes[0].checked=true;
checkBoxes[0].dispatchEvent(new Event("change"));

DOM.event("click", sortValueEl, function(el){
	el.target.style.display="none";
	sortSelectEl.style.display="inline-block";
})

for(var i=0; i<options.length; i++){
	DOM.event("click", options[i], function(el){
		sortSelectEl.style.display="none";
		sortValueEl.innerHTML=el.target.innerHTML;
		DOM.removeClass(DOM.Get.byClass("sort__select-option--up")[0], "sort__select-option--up");
		DOM.addClass(el.target, "sort__select-option--up");
		DOM.prepend(el.target, sortSelectEl);
		sortValueEl.style.display="inline-block";
		unslick("men"); unslick("women"); unslick("children");
		sort(sortValueEl.innerHTML,["catalog__men-slider","catalog__women-slider","catalog__children-slider"]);
		initSlider("men"); initSlider("women"); initSlider("children");
	});
}


function sort(category, containerNames){
	for(var i=0; i<containerNames.length; i++){
		var divs = DOM.Get.querySelectorAll("."+containerNames[i]+" .item");
		var divs_txt = [];
		for (var j =0; j<divs.length; j++){
		    divs_txt[j] = divs[j].innerHTML.replace(",",".");
		}
		switch(category){
			case "name":
				divs_txt.sort(function(j, jj){
					var reg = /<p class=\"item__info-name\">(.*)<\/p>/;
					var name_j = j.match(reg)[1];
					var name_jj = jj.match(reg)[1];
					if (name_j > name_jj) return 1; 
					else if (name_j < name_jj) return -1; 
					else return 0;
				});
				break;
			case "price":
				divs_txt.sort(function(j, jj){
					var reg = /<p class=\"item__info-price\">(.*)<\/p>/;
					var price_j = Number(j.match(reg)[1]);
					var price_jj = Number(jj.match(reg)[1]);
					if (price_j > price_jj) return 1; 
					else if (price_j < price_jj) return -1; 
					else return 0;
				});
				break;
		}
		for (var j =0; j<divs_txt.length; j++){
		    divs_txt[j] = '<div class="item">'+divs_txt[j]+'</div>';
		}
		var txt = divs_txt.join('');
		DOM.Get.byClass(containerNames[i])[0].innerHTML = txt;
		divs = DOM.Get.querySelectorAll("."+containerNames[i]+" .item");
		for(var j=0; j<divs.length; j++){
			DOM.event("click", divs[j], getItemData(divs[j]));
		}
		
	}
}
function getItemData(item){
	return function(el){
		if(item.innerHTML.match(/<p class=\"item__info-size\">(.*)<\/p>/)){
			localStorage.size=["xl", "l"];
		}
		else{
			localStorage.size=item.innerHTML.match(/<p>(.*)<\/p>/)[1];
		}
		localStorage.name=item.innerHTML.match(/<p class=\"item__info-name\">(.*)<\/p>/)[1];
		localStorage.price=item.innerHTML.match(/<p class=\"item__info-price\">(.*)<\/p>/)[1];
		localStorage.img=item.innerHTML.match(/<img src=\"(.*)\" class=\"item__img\">/)[1];


		if(item.getElementsByClassName("item__info-colors")[0].children.length!=0){
			var colors=[];
			for(var i=0, length=item.getElementsByClassName("item__info-colors")[0].children.length; i<length; i++){
				colors[i]=item.getElementsByClassName("item__info-colors")[0].children[i].className;
			}
			localStorage.colors=JSON.stringify(colors);
		}
		else
			localStorage.colors=JSON.stringify([]);
		document.location.href="product.html";
	}
}

