$(function() {
try{
	setTimeout(function(){
		$(".success-tips").animate({bottom: "-60px"});
		$(".error-tips").animate({bottom: "-60px"});
	}, 3000);
}catch(e){
}

});