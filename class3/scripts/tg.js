$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$("#login").click(function(){
		$('#alertwarning').show();
		$('#myModal').addClass('animated rubberBand');
		setTimeout(function(){
		$('#myModal').removeClass('animated rubberBand');
		},4000);
		$('#warningcontext').text("账号密码不能为空");
	});
	$("#high").click(function(){
		$('*').addClass('animated wobble');
		setTimeout(function(){
		$('*').removeClass('animated wobble');
		},4000);
	});

})