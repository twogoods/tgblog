$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$('.tag').tagEditor({
		initialTags: ['Hello', 'World', 'Example', 'Tags'],
		delimiter: ', ', /* space and comma */
		placeholder: 'Enter tags ...'
	});

	$("#updatePassword").click(function(){
		$('#passwordWarning').text("账号密码不能为空");
		$('.alert').show();
	});

	$("#updateInfo").click(function(){
		window.location.reload();
	});

	$(".view").click(function(){
		var context = $(".textwrite").val();
		console.log(context);
		var html=marked(context);
		console.log(html.length);
		$(".textview").html(html);
	});


})