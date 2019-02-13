<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;
	
	$app = new \Slim\App;
	date_default_timezone_set('Asia/Kolkata');
	
	// DEFINE(HOST, 'mysql.hostinger.in');
	// DEFINE(DB_NAME, 'u347889504_xap2');
	// DEFINE(PASS, 'xaptag');
	// DEFINE(DB_USER, 'u347889504_xap2');
    
    // $connection = mysqli_connect(HOST, DB_USER, DB_PASS, DB_NAME);
	
	// GET ALL USERS
	$app->get('/get/all/users/{api-key}', function (Request $request, Response $response, array $args) {
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $args['api-key'];
		
		if($key == "xaptag_api_key_root"){
			
			$sql = "SELECT * FROM `users` WHERE 1;";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;
			}
			echo json_encode($json);
			
			} else {
			echo "auth-fail";
		}
	});
	
	// GET INDIVIDUAL USER DETAILS BASED ON ID PASSED IN AS ARGUMENT
	$app->get('/get/individual/users/{api-key}/{id}', function(Request $request, Response $response){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$id = $request->getAttribute('id');
		$key = $request->getAttribute('api-key');
		
		if($key == "xaptag_api_key_root"){
			$sql = "SELECT * FROM `users` WHERE `users`.`id`='$id';";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;
			}
			echo json_encode($json);
			} else {
			echo "auth-fail";
		}
	});
	
	// GET ALL DOCTORS
	$app->get('/get/all/doctors/{api-key}', function(Request $request, Response $response){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $request->getAttribute('api-key');
		
		if($key == "xaptag_api_key_root"){
			$sql = "SELECT * FROM `doctors` WHERE 1;";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;
			}
			echo json_encode($json);
			} else {
			echo "auth-fail";
		}
	});
	
	$app->get('/get/individual/doctors/{api-key}/{id}', function(Request $request, Response $response){
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $request->getAttribute('api-key');
		
		if($key = "xaptag_api_key_root"){
			
			$id = $request->getAttribute('id');
			$sql = "SELECT * FROM `doctors` WHERE `doctors`.`id`='$id';";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)) {
				$json[] = $row;
			}
			
			echo json_encode($json);
			
			} else {
			echo "auth-fail";
		}
	});
	
	$app->post('/add/doctor/{api-key}', function(Request $request, Response $response, array $args){
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		if($args['api-key'] == "xaptag_api_key_root"){
			
			$data = $request->getParsedBody();
			$name = $data['name'];
			$phone = $data['phone'];
			$email = $data['email'];
			$qualification = $data['qual'];
			$password = $data['password'];
			$id = md5("'$name' '$email' '$phone'");
			$password = password_hash($password, PASSWORD_DEFAULT);
			$sql = "INSERT INTO `doctors` VALUES('$id', '$name', '$phone', '$password', '$email', '$qualification', FALSE, FALSE);";
			$res = mysqli_query($connection, $sql);
			if($res) {
				$message = uniqid() . " --> new doctor " . $id . " added to the database";
				$log_id = md5($message);
				$date = date("F j, Y, h:i a");
				$sql_log = "INSERT INTO `log` VALUES('$log_id', 'none', '$id', 'add', '$message', '$date');";
				$response = mysqli_query($connection, $sql_log);
				if($response) {
					$r = ['success'];
					echo json_encode($r);
					} else {
					echo json_encode(['fail --> ' . mysqli_error($connection)]);
				}
				} else {
				$fail = mysqli_error($connection);
				$r = [$fail];
				echo json_encode($r);
			} 
			
			} else {
			$message = ['auth-fail'];
			echo json_encode($message);
		}
	});
	
	$app->post('/add/user/{api-key}', function(Request $request, Response $response){
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		if($request->getAttribute('api-key') == "xaptag_api_key_root"){
			
			$data = $request->getParsedBody();
			$name = $data['name'];
			$phone = $data['phone'];
			$email = $data['email'];
			$password = $data['password'];
			$id = md5("'$name' '$email' '$phone' '$password'");
			$password = password_hash($password, PASSWORD_DEFAULT);
			$sql = "INSERT INTO `users` VALUES('$id', '$name', '$phone', '$password', '$email', 'null', false, false);";
			$res = mysqli_query($connection, $sql);
			if($res) {
				$message = uniqid() . " --> new user " . $id . " added to the database";
				$log_id = md5($message);
				$date = date("F j, Y, h:i a");
				$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'add', '$message', '$date');";
				$response = mysqli_query($connection, $sql_log);
				if($response) {
					$r = ['success'];
					echo json_encode($r);
					} else {
					echo json_encode(['fail']);
				}
				} else {
				$json = array() ;
				while($row = mysqli_fetch_assoc($res)){
					$json[] = $row;
				}
				echo json_encode(['fail -> ' . mysqli_error($connection)]);
			} 
			} else {
			$message = ['auth-fail'];
			echo json_encode($message);
		}
	});
	
	$app->post('/reset_password/user/{api-key}', function(Request $request, Response $response){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		if($request->getAttribute('api-key') == 'xaptag_api_key_root'){
			$data = $request->getParsedBody();
			$number = $data['number'];
			$password = $data['password'];
			$password = password_hash($password, PASSWORD_DEFAULT);
			$sql = "UPDATE `users` SET `users`.`password`='$password' WHERE `users`.`phone`='$number';";
			if(mysqli_query($connection, $sql)){
				$sql_get_user = "SELECT * FROM `users` WHERE `users`.`phone`='$number';";
				$response_user = mysqli_query($connection, $sql_get_user);
				$user_details = array();
				while($row = mysqli_fetch_array($response_user)) {
					$user_details[] = $row;
				}
				$id = $user_details[0]['id'];
				$message = uniqid() . " --> password reset for user " . $id;
				$log_id = md5($message);
				$date = date("F j, Y, h:i a");
				$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'password_reset', '$message', '$date');";
				$response = mysqli_query($connection, $sql_log);
				if($response) {
					echo json_encode(['success']);
					} else {
					echo json_encode(['fail--- ' . mysqli_error($connection)]);
				}
				} else {
				echo json_encode(['fail: \n' . mysqli_error($connection)]);
			}
			} else {
			echo json_encode(['api-key-fail']);
		}
		
	});
	
	$app->post('/verify/user/{api-key}', function(Request $request, Response $response){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		if($request->getAttribute('api-key') == 'xaptag_api_key_root'){
			$data = $request->getParsedBody();
			$number = $data['number']; 
			$sql = "SELECT * FROM `users` WHERE `users`.`phone` = '$number';";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;   
			}
			if(count($json) > 0) {
				echo json_encode(['okay']); 
				} else {
				echo json_encode(['fail']);
			}
			} else {
			echo json_encode(['api-key-fail']);
		}
		
	});
	
	$app->post('/login/user/{api-key}', function(Request $request, Response $response, array $args){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $request->getAttribute('api-key');
		// $username = $args['username']; // $request->getAttribute('username');
		// $password = $args['password']; // $request->getAttribute('password');
		
		
		if($key == "xaptag_api_key_root") {
			
			// $json = file_get_contents('php://input');
			// $obj = json_decode($json,true);
			
			$data = $request->getParsedBody();
			$username = $data['username'];
			$password = $data['password'];
			
			$sql_get_user = "SELECT * FROM `users` WHERE `users`.`phone` LIKE '$username';";
			$res = mysqli_query($connection, $sql_get_user);
			
			// checking user existence:
			if(mysqli_num_rows($res) > 0) {
				// user exists
				$json_res = array();
				while($row = mysqli_fetch_assoc($res)){
					$json_res[] = $row;
				}
				
				$session = false; // $json_res[0]['session'];
				$id = $json_res[0]['id'];
				
				$pass_hash = $json_res[0]['password'];
				$is_correct = password_verify($password, $pass_hash);
				if($is_correct && ($session != '1' || $session != true)) {
					$sql_update_session = "UPDATE `users` SET `users`.`session`=TRUE WHERE `users`.`phone` LIKE '$username';";
					if(mysqli_query($connection, $sql_update_session)){ 
						
						$message = uniqid() . " --> user " . $id . " logged in";
						$log_id = md5($message);
						$date = date("F j, Y, h:i a");
						$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'login', '$message', '$date');";
						$response = mysqli_query($connection, $sql_log);
						if($response) {
							echo json_encode($json_res);   
							} else {
							echo json_encode(['fail->' . mysqli_error($connection)]);
						}
						
					}
					} else {
					$message = ['user_auth_fail'];
					echo json_encode($message);
				}
				} else {
				// $message = ['fail->' . mysqli_error()];
				echo json_encode($data);
			}
			
			} else {
			$message = ['auth_fail'];
			echo json_encode($message);
		}
		
	});
	
	$app->post('/login/doctor/{api-key}', function(Request $request, Response $response, array $args){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $args['api-key'];    
		
		if($key == "xaptag_api_key_root") {
			
			$data = $request->getParsedBody();
			$username = $data['username'];
			$password = $data['password'];
			
			$sql_get_user = "SELECT * FROM `doctors` WHERE `doctors`.`phone` LIKE '$username';";
			$res = mysqli_query($connection, $sql_get_user);
			
			// checking user existence:
			if(mysqli_num_rows($res) > 0) {
				// user exists
				$json_res = array();
				while($row = mysqli_fetch_assoc($res)){
					$json_res[] = $row;
				}
				
				$session = $json_res['session'];
				$id = $json_res[0]['id'];
				
				$pass_hash = $json_res[0]['password'];
				$is_correct = password_verify($password, $pass_hash);
				if($is_correct && ($session != '1' || $session != true)) {
					$sql_update_session = "UPDATE `doctors` SET `doctors`.`session`=TRUE WHERE `doctors`.`phone` LIKE '$username';";
					if(mysqli_query($connection, $sql_update_session)){ 
						
						$message = uniqid() . " --> doctor " . $id . " logged in";
						$log_id = md5($message);
						$date = date("F j, Y, h:i a");
						$sql_log = "INSERT INTO `log` VALUES('$log_id', 'none', '$id', 'login', '$message', '$date');";
						$response = mysqli_query($connection, $sql_log);
						
						if($response) {
							echo json_encode($json_res);   
							} else {
							echo json_encode(['fail->' . mysqli_error($connection)]);
						}
						
					}
					} else {
					$message = ['user_auth_fail'];
					echo json_encode($message);
				}
				} else {
				echo json_encode(['user does not exist']);
			}
			
			} else {
			$message = ['auth_fail'];
			echo json_encode($message);
		}
		
	});
	
	$app->post('/logout/user/{api-key}', function(Request $request, Response $response, array $args){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$key = $request->getAttribute('api-key');
		
		
		if($key == "xaptag_api_key_root") {
			
			$data = $request->getParsedBody();
			$id = $data['id'];
			
			$sql_get_user = "SELECT * FROM `users` WHERE `users`.`id`='$id';";
			$res = mysqli_query($connection, $sql_get_user);
			
			// checking user existence:
			if(mysqli_num_rows($res) > 0) {
				// user exists
				$sql_query_logout = "UPDATE `users` SET `users`.`session`=FALSE WHERE `users`.`id`='$id';";
				if(mysqli_query($connection, $sql_query_logout)){
					$message = uniqid() . " --> user " . $id . " logged out";
					$log_id = md5($message);
					$date = date("F j, Y, h:i a");
					$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'logout', '$message', '$date');";
					$response = mysqli_query($connection, $sql_log);
					
					if($response) {
						$message = ['logout_success'];
						} else {
						echo json_encode(['fail->' . mysqli_error($connection)]);
					}
					echo json_encode($message);
					} else {
					$message = ['logout_fail'.mysqli_error($connection)];
					echo json_encode($message);
				}
				} else {
				$message = ['user_does_not_exists'];
				echo json_encode($message);
			}
			
			} else {
			$message = ['api_auth_fail'];
			echo json_encode($message);
		}
		
	});
	
	$app->post('/upload_images/test/', function(Request $request, Response $response) {
		$data = $request->getParsedBody();
		$base64 = $data['base64'];
		$image_name = $data['image_name'];
		$user_id = $data['user_id'];
		file_put_contents('../images/'.$user_id.'/'.$image_name, base64_decode($base64));
	});
	
	$app->get('/get/get_user_documents/{user-id}', function(Request $request, Response $response, array $args){
		$id = $args['user-id'];
		$scanned_directory = array_diff(scandir('../images/'.$id.'/'), array('..', '.'));
		$final_data = array();
		for($i = 2; $i < count($scanned_directory); $i++){
			$path = '../images/'.$id.'/'.$scanned_directory[$i];
			$type = pathinfo($path, PATHINFO_EXTENSION);
			$data = file_get_contents($path);
			$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
			$file = array('file_base64' => $base64);
			array_push($final_data, $file);
		}
		
		echo json_encode($final_data);
	});
	
	$app->post('/add_misc_info/user/{api-key}', function(Request $request, Response $response, array $args){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$api_key = $args['api-key'];
		
		if($api_key == "xaptag_api_key_root"){
			$data = $request->getParsedBody();
			$id = $data['id'];
			$address = $data['address'];
			$em_name = $data['em_name'];
			$em_phone = $data['em_phone'];
			$aadhar = $data['aadhar'];
			$sql = "INSERT INTO `user_additional_details` VALUES('$id', '$em_name', '$em_phone', '$aadhar', '$address');";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;
			}
			if($res){
				$sql_update = "UPDATE `users` SET `users`.`misc_info`=TRUE WHERE `users`.`id`='$id';";
				$res = mysqli_query($connection, $sql_update);
				$json = array();
				while($row = mysqli_fetch_assoc($res)){
					$json[] = $row;
				}
				if($res) {
					$message = uniqid() . " --> user " . $id . " added misc info";
					$log_id = md5($message);
					$date = date("F j, Y, h:i a");
					$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'add_misc_info', '$message', '$date');";
					$response = mysqli_query($connection, $sql_log);
					if($response) {
						echo json_encode(['success']);
						} else {
						echo json_encode($json);
					}
					} else {
					echo json_encode($json);
				}
				} else {
				echo json_encode($json);
			}
			} else {
			echo json_encode(['auth-fail']);
		}
	});
	
	$app->get('/get_misc_info/user/{api-key}/{id}', function(Request $request, Response $response, array $args) {
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		$api_key = $args['api-key'];
		
		if($api_key == "xaptag_api_key_root"){
			$id = $args['id'];
			$sql = "SELECT * FROM `user_additional_details` WHERE `user_additional_details`.`user_hash`='$id';";
			$res = mysqli_query($connection, $sql);
			if($res) {
				$json = array();
				while($row = mysqli_fetch_assoc($res)){
					$json[] = $row;
				}
				echo json_encode($json);
				} else {
				echo json_encode(['fail']);
			}
			} else {
			echo json_encode(['auth-fail']);
		}
	});
	
	$app->post('/add_misc_info/doctor/{api-key}', function(Request $request, Response $response, array $args){
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$api_key = $args['api-key'];
		
		if($api_key == "xaptag_api_key_root"){
			$data = $request->getParsedBody();
			$id = $data['id'];
			$address = $data['address'];
			$c_address = $data['c_address'];
			$aadhar = $data['aadhar'];
			$sql = "INSERT INTO `doctor_additional_details` VALUES('$id', '$address', '$c_address', '$aadhar');";
			$res = mysqli_query($connection, $sql);
			$json = array();
			while($row = mysqli_fetch_assoc($res)){
				$json[] = $row;
			}
			if($res){
				$sql_update = "UPDATE `doctors` SET `doctors`.`misc_info`=TRUE WHERE `doctors`.`id`='$id';";
				$res = mysqli_query($connection, $sql_update);
				$json = array();
				while($row = mysqli_fetch_assoc($res)){
					$json[] = $row;
				}
				if($res) {
					echo json_encode(['success']);
					} else {
					echo json_encode($json);
				}
				} else {
				echo json_encode($json);
			}
			} else {
			echo json_encode(['auth-fail']);
		}
	});
	
	$app->get('/get_misc_info/doctor/{api-key}/{id}', function(Request $request, Response $response, array $args) {
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		$api_key = $args['api-key'];
		
		if($api_key == "xaptag_api_key_root"){
			$id = $args['id'];
			$sql = "SELECT * FROM `doctor_additional_details` WHERE `doctor_additional_details`.`id`='$id';";
			$res = mysqli_query($connection, $sql);
			if($res) {
				$json = array();
				while($row = mysqli_fetch_assoc($res)){
					$json[] = $row;
				}
				echo json_encode($json);
				} else {
				echo json_encode(['fail']);
			}
			} else {
			echo json_encode(['auth-fail']);
		}
	});
	
	$app->post('/check_json_exist', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		if(empty($id)) {
			echo json_encode(['false']);
			} else if(!is_dir('../src/json/'.$id)){
			echo json_encode(['false']);
			} else {
			echo json_encode(['true']);
		}
		
	});
	
	$app->post('/write_json', function(Request $request, Response $response) {
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		if(!is_dir('../src/json/'.$id)){
			mkdir('../src/json/'.$id);
		}
		
		$fp = fopen('../src/json/'.$id.'/data.json', 'w+');
		if($fp) {
			fwrite($fp, json_encode($data['data']));
			// echo json_encode(['success']);
			$message = uniqid() . " --> formatted documents of user " . $id . " uploaded";
			$log_id = md5($message);
			$date = date("F j, Y, h:i a");
			$sql_log = "INSERT INTO `log` VALUES('$log_id', '$id', 'none', 'upload_formatted_document', '$message', '$date');";
			$response = mysqli_query($connection, $sql_log);
			if($response) {
				echo json_encode(['success']);
				} else {
				echo json_encode(['fail->' . mysqli_error($connection)]);
			}
			} else {
			echo json_encode(['fail']);
		}
		fclose($fp);
		
		// echo $data['id'];1
		
	});
	
	$app->post('/read_json', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		$str = file_get_contents('../src/json/'.$id.'/data.json');
		
		$json = json_decode($str, true);
		
		echo json_encode($json);
		
	});
	
	$app->post('/get_reports', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id']; // "586988bd9f3f6dcdc6c0057576f58fd8"; // $obj['user_id'];
		
		// echo '../images/'.$id.'/';
		
		$scanned_directory = scandir('../src/images/'.$id.'/');
// 		echo json_encode($scanned_directory);
		$final_data = array();
		// echo json_encode($scanned_directory);
		if(count($scanned_directory) <= 1) {
			echo json_encode(['insufficient images found']);
		} else {
    		for($i = 2; $i < count($scanned_directory); $i++){
    			$path = 'http://www.fardeenpanjwani.com/xaptag/src/images/'.$id.'/'.$scanned_directory[$i];
    			$file = array('source' => array('uri' => $path));
    			array_push($final_data, $file);
    		}
    		
    		echo (string)json_encode($final_data, JSON_UNESCAPED_SLASHES);
    		
		}
	});
	
	$app->post('/get_prescriptions', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id']; // "586988bd9f3f6dcdc6c0057576f58fd8"; // $obj['user_id'];
		
		// echo '../prescriptions/'.$id.'/';
		
		$scanned_directory = scandir('../src/prescriptions/'.$id.'/');
// 		echo json_encode($scanned_directory);
		$final_data = array();
		// echo json_encode($scanned_directory);
		if(count($scanned_directory) <= 1) {
			echo json_encode(['insufficient prescriptions found']);
		} else {
    		for($i = 2; $i < count($scanned_directory); $i++){
    			$path = 'http://www.fardeenpanjwani.com/xaptag/src/prescriptions/'.$id.'/'.$scanned_directory[$i];
    			$file = array('source' => array('uri' => $path));
    			array_push($final_data, $file);
    		}
    		
    		echo (string)json_encode($final_data, JSON_UNESCAPED_SLASHES);
    		
		}
	});

	$app->post("/vists/user", function(Request $request, Response $response) {
		$data = $request->getParsedBody();
		$id = $data['id'];
		$sql_get_visits = "SELECT * FROM `visit` WHERE `visit`.`user_id`='$id' ORDER BY `visit`.`timestamp` ASC;";
		$response_get_visits = mysqli_query($connection, $sql_get_visits);
		$visits = array();
		while($row = mysqli_fetch_assoc($response_get_visits)) {
			$visits[] = $row;
		}
	});
	
	$app->post('/scan', function(Request $request, Response $response) {
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$data = $request->getParsedBody();
		$u_id = $data['u_id'];
		$d_id = $data['d_id'];
		$d_n = $data['d_n'];
		
		$u_id_check = !empty($u_id);
		$d_id_check = !empty($d_id);
		
		if($u_id_check && $d_id_check) {
			// ids are not empty
			// update user's visit log in database:
			
			$message = uniqid() . " --> user " . $u_id . " visited doctor " . $d_id;
			$log_id = md5($message);
			$date = date("F j, Y, h:i a");
			$sql_log = "INSERT INTO `log` VALUES('$log_id', '$u_id', '$d_id', 'visit', '$message', '$date');";
			$response_log = mysqli_query($connection, $sql_log);
			
			$date = date("F j, Y, h:i a");
			$v_id = md5("'$u_id' '$d_id'");
			
			$sql = "INSERT INTO `visit` VALUES('$v_id', '$u_id', '$d_id', '$d_n', '$date');";
			
			$response_sql = mysqli_query($connection, $sql);
			
			if($response_sql && $response_log) {
				// proceed with parsing user data
				// printing debug statement for now:
				$f_data = array();
				
				/**
					* 1. Get user data using id
					* 2. Get user's reports(formatted) from 'src/json/id/.....'
					* 3. Get user's reports(raw) from 'src/images/id/...'
					* 4. Get user's visit history
					* 5. Compress all the above data into a JSON array
				*/
				
				// 1.
				$sql_get_u_d = "SELECT * FROM `users` WHERE `users`.`id`='$u_id';";
				$response_u_d = mysqli_query($connection, $sql_get_u_d);
				$json_u_d = array();
				if($response_u_d){
					while($row = mysqli_fetch_assoc($response_u_d)) {
						$json_u_d[] = $row;
					}
				}
				
				$json_u_d = $json_u_d[0];
				
				$u_d_arr = array();
				
				if($json_u_d['misc_info'] == '1'){
					// misc info exists
					$sql_get_u_d_2 = "SELECT * FROM `user_additional_details` WHERE `user_additional_details`.`user_hash`='$u_id';";
					$response_u_d_2 = mysqli_query($connection, $sql_get_u_d_2);
					if($response_u_d_2) {
						$json_u_d_2 = array();
						while($row_2 = mysqli_fetch_assoc($response_u_d_2)) {
							$json_u_d_2[] = $row_2;
						}
						$json_u_d_2 = $json_u_d_2[0];
						
						$u_d_arr = array(
                        "name" => $json_u_d['name'],
                        "phone" => $json_u_d['phone'],
                        "email" => $json_u_d['email'], 
                        "em_phone" => $json_u_d_2['emergency_contact_number'],
                        "em_name" => $json_u_d_2['emergency_contact_name'],
                        "address" => $json_u_d_2['residential_address']
						);
					}
					} else {
					// misc info does not exist
					$u_d_arr = array(
                    "name" => $json_u_d['name'],
                    "phone" => $json_u_d['phone'],
                    "email" => $json_u_d['email'], 
                    "misc_info" => $json_u_d['misc_info']
					);
				}
				
				
				// 2. 
				$str = file_get_contents('../src/json/'.$u_id.'/data.json');
				
				$u_f_r = array();
				
				if($str) {
					$u_f_r = json_decode($str, true);
				}
				
				
				// 3.
				$scanned_directory = scandir('../src/images/'.$u_id.'/');
				$reports = array();
				$u_r_r = array();
				// echo json_encode($scanned_directory);
				if(count($scanned_directory) <= 1) {
					// echo json_encode(['insufficient images found']);
					} else {
					for($i = 2; $i < count($scanned_directory); $i++){
						$path = 'http://www.fardeenpanjwani.com/xaptag/src/images/'.$u_id.'/'.$scanned_directory[$i];
						$file = array('source' => array('uri' => $path));
						array_push($reports, $file);
					}
					
					$u_r_r = $reports;
					
				}
				
				
				// 4.
				$sql_get_visits = "SELECT * FROM `visit` WHERE `visit`.`user_id`='$u_id' ORDER BY `visit`.`timestamp` ASC;";
				$response_get_visits = mysqli_query($connection, $sql_get_visits);
				$visits = array();
				while($row = mysqli_fetch_assoc($response_get_visits)) {
					$visits[] = $row;
				}
				
				
				// 5.
				$final_data = array(
                "u_d" => $u_d_arr, 
                "f_r" => $u_f_r,
                "r_r" => $u_r_r,
                "u_v" => $visits
				);
				
				echo json_encode($final_data, JSON_UNESCAPED_SLASHES);
				
				} else {
				echo json_encode(['fail->' . mysqli_error($connection)]);
			}
		}
		
	});
	
	$app->post('/get_doctor_name', function(Request $request, Response $response) {
	    $connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
	    $data = $request->getParsedBody();
	    $id = $data['id'];
	    $sql_get_d_n = "select * from doctors where id='$id';";
		$res_d_n = mysqli_query($connection, $sql_get_d_n);
		$res_d_n_json = array();
		while($r = mysqli_fetch_assoc($res_d_n)) {
		    $res_d_n_json[] = $r;
		}
		echo json_encode($res_d_n_json);
	    
	});



