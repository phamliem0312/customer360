define('customer360:views/customer/detail', 'views/detail', function (Dep) {

    return Dep.extend({
        getRecordViewName: function () {
            return this.getMetadata()
                .get('clientDefs.Customer.recordViews.detail') || this.recordView;
        },

        setupRecord: function () {
            this.scope = "Customer";
            let o = {
                model: this.model,
                el: '#main > .record',
                scope: 'Contact',
                shortcutKeysEnabled: true,
            };

            this.optionsToPass.forEach((option) => {
                o[option] = this.options[option];
            });

            if (this.options.params && this.options.params.rootUrl) {
                o.rootUrl = this.options.params.rootUrl;
            }

            if (this.model.get('deleted')) {
                o.readOnly = true;
            }

            console.log( this.getRecordViewName());

            return this.createView('record', this.getRecordViewName(), o);
        },

        setupHeader: function () {
            this.createView('header', this.headerView, {
                model: this.model,
                el: '#main > .header',
                scope: "Customer",
                fontSizeFlexible: true,
            });

            this.listenTo(this.model, 'sync', (model) => {
                if (model && model.hasChanged('name')) {
                    if (this.getView('header')) {
                        this.getView('header').reRender();
                    }
                }
            });
        },
    });
});