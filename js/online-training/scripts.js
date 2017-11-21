

$(document).ready(function(){
    // videojs('my-video').ready(function(){
    //     console.log(this.options()); //log all of the default videojs options
          
    //     // Store the video object
    //     var myPlayer = this, id = myPlayer.id();
    //     // Make up an aspect ratio
    //     var aspectRatio = 264/640; 

    //     function resizeVideoJS(){
    //         var width = document.getElementById(id).parentElement.offsetWidth;
    //         myPlayer.width(width);
    //         console.log("resize");
    //     }
          
    //     // Initialize resizeVideoJS()
    //     resizeVideoJS();
    //     // Then on resize call resizeVideoJS()
    //     //window.onresize = resizeVideoJS; 
        
    // });
    // $("video").on('contextmenu', function(e) {
    //     e.preventDefault();
    // }, false);

    $(".tutorial-video").each(function(){
        var vid_link = $(this).data("video-url");
        console.log(vid_link);
        if (typeof vid_link != 'undefined') {
            if(vid_link.includes("youtube")){
                if(vid_link.includes("embed")){
                    var video_iframe = '<div class="youtube-video-responsive"><iframe width="420" height="315" src="'+vid_link+'" frameborder="0" allowfullscreen></iframe></div>';
                    $(this).html(video_iframe);
                }
                else{
                    var videoid = vid_link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    var video_iframe = '<div class="youtube-video-responsive"><iframe width="420" height="315" src="https://www.youtube.com/embed/'+videoid[1]+'" frameborder="0" allowfullscreen></iframe></div>';
                    $(this).html(video_iframe);
                }
            }
            else if(vid_link.includes("vimeo")){
                if(vid_link.includes("player.vimeo.com")){
                    var video_iframe = '<div class="vimeo-video-responsive"><iframe src="'+vid_link+'" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                    $(this).html(video_iframe);
                }
                else{
                    var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
                    var vimeoVideoID = vid_link.match(regExp);
                    var video_iframe = '<div class="vimeo-video-responsive"><iframe src="https://player.vimeo.com/video/'+vimeoVideoID[2]+'" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                    $(this).html(video_iframe);
                }
            }
        }
    });  

    // function toggleIcon(e) {
    // $(e.target)
    //     .prev('.panel-heading')
    //     .find(".more-less")
    //     .toggleClass('glyphicon-plus glyphicon-minus');
    // }
    // $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    // $('.panel-group').on('shown.bs.collapse', toggleIcon);  
    $('.collapse').on('shown.bs.collapse', function(){
    $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    }).on('hidden.bs.collapse', function(){
    $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    });

    //Progress Bar
    if($(".progress").length > 0 ){
        console.log($(".chapters .panel-group > .panel").length);
        var no_chapters = $(".chapters .panel-group > .panel").length;
        var percentage_chapter = 100 / no_chapters;
        var left = 0;        

        $(".course-video > a").data("percentage_section",100 / $(".course-video").length);           
        

        // for(var i = 0;i < no_chapters;i++){
        //     var panel = $(".chapters .panel-group > .panel").eq(i);
        //     $(panel).find(".course-video > a").data("percentage_section",percentage_chapter / $(panel).find(".course-video").length);           
        // }

        // for(var i = 0;i < no_chapters - 1;i++){
        //     left = percentage_chapter + left;
        //     $(".progress").append("<div class = 'one no-color progress-chapter-"+ i +"' style = 'left:"+left+"%'></div>");
        // }

        //$(".panel .panel-heading > h4 > a").data("percentage",percentage_chapter);

    }
    $(".checkbox > input").click(function(){
        
        if($(this).prop("checked")){
            var current_width = ($(".progress-bar").width()/$(".progress").width())*100;
            var width = current_width + $(this).parent().siblings("a").data("percentage_section");
            var css_width =  width + "%";
            $(".progress-container > span").html(width.toFixed()+"%");
            $(".progress-bar").css({"width": css_width});
            
            
        }
        else{
            var current_width = ($(".progress-bar").width()/$(".progress").width())*100;
            var width = current_width - $(this).parent().siblings("a").data("percentage_section");                     
            if(width <= 0){
                width = 0;                
            }
            var css_width =  width + "%";
            $(".progress-container > span").html(width.toFixed()+"%");
            $(".progress-bar").css({"width": css_width});
        }
    });
});
// $(window).resize(function(){
//     var myPlayer = videojs('my-video');
//     var aspectRatio = 264/640; 
//     var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
//     myPlayer.width(width);
//     console.log("resize");
// });
function show_courseVideo(vid_link,element){
    $(".course-video").removeClass("active-video");
    $(element).parent().addClass("active-video");
    if(vid_link.includes("youtube")){
                if(vid_link.includes("embed")){
                    var video_iframe = '<div class="youtube-video-responsive"><iframe width="420" height="315" src="'+vid_link+'" frameborder="0" allowfullscreen></iframe></div>';
                    $(".main-course-video").html(video_iframe);
                }
                else{
                    var videoid = vid_link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    var video_iframe = '<div class="youtube-video-responsive"><iframe width="420" height="315" src="https://www.youtube.com/embed/'+videoid[1]+'" frameborder="0" allowfullscreen></iframe></div>';
                    $(".main-course-video").html(video_iframe);
                }
            }
            else if(vid_link.includes("vimeo")){
                if(vid_link.includes("player.vimeo.com")){
                    var video_iframe = '<div class="vimeo-video-responsive"><iframe src="'+vid_link+'" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                    $(".main-course-video").html(video_iframe);
                }
                else{
                    var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
                    var vimeoVideoID = vid_link.match(regExp);
                    var video_iframe = '<div class="vimeo-video-responsive"><iframe src="https://player.vimeo.com/video/'+vimeoVideoID[2]+'" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                    $(".main-course-video").html(video_iframe);
                }
            }
}

