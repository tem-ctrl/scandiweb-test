<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
use Scandiweb\Test\Controllers\Utils\ValidationSchema;
use Scandiweb\Test\Controllers\Utils\HttpResponse;
use Scandiweb\Test\Models\ProductTrait;

class Dvd extends AbstractProduct
{
  use ProductTrait;

  protected float $size;

  public function __construct($sku, $name, $price, $type, $size) {
    parent::__construct($sku, $name, $price, $type);
    $this->size = $size;
  }

  public function getSize()
  {
    return $this->size;
  }

  public function save(): string 
  {
    if (!$this->validateData()){
      http_response_code(403);
      return 'invalid-data!';
    }

    $sql = "INSERT INTO $this->dbTable VALUES (:sku, :name, :price, :size)";
    $stmt = $this->dbConn->prepare($sql, [\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY]);
    try
    {
      $stmt->execute([
        'sku' => $this->sku,
        'name'=>$this->name,
        'price'=>$this->price,
        'size'=>$this->size
      ]);
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
      'size' => $this->size
      ];
    $schema = new ValidationSchema($this->dbTable);
    return $schema->validate($data);
  }
}

