var app = angular.module("triki",["ngRoute",'btford.socket-io']);

require("./angular-factories.js")(app);
require("./angular-controllers.js")(app);
require("./angular-configs.js")(app);