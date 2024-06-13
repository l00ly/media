<?php

namespace Looly\Media\DependencyInjection;

use Looly\Media\Entity\Media;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Exception\InvalidConfigurationException;

class Configuration implements ConfigurationInterface
{

    public function getConfigTreeBuilder(): TreeBuilder
    {
        $builder = new TreeBuilder('looly_media');

        $rootNode = $builder->getRootNode();

        $rootNode->children()
            ->scalarNode('media_entity')
            ->isRequired()
            ->validate()
            ->ifString()
            ->then(static function ($value) {
                if (!class_exists($value) || !is_a($value, Media::class, true)) {
                    throw new InvalidConfigurationException(sprintf('Media class must be a valid class extending %s. "%s" given.', Media::class, $value));
                }

                return $value;
            })
            ->end()
        ->end();

        return $builder;
    }
}