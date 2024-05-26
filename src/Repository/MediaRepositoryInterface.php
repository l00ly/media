<?php

namespace Oosaulenko\MediaBundle\Repository;

use App\Entity\LoolyMedia\Media;

interface MediaRepositoryInterface
{
    /**
     * @param Media $entity
     * @param bool $flush
     * @return void
     */
    public function add(Media $entity, bool $flush = false): void;

    /**
     * @param Media $entity
     * @param bool $flush
     * @return void
     */
    public function update(Media $entity, bool $flush = false): void;

    /**
     * @param Media $entity
     * @param bool $flush
     * @return void
     */
    public function remove(Media $entity, bool $flush = false): void;

    /**
     * @return void
     */
    public function save(): void;

    /**
     * @param int $limit
     * @param int $offset
     * @return Media[]|null
     */
    public function list(int $limit, int $offset = 0): ?array;

    /**
     * @return int
     */
    public function countList(): int;

    /**
     * @param int $id
     * @return Media|null
     */
    public function findOneById(int $id): ?Media;
}