$("button").click(function(){ $("#img1").css('width', '500px')});

$("document").ready(function(){
    //double click on document ready:
    $("button").dblclick(function(){
        $("#img1").css('width','500px');
    });

    //handle mouse enter and mouse leave events:
    $("#img1").mouseenter(function(){
        $("#img1").css('width', '500px')
    })

    $("#img1").mouseleave(function(){
        $("#img1").css('width', '250px')
    })

    //hover event:
    $("#img1").hover(func1Hover, func2Hover)

    function func1Hover(){
        $("#img1").css('width', '500px')
    }

    function func2Hover(){
        $("#img1").css('width', '250px')
    }

    //handling click events:
    //hide
    $("#btn1").click(function(){
        $("#img1").hide() //adding transition: hide(2000) takes two seconds to hide the image
    })

    //show 
    $("#btn2").click(function(){
        $("#img1").show()
    })
    
    //show
    $("#btn3").click(function(){
        $("#img1").toggle()
    })

    //animating image:
    $("#btn").click(function(){
        $("#img").animate({
            left: '150px',
            opacity: '1',
            height: '400px',
            width: '400px'
        }, 2000) //you can use 'slow' or 'fast'  instead of numeric value
    })

});

