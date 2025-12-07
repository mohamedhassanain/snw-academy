import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import snwLogo from "@/assets/snw-logo-gold.png";

export const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div 
              className="w-64 md:w-80 lg:w-96"
              style={{
                backgroundImage: `url(${snwLogo})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                aspectRatio: '1/1'
              }}
              role="img"
              aria-label="SNW Academy"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-primary font-display text-xl md:text-2xl tracking-widest mb-6 uppercase"
          >
            Centre de Formation Professionnelle
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 max-w-4xl leading-tight"
          >
            Apprendre. Évoluer.{" "}
            <span className="text-gradient-gold">Réussir Ensemble.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed"
          >
            Formations certifiées dans le domaine de la santé et du social.
            Renforcez vos compétences et boostez votre carrière professionnelle.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="xl" asChild>
              <a href="#formations">Découvrir nos Formations</a>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">Nous Contacter</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#a-propos"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs tracking-wider uppercase mb-2">
              Découvrir
            </span>
            <ChevronDown size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
