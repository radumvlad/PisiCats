var matrixForRoad,matrixForPrev;
var lines=17,cols=31;
var tds,trs,tb;
var p1,p2,gold,p3;
var l1=1,l2=1,c1=1,c2=cols-1;
var roadLines,roadCols,iter=0;
var intervall;


p1=document.createElement("img");
p1.src="cat1.bmp";
p2=document.createElement("img");
p2.src="cat2.bmp";
gold=document.createElement("img");
gold.src="milk.bmp";
p3=document.createElement("img");
p3.src="cat3.bmp";

var clock=setInterval("setDate();",1000);
var logoInterval=setInterval("logoJump();",10);
var dlogo=5;

function settings()
{
this.name="";
this.sound=false;
this.speed=2;

this.playSound=function()
{
document.getElementById("audio").play();
}
this.pauseSound=function()
{
document.getElementById("audio").pause();
}
}

mySettings=new settings();

function changeText(string)
{
document.getElementById("textDiv").innerHTML=string;
}

Number.prototype.randomInt=function(var1)
{
return (Math.ceil(Math.random()*(parseInt(var1)-1)));
}

function showOptions()
{
var div1=document.getElementById("newGameOptions");

if(div1.style.display=="none")
	div1.style.display="inline";
else
	div1.style.display="none";
}

function fillForRoad(l,c,i,lprev,cprev)
{
if(matrixForRoad[l][c]!=-1 && i<matrixForRoad[l][c])
  {
  matrixForRoad[l][c]=i;
  matrixForPrev[l][c]=lprev + " " + cprev;
  
  fillForRoad(l-1,c,i+1,l,c);
  fillForRoad(l+1,c,i+1,l,c);
  fillForRoad(l,c-1,i+1,l,c);
  fillForRoad(l,c+1,i+1,l,c);
  }

}

function getTheRoad()
{
roadLines=new Array();
roadCols=new Array();
var l=lines-1,c=(cols-1)/2;
var newl,newc;
while(l!=-1)
{
	roadLines.push(l);
	roadCols.push(c);
	newl=parseInt(matrixForPrev[l][c].split(" ")[0]);
	newc=parseInt(matrixForPrev[l][c].split(" ")[1]);
	l=newl;
	c=newc;
}
}

function atStart()
{
var div1=document.getElementById("firstPageDiv");
var div2=document.getElementById("gameDiv");
var div3=document.getElementById("aboutDiv");


div1.style.display="inline";
div2.style.display="none";
div3.style.display="none";
}

function fill(l,c)
{
if(tds[l][c].vall==0 || tds[l][c].vall==3)
  {
  tds[l][c].vall=2;
  fill(l-1,c);
  fill(l+1,c);
  fill(l,c-1);
  fill(l,c+1);
  }
}

function reset(x)
{
for(var i=0;i<=lines;i++)
	for(var j=0;j<=cols;j++)
		if(tds[i][j].vall==x)
			tds[i][j].vall=0;
}

function resetEverything()
{
for(var i=0;i<=lines;i++)
	for(var j=0;j<=cols;j++)
			tds[i][j].vall=0;
}

function borded()
{
var i;
for(i=0;i<=lines;i++)
  {
  tds[i][0].vall=1;
  tds[i][cols].vall=1;
  }
  
for(i=0;i<=cols;i++)
  {
  tds[0][i].vall=1;
  tds[lines][i].vall=1;
  }
}

function f321(x)
{
document.getElementById("timer").innerHTML=x;
}

