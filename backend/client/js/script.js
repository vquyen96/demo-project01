var app = angular.module("myApp", []);
app.controller('myController', function($scope, $http){
	var videoFrame = document.getElementById("video-frame");

	var search = "Hà Anh Tuấn";

	var VIDEO_URL = "https://youtube-api-challenger.appspot.com/videos";
	var secretToken = localStorage.getItem("secretToken");
	var secretName = localStorage.getItem("secretName");

	//Kiểm tra secretToken
	if (localStorage.getItem("secretToken")) {
		var secretToken = localStorage.getItem("secretToken");
		var content = '';
		content += '<button type="button" class="btn btn-default btn-logout">';
			content += '<span class="glyphicon glyphicon-log-out"></span>';
			content += ' Log Out';
		content += '</button>';
		content += '<button type="button" class="btn btn-default">';
			content += '<span class="glyphicon glyphicon-user"></span> ';
			content += secretName;
		content += '</button>';
		$('.user').html(content);
	}
	else{
		$(document).ready(function(){
			alert('Đăng Nhập để xem playlist');
		});	
	}

	

	function playlist(){
		var YOUTUBE_API = "https://youtube-api-challenger.appspot.com/videos";
		$http({
	    	method : "GET",
	    	url : YOUTUBE_API,
	    	data : function(){},
	    	headers: {
			Authorization: secretToken
		},
	  	}).then(function mySuccess(response) {
	  		$scope.playlists = response.data.data;
	    });
	}

	var videoFrame = document.getElementById("video-frame");
	
	$scope.showVideo = function(videoId){
		videoFrame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
		setTimeout(function(){ 
			$('#modal-video').modal();
		}, 300);
	}


	playlist();

	$scope.inputSearch = "Hà Anh Tuấn";
	searchVideo();
	$scope.btnSearch = function() {
		searchVideo();
		$scope.maxVideo = 18;
	}

	function searchVideo(){
		var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q="+$scope.inputSearch+"&type=video&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
		$http({
	    	method : "GET",
	    	url : YOUTUBE_API,
	    	data : function(){}
	  	}).then(function mySuccess(response) {
	  		$scope.listVideo = response.data.items;
	    });
	}

	$scope.addVideo = function(idVideo, thumbnails){
		var name = $('#'+idVideo+'').text();
		$scope.object = {
			"data": {
			    "type":"Video",
			    "attributes": {
			       	"youtubeId": idVideo,
			        "name": name,
			        "description": 'Hay',
			        "keywords": 'Quyến đẹp troai',
			        "playlistId": 1,  
			        "thumbnail": thumbnails
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
	    }, function myError(response) {
	    	alert(response.data.errors[0].title + ' - ' +response.data.errors[0].detail);
			console.log(response);
	  	});
		setTimeout(function(){
			playlist();
		},500);
	}

	$scope.maxVideo = 18;

	$scope.btnMore = function(){

		var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q="+$scope.inputSearch+"&type=video&maxResults="+$scope.maxVideo+"&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
		$http({
	    	method : "GET",
	    	url : YOUTUBE_API,
	    	data : function(){}
	  	}).then(function mySuccess(response) {
	  		$scope.listVideo = response.data.items;
	    });
	    $scope.maxVideo +=9;
	}

		//nút thêm video
	$('.btn-add').click(function(){
		if (localStorage.getItem("secretToken")) {
			window.location.href = "Video.html";
		}
	    else{
	    	alert('Bạn phải đăng nhập');
	    }
	});

	//nút đăng kí
	$('.btn-regitter').click(function(){
	    window.location.href = "Register.html";
	});

	//nút đăng nhập
	$('.btn-login').click(function(){
	    window.location.href = "Login.html";
	});

	//nút đăng xuất
	$('.btn-logout').click(function(){
	    secretToken = localStorage.setItem("secretToken", '');
		window.location.href = "index.html";
	});

	
})


