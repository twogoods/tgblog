$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$("#passwordTip").popover();
	$("#switchmode").bootstrapSwitch();

	var mditor = new Mditor(".textwrite",{
	    height:450,
	    width:780,
	    fixedHeight:false
	});
	mditor.openPreview();
	$("#high").click(function(){
		$('*').addClass('animated tada');
		setTimeout(function(){
			$('*').removeClass('animated tada');
		},4000);
	});


	var uid=$("#uid").text();

	$('#switchmode').on('switchChange.bootstrapSwitch', function (event, state) {
		if(state==true){
			var flag=$("#editflag").text();
			if("new"!=flag){
				$("#editflag").text("new");
				$(".textwrite").val("");
				$(".textview").hide();
			}
			$(".read").show();
			$(".edit").hide();
			mditor.openPreview();
		}else{
			$(".edit").show();
			$(".read").hide();
			mditor.openPreview();
		}
	});

	//更新密码
	$("#updatePassword").click(function(){
		var prepassword=$(":input[name='prepassword']").val().trim();
		var newpassword=$(":input[name='newpassword']").val().trim();
		if(prepassword==""&&newpassword==""){
			$('#passwordalert').show();
			$('#passwordWarning').text("密码不能为空");
		}else if(prepassword==""){
			$('#passwordalert').show();
			$('#passwordWarning').text("原密码不能为空");
		}else if(newpassword==""){
			$('#passwordalert').show();
			$('#passwordWarning').text("新密码不能为空");
		}else{
			var param={prepassword:prepassword,newpassword:newpassword}
			$.ajax({
				type: "post",
				url: "/users/"+uid+"/updatePassword",
				data: param,
				success: function(data){
					if(1==data.code){
						$('#passwordWin').modal('hide');
						swal({ title: "密码修改成功!",type:"success",timer: 2000,showConfirmButton: false });
					}else{
						$('#passwordalert').show();
						$('#passwordWarning').text(data.msg);
					}
				},
				dataType: "json"
			});
		}
	});


	//弹出更新用户信息的模态框
	$("a.updateinfo").click(function() {
		$.ajax({
			type: "get",
			url: "/users/simpleInfo/"+uid,
			success: function(data){
				$(":input[name='headurl']").val(data.headurl);
				$(":input[name='mark']").val(data.mark);
				$('.tagEditor').tagEditor('destroy');
				$('.tagEditor').tagEditor({
					initialTags: data.tags,
					delimiter: ',',
					placeholder: '请输入标签 ...',
					maxTags : 5,
					maxLength : 5,

				});
				$('#userInfoWin').modal('show');
			},
			dataType: "json"
		});
	});
	//用户信息更新
	$("#updateInfo").click(function(){
		//$('#demo3').tagEditor('getTags')[0].tags
		var tagArray=$('.tagEditor').tagEditor('getTags')[0].tags;
		var tags=tagArray.join(",");

		var headurl=$(":input[name='headurl']").val();
		var mark=$(":input[name='mark']").val();
		var param={headurl:headurl,mark:mark,tags:tags};
		$.ajax({
			type: "post",
			url: "/users/"+uid+"/updateInfo",
			data: param,
			success: function(data){
				if(1==data.code){
					swal({ title: "信息更新成功!",type:"success",showConfirmButton: false });
					setTimeout(function(){
						window.location.reload();
					},1000);
				}else{
					$('#infoalert').show();
					$('#infoWarningContext').text(data.msg);
				}
			},
			dataType: "json"
		});
	});

	$(".viewbtn").click(function(){
		var context = $(".textwrite").val();
		var html=marked(context);
		$(".textview").show();
		$(".textview").html(html);
	});

	$(".savebtn").click(function(){
		var flag=$("#editflag").text();
		if(flag=="new"){
			var content = $(".textwrite").val().trim();
			if(content==""||content==null){
				swal({ title: "内容不能为空哦~" ,type:"error"});
				return;
			}
			var param={content : content};
			$.ajax({
				type: "POST",
				url: "/users/"+uid+"/article",
				data: param,
				success: function(data){
					if(1==data.code){
						swal({ title: "文章添加成功!",type:"success",showConfirmButton: false });
						setTimeout(function(){
							window.location.reload();
						},1000);
					}else{
						swal({ title: data.msg ,type:"error"});
					}
				},
				dataType: "json"
			});
		}else{
			var content = $(".textwrite").val().trim();
			if(content==""||content==null){
				swal({ title: "内容不能为空哦~" ,type:"error"});
				return;
			}
			var param={content : content};
			$.ajax({
				type: "put",
				url: "/users/"+uid+"/article/"+flag,
				data: param,
				success: function(data){
					if(1==data.code){
						swal({ title: "文章更新成功!",type:"success",showConfirmButton: false });
						setTimeout(function(){
							window.location.reload();
						},1000);
					}else{
						swal({ title: data.msg,type:"error"});
						$(".textwrite").val("");
						$(".textview").hide();
						$("#editflag").text("new");
					}
				},
				dataType: "json"
			});
		}

		
	});

$(".doEdit").click(function(){
	var pid=this.id;
	$.ajax({
		type: "get",
		url: "/users/"+uid+"/article/"+pid,
		success: function(data){
			$(".textwrite").val(data.content);
			$(".textview").hide();
			$(".edit").show();
			$(".read").hide();
			$("#editflag").text(pid);
			$('#switchmode').bootstrapSwitch('state', false);
		},
		dataType: "json"
	});
});

$(".doDelete").click(function(){
	var pid=this.id;
	swal({title:"确定要删除文章?", text: "", type: "warning",showCancelButton: true,confirmButtonColor: "#DD6B55", 
		confirmButtonText: "是的，删除", cancelButtonText: "取消", closeOnConfirm: false }, 
		function(){
			$.ajax({
				type: "delete",
				url: "/users/"+uid+"/article/"+pid,
				success: function(data){
					if(1==data.code){
						swal({ title: "文章删除成功!",type:"success",showConfirmButton: false });
						setTimeout(function(){
							window.location.reload();
						},1000);
					}else{
						swal({ title: data.msg,type:"error"});
					}
				},
				dataType: "json"
			});
		});
});

})