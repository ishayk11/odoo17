# -*- coding: utf-8 -*-
{
    'name': "vcolor",

    'summary': "Variant's colors for selection",

    'description': """
Adding the ability to store variants colors and presenting them for selection in the website 
    """,

    'author': "Ishay",
    'website': "https://home.benurri.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Variants',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','sale_management','web','website','website_sale', 'web_editor'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates1.xml',
    ],
    'installable': True,
    'application': True,
    'assets': {
    'web.assets_frontend': [
        'vcolor/static/src/js/*',
        'vcolor/static/src/css/*',
        'vcolor/static/src/fonts/*',
        'web.core',
        'web.model',
    ],
},
}

