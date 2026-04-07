# The Scratch Kitchen

Next.js site and lightweight admin for Chef Tikara's meal prep and private chef business in Richmond, TX.

## Stack

- Next.js App Router
- Firebase Admin / Firestore
- Tailwind CSS v4
- Resend for weekly menu email sends

## Core Flows

- Homepage: meal prep + private chef positioning with contact/signup capture
- Menu: weekly dishes from Firestore plus direct order CTAs
- Subscribers: captured via `/api/subscribers`
- Private chef inquiries: captured via `/api/bookings`
- Admin: manage menu items, view subscribers and inquiries, send weekly menu email

## Local Dev

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Check

```bash
npm run build
```

## Weekly Menu Update Prompt

Use this prompt when updating the menu with AI help:

```text
I need to update The Scratch Kitchen website menu for this week.

Here is this week's menu:
- Theme: [e.g. Mexican-Inspired, Southern Comfort, Mediterranean]
- Week of: [date]

Dishes:
1. [Dish Name] — $[price]
   Description: [ingredients/description]
   Category: [Chicken/Beef/Seafood/Salads/Pasta/Other]
   Featured: [yes/no]

2. [Dish Name] — $[price]
   Description: [ingredients/description]
   Category: [Chicken/Beef/Seafood/Salads/Pasta/Other]
   Featured: [yes/no]

3. [Dish Name] — $[price]
   Description: [ingredients/description]
   Category: [Chicken/Beef/Seafood/Salads/Pasta/Other]
   Featured: [yes/no]

Please update the menu items so the website reflects this week's menu, keep the current design and layout, preserve the ordering/contact flow, and make sure the homepage and menu page stay aligned.
```

## Business Notes

- Menu drops Wednesday
- Orders close Friday at 8pm
- Pickup Sunday
- Delivery Monday-Tuesday
- Primary contact: `346-333-1292`
- Email: `hello@thescratchkitchentx.com`
