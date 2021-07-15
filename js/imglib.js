var imglib={
	xiangzuotiao:"y",
	tiao:"y",
	xiangyoutiao:"y",
	xiangzuozou:"y",
	wan:"y",
	xiangyouzou:"y",
	
	black:"c",
	blue:"c",
	cyan:"c",
	green:"c",
	orange:"c",
	red:"c",
	skyblue:"c",
	violet:"c",
	white:"c",
	yellow:"c",
	
	an:"i",
	yuanwan:"i",
	kai:"i",
	shi:"i",
	you:"i",
	xi:"i",
	
	caodi:"i",
	nitu:"i",
	mutou:"i",
	mutouding:"i",
	
	skyblueplayer:"i",
	skybluelplayer:"i",
	skybluerplayer:"i",
	whiteplayer:"i",
	whitelplayer:"i",
	whiterplayer:"i",
	
	mao:"n",
	xian:"n",
	dao:"n",
	skybluehighplayer:"n",
	whitehighplayer:"n",
	
	undefined:"u"
};
/*
	img库，拥有所有贴图的名字。
	y，代表下方的按键贴图
	c，代表背景贴图
	i，最常见的方块贴图
	n，游戏内不调用，如大图:
		游戏文件内会同时有切分完了的图和未切分大图，
		此时未切分大图永远不会被调用，属于n
	u，bug贴图，为纯黑(其实黑紫色块更好(bushi))
*/
function iimg(){
	for(var i=0;i<9;i++) imglib["mao"+(i+1)]="i";
	for(var i=0;i<9;i++) imglib["xian"+(i+1)]="i";
	for(var i=0;i<9;i++) imglib["dao"+(i+1)]="i";
	for(var i=0;i<2;i++) imglib["skybluehighplayer"+(i+1)]="i";
	for(var i=0;i<2;i++) imglib["whitehighplayer"+(i+1)]="i";
	//用for登记切割大图
}
