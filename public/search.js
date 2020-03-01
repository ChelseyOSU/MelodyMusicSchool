function search(type)
{
	//var posts_elem = document.getElementById("posts").childNodes;
	var list=document.getElementsByClassName("post");
	var s="";
	if(type==1){
			s="BC";
	}else if(type==2){
			s="AC";
	}else{
		s="";
	}

	for(var i=0;i<list.length;i++)
	{
		if(s!=""){
			if(list[i].getAttribute('data-type').toUpperCase()==s){
				list[i].style.display="block";
			}else{
				list[i].style.display="none";
			}
		}else{
			list[i].style.display="block";
		}
	}
}