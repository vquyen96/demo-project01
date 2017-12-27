// //API thầy cho để đăng kí
// var REGISTER_URL = "https://youtube-api-challenger.appspot.com/members";
// //khi nhấn nút đăng kí
// $("#btnSubmit").click(function(){
// 	//khai báo biến
// 	var username = $("input[name=username]").val();
// 	var password = $("input[name=password]").val();
// 	var rePassword = $("input[name=rePassword]").val();
// 	var fullName = $("input[name=fullName]").val();
// 	var email = $("input[name=email]").val();
// 	var birthdayValue = $("input[name=birthday]").val();
// 	var gender = 1;
// 	//chuyển ngày sang dạng số tính theo mili giây từ ngày 1/1/1970
// 	var birthday = Date.parse(birthdayValue);
// 	//khai báo biến lưu ngày hiện tại
// 	var d = new Date();


// 	//Validate
// 	if (username.length > 7 && password.length >7 && rePassword == password && fullName.length > 0 && email.length > 6 && birthday < d.getTime()) {
// 		register();
// 	}
// 	else{
// 		if (username.length < 8) {
// 			//hiện thông báo khi sai
// 			$("input[name=username]").parent().siblings("span").text('Username phải dài hơn 7 kí tự !');
// 		}
// 		else{
// 			//xóa thông báo khi đúng
// 			$("input[name=username]").parent().siblings("span").text(' ');
// 		}
// 		if (password.length < 8) {
// 			$("input[name=password]").parent().siblings("span").text('Password phải dài hơn 7 kí tự !');
// 		}
// 		else{
// 			$("input[name=password]").parent().siblings("span").text(' ');
// 		}
// 		if (password == rePassword) {
// 			$("input[name=rePassword]").parent().siblings("span").text('');
// 		}
// 		else{
// 			$("input[name=rePassword]").parent().siblings("span").text('rePassword phải giống password !');
// 		}
// 		if (fullName.length < 7) {
// 			$("input[name=fullName]").parent().siblings("span").text('Điền đầy đủ họ và tên !');
// 		}
// 		else{
// 			$("input[name=fullName]").parent().siblings("span").text(' ');
// 		}
// 		if (email.length < 7) {
// 			$("input[name=email]").parent().siblings("span").text('Email phải dài hơn 7 kí tự !');
// 		}
// 		else{
// 			$("input[name=email]").parent().siblings("span").text(' ');
// 		}
// 		//getTime() để lấy ngày hiện tại tính theo mili giây tính từ 1/1/1970
// 		if (birthday > d.getTime()) {
// 			$("input[name=birthday]").parent().siblings("span").text('Ngày Sinh không hợp lệ !');
// 		}
// 		else{
// 			$("input[name=birthday]").parent().siblings("span").text(' ');
// 		}
// 	}
// });

// //Nếu đã đăng nhập (đã có secretToken ) thì sẽ điều hướng về trang index
// if (localStorage.getItem("secretToken")) {
// 	window.location.href = "index.html";
// }


// //gửi đăng kí
// function register(){
// 	//khai báo biến
// 	var username = $("input[name=username]").val();
// 	var password = $("input[name=password]").val();
// 	var rePassword = $("input[name=rePassword]").val();
// 	var fullName = $("input[name=fullName]").val();
// 	var email = $("input[name=email]").val();
// 	var birthdayValue = $("input[name=birthday]").val();
// 	var gender = 1;
// 	var birthday = Date.parse(birthdayValue);
// 	var d = new Date();
// 	//khai báo object và gán biến
// 	var object = {
// 		"data":{
// 		    "type":"Member",
// 		     "attributes":{
// 		        "username": username,
// 		        "password": password,
// 		        "fullName": fullName,
// 		        "email": email,
// 		        "birthDay": birthday,
// 		        "gender": gender
// 	      	}
// 	    }
// 	};

