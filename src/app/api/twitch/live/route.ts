import { NextResponse } from 'next/server';

// Cache variables
let cachedData: { isLive: boolean; viewerCount?: number; title?: string; thumbnail?: string } | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds - respects rate limits

// Twitch API credentials - these should be set in your .env.local file
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const TWITCH_CHANNEL_NAME = 'lafededuchill';

// SIMULATION MODE - Set to true to test the live indicator
const SIMULATE_LIVE = false;

let accessToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error('Twitch credentials not configured');
  }

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Twitch access token');
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

  return accessToken;
}

async function checkIfLive() {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${TWITCH_CHANNEL_NAME}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': TWITCH_CLIENT_ID!,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stream status');
  }

  const data = await response.json();

  if (data.data && data.data.length > 0) {
    const stream = data.data[0];
    return {
      isLive: true,
      viewerCount: stream.viewer_count,
      title: stream.title,
      thumbnail: stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180'),
    };
  }

  return { isLive: false };
}

export async function GET() {
  try {
    const now = Date.now();

    // SIMULATION MODE - return fake live data
    if (SIMULATE_LIVE) {
      return NextResponse.json({
        isLive: true,
        viewerCount: 42,
        title: 'Learning Next.js and Building Cool Stuff!',
        thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_lafededuchill-320x180.jpg',
        cached: false,
        simulated: true,
      });
    }

    // Return cached data if still fresh
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cacheAge: Math.floor((now - lastFetchTime) / 1000),
      });
    }

    // Fetch fresh data
    const liveStatus = await checkIfLive();
    cachedData = liveStatus;
    lastFetchTime = now;

    return NextResponse.json({
      ...liveStatus,
      cached: false,
    });
  } catch (error) {
    console.error('Error checking Twitch live status:', error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        cached: true,
        error: 'Failed to fetch fresh data, using cache',
      });
    }

    return NextResponse.json(
      { error: 'Failed to check live status', isLive: false },
      { status: 500 }
    );
  }
}
