import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Download, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DownloadButton } from "@/components/download-button"
import { CommentsSection } from "@/components/comments-section"

// Mock app data - in a real app, this would come from a database
const apps = {
  "whatsapp-messenger": {
    id: "whatsapp-messenger",
    name: "WhatsApp Messenger",
    developer: "WhatsApp LLC",
    rating: 4.1,
    totalRatings: "75M",
    downloads: "5B+",
    category: "Communication",
    size: "64MB",
    version: "2.23.25.84",
    icon: "/placeholder.svg?height=120&width=120&text=WA",
    description:
      "WhatsApp Messenger is a FREE messaging app available for Android and other smartphones. WhatsApp uses your phone's Internet connection (4G/3G/2G/EDGE or Wi-Fi, as available) to message and call friends and family. Switch from SMS to WhatsApp to send and receive messages, calls, photos, videos, documents, and Voice Messages. WHY USE WHATSAPP: • NO FEES: WhatsApp uses your phone's Internet connection (4G/3G/2G/EDGE or Wi-Fi, as available) to message and call friends and family, so you don't have to pay for every message or call. • MULTIMEDIA: Send and receive photos, videos, documents, and Voice Messages. • FREE CALLS: Call your friends and family for free with WhatsApp Calling, even if they're in another country. WhatsApp calls use your phone's Internet connection rather than your cellular plan's voice minutes. (Note: Data charges may apply. Contact your provider for details. Also, you can't access 911 and other emergency service numbers through WhatsApp). • GROUP CHAT: Enjoy group chats with your contacts so you can easily stay in touch with your friends or family. • WHATSAPP WEB: You can also send and receive WhatsApp messages right from your computer's browser. • NO INTERNATIONAL CHARGES: There's no extra charge to send WhatsApp messages internationally. Chat with your friends around the world and avoid international SMS charges. • SAY NO TO USERNAMES AND PINS: Why bother having to remember yet another username or PIN? WhatsApp works with your phone number, just like SMS, and integrates seamlessly with your phone's existing address book. • ALWAYS LOGGED IN: With WhatsApp, you're always logged in so you don't miss messages. No more confusion about whether you're logged in or logged out. • QUICKLY CONNECT: Your address book is used to quickly and easily connect you with your contacts who have WhatsApp so there's no need to add hard-to-remember usernames. • OFFLINE MESSAGES: Even if you miss your notifications or turn off your phone, WhatsApp will save your recent messages until the next time you use the app.",
    downloadUrl: "https://example.com/download/whatsapp.apk",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    developer: "Meta Platforms",
    rating: 4.2,
    totalRatings: "120M",
    downloads: "2B+",
    category: "Social",
    size: "45MB",
    version: "312.0.0.44.113",
    icon: "/placeholder.svg?height=120&width=120&text=IG",
    description:
      "Bringing you closer to the people and things you love. Instagram is a simple way to capture and share the world's moments on your Android. Follow your friends and family to see what they're up to, and discover accounts from all over the world that are sharing things you love. Join the community of over 2 billion people and express yourself by sharing all the moments of your day — the highlights and everything in between, too. Use Instagram to: • Follow your friends and family • Share unlimited photos and videos • Get inspired by accounts you discover • Shop from your favorite brands and creators Instagram also includes these features: • Stories: Share everyday moments and get creative with fun stickers, text and drawing tools. Your story disappears after 24 hours and won't appear on your profile grid or in feed unless you add it as a story highlight. • Reels: Create entertaining videos with creative tools like effects and music. Share reels on your feed and, if you have a public account, make them available to the wider Instagram community through a new space in Explore. • IGTV: Upload longer videos and find the ones you'll love in a space designed for discovering videos. • Shopping: Tap to shop products from your favorite brands and creators, or in posts you discover in Shop. Save items you're interested in and purchase later. • Explore: See photos and videos tailored to your interests from accounts you don't follow yet.",
    downloadUrl: "https://example.com/download/instagram.apk",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    developer: "TikTok Ltd.",
    rating: 4.4,
    totalRatings: "89M",
    downloads: "1B+",
    category: "Entertainment",
    size: "156MB",
    version: "32.8.4",
    icon: "/placeholder.svg?height=120&width=120&text=TT",
    description:
      "TikTok is THE destination for mobile videos. On TikTok, short-form videos are exciting, spontaneous, and genuine. Whether you're a sports fanatic, a pet enthusiast, or just looking for a laugh, there's something for everyone on TikTok. All you have to do is watch, engage with what you like, skip what you don't, and you'll find an endless stream of short videos that feel personalized just for you. From your morning coffee to your afternoon errands, TikTok has the videos that are guaranteed to make your day. We make it easy for you to discover and create your own original videos by providing easy-to-use tools to view and capture your daily moments. Take your videos to the next level with special effects, filters, music, and more. • Watch endless amount of videos customized specifically for you • A personalized video feed based on what you watch, like, and share • Discover videos, creators, trends, and sounds that are popular and relevant to you • Create your own videos easily with our camera tools and try trending challenges • Edit your videos with filters, effects, music, sounds, speed controls, and more • Share your videos with friends and family, and see if you can go viral • Follow creators and build your own loyal following to connect with people from all over the world",
    downloadUrl: "https://example.com/download/tiktok.apk",
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    developer: "Spotify AB",
    rating: 4.3,
    totalRatings: "67M",
    downloads: "1B+",
    category: "Music",
    size: "89MB",
    version: "8.8.96.488",
    icon: "/placeholder.svg?height=120&width=120&text=SP",
    description:
      "Spotify is a digital music service that gives you access to millions of songs, podcasts and videos from artists all over the world, like Ariana Grande, Shawn Mendes, and Billie Eilish. Basic functions such as playing music are totally free, but you can also choose to upgrade to Spotify Premium. Whether you like driving country, electronic dance music, or just the top pop hits, Spotify makes it easy to find the right music or podcast for every moment. You can also browse through the music collections of friends, artists, and celebrities, or create a radio station and just sit back. Soundtrack your life with Spotify. Subscribe to Spotify Premium to play any song, anytime – even when you're offline. • Play any song, artist, album, or playlist in shuffle mode • Build your biggest, best ever music collection • Get music recommendations in Discover Weekly, a playlist made just for you • Create your own playlists, or listen to ones made by Spotify • Listen to thousands of podcast episodes, from true crime to comedy to news and beyond Spotify Premium: • Play any song, anytime on your phone, computer, and other devices • Listen offline – download your music and take it anywhere • Unlimited skips • Better sound quality • No ads",
    downloadUrl: "https://example.com/download/spotify.apk",
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    developer: "Telegram FZ-LLC",
    rating: 4.5,
    totalRatings: "45M",
    downloads: "1B+",
    category: "Communication",
    size: "78MB",
    version: "10.2.5",
    icon: "/placeholder.svg?height=120&width=120&text=TG",
    description:
      "Telegram is a messaging app with a focus on speed and security, it's super-fast, simple and free. You can use Telegram on all your devices at the same time — your messages sync seamlessly across any number of your phones, tablets or computers. Telegram has over 700 million monthly active users and is one of the 10 most downloaded apps in the world. With Telegram, you can send messages, photos, videos and files of any type (doc, zip, mp3, etc), as well as create groups for up to 200,000 people or channels for broadcasting to unlimited audiences. You can write to your phone contacts and find people by their usernames. As a result, Telegram is like SMS and email combined — and can take care of all your personal or business messaging needs. In addition to this, we support end-to-end encrypted voice and video calls, as well as voice chats in groups for thousands of participants. FAST: Telegram is the fastest messaging app on the market, connecting people via a unique, distributed network of data centers around the globe. SYNCED: You can access your messages from all your phones, tablets and computers at once. Telegram apps are standalone, so you don't need to keep your phone connected. Start typing on one device and finish the message from another. Never lose your data again. UNLIMITED: You can send media and files, without any limits on their type and size. Your entire chat history will require no disk space on your device, and will be securely stored in the Telegram cloud for as long as you need it.",
    downloadUrl: "https://example.com/download/telegram.apk",
  },
  netflix: {
    id: "netflix",
    name: "Netflix",
    developer: "Netflix, Inc.",
    rating: 4.1,
    totalRatings: "89M",
    downloads: "1B+",
    category: "Entertainment",
    size: "124MB",
    version: "8.89.1",
    icon: "/placeholder.svg?height=120&width=120&text=NF",
    description:
      "Looking for the most talked about TV shows and movies from the around the world? They're all on Netflix. We've got award-winning series, movies, documentaries and stand-up specials. And with the mobile app, you get Netflix while you travel, commute, or just take a break. What you'll love about Netflix: • We add TV shows and movies all the time. Browse new titles or search for your favorites, and stream videos right on your device. • The more you watch, the better Netflix gets at recommending TV shows and movies you'll love. • Create up to five individual profiles for an account. Profiles give different members of your household their own personalized Netflix experience. • Enjoy a safe watching experience just for kids with family-friendly entertainment. • Preview quick videos of our series and movies and get notifications for new episodes and releases. • Save your data. Download titles to your mobile device and watch offline, wherever you are. Please note: - You need to be a Netflix member to use this app. If you're not a member, sign up for Netflix and start enjoying immediately on your account. - This app uses Google Play billing. Except in those countries where we offer and you choose a Netflix gift subscription, your Netflix membership will automatically continue to be charged to your payment method through Google Play until you cancel. You may cancel at any time.",
    downloadUrl: "https://example.com/download/netflix.apk",
  },
  uber: {
    id: "uber",
    name: "Uber",
    developer: "Uber Technologies",
    rating: 4.0,
    totalRatings: "34M",
    downloads: "500M+",
    category: "Travel",
    size: "167MB",
    version: "4.442.10002",
    icon: "/placeholder.svg?height=120&width=120&text=UB",
    description:
      "Uber is the smartest way to get around. One tap and a car comes directly to you. Your driver knows exactly where to go. And you can pay with either cash or card. Whether you're going to work, the airport, or out with friends, Uber connects you with a reliable ride in minutes. One app, many options. In addition to private rides, you can also request premium cars, extra seats, or affordable rides shared with others. So however you want to get there, there's an Uber for that. FEATURES: • Request a ride on demand or schedule one ahead of time • See your driver's picture, license plate, and location in real time • Know your fare upfront with upfront pricing • Pay with credit card, debit card, digital wallet, or cash • Rate your driver and provide anonymous feedback about your trip • Split the cost of your ride with friends • Set your status to 'away' so friends and family know when you've arrived safely • 24/7 support • Accessibility features for riders with disabilities, including partnerships with taxi and transportation companies with wheelchair-accessible vehicles in select cities",
    downloadUrl: "https://example.com/download/uber.apk",
  },
  discord: {
    id: "discord",
    name: "Discord",
    developer: "Discord Inc.",
    rating: 4.4,
    totalRatings: "23M",
    downloads: "500M+",
    category: "Communication",
    size: "98MB",
    version: "126.21",
    icon: "/placeholder.svg?height=120&width=120&text=DC",
    description:
      "Discord is your place to talk. Create a home for your communities and friends, where you can stay close and have fun over text, voice, and video chat. Whether you're part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often. • Talk to your friends with messaging, voice, and video in a DM or group • Join servers to find communities of people who share your interests • Create your own server and invite your friends to hang out • Use custom emoji from your favorite servers anywhere on Discord • Share what you're playing, listening to, or watching with Rich Presence • Stay organized with dedicated channels for different topics • Moderate your server with powerful moderation tools • Make your server your own with custom roles and permissions • Go live and stream games, art, or anything else to up to 50 friends • Use Stage Channels to host events for your entire server • Connect other apps and services to Discord with integrations • Customize Discord with themes and accessibility options Discord is trusted by millions of people around the world to talk and hang out with their communities and friends. Come see what's happening on Discord – you belong here.",
    downloadUrl: "https://example.com/download/discord.apk",
  },
  zoom: {
    id: "zoom",
    name: "Zoom",
    developer: "Zoom Video Communications",
    rating: 4.2,
    totalRatings: "12M",
    downloads: "500M+",
    category: "Business",
    size: "145MB",
    version: "5.16.10.25419",
    icon: "/placeholder.svg?height=120&width=120&text=ZM",
    description:
      "Stay connected wherever you go – start or join a secure meeting with flawless video and audio, instant screen sharing, and cross-platform instant messaging - for free! Zoom is #1 in customer satisfaction and the best unified communication experience on mobile. It's super easy! Install the free Zoom app, click on 'New Meeting,' and invite up to 100 people to join you on video! Connect with anyone on Android, other mobile devices, Windows, Mac, iOS, ZoomPresence, H.323/SIP room systems, and telephones. VIDEO MEETINGS FROM ANYWHERE: • Best Android video meeting quality • Use front and rear facing cameras • Private and group messaging • Send images in a chat • Invite others from your contact list • Safe driving mode • International toll-free dial-in numbers available FEATURES: • HD video and audio • View up to 25 participants per screen • High quality screen sharing • Private and group messaging • Join breakout rooms • Raise hand to interact • Virtual background • Live transcription • Meeting recording (local and to the cloud) • Secure 256-bit AES encryption • Waiting room • Lock meetings • Generate meeting reports",
    downloadUrl: "https://example.com/download/zoom.apk",
  },
  canva: {
    id: "canva",
    name: "Canva",
    developer: "Canva",
    rating: 4.6,
    totalRatings: "8M",
    downloads: "500M+",
    category: "Art & Design",
    size: "234MB",
    version: "2.221.0",
    icon: "/placeholder.svg?height=120&width=120&text=CV",
    description:
      "Canva makes design simple for everyone! Create stunning graphic designs with ease. Choose from thousands of templates for social media posts, presentations, posters, videos, logos and more. Customize anything to fit your brand or style. FEATURES: • Thousands of professionally designed templates • Drag-and-drop design tools • Add text with hundreds of fresh fonts • Upload your own images or choose from our library of over 1 million stock images, graphics and illustrations • Create presentations, social media graphics, and videos • Collaborate with team members • Brand Kit to store your logos, colors and fonts • Background Remover to perfect your images • Resize designs instantly for different platforms • Schedule and publish social media posts • Print your designs and get them delivered DESIGN TYPES: • Social media posts (Instagram, Facebook, Twitter, LinkedIn, Pinterest, TikTok, YouTube thumbnails) • Presentations and slideshows • Posters and flyers • Business cards and letterheads • Resumes and CVs • Invitations and cards • Logos and branding materials • Photo collages • Video stories and animations • Print products (t-shirts, mugs, calendars) Whether you're a small business owner, student, influencer, or just someone who loves to create, Canva gives you everything you need to bring your ideas to life. Start designing today!",
    downloadUrl: "https://example.com/download/canva.apk",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    developer: "Google LLC",
    rating: 4.3,
    totalRatings: "156M",
    downloads: "10B+",
    category: "Entertainment",
    size: "134MB",
    version: "18.45.43",
    icon: "/placeholder.svg?height=120&width=120&text=YT",
    description:
      "Get the official YouTube app on Android phones and tablets. See what the world is watching -- from the hottest music videos to what's popular in gaming, fashion, beauty, news, learning and more. Subscribe to channels you love, create content of your own, share with friends, and watch on any device. With a new design, you can have fun exploring videos you love more easily and quickly than before. Just tap an icon or swipe to switch between recommended videos, your subscriptions, or your account. You can also: • Browse personal recommendations on the Home tab • See the latest from your favorite channels in Subscriptions • Look up videos you've watched, liked, and saved for later in Library • Discover new channels and videos in Trending • Create and edit Shorts right in the YouTube app • Upload videos directly from your phone or tablet • Comment, share, like, and playlist your favorite videos • Get notifications about new videos and activity from channels you subscribe to • Turn on Dark theme for easier viewing at night • Cast to your TV so you can watch on the big screen",
    downloadUrl: "https://example.com/download/youtube.apk",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    developer: "Meta Platforms",
    rating: 3.9,
    totalRatings: "234M",
    downloads: "5B+",
    category: "Social",
    size: "187MB",
    version: "438.0.0.33.118",
    icon: "/placeholder.svg?height=120&width=120&text=FB",
    description:
      "Keeping up with friends is faster and easier than ever with the Facebook Lite app! Use Facebook Lite as a friends app to connect and keep up with your social network. The Facebook Lite app is small, allowing you to save space on your phone and use Facebook in 2G conditions. Many of the classic features of Facebook are available on the app, such as sharing to a Timeline, liking photos, searching for people, and editing your profile and groups. Specific features include: • Find friends and family • Post status updates & use Facebook emoji to help relay what's going on in your world • Share photos and your favorite memes • Get notifications when friends like and comment on your posts • Play games and use your favorite apps • Backup photos by saving them in albums • Follow your favorite artists, websites, and companies to get their latest news • Look up local businesses to see reviews, operation hours, and pictures • Buy and sell locally on Facebook Marketplace • Watch live videos on the go The Facebook Lite app is small. It lets you save space on your phone and use Facebook in 2G conditions without sacrificing the core features and functionality of Facebook. Install the Facebook Lite Android app now.",
    downloadUrl: "https://example.com/download/facebook.apk",
  },
}

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = apps[params.id as keyof typeof apps]

  if (!app) {
    return {
      title: "App Not Found - AppHub",
    }
  }

  return {
    title: `${app.name} - Download for Android | AppHub`,
    description: `Download ${app.name} by ${app.developer}. ${app.description.substring(0, 150)}...`,
    keywords: `${app.name}, ${app.developer}, android app, download, ${app.category}`,
    openGraph: {
      title: `${app.name} - Download for Android`,
      description: app.description.substring(0, 200),
      type: "website",
      images: [app.icon],
    },
    twitter: {
      card: "summary_large_image",
      title: `${app.name} - Download for Android`,
      description: app.description.substring(0, 200),
    },
  }
}

