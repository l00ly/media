<?php

namespace Oosaulenko\MediaBundle\Exception;

use Exception;

abstract class CustomException extends Exception
{
    public function __construct(string $string, int $code)
    {
        parent::__construct($string, $code);
    }

    abstract public function serializeErrors(): array;
}