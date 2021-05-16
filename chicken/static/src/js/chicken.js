/* Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
 License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).*/
odoo.define('chicken.model', function (require) {
    'use_strict';

    var session = require('web.session');

    function recover_cart(){
        var num = localStorage.getItem('num_busket');
        if(num)
        {
            $('div.num-busket').text(num);
            $('div.busket-price').text(localStorage.getItem('price') * num + "₽");
        }
    }    

    $(document).ready(function () {
        recover_cart();
        $('div.plus-abs').click(function () {
            var cart_num = parseInt($('div.num-busket').text(), 10);
            $('div.num-busket').text(String(cart_num + 1));
            localStorage.setItem('num_busket', cart_num + 1);
            session.rpc('/chicken/cart_update', {
            }).then(function (response) {
                $('div.busket-price').text(response.price * parseInt($('div.num-busket').text(), 10) + "₽");
                localStorage.setItem('price', response.price);
            });
        })
        $('div.order').click(function () {
            $('div.back-poopup').fadeIn("slow");
            $('div.poopup').fadeIn("slow");
        })
        $('div.back-poopup').click(function () {
            $('div.back-poopup').fadeOut("slow");
            $('div.poopup').fadeOut("slow");
        })
        $('div.back-cart').click(function () {
            window.location.href = "/shop/cart";
        })
        $('div.save').click(function () {
            if(($(".number_input").val()).length){
                session.rpc('/chicken/save_contact', {
                    name: $(".name_input").val(),
                    number: $(".number_input").val()
                }).then(function (response) {
                    $('div.back-poopup').fadeOut("slow");
                    $('div.poopup').fadeOut("slow");
                });    
            }
        });
        $('div.pool-item').mouseenter(function(){
            $('div.pool-item').css({'opacity': '0.4'});
            $(this).css({'opacity': '1'});
        });
        $('div.pool-item').mouseleave(function(){
            $('div.pool-item').css({'opacity': '1'});
        });

        $('div.choose-menu').click(function() {
            $('div.choose-menu').removeClass("orange-back");
            $(this).addClass("orange-back");
        });
    });
});
