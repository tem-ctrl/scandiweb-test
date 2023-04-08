<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
use Scandiweb\Test\Models\ProductTrait;

class Book extends AbstractProduct
{
  use ProductTrait;

  protected float $weight;

  public function __construct($sku, $name, $price, $type, $weight) {
    parent::__construct($sku, $name, $price, $type);
    $this->weight = $weight;
  }

  public function getData(): array 
  {
    $data = [
      'sku' => $this->sku,
      'name' => $this->name,
      'price' => $this->price,
      'weight' => $this->weight
    ];
    return $data;
  }
}

