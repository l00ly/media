<?php

declare(strict_types=1);

namespace Looly\Media\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'required' => false,
            'attr' => [
                'class' => 'l-media-field-input-file',
                'data-max-file-size' => '10MB',
                'required' => false,
            ],
        ]);
    }

    public function getParent(): ?string
    {
        return TextType::class;
    }
}
