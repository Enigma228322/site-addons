# Copyright 2020 Vildan Safin <https://github.com/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo.http import route, request, Controller
from odoo.addons.website_sale.controllers.main import WebsiteSale
import urllib.parse

class BarbershopController(Controller):

    @route('/', type='http', auth='public', website=True)
    def landing(self, **kw):
        return request.render('barbershop.Main', {
            'services': request.env['barbershop.service'].sudo().search([('active', '=', True)])
        })
