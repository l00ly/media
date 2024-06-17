<?php

namespace Looly\Media\Admin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Looly\Media\Form\Type\MediaType;

class LoolyMediaField implements FieldInterface
{
    use FieldTrait;

    /**
     * @param string|true|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        return (new self())
            ->setProperty($propertyName)
            ->setLabel($label)
            ->hideOnIndex()
            ->setColumns(12)

            ->setFormType(MediaType::class)
            ->addCssClass('lm-field-media')
            ;
    }
}