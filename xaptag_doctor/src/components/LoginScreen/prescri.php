$app->post('/check_json_exist_prescription', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		if(empty($id)) {
			echo json_encode(['false']);
			} else if(!is_dir('../src/prescription/'.$id)){
			echo json_encode(['false']);
			} else {
			echo json_encode(['true']);
		}
		
	});
	
$app->post('/write_json_prescription', function(Request $request, Response $response) {
		
		$connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		if(!is_dir('../src/prescription/'.$id)){
			mkdir('../src/prescription/'.$id);
		}
		
		$fp = fopen('../src/prescription/'.$id.'/data_p.json', 'w+');
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
	
	$app->post('/read_json_prescription', function(Request $request, Response $response) {
		
		$data = $request->getParsedBody();
		$id = $data['id'];
		
		$str = file_get_contents('../src/prescription/'.$id.'/data_p.json');
		
		$json = json_decode($str, true);
		
		echo json_encode($json);
		
	});