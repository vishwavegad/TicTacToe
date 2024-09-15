let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new");
let messageContainer = document.querySelector(".message");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    messageContainer.classList.remove("hide");
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6},
    });
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);  //prints individual indices for each pattern
        // console.log(boxes[pattern[0]], boxes[pattern[1]], //boxes[pattern[2]]);  //boxes of each pattern
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);  //inner text of each box for each pattern
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val)
            {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

const gameDraw = () => {
    msg.innerText = "Draw";
    messageContainer.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        // console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "white";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "black";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(!isWinner && count==9)
            gameDraw();
    });
});

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);