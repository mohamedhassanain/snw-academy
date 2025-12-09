import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Morocco, Casablanca, 34 el rahal meskinni, Casablanca, Morocco",
    wazeLink: "https://waze.com/ul?q=34%20el%20rahal%20meskinni%2C%20Casablanca%2C%20Morocco&navigate=yes",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=34%20el%20rahal%20meskinni%2C%20Casablanca%2C%20Morocco",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "0675-813557",
  },
  {
    icon: Mail,
    title: "Email",
    content: "souhailnadiri8@gmail.com",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "du Lundi au Vendredi, 9h - 18h",
  },
];

// Numéro WhatsApp - remplacez par le vrai numéro
const WHATSAPP_NUMBER = "212704784731";
const WHATSAPP_MESSAGE = "Bonjour, je souhaite avoir plus d'informations sur vos formations.";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Parlons de Votre{" "}
            <span className="text-gradient-gold">Projet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Vous avez des questions sur nos formations ? Contactez-nous
            directement sur WhatsApp pour une réponse rapide.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-card border border-border/50 rounded-2xl p-8 h-full flex flex-col justify-center items-center text-center">
              {/* WhatsApp Icon */}
              <div className="w-24 h-24 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-14 h-14 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <h3 className="font-display text-2xl text-foreground mb-4">
                Contactez-nous sur WhatsApp
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Obtenez une réponse rapide à toutes vos questions sur nos
                formations certifiées.
              </p>

              <Button
                variant="gold"
                size="xl"
                onClick={handleWhatsAppClick}
                className="gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Envoyer un message WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground mt-6">
                Disponible du Lundi au Vendredi, 9h - 18h
              </p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 p-6 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1">
                      {info.title}
                    </h4>
                    {info.wazeLink || info.googleMapsLink ? (
                      <div className="flex flex-col">
                        <p className="text-muted-foreground text-sm break-words w-full mb-2">
                          {info.content}
                        </p>
                        {info.wazeLink && (
                          <a
                            href={info.wazeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs hover:underline mb-1"
                          >
                            Ouvrir avec Waze
                          </a>
                        )}
                        {info.googleMapsLink && (
                          <a
                            href={info.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs hover:underline"
                          >
                            Ouvrir avec Google Maps
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm break-words w-full">
                        {info.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social/Additional info */}
            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-display text-lg text-foreground mb-2">
                Suivez-nous sur Facebook
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Rejoignez notre communauté et restez informé de nos actualités.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.facebook.com/61553848922554"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SNW Academy sur Facebook
                </a>
              </Button>
            </div>

            {/* Instagram Social/Additional info */}
            <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-display text-lg text-foreground mb-2">
                Suivez-nous sur Instagram
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Découvrez nos dernières actualités et moments forts.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.instagram.com/snw_academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SNW Academy sur Instagram
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
