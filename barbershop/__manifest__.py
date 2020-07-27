# Copyright 2020 Vildan Safin <https://github.com/Enigma228322>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).

{
    "name": """Barbershop""",
    "summary": """Module for barbershop""",
    "category": "Marketing",
    # "live_test_url": "http://apps.it-projects.info/shop/product/DEMO-URL?version=12.0",
    # "images": ['/images/attention.jpg'],
    "version": "13.0.1.0.0",
    "application": True,

    "author": "Vildan Safin",
    "support": "vildan.safin.99@gmail.com",
    "website": "https://apps.odoo.com/apps/modules/12.0/saas_apps/",
    "license": "AGPL-3",
    # "price": 10.00,
    # "currency": "EUR",

    "depends": ['website'],
    "external_dependencies": {"python": [], "bin": []},
    "data": [
        'views/landing.xml',
        'views/assets.xml'
    ],
    "demo": [
    ],
    "qweb": [
        # 'views/refresh.xml'
    ],

    "post_load": None,
    "pre_init_hook": None,
    "post_init_hook": None,
    "uninstall_hook": None,

    "auto_install": False,
    "installable": True,
}
