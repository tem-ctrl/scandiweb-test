<?php 
declare(strict_types = 1);
namespace Scandiweb\Test\Controllers\Utils;
use Scandiweb\Test\Controllers\Utils\Constants;

class HttpResponse {
  private int $code;
  private string $message;

  public static function set(string $type): string
  {
    [$code, $message] = Constants::HTTP_RESPONSES[$type];
    header('Content-Type: application/json', true, $code);
    return json_encode(['message'=> $message]);
  }
}
