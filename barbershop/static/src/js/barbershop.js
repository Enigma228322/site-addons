/* Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
 License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).*/
 odoo.define('barbershop.model', function (require) {
    'use_strict';

    var is_contacts_pressed = false;

    $(document).ready(function() {
        // Adapting the design
        if($(window).width() < 800){
            mobile_design();
            open_service_form();
            open_record_form();
        }
        else{
            desctop_design();
            setTimeout(load_elements, 1000);
            hover_effects($('.back-gif'));
            hover_effects($('.telegram'));
            hover_effects($('.instagram'));
            hover_effects($('.vk'));
            hover_effects($('.contact'));
            show_service_page();
            show_online_record();
        }

        // Animation shit
        setTimeout(load_element, 2000, $('.instagram'));
        setTimeout(load_element, 2300, $('.telegram'));
        setTimeout(load_element, 2600, $('.vk'));
        setTimeout(load_element, 2900, $('.contact'));
        show_contacts();
    });

    function hover_effects(elem){
        elem.hover(
            function() {
                if($(this)[0] === $('.back-gif')[0]){
                    $(this).addClass("opacity-1");
                    $(this).removeClass("opacity-05");
                }
                else{
                    $(this).addClass("up-4");
                }
              }, function() {
                if($(this)[0] === $('.back-gif')[0]){
                    $(this).removeClass( "opacity-1" );
                    $(this).addClass("opacity-05");
                }
                else{
                    $(this).removeClass("up-4");
                }
              }
        );
    }

    function load_element(el){
        $(el).addClass('tansit-1');
        if($(el)[0] === $('.back-gif')[0]){
            $(el).addClass("opacity-05");
        }
        else{
            $(el).addClass('opacity-1');
        }
        setTimeout(remove_class, 1000, $(el), 'tansit-1');
    }

    function load_elements(){
        $.each($('.to-load'), function (key, elem) {
            $(this).addClass('tansit-1');
            if($(this)[0] === $('.back-gif')[0]){
                $(this).addClass("opacity-05");
            }
            else{
                $(this).addClass('opacity-1');
            }
            setTimeout(remove_class, 1000, $(this), 'tansit-1');
        });
    }

    function show_contacts(){
        $('.media').addClass('tansit-02');
        $('.contact').click(function(){
            if(!is_contacts_pressed){
                $('.media').addClass('up-70');
                $('.media').removeClass('h-100');
                $('.text-info').removeClass('hid');
                is_contacts_pressed = true;
            }
            else{
                $('.media').removeClass('up-70');
                $('.media').addClass('h-100');
                $('.text-info').addClass('hid');
                is_contacts_pressed = false;
            }
        });
    }

    function show_online_record(){
        $('.choose').click(function(){
            $('.service-desctop').fadeOut("slow");
            $('.online-record').fadeIn("slow");
        });
    }

    function show_service_page(){
        $('.back-gif').click(function(){
            $('.big-button-right').fadeOut("slow");
            $('.service-desctop').fadeIn("slow");
        });
    }

    function remove_class(el, custom_class){
        $(el).removeClass(custom_class);
    }

    function mobile_design(){
        $('.registration-icon').removeClass('hid');
    }

    function desctop_design(){
        $('.big-button-right').removeClass('hid');
        $('.main-content-left').removeClass('col-12');
        $('.main-content-left').addClass('col-4');
    }

    function open_record_form(){
        $('.choose').click(function(){
            $('.service-mobile').fadeOut("slow");
            $('.online-record-mobile').fadeIn("slow");
        });
    }

    function open_service_form(){
        $('.registration-icon').click(function(){
            $('.main-content-left').fadeOut("slow");
            $('.service-mobile').fadeIn("slow");
        });
    }
});
