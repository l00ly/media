<?php

namespace Looly\Media\Twig;

use Looly\Media\Service\MediaServiceInterface;
use Symfony\Component\Filesystem\Filesystem;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class MediaExtension extends AbstractExtension
{
    public function __construct(
        protected MediaServiceInterface $mediaService,
        protected Environment $twig
    ) { }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('looly_media', [$this, 'media'], ['is_safe' => ['html']]),
        ];
    }

    public function media(null|string|int $id)
    {
        if(!$id) {
            return '';
        }

        $media = $this->mediaService->findOneById($id);

        $filesystem = new Filesystem();
        $variations = ['mobile', 'tablet', 'desktop'];
        $mediaVariations = [];

        foreach ($variations as $variation) {
            $file_path = $media->getFolder().'/'.$media->getSlug().'_'.$variation.'.webp';

            if ($filesystem->exists($file_path)) {
                $mediaVariations[$variation] = $file_path;
            }
        }

        return $this->twig->render('@looly_media/extension/picture.html.twig', [
            'media' => $media,
            'variations' => $mediaVariations
        ]);
    }
}