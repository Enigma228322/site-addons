/* Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
 License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).*/
 odoo.define('saas_apps.model', function (require) {
    'use_strict';

    $(document).ready(function() {
        $('.back-gif').hover(
            function() {
                $(this).addClass("opacity-1");
                $(this).removeClass( "opacity-05" );
              }, function() {
                $(this).removeClass( "opacity-1" );
                $(this).addClass("opacity-05");
              }
        );
    });
});
