import { motion } from "framer-motion";
import snwLogo from "@/assets/snw-logo.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Formation = Tables<'formations'>;

interface FormationLink {
  id: string;
  label: string;
  href: string;
}

const academyLinks = [
  { label: "À Propos", href: "#a-propos" },
  { label: "Pourquoi Nous", href: "#pourquoi" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  const [formations, setFormations] = useState<FormationLink[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const { data, error } = await supabase
        .from('formations')
        .select('id, title');

      if (error) {
        console.error("Error fetching formations for footer:", error);
        setFormations([]);
      } else {
        setFormations(data.map(f => ({ id: f.id, label: f.title, href: "#formations" })) || []);
      }
    };

    fetchFormations();

    const channel = supabase
      .channel('formations_footer_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'formations' }, (payload) => {
        console.log('Footer: Change received!', payload);
        fetchFormations(); // Re-fetch data on any change
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);
  return (
    <footer className="bg-background border-t border-border/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={snwLogo}
              alt="SNW Academy"
              className="h-20 w-auto object-contain mb-6"
            />
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Formations continues pour renforcer vos compétences et booster
              votre carrière. Notre objectif : apprendre, évoluer et réussir
              ensemble.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Casablanca, Maroc
            </p>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">
              Formations
            </h4>
            <ul className="space-y-3">
              {formations.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">
              L'Academy
            </h4>
            <ul className="space-y-3">
              {academyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 SNW Academy. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/61553848922554"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
