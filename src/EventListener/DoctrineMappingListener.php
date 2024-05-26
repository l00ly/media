<?php

declare(strict_types=1);

namespace Oosaulenko\MediaBundle\EventListener;

use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Doctrine\ORM\Events;
use Doctrine\ORM\Mapping\ClassMetadata;

/**
 * This class adds automatically the ManyToOne and OneToMany relations in Page and Category entities,
 * because it's normally impossible to do so in a mapped superclass.
 */
#[AsDoctrineListener(Events::loadClassMetadata)]
class DoctrineMappingListener
{
    public function __construct(private string $mediaClass)
    {
    }

    public function loadClassMetadata(LoadClassMetadataEventArgs $eventArgs): void
    {
        $classMetadata = $eventArgs->getClassMetadata();
        $this->processMedias($classMetadata, $this->mediaClass);
    }

    private function processMedias(ClassMetadata $classMetadata, string $class): void
    {
        if (!$classMetadata->hasAssociation('medias')) {
            $classMetadata->mapOneToMany([
                'fieldName' => 'medias',
                'targetEntity' => $class,
                'mappedBy' => 'folder',
                'cascade' => ['persist', 'remove'],
            ]);
        }
    }
}
