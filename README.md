# URL Shortener

A small URL shortening app with a React frontend and Express/MongoDB backend.

## API Documentation

The backend exposes a simple URL API under `/url`.

### Create a short URL

- Method: `POST`
- Path: `/url`
- Request body:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- Response example:
  ```json
  {
    "id": "abc123",
    "shortId": "abc123"
  }
  ```

### List all short URLs

- Method: `GET`
- Path: `/url`
- Response example:
  ```json
  {
    "urls": [
      {
        "id": "646d6f5d18a2f6f8e5f34f1c",
        "shortId": "abc123",
        "redirectURL": "https://example.com",
        "shortURL": "http://localhost:8001/url/abc123",
        "totalClicks": 5,
        "createdAt": "2026-06-02T12:34:56.789Z"
      }
    ]
  }
  ```

### Get analytics for a short URL

- Method: `GET`
- Path: `/url/analytics/:shortID`
- Response example:
  ```json
  {
    "totalClicks": 5,
    "analytics": [
      { "timestamp": 1717108480000 },
      { "timestamp": 1717108540000 }
    ]
  }
  ```

### Redirect a short URL

- Method: `GET`
- Path: `/url/:shortID`
- Behavior:
  - If `shortID` exists, the backend responds with a redirect to the saved destination URL.
  - If `shortID` is unknown, the backend returns a `404` JSON error:
    ```json
    { "error": "Short URL not found" }
    ```

## Notes

- The backend generates the full short URL dynamically from the request host and stored `shortId`.
- `express.json()` is used to parse incoming JSON request bodies.
- The backend returns `404 Not found` for unmatched routes and `404 Short URL not found` for unknown short codes.
