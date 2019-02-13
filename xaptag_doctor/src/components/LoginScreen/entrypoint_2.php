<?php

$app->post('/scan', function(Request $request, Response $response) {
    
    $connection = mysqli_connect('mysql.hostinger.in', 'u347889504_xap2', 'xaptag', 'u347889504_xap2');

    $data = $request->getParsedBody();
    $u_id = $data['u_id'];
    $d_id = $data['d_id'];

    $u_id_check = !empty($u_id);
    $d_id_check = !empty($d_id);

    if($u_id_check && $d_id_check) {
        // ids are not empty
        $date = date("F j, Y, h:i a");
        $v_id = md5("'$u_id' '$d_id'");

        $sql = "INSERT INTO `visit` VALUES('$v_id', '$u_id', '$d_id', '$date');";

        $response_sql = mysqli_query($connection, $sql);

        if($response_sql) {
            // proceed with parsing user data
            // printing debug statement for now:
            $f_data = array();

            /**
             * 1. Get user data using id
             * 2. Get user's reports(raw) from 'src/images/id/...'
             * 3. Get user's reports(formatted) from 'src/json/id/.....'
             * 4. Compress all the above data into a JSON array
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
                );
            }
            
            $str = file_get_contents('../src/json/'.$u_id.'/data.json');
            $u_f_r = json_decode($str, true);

            $scanned_directory = scandir('../src/images/'.$u_id.'/');
            $reports = array();
            $u_r_r = array();
            // echo json_encode($scanned_directory);
            if(count($scanned_directory) <= 1) {
                // echo json_encode(['insufficient images found']);
            } else {
                for($i = 2; $i < count($scanned_directory); $i++){
                    $path = 'http://www.fardeenpanjwani.com/xaptag/src/images/'.$u_id.'/'.$scanned_directory[$i];
                    // $file = array('source' => array('uri' => $path));
                    array_push($reports, $path);
                }
            
                $u_r_r = json_encode($reports, JSON_UNESCAPED_SLASHES);
                
            }
            
            $final_data = array(
                "u_d" => $u_d_arr, 
                "f_r" => $u_f_r,
                "r_r" => $u_r_r
            );
            
            echo json_encode($final_data, JSON_UNESCAPED_SLASHES);

        } else {
            echo json_encode(['fail->' . mysqli_error($connection)]);
        }
    }

});

?>