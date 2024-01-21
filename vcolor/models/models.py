# -*- coding: utf-8 -*-

from odoo import models, fields, api


class vcolor(models.Model):
    _name = 'vcolor.vcolor'
    _description = "Variant's colors"
    _inherit = ['image.mixin']

    variant_id=fields.Many2one('product.attribute.value', string="Variant")
    name = fields.Char(string='Name', required=True)
    image = fields.Image(string="Image", attachment=True, store=True)
    description = fields.Html(string='Description')
    brand = fields.Many2one('product.supplierinfo', string="Brand")

class CustomProductAttributeValue(models.Model):
    _inherit = 'product.attribute.value'
    # Add your custom fields here
    color_ids = fields.One2many('vcolor.vcolor','variant_id',string="Colors")

class CustomProductAttribute(models.Model):
    _inherit = 'product.attribute'
    # Add your custom fields here
    # has_color = fields.Boolean(string="Has Color")
    has_color = fields.Boolean(string="Has Color", compute='_compute_has_color')
   
    @api.depends('value_ids.color_ids')  # Specify the correct field path
    def _compute_has_color(self):
        for record in self:
            record.has_color = any(record.value_ids.mapped('color_ids'))

class CustomProduct(models.Model):
    _inherit = "product.template"

    selected_Colors_ids = fields.One2many('vcolor.vcolor', 'name', string="Selected", stored=True)
    colors_short_name = fields.Char(compute='_compute_colors_name', string="Colors Short Name", store=True)

    @api.depends('selected_Colors')
    def _compute_colors_name(self):
        for record in self:
            color_info = []
            for color in record.selected_Colors:
                color_info.append(f"{color.variant_id.name} [{color.name}]")

            record.colors_short_name = ', '.join(color_info)

# class CustomOrderLine(models.Model):
#     _inherit = "sale.order.line"
#     selected_Colors = fields.One2many('vcolor.vcolor','variant_id',string="Selected", stored=True)
#     colors_short_name = fields.Char(compute='_compute_colors_name')



    # @api.depends('selected_Colors')
    # def _compute_name_short(self):
    #     """ Compute a short name for this sale order line, to be used on the website where we don't have much space.
    #         To keep it short, instead of using the first line of the description, we take the product name without the internal reference.
    #     """
    #     for record in self:
    #         for i in record.selected_Colors:
    #             record.colors_short_name += i.variant_id+" ["+i.Name+"], " 

