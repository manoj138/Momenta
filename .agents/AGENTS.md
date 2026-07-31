# Project Rules & Design Guidelines

## Strict No-Base64 Policy (NO_BASE64_POLICY)
1. **Zero Base64 Data URLs**: Base64 data URLs (`data:image/...`, `data:audio/...`, `data:application/...`) are strictly forbidden across the entire codebase (frontend, backend, database models, context state, and API requests).
2. **Direct Server File Storage**: All uploaded media (images, background music, videos) MUST be saved as real physical files on the server disk under `Backend/public/uploads/` directory.
3. **Clean Relative/Absolute URLs**: Database documents and form states must store only clean file path URLs (e.g., `/uploads/media_17854.jpg` or `http://localhost:3000/uploads/media_17854.mp3`).
4. **Backend Base64 Safeguard**: Any legacy base64 strings encountered on backend endpoints must be immediately converted to disk files under `/uploads/` and stripped from MongoDB documents.
