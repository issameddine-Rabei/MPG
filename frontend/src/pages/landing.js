import Footer from "components/Footer";
import HeroSection from "components/HeroSection";
import InfoSection from "components/InfoSection";
import Navbar from "components/Navbar";
import NewsLetter from "components/NewsLetter";
import { landingData } from "utils/landindData";

const LandingPage = () => {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      {/* <Cards /> */}
      {landingData.map((item, _) => (
        <InfoSection key={_} data={item} />
      ))}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default LandingPage;
