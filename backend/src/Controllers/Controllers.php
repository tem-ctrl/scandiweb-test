<?php

declare(strict_types = 1);

namespace Scandiweb\Test\Controllers;
use Scandiweb\Test\Controllers\Utils\DbConnect;
use Scandiweb\Test\Controllers\Utils\Constants;
use Scandiweb\Test\Controllers\Utils\HttpResponse;

class Controllers 
{
  public static function getProducts(): void
  {
    try 
    {
      $dbObj = new DbConnect;
      $dbConn = $dbObj->connect();
      $allProducts = [];
      $dbs = array_keys(Constants::PROPERTY_MAP);

      foreach ($dbs as $db) {
        $sql = "SELECT * FROM $db";
        $stmt = $dbConn->query($sql);
        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
          $product += ['type' => $db];
        }
        $allProducts = array_merge($allProducts, $products);
        // Sort products by sku value
        usort($allProducts,  fn($a, $b) =>  strcmp($a['sku'], $b['sku']));
      }
      http_response_code(200);
      echo json_encode($allProducts);
      exit;
    }
    catch (\Exception $e)
    {
      HttpResponse::dbError($e->getMessage());
    }
  }


  public static function addProduct(): void
  {
    $data = $_POST;
    $p = ['price', 'size', 'weight', 'height', 'width', 'length'];
    $keys = array_keys($data);
    foreach($p as $i) {
      in_array($i, $keys) && $data[$i]  = (float) $data[$i];
    }
    
    $class = "Scandiweb\\Test\\Models\\".ucfirst($data['type']);
    $product = new $class(...array_values($data));
    $product->save();
  }


  public static function deleteProducts(): void
  {    
    try 
    {
      $dbObj = new DbConnect;
      $dbConn = $dbObj->connect();
      
      $data = $_REQUEST;

      foreach(array_keys($data) as $db) {
        $skus = implode(',', array_map(fn($item) => "'$item'", $data[$db]));
        $sql = "DELETE FROM $db WHERE sku IN ($skus)";
        $stmt = $dbConn->prepare($sql);
        $stmt->execute();
      }
      HttpResponse::deleted();
    } 
    catch (\Exception $e) 
    {
      HttpResponse::dbError($e->getMessage());
    }
  }
}
