import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';
import {
  getCounterPackages,
  saveCounterPackages,
  getActiveCounterPackageId,
  setActiveCounterPackageId,
  CounterPackage,
} from '@/lib/counterSettings';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Check, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import useAnalytics from '@/hooks/use-analytics';

const CounterPackages = () => {
  const analytics = useAnalytics();
  const [packages, setPackages] = useState<CounterPackage[]>([]);
  const [activeId, setActiveId] = useState<string>('default');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creatingId, setCreatingId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    setPackages(getCounterPackages());
    setActiveId(getActiveCounterPackageId());
  }, []);

  // Track page view
  useEffect(() => {
    analytics.trackPageView(
      '/counter-packages',
      'Counter Packages',
      window.matchMedia('(display-mode: standalone)').matches,
    );
  }, []);

  const handleSetActive = (id: string) => {
    setActiveCounterPackageId(id);
    setActiveId(id);
    toast.success('Counter package activated!');
  };

  const handleSave = (pkg: CounterPackage) => {
    if (!pkg.name.trim()) {
      toast.error('Package name cannot be empty');
      return;
    }
    if (pkg.duration <= 0) {
      toast.error('Duration must be a positive number');
      return;
    }

    const newPackages = packages.map((p) => (p.id === pkg.id ? pkg : p));
    setPackages(newPackages);
    saveCounterPackages(newPackages);
    setEditingId(null);

    if (creatingId === pkg.id) {
      toast.success('New package created!');
      setCreatingId(null);
    } else {
      toast.success('Package saved successfully.');
    }
  };

  const handleDelete = (id: string) => {
    const isCreating = !!creatingId;
    const isDeletingCreated = id === creatingId;

    if (!isDeletingCreated && packages.length <= 1) {
      toast.error('You must have at least one package.');
      return;
    }

    const newPackages = packages.filter((p) => p.id !== id);
    const packagesToSave = newPackages.filter((p) => p.id !== creatingId);

    if (packagesToSave.length === 0 && !isDeletingCreated) {
      toast.error('You must have at least one saved package.');
      return;
    }

    setPackages(newPackages);
    saveCounterPackages(packagesToSave);

    if (id === creatingId) {
      setCreatingId(null);
      setEditingId(null);
    }

    if (activeId === id) {
      const newActive = packagesToSave[0]?.id || newPackages[0]?.id;
      if (newActive) {
        setActiveId(newActive);
        setActiveCounterPackageId(newActive);
      }
    }

    toast.success('Package deleted.');
  };

  const handleCancelEdit = (id: string) => {
    if (creatingId === id) {
      setPackages(packages.filter((p) => p.id !== id));
      setCreatingId(null);
    }
    setEditingId(null);
  };

  const handleCreate = () => {
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const newPkg: CounterPackage = {
      id: generateId(),
      name: 'New Custom Counter',
      duration: 600, // Default 10 minutes
    };
    const newPackages = [...packages, newPkg];
    setPackages(newPackages);
    setCreatingId(newPkg.id);
    setEditingId(newPkg.id);
  };

  return (
    <>
      <Helmet>
        <title>Counter Packages - Study Clock</title>
        <meta
          name='description'
          content='Create and manage custom Countdown timer configurations.'
        />
      </Helmet>

      <PageLayout className='text-gray-100' showParticles>
        <Navigation />

        <main className='relative z-10 min-h-screen container mx-auto px-4 py-28 pb-16'>
          <div className='max-w-4xl mx-auto'>
            <header className='mb-8 text-center'>
              <h1 className='text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 mb-4'>
                Counter Packages
              </h1>
              <p className='text-gray-400 text-base md:text-lg max-w-2xl mx-auto'>
                Create and manage your custom Countdown timer configurations.
              </p>
            </header>

            <div className='grid gap-4 md:gap-6'>
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isActive={activeId === pkg.id}
                  isEditing={editingId === pkg.id}
                  onEdit={() => setEditingId(pkg.id)}
                  onCancelEdit={() => handleCancelEdit(pkg.id)}
                  onSave={handleSave}
                  onDelete={() => handleDelete(pkg.id)}
                  onActivate={() => handleSetActive(pkg.id)}
                />
              ))}

              <Button
                onClick={handleCreate}
                className='w-full py-6 md:py-8 border-2 border-dashed border-gray-700 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white transition-all rounded-xl text-sm md:text-base'
              >
                <Plus className='mr-2 h-5 w-5 md:h-6 md:w-6' />
                Create New Package
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </PageLayout>
    </>
  );
};

