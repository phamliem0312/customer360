define('customer360:views/customer/record/detail-extra', 'view', function (Dep) {

    return Dep.extend({
        template: 'customer360:customer/record/extra',

        mode: 'detail',

        streamPanel: true,

        relationshipPanels: true,

        readOnly: false,

        portalLayoutDisabled: false,

        /**
         * @inheritDoc
         */
        setupPanels: function () {
            this.createView('panel5', 'customer360:views/customer/record/panel/panel5');
            this.createView('panel6', 'customer360:views/customer/record/panel/panel6');
            this.createView('panel7', 'customer360:views/customer/record/panel/panel7');
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