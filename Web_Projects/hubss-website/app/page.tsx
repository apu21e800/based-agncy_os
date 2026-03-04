import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ProductsGrid from "@/components/sections/ProductsGrid";
import ApplicationsGrid from "@/components/sections/ApplicationsGrid";
import RecentProjects from "@/components/sections/RecentProjects";
import LunchLearn from "@/components/sections/LunchLearn";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBar />
      <ProductsGrid />
      <ApplicationsGrid />
      <RecentProjects />
      <LunchLearn />
      <Footer />
    </main>
  );
}