/**********************************************WEB PANEL********************************************************/



	$app->get('/v1/panel/users/apiKey={api-key}', function(Request $request, Response $response, array $args) {

		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');

		$api_key = $args['api-key'];

        if($api_key == "xaptag_api_key_8945") {
    		$sql_get_ids = "SELECT * FROM `users` WHERE 1;";
    		$response = mysqli_query($connection, $sql_get_ids);
    		$ids = array();
    		while($row = mysqli_fetch_assoc($response)) {
    			$ids[] = $row;
    		}
    
    		if($response) {
    			echo json_encode($ids);
    		} else {
    			echo json_encode(["fail: " + mysqli_error($connection)]);
    		}
        } else {
            echo json_encode(["auth-fail"=>"invalid API key"]);
        }

	});
	
	$app->post('/v1/panel/docs/p/apiKey={api-key}/userId={id}', function(Request $request, Response $response, array $args) {
	    
	    $id = $args['id'];
		
		if($args['api-key'] == "xaptag_api_key_8945") {
		
		    if(is_dir('../src/prescriptions/'.$id.'/')) {
		
            // 		$data = $request->getParsedBody();
            		$id = $args['id']; // "586988bd9f3f6dcdc6c0057576f58fd8"; // $obj['user_id'];
            		
            		// echo '../prescriptions/'.$id.'/';
            		
            		$scanned_directory = scandir('../src/prescriptions/'.$id.'/');
            // 		echo json_encode($scanned_directory);
            		$final_data = array();
            		// echo json_encode($scanned_directory);
            		if(count($scanned_directory) <= 1) {
            			echo json_encode(['insufficient prescriptions found']);
            		} else {
                		for($i = 2; $i < count($scanned_directory); $i++){
                			$path = 'http://www.fardeenpanjwani.com/xaptag/src/prescriptions/'.$id.'/'.$scanned_directory[$i];
                			$file = array('source' => array('uri' => $path));
                			array_push($final_data, $file);
                		}
                		
                		echo (string)json_encode($final_data, JSON_UNESCAPED_SLASHES);
                		
        		}
		    } else {
		        echo json_encode([message=>"user id does not match existing ids"]);
		    }
		} else {
            echo json_encode(["auth-fail"=>"invalid API key"]);
        }
	});
	
	$app->post('/v1/panel/docs/apiKey={api-key}/userId={id}/type={type}', function(Request $request, Response $response, array $args) {
	    
	    $id = $args['id'];
		
		if($args['type'] == "r") {
		
    		if($args['api-key'] == "xaptag_api_key_8945") {
    		
    		    if(is_dir('../src/images/'.$id.'/')) {
    		        
    		        $scanned_directory = scandir('../src/images/'.$id.'/');
            // 		echo json_encode($scanned_directory);
            		$final_data = array();
            		// echo json_encode($scanned_directory);
            		if(count($scanned_directory) <= 1) {
            			echo json_encode(['insufficient images found']);
            		} else {
                		for($i = 2; $i < count($scanned_directory); $i++){
                			$path = 'http://www.fardeenpanjwani.com/xaptag/src/images/'.$id.'/'.$scanned_directory[$i];
                			$file = array('source' => array('uri' => $path));
                			array_push($final_data, $file);
                		}
                		
                		echo (string)json_encode($final_data, JSON_UNESCAPED_SLASHES);
                		
            		}
    		        
    		    } else {
    		        echo json_encode([message=>"user id does not match existing ids"]);
    		    }
    		} else {
                echo json_encode(["auth-fail"=>"invalid API key"]);
            }
		} else if($args['type'] == "p") {
		    
		    if($args['api-key'] == "xaptag_api_key_8945") {
		
    		    if(is_dir('../src/prescriptions/'.$id.'/')) {
    		
                // 		$data = $request->getParsedBody();
                		$id = $args['id']; // "586988bd9f3f6dcdc6c0057576f58fd8"; // $obj['user_id'];
                		
                		// echo '../prescriptions/'.$id.'/';
                		
                		$scanned_directory = scandir('../src/prescriptions/'.$id.'/');
                // 		echo json_encode($scanned_directory);
                		$final_data = array();
                		// echo json_encode($scanned_directory);
                		if(count($scanned_directory) <= 1) {
                			echo json_encode(['insufficient prescriptions found']);
                		} else {
                    		for($i = 2; $i < count($scanned_directory); $i++){
                    			$path = 'http://www.fardeenpanjwani.com/xaptag/src/prescriptions/'.$id.'/'.$scanned_directory[$i];
                    			$file = array('source' => array('uri' => $path));
                    			array_push($final_data, $file);
                    		}
                    		
                    		echo (string)json_encode($final_data, JSON_UNESCAPED_SLASHES);
                    		
            		}
    		    } else {
    		        echo json_encode([message=>"user id does not match existing ids"]);
    		    }
    		} else {
                echo json_encode(["auth-fail"=>"invalid API key"]);
            }    
		    
		} else {
		    echo json_encode([response=>"unexpected paramter for 'type'(type=" . $args['type'] . ").Expected 'r' or 'p'"]);
		}
	});
	
$app->run();

