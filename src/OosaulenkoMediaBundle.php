<?php

namespace Oosaulenko\MediaBundle;

use Oosaulenko\MediaBundle\DependencyInjection\OosaulenkoMediaExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class OosaulenkoMediaBundle extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }

    /**
     * @return ExtensionInterface|null The container extension
     */
    public function getContainerExtension(): ?ExtensionInterface
    {
        return new OosaulenkoMediaExtension();
    }
}