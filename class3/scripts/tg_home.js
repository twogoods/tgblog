$(function () {
	$('[data-toggle="tooltip"]').tooltip();

		var mditor = new Mditor(".textwrite",{
	    height:500,
	    fixedHeight:false
	});
	mditor.openPreview();

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

	$.jqPaginator('#pagination', {
        totalPages: 1,
        visiblePages: 5,
        currentPage: 1,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            console.log(num);
        }
    });

})