function gameVsComputer()
{
var div1=document.getElementById("firstPageDiv");
var div2=document.getElementById("gameDiv");
var div3=document.getElementById("aboutDiv");

div1.style.display="none";
div2.style.display="inline";
div3.style.display="none";

newGame();


var i,j;
matrixForRoad=new Array();
matrixForPrev=new Array();

for(i=0;i<=lines;i++)
	{
	matrixForRoad[i]=new Array();
	matrixForPrev[i]=new Array();
	for(j=0;j<=cols;j++)
		if(tds[i][j].vall==1)
			matrixForRoad[i][j]=-1;
		else
			matrixForRoad[i][j]=80;
	}
fillForRoad(1,cols-1,1,-1,-1);

getTheRoad();

roadLines.reverse();
roadCols.reverse();


setTimeout("f321(3)",0);
setTimeout("f321(2)",1000);
setTimeout("f321(1)",2000);
setTimeout(function()
{
intervall=setInterval("goComputer();",900/(mySettings.speed+1)); 
f321(""); 
//-- set onkey on body
document.getElementById("body").setAttribute("onkeydown","whilePlayingVsComputer(event);");
},3000);
}

function goComputer()
{

if(iter<roadLines.length-1)
{	
if(iter!=0)
	{
	if(tds[roadLines[iter-1]][roadCols[iter-1]].vall==5)
		tds[roadLines[iter-1]][roadCols[iter-1]].vall=3;
	else
		tds[roadLines[iter-1]][roadCols[iter-1]].vall=2;
		
	loadOnMatrix(roadLines[iter-1],[roadCols[iter-1]]);
	}
	if(tds[roadLines[iter]][roadCols[iter]].vall==3)
		tds[roadLines[iter]][roadCols[iter]].vall=5;
	else
		tds[roadLines[iter]][roadCols[iter]].vall=4;
		
	loadOnMatrix(roadLines[iter],[roadCols[iter]]);
}
else
	{
	
	if(tds[roadLines[iter-1]][roadCols[iter-1]].vall==5)
		tds[roadLines[iter-1]][roadCols[iter-1]].vall=3;
	else
		tds[roadLines[iter-1]][roadCols[iter-1]].vall=2;
		
	loadOnMatrix(roadLines[iter-1],[roadCols[iter-1]]);
	
	tds[roadLines[iter]][roadCols[iter]].vall=4;
	loadOnMatrix(roadLines[iter],[roadCols[iter]]);
	clearInterval(intervall);
	alert("you're pretty weak aren't u?");
	endOfGame();
	}
iter++;	
}

function gameVsPlayer()
{
var div1=document.getElementById("firstPageDiv");
var div2=document.getElementById("gameDiv");
var div3=document.getElementById("aboutDiv");

div1.style.display="none";
div2.style.display="inline";
div3.style.display="none";

newGame();

setTimeout("f321(3)",0);
setTimeout("f321(2)",1000);
setTimeout("f321(1)",2000);
setTimeout(function()
{
f321(""); 
//-- set onkey on body
document.getElementById("body").setAttribute("onkeydown","whilePlayingVsPlayer(event);");
},3000);
}

function endOfGame()
{
delete matrixForPrev;
delete matrixForRoad;
delete tb;
delete tds;
delete roadCols;
delete roadLines;
both=false;
iter=1;
l1=1;
l2=1;
c1=1;
c2=cols-1;

var div1=document.getElementById("firstPageDiv");
var div2=document.getElementById("gameDiv");
var div3=document.getElementById("aboutDiv");

div1.style.display="inline";
div2.style.display="none";
div3.style.display="none";
div2.innerHTML='<p id="timer"></p>';
document.getElementById("body").setAttribute("onkeydown",0);
clock=setInterval("setDate();",1000);
}

