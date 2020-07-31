# Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo import api, fields, models
import logging
from slugify import slugify
import base64

class Service(models.Model):
    _name = "barbershop.service"
    _description = "For service"

    name = fields.Char(string="Service name", default="Service")
    description = fields.Text(string="Service description", default="No description")
    price = fields.Float(string="Price", default=0.0)
    image = fields.Image(
        string='Service image'
    )
    active = fields.Boolean(string="Active", default=True)
