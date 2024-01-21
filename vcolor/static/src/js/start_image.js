/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget"
import { renderToElement } from "@web/core/utils/render"

publicWidget.registry.ImageTemplate = publicWidget.Widget.extend({
    selector: '.select_div',
    template: 'image_template',
    init(){
        this._super(...arguments);
        this.orm = this.bindService("orm");
    },
    events: {
        'click .image-item':'_image_click',
        'change .form-select':'_selection_change',
    },
    async start(){
        const selectedOption = this.$target.find('option:selected');
        const sideImage = this.$target.find('.side_image');
        if (selectedOption.length) {
            const selectedValue = selectedOption.val();
            const selectedText = selectedOption.text().trim();
            // console.log("selected option:", selectedText);
            const content = renderToElement(this.template, {
                // V_namei: selectedText,
                modeli: await this.orm.searchRead("vcolor.vcolor",[["variant_id","=", selectedText]], ["name"]),
            })
            // console.log("this is the content:  "+content[0].name);
            sideImage.html(content);
        }
    },
    async _image_click(ev){
        $('img').css('outline', 'none');
        const $locate = $(ev.currentTarget);
        $locate.find('img').css({
            outline: '2px solid lightskyblue',
            outlineOffset: '5px'
        });
        const sideImage1 = this.$target.find('.side_image');
        // console.log("Name is: "+ $(ev.currentTarget).data('item-name'))
        // console.log("ID is: "+ $(ev.currentTarget).data('item-id'))
        const selected_image = await this.orm.searchRead("vcolor.vcolor",[["id","=", $(ev.currentTarget).data('item-id')]], ["name"]);
        const idName = selected_image[0].name;
        const idImage = "/web/image?model=vcolor.vcolor&field=image&id="+selected_image[0].id;
        // console.log("Object is: "+ idName);
        const testim = sideImage1.find("li.test");
        // console.log("chckpoint: "+testim.length);
        console.log("the image is: "+idImage)
        testim.text(idName);
        testim.prev().attr("src",idImage)

    },
    async _selection_change(ev){
        const selectedOption = this.$target.find('option:selected');
        const sideImage = this.$target.find('.side_image');
        if (selectedOption.length) {
            const selectedValue = selectedOption.val();
            const selectedText = selectedOption.text().trim();
            // console.log("selected option:", selectedText);
            const changer = await this.orm.searchRead("vcolor.vcolor",[["variant_id","=", selectedText]], ["name"]);
            const idName = changer[0].name;
            const idImage = "/web/image?model=vcolor.vcolor&field=image&id="+changer[0].id;
            const testim = sideImage.find("li.test");
            testim.text(idName);
            testim.prev().attr("src",idImage)
        }
    },    
});