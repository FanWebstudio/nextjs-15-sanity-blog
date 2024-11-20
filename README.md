# Next.js Blog with Sanity CMS

A modern, responsive blog built with Next.js 14, Tailwind CSS, and Sanity CMS.

## Features

- 🚀 Built with Next.js 14 App Router
- 📝 Sanity CMS for content management
- 🎨 Tailwind CSS for styling
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🖼️ Image optimization with next/image
- 🔍 SEO optimized
- 🔄 Incremental Static Regeneration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the blog

## Deployment

The blog can be deployed on Vercel with zero configuration:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy!

## Tech Stack

- **Framework:** Next.js 14
- **Content Management:** Sanity CMS
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Image Optimization:** next/image
- **Font:** Inter (Google Fonts)

## License

MIT
