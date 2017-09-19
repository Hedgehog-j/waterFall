window.onload=function(){
	WFDemo.waterfallActive("waterfall","WFBox");
}
//瀑布流布局函数
function Waterfall(){

}
Waterfall.prototype={
	waterfallActive:function(parentClass,childClass){
		var _parentClass=Waterfall.prototype.getParentNode(parentClass);
		var _child=Waterfall.prototype.getAllChildClass(_parentClass,childClass);
		var _boxWidth=Waterfall.prototype.getBoxWidth(_child);
		var _cols=Waterfall.prototype.getCols(_boxWidth);
		Waterfall.prototype.setWaterfallWidth(_child,_cols,_parentClass);
		Waterfall.prototype.setWFBoxPos(_cols,_child,_boxWidth);
	},
	//获取父节点，提取出来便于复用
	getParentNode:function(parentClass){
		var parentClass=document.getElementById(parentClass);
		return parentClass
	},
	//获取parentClass下所有childCLss，确保只有一个childClass时可简化以提高性能
	getAllChildClass:function(parentNode,childClass){
	//创建储存子元素的数组
	var allChildArr=new Array(),
	allParentChild=parentNode.getElementsByTagName("*");
	//遍历父元素下所有子元素，并将匹配的子元素推入数组
	for (var i=0,parentLength=allParentChild.length;i<parentLength;i++){
		if(allParentChild[i].className==childClass){
			allChildArr.push(allParentChild[i]);	
		}
	}
	return allChildArr;
	},
	//计算出单个盒子宽度
	getBoxWidth:function(boxArray){
		return boxArray[0].offsetWidth;
	},
	//计算瀑布流列数
	getCols:function(BoxWidth){
		return Math.floor(document.documentElement.clientWidth/BoxWidth);
	},
	//根据列数计算并设置waterfall的宽度并令其居中
	setWaterfallWidth:function(boxArray,cols,parentNode){
	var WFBoxWidth=boxArray[0].offsetWidth,
		WaterfallWidth=cols*WFBoxWidth;
	parentNode.style.cssText="width:"+WaterfallWidth+"px;margin:0 auto;";
	},
	//获取数组中最小值的索引
	getMinIndex:function(array,value){
		for(var i in array){
			if(array[i]==value){
				return i;
			}
		}
	},
	//根据列数、瀑布流图像宽度以及子类的数组来设置第一列后的图片绝对定位，以至于实现瀑布流布局
	setWFBoxPos:function(cols,childArray,BoxWidth){
		var arrLen=cols,
			colsHeightArr = new Array(arrLen);
		for(var i=0,childArrayLength=childArray.length;i<childArrayLength;i++){
			if(i<arrLen){
				colsHeightArr[i]=childArray[i].offsetHeight;
				childArray[i].style.top=0+"px";
				childArray[i].style.left=i*BoxWidth+"px";
			}else{
				var minHeight=Math.min.apply(null,colsHeightArr);
				var	index=Waterfall.prototype.getMinIndex(colsHeightArr,minHeight);
				childArray[i].style.position='absolute';
				childArray[i].style.top=minHeight+"px";
				childArray[i].style.left=BoxWidth*index+"px";
				colsHeightArr[index]+=childArray[i].offsetHeight;
			}
		}
	}
};
var WFDemo=new Waterfall();
EventUtil.addHandler(window,"resize",function(){
	WFDemo.waterfallActive("waterfall","WFBox");
});

