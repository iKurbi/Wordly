
var height = 6; //number of guesses 
var widht = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
var word = "STORE";


window.onload = function(){
    intialize();
}


function intialize() {

    // crate the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < widht; c++) {
            // <span id="0-0" class="title">p<span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile")
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }    

    // listen for key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

       // alert(e.code);
       if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < widht) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
          if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
         }
       }
       else if (e.code == "Backspace") {
        if (0 < col && col <= widht) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
       }

       else if ( e.code == "Enter") {
        update();
        row += 1; //start new row 
        col = 0; // start at 0 for new row
       }

       if (!gameOver && row == height) {
        gameOver = true 
        document.getElementById("answer")
       }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < widht; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        }
        // Is it in word?
            else if (word.includes(letter)) {
                currTile.classList.add("present");
            }
            //Not in the word
            else  {
                currTile.classList.add("absent");  
            }

            if (correct == widht) {
                gameOver = true;
            }
    }
}
