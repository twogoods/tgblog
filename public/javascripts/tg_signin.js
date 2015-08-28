$(function () {
	$("#loginbtn").click(function(){
		var userid=$("#uid").val().trim();
		var password=$("#password").val().trim();
		if(userid==""&&password==""){
			$('#alertwarning').show();
			$('#warningcontext').text("账号密码不能为空");
			$('.form-signin').addClass('animated swing');
			setTimeout(function(){
				$('.form-signin').removeClass('animated swing');
			},3000);
		}else if(userid==""){
			$('#alertwarning').show();
			$('#warningcontext').text("账号不能为空");
			$('.form-signin').addClass('animated swing');
			setTimeout(function(){
				$('.form-signin').removeClass('animated swing');
			},3000);
		}else if(password==""){
			$('#alertwarning').show();
			$('#warningcontext').text("密码不能为空");
			$('.form-signin').addClass('animated swing');
			setTimeout(function(){
				$('.form-signin').removeClass('animated swing');
			},3000);
		}else{
			var param={userid : userid,password :password};
			
			$.ajax({
				type: "POST",
				url: "/login",
				data: param,
				success: function(data){
					if(data.success){
						window.location.href=window.location.href.split('?')[1];
					}else{
						$('#alertwarning').show();
						$('#warningcontext').text("账号或密码错误");
						$('.form-signin').addClass('animated swing');
						setTimeout(function(){
							$('.form-signin').removeClass('animated swing');
						},3000);
					}
				},
				dataType: "json"
			});
		}

	});

})