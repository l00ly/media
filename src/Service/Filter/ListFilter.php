<?php

namespace Looly\Media\Service\Filter;

class ListFilter
{
    public function __construct(
        private int $limit,
        private int $page,
        private array $excludeIds = []
    ) {
    }

    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function excludeIds(): array
    {
        return $this->excludeIds;
    }
}