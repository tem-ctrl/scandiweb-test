<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
use Scandiweb\Test\Models\ProductTrait;

class Dvd extends AbstractProduct
{
  use ProductTrait;

  protected float $size;

  public function __construct($sku, $name, $price, $type, $size) {
    parent::__construct($sku, $name, $price, $type);
    $this->size = $size;
  }

  public function getData(): array 
  {
    return [
      'sku' => $this->sku,
      'name' => $this->name,
      'price' => $this->price,
      'size' => $this->size
    ];
  }
}

