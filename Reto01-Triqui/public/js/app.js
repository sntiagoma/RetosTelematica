!function o(r,t,n){function e(s,a){if(!t[s]){if(!r[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var d=t[s]={exports:{}};r[s][0].call(d.exports,function(o){var t=r[s][1][o];return e(t?t:o)},d,d.exports,o,r,t,n)}return t[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)e(n[s]);return e}({1:[function(o,r,t){function n(o){o.config(["$routeProvider",function(o){o.when("/",{controller:"TrikiController",templateUrl:"templates/home.html"}).when("/play",{controller:"GameController",templateUrl:"templates/game.html"})}])}r.exports=n},{}],2:[function(o,r,t){function n(r){r.controller("TrikiController",["$scope",function(r){r.title=o("./app.js").name}]).controller("UsersController",["$scope","$http",function(o,r){o.userkeys=["Yo","Soy","Batman"],o.reloadUsers=function(){r.get("/clients").success(function(r){o.userkeys=r.users}).error(function(r){o.userkeys=["a"]})},o.reloadUsers()}]).controller("GameController",["$scope","$http","$routeParams","socket",function(o,r,t,n){o.id=void 0,o.opponent=void 0,o.showBoard=!1,o.showForm=!0,o.isYourTurn=void 0,o.sign=void 0,o.triki=new e,o.msg={},n.on("connected",function(r){console.log("Id: %s",r),o.id=r}),n.on("receive",function(r,t){if("request-connection"==t.msg){var e=!1;o.showBoard||(e=confirm("Do you want to play with:"+r+"?")),e?(n.emit("send",r,{msg:"accept-connection",id:o.id}),o.opponent=r,o.showBoard=!0,o.showForm=!1,o.isYourTurn=!1,o.sign=i.O):n.emit("send",r,{msg:"deny-connection",id:o.id})}else"accept-connection"==t.msg?(o.opponent=r,o.showBoard=!0,o.showForm=!1,o.isYourTurn=!0,o.sign=i.X):"deny-connection"==t.msg?alert(r+"\n Doesn't accept you request"):"move"==t.msg?(o.triki.board=t.board,o.isYourTurn=!0):"loser"==t.msg?(o.triki.board=t.board,o.isYourTurn=!1,alert("You Lose :'(, Reload to Play Again!")):alert("from: "+r+"\n"+t)}),n.on("sendError",function(r){o.opponent=void 0,o.showBoard=!1}),o.connectWith=function(){return o.msg.destpeer==o.id?(alert("Ja-ja"),0):void n.emit("send",o.msg.destpeer,{msg:"request-connection",id:o.id})},o.clickBoard=function(r,t){return"."!=o.triki.board[r][t]?void alert("You can't use it"):void(o.isYourTurn&&(o.triki.set(o.sign,r,t),window.triki=o.triki,o.isYourTurn=!1,o.triki.check(o.sign)?(n.emit("send",o.opponent,{msg:"loser",board:o.triki.board}),alert("You Win!, Reload to Play Again.")):n.emit("send",o.opponent,{msg:"move",board:o.triki.board})))}}])}var e=o("../models/triqui.js"),i=o("../models/triqui-signs.js");r.exports=n},{"../models/triqui-signs.js":6,"../models/triqui.js":7,"./app.js":4}],3:[function(o,r,t){function n(o){o.factory("socket",["socketFactory",function(o){return o()}])}r.exports=n},{}],4:[function(o,r,t){var n={};n.name="WebImage",r.exports=n},{}],5:[function(o,r,t){var n=angular.module("triki",["ngRoute","btford.socket-io"]);o("./angular-factories.js")(n),o("./angular-controllers.js")(n),o("./angular-configs.js")(n)},{"./angular-configs.js":1,"./angular-controllers.js":2,"./angular-factories.js":3}],6:[function(o,r,t){var n={X:"X",O:"O"};r.exports=n},{}],7:[function(o,r,t){function n(o,r,t,n){return o==n&&r==n&&t==n}function e(){this.board=[[".",".","."],[".",".","."],[".",".","."]]}e.prototype.set=function(o,r,t){this.board[r][t]=o},e.prototype.check=function(o){return n(this.board[0][0],this.board[0][1],this.board[0][2],o)||n(this.board[1][0],this.board[1][1],this.board[1][2],o)||n(this.board[2][0],this.board[2][1],this.board[2][2],o)||n(this.board[0][0],this.board[1][0],this.board[2][0],o)||n(this.board[0][1],this.board[1][1],this.board[2][1],o)||n(this.board[0][2],this.board[1][2],this.board[2][2],o)||n(this.board[0][0],this.board[1][1],this.board[2][2],o)||n(this.board[2][0],this.board[1][1],this.board[0][2],o)?!0:!1},r.exports=e},{}]},{},[5]);