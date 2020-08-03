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

    @route('/post_record', type='json', auth='public')
    def get_record(self, **kw):
        new_record = request.env['barbershop.record'].sudo().create({
            'name': kw.get('name', 'No name'),
            'sername': kw.get('sername', 'No sername'),
            'phone_num': kw.get('phone', 'No phone number'),
            'date': kw.get('date', 'No date')
        })
        if kw.get('service'):
            for elem in request.env['barbershop.service'].sudo().search([]):
                if elem.name in kw.get('service'):
                    new_record.service += elem
        return {
            'status': 'Ok',
            'price': new_record.price
        }
