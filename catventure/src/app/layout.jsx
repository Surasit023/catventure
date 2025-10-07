import "./globals.css";

export const metadata = {
  title: {
    default: "CatVenture - Epic RPG Adventure",
    template: "%s | CatVenture"
  },
  description: "Embark on an epic journey in CatVenture! Summon mystical companions, conquer legendary dungeons, and forge your destiny in the magical realm of Esontraland. Experience thrilling RPG adventure with unique characters and challenging quests.",
  keywords: [
    "RPG game",
    "adventure game",
    "CatVenture",
    "online RPG",
    "fantasy game",
    "dungeon crawler",
    "character classes",
    "multiplayer RPG",
    "Esontraland",
    "epic adventure",
    "role-playing game"
  ],
  authors: [{ name: "CatVenture Team" }],
  
  // Open Graph (Facebook, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://catventure.com",
    siteName: "CatVenture",
    title: "CatVenture - Epic RPG Adventure Game",
    description: "Forge your legend in CatVenture! Explore mystical realms, battle fierce monsters, and become a legendary hero in this epic RPG adventure.",
    images: [
      {
        url: "/og-image.jpg", // ต้องสร้างรูปนี้ขนาด 1200x630px
        width: 1200,
        height: 630,
        alt: "CatVenture - Epic RPG Adventure"
      }
    ]
  },

  // App Metadata
  applicationName: "CatVenture",
  category: "game",
  
  // Viewport & Theme
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ],
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
