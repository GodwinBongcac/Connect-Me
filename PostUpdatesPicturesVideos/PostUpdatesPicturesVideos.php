if (isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $fileType = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedTypes = array('jpg', 'jpeg', 'png', 'gif');

    if (!in_array($fileType, $allowedTypes)) {
        // File type is not allowed
        echo "Invalid file type. Please upload a JPEG, PNG, or GIF image.";
        exit;
    }

    // File type is allowed, continue with file upload
    // ...
}