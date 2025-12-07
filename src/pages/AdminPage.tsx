import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';

interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: string;
  modules: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [newFormationTitle, setNewFormationTitle] = useState('');
  const [newFormationDescription, setNewFormationDescription] = useState('');
  const [newFormationDuration, setNewFormationDuration] = useState('');
  const [newFormationStudents, setNewFormationStudents] = useState('');
  const [newFormationModules, setNewFormationModules] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
    loadFormations();
  }, [navigate]);

  const loadFormations = () => {
    const storedFormations = localStorage.getItem('formations');
    if (storedFormations) {
      setFormations(JSON.parse(storedFormations));
    }
  };

  const saveFormations = (updatedFormations: Formation[]) => {
    localStorage.setItem('formations', JSON.stringify(updatedFormations));
    setFormations(updatedFormations);
  };

  const handleAddFormation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFormationTitle.trim() && newFormationDescription.trim() && newFormationDuration.trim() && newFormationStudents.trim() && newFormationModules.trim()) {
      const newFormation: Formation = {
        id: Date.now().toString(),
        title: newFormationTitle,
        description: newFormationDescription,
        duration: newFormationDuration,
        students: newFormationStudents,
        modules: newFormationModules,
      };
      const updatedFormations = [...formations, newFormation];
      saveFormations(updatedFormations);
      setNewFormationTitle('');
      setNewFormationDescription('');
      setNewFormationDuration('');
      setNewFormationStudents('');
      setNewFormationModules('');
    }
  };

  const handleDeleteFormation = (id: string) => {
    const updatedFormations = formations.filter((formation) => formation.id !== id);
    saveFormations(updatedFormations);
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
