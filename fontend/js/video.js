// var VIDEO_URL = "https://youtube-api-challenger.appspot.com/videos";

// var secretToken = localStorage.getItem("secretToken");

// //Kiểm tra secretToken
// if (!localStorage.getItem("secretToken")) {
// 	$('fieldset').html('');
// 	$(document).ready(function(){
// 		alert('<p style="color:red">Bạn phải đăng nhập</p>');
// 		window.location.href = "index.html";
// 	});	
// }

// //Nút lưu Video
// $("#btnSubmit").click(function(){
// 	saveVideo();
// });

// //Nút trở về home
// $(".btn-home").click(function(){
// 	window.location.href = "index.html";
// });

// //Hàm gửi video để lưu trên Sever
// function saveVideo(){
// 	var youtubeId = $("input[name=youtubeId]").val();
// 	var name = $("input[name=name]").val();
// 	var description = $("input[name=description]").val();
// 	var keywords = $("input[name=keywords]").val();
// 	var playlistId = $("input[name=playlistId]").val();
// 	var thumbnail = $("input[name=thumbnail]").val();

// 	var object = {
// 		"data": {
// 		    "type":"Video",
// 		     "attributes": {
// 		       	"youtubeId": youtubeId,
// 		        "name": name,
// 		        "description": description,
// 		        "keywords": keywords,
// 		        "playlistId": playlistId,  
// 		        "thumbnail": thumbnail
// 		      }
// 		    }
// 		};

// 	$.ajax({
// 		url: VIDEO_URL,
// 		type: "POST",
// 		headers: {
// 			Authorization: secretToken
// 		},
// 		data: JSON.stringify(object),
// 		success: function(response){
// 			console.log(response);
// 			//Thông báo khi thành công
// 			$('.alert-success').text('Thành Công');
// 			$('.alert-success').attr('style','display : inline-block');
// 			//Xóa thông báo sau 3s
// 			setTimeout(function(){
// 				$('.alert-success').attr('style','display : none');
// 			},3000);
// 			//Xóa các trường input khi thành công
// 			$("input[name=youtubeId]").val('');
// 			$("input[name=name]").val('');
// 			$("input[name=description]").val('');
// 			$("input[name=keywords]").val('');
// 			$("input[name=thumbnail]").val('');



// 		},
// 		error: function(jqXHR, exception){			
// 			var jsonObject = JSON.parse(jqXHR.responseText);
// 			console.log(jqXHR.status);
// 			//Thông báo khi có lỗi						
// 			$('.alert-danger').text(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
// 			$('.alert-danger').attr('style','display : inline-block');
// 			//Xóa thông báo sau 3s
// 			setTimeout(function(){
// 				$('.alert-danger').attr('style','display : none');
// 			},3000);	
// 		}
// 	});
// }

// var search = "Hà Anh Tuấn";

// //nút tìm kiếm
// $('#btnsearch').click(function (){
// 	search = $('#input-search').val();
// 	run();
// });

// run();

// //Hàm hiển thị tìm kiếm
// function run(){
// 	var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q="+search+"&type=video&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
// 	object = {
// 		url : YOUTUBE_API,
// 		type : "GET" ,
// 		data : function() {
			
// 		},
// 		success: function (response) {
// 			var content = '';
// 			for(var i=0; i < response.items.length;i++){
// 				var idVideo = response.items[i].id.videoId;
// 				var title = response.items[i].snippet.title;
// 				var thumbnails = response.items[i].snippet.thumbnails.medium.url;
				
// 				content += '<div class="col-xs-6 col-md-4 content" id="'+idVideo+'">';
// 					content += '<a href="#" class="thumbnail">';
// 						content += '<img src="'+thumbnails+'" alt="'+title+'" onclick=showVideo(\''+idVideo+'\')>';
// 						content += '<div class="icon-add" onclick=addVideo(\''+idVideo+'\',\''+thumbnails+'\')>';
// 							content += '<span class="glyphicon glyphicon-info-sign icon-item"></span>';
// 							content += 'Lấy thông tin';
// 						content += '</div>';
// 					content += '</a>';
// 					content += '<div class="text-center title"><strong>'+title+'</strong></div>';
					
