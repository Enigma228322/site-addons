/* Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
 License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).*/
 odoo.define('saas_apps.model', function (require) {
    'use_strict';

    $(document).ready(function() {
        hover_effects($('.back-gif'));
        hover_effects($('.telegram'));
        hover_effects($('.instagram'));
        hover_effects($('.vk'));
        hover_effects($('.contact'));
        setTimeout(load_elements, 1000);

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
                $(this).addClass("up-4");
              }, function() {
                if($(this)[0] === $('.back-gif')[0]){
                    $(this).removeClass( "opacity-1" );
                    $(this).addClass("opacity-05");
                }
                $(this).removeClass("up-4");
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
        setTimeout(remove_transit, 1000, $(el));
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
            setTimeout(remove_transit, 1000, $(this));
        });
    }

    function remove_transit(el){
        $(el).removeClass('tansit-1')
    }

    function show_contacts(){
        $('.contact').click(function(){

        });
    }
});
