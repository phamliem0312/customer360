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

 define('customer360:views/customer/record/detail-bottom', 'view', function (Dep) {

    /**
     * A detail-bottom record view.
     *
     * @class
     * @name Class
     * @extends module:views/record/panels-container.Class
     * @memberOf module:views/record/detail-bottom
     */
    return Dep.extend(/** @lends module:views/record/detail-bottom.Class# */{

        template: 'customer360:customer/record/bottom',

        mode: 'detail',

        streamPanel: true,

        relationshipPanels: true,

        readOnly: false,

        portalLayoutDisabled: false,

        /**
         * @inheritDoc
         */
        setupPanels: function () {
            this.createView('panel1', 'customer360:views/customer/record/panel/panel1', {
                recordHelper: this.recordHelper
            });
            this.createView('panel2', 'customer360:views/customer/record/panel/panel2');
            this.createView('panel3', 'customer360:views/customer/record/panel/panel3');
            this.createView('panel4', 'customer360:views/customer/record/panel/panel4');
        },

        init: function () {
            this.recordHelper = this.options.recordHelper;
            this.scope = this.entityType = this.model.name;

            this.readOnlyLocked = this.options.readOnlyLocked || this.readOnly;
            this.readOnly = this.options.readOnly || this.readOnly;
            this.inlineEditDisabled = this.options.inlineEditDisabled || this.inlineEditDisabled;

            this.portalLayoutDisabled = this.options.portalLayoutDisabled || this.portalLayoutDisabled;

            this.recordViewObject = this.options.recordViewObject;
        },

        setup: function () {
            this.panelList = [];

            this.setupPanels();
        },
    });
});
