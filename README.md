<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/26a30855-1997-4147-8c1c-a4d6d417a18b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Backend (Google Apps Script)

انسخ `backend/Code.gs` و `backend/EmailTemplates.html` إلى مشروع Apps Script المرتبط بالشيت، ثم انشر **نسخة جديدة** من تطبيق الويب (Deploy > Manage deployments > Edit > New version) بعد أي تعديل.
إذا كان تبويب `Requests_Warehouses_ISO` موجوداً من قبل، أضف في الصف الأول العمود O بعنوان `Submitter Email`.
