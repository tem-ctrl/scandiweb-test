<?php

declare(strict_types=1);

namespace Scandiweb\Test\Models;

trait ProductTrait 
{
    public function getSku(): string
  {
    return parent::$sku;
  }
  public function getName(): string
  {
    return parent::$name;
  }
  public function getPrice(): float
  {
    return parent::$price;
  }
  public function getType(): string
  {
    return parent::$type;
  }
}