// 	//Gửi
// 	$.ajax({
// 		url: REGISTER_URL,
// 		type: "POST",
// 		//chuyển object thành dạng JSON
// 		data: JSON.stringify(object),
// 		//khi đăng kí thành công
// 		success: function(response){
// 			console.log(response);
// 			//Thông báo
// 			$('.alert-success').text('Thành Công');
// 			$('.alert-success').attr('style','display : inline-block');
// 			$('.alert-danger').attr('style','display : none');
// 			//điều hướng trang
// 			window.location.href = "Login.html";
// 		},
// 		error: function(jqXHR, exception){	
// 			//Chuyển thông tin trả về sang dạng JSON		
// 			var jsonObject = JSON.parse(jqXHR.responseText);
// 			// alert(jqXHR.status);	
// 			// Hiển thị lỗi
// 			$('.alert-danger').text(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
// 			$('.alert-danger').attr('style','display : inline-block');	
// 			$('.alert-success').attr('style','display : none');				
// 			// alert(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
// 		}
// 	});
// }

var app = angular.module('myApp', []);
app.controller('register', function($scope, $http) {
	
	//Nếu đã đăng nhập (đã có secretToken ) thì sẽ điều hướng về trang index
	if (localStorage.getItem("secretToken")) {
		window.location.href = "index.html";
	}
	$scope.myFunction = function() {
		var object = {
			"data" : {
				"type":"MemberLogin",
				"attributes": {
					"username":"xuanhung2401",
					"password":"1234567",
					"fullName": "XuanHung",
			        "email": "xuanhung2401@gmail.com",
			        "birthDay": 15066499900231,
			        "gender": 1
				}
			}	
		}

		var d = new Date();
		var birthday = Date.parse($scope.object.data.attributes.birthday);
	
			//Validate
		if ($scope.object.data.attributes.username.length > 7 
			&& $scope.object.data.attributes.password.length >7 
			&& $scope.object.data.attributes.rePassword == $scope.object.data.attributes.password 
			&& $scope.object.data.attributes.fullName.length > 0 
			&& $scope.object.data.attributes.email.length > 6 
			&& birthday < d.getTime()) {
			register();
		}
		else{
			if ($scope.object.data.attributes.username.length < 8) {
				//hiện thông báo khi sai
				$("input[name=username]").parent().siblings("span").text('Username phải dài hơn 7 kí tự !');
			}
			else{
				//xóa thông báo khi đúng
				$("input[name=username]").parent().siblings("span").text(' ');
			}
			if ($scope.object.data.attributes.password.length < 8) {
				$("input[name=password]").parent().siblings("span").text('Password phải dài hơn 7 kí tự !');
			}
			else{
				$("input[name=password]").parent().siblings("span").text(' ');
			}
			if ($scope.object.data.attributes.password == $scope.object.data.attributes.rePassword) {
				$("input[name=rePassword]").parent().siblings("span").text('');
			}
			else{
				$("input[name=rePassword]").parent().siblings("span").text('rePassword phải giống password !');
			}
			if ($scope.object.data.attributes.fullName.length < 7) {
				$("input[name=fullName]").parent().siblings("span").text('Điền đầy đủ họ và tên !');
			}
			else{
				$("input[name=fullName]").parent().siblings("span").text(' ');
			}
			if ($scope.object.data.attributes.email.length < 7) {
				$("input[name=email]").parent().siblings("span").text('Email phải dài hơn 7 kí tự !');
			}
			else{
				$("input[name=email]").parent().siblings("span").text(' ');
			}
			//getTime() để lấy ngày hiện tại tính theo mili giây tính từ 1/1/1970
			if (birthday > d.getTime()) {
				$("input[name=birthday]").parent().siblings("span").text('Ngày Sinh không hợp lệ !');
			}
			else{
				$("input[name=birthday]").parent().siblings("span").text(' ');
			}
		}		
	}

	function register(){
		$http({
	    	method : "POST",
	    	url : "https://youtube-api-challenger.appspot.com/members",
	    	data : $scope.object
	  	}).then(function mySuccess(response) {
	      	console.log(response.data);
	      	// Thông báo
			$('.alert-success').text('Thành Công');
			$('.alert-success').attr('style','display : inline-block');
			$('.alert-danger').attr('style','display : none');
			//điều hướng trang
			window.location.href = "Login.html";
	    }, function myError(response) {
			// Hiển thị lỗi
			$('.alert-danger').text(response.data.errors[0].title + " " + response.data.errors[0].detail);
			$('.alert-danger').attr('style','display : inline-block');	
			$('.alert-success').attr('style','display : none');				
			// alert(jsonObject.errors[0].title + " " + jsonObject.errors[0].detail);
	  	});
	}
});