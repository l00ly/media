<?php

namespace Looly\Media\Controller;

use App\Entity\LoolyMedia\Media;
use Looly\Media\Form\UploadFormType;
use Looly\Media\Service\Filter\ListFilter;
use Looly\Media\Service\MediaServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MediaController extends AbstractController
{
    public function __construct(
        private MediaServiceInterface $service
    ) { }

    #[Route('/looly-media/medias/', name: 'looly_media_list')]
    public function __invoke(): Response
    {
        $filter = new ListFilter(
            24
        );

        $medias = $this->service->findList($filter);

        return $this->render('@looly_media/admin/index.html.twig', [
            'medias' => $medias,
        ]);
    }
}