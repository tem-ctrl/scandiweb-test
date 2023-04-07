<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
use Scandiweb\Test\Controllers\Utils\ValidationSchema;
use Scandiweb\Test\Controllers\Utils\HttpResponse;
use Scandiweb\Test\Models\ProductTrait;

class Book extends AbstractProduct
{
  use ProductTrait;

  protected float $weight;

  public function __construct($sku, $name, $price, $type, $weight) {
    parent::__construct($sku, $name, $price, $type);
    $this->weight = $weight;
  }

  public function getWeight()
  {
    return $this->weight;
  }

  public function save(): string 
  {
    if (!$this->validateData()){
      http_response_code(403);
      return 'invalid-data!';
    }
    $sql = "INSERT INTO $this->dbTable VALUES (:sku, :name, :price, :weight)";
    $stmt = $this->dbConn->prepare($sql, [\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY]);

    try
    {
      $stmt->execute(['sku' => $this->sku, 'name'=>$this->name, 'price'=>$this->price, 'weight'=>$this->weight]);

      http_response_code(201);
      return "Product added successfully !";
    } 
    catch (\Exception $e)
    {
      http_response_code(403);
      return $e->getMessage();
    }
  }

  protected function validateData(): bool
  {
    $data = [
      'sku' => $this->sku,
      'name' => $this->name,
      'price' => $this->price,
      'weight' => $this->weight
      ];
    $schema = new ValidationSchema($this->dbTable);
    return $schema->validate($data);
  }
}

