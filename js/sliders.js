
function initSlider(name){

    if($(".catalog__"+name+"-slider").hasClass('slick-initialized')) unslick(name);
    var $status = $('.catalog__navigation--'+name+' p');
    var $slickElement = $('.catalog__'+name+'-slider');
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var pages;
        if(slick.slideCount%3!=0){
            pages=Math.floor(slick.slideCount/3+1)
        }
        else
            pages=Math.floor(slick.slideCount/3);
        var currentPage = (currentSlide ? currentSlide : 0) + 1;
        currentPage=Math.floor(currentPage/3+1);
        $status.text( currentPage+ ' / ' + pages);
    });
    $(".catalog__"+name+"-slider").slick({
        arrows: true,
        prevArrow: $("#prev-"+name),
        nextArrow: $("#next-"+name),
        variableWidth: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
    });
}

function unslick(name){
    if($(".catalog__"+name+"-slider").hasClass('slick-initialized')){
        $(".catalog__"+name+"-slider").slick("unslick");
        $(".catalog__"+name+"-slider").innerHTML="";
    }
}