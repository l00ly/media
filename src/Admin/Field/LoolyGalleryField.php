<?php

namespace Looly\Media\Admin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Looly\Media\Form\Type\GalleryType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class LoolyGalleryField implements FieldInterface
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

            ->setFormType(GalleryType::class)
//            ->setFormTypeOptions([
//                'class' => 'App\Entity\LoolyMedia\Media',
//                'multiple' => true,
//            ])
            ->addCssClass('lm-field-gallery')
            ;
    }
}