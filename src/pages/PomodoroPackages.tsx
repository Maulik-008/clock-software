import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';
import {
  getPackages,
  savePackages,
  getActivePackageId,
  setActivePackageId,
  PomodoroPackage,
  DEFAULT_PACKAGE,
} from '@/lib/pomodoroSettings';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Check, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toast } from 'sonner';
import useAnalytics from '@/hooks/use-analytics';

const PomodoroPackages = () => {
  const analytics = useAnalytics();
  const [packages, setPackages] = useState<PomodoroPackage[]>([]);
  const [activeId, setActiveId] = useState<string>('default');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creatingId, setCreatingId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    setPackages(getPackages());
    setActiveId(getActivePackageId());
  }, []);

  // Track page view
  useEffect(() => {
    analytics.trackPageView(
      '/pomodoro-packages',
      'Pomodoro Packages',
      window.matchMedia('(display-mode: standalone)').matches,
    );
  }, []);

  const handleSetActive = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    setActivePackageId(id);
    setActiveId(id);

    // Track package activation
    if (pkg) {
      analytics.trackPackageActivate(id, pkg.name);
    }

    toast.success('Timer package activated!');
  };

  const handleSave = (pkg: PomodoroPackage) => {
    if (!pkg.name.trim()) {
      toast.error('Package name cannot be empty');
      return;
    }
    if (pkg.pomodoro <= 0 || pkg.shortBreak <= 0 || pkg.longBreak <= 0) {
      toast.error('Durations must be positive numbers');
      return;
    }

    const newPackages = packages.map((p) => (p.id === pkg.id ? pkg : p));
    setPackages(newPackages);
    savePackages(newPackages);
    setEditingId(null);

    if (creatingId === pkg.id) {
      analytics.trackPackageCreate(pkg.name);
      toast.success('New package created!');
      setCreatingId(null);
    } else {
      analytics.trackPackageEdit(pkg.id, pkg.name, {
        pomodoro: pkg.pomodoro,
        shortBreak: pkg.shortBreak,
        longBreak: pkg.longBreak,
      });
      toast.success('Package saved successfully.');
    }
  };

  const handleDelete = (id: string) => {
    // If we are creating a package, treat the list size carefuly
    const isCreating = !!creatingId;
    const isDeletingCreated = id === creatingId;

    if (!isDeletingCreated && packages.length <= 1) {
      toast.error('You must have at least one package.');
      return;
    }

    const pkgToDelete = packages.find((p) => p.id === id);
    const newPackages = packages.filter((p) => p.id !== id);

    // If we are deleting a saved package while creating another,
    // we must ensure we don't end up with 0 saved packages.
    // And we must NOT save the creating package to storage.
    const packagesToSave = newPackages.filter((p) => p.id !== creatingId);

    if (packagesToSave.length === 0 && !isDeletingCreated) {
      toast.error('You must have at least one saved package.');
      return;
    }

    setPackages(newPackages);
    savePackages(packagesToSave);

    if (id === creatingId) {
      setCreatingId(null);
      setEditingId(null);
    }

    if (activeId === id) {
      // If we deleted the active package, switch to the first available one (preferably saved)
      const newActive = packagesToSave[0]?.id || newPackages[0]?.id;
      if (newActive) {
        setActiveId(newActive);
        setActivePackageId(newActive); // This saves the active ID reference
      }
    }

    // Track package deletion
    if (pkgToDelete) {
      analytics.trackPackageDelete(id, pkgToDelete.name);
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
    // Generate unique ID with fallback for older browsers
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback for older browsers
      return `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const newPkg: PomodoroPackage = {
      id: generateId(),
      name: 'New Package',
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    };
    const newPackages = [...packages, newPkg];
    setPackages(newPackages);
    // Don't save yet
    setCreatingId(newPkg.id);
    setEditingId(newPkg.id);
  };

  return (
    <>
      <Helmet>
        <title>Pomodoro Timer Packages - Study Clock</title>
        <meta
          name='description'
          content='Create and manage custom Pomodoro timer configurations. Customize your focus time, short breaks, and long breaks to match your productivity style.'
        />
      </Helmet>

      <PageLayout className='text-gray-100' showParticles>
        <Navigation />

        <main className='relative z-10 min-h-screen container mx-auto px-4 py-28 pb-16'>
          <div className='max-w-4xl mx-auto'>
            <header className='mb-8 text-center'>
              <h1 className='text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-500 mb-4'>
                Pomodoro Timer Packages
              </h1>
              <p className='text-gray-400 text-base md:text-lg max-w-2xl mx-auto'>
                Create and manage your custom Pomodoro timer configurations. Set
                your ideal focus time, short breaks, and long breaks.
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
  pkg: PomodoroPackage;
  isActive: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (pkg: PomodoroPackage) => void;
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
  const [data, setData] = useState(pkg);

  useEffect(() => {
    if (isEditing) {
      setData(pkg);
    }
  }, [pkg, isEditing]);

  const handleChange = (
    field: keyof PomodoroPackage,
    value: string | number,
  ) => {
    setData({ ...data, [field]: value });
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
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='bg-gray-800 border-gray-600 text-white'
            />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='pomodoro' className='text-gray-300'>
                Pomodoro (min)
              </Label>
              <Input
                id='pomodoro'
                type='number'
                value={data.pomodoro}
                onChange={(e) =>
                  handleChange('pomodoro', parseInt(e.target.value) || 0)
                }
                className='bg-gray-800 border-gray-600 text-white'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='shortBreak' className='text-gray-300'>
                Short Break (min)
              </Label>
              <Input
                id='shortBreak'
                type='number'
                value={data.shortBreak}
                onChange={(e) =>
                  handleChange('shortBreak', parseInt(e.target.value) || 0)
                }
                className='bg-gray-800 border-gray-600 text-white'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='longBreak' className='text-gray-300'>
                Long Break (min)
              </Label>
              <Input
                id='longBreak'
                type='number'
                value={data.longBreak}
                onChange={(e) =>
                  handleChange('longBreak', parseInt(e.target.value) || 0)
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
              onClick={() => onSave(data)}
              className='bg-green-600 hover:bg-green-700 text-white'
            >
              <Save className='mr-2 h-4 w-4' /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`relative transition-all duration-300 border-gray-800 backdrop-blur-md ${
        isActive
          ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
          : 'bg-gray-900/40 hover:bg-gray-900/60'
      }`}
    >
      <CardContent className='p-6 flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex-1 space-y-2 text-center md:text-left'>
          <h3 className='text-xl font-bold text-white flex items-center justify-center md:justify-start gap-3'>
            {pkg.name}
            {isActive && (
              <span className='text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30'>
                Active
              </span>
            )}
          </h3>
          <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400'>
            <span className='flex items-center gap-1'>
              <span className='text-red-400 font-medium'>{pkg.pomodoro}</span>{' '}
              min Focus
            </span>
            <span className='w-1 h-1 rounded-full bg-gray-600 self-center'></span>
            <span className='flex items-center gap-1'>
              <span className='text-green-400 font-medium'>
                {pkg.shortBreak}
              </span>{' '}
              min Short Break
            </span>
            <span className='w-1 h-1 rounded-full bg-gray-600 self-center'></span>
            <span className='flex items-center gap-1'>
              <span className='text-blue-400 font-medium'>{pkg.longBreak}</span>{' '}
              min Long Break
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
            className='bg-green-800 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
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

export default PomodoroPackages;
