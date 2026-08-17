# JITTOO Business Studio

A clean, gesture-first business creative studio for photo, visual design, GIF assets, creative direction and premium workflows.

## Stack
- Static HTML/CSS/JS
- Fabric.js canvas editor
- Vercel serverless API for premium verification
- Local-first project storage

## Premium configuration
Set `PREMIUM_SHEET_CSV_URL` in Vercel Environment Variables to a server-accessible CSV export containing `name,startdate,key,enddate`.

Never put Google credentials or private secrets in browser code.

## Payments
The UI supports KBZPay / Wave Money instructions and routes users to the administrator Telegram contact. Payment approval remains admin-controlled.
