//VARIABLES
var canvasArr = [];
var sinxOn = false;
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll("canvas");
var pickedColor = pickColor();
var pickedCanvas = pickCanvas();
var functionDisplay = document.getElementById("functionDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var hardMode = true;
var switchFuncs = document.getElementById("switchFuncs");

hardBtn.classList.add("selected");


///EVENT LISTENERS
switchFuncs.addEventListener("click", function(){
	sinxOn = !sinxOn;
	resetBtn();
});

for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		for(var j = 0; j < modeButtons.length; j++){
			modeButtons[j].classList.remove("selected");
		}
		this.classList.add("selected");
		switch (this.textContent){
			case "Easy":
				numSquares = 3;
				hardMode = false;
				break;
		
			default:
				numSquares = 6;
				hardMode = true;

		}
		resetBtn();
	});
}

resetButton.addEventListener("click", function(){
	resetBtn();
});

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
			this.style.background = "#003F87";
			messageDisplay.textContent = "Try Again";
		}
	});
}


//FUNCTIONS
/////////////////////////////////////////////////
function win(colore){
	messageDisplay.textContent = "Correct!";
	resetButton.textContent = "Play Again?";
	h1.style.backgroundColor = colore;
	console.log(colore);
	changeColors(colore);
}

function changeColors(fx){
	for(var i = 0; i < fx.length; i++){
		squares[i].style.backgroundColor = fx;
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
	var g = Math.floor(Math.random()*206 + 50);
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
		} else {
			squares[i].style.display = "none";
		}
	}
	makeCanvas();
	resetButton.textContent = "New";
	messageDisplay.textContent = "";
	h1.style.background = "#FF8C00";
}


//CANVAS
/////////////////////////////////////////////////
var ids = [
	"myCanvas0", "myCanvas1", 
	"myCanvas2", "myCanvas3", 
	"myCanvas4", "myCanvas5"
]

function randomVal(){
	return Math.floor(Math.random()*140 + 20);
}

function getRandomFunction(){
	return canvasArr[Math.floor(Math.random()*6)];
}

makeCanvas();

function makeCanvas(){

	if(numSquares===3){
		canvasArr = canvasArr.splice(0,2);
	}

	for(var i = 0; i < numSquares; i++){
		var canvas = document.getElementById(ids[i]);

		var width = canvas.width;
		var height = canvas.height;

		//viewport boundaries
		function MaxX(){
			return 10;
		}

		function MinX(){
			return -10;
		}

		function MaxY(){
			return 10;
		}

		function MinY(){
			return -10;
		}

		//viewport coordinates conversion
		function XC(x){
			return (x - MinX()) / (MaxX() - MinX()) * width;
		}

		function YC(y){
			return height - (y-MinY()) / (MaxY() - MinY()) * height;
		}


		var context = canvas.getContext("2d");
		context.clearRect(0,0,width,height);

		///////////////////////////////////////////////

		//tick distance x and y axis
		function XTickDelta(){
			return 1;
		}

		function YTickDelta(){
			return 1;
		}

		function drawAxes() {
		 context.save() ;
		 context.lineWidth = 2 ;
		 // +Y axis
		 context.beginPath() ;
		 context.moveTo(XC(0),YC(0)) ;
		 context.lineTo(XC(0),YC(MaxY())) ;
		 context.stroke() ;

		 // -Y axis
		 context.beginPath() ;
		 context.moveTo(XC(0),YC(0)) ;
		 context.lineTo(XC(0),YC(MinY())) ;
		 context.stroke() ;

		 // Y axis tick marks
		 var delta = YTickDelta() ;
		 for (var i = 1; (i * delta) < MaxY() ; ++i) {
		  context.beginPath() ;
		  context.moveTo(XC(0) - 5,YC(i * delta)) ;
		  context.lineTo(XC(0) + 5,YC(i * delta)) ;
		  context.stroke() ;  
		 }

		 var delta = YTickDelta() ;
		 for (var i = 1; (i * delta) > MinY() ; --i) {
		  context.beginPath() ;
		  context.moveTo(XC(0) - 5,YC(i * delta)) ;
		  context.lineTo(XC(0) + 5,YC(i * delta)) ;
		  context.stroke() ;  
		 }  

		 // +X axis
		 context.beginPath() ;
		 context.moveTo(XC(0),YC(0)) ;
		 context.lineTo(XC(MaxX()),YC(0)) ;
		 context.stroke() ;

		 // -X axis
		 context.beginPath() ;
		 context.moveTo(XC(0),YC(0)) ;
		 context.lineTo(XC(MinX()),YC(0)) ;
		 context.stroke() ;

		 // X tick marks
		 var delta = XTickDelta() ;
		 for (var i = 1; (i * delta) < MaxX() ; ++i) {
		  context.beginPath() ;
		  context.moveTo(XC(i * delta),YC(0)-5) ;
		  context.lineTo(XC(i * delta),YC(0)+5) ;
		  context.stroke() ;  
		 }

		 var delta = XTickDelta() ;
		 for (var i = 1; (i * delta) > MinX() ; --i) {
		  context.beginPath() ;
		  context.moveTo(XC(i * delta),YC(0)-5) ;
		  context.lineTo(XC(i * delta),YC(0)+5) ;
		  context.stroke() ;  
		 }
		 context.restore() ;
		}


		var XSTEP = (MaxX()-MinX())/width ;

		var bval = Math.random()*6 + 1;
			var bvalStr = bval.toString();
			var bvalSlicedStr = bvalStr.substring(0,4);
			var Fbval = parseFloat(bvalSlicedStr);
		var aval = Math.random()*9 - 4.5;
			var avalStr = aval.toString();
			var avalSlicedStr = avalStr.substring(0,4);
			var Faval = parseFloat(avalSlicedStr);
		var cval = Math.random()*9 - 4.5;
			var cvalStr = cval.toString();
			var cvalSlicedStr = cvalStr.substring(0,4);
			var Fcval = parseFloat(cvalSlicedStr);

		canvasArr[i] = [Faval, Fbval, Fcval];

		if(!sinxOn){
			var F = function(x) {
			  return (Faval*Math.cos(Fbval*x) + Fcval);
			}
		}
		else{
			var F = function(x) {
				return (Faval*Math.sin(Fbval*x) + Fcval);
			}
		}
			 

		function RenderFunction(f) {
		  var first = true;

		  context.beginPath() ;
			  for (var x = MinX(); x <= MaxX(); x += XSTEP) {
			  	var y = f(x) ;
				   if (first) {
				  	 context.moveTo(XC(x),YC(y)) ;
				  	 first = false ;
				   } else {
				  	 context.lineTo(XC(x),YC(y)) ;
				   }
			  }
		  context.stroke() ;
		}


		/////////////////////////////////
		//RUN THINGS!
		drawAxes();
		RenderFunction(F);
	}

	pickedCanvas = pickCanvas();
	if(!sinxOn){
		var pickedFunction = pickedCanvas[0] + "cos(" + pickedCanvas[1] + "x) + " + pickedCanvas[2];
	}
	else{
		var pickedFunction = pickedCanvas[0] + "sin(" + pickedCanvas[1] + "x) + " + pickedCanvas[2];
	}
	functionDisplay.textContent = pickedFunction;
}


///////////////////////////////////////////////////


