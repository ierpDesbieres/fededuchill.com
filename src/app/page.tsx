import Header from '@/components/Header';
import TwitchButton from '@/components/TwitchButton';
import DiscordButton from '@/components/DiscordButton';
import YouTubeButton from '@/components/YouTubeButton';
import TikTokButton from '@/components/TikTokButton';
import LiveIndicator from '@/components/LiveIndicator';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative" style={{ backgroundColor: '#13052E' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)'
      }}></div>
      <LiveIndicator />
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-1">
      <main className="text-center max-w-2xl mx-auto p-8">
        <Header />

        <div className="mt-24 flex flex-col sm:flex-row gap-8 justify-center items-center">
          <TwitchButton />
          <YouTubeButton />
          <TikTokButton />
          <DiscordButton />
        </div>
      </main>
      </div>
    </div>
  );
}
