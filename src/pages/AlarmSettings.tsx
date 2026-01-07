import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import useAnalytics from '@/hooks/use-analytics';
import {
  Bell,
  Upload,
  Trash2,
  Play,
  Square,
  Check,
  ArrowLeft,
  Music,
  HardDrive,
  AlertCircle,
  Volume2,
} from 'lucide-react';
import {
  getAllCustomAlarms,
  addCustomAlarm,
  deleteCustomAlarm,
  getStorageInfo,
  formatBytes,
  getCustomAlarmURL,
  type CustomAlarm,
} from '@/utils/alarmStorage';
import {
  PREDEFINED_ALARMS,
  getAlarmSettings,
  setSelectedPredefinedAlarm,
  setSelectedCustomAlarm,
  type AlarmSettings,
} from '@/utils/alarmSettings';

const AlarmSettings = () => {
  const { toast } = useToast();
  const analytics = useAnalytics();
  const [alarmSettings, setAlarmSettings] = useState<AlarmSettings>(
    getAlarmSettings()
  );
  const [customAlarms, setCustomAlarms] = useState<CustomAlarm[]>([]);
  const [storageInfo, setStorageInfo] = useState<{
    totalUsed: number;
    totalUsedFormatted: string;
    maxStorage: number;
    maxStorageFormatted: string;
    percentageUsed: number;
    alarmsCount: number;
    maxFileSize: number;
    maxFileSizeFormatted: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [playingAlarmId, setPlayingAlarmId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCustomAlarms();
    loadStorageInfo();

    // Track page view
    analytics.trackPageView(
      '/alarm-settings',
      'Alarm Settings',
      window.matchMedia('(display-mode: standalone)').matches
    );
  }, [analytics]);

  const loadCustomAlarms = async () => {
    try {
      const alarms = await getAllCustomAlarms();
      setCustomAlarms(alarms);
    } catch (error) {
      console.error('Error loading custom alarms:', error);
    }
  };

  const loadStorageInfo = async () => {
    try {
      const info = await getStorageInfo();
      setStorageInfo(info);

      // Track storage usage
      analytics.trackStorageUsage(
        info.totalUsed,
        info.maxStorage,
        info.alarmsCount
      );
    } catch (error) {
      console.error('Error loading storage info:', error);
    }
  };

  const handleSelectPredefinedAlarm = (alarmId: string) => {
    const alarm = PREDEFINED_ALARMS.find((a) => a.id === alarmId);
    setSelectedPredefinedAlarm(alarmId);
    setAlarmSettings(getAlarmSettings());

    // Track alarm selection
    analytics.trackAlarmSelect(alarmId, alarm?.name || 'Unknown');

    toast({
      title: 'Alarm Selected',
      description: 'Your alarm sound has been updated.',
    });
  };

  const handleSelectCustomAlarm = (customAlarmId: string) => {
    const customAlarm = customAlarms.find((a) => a.id === customAlarmId);
    setSelectedCustomAlarm(customAlarmId);
    setAlarmSettings(getAlarmSettings());

    // Track custom alarm selection
    analytics.trackCustomAlarmSelect(
      customAlarmId,
      customAlarm?.name || 'Unknown'
    );

    toast({
      title: 'Custom Alarm Selected',
      description: 'Your custom alarm sound has been set.',
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload an audio file (MP3, WAV, etc.)',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      await addCustomAlarm(file);
      await loadCustomAlarms();
      await loadStorageInfo();

      // Track custom alarm upload
      analytics.trackCustomAlarmUpload(file.name, file.size);

      toast({
        title: 'Upload Successful',
        description: `${file.name} has been added to your custom alarms.`,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to upload alarm sound.';
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteCustomAlarm = async (id: string) => {
    try {
      const alarmToDelete = customAlarms.find((a) => a.id === id);
      await deleteCustomAlarm(id);

      // If this was the selected alarm, reset to default
      if (
        alarmSettings.selectedAlarmType === 'custom' &&
        alarmSettings.selectedAlarmId === id
      ) {
        setSelectedPredefinedAlarm('alarm_1');
        setAlarmSettings(getAlarmSettings());
      }

      await loadCustomAlarms();
      await loadStorageInfo();

      // Track custom alarm deletion
      if (alarmToDelete) {
        analytics.trackCustomAlarmDelete(id, alarmToDelete.name);
      }

      toast({
        title: 'Alarm Deleted',
        description: 'Custom alarm has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete alarm sound.',
        variant: 'destructive',
      });
    }
  };

  const handlePlayAlarm = async (
    alarmId: string,
    type: 'predefined' | 'custom'
  ) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      if (playingAlarmId === alarmId) {
        setPlayingAlarmId(null);
        return;
      }
    }

    try {
      let audioUrl: string | null = null;

      if (type === 'predefined') {
        const alarm = PREDEFINED_ALARMS.find((a) => a.id === alarmId);
        audioUrl = alarm?.path || null;
      } else {
        audioUrl = await getCustomAlarmURL(alarmId);
      }

      if (!audioUrl) {
        throw new Error('Alarm not found');
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setPlayingAlarmId(alarmId);

      audio.onended = () => {
        setPlayingAlarmId(null);
        audioRef.current = null;
      };

      await audio.play();

      // Track alarm preview
      analytics.trackAlarmPreview(alarmId, type);
    } catch (error) {
      console.error('Error playing alarm:', error);
      toast({
        title: 'Playback Failed',
        description: 'Failed to play alarm sound.',
        variant: 'destructive',
      });
      setPlayingAlarmId(null);
    }
  };

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAlarmId(null);
  };

  const isSelected = (alarmId: string, type: 'predefined' | 'custom') => {
    return (
      alarmSettings.selectedAlarmType === type &&
      alarmSettings.selectedAlarmId === alarmId
    );
  };

  return (
    <>
      <Helmet>
        <title>Alarm Settings - Study Clock</title>
        <meta
          name='description'
          content='Customize your study timer alarm sounds. Choose from predefined alarms or upload your own custom sounds.'
        />
      </Helmet>

      <div className='relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden'>
        <ParticleBackground />
        <Navigation />

        <main className='relative z-10 min-h-screen container mx-auto px-4 py-28 pb-16'>
          <div className='max-w-5xl mx-auto'>
            {/* Header */}
            <header className='mb-8 text-center'>
              <Link
                to='/'
                className='inline-flex items-center text-purple-400 hover:text-purple-300 mb-4 transition-colors'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
              <h1 className='text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4'>
                <Bell className='inline-block h-8 w-8 md:h-10 md:w-10 text-purple-400 mr-3' />
                Alarm Settings
              </h1>
              <p className='text-gray-400 text-base md:text-lg max-w-2xl mx-auto'>
                Customize your study timer alarm sound. Choose from our
                predefined collection or upload your own.
              </p>
            </header>

            {/* Storage Info */}
            {storageInfo && (
              <Card className='p-4 md:p-6 mb-6 bg-gray-900/60 backdrop-blur-md border-gray-700'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-purple-900/30 rounded-lg'>
                    <HardDrive className='h-5 w-5 md:h-6 md:w-6 text-purple-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-white mb-2 text-sm md:text-base'>
                      Storage Usage
                    </h3>
                    <Progress
                      value={storageInfo.percentageUsed}
                      className='h-2 mb-2'
                    />
                    <div className='flex justify-between text-xs md:text-sm text-gray-400'>
                      <span>{storageInfo.totalUsedFormatted} used</span>
                      <span>{storageInfo.maxStorageFormatted} total</span>
                    </div>
                    <p className='text-xs md:text-sm text-gray-500 mt-2'>
                      {storageInfo.alarmsCount} custom alarm
                      {storageInfo.alarmsCount !== 1 ? 's' : ''} stored
                    </p>
                  </div>
                </div>
                {storageInfo.percentageUsed > 80 && (
                  <div className='mt-4 flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg'>
                    <AlertCircle className='h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5' />
                    <p className='text-sm text-yellow-200'>
                      You're running low on storage space. Consider deleting
                      some custom alarms.
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Predefined Alarms */}
            <Card className='p-4 md:p-6 mb-6 bg-gray-900/60 backdrop-blur-md border-gray-700'>
              <h2 className='text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                <Music className='h-5 w-5 md:h-6 md:w-6 text-purple-400' />
                Predefined Alarms
              </h2>
              <p className='text-gray-400 mb-6 text-sm md:text-base'>
                Choose from our collection of carefully selected alarm sounds.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
                {PREDEFINED_ALARMS.map((alarm) => (
                  <div
                    key={alarm.id}
                    className={`p-3 md:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected(alarm.id, 'predefined')
                        ? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20'
                        : 'border-gray-700 bg-gray-800/40 hover:border-purple-400/50 hover:bg-gray-800/60'
                    }`}
                    onClick={() => handleSelectPredefinedAlarm(alarm.id)}
                  >
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex items-center gap-2 md:gap-3 min-w-0 flex-1'>
                        {isSelected(alarm.id, 'predefined') && (
                          <div className='p-1 bg-purple-600 rounded-full flex-shrink-0'>
                            <Check className='h-3 w-3 md:h-4 md:w-4 text-white' />
                          </div>
                        )}
                        <div className='min-w-0'>
                          <p className='font-semibold text-white text-sm md:text-base truncate'>
                            {alarm.name}
                          </p>
                          {alarm.isDefault && (
                            <span className='text-xs text-purple-400 font-medium'>
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='flex-shrink-0 hover:bg-gray-700'
                        onClick={(e) => {
                          e.stopPropagation();
                          if (playingAlarmId === alarm.id) {
                            handleStopAlarm();
                          } else {
                            handlePlayAlarm(alarm.id, 'predefined');
                          }
                        }}
                      >
                        {playingAlarmId === alarm.id ? (
                          <Square className='h-4 w-4 text-purple-400' />
                        ) : (
                          <Play className='h-4 w-4 text-gray-400' />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Custom Alarms */}
            <Card className='p-4 md:p-6 bg-gray-900/60 backdrop-blur-md border-gray-700'>
              <h2 className='text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                <Upload className='h-5 w-5 md:h-6 md:w-6 text-purple-400' />
                Custom Alarms
              </h2>
              <p className='text-gray-400 mb-6 text-sm md:text-base'>
                Upload your own alarm sounds. Maximum file size:{' '}
                {storageInfo?.maxFileSizeFormatted || '5 MB'}
              </p>

              {/* Upload Button */}
              <div className='mb-6'>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='audio/*'
                  onChange={handleFileUpload}
                  className='hidden'
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className='w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white'
                >
                  <Upload className='mr-2 h-4 w-4' />
                  {isUploading ? 'Uploading...' : 'Upload Custom Alarm'}
                </Button>
              </div>

              {/* Custom Alarms List */}
              {customAlarms.length === 0 ? (
                <div className='text-center py-12 text-gray-500'>
                  <Music className='h-12 w-12 mx-auto mb-3 opacity-50' />
                  <p className='text-sm md:text-base'>
                    No custom alarms yet. Upload one to get started!
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {customAlarms.map((alarm) => (
                    <div
                      key={alarm.id}
                      className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                        isSelected(alarm.id, 'custom')
                          ? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20'
                          : 'border-gray-700 bg-gray-800/40'
                      }`}
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <div
                          className='flex items-center gap-2 md:gap-3 flex-1 cursor-pointer min-w-0'
                          onClick={() => handleSelectCustomAlarm(alarm.id)}
                        >
                          {isSelected(alarm.id, 'custom') && (
                            <div className='p-1 bg-purple-600 rounded-full flex-shrink-0'>
                              <Check className='h-3 w-3 md:h-4 md:w-4 text-white' />
                            </div>
                          )}
                          <div className='flex-1 min-w-0'>
                            <p className='font-semibold text-white text-sm md:text-base truncate'>
                              {alarm.name}
                            </p>
                            <p className='text-xs md:text-sm text-gray-500'>
                              {formatBytes(alarm.size)}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2 flex-shrink-0'>
                          <Button
                            size='sm'
                            variant='ghost'
                            className='hover:bg-gray-700'
                            onClick={() => {
                              if (playingAlarmId === alarm.id) {
                                handleStopAlarm();
                              } else {
                                handlePlayAlarm(alarm.id, 'custom');
                              }
                            }}
                          >
                            {playingAlarmId === alarm.id ? (
                              <Square className='h-4 w-4 text-purple-400' />
                            ) : (
                              <Play className='h-4 w-4 text-gray-400' />
                            )}
                          </Button>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleDeleteCustomAlarm(alarm.id)}
                            className='text-red-400 hover:text-red-300 hover:bg-red-900/20'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlarmSettings;
