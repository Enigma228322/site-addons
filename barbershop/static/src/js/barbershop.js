/* Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
 License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).*/
 odoo.define('barbershop.model', function (require) {
    'use_strict';

    var session = require('web.session');

    var is_contacts_pressed = false,
        choosen_service = new Set();

    $(document).ready(function() {
        // Adapting the design
        if($(window).width() < 800){
            mobile_design();
            open_service_form();
            open_record_form();
            register_new_user_mobile();
        }
        else{
            desctop_design();
            setTimeout(load_elements, 500);
            hover_effects($('.back-gif'));
            hover_effects($('.telegram'));
            hover_effects($('.instagram'));
            hover_effects($('.vk'));
            hover_effects($('.contact'));
            show_service_page();
            show_online_record();
            register_new_user();
        }

        // Animation shit
        setTimeout(load_element, 2000, $('.instagram'));
        setTimeout(load_element, 2300, $('.telegram'));
        setTimeout(load_element, 2600, $('.vk'));
        setTimeout(load_element, 2900, $('.contact'));
        show_contacts();
        get_choosen_service();
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
            $('.main-content-left').height($(window).height());
            $('.service-desctop').fadeOut("slow");
            $('.online-record').fadeIn("slow");
        });
    }

    function show_service_page(){
        $('.back-gif').click(function(){
            $('.big-button-right').fadeOut("slow");
            $('.service-desctop').fadeIn("slow");
            $('.main-content-left').height($(document).height() + $('.footer').height());
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
        $('.choose-mobile').click(function(){
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

    function get_choosen_service(){
        $('.service-block').click(function(){
            if($(this).hasClass('choosen-service')){
                $(this).removeClass('choosen-service');
                // $($(this)[0].children[1].children[0]).text() - is service name
                choosen_service.delete($($(this)[0].children[1].children[0]).text());
            }
            else{
                $(this).addClass('choosen-service');
                // $($(this)[0].children[1].children[0]).text() - is service name
                choosen_service.add($($(this)[0].children[1].children[0]).text());
            }
        });
    }

    function register_new_user(){
        $('.sign-up').click(function(){
            var name = $('.name-input')[0].value,
                sername = $('.sername-input')[0].value,
                phone = $('.phone-input')[0].value,
                date = $('.date-input')[0].value;
            var service = [];
            for (let item of choosen_service.values()) service.push(item);
            register_on_server(name, sername, phone, date, service);
            go_to_waiting_room();
        });
    }

    function register_new_user_mobile(){
        $('.sign-up-mobile').click(function(){
            var name = $('.name-input-mobile')[0].value,
                sername = $('.sername-input-mobile')[0].value,
                phone = $('.phone-input-mobile')[0].value,
                date = $('.date-input-mobile')[0].value;
            var service = [];
            for (let item of choosen_service.values()) service.push(item);
            register_on_server(name, sername, phone, date, service);
            go_to_waiting_room_mobile();
        });
    }

    function register_on_server(name, sername, phone, date, service){
        // RPC
        session.rpc('/post_record', {
            name: name,
            sername: sername,
            phone: phone,
            date: date,
            service: service
        }).then(function (result) {
            console.log(result['status']);
            $('.recording').fadeOut("slow");
            $('.recorded').fadeIn("slow");
            $('.recorded').text("Мы вас записали! Сумма к оплате составила " + result['price'] + " руб");
        });
    }

    function go_to_waiting_room(){
        $('.online-record').fadeOut("slow");
        $('.waiting-room').fadeIn("slow");
    }

    function go_to_waiting_room_mobile(){
        $('.online-record-mobile').fadeOut("slow");
        $('.waiting-room-mobile').fadeIn("slow");
        setTimeout(return_to_first_page, 5000);
    }

    function return_to_first_page(){
        $('.waiting-room-mobile').fadeOut("slow");
        $('.main-content-left').fadeIn("slow");
    }

    // RPC
    // session.rpc('/', {
    //     root: [app.innerText]
    // }).then(function (result) {
    // });
});
