<?php

declare(strict_types=1);

namespace Oosaulenko\MediaBundle\Form;

use Oosaulenko\MediaBundle\Form\Type\MediaMultipleType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UploadFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('file', MediaMultipleType::class, [
            'label' => false,
            'required' => true,
        ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
    }
}
