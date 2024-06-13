<?php

declare(strict_types=1);

namespace Looly\Media\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MediaMultipleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'attr' => [
                'class' => 'l-media-field-input-files',
                'data-max-file-size' => '10MB',
                'multiple' => 'multiple',
            ],
        ]);
    }

    public function getParent(): ?string
    {
        return FileType::class;
    }
}
