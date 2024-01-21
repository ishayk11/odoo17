/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget"
import { renderToElement } from "@web/core/utils/render"

publicWidget.registry.jsTemplate = publicWidget.Widget.extend({
    selector: '.select_div',
    template: 'modal_template',
    init(){
        this._super(...arguments);
        this.orm = this.bindService("orm");
    },
    events: {
        'click .js_modal': 'onClick',
        'click #modalCloseButton': '_onModalCloseButtonClick',
    },
    async onClick(ev) {
        ev.preventDefault()
        const $button = $(ev.currentTarget);
        const $select = $button.prev('select');
        const selectedOption = $select.find('option:selected');
        if (selectedOption.length) {
            const selectedValue = selectedOption.val();
            const selectedText = selectedOption.text().trim();
            // console.log("selected option:", selectedText);
            const content = renderToElement(this.template, {
                V_name: selectedText,
                model: await this.orm.searchRead("vcolor.vcolor",[["variant_id","=", selectedText]], ["name"]),
            })
            this.$el.find('.spot').html(content);
            this.$el.find('.spot').children('.modal').show();
        } else {
            console.log("No option is selected.");
        }
    },
    _onModalCloseButtonClick() {
        // Close the modal when the button with id 'modalCloseButton' is clicked
        this.$el.find('.spot').children('.modal').hide();
    },
});