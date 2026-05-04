import HeroSection from "@/components/homepage/HeroSection";
import FeaturedArticles from "@/components/homepage/FeaturedArticles";
import LatestFeed from "@/components/homepage/LatestFeed";
import CategoriesStrip from "@/components/homepage/CategoriesStrip";
import AboutStrip from "@/components/homepage/AboutStrip";

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
      <HeroSection />
      <FeaturedArticles />
      <LatestFeed />
      <CategoriesStrip />
      <AboutStrip />
    </div>
  );
}