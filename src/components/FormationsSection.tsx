import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Formation = Tables<'formations'>;

export const FormationsSection = () => {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-100px" }); // Removed framer-motion hook
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllFormations, setShowAllFormations] = useState(false); // New state for showing all formations

  useEffect(() => {
    const fetchFormations = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching formations in FormationsSection:", error);
        setError("Failed to load formations.");
        setFormations([]);
      } else {
        console.log("Formations fetched in FormationsSection:", data); // Log fetched data
        setFormations(data || []);
      }
      setLoading(false);
    };

    fetchFormations();

    const channel = supabase
      .channel('formations_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'formations' }, (payload) => {
        console.log('Change received!', payload);
        fetchFormations(); // Re-fetch data on any change
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const displayedFormations = showAllFormations ? formations : formations.slice(0, 3);

  if (loading) {
    return (
      <section id="formations" className="py-24 relative">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container mx-auto px-4 relative text-center text-muted-foreground">
          Chargement des formations...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="formations" className="py-24 relative">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container mx-auto px-4 relative text-center text-destructive">
          Erreur: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="formations" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Nos Formations
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Formations{" "}
            <span className="text-gradient-gold">Certifiées</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Des parcours de formation complets et reconnus pour vous préparer
            aux métiers de la santé et du social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFormations.map((formation, index) => (
            <div
              key={formation.id}
              className="group"
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${formation.gradient || 'from-gold/20 to-gold/5'} border border-border/50 h-full flex flex-col`}
              >
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-primary via-accent to-gold-light" />

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {formation.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                    {formation.description}
                  </p>

                  {/* Stats */}
                  {(formation.duration || formation.students || formation.modules) && (
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border/30">
                      {formation.duration && (
                        <div className="text-center">
                          <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">
                            {formation.duration} mois
                          </span>
                        </div>
                      )}
                      {formation.students && (
                        <div className="text-center">
                          <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">
                            {formation.students} places
                          </span>
                        </div>
                      )}
                      {formation.modules && (
                        <div className="text-center">
                          <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">
                            {formation.modules} modules
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full group/btn"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {formations.length > 3 && (
          <div className="text-center mt-12">
            <Button variant="gold" size="lg" onClick={() => setShowAllFormations(!showAllFormations)}>
              {showAllFormations ? "Voir moins" : "Voir toutes les formations"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
