import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import House3DSection from "@/components/House3DSection";
import ProjectsSection from "@/components/ProjectsSection";
import PortfolioMasonry from "@/components/PortfolioMasonry";
import Walkthrough360 from "@/components/Walkthrough360";
import ProcessTimeline from "@/components/ProcessTimeline";
import MaterialShowcase from "@/components/MaterialShowcase";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import TeamGrid from "@/components/TeamGrid";
import BlogGrid from "@/components/BlogGrid";
import FAQSection from "@/components/FAQSection";
import AIConsultant from "@/components/AIConsultant";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      {/* 1. Immersive 3D Hero */}
      <HeroSection />

      {/* 2. Story About Studio */}
      <AboutSection />

      {/* 3. Custom Design Services */}
      <ServicesGrid />

      {/* 4. Interactive 3D Floorplan */}
      <House3DSection />

      {/* 5. Before/After Projects */}
      <ProjectsSection />

      {/* 6. Portfolio Gallery Grid */}
      <PortfolioMasonry />

      {/* 7. VR Walkthrough 360 */}
      <Walkthrough360 />

      {/* 8. Timelined Design Methodology */}
      <ProcessTimeline />

      {/* 9. Interactive 3D Materials */}
      <MaterialShowcase />

      {/* 10. Reviews & Ratings */}
      <TestimonialsSlider />

      {/* 11. Creative Directors team */}
      <TeamGrid />

      {/* 12. Blog & Design Journal */}
      <BlogGrid />

      {/* 13. AI Room Advisor & Cost Estimator */}
      <AIConsultant />

      {/* 14. Accordion FAQs */}
      <FAQSection />

      {/* 15. Form Inquiry & Consultation Calendar */}
      <ContactForm />
    </>
  );
}