// Function to get recommended apps based on category
function getRecommendedApps(category: string, currentAppId: string) {
  const allAppsData = [
    {
      id: "whatsapp-messenger",
      name: "WhatsApp Messenger",
      developer: "WhatsApp LLC",
      rating: 4.1,
      downloads: "5B+",
      category: "Communication",
      icon: "/placeholder.svg?height=80&width=80&text=WA",
      description: "Free messaging app for Android smartphones with voice and video calls.",
    },
    {
      id: "instagram",
      name: "Instagram",
      developer: "Meta Platforms",
      rating: 4.2,
      downloads: "2B+",
      category: "Social",
      icon: "/placeholder.svg?height=80&width=80&text=IG",
      description: "Share photos and videos with friends and discover content from around the world.",
    },
    {
      id: "tiktok",
      name: "TikTok",
      developer: "TikTok Ltd.",
      rating: 4.4,
      downloads: "1B+",
      category: "Entertainment",
      icon: "/placeholder.svg?height=80&width=80&text=TT",
      description: "Create and discover short videos with music, effects, and creative tools.",
    },
    {
      id: "spotify",
      name: "Spotify",
      developer: "Spotify AB",
      rating: 4.3,
      downloads: "1B+",
      category: "Music",
      icon: "/placeholder.svg?height=80&width=80&text=SP",
      description: "Stream millions of songs and podcasts with personalized playlists.",
    },
    {
      id: "telegram",
      name: "Telegram",
      developer: "Telegram FZ-LLC",
      rating: 4.5,
      downloads: "1B+",
      category: "Communication",
      icon: "/placeholder.svg?height=80&width=80&text=TG",
      description: "Fast and secure messaging app with cloud storage and group chats.",
    },
    {
      id: "netflix",
      name: "Netflix",
      developer: "Netflix, Inc.",
      rating: 4.1,
      downloads: "1B+",
      category: "Entertainment",
      icon: "/placeholder.svg?height=80&width=80&text=NF",
      description: "Watch TV shows and movies anytime, anywhere on your mobile device.",
    },
    {
      id: "discord",
      name: "Discord",
      developer: "Discord Inc.",
      rating: 4.4,
      downloads: "500M+",
      category: "Communication",
      icon: "/placeholder.svg?height=80&width=80&text=DC",
      description: "Chat, voice call, and video call with friends and communities.",
    },
    {
      id: "youtube",
      name: "YouTube",
      developer: "Google LLC",
      rating: 4.3,
      downloads: "10B+",
      category: "Entertainment",
      icon: "/placeholder.svg?height=80&width=80&text=YT",
      description: "Watch, upload, and share videos from creators around the world.",
    },
    {
      id: "facebook",
      name: "Facebook",
      developer: "Meta Platforms",
      rating: 3.9,
      downloads: "5B+",
      category: "Social",
      icon: "/placeholder.svg?height=80&width=80&text=FB",
      description: "Connect with friends and family, share updates and photos.",
    },
  ]

  // Filter apps by same category, excluding current app
  const sameCategory = allAppsData.filter((app) => app.category === category && app.id !== currentAppId)

  // If we have enough apps in same category, return them
  if (sameCategory.length >= 4) {
    return sameCategory.slice(0, 4)
  }

  // Otherwise, mix with other popular apps
  const otherApps = allAppsData.filter((app) => app.id !== currentAppId)
  return [...sameCategory, ...otherApps.filter((app) => app.category !== category)].slice(0, 4)
}

