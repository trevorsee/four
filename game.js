function Game(doc){
    var end = false;
    var player = 1;
    var changePlayer = function(){
        if(player === 1){
            player = 2;
        }else if(player === 2){
            player = 1;
        }
        element("counter").innerHTML = "Player"+player+"'s turn";
        element("colorblock").className = "player"+player;
    };
    var element = function(id){
        return doc.getElementById(id);
    };
    var cell = function(y,x){
        return element(y+"-"+x);
    };
    var allCells = function(action){
        for (var countY = 1; countY<8; countY++){
            for (var countX = 1; countX<7; countX++){
                action(countY,countX);
            }
        }
    };
    var addColor = function(y,x){
        cell(y,x).className = "player"+player;
        winCheck(y,x);
    };
    var drop = function(y,x){
        for(x=6; x>0; x--){
            if(cell(y,x).className === ""){
                addColor(y,x);
                break;
            }
        }
    };
    var colorCheck = function(y,x){
        if( cell(y,x) !== null){
            return cell(y,x).className;
        }
    };
    var winH = function(y,x){
        var length = 1;
        var oy = y;
        //win left
        y--; //bump
        for(y; y>oy-4; y--){
            if(colorCheck(oy,x) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
        }
        //win right
        y = oy;
        y++; //bump
        for(y; y<oy+4; y++){
            if(colorCheck(oy,x) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
        }
        if (length >= 4){
            winMessage();
        }
    };
    var winV = function(y,x){
        var length = 0;
        var ox = x;
        //win down
        for(x; x<ox+4; x++){
            if(colorCheck(y,ox) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
        }
        if (length >= 4){
            winMessage();
        }
    };
    var winRD = function(y,x){
        var length = 1;
        var oy = y;
        var ox = x;
        //win up right
        y++; //bump
        x--; //bump
        for(y; y<oy+4; y++){
            if(colorCheck(oy,ox) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
            x--;
        }
        //win down left
        y=oy;
        x=ox;
        y--; //bump
        x++; //bump
        for(y; y>oy-4; y--){
            if(colorCheck(oy,ox) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
            x++;
        }
        if (length >= 4){
            winMessage();
        }
    };
    var winLD = function(y,x){
        var length = 1;
        var oy = y;
        var ox = x;
        //win up left
        y--; //bump
        x--; //bump
        for(y; y>oy-4; y--){
            if(colorCheck(oy,ox) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
            x--;
        }
        //win down right
        y=oy;
        x=ox;
        y++; //bump
        x++; //bump
        for(y; y<oy+4; y++){
            if(colorCheck(oy,ox) === colorCheck(y,x)){
                length++;
            }else{
                break;
            }
            x++;
        }
        if(length >= 4){
            winMessage();
        }
    };
    var winCheck = function(y,x){
        winH(y,x);
        winV(y,x);
        winRD(y,x);
        winLD(y,x);
    };
    var winMessage = function(){
        console.log('ping');
        element("winner").innerHTML = "PLAYER"+player+" WINS";
        element("winner").style.fontSize = "5em";
        element("colorblock").className = "player"+player;
        element("counter").style.display = "none";
        end = true;
    };
    var doThis = function(y,x){
        cell(y,x).onclick = function(){
            drop(y,x);
            if(!end){
                changePlayer();
            }
        };
    };
    allCells(doThis);
}
Game(document);