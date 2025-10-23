# FedEduChill Website

The official website for FedEduChill - an educational streaming channel. This Next.js application provides a landing page with social media links and a live streaming indicator.

## Features

- **Live Streaming Indicator**: Real-time status indicator that shows when the Twitch channel is live
  - Displays "ON AIR" with viewer count when streaming
  - Shows "Offline" when not streaming
  - Smooth animated transitions between states
  - Auto-updates every 30 seconds
- **Social Media Links**: Quick access buttons to:
  - Twitch
  - YouTube
  - TikTok
  - Discord
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Custom purple/dark theme with vignette effect

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Twitch Helix API
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Get your Twitch API credentials from [Twitch Developer Console](https://dev.twitch.tv/console/apps)
   - Add your credentials to `.env.local`:
```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Required environment variables:

- `TWITCH_CLIENT_ID`: Your Twitch application client ID
- `TWITCH_CLIENT_SECRET`: Your Twitch application client secret

See `.env.local.example` for the template.

## API Routes

- `/api/twitch/live`: Returns the current live status of the Twitch channel
  - Caches responses for 30 seconds to respect Twitch rate limits
  - Returns: `{ isLive: boolean, viewerCount?: number, title?: string, thumbnail?: string }`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── twitch/
│   │       └── live/
│   │           └── route.ts          # Twitch API integration
│   └── page.tsx                      # Main landing page
├── components/
│   ├── Header.tsx                    # Logo and branding
│   ├── LiveIndicator.tsx             # Live streaming status widget
│   ├── TwitchButton.tsx              # Twitch link
│   ├── YouTubeButton.tsx             # YouTube link
│   ├── TikTokButton.tsx              # TikTok link
│   └── DiscordButton.tsx             # Discord link
└── ...
```

## Configuration

### Twitch API Setup

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Create a new application
3. Set OAuth Redirect URLs to:
   - `http://localhost:3000` (for development)
   - Your production domain (for production)
4. Copy the Client ID
5. Generate a new Client Secret
6. Add both to your `.env.local` file

### Rate Limiting

The application implements caching to respect Twitch's API rate limits:
- Server-side cache: 30 seconds
- Client-side polling: Every 30 seconds
- Maximum 2 requests per minute to Twitch API
- All visitors share the same cached response

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `TWITCH_CLIENT_ID`
   - `TWITCH_CLIENT_SECRET`
4. Deploy

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Development

### Simulation Mode

For testing the live indicator without streaming, you can enable simulation mode:

In `src/app/api/twitch/live/route.ts`, set:
```typescript
const SIMULATE_LIVE = true;
```

This will show the widget in "ON AIR" mode with mock data.

## Links

- Twitch: [https://www.twitch.tv/lafededuchill](https://www.twitch.tv/lafededuchill)
- YouTube: [https://www.youtube.com/@Lafededuchill](https://www.youtube.com/@Lafededuchill)
- TikTok: [https://www.tiktok.com/@lafededuchill](https://www.tiktok.com/@lafededuchill)
- Discord: [https://discord.gg/MMdNdWxa](https://discord.gg/MMdNdWxa)

## License

All rights reserved.
