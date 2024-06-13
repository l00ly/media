<?php

declare(strict_types=1);

namespace Looly\Media\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaChoiceType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'required' => false,
            'attr' => [
                'class' => 'l-media-field-choice-file',
                'required' => false,
            ],
        ]);
    }

    public function getParent(): ?string
    {
        return HiddenType::class;
    }
}
