<?php

declare(strict_types=1);

namespace Looly\Media\Form\Type;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'class' => 'App\Entity\LoolyMedia\Media',
            'multiple' => false,
            'required' => false
        ]);
    }

    public function getParent(): ?string
    {
        return EntityType::class;
    }
}
