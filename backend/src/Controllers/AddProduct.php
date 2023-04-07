<?php

declare(strict_types = 1);

namespace Scandiweb\Test\Controllers;
use Scandiweb\Test\Controllers\AbstractController;

class AddProduct extends AbstractController
{
  public static function execute(): void
  {
    $data = $_POST;
    $p = ['price', 'size', 'weight', 'height', 'width', 'length'];
    $keys = array_keys($data);
    foreach($p as $i) {
      in_array($i, $keys) && $data[$i]  = (float) $data[$i];
    }
    
    $class = "Scandiweb\\Test\\Models\\".ucfirst($data['type']);
    try 
    {
      $product = new $class(...array_values($data));
      echo $product->save();
    }
    catch (\ErrorException $e)
    {
      echo HttpResponse::set('invalid-data');
    }
  }

  // private function save($product): string 
  // {
  //   if (!$product->validateData()) {
  //     return HttpResponse::set('invalid-data');
  //   }
  //   $sql = "INSERT INTO $this->dbTable VALUES (:sku, :name, :price, :size)";
  //   $stmt = $this->dbConn->prepare($sql, [\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY]);
  //   try
  //   {
  //     $stmt->execute(['sku' => $this->sku, 'name'=>$this->name, 'price'=>$this->price, 'size'=>$this->size]);
  //     return HttpResponse::set('added');
  //   } 
  //   catch (\Exception $e)
  //   { 
  //     http_response_code(403);
  //     $e->getMessage();
  //   }
  // }
}
