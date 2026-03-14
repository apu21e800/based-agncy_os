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
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.35) 25%, rgba(234,179,8,0.35) 75%, transparent 100%)" }} />
      <ApplicationsGrid />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.35) 25%, rgba(234,179,8,0.35) 75%, transparent 100%)" }} />
      <RecentProjects />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.35) 25%, rgba(234,179,8,0.35) 75%, transparent 100%)" }} />
      <LunchLearn />
      <Footer />
    </main>
  );
}
