import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionVision from './components/MissionVision';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FarewellDialog from './components/FarewellDialog';

export default function App() {
  return (
    <>
      <FarewellDialog />
      <Navbar />
      <main>
        <Hero />
        <MissionVision />
        <About />
        <Services />
        <Projects />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