function newGame()
{
//--get the clock out
clearInterval(clock);
document.getElementById("clockDiv").innerHTML="";


//--get width for items(tds) and for the margin after so it stays in middle
var itemWidth,itemHeight;
itemWidth=Math.floor(window.innerWidth/(cols-1));
itemHeight=Math.floor(window.innerHeight/(lines-1));

var marginTop=window.innerHeight - itemHeight*(lines-1);
var marginLeft=window.innerWidth - itemWidth*(cols-1);

//--matrix with values
tds=new Array();
var i,j;
for(i=0;i<=lines;i++)
	{
	tds[i]=new Array();
	for(j=0;j<=cols;j++)
		tds[i][j]=document.createElement("td");
	}

resetEverything();
borded();

tds[1][1].vall=3;
tds[1][cols-1].vall=3;
tds[lines-1][(cols-1)/2].vall=3;

for(i=0;i<=((lines+cols)/2)*((lines+cols)/2)/2;i++)
{
var	l=0,c=0;
while(tds[l][c].vall!=0)
{
l=(new Number).randomInt(lines);
c=(new Number).randomInt(cols);
}

tds[l][c].vall=1;

fill(1,1);
if(tds[1][cols-1].vall==3 || tds[lines-1][(cols-1)/2].vall==3)
	tds[l][c].vall=0;
	
reset(2);

tds[1][1].vall=3;
tds[1][cols-1].vall=3;
tds[lines-1][(cols-1)/2].vall=3;
}

tds[1][1].vall=3;
tds[1][cols-1].vall=4;
tds[lines-1][(cols-1)/2].vall=6;

//--table as matrix
trs=new Array();
tb=document.createElement("table");

tb.style.marginTop=Math.floor(marginTop/2) + "px" ;
tb.style.marginLeft=Math.floor(marginLeft/2) + "px" ;

for(i=1;i<lines;i++)	
	{
	trs[i]=document.createElement("tr");
	for(j=1;j<cols;j++)
		{
		tds[i][j].style.height=itemHeight + "px";
		tds[i][j].style.width=itemWidth + "px" ;
		if(tds[i][j].vall==1)
			{
			var zid=document.createElement("img");
			zid.src="zid.bmp";
			tds[i][j].appendChild(zid);
			}
		else
		if(tds[i][j].vall==0)
			{
			var drum=document.createElement("img");
			drum.src="road.bmp";
			tds[i][j].appendChild(drum);
			}
		trs[i].appendChild(tds[i][j]);
		}
	tb.appendChild(trs[i]);
	}
tds[1][1].appendChild(p1);
tds[1][cols-1].appendChild(p2);
tds[lines-1][(cols-1)/2].appendChild(gold);

document.getElementById("gameDiv").appendChild(tb);
}

function loadOnMatrix(roww,coll)
{
/*
0-liber
1-zid
2-a trecut pe acolo
3-p1
4-p2
5-p1+p2
*/
tds[roww][coll].innerHTML="";
if(tds[roww][coll].vall==2)
{
	var new2=document.createElement("img");
	new2.src="paw.bmp";
	tds[roww][coll].appendChild(new2);
}
else
if(tds[roww][coll].vall==3)
	tds[roww][coll].appendChild(p1);
else
if(tds[roww][coll].vall==4)
	tds[roww][coll].appendChild(p2);
else
if(tds[roww][coll].vall==5)
	tds[roww][coll].appendChild(p3);
}

