<?php

declare(strict_types=1);

namespace Scandiweb\Test\Models;
use Scandiweb\Test\Controllers\Utils\ValidationSchema;

trait ProductTrait 
{
  public function save(): void 
  {
    $data = self::getData();
    $dbTable = $this->dbTable;

    $validationSchema = new ValidationSchema($dbTable);
    $isValid = $validationSchema->validate($data);

    gettype($isValid) === 'string' && HttpResponse::invalidData($isValid);

    $sqlValueString = join(', ', array_map(fn($item) => ":".$item, array_keys($data)));
    $sql = "INSERT INTO $dbTable VALUES ($sqlValueString)";
    $stmt = $this->dbConn->prepare($sql, [\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY]);
    try
    {
      $stmt->execute($data);
      HttpResponse::added();
    } 
    catch (\Exception $e)
    {
      HttpResponse::dbError($e->getMessage());
    }
  }
}
