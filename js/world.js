/*为了使用方便而搬过来的ynxn*/
function ynxn(y,x) {return "y"+y.toString(32)+"x"+x.toString(32);}
/*以下介绍世界js结构:
  -w:储存所有世界的重要对象
  --xxx:储存一个世界的东西(最好配合iw函数)
  ---defaultbg:世界默认贴图(背景)
  ---name:世界名
  ---cnname:显示出来的世界名(name不会在游戏内显示)
  ---uworld:世界上边的世界
  ---dworld:世界下边的世界
  ---lworld:世界左边的世界
  ---rworld:世界右边的世界
  ---ynxn:储存对应坐标的方块(如果为空会成为可穿过的空气方块)
  -iw():做一些复杂操作需要使用(如添加一横线方块)
  –wmask():为世界创建mask的代码
*/
var w={
	chushijiemian:{yuxd:"an",yuxe:"yuanwan",yuxf:"kai",yuxg:"shi",yuxh:"you",yuxi:"xi",defaultbg:"white",name:"chushijiemian",cnname:"初始界面"},

	chushengdao:{
		y2x3:"mutouding",y2xs:"mutouding",ytxd:"caodi",cnname:"出生岛",
		defaultbg:"skyblue",name:"chushengdao",rworld:"rworld",lworld:"lworld"},
	lworld:{yuxv:"mutouding",name:"lworld",cnname:"左世界",defaultbg:"skyblue",rworld:"chushengdao"},
	rworld:{name:"rworld",cnname:"右世界",defaultbg:"white",lworld:"chushengdao"}
};

function iw(){
	for (var x=11,y=1,z=1,o={a1:"mao",a2:"xian",a3:"dao"};x<22;x++,y++){
		if ((x-10)%4!=0) {
			for (var a=0;a<3;a++){
				w.chushijiemian[ynxn(3+a,x)]=o["a"+z]+(y+a*3);
			}
		} else z++,y=0;
	}
	for (var x=0;x<32;x++){
		//把出生岛倒数第二行作为草地
		w.chushengdao[ynxn(30,x)]="caodi";
		//把出生岛倒数第一行作为泥土
		w.chushengdao[ynxn(31,x)]="nitu";
	}
	for (var y=3;y<29;y++){
		//把出生岛第四列填上一些木头
		w.chushengdao[ynxn(y,3)]="mutou";
		//把出生岛倒数第四列填上一些木头
		w.chushengdao[ynxn(y,28)]="mutou";
	}
	//在出生岛y30,x11位置挖个坑
	w.chushengdao[ynxn(30,11)]=undefined;
	//w.chushengdao[ynxn(30,15)]=undefined;
	for (var x=0;x<32;x++){
		//在左世界倒数第一行作为木头顶
		w.lworld[ynxn(31,x)]="mutouding";
		//在右世界倒数第一行作为泥土
		w.rworld[ynxn(31,x)]="nitu";
	}
}
function wmask(){
	//可以在其中加入没必要拥有mask的世界(如初始界面)
	nomask=
	[
		"chushijiemian"
	];
	nm:for (i in w){
		//如果有世界名字和nomask中任何一项重合就不创建mask
		for(var j=0;j<nomask.length;j++){if(nomask[j]==i)continue nm;}
		w[i].mask={};
		//往所有有东西的坐标放x，没有东西的坐标放o。
		for (var y=0;y<32;y++){ 
			for (var x=0;x<32;x++){
				w[i].mask[ynxn(y,x)]=(w[i][ynxn(y,x)]!=undefined&&imglib[w[i][ynxn(y,x)]])?"x":"o";
			}
		}
	}
}
