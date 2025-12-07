import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Notre Mission",
    description:
      "Former des professionnels qualifiés dans les domaines de la santé et du social pour répondre aux besoins croissants du marché.",
  },
  {
    icon: Users,
    title: "Accompagnement",
    description:
      "Un suivi personnalisé tout au long de votre parcours pour garantir votre réussite professionnelle.",
  },
  {
    icon: Award,
    title: "Certifications",
    description:
      "Des formations reconnues et certifiées qui valorisent votre CV et ouvrent des portes sur le marché du travail.",
  },
  {
    icon: Heart,
    title: "Notre Vision",
    description:
      "Ensemble pour une vie professionnelle épanouie et une contribution positive à la société.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="a-propos" className="py-24 bg-gradient-hero relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            À Propos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Votre Partenaire pour l'
            <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            SNW Academy est votre compagnon dans votre parcours de développement
            personnel et professionnel. Nous croyons en votre potentiel et nous
            engageons à vous accompagner vers la réussite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-card border border-border/50 rounded-xl p-8 h-full hover:border-primary/30 transition-all duration-500 hover:shadow-gold">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
