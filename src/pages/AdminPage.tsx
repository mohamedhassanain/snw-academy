import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Formation = Tables<'formations'>;

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [newFormationTitle, setNewFormationTitle] = useState('');
  const [newFormationDescription, setNewFormationDescription] = useState('');
  const [newFormationDuration, setNewFormationDuration] = useState('');
  const [newFormationStudents, setNewFormationStudents] = useState('');
  const [newFormationModules, setNewFormationModules] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("No active Supabase session:", sessionError);
        localStorage.removeItem('isAuthenticated'); // Clear local storage if session is invalid
        navigate('/login');
        return;
      }

      // If session is valid, proceed with fetching formations
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching formations in AdminPage:", error);
        setError("Failed to load formations.");
        setFormations([]);
        toast({
          title: "Erreur",
          description: "Échec du chargement des formations.",
          variant: "destructive",
        });
      } else {
        console.log("Formations fetched in AdminPage:", data); // Log fetched data
        setFormations(data || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();

    const channel = supabase
      .channel('admin_formations_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'formations' }, (payload) => {
        console.log('Admin: Change received!', payload);
        checkAuthAndFetch(); // Re-fetch data on any change
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAddFormation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newFormationTitle.trim() && newFormationDescription.trim()) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour ajouter une formation.",
          variant: "destructive",
        });
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      const newFormation: TablesInsert<'formations'> = {
        title: newFormationTitle,
        description: newFormationDescription,
        duration: newFormationDuration.trim() || null,
        students: newFormationStudents.trim() || null,
        modules: newFormationModules.trim() || null,
      };

      const { data, error } = await supabase
        .from('formations')
        .insert(newFormation)
        .select(); // Select the inserted data to log it

      if (error) {
        console.error("Error adding formation:", error); // Log the full error object
        toast({
          title: "Erreur",
          description: `Échec de l'ajout de la formation: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log("Formation added successfully:", data); // Log the inserted data
        toast({
          title: "Succès",
          description: "Formation ajoutée avec succès.",
        });
        setNewFormationTitle('');
        setNewFormationDescription('');
        setNewFormationDuration('');
        setNewFormationStudents('');
        setNewFormationModules('');
      }
    } else {
        toast({
          title: "Attention",
          description: "Veuillez remplir au moins le titre et la description.",
        });
    }
  };

  const handleDeleteFormation = async (id: string) => {
    const { error } = await supabase
      .from('formations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting formation:", error);
      toast({
        title: "Erreur",
        description: "Échec de la suppression de la formation.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Formation supprimée avec succès.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddFormation} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Formation Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter formation title"
                  value={newFormationTitle}
                  onChange={(e) => setNewFormationTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Formation Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter formation description"
                  value={newFormationDescription}
                  onChange={(e) => setNewFormationDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="text"
                  placeholder="e.g., 12 mois"
                  value={newFormationDuration}
                  onChange={(e) => setNewFormationDuration(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="students">Students Capacity</Label>
                <Input
                  id="students"
                  type="text"
                  placeholder="e.g., 20 places"
                  value={newFormationStudents}
                  onChange={(e) => setNewFormationStudents(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modules">Number of Modules</Label>
                <Input
                  id="modules"
                  type="text"
                  placeholder="e.g., 8 modules"
                  value={newFormationModules}
                  onChange={(e) => setNewFormationModules(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Add Formation</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Formations</CardTitle>
          </CardHeader>
          <CardContent>
            {formations.length === 0 ? (
              <p>No formations added yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Modules</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formations.map((formation) => (
                    <TableRow key={formation.id}>
                      <TableCell className="font-medium">{formation.title}</TableCell>
                      <TableCell>{formation.description}</TableCell>
                      <TableCell>{formation.duration}</TableCell>
                      <TableCell>{formation.students}</TableCell>
                      <TableCell>{formation.modules}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFormation(formation.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
