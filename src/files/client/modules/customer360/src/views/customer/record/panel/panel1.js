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

define('customer360:views/customer/record/panel/panel1', ['views/record/panels-container'], function (Dep) {
    return Dep.extend({

        template: 'customer360:customer/record/panel/panel1',

        setup: function () {
            this.recordHelper = this.options.recordHelper;
            this.getCollectionFactory().create('Account', (collection) => {
                collection.maxSize = this.getConfig().get('recordsPerPageSelect') || 5;

                this.collection = collection;

                if (this.defaultOrderBy) {
                    this.collection.setOrder(this.defaultOrderBy, this.defaultOrder || 'asc', true);
                }
                this.setupPanelViews();
            });
        },

        loadList: function () {
            var viewName = 'views/record/list';

            this.createView('list', viewName, {
                collection: this.collection,
                el: this.containerSelector + ' .list-container',
                selectable: true,
                checkboxes: this.multiple,
                massActionsDisabled: true,
                rowActionsView: false,
                layoutName: 'listSmall',
                searchManager: this.searchManager,
                checkAllResultDisabled: !this.massRelateEnabled,
                buttonsDisabled: true,
                skipBuildRows: true,
            }, function (view) { });
        },

        setupPanelViews: function () {
            var p = {
                "name": "contacts",
                "label": "Contact",
                "title": "Contact",
                "index": 5,
                "order": 5,
                "layout": "listSmall",
                "orderBy": "name",
                "view": "customer360:views/customer/record/panel/relationship",
                "hidden": false,
                "actionsViewKey": "contactsActions",
                "tabNumber": -1,
                "create": true,
                "buttonList": [
                    {
                        "title": "Create",
                        "action": "createRelated",
                        "link": "contacts",
                        "acl": "edit",
                        "html": "<span class=\"fas fa-plus\"></span>",
                        "data": {
                            "link": "contacts"
                        }
                    }
                ],
                "titleHtml": "<span class=\"color-icon fas fa-square-full\" style=\"color: rgb(164, 197, 224);\"></span>&nbsp;Contacts"
            }
            var name = p.name;

            var options = {
                model: this.model,
                panelName: name,
                el: this.options.el + ' > .panel-body',
                defs: p,
                mode: this.mode,
                recordHelper: this.recordHelper,
                inlineEditDisabled: this.inlineEditDisabled,
                readOnly: this.readOnly,
                disabled: p.hidden || false,
                recordViewObject: this.recordViewObject,
            };

            options = _.extend(options, p.options);

            this.createView(name, p.view, options, (view) => {
                this.createView(name + 'Actions', 'views/record/panel-actions', {
                    el: this.getSelector() +
                        '.panel[data-name="' + p.name + '"] > .panel-heading > .panel-actions-container',
                    model: this.model,
                    defs: p,
                    scope: this.scope,
                    entityType: this.entityType,
                });
            });
        },
    });
});
