// JavaScript Document
/* 1、事件源  2、连续事件   3、4、getByclassName  5、获取当前样式   6、事件绑定  7、鼠标滚轮事件   8、选中文字  9、阻止冒泡   10、阻止默认事件   11、弹性菜单(运动框架) 12、input兼容ie8  13、1px兼容问题 14、苹果  15、深拷贝     16.input type="file"样式的修改   17.fontface(字体) 18.清除按钮  19.获取图片的原始 宽 、高
*/

/*
var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />	
*/
// 字体phone：font-family: 微软雅黑', 'Microsoft Yahei',"Helvetica Neue", Helvetica, STHeiTi, sans-serif; body{font-family:Helvetica;}
// font-family: 微软雅黑,Microsoft YaHei,SimHei,NSimSun;
//PC:font-family: '微软雅黑', 'Microsoft Yahei',  Helvetica, 'Hiragino Sans GB',Arial, sans-serif;

//1、事件源 在父级上加事件，波及子级  nodeName可找出子元素  (事件委托)
父级事件=function(ev){	
	var ev=ev||window.event;
	var target=ev.target||ev.srcElement;
}
/*oUl.onmouseover=function(ev){	
	var ev=ev||window.event;
	var target=ev.target||ev.srcElement;
	if (target.nodeName.toLowerCase()=='li'){
		target.style.background='red';
	}
}*/




//2、连续事件
var ie=!-[1,];
if(ie){	
	onpropertychange=function(){};
}
else {
	oninput=function(){

	}
}

//3、getByclassName 兼容性问题  //单个class=one不能连等;
//调用函数，实参className加引号！
var getByclassName=function(oParent,className){	
	var all=oParent.getElementsByTagName('*');
	var result=[];
	for (var i=0; i<all.length;i++){	
		//if (all[i].getAttribute('class')==className){	
		if(all[i].className==className){	
			result.push(all[i]);
		}
	}
	return result;
}

/*4、getByclassName 兼容性问题  单个class=one two 可能连等;*/
//调用函数，实参className加引号！
var getByclassName=function(oParent,className){	
	var all=oParent.getElementsByTagName('*');
	var result=[];
	var re=new RegExp('\\b'+className+'\\b')
	
	for (var i=0; i<all.length;i++){	
		//if (all[i].getAttribute('class')==className){	
		if(re.test(all[i].className)){
			result.push(all[i]);
		}
	}
	return result;
}

//5、获取当前样式
function getStyle(obj,attr){	
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

// 6、事件绑定
//iE:下对象.attachEvent('事件名'， 函数)
//解除detachEvent('事件名'， 函数)
//ff:对象.addEventListener('不带on的事件名'， 函数，是否捕获)
//解除：removeEventListener('不带on的事件名'， 函数，是否捕获)
//事件不带on,且加引号; 
function MyAddEvent (obj,sEvent,fn)
{	
	if(obj.attachEvent)
	{	
		obj.attachEvent('on'+sEvent,fn);
	}
	else
	{	
		obj.addEventListener(sEvent,fn,false);
	}
}
/*7、鼠标滚轮事件  与事件绑定函数一起使用*/
function onMouseWheel(ev)
	{	
		var oEvent=ev||event;
		var bDown=true;
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		if(bDown)   //滚轮向下滚动
		{	
			oDiv.style.height=oDiv.offsetHeight+10+'px';
		}
		else
		{	
			oDiv.style.height=oDiv.offsetHeight-10+'px';
		}
		if(oEvent.preventDefault)   //FF下addEventListener用preventDefault阻止莫认事件；
		{	
			oEvent.preventDefault();
		}
		
		return false;
		
	}
	MyAddEvent(oDiv,'mousewheel',onMouseWheel);    //MyAddEvent为自定义函数。事件绑定在上面;
	MyAddEvent(oDiv,'DOMMouseScroll',onMouseWheel);


/*8、选中文字*/
function selectText()
{	
	if(document.selection)
	{	
		return document.selection.createRange().text;
	}
	else
	{	
		return window.getSelection().toString();
	}
}


/*9、阻止冒泡*/
input.onclick =function(ev){//阻止冒泡
	window.event?window.event.cancelBubble = true:ev.stopPropagation();
}

function stopBubble(ev)//阻止事件冒泡函数
{
	if (ev && ev.stopPropagation)
		ev.stopPropagation()
	else
	window.event.cancelBubble=true
}   


/*10、阻止默认事件*/
A.onclick=function(ev)
	{	
		var oEvent=ev||window.event;
		if(oEvent.preventDefault)
		{	
			oEvent.preventDefault();
		}
		else
		{	
			oEvent.returnValue=false;
		}
	}

/*11、 弹性菜单（运动构架）*/
	var iSpeed=0;
	var left=0;
	function startMove(obj,iTarget)
	{	
		clearInterval(obj.timer);
		obj.timer=setInterval(function()
		{
			iSpeed+=(iTarget-obj.offsetLeft)/5;
			iSpeed*=0.8;
			left+=iSpeed;           //变量误差相加
			if (Math.abs(iSpeed)<1&&Math.abs(left-iTarget)<1)
			{
				obj.style.left=iTarget+'px';
				clearInterval(obj.timer);
			}
			else
			{
				obj.style.left=left+'px';
			}
		//console.log(obj.style.left)
		},30);
	}

	// 12.input兼容ie8
	/* $(function () {
        if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {                  
                    input.val('');
                    input.removeClass('placeholder');
                }
                
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        };
    })
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }*/


    //13、   1px兼容问题
.BorderTop,.BorderBottom,.BorderLeft,.BorderRight,.BorderAb { position: relative;}
.BorderTop:before,.BorderBottom:after {pointer-events: none;position: absolute;content: ""; height: 1px; background: rgba(32,35,37,.24);left: 0;right: 0}
.BorderTop:before {top: 0}
.BorderBottom:after {bottom: 0}
.BorderLeft:before,.BorderRight:after {pointer-events: none;position: absolute;content: ""; width: 1px; background: rgba(32,35,37,.24); top: 0; bottom: 0}
.BorderLeft:before {left: 0}
.BorderRight:after {right: 0}
.BorderAb:after {position: absolute;content: "";top: 0;left: 0; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; height: 100%; border: 1px solid rgba(32,35,37,.24); pointer-events: none}
 
@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5),(min-resolution: 144dpi),(min-resolution:1.5dppx) {
.BorderTop:before,.BorderBottom:after {-webkit-transform:scaleY(.5);transform: scaleY(.5) }
.BorderLeft:before,.BorderRight:after {-webkit-transform: scaleX(.5); transform: scaleX(.5) }
.BorderAb:after { width: 200%; height: 200%;-webkit-transform: scale(.5); transform: scale(.5) }
.BorderTop:before,.BorderLeft:before,.BorderAb:after {-webkit-transform-origin: 0 0;transform-origin: 0 0}
.BorderBottom:after,.BorderRight:after { -webkit-transform-origin: 100% 100%;transform-origin: 100% 100%}
}
 
