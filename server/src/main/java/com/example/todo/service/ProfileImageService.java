package com.example.todo.service;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

// Service for handling profile image uploads to Google Cloud Storage
@Service
public class ProfileImageService {

    private final Storage storage;
    private final String bucketName;

    public ProfileImageService(Storage storage, @Value("${gcs.bucket-name}") String bucketName) {
        this.storage = storage;
        this.bucketName = bucketName;
    }

    public String uploadProfileImage(Long userId, MultipartFile file) {
        // validation
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Empty file");
        }
        String contentType = file.getContentType(); // check MIME type
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        // create unique object name
        String extension = getExtension(Objects.requireNonNull(file.getOriginalFilename()));
        String objectName = "users/" + userId + "/" + UUID.randomUUID() + extension;

        try {
            // upload to GCS
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, objectName).setContentType(contentType).build();

            // upload file
            storage.create(blobInfo, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }

        // If bucket is public or behind public CDN, this can be enough:
        return String.format("https://storage.googleapis.com/%s/%s", bucketName, objectName);
    }

    public void deleteProfileImage(Long userId, String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) return;

        String objectName = imageUrl.substring(imageUrl.indexOf(bucketName) + bucketName.length() + 1);

        storage.delete(bucketName, objectName);
    }

    private String getExtension(String filename) {
        int idx = filename.lastIndexOf('.');
        return (idx != -1) ? filename.substring(idx) : "";
    }
}
