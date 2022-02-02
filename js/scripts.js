try{//欲知问题try一try
//进行初始化
iimg();iw();wmask();settings();
$(function(){
	//弹窗，既透露了游戏剧情，还便于判断代码是否运行。
	alert("冒险者即将要出去冒险了，不过教练觉得冒险者还要训练一下。那就训练吧！");
	//用js构建网页
	for(var i=1;i<4;i++) $("body").append("<table border=\"1\"><tr><td id=\"td"+i+"\"></td></tr></table>");
	function img(i){return $("<img>").attr({alt:"图崩了",src:"./img/"+i+".png"});}
	function button(i,oc){return img(i).click(function(){action(oc);});}
	for (var y=0;y<32;y++){ 
		for (var x=0;x<32;x++){
			$("#td1").append(img("undefined").attr("id",ynxn(y,x)));
		}
		if (y!=31) $("#td1").append("<br>");
	}
	$("#td2").append($("<code></code>").attr("id","prompt").html("欢迎进入游戏，按“玩”或按F键开始"));
	for(var i=0,a=["xiangzuotiao","tiao","xiangyoutiao","","xiangzuozou","wan","xiangyouzou","lu","u","ru","","l","play","r"];i<7;i++)
	$("#td3").append((i==3)?"<br>":button(a[i],a[i+7]));
	$("img").css("vertical-align","bottom");$("td").css("white-space","nowrap");
	$("body").append("<input type=\"text\">");
	//读取初始界面
	for (var y=0;y<32;y++){  
		for (var x=0;x<32;x++){
			loadimg(ynxn(y,x),w[S.InitialInterface][ynxn(y,x)]);
		}
	}
	//电脑按键输入
	$(document).keydown(function(event){
		switch(key.which){
			case 37:left();   break;
			case 65:left();   break;
			case 39:right();  break;
			case 68:right();  break;
			case 38:up();     break;
			case 87:up();     break;
			case 32:up();     break;
			case 81:leftup(); break;
			case 69:rightup();break;
			case 70:play();   break;
		}
	});
	/*window.onkeydown = function(key){
		var currKey=0,key=key||event;
		currKey=key.keyCode||key.which||key.charCode;
		switch(currKey){
			case 37:left();   break;
			case 65:left();   break;
			case 39:right();  break;
			case 68:right();  break;
			case 38:up();     break;
			case 87:up();     break;
			case 32:up();     break;
			case 81:leftup(); break;
			case 69:rightup();break;
			case 70:play();   break;
		}
	};*/
});
//定义变量
var world=w[S.BeginWorld],speed=S.PlayerSpeed,
	playery,playerx,playbegin=false,lock=false;
//加载贴图函数
function loadimg(ynxn,imgurl) {
	$("#"+ynxn).attr("src",
		"./img/"+((imgurl&&imglib[imgurl])?imgurl:
		(playbegin?wd():w[S.InitialInterface].defaultbg))+".png");
}
//加载世界函数
function loadworld(playery,playerx,lw) {
	world=lw||world;
	for (var y=0;y<32;y++){ 
		for (var x=0;x<32;x++){
			loadimg(ynxn(y,x),world[ynxn(y,x)]);
		}
	}
	window.playery=playery,window.playerx=playerx;
	loadimg(ynxn(playery,playerx),wd()+"player");
	$("#prompt").html("你来到了\""+world.cnname+"\"");
}
//ynxn(y,x)已被搬到world.js
function wd() {return world.defaultbg;}//背景
function wwn(direction) {return w[world[direction+"world"]];}//某方向的世界
//移动人物函数
function move(direction) {
	//把人物原位置设为背景
	loadimg(ynxn(playery,playerx),wd());
	//人物移动，并把人物所在位置设为人物
	loadimg(ynxn(
		(direction=="u")?--playery:((direction=="d")?++playery:playery),
		(direction=="l")?--playerx:((direction=="r")?++playerx:playerx)
	),wd()+"player");
}
//开始游戏函数
function play() {
	if(!playbegin/*判断游戏是否开始，没有开始则开始。*/){
		//把world设为chushengdao(出生岛)，开始游戏设为true
		playbegin=true;
		loadworld(S.BeginPlayerY,S.BeginPlayerX);//加载世界
		//alert();
		setTimeout("d()",speed*10);
	}
}
function d(){action("d");}
function action(direction) {
	if(direction=="play") return play();
	if(playbegin){
		function dr(dire){
			var dir={dir:dire},a=["u","d","l","r","lu","ru"];
			for (var x=0;x<6;x++) dir[a[x]]=(dire==a[x]);
			return dir;
		}
		var dire=dr(direction);
		if(dire.d){
			if (playery==31){
				if (wwn("d")&&wwn("d").mask[ynxn(0,playerx)]=="o"){
					loadworld(0,playerx,wwn("d"));down();
				}
			}else if(world.mask[ynxn(playery+1,playerx)]=="o"){
				move("d");d();
			}
		}else if(!lock){
			lock=true;
			function ifaction(dire){
				function ulr(a,b,c){return dr(dire).u?a:(dr(dire).l?b:(dr(dire).r?(c==undefined?b:c):false));}
				if (ulr(playery==0,playerx==0,playerx==31,false)){
					if (wwn(dire)&&wwn(dire).mask[ynxn(ulr(31,playery),ulr(playerx,31,0))]=="o"){
						loadworld(ulr(31,playery),ulr(playerx,31,0),wwn(dire));
					}
				}else if(world.mask[ynxn(playery-ulr(1,0),playerx+ulr(0,-1,1))]=="o"){
					move(dire);
				}
			}
			if(dire.lu||dire.ru){
				ifaction("u");
				setTimeout(function(){
					ifaction(dire.lu?"l":"r");
					setTimeout(function(){d();lock=false;},speed*5);
				},speed*5);
			}else{
				ifaction(dire.dir);
				setTimeout(function(){d();lock=false;},speed*10);
			}
		}
	}
}

} catch(err) { 
        alert(err.message); 
		document.write(err.message);
}