interface PackageCardProps {
  pkg: CounterPackage;
  isActive: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (pkg: CounterPackage) => void;
  onDelete: () => void;
  onActivate: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isActive,
  isEditing,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onActivate,
}) => {
  const [name, setName] = useState(pkg.name);
  const [minutes, setMinutes] = useState(Math.floor(pkg.duration / 60));
  const [seconds, setSeconds] = useState(pkg.duration % 60);

  useEffect(() => {
    if (isEditing) {
      setName(pkg.name);
      setMinutes(Math.floor(pkg.duration / 60));
      setSeconds(pkg.duration % 60);
    }
  }, [pkg, isEditing]);

  const handleSaveInternal = () => {
    const totalSeconds = minutes * 60 + seconds;
    onSave({
      ...pkg,
      name,
      duration: totalSeconds,
    });
  };

  if (isEditing) {
    return (
      <Card className='bg-gray-900/60 border-gray-700 backdrop-blur-md'>
        <CardHeader>
          <CardTitle className='text-white'>Edit Package</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-gray-300'>
              Package Name
            </Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='bg-gray-800 border-gray-600 text-white'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='minutes' className='text-gray-300'>
                Minutes
              </Label>
              <Input
                id='minutes'
                type='number'
                min='0'
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(0, parseInt(e.target.value) || 0))
                }
                className='bg-gray-800 border-gray-600 text-white'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='seconds' className='text-gray-300'>
                Seconds
              </Label>
              <Input
                id='seconds'
                type='number'
                min='0'
                max='59'
                value={seconds}
                onChange={(e) =>
                  setSeconds(Math.max(0, parseInt(e.target.value) || 0))
                }
                className='bg-gray-800 border-gray-600 text-white'
              />
            </div>
          </div>
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={onCancelEdit}
              className='bg-red-800 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800'
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveInternal}
              className='bg-green-600 hover:bg-green-700 text-white'
            >
              <Save className='mr-2 h-4 w-4' /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDuration = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    if (s === 0) return `${m} min`;
    return `${m} min ${s} sec`;
  };

  return (
    <Card
      className={`relative transition-all duration-300 border-gray-800 backdrop-blur-md ${
        isActive
          ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
          : 'bg-gray-900/40 hover:bg-gray-900/60'
      }`}
    >
      <CardContent className='p-6 flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex-1 space-y-2 text-center md:text-left'>
          <h3 className='text-xl font-bold text-white flex items-center justify-center md:justify-start gap-3'>
            {pkg.name}
            {isActive && (
              <span className='text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30'>
                Active
              </span>
            )}
          </h3>
          <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400'>
            <span className='flex items-center gap-1'>
              <span className='text-blue-400 font-medium'>
                {formatDuration(pkg.duration)}
              </span>
            </span>
          </div>
        </div>

        <div className='flex gap-3'>
          {!isActive && (
            <Button
              onClick={onActivate}
              variant='secondary'
              className='bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors'
            >
              <Check className='mr-2 h-4 w-4' /> Activate
            </Button>
          )}
          <Button
            onClick={onEdit}
            variant='outline'
            className='bg-blue-800 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant='ghost'
            className='text-gray-500 hover:text-red-400 hover:bg-red-500/10'
          >
            <Trash2 className='h-5 w-5' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounterPackages;