// 				content += '</div>';
// 			}
// 			$('.my-content').html(content);	
// 		},
// 	}

// 	$.ajax(object);
// }

// //Hàm hiển thị modal
// function showVideo(idVideo){
// 	$('iframe').attr('src','https://www.youtube.com/embed/'+idVideo);
// 	setTimeout(function(){
// 		$('#modal-video').modal();
// 	},500);
// }

// //Hàm lấy thông tin và điền vào input
// function addVideo(idVideo, thumbnails){
// 	$("input[name=youtubeId]").val(idVideo);
// 	var title = $('#'+idVideo+' .title').text();
// 	$("input[name=name]").val(title);
// 	$("input[name=description]").val("hay");
// 	$("input[name=keywords]").val("Quyến đẹp troai");
// 	$("input[name=thumbnail]").val(thumbnails);
// }

var app = angular.module('myApp', []);
app.controller('addVideo', function($scope, $http) {
	var secretToken = localStorage.getItem("secretToken");

	//Kiểm tra secretToken
	if (!localStorage.getItem("secretToken")) {
		$('fieldset').html('');
		$(document).ready(function(){
			alert('Bạn phải đăng nhập');
			window.location.href = "index.html";
		});	
	}
	$scope.btnAdd = function() {
		var object = {
			"data": {
			    "type":"Video",
			    "attributes": {
			       	"youtubeId": '',
			        "name": '',
			        "description": '',
			        "keywords": '',
			        "playlistId": 1,  
			        "thumbnail": ''
			    }
			}
		};
		$http({
	    	method : "POST",
	    	url : "https://youtube-api-challenger.appspot.com/videos",
	    	headers: {
				Authorization: secretToken
			},
	    	data : $scope.object
	  	}).then(function mySuccess(response) {
			console.log(response);
			//Thông báo khi thành công
			$('.alert-success').text('Thành Công');
			$('.alert-success').attr('style','display : inline-block');
			//Xóa thông báo sau 3s
			setTimeout(function(){
				$('.alert-success').attr('style','display : none');
			},3000);
			//Xóa các trường input khi thành công
			$scope.object.data.attributes.youtubeId = "";
			$scope.object.data.attributes.name = "";
			$scope.object.data.attributes.description = "";
			$scope.object.data.attributes.keywords = "";
			$scope.object.data.attributes.thumbnail = "";
	    }, function myError(response) {
			console.log(response);
			//Thông báo khi có lỗi						
			$('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
			$('.alert-danger').attr('style','display : inline-block');
			//Xóa thông báo sau 3s
			setTimeout(function(){
				$('.alert-danger').attr('style','display : none');
			},3000);
	  	});
	}

	$scope.inputSearch = "Hà Anh Tuấn";
	search();
	$scope.btnsearch = function() {
		search();
	}

	function search(){
		var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q="+$scope.inputSearch+"&type=video&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
		$http({
	    	method : "GET",
	    	url : YOUTUBE_API,
	    	data : function(){}
	  	}).then(function mySuccess(response) {
	  		$scope.listVideo = response.data.items;
	    });
	}

	var videoFrame = document.getElementById("video-frame");


	$scope.showVideo = function(videoId){
		videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
		setTimeout(function(){ 
			$('#modal-video').modal();
		}, 300);
	}

	$scope.closeVideo = function(){
		videoFrame.src = "";
		$scope.isShowVideo = false;
	}
	//Hàm lấy thông tin và điền vào input
	$scope.addVideo = function(idVideo, thumbnails){
		$("input[name=youtubeId]").val(idVideo);
		var title = $('#'+idVideo+'').text();
		$("input[name=name]").val(title);
		$("input[name=description]").val("hay");
		$("input[name=keywords]").val("Quyến đẹp troai");
		$("input[name=thumbnail]").val(thumbnails);

	}
	$(".btn-home").click(function(){
		window.location.href = "index.html";
	});
});