<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

DEFINE('dbuser', 'u347889504_102');
DEFINE('dbpass', 'madrasa_books');
DEFINE('dbhost', 'mysql.hostinger.in');
DEFINE('dbname', 'u347889504_102');

$connection = mysqli_connect(dbhost, dbuser, dbpass, dbname);

$app = new \Slim\App;
$app->get('/books', function(Request $request, Response $response) {

    global $connection;

    $sql = "SELECT * FROM `book` WHERE 1;";
    $res = mysqli_query($connection, $sql);
    if($res) {
        $json = array();
        while($row = mysqli_fetch_assoc($res)) {
            $json[] = $row;
        }
        echo json_encode($json);
    } else {
        echo json_encode([mysqli_error($connection)]);
    }
    
});

$app->post('/hadiths', function(Request $request, Response $response) {

    global $connection;
    
    $data = $request->getParsedBody();
    $book_id = $data['book_id'];

    $sql = "SELECT * FROM `hadith` WHERE `hadith`.`book_id`='$book_id' ORDER BY `hadith`.`added_on` ASC;";
    $res = mysqli_query($connection, $sql);
    if($res) {
        $json = array();
        while($row = mysqli_fetch_assoc($res)) {
            $json[] = $row;
        }
        echo json_encode($json);
    } else {
        echo json_encode([mysqli_error($connection)]);
    }
    
});

$app->post('/add/book', function(Request $request, Response $response) {

    global $connection;

    $data = $request->getParsedBody();
    
    if(!(empty($data['name']) || empty($data['h_count']) || empty($data['added_on']))){
        $book_name = $data['name'];
        $added_on = $data['added_on'];
        $h_count = $data['h_count'];
        $book_id = $data['book_id'];
        
        $sql = "INSERT INTO `book` VALUES('$book_id', '$book_name', '$added_on', '$h_count');";
        $res = mysqli_query($connection, $sql);
        if($res) {
            echo json_encode(['success']);
        } else {
            echo json_encode(['fail']);
        }
    } else {
        echo json_encode(['fail']);
    }
    
});

$app->post('/add/hadith', function(Request $request, Response $response) {

    global $connection;

    $data_raw = $request->getParsedBody();
    $data = json_decode($data_raw, true);
    
    for($i = 0; $i < count($data['data']); $i++) {
        $content = $data[$i]['content'];
        $added_on = $data[$i]['added_on'];
        $book_id = $data[$i]['book_id'];
        $hadith_id = md5("'$content', '$added_on'");
        $sql = "INSERT INTO `hadith` VALUES('$hadith_id', '$book_id', '$content', '$added_on');";
        mysqli_query($connection, $sql);
    }

    // $data = $request->getParsedBody();
    // $data_json = json_decode($data['data']);
    // $content = $data['content'];
    // $added_on = $data['added_on'];
    // $hadith_id = md5("'$book_id', '$content'");
    
    // $sql = "INSERT INTO `hadith` VALUES('$hadith_id', '$book_id', '$content', '$added_on');";
    // $res = mysqli_query($connection, $sql);
    // if($res) {
    //     echo json_encode(['success']);
    // } else {
    //     echo json_encode(['fail'.mysqli_error($connection)]);
    // }
    
});
$app->run();
