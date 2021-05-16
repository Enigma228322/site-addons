# Copyright 2020 Vildan Safin <https://github.com/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo.http import route, request, Controller
from odoo.addons.website_sale.controllers.main import WebsiteSale
import urllib.parse

class chickenController(Controller):

    @route('/chicken', type='http', auth='public', website=True)
    def landing(self, **kw):
        return request.render('chicken.Main', {
            'food': request.env['pizza.record'].sudo().search([])
        })

class ChickenCart(WebsiteSale):

    @route('/chicken/cart_update', type='json', auth='public', website=True)
    def cart_update_price_page(self, **kw):
        sale_order = request.website.sale_get_order(force_create=True)
        # import wdb;wdb.set_trace()
        chicken = request.env.ref('chicken.product_chicken_2kg').sudo()
        sale_order._cart_update(
                product_id=chicken.product_variant_id.id,
                add_qty=1
            )
        return {
            "price": chicken.standard_price or chicken.list_price
        }

    @route('/chicken/save_contact', type='json', auth='public', website=True)
    def save_contact(self, **kw):
        name = kw.get('name')
        number = kw.get('number')
        request.env['chicken.record'].sudo().create({
            'name': name,
            'phone_num': number
        })
        return {
            "ok": 1
        }
