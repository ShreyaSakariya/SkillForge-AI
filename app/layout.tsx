import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'SkillForge AI — Your Career Path, Engineered by AI',
  description: 'Upload your resume and state your career goal to get an AI-generated milestone roadmap, skill-gap analysis, project recommendations, and interview prep.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${inter.className} antialiased min-h-screen selection:bg-amber-400 selection:text-zinc-950`}>
        {children}
      </body>
    </html>
  );
}