function whilePlayingVsComputer(e)
{
if(e.keyCode==37 && tds[l1][c1-1].vall!=1)
	{
	if(tds[l1][c1]==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	c1=c1-1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==38 && tds[l1-1][c1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	l1=l1-1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==39 && tds[l1][c1+1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	c1=c1+1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==40 && tds[l1+1][c1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	l1=l1+1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}

	
if(l1==lines-1 && c1==(cols-1)/2)
	{
	alert("congrats "+mySettings.name);
	clearInterval(intervall);
	endOfGame();
	}

}

function whilePlayingVsPlayer(e)
{

if(e.keyCode==37 && tds[l1][c1-1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	c1=c1-1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==38 && tds[l1-1][c1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	l1=l1-1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==39 && tds[l1][c1+1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	c1=c1+1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
else
if(e.keyCode==40 && tds[l1+1][c1].vall!=1)
	{
	if(tds[l1][c1].vall==5)
		tds[l1][c1].vall=4;
	else
		tds[l1][c1].vall=2;
	
	loadOnMatrix(l1,c1);
		
	l1=l1+1;
	
	if(tds[l1][c1].vall==4)
		tds[l1][c1].vall=5;
	else
		tds[l1][c1].vall=3;
	
	loadOnMatrix(l1,c1);
	}
	
if(e.keyCode==65 && tds[l2][c2-1].vall!=1)
	{
	if(tds[l2][c2].vall==5)
		tds[l2][c2].vall=3;
	else
		tds[l2][c2].vall=2;
	
	loadOnMatrix(l2,c2);
		
	c2=c2-1;
	
	if(tds[l2][c2].vall==3)
		tds[l2][c2].vall=5;
	else
		tds[l2][c2].vall=4;
	
	loadOnMatrix(l2,c2);
	}
else
if(e.keyCode==87 && tds[l2-1][c2].vall!=1)
	{
	if(tds[l2][c2].vall==5)
		tds[l2][c2].vall=3;
	else
		tds[l2][c2].vall=2;
	
	loadOnMatrix(l2,c2);
		
	l2=l2-1;
	
	if(tds[l2][c2].vall==3)
		tds[l2][c2].vall=5;
	else
		tds[l2][c2].vall=4;
	
	loadOnMatrix(l2,c2);
	}
else
if(e.keyCode==68 && tds[l2][c2+1].vall!=1)
	{
	if(tds[l2][c2].vall==5)
		tds[l2][c2].vall=3;
	else
		tds[l2][c2].vall=2;
	
	loadOnMatrix(l2,c2);
		
	c2=c2+1;
	
	if(tds[l2][c2].vall==3)
		tds[l2][c2].vall=5;
	else
		tds[l2][c2].vall=4;
	
	loadOnMatrix(l2,c2);
	}
else
if(e.keyCode==83 && tds[l2+1][c2].vall!=1)
	{
	if(tds[l2][c2].vall==5)
		tds[l2][c2].vall=3;
	else
		tds[l2][c2].vall=2;
	
	loadOnMatrix(l2,c2);
		
	l2=l2+1;
	
	if(tds[l2][c2].vall==3)
		tds[l2][c2].vall=5;
	else
		tds[l2][c2].vall=4;
	
	loadOnMatrix(l2,c2);
	}
	
	
if(l1==lines-1 && c1==(cols-1)/2)
	{
	alert("congrats p1");
	endOfGame();
	}
else
if(l2==lines-1 && c2==(cols-1)/2)
	{
	alert("congrats p2");
	endOfGame();
	}
}

function showSettings()
{
window.open("2.html","",'width=600,height=350');
}

function about()
{
var div1=document.getElementById("firstPageDiv");
var div3=document.getElementById("aboutDiv");

//var text = document.createTextNode('Mmm ... something');
document.getElementById("visitor").innerHTML="Welcome " + mySettings.name;
div3.style.display="block";
div1.style.display="none";
howMuch=Math.floor(window.innerHeight/3);
div3.style.top=howMuch+"px";
}

function setDate()
{
var ceas=document.getElementById("clockDiv");
var date=new Date();
ceas.innerHTML=date;
}

function about1()
{
var div=document.getElementById("aboutMe");
if(div.style.display=="none")
div.style.display="inline-block";
else
div.style.display="none";
}

function about2()
{
var div=document.getElementById("aboutGame");
if(div.style.display=="none")
div.style.display="inline-block";
else
div.style.display="none";
}

function back()
{
document.getElementById("aboutDiv").style.display="none";
document.getElementById("firstPageDiv").style.display="inline";
}

function logoJump()
{


var x=document.getElementById("logoImg");
if(x.style.top=="")
{
x.style.top=dlogo+"px";
}
else
{
x.style.top=parseInt(x.style.top) + dlogo + "px";
}

var height=parseInt(window.innerHeight) - parseInt(x.height);

if(parseInt(x.style.top) > (height-dlogo) )
	dlogo*=-1;
if(parseInt(x.style.top) < (dlogo*(-1)) )
	dlogo*=-1;
}