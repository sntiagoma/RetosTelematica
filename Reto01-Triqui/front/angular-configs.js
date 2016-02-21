function configs(app){
    app.config(['$routeProvider',function($routeProvider) {
        $routeProvider.when("/", {
            controller: "TrikiController",
            templateUrl: "templates/home.html"
        })
        .when("/play", {
            controller: "GameController",
            templateUrl: "templates/game.html"
        });
    }]);
}
module.exports = configs;