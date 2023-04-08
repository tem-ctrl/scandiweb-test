<?php 

declare(strict_types = 1);
namespace Scandiweb\Test\Models;
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

  public function getData(): array 
  {
    $data = [
      'sku' => $this->sku,
      'name' => $this->name,
      'price' => $this->price,
      'height' => $this->height,
      'width' => $this->width,
      'length' => $this->length,
    ];
    return $data;
  }
}

