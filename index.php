<?php
header('Access-Control-Allow-Origin: *');
$file = fopen('data2019.csv', 'r') or die('Unable to open file!');
$response = array();

fgets($file);

while (($line = fgets($file)) !== false) {
    $split_line = explode(';', $line);
    $line_array = array();

    $line_array['subject'] = $split_line[0];
    $line_array['startDate'] = date('Y-m-d', strtotime($split_line[1]));
    $line_array['startTime'] = $split_line[2];
    $line_array['endDate'] =  date('Y-m-d', strtotime($split_line[3]));
    $line_array['endTime'] = $split_line[4];
    $line_array['allDay'] = $split_line[5];
    $line_array['private'] = $split_line[6];

    $response[][] = $line_array;
}

fclose($file);

echo json_encode($response);