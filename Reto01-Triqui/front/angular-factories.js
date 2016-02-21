function factories(app){
    app.factory('socket', ["socketFactory",
        function (socketFactory) {
        return socketFactory();
    }]);
}
module.exports = factories;