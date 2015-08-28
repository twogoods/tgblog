$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$("#high").click(function(){
		$('*').addClass('animated wobble');
		setTimeout(function(){
			$('*').removeClass('animated wobble');
		},4000);
	});

	$("#login").click(function(){
		var userid=$("#username").val().trim();
		var password=$("#password").val().trim();
		if(userid==""&&password==""){
			$('#alertwarning').show();
			$('#warningcontext').text("账号密码不能为空");
			$('#myModal').addClass('animated swing');
			setTimeout(function(){
				$('#myModal').removeClass('animated swing');
			},4000);
		}else if(userid==""){
			$('#alertwarning').show();
			$('#warningcontext').text("账号不能为空");
			$('#myModal').addClass('animated swing');
			setTimeout(function(){
				$('#myModal').removeClass('animated swing');
			},4000);
		}else if(password==""){
			$('#alertwarning').show();
			$('#warningcontext').text("密码不能为空");
			$('#myModal').addClass('animated swing');
			setTimeout(function(){
				$('#myModal').removeClass('animated swing');
			},4000);
		}else{
			var param={userid : userid,password :password};
			$.ajax({
				type: "POST",
				url: "/login",
				data: param,
				success: function(data){
					if(data.success){
						//$('#myModal').modal('hide');
						window.location.reload();
					}else{
						$('#alertwarning').show();
						$('#warningcontext').text("账号或密码错误");
						$('#myModal').addClass('animated swing');
						setTimeout(function(){
							$('#myModal').removeClass('animated swing');
						},4000);
					}
				},
				dataType: "json"
			});
		}

	});

})