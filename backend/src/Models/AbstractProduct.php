<?php
declare(strict_types = 1);

namespace Scandiweb\Test\Models;

use Scandiweb\Test\Controllers\Utils\DbConnect;

abstract class AbstractProduct
{
  protected string $sku;
  protected string $name;
  protected float $price;
  protected string $dbTable;
  protected $dbConn;

  protected function __construct($sku, $name, $price, $type)
  {
    $this->sku = $sku;
    $this->name = $name;
    $this->price = $price;
    $this->dbTable = $type;

    $dbObj = new DbConnect;
    $this->dbConn = $dbObj->connect();
  }

  abstract protected function save(): void;
  abstract protected function getData(): array;
}
