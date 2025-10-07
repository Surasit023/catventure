import Character from "@/components/Character";
import HeroSection from "@/components/HeroSection";
import Maps from "@/components/MapsLocation";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Character/>
      <Maps/>
    </div>
  );
}