export default function AppPage({ params }: Props) {
  const app = apps[params.id as keyof typeof apps]

  if (!app) {
    notFound()
  }

  const recommendedApps = getRecommendedApps(app.category, app.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">AppHub</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* App Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 text-center md:text-left">
                    <Image
                      src={app.icon || "/placeholder.svg"}
                      alt={`${app.name} icon`}
                      width={120}
                      height={120}
                      className="rounded-2xl shadow-lg mx-auto md:mx-0"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">{app.name}</h1>
                    <Link href="#" className="text-primary hover:underline text-lg mb-4 inline-block">
                      {app.developer}
                    </Link>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
                        <span className="font-semibold text-lg mr-2">{app.rating}</span>
                        <span className="text-muted-foreground">({app.totalRatings})</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Download className="h-5 w-5 mr-2" />
                        <span className="font-medium">{app.downloads} downloads</span>
                      </div>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {app.category}
                      </Badge>
                    </div>

                    <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                      <DownloadButton downloadUrl={app.downloadUrl} appName={app.name} appSize={app.size} />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 mr-2" />
                        Safe & Secure Download
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad Space 1 - After App Header */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  <div className="text-sm mb-2">Advertisement</div>
                  <div className="bg-gray-100 h-24 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400">728x90 Banner Ad Space</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Description */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">About {app.name}</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">{app.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ad Space 2 - Before Comments */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-6 text-center">
                <div className="text-gray-500">
                  <div className="text-sm mb-2">Advertisement</div>
                  <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400">Responsive Ad Space</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentsSection appName={app.name} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ad Space 3 - Sidebar Top */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4 text-center">
                <div className="text-gray-500">
                  <div className="text-xs mb-2">Ad</div>
                  <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400">300x250 Sidebar Ad</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Apps */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Recommended Apps</h3>
                <div className="space-y-4">
                  {recommendedApps.map((recommendedApp) => (
                    <Link key={recommendedApp.id} href={`/app/${recommendedApp.id}`}>
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Image
                          src={recommendedApp.icon || "/placeholder.svg"}
                          alt={`${recommendedApp.name} icon`}
                          width={48}
                          height={48}
                          className="rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
                            {recommendedApp.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">{recommendedApp.developer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="text-xs font-medium">{recommendedApp.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {recommendedApp.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ad Space 4 - Sidebar Bottom */}
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4 text-center">
                <div className="text-gray-500">
                  <div className="text-xs mb-2">Ad</div>
                  <div className="bg-gray-100 h-32 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400">300x200 Sidebar Ad</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Sticky Download Button - Only show on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg">
          <DownloadButton
            downloadUrl={app.downloadUrl}
            appName={app.name}
            appSize={app.size}
            className="max-w-none"
            isMobile={true}
          />
        </div>

        {/* Spacer for mobile sticky button */}
        <div className="lg:hidden h-20"></div>
      </div>
    </div>
  )
}
