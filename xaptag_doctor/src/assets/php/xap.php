<?php

    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $userId = $obj['data'][0]['userId'];
    // $base64 = $obj['base64'];
    // $image_name = $obj['image_name'];
    // $user_id = $obj['user_id'];
    if(!is_dir('../images/'.$userId)){
        mkdir('../images/'.$userId);
    }
    $flag = 0;
    for ($i = 0; $i < count($obj['data']); $i++){
        $base64 = $obj['data'][$i]['imageBase64Data'];
        $imageName = $obj['data'][$i]['imageName'];
        $userId = $obj['data'][$i]['userId'];
        if(file_put_contents('../images/'.$userId.'/'.$imageName, base64_decode($base64))){
            $flag += 1;
        }
    }
    if($flag == count($obj['data'])){
        echo json_encode(['successfully uploaded '.count($obj['data']).' image(s)']);
    } else {
        echo json_encode(['an error occured when uploading images']);
    }

?>