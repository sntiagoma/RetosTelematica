function eq(x,y,z,S){
    return (x==S)&&(y==S)&&(z==S);
}

function Triki(){
    this.board = [[".",".","."],[".",".","."],[".",".","."]];
}

Triki.prototype.set = function(S,row,col){
    this.board[row][col] = S;
};

Triki.prototype.check = function(S){
    if(
        eq(this.board[0][0],this.board[0][1],this.board[0][2],S)||
        eq(this.board[1][0],this.board[1][1],this.board[1][2],S)||
        eq(this.board[2][0],this.board[2][1],this.board[2][2],S)||
        eq(this.board[0][0],this.board[1][0],this.board[2][0],S)||
        eq(this.board[0][1],this.board[1][1],this.board[2][1],S)||
        eq(this.board[0][2],this.board[1][2],this.board[2][2],S)||
        eq(this.board[0][0],this.board[1][1],this.board[2][2],S)||
        eq(this.board[2][0],this.board[1][1],this.board[0][2],S)
    ){return true;}
    return false;
};
module.exports = Triki;