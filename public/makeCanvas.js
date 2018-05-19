function makeCanvas(){

	if(numSquares===3){
		canvasArr = canvasArr.splice(0,2);
	}

	for(var i = 0; i < numSquares; i++){
		var canvas = document.getElementById(ids[i]);

		var screenWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		var screenHeight = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		if(screenWidth < 450){
			canvas.width = 115;
			canvas.height = 115;
		}

		var width = canvas.width;
		var height = canvas.height;

		//canvas boundaries
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

		//canvas coordinates conversion
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

		var Faval = Math.floor(Math.random()*12 - 6);
			if(Faval===0){
				Faval = -2;
			}
		var bval = Math.random()*6 + 1;
			var bvalStr = bval.toString();
			var bvalSlicedStr = bvalStr.substring(0,4);
			var Fbval = parseFloat(bvalSlicedStr);
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
		if(pickedCanvas[2]<0){
		var pickedFunction = "Which graph is f(x) = " + pickedCanvas[0] + "cos(" + pickedCanvas[1] + "x) " + pickedCanvas[2] + "?";
		}
		else{
		var pickedFunction = "Which graph is f(x) = " + pickedCanvas[0] + "cos(" + pickedCanvas[1] + "x) + " + pickedCanvas[2] + "?";
		}
	}
	else{
		if(pickedCanvas[2]<0){
		var pickedFunction = "Which graph is f(x) = " + pickedCanvas[0] + "sin(" + pickedCanvas[1] + "x) " + pickedCanvas[2] + "?";
		}
		else{
		var pickedFunction = "Which graph is f(x) = " + pickedCanvas[0] + "sin(" + pickedCanvas[1] + "x) + " + pickedCanvas[2] + "?";
		}
	}

	functionDisplay.textContent = pickedFunction;
}
