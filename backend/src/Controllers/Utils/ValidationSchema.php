<?php
declare(strict_types = 1);

namespace Scandiweb\Test\Controllers\Utils;
use Scandiweb\Test\Controllers\Utils\Constants;
use Nette\Schema\Expect;
use Nette\Schema\Processor;

class ValidationSchema
{
  public string $productType;

  public function __construct($productType)
  {
    $this->productType = strtolower($productType);
  }

  public function validate($data): bool | string
  {
    $propertyMap = Constants::PROPERTY_MAP;
    $types = [
    'sku' => Expect::string()->required(),
    'name' => Expect::string()->required(),
    'price' => Expect::number()->required()
   ];
   $productAttrs = $propertyMap[$this->productType]['attributes'];

   foreach ($productAttrs as $attr) {
     $types[$attr] = Expect::number()->required();
   }

   $schema = Expect::structure($types);
   $processor = new Processor();
   try 
   {
     $normalized = $processor->process($schema, $data);
     return true;
   }
   catch (Nette\Schema\ValidationException $e)
   {
     return $e->getMessage();
   }
  }
  
}
