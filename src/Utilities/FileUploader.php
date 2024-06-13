<?php

namespace Looly\Media\Utilities;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader implements FileUploaderInterface
{
    private string $defaultFolder = 'uploads/';

    public function upload(UploadedFile $file): ?array
    {
        $fileName = md5(date('Y-m-d H:i:s:u')) . uniqid('-') . '.' . $file->guessExtension();
        $currentFolder = $this->currentFolder();

        $file_data = [
            'name' => $fileName,
            'folder' => $currentFolder,
            'mime' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];

        try {
            $file->move($currentFolder, $fileName);
            $this->createResizedImages($currentFolder, $fileName);
            $this->convertToWebp($currentFolder, $fileName);
        } catch (FileException $e) {
            return null;
        }

        return $file_data;
    }

    private function currentFolder(): string
    {
        return $this->defaultFolder . date('Y/m/');
    }

    private function createResizedImages(string $folder, string $fileName)
    {
        $imagePath = $folder . $fileName;
        list($width, $height) = getimagesize($imagePath);
        $image = imagecreatefromstring(file_get_contents($imagePath));

        // Размеры для мобильных устройств, планшетов и десктопов
        $sizes = [
            'mobile' => 320,
            'tablet' => 768,
            'desktop' => 1024,
        ];

        foreach ($sizes as $device => $newWidth) {
            $newHeight = intval($height * $newWidth / $width);
            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            $resizedImagePath = $folder . pathinfo($fileName, PATHINFO_FILENAME) . "_{$device}." . pathinfo($fileName, PATHINFO_EXTENSION);
            imagejpeg($resizedImage, $resizedImagePath);
            imagedestroy($resizedImage);
        }

        imagedestroy($image);
    }

    private function convertToWebp(string $folder, string $fileName)
    {
        $imagePath = $folder . $fileName;
        $image = imagecreatefromstring(file_get_contents($imagePath));
        $webpFileName = pathinfo($fileName, PATHINFO_FILENAME) . ".webp";
        $webpFilePath = $folder . $webpFileName;
        imagewebp($image, $webpFilePath);
        imagedestroy($image);

        // Конвертация уменьшенных копий в webp
        $devices = ['mobile', 'tablet', 'desktop'];
        foreach ($devices as $device) {
            $resizedImagePath = $folder . pathinfo($fileName, PATHINFO_FILENAME) . "_{$device}." . pathinfo($fileName, PATHINFO_EXTENSION);
            $resizedImage = imagecreatefromjpeg($resizedImagePath);
            $resizedWebpPath = $folder . pathinfo($fileName, PATHINFO_FILENAME) . "_{$device}.webp";
            imagewebp($resizedImage, $resizedWebpPath);
            imagedestroy($resizedImage);
        }
    }
}