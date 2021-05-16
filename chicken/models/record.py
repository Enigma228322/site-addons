# Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo import api, fields, models
import logging
from slugify import slugify
import base64

class Record(models.Model):
    _name = "pizza.record"
    _description = "Pizza's"

    name = fields.Char("Name")
    radius = fields.Integer("Pizza radius")
    weight = fields.Float("Pizza weight")
    structure = fields.Char("Pizza structure")
    price = fields.Float("Price")
    image = fields.Image(
        string='Pizza image'
    )
    product_type = fields.Char("Product type")

    @api.model
    def create(self, vals):
        if not 'product_type' in vals:
            raise AccessDenied(_("Пожалуйста, введите тип продукта: pizza, pasta, hot, drink, salad"))
            return
        types = ['pizza', 'pasta', 'hot', 'drink', 'salad']
        found = False
        for ptype in types:
            if ptype == vals['product_type']:
                found = True
        if not found:
            raise AccessDenied(_("Пожалуйста, введите тип продукта правильно: pizza, pasta, hot, drink, salad"))
            return
        res = super(Record, self).create(vals)
        if not self.env['product.template'].search([('name', '=', vals['name'])]):
            product = self.env['product.template'].create({
                'name': vals['name'],
                'radius': vals['radius'],
                'weight': vals['weight'],
                'structure': vals['structure'],
                'standard_price': vals['price'],
                'image_1920': vals['image'],
                'website_published': True,
                'product_type': vals['product_type']
            })
        return res

    def write(self, vals):
        # if 'product_type' in vals:
        #     raise AccessDenied(_("Тип продукта менять нельзя, удалите продукт и создайте новый"))
        #     return

        product = self.env['product.template'].search([('name', '=', self.name)])
        res = super(Record, self).write(vals)
        if 'product_type' in vals:
            product.write({
                'product_type': vals['product_type']
            })
        if 'name' in vals:
            product.write({
                'name': vals['name']
            })
        if 'radius' in vals:
            product.write({
                'radius': vals['radius']
            })
        if 'weight' in vals:
            product.write({
                'weight': vals['weight']
            })
        if 'structure' in vals:
            product.write({
                'structure': vals['structure']
            })
        if 'price' in vals:
            product.write({
                'standard_price': vals['price']
            })
        if 'image' in vals:
            product.write({
                'image_1920': vals['image']
            })
        return res

class PizzaProduct(models.Model):
    _inherit = 'product.template'

    radius = fields.Integer("Pizza radius")
    weight = fields.Float("Pizza weight")
    structure = fields.Char("Pizza structure")
    product_type = fields.Char("Product type")
