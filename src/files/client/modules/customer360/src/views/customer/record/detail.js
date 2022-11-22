define('customer360:views/customer/record/detail', 'views/record/detail', function (Dep) {

    return Dep.extend({
        template: 'customer360:customer/record/detail',

        bottomView: 'customer360:views/customer/record/detail-bottom',

        extraView: 'customer360:views/customer/record/detail-extra',


        build: function (callback) {
            if (this.middleView) {
                this.createMiddleView(callback);
            }

            this.createExtraView(callback);
            this.createBottomView(callback);
        },

        createExtraView: function (callback) {
            var el = this.options.el || '#' + (this.id);
            this.createView('extra', this.extraView, {
                model: this.model,
                scope: this.scope,
                type: this.type,
                el: el + ' .extra',
                layoutData: {
                    model: this.model,
                },
                recordHelper: this.recordHelper,
                recordViewObject: this,
                panelFieldListMap: this.panelFieldListMap,
            }, callback);
        },
    });
});