# Onitsha MarketPlace Web App

Buyer-facing marketplace built with React and Vite. The app includes Home, Explore, Cart, Inbox, and Profile pages, with individual product routes (`/product/:productId`), merchant store profiles (`/store/:storeId`), and nearby shops (`/shops/nearby`).

## Local development

```sh
npm ci
npm run dev
```

Run the production checks locally:

```sh
npm run lint
npm run build
npm run preview
```

## Deploy to Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages and use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

The site is a client-rendered single-page app. Cloudflare Pages serves the SPA entry point for application routes, so product links such as `/product/586974`, store links, and `/shops/nearby` can be opened directly.

See Cloudflare’s [React deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) for Git integration and deployment setup.
