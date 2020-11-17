# Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo import api, fields, models
import logging
from slugify import slugify
import base64

class Record(models.Model):
    _name = "barbershop.record"
    _description = "Guests online record"

    name = fields.Char("Name")
    sername = fields.Char("Sername")
    phone_num = fields.Char("Phone number")
    date = fields.Text("Date")
    price = fields.Float("Price", compute="_compute_price")
    service = fields.Many2many('barbershop.service', string='Choosen service')

    def _compute_price(self):
        self.price = sum([service.price for service in self.service])
