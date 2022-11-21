define('customer360:views/customer/record/detail', 'views/record/detail', function (Dep) {

    return Dep.extend({
        build: function (callback) {
            if (this.middleView) {
                this.createMiddleView(callback);
            }
        },     
    });
});