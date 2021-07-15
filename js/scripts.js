try{//欲知问题try一try
//进行初始化
iimg();iw();wmask();settings();
window.onload=function(){//load启动
	//用js构建网页
	var te="table",tr="tr>",td="td>",o="</",tb="<"+te+" border=\"1\"><"+tr+"<"+td,to=o+td+o+tr+o+te+">",img="<img alt=\"图崩了\" src=\"./img/";
	document.write(tb);
	for (var y=0;y<32;y++){ 
		for (var x=0;x<32;x++){ 
			document.write(img+"undefined.png\" id=\""+ynxn(y,x)+"\">");
			//document.write(ynxn(y,x));
		}
		if (y!=31) document.write("<br>");
	}
	document.write(to);
	document.write(tb+"<code id=\"prompt\">欢迎进入游戏，按\"玩\"或按F键开始</code>"+to);
	document.write(tb+
		img+"xiangzuotiao.png\" onclick=\"leftup()\">"+img+"tiao.png\" onclick=\"up()\">"+img+"xiangyoutiao.png\" onclick=\"rightup()\"><br>"+
		img+"xiangzuozou.png\" onclick=\"left()\">"+img+"wan.png\" onclick=\"play()\">"+img+"xiangyouzou.png\" onclick=\"right()\">"+to);
	document.createElement("img").style.verticalAlign="bottom";document.title="冒险岛";
	//读取初始界面
	for (var y=0;y<32;y++){  
		for (var x=0;x<32;x++){
			loadimg(ynxn(y,x),w[S.InitialInterface][ynxn(y,x)]);
		}
	}
	window.onkeydown = function(key){
		var currKey=0,key=key||event;
		currKey=key.keyCode||key.which||key.charCode;
		switch(currKey){
			case 37:left();break;
			case 65:left();break;
			case 39:right();break;
			case 68:right();break;
			case 38:up();break;
			case 87:up();break;
			case 32:up();break;
			case 81:leftup();break;
			case 69:rightup();break;
			case 70:play();break;
		}
	};
};

//chushijiemian(初始界面)作为world
var world = w[S.BeginWorld];
var speed=S.PlayerSpeed;
//定义变量
var playery,playerx,playbegin=false,lru=false,lock=false,imgdire="";
function loadworld(playery,playerx,lw,dire,lru) {
	if (lw!=undefined) world = lw;
	for (var y=0;y<32;y++){ 
		for (var x=0;x<32;x++){
			loadimg(ynxn(y,x),world[ynxn(y,x)]);
		}
	}
	playerworld=world.name,window.playery=playery,window.playerx=playerx;
	if(lru){imgdire=lru;}
	else if(dire=="u"){imgdire="";}
	else if(dire=="l"){imgdire="l";}
	else if(dire=="r"){imgdire="r";}
	loadimg(ynxn(playery,playerx),wd()+imgdire+"player");
	document.getElementById("prompt").innerHTML="你来到了\""+world.cnname+"\"";
}
//加载贴图函数
function loadimg(ynxn,imgurl) {
	dg=playbegin?wd():w[S.InitialInterface].defaultbg;
	if(imglib[imgurl]){
		document.getElementById(ynxn).src="./img/"+(!imgurl?dg:imgurl)+".png";
	}else{
		document.getElementById(ynxn).src="./img/"+dg+".png";
	}
}
//ynxn(y,x)已被搬到world.js
function wd() {return world.defaultbg;}
function wwn(direction) {return w[world[direction+"world"]];}
function move(direction,lru) {
	//把人物原位置设为背景
	loadimg(ynxn(playery,playerx),wd());
	//人物移动，并把人物所在位置设为人物
	if(lru){imgdire=lru;}
	else if(direction=="u"){imgdire="";}
	else if(direction=="l"){imgdire="l";}
	else if(direction=="r"){imgdire="r";}
	loadimg(ynxn(
		((direction=="u")?--playery:((direction=="d")?++playery:playery)),
		((direction=="l")?--playerx:((direction=="r")?++playerx:playerx))
	),wd()+imgdire+"player");
}
//开始游戏函数
function play() {
	if(!(playbegin)/*判断游戏是否开始，没有开始则开始。*/){
		alert("冒险者即将要出去冒险了，不过教练觉得冒险者还要训练一下。那就训练吧！");
		//开始游戏设为true
		playbegin=true;
		loadworld(S.BeginPlayerY,S.BeginPlayerX);//加载世界
		//alert();
		//半秒后执行下落命令
		setTimeout("down()",500);
	}
}
function left() {action("l");} function right() {action("r");} 
function up() {action("u");} function down() {action("d");} 
function leftup() {action("lu");} function rightup() {action("ru");}



function action(direction) {//逻辑混乱，写不了注释，dddd
	if(playbegin/*判断游戏是否开始，没有开始则什么都不执行*/){
		var dire=direction,a=["u","d","l","r","lu","ru"];
		for (var x=0;x<a.length;x++) eval("function "+a[x]+"(){return dire==\""+a[x]+"\";}");
		var lu=lu(),ru=ru(),u=u();
		if(d()){
			if (playery==31){
				if (wwn("d")&&wwn("d").mask[ynxn(0,playerx)]=="o"){
					loadworld(0,playerx,wwn("d"));down();
				}
			}else if(world.mask[ynxn(playery+1,playerx)]=="o"){
				move("d");down();
			}
		}else if(!lock){
			lock=true;
			function ulr(a,b,c,d){return u?a:(l()?b:(r()?c:d));}
			function ifaction(dire,lru){
				if (ulr(playery==0,playerx==0,playerx==31,false)){
					if (wwn(dire)&&wwn(dire).mask[ynxn((dire=="u"?31:playery),ulr(playerx,31,0))]=="o"){
						loadworld((dire=="u"?31:playery),ulr(playerx,31,0),wwn(dire),dire,lru);
					}
				}else if(world.mask[ynxn(playery-(dire=="u"?1:0),ulr(playerx,playerx-1,playerx+1))]=="o"){
					move(dire,lru);
				}
			}
			if(lu||ru){
				if(lu){dire="l";}if(ru){dire="r";}u=true;
				ifaction("u",dire);
				setTimeout(function(){
					u=false;ifaction(dire);
					setTimeout(function(){down();lock=false;},speed*5);
				},speed*5);
			}else{
				ifaction(dire);
				setTimeout(function(){down();lock=false;},speed*10);
			}
		}
	}
}


} catch(err) { 
        alert(err.message); 
		document.write(err.message);
} 
