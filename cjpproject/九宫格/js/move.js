function move( obj , mJson , fn ){
	var target = parseInt( target ); //Ҫ���ص�ȡ������ֹ����С�����������ʱ��
	clearInterval( obj.timer ); //Ϊ�˷�ֹ��ʱ���ۼ������ǰһ����ʱ��
	obj.timer = setInterval(function(){
		var onoff = true; //����
		for( var attr in mJson ){
			target = mJson[attr]; //������ֵ����target
			if( attr == 'opacity' ){ //�ж��ǲ���opacity
				 var iCur = getStyle( obj , attr ) * 100;
			}else{
				var iCur = parseInt( getStyle( obj , attr ) );
			};
			var speed = ( target - iCur ) / 10; //���ٶ�
			if( iCur > target ){
				speed = Math.floor( speed ); //������Ƿ���������ȡ��
			}else{
				speed = Math.ceil( speed );//�����������������ȡ��
			};
			if( iCur != target ){ //�ж��ǲ������е����Զ������յ� 
				onoff = false; //û�е���ѿ��ر��false
			};
			if( attr == 'opacity' ){ //�ж��ǲ���opacity
				obj.style[attr] = (iCur + speed)/100;
				obj.style.filter = 'alpha( opacity = '+(iCur + speed)+' )';
			}else{
				obj.style[attr] = iCur + speed + 'px';
			};
		};
		if( onoff ){  //��������� trueֹͣ��ʱ��
			clearInterval( obj.timer );
			if( fn ){
				fn();
			}
		}
	},30);
	
};

function getStyle( obj , attr ){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle( obj , false )[attr];
}