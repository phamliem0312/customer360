define('customer360:controllers/customer', ['controllers/record'], function (Dep) {

    return Dep.extend({
        createViewView: function (options, model, view) {
            view = 'customer360:views/customer/detail';

            this.main(view, {
                scope: this.name,
                model: model,
                returnUrl: options.returnUrl,
                returnDispatchParams: options.returnDispatchParams,
                params: options,
            });
        },

        actionTest: function (options) {
            this.scope = "Contact";
            this.name = "Contact";
            var id = options.id;

            var isReturn = this.getRouter().backProcessed;

            if (isReturn) {
                if (this.lastViewActionOptions && this.lastViewActionOptions.id === id) {
                    options = this.lastViewActionOptions;
                }
            }
            else {
                delete this.lastViewActionOptions;
            }

            this.lastViewActionOptions = options;

            var createView = (model) => {
                this.prepareModelView(model, options);

                this.createViewView.call(this, options, model);
            };

            if ('model' in options) {
                var model = options.model;

                createView(model);

                this.showLoadingNotification();

                model
                    .fetch()
                    .then(() => {
                        this.hideLoadingNotification();
                    });

                this.listenToOnce(this.baseController, 'action', () => {
                    model.abortLastFetch();
                });

                return;
            }

            this.getModel().then(model => {
                model.urlRoot = "Contact";
                model.id = id;

                this.showLoadingNotification();

                model
                    .fetch({main: true})
                    .then(() => {
                        this.hideLoadingNotification();

                        if (model.get('deleted')) {
                            this.listenToOnce(model, 'after:restore-deleted', () => {
                                createView(model);
                            });

                            this.prepareModelView(model, options);
                            this.createViewView(options, model, 'views/deleted-detail');

                            return;
                        }

                        createView(model);
                    });

                this.listenToOnce(this.baseController, 'action', () => {
                    model.abortLastFetch();
                });
            });
        },
    });
});