@media (-webkit-device-pixel-ratio:1.5) {
.BorderTop:before,.BorderBottom:after { -webkit-transform: scaleY(.6666); transform: scaleY(.6666) }
.BorderLeft:before,.BorderRight:after {-webkit-transform: scaleX(.6666); transform: scaleX(.6666)}
.BorderAb:after {width: 150%; height: 150%;-webkit-transform: scale(.6666); transform: scale(.6666) }
}
 
@media (-webkit-device-pixel-ratio:3) {
.BorderTop:before,.BorderBottom:after { -webkit-transform: scaleY(.3333); transform: scaleY(.3333)}
.BorderLeft:before,.BorderRight:after { -webkit-transform: scaleX(.3333); transform: scaleX(.3333)}
.BorderAb:after {width: 300%;height: 300%; -webkit-transform: scale(.3333);transform: scale(.3333)}
}

//14.苹果样式
//4s专属样式
@media screen and (min-device-height:370px) and (max-device-height:485px){}
//5s专属样式
@media screen and (min-device-height:560px) and (max-device-height:570px){}
//6s专属样式
@media screen and (min-device-height:571px) and (max-device-height:670px){}

//15.深拷贝
function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}
var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港

 16.input type="file"样式的修改
 css 
.file-box{ position:relative;width:340px}
.txt{ height:22px; border:1px solid #cdcdcd; width:180px;} 
.btn{ background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:70px;} 
.file{ position:absolute; top:0; right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px } 


<div class="file-box"> 
	<form action="" method="post" enctype="multipart/form-data"> 
		<input type='text' name='textfield' id='textfield' class='txt' /> 
		<input type='button' class='btn' value='浏览...' /> 
		<input type="file" name="fileField" class="file" id="fileField" size="28" onchange="document.getElementById('textfield').value=this.value" /> 
		<input type="submit" name="submit" class="btn" value="上传" /> 
	</form> 
</div> 

17.font ('字体')
@font-face
 {
  font-family:'NeuesBauenDemo';
  src:url('../fonts/neues_bauen_demo-webfont.eot');
  src:url('../fonts/neues_bauen_demo-webfont.eot?#iefix')format('embedded-opentype'),
   url('../fonts/neues_bauen_demo-webfont.woff')format('woff'),
   url('../fonts/neues_bauen_demo-webfont.ttf')format('truetype'),
   url('../fonts/neues_bauen_demo-webfont.svg#NeuesBauenDemo')format('svg');
  font-weight:normal;
  font-style:normal;
}

18.清除按钮
::-ms-clear,::-ms-reveal{display:none;}
.input { padding: 5px; margin: 0; border: 1px solid #beceeb; }
.clear { display: none; position: absolute; width: 16px; height: 16px; margin: 6px 0 0 -20px; background: url(clear.png) no-repeat; outline: none; }
.input::-ms-clear { display: none; }
.input:valid + .clear { display: inline; }
HTML代码：
输入任意内容：<input class="input" required><a href="javascript:" class="clear"></a>

19.原始图片的宽度和高度
(function($){
    var
    props = ['Width', 'Height'],
    prop;

    while (prop = props.pop()) {
    (function (natural, prop) {
      $.fn[natural] = (natural in new Image()) ? 
      function () {
      return this[0][natural];
      } : 
      function () {
      var 
      node = this[0],
      img,
      value;

      if (node.tagName.toLowerCase() === 'img') {
        img = new Image();
        img.src = node.src,
        value = img[prop];
      }
      return value;
      };
    }('natural' + prop, prop.toLowerCase()));
    }
  }(jQuery));

  // 如何使用:
  var 
  nWidth = $('img#example').naturalWidth(),
  nHeight = $('img#example').naturalHeight();