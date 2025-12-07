import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Shield, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: GraduationCap,
    title: "Formateurs Experts",
    description:
      "Une équipe de professionnels expérimentés et passionnés par la transmission de leur savoir.",
    number: "01",
  },
  {
    icon: Briefcase,
    title: "Stage Pratique",
    description:
      "Des périodes de stage en entreprise pour une immersion totale dans le monde professionnel.",
    number: "02",
  },
  {
    icon: Shield,
    title: "Certifications Reconnues",
    description:
      "Des diplômes et certifications valorisés par les employeurs du secteur.",
    number: "03",
  },
  {
    icon: Sparkles,
    title: "Accompagnement Personnalisé",
    description:
      "Un suivi individuel pour vous aider à atteindre vos objectifs professionnels.",
    number: "04",
  },
];

export const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pourquoi" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Pourquoi Nous Choisir
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            L'Excellence au Service de{" "}
            <span className="text-gradient-gold">Votre Avenir</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez ce qui fait de SNW Academy le choix idéal pour votre
            formation professionnelle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex gap-6 p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-gold">
                {/* Number */}
                <span className="font-display text-5xl text-primary/20 group-hover:text-primary/40 transition-colors">
                  {reason.number}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <reason.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Diplômés" },
            { value: "95%", label: "Taux de Réussite" },
            { value: "10+", label: "Formations" },
            { value: "5", label: "Ans d'Expérience" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
