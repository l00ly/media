<?php

declare(strict_types=1);

namespace Oosaulenko\MediaBundle\Controller;

use App\Entity\LoolyMedia\Media;
use Oosaulenko\MediaBundle\Service\MediaServiceInterface;
use Oosaulenko\MediaBundle\Utilities\FileUploaderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/bundle/oosaulenko/media-bundle', name: 'oosaulenko_media_')]
class ApiController extends AbstractController
{
    public function __construct(
        protected FileUploaderInterface $fileUploader,
        protected MediaServiceInterface $mediaService
    ) { }

    #[Route('/fetch-list', name: 'fetch_list')]
    public function index(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());
        $medias = $this->mediaService->list($content->limit, $content->offset);

        return $this->json([
            'meta' => [
                'limit' => $content->limit,
                'offset' => $content->offset + $content->limit,
                'total' => $this->mediaService->countList()
            ],
            'body' => $medias
        ]);
    }

    #[Route('/get_one', name: 'get_one')]
    public function getOne(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());
        $media = $this->mediaService->findOneById((int) $content->id);

        return $this->json([
            'body' => $media
        ]);
    }

    #[Route('/add', name: 'add')]
    public function add(Request $request): JsonResponse
    {
        $inputs = $request->files->all();

        foreach ($inputs as $input) {
            $field_name = array_key_first($input);
            $file = $this->fileUploader->upload($input[$field_name]);

            $media = new Media();
            $media->setData($file);

            $this->mediaService->add($media);
        }

        $this->mediaService->save();

        return $this->json([ ]);
    }

    #[Route('/remove', name: 'remove')]
    public function remove(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        if (!isset($content->id)) {
            return $this->json([
                'status' => 'error',
                'message' => 'Media ID is required'
            ]);
        }

        $this->mediaService->remove($content->id, true);

        return $this->json([
            'status' => 'success'
        ]);
    }
}
