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