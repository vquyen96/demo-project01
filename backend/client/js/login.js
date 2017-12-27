// //API để đăng nhập
// var LOGIN_URL = "https://youtube-api-challenger.appspot.com/authentication";
// // khi ấn nút đăng nhập
// $("#btnSubmit").click(function(){
// 	var username = $("input[name=username]").val();
// 	var password = $("input[name=password]").val();
// 	//khi thỏa mãn điều kiện sẽ đăng kí
// 	if (username.length > 7 && password.length > 7) {
// 		register();
// 	}
// 	else{
// 		//thông báo lỗi nếu sai
// 		if (username.length < 8) {
// 			$("input[name=username]").parent().siblings("span").text('Username phải dài hơn 7 kí tự !');
// 		}
// 		//xóa thông báo nếu đúng
// 		else{
// 			$("input[name=username]").parent().siblings("span").text('');
// 		}
// 		if (password.length < 8) {
// 			$("input[name=password]").parent().siblings("span").text('Password phải dài hơn 7 kí tự !');
// 		}
// 		else{
// 			$("input[name=password]").parent().siblings("span").text('');
// 		}
// 	}
// });

// //khi đã có tài khoản sẽ điều hướng về trang index
// if (localStorage.getItem("secretToken")) {
// 	window.location.href = "index.html";
// }

// //Gửi đi
// function register(){
// 	//Khai báo biến
// 	var username = $("input[name=username]").val();
// 	var password = $("input[name=password]").val();

// 	var object = {
// 		"data":{
// 		    "type":"MemberLogin",
// 		     "attributes":{
// 		        "username": username,
// 		        "password": password		        
// 	      	}
// 	    }
// 	};
// 	//Gửi
// 	$.ajax({
// 		url: LOGIN_URL,
// 		type: "POST",
// 		data: JSON.stringify(object),
// 		success: function(response){
// 			console.log(response);
// 			//Tạo chìa khóa secretToken
// 			secretName = localStorage.setItem("secretName", username);
// 			secretToken = localStorage.setItem("secretToken", response.data.attributes.secretToken);
// 			//Thông báo
// 			$('.alert-success').text('Thành Công');
// 			$('.alert-success').attr('style','display : inline-block');
// 			$('.alert-danger').attr('style','display : none');
// 			alert('Đăng Nhập Thành Công');
// 			//Điều hướng trang
// 			window.location.href = "index.html";
// 		},
// 		error: function(jqXHR, exception){	
// 			// Chuyển dũ liệu trả về sang JSON		
// 			var jsonObject = JSON.parse(jqXHR.responseText);
// 			console.log(jqXHR.status);	
// 			// Thông báo lỗi
// 			$('.alert-danger').text(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
// 			$('.alert-danger').attr('style','display : inline-block');	
// 			$('.alert-success').attr('style','display : none');					
// 			// alert(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
// 		}
// 	});
// }


var app = angular.module('myApp', []);
app.controller('login', function($scope, $http) {
	//khi đã có tài khoản sẽ điều hướng về trang index
	if (localStorage.getItem("secretToken")) {
		window.location.href = "index.html";
	}
	$scope.myFunction = function() {
		var object = {
			"data":{
				"type":"MemberLogin",
				"attributes": {
					"username":"",
					"password":""
				}
			}	
		}
		if ($scope.object.data.attributes.username.length > 7 && $scope.object.data.attributes.password.length > 7) {
			login();
			$("input[name=password]").parent().siblings("span").text('');
			$("input[name=username]").parent().siblings("span").text('');
		}
		else{
			//thông báo lỗi nếu sai
			if ($scope.object.data.attributes.username.length < 8) {
				$("input[name=username]").parent().siblings("span").text('Username phải dài hơn 7 kí tự !');
			}
			//xóa thông báo nếu đúng
			else{
				$("input[name=username]").parent().siblings("span").text('');
			}
			if ($scope.object.data.attributes.password.length < 8) {
				$("input[name=password]").parent().siblings("span").text('Password phải dài hơn 7 kí tự !');
			}
			else{
				$("input[name=password]").parent().siblings("span").text('');
			}
		}

	}
	function login(){
		$http({
	    	method : "POST",
	    	url : "https://youtube-api-challenger.appspot.com/authentication",
	    	data : $scope.object
	  	}).then(function mySuccess(response) {
	  		console.log(response);
			//Tạo chìa khóa secretToken
			// alert(response.data.data.attributes.secretToken);
			var secretName = localStorage.setItem("secretName", $scope.object.data.attributes.username);
			var secretToken = localStorage.setItem("secretToken", response.data.data.attributes.secretToken);
			//Thông báo
			$('.alert-success').text('Thành Công');
			$('.alert-success').attr('style','display : inline-block');
			$('.alert-danger').attr('style','display : none');
			alert('Đăng Nhập Thành Công');
			//Điều hướng trang
			window.location.href = "index.html";
	    }, function myError(response) {
	    	// Chuyển dũ liệu trả về sang JSON		
			console.log(response);
			// Thông báo lỗi
			$('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
			$('.alert-danger').attr('style','display : inline-block');	
			$('.alert-success').attr('style','display : none');					
	  	});
	}
});