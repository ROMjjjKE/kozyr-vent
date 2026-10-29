import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Production from './components/Production';
import Stock from './components/Stock';
import Band from './components/Band';
import Cost from './components/Cost';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#delaem">К содержанию</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Production />
        <Stock />
        <Band />
        <Cost />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
