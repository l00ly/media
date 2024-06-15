<?php

declare(strict_types=1);

namespace Looly\Media\Form\Type;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GalleryType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'class' => 'App\Entity\LoolyMedia\Media',
            'multiple' => true,
            'required' => false
        ]);
    }

    public function getParent(): ?string
    {
        return EntityType::class;
    }
}
