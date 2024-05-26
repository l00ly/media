<?php

namespace Oosaulenko\MediaBundle\Service;

use App\Entity\LoolyMedia\Media;

interface MediaServiceInterface
{
    public function add(Media $entity, bool $flush = false): void;

    public function update(Media $entity, bool $flush = false): void;

    public function remove(string|int|Media $entity, bool $flush = false): void;

    public function save(): void;

    /**
     * @param int $limit
     * @param int $offset
     * @return Media[]|null
     */
    public function list(int $limit, int $offset = 0): ?array;

    /**
     * @param int $id
     * @return Media|null
     */
    public function findOneById(int $id): ?Media;

    public function countList(): int;
}