<?php
// required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
  header("HTTP/1.1 200 OK");
  exit;
}


