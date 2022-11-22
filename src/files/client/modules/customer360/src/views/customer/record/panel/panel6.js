/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2022 Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko
 * Website: https://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

define('customer360:views/customer/record/panel/panel6', ['views/record/panels-container'], function (Dep) {
    return Dep.extend({

        template: 'customer360:customer/record/panel/panel6',

        setup: function () {
            this.waitForView('record');

            this.getModelFactory().create('Account').then(model => {
                this.model = model;
                this.model.id = '637b99ee356072d6b';

                this.listenTo(this.model, 'sync', () => {

                    this.trigger('model-sync');
                });

                this.listenToOnce(this.model, 'sync', () => this.createRecordView());

                this.model.fetch();

                return;
            });
        },

        createRecordView: function (callback) {
            var model = this.model;
            var scope = 'Account';

            this.headerHtml = '';

            this.headerHtml += $('<span>')
                .text(this.getLanguage().translate(scope, 'scopeNames'))
                .get(0).outerHTML;

            if (model.get('name')) {
                this.headerHtml += ' ' +
                    $('<span>')
                        .addClass('chevron-right')
                        .get(0).outerHTML;

                this.headerHtml += ' ' +
                    $('<span>')
                        .text(model.get('name'))
                        .get(0).outerHTML;
            }

            if (!this.fullFormDisabled) {
                let url = '#' + scope + '/view/' + this.id;

                this.headerHtml =
                    $('<a>')
                        .attr('href', url)
                        .addClass('action font-size-flexible')
                        .attr('title', this.translate('Full Form'))
                        .attr('data-action', 'fullForm')
                        .append(this.headerHtml)
                        .get(0).outerHTML;
            }

            this.headerHtml = this.getHelper().getScopeColorIconHtml(this.scope) + this.headerHtml;

            var viewName = 'customer360:views/account/record/detail';

            let options = {
                model: model,
                el: this.containerSelector + ' .record-container',
                type: 'detailSmall',
                layoutName: this.layoutName || 'detailSmall',
                buttonsDisabled: true,
                inlineEditDisabled: true,
                sideDisabled: this.sideDisabled,
                bottomDisabled: this.bottomDisabled,
                exit: function () {},
            };

            this.createView('record', viewName, options, callback);
        },
    });
});
