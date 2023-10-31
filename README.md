# OnURL

OnURL is a URL shortener which makes it easy to shorten and share your URLs.  
Live site on [Vercel](https://vercel.com) is **[here](https://onurl.vercel.app/)**.

## 💻 Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Schema Validation: [Zod](https://zod.dev/)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Social Media Share Buttons: [react-share](https://github.com/nygardk/react-share)
- Database: [MongoDB](https://www.mongodb.com/)
- ODM: [Prisma](https://www.prisma.io/)
- Illustrations: [unDraw](https://undraw.co/)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- Deployment: [Vercel](https://vercel.com/)

## ⌨️ Development

TODO: `README` will be updated for using Dev Containers.

First, you need to set a MongoDB connection string for `DATABASE_URL` in `.env.development`.

Install dependencies:

### `npm install`

Create db constaints (like `@unique` indexes):

### `npm run db:migrate`

Run it in development mode:

### `npm run dev`

## 🚀 Build

First, we need to set a MongoDB connection string for `DATABASE_URL` in `.env.production`.

After that, we need to run the below command first to create a production build:

```bash
npm run build
```

And we can run the app in `production` mode by running:

```bash
npm start
```
