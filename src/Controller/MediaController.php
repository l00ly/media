<?php

namespace Oosaulenko\MediaBundle\Controller;

use App\Entity\LoolyMedia\Media;
use Oosaulenko\MediaBundle\Form\UploadFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MediaController extends AbstractController
{
    #[Route('/easymedia/medias/', name: 'oosaulenko_media_list')]
    public function __invoke(): Response
    {
        return $this->render('@oosaulenko_media/admin/index.html.twig');
    }

    #[Route('/easymedia/medias/upload', name: 'oosaulenko_media_upload')]
    public function upload(Request $request): Response
    {
        $form = $this->createForm(UploadFormType::class);
        $form->handleRequest($request);

        return $this->render('@oosaulenko_media/admin/upload.html.twig', [
            'form' => $form->createView(),
            'title' => 'Upload Media'
        ]);
    }
}