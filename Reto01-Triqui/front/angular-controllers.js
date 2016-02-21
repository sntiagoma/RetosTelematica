var Triki = require("../models/triqui.js");
var TrikiSigns = require("../models/triqui-signs.js");
function controllers(app){
    app.controller('TrikiController', ['$scope', function($scope){
        $scope.title = require("./app.js").name;
    }])
    .controller('GameController',
        ['$scope','$http','$routeParams','socket',
    function($scope,$http,$routeParams,socket){
        $scope.id = undefined;
        $scope.opponent = undefined;
        $scope.showBoard = false;
        $scope.showForm = true;
        $scope.isYourTurn = undefined;
        $scope.sign = undefined;
        $scope.triki = new Triki();
        $scope.msg = {};

        socket.on('connected', function(socketid) {
            console.log("Id: %s",socketid);
            $scope.id = socketid;
        });
        socket.on('receive',function(userSocketId,data){
            if(data.msg=="request-connection"){
                var res = false;
                if(!$scope.showBoard){
                    res = confirm("Do you want to play with:"+
                    userSocketId+"?");
                }
                if(res){
                    socket.emit("send",userSocketId,{
                        msg:"accept-connection",
                        id:$scope.id
                    });
                    $scope.opponent = userSocketId;
                    $scope.showBoard = true;
                    $scope.showForm = false;
                    $scope.isYourTurn = false;
                    $scope.sign = TrikiSigns.O;
                }else{
                    socket.emit("send",userSocketId,{
                        msg:"deny-connection",
                        id:$scope.id
                    });
                }
            }else if(data.msg=="accept-connection"){
                $scope.opponent = userSocketId;
                $scope.showBoard = true;
                $scope.showForm = false;
                $scope.isYourTurn = true;
                $scope.sign = TrikiSigns.X;
            }else if(data.msg=="deny-connection"){
                alert(userSocketId + "\n Doesn't accept you request");
            }else if(data.msg=="move"){
                $scope.triki.board = data.board;
                $scope.isYourTurn = true;
            }else if(data.msg=="loser"){
                $scope.triki.board = data.board;
                $scope.isYourTurn = false;
                alert("You Lose :'(, Reload to Play Again!");
            }
            else{
                alert("from: "+userSocketId+"\n"+data);
            }
        });
        socket.on('sendError',function(error){
            $scope.opponent = undefined;
            $scope.showBoard = false;
        });

        $scope.connectWith = function(){
            if($scope.msg.destpeer==$scope.id){
                alert("Ja-ja");
                return 0;
            }
            socket.emit("send",
                $scope.msg.destpeer,
                {msg:"request-connection",id:$scope.id});
        };
        $scope.clickBoard = function(row,col){
            if($scope.triki.board[row][col]!="."){
                alert("You can't use it");
                return;
            }
            else if($scope.isYourTurn){
                $scope.triki.set($scope.sign,row,col);
                window.triki = $scope.triki;
                $scope.isYourTurn = false;
                if($scope.triki.check($scope.sign)){
                    socket.emit("send",$scope.opponent,{
                        msg:"loser",
                        board:$scope.triki.board
                    });
                    alert("You Win!, Reload to Play Again.");
                }else{
                    socket.emit("send",$scope.opponent,{
                        msg:"move",
                        board:$scope.triki.board
                    });
                }
            }
        };
    }]);
}
module.exports = controllers;