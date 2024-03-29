# tuesday

A planned collection of personal microservices

## To Do

### Curation
- Scroll through images with mouseclick/keyboard press
- Random image display/timer

### Signup/Login

- Display errors in signup/login pages
- Another password field to check for typos
- Toggle password visibility button
- Password reset email
- Signup by invite only

### User Settings

- ~~Ensure profile image is in fact, an image~~
- ~~Set max image file size~~
- Display errors
  - Shows file size error

## Resources and Tutorials

- JWT Authentication: https://www.youtube.com/playlist?list=PLJRGQoqpRwdczZl-LndYIQ6ymybtUqT5G
- Server-side httpOnly cookie workaround: https://github.com/jazzband/djangorestframework-simplejwt/issues/71#issuecomment-762927394
- File Upload and Download in Django and React JS: https://www.youtube.com/watch?v=hVEkAkS-WKU

## Notes

### Deploying to Prod

Checklists:

- Commit/Merge latest changes.
- Ensure requirements.txt is up to date.
- If changes were made in the frontend, run 'npm run build' in the frontend.

1. Install Railway CLI (https://docs.railway.app/develop/cli).
2. Run 'railway up' in the terminal.

Making migrations:

- railway run python backend/manage.py makemigrations <-- This shouldn't be needed, as it should have been on the commit
- railway run python backend/manage.py migrate
