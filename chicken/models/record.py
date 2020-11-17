# Copyright 2020 Vildan Safin <https://www.it-projects.info/team/Enigma228322>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo import api, fields, models
import logging
from slugify import slugify
import base64

class Record(models.Model):
    _name = "chicken.record"
    _description = "Customers online record"

    name = fields.Char("Name")
    phone_num = fields.Char("Phone number")
