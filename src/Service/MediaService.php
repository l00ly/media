<?php

namespace Looly\Media\Service;

use App\Entity\LoolyMedia\Media;
use Looly\Media\Repository\MediaRepositoryInterface;
use Looly\Media\Utilities\FileUploaderInterface;

class MediaService implements MediaServiceInterface
{
    public function __construct(
        protected MediaRepositoryInterface $repository,
        protected FileUploaderInterface $fileUploader
    ) { }

    public function add(Media $entity, bool $flush = false): void
    {
        $this->repository->add($entity, $flush);
    }

    public function update(Media $entity, bool $flush = false): void
    {
        $this->repository->update($entity, $flush);
    }

    public function remove(string|int|Media $entity, bool $flush = false): void
    {
        if (is_int($entity) || is_string($entity)) {
            $entity = $this->repository->findOneById($entity);
        }

        $this->repository->remove($entity, $flush);
    }

    public function save(): void
    {
        $this->repository->save();
    }

    public function list(int $limit, int $offset = 0): ?array
    {
        return $this->repository->list($limit, $offset);
    }

    public function findOneById(int $id): ?Media
    {
        return $this->repository->findOneById($id);
    }

    public function countList(): int
    {
        return $this->repository->countList();
    }
}