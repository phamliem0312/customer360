define('customer360:views/account/record/detail', 'views/record/detail', function (Dep) {

    return Dep.extend({
        template: 'customer360:account/record/detail',


        build: function (callback) {
            if (this.middleView) {
                this.createMiddleView(callback);
            }
        },
    });
});