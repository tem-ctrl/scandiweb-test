<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
use Scandiweb\Test\Controllers\Utils\ValidationSchema;
use Scandiweb\Test\Controllers\Utils\HttpResponse;
use Scandiweb\Test\Models\ProductTrait;

class Furniture extends AbstractProduct
{
  use ProductTrait;

  protected float $height;
  protected float $width;
  protected float $length;

  public function __construct($sku, $name, $price, $type, $height, $width, $length) {
    parent::__construct($sku, $name, $price, $type);
    $this->height = $height;
    $this->width = $width;
    $this->length = $length;
  }

  public function getHeight()
  {
    return $this->height;
  }
  public function getWidth()
  {
    return $this->width;
  }
  public function getLength()
  {
    return $this->length;
  }

  public function save(): string 
  {
    if (!$this->validateData()){
      http_response_code(403);
      return 'invalid-data!';
    }
   
    $sql = "INSERT INTO $this->dbTable VALUES (:sku, :name, :price, :height, :width, :length)";
    $stmt = $this->dbConn->prepare($sql, [\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY]);
    try
    {
      $stmt->execute([
        'sku' => $this->sku,
        'name'=>$this->name,
        'price'=>$this->price,
        'height'=>$this->height,
        'width'=>$this->width,
        'length'=>$this->length
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
      'height' => $this->height,
      'width'  => $this->width,
      'length' => $this->length
      ];
    $schema = new ValidationSchema($this->dbTable);
    return $schema->validate($data);
  }
}

