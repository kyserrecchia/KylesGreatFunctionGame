//VARIABLES
var canvasArr = [];
var chosenFunc = "sinx";
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll("canvas");
var pickedColor = pickColor();
var pickedCanvas = pickCanvas();
var pickedFunction;
var functionDisplay = document.getElementById("functionDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var switchFuncs = document.getElementById("switchFuncs");

hardBtn.classList.add("selected");

///EVENT LISTENERS


//switches functions
	sinx.addEventListener("click", function(x){
		chosenFunc = "sinx";
		resetBtn();
	});

	cosx.addEventListener("click", function(x){
		chosenFunc = "cosx";
		resetBtn();
	});

	x2.addEventListener("click", function(x){
		chosenFunc = "x2";
		resetBtn();
	});

	x3.addEventListener("click", function(x){
		chosenFunc = "x3";
		resetBtn();
	});

//Difficulty modes
	//hard and easy buttons 
	for(var i = 0; i < modeButtons.length; i++){
		//setting up event listeners for each
		modeButtons[i].addEventListener("click", function(){
			//removing coloring from all
			for(var j = 0; j < modeButtons.length; j++){
				modeButtons[j].classList.remove("selected");
			}
			//putting back selected coloring for THIS selected
			this.classList.add("selected");
			switch (this.textContent){
				case "Easy":
					numSquares = 3;
					break;
			
				default:
					numSquares = 6;

			}
			resetBtn();
		});
	}

	resetButton.addEventListener("click", function(){
		resetBtn();
	});

	//Square event listeners
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			var index = this.id.substring(this.id.length-1,this.id.length);
			var clickedFunction = canvasArr[index];

			if(clickedFunction === pickedCanvas){
				win(clickedColor);
			}
			else{
				this.style.borderColor = "lightblue"
				this.style.background = "lightblue";
				messageDisplay.textContent = "Incorrect";
			}
		});
	}


//FUNCTIONS
function win(colore){
	messageDisplay.textContent = "Correct!";
	resetButton.textContent = "New";
	h1.style.backgroundColor = colore;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.borderColor = "#232838";
		squares[i].style.backgroundColor = colore;
	}
}


function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function pickCanvas(){
	var random = Math.floor(Math.random() * canvasArr.length);
	return canvasArr[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*206 + 50);
	//conditionls here just shake things up - make things more colorful
	if(r>200){
		var g = Math.floor(Math.random()*100 + 25);
	}
	else{
		var g = Math.floor(Math.random()*206 + 50);
	}
	var b = Math.floor(Math.random()*206 + 50);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function resetBtn(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
			squares[i].style.borderColor = "#232838";
		} else {
			squares[i].style.display = "none";
		}
	}
	makeCanvas();
	resetButton.textContent = "New";
	messageDisplay.textContent = "";
	h1.style.background = "#FF8C00";
}


//MAIN CANVAS WORK
var ids = [
	"myCanvas0", "myCanvas1", 
	"myCanvas2", "myCanvas3", 
	"myCanvas4", "myCanvas5"
]

makeCanvas();




