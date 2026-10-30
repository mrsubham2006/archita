import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Heart, X, Edit3, RotateCcw, ChevronLeft, ChevronRight, Sliders, Eye } from 'lucide-react';
import { PolaroidPhoto } from '../types';
import { soundEngine } from '../utils/audio';
import { firePinkHeartConfetti } from '../utils/confetti';

export const ARCHITA_PHOTOS: PolaroidPhoto[] = [
  {
    id: '1',
    url: '/assets/aistudio/image_eb3c8496.png',
    caption: 'That radiant, angelic smile that makes everyone’s day brighter ☀️🎀',
    date: 'Pure Sunshine Lusi',
    rotation: -2.5,
    sticker: '👑',
  },
  {
    id: '2',
    url: '/assets/aistudio/image_90ad7402.png',
    caption: 'Soft fairycore vibes & the sweetest soul in the whole universe ✨🌸',
    date: 'Dreamy Angel',
    rotation: 2,
    sticker: '🎀',
  },
  {
    id: '3',
    url: '/assets/aistudio/image_28c22b69.png',
    caption: 'Adorable pookie energy and that mesmerizing, gentle gaze ♡',
    date: 'Sweetest Human',
    rotation: -3,
    sticker: '🍓',
  },
  {
    id: '4',
    url: '/assets/aistudio/image_d881bddd.png',
    caption: 'Iconic music vibes, cute headphone look & endless charm 🎧💕',
    date: 'Lucy Butterfly',
    rotation: 2.5,
    sticker: '🦋',
  },
  {
    id: '5',
    url: '/assets/aistudio/image_1fb6cbfa.png',
    caption: 'Warm aesthetics, cozy laughs and unforgettable memories with you 🧸',
    date: 'Golden Hour',
    rotation: -1.5,
    sticker: '🧁',
  },
  {
    id: '6',
    url: '/assets/aistudio/image_73e78722.png',
    caption: 'Graceful in florals and forever the queen of our hearts 🌺💖',
    date: '2 November Royalty',
    rotation: 3,
    sticker: '⭐',
  },
];

export const PhotoScrapbookSection: React.FC = () => {
  const [photos, setPhotos] = useState<PolaroidPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('archita_birthday_photos_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].url.includes('unsplash')) {
          return parsed;
        }
      }
    } catch {}
    return ARCHITA_PHOTOS;
  });

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PolaroidPhoto | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [clarityMode, setClarityMode] = useState<'hd' | 'vivid' | 'dreamy'>('hd');

  // Persist photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('archita_birthday_photos_v2', JSON.stringify(photos));
    } catch {}
  }, [photos]);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
    soundEngine.playPop();
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
      soundEngine.playPop();
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
      soundEngine.playPop();
    }
  };

  const handleOpenEdit = (photo: PolaroidPhoto) => {
    setEditingPhoto(photo);
    setNewUrl(photo.url);
    setNewCaption(photo.caption);
    setNewDate(photo.date);
    setIsEditing(true);
    soundEngine.playPop();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setPhotos(prev =>
      prev.map(p =>
        p.id === editingPhoto.id
          ? {
              ...p,
              url: newUrl.trim() || p.url,
              caption: newCaption.trim() || p.caption,
              date: newDate.trim() || p.date,
            }
          : p
      )
    );
    setIsEditing(false);
    setEditingPhoto(null);
    soundEngine.playChime();
    firePinkHeartConfetti();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefaults = () => {
    setPhotos(ARCHITA_PHOTOS);
    soundEngine.playPop();
    firePinkHeartConfetti();
  };

  // Dynamic filter styling based on clarityMode for high-definition rendering
  const getFilterStyle = () => {
    switch (clarityMode) {
      case 'hd':
        return 'contrast-[1.06] brightness-[1.03] saturate-[1.08]';
      case 'vivid':
        return 'contrast-[1.12] brightness-[1.05] saturate-[1.2]';
      case 'dreamy':
        return 'contrast-[1.02] brightness-[1.08] saturate-[1.05] sepia-[0.06]';
      default:
        return '';
    }
  };

  return (
    <section id="gallery-section" className="py-24 px-4 relative z-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 text-pink-300 text-xs sm:text-sm font-bold border border-pink-500/30 mb-3 shadow-sm backdrop-blur-md"
          >
            <Camera className="w-4 h-4 text-pink-400" />
            <span>Archita's Real Moments Gallery</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-cute drop-shadow-[0_0_20px_rgba(244,114,182,0.35)]">
            A Little Collection of Beautiful Moments ♡
          </h2>
          <p className="text-sm sm:text-base text-pink-200/90 font-medium max-w-xl mx-auto mt-2">
            Every snapshot captures Archita's irresistible charm, radiant warmth, and adorable vibe. Hover to view the animated tilt effect, or tap to open in full crystal clarity!
          </p>

          {/* Quality Enhancer & Clarity Filter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 bg-purple-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-500/30 shadow-lg text-xs font-bold text-pink-200">
              <Sliders className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-pink-300 mr-1">Clarity Engine:</span>
              <button
                onClick={() => {
                  setClarityMode('hd');
                  soundEngine.playPop();
                }}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  clarityMode === 'hd'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/50'
                    : 'text-pink-300 hover:bg-pink-500/20'
                }`}
              >
                HD Crystal ✨
              </button>
              <button
                onClick={() => {
                  setClarityMode('vivid');
                  soundEngine.playPop();
                }}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  clarityMode === 'vivid'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/50'
                    : 'text-pink-300 hover:bg-pink-500/20'
                }`}
              >
                Vivid Warmth 🌸
              </button>
              <button
                onClick={() => {
                  setClarityMode('dreamy');
                  soundEngine.playPop();
                }}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  clarityMode === 'dreamy'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/50'
                    : 'text-pink-300 hover:bg-pink-500/20'
                }`}
              >
                Dreamy Glow 🎀
              </button>
            </div>

            <button
              onClick={handleResetDefaults}
              className="text-xs text-pink-300 hover:text-white font-semibold flex items-center gap-1.5 px-3.5 py-2 bg-purple-900/60 backdrop-blur-md rounded-full border border-pink-500/30 shadow-md hover:bg-purple-800/70 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Restore Archita's Originals
            </button>
          </div>
        </div>

        {/* Polaroid Scrapbook Grid with 3D Tilt Animations & Clear Quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -8,
                zIndex: 30,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              style={{ rotate: `${photo.rotation}deg` }}
              className="group relative bg-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-pink-200/70 border-2 border-pink-100 flex flex-col cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-pink-300/90 overflow-hidden"
              onClick={() => handleOpenLightbox(index)}
            >
              {/* Shimmer Light Reflection Sweep on Hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />

              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/90 backdrop-blur-sm transform rotate-1 rounded-sm shadow-sm flex items-center justify-center border-l-2 border-r-2 border-dashed border-pink-300 pointer-events-none z-20">
                <span className="text-[10px] text-pink-800 font-extrabold tracking-wider">
                  ARCHITA ♡
                </span>
              </div>

              {/* Top corner cute sticker with bounce */}
              <motion.span
                className="absolute -top-2 -right-2 text-2xl filter drop-shadow z-20"
                whileHover={{ scale: 1.4, rotate: 15 }}
              >
                {photo.sticker}
              </motion.span>

              {/* Photo Image Frame: High-Resolution, Crisp Aspect Ratio */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 mb-3 border border-pink-100 shadow-inner group-hover:border-pink-300 transition-colors">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 ${getFilterStyle()}`}
                  style={{
                    imageRendering: 'auto',
                    objectPosition: 'center 20%',
                  }}
                  loading="lazy"
                />

                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px] pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-pink-700 text-xs font-bold shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-3.5 h-3.5" /> View in HD Quality
                  </span>
                </div>

                {/* Quick Edit Overlay Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(photo);
                  }}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-pink-700 shadow-md opacity-0 group-hover:opacity-100 hover:bg-pink-100 transition-all z-20"
                  title="Replace / Edit Photo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Polaroid Bottom Note Area */}
              <div className="px-1 text-center flex-1 flex flex-col justify-between">
                <p className="font-handwriting text-lg sm:text-xl text-pink-900 font-bold leading-snug">
                  "{photo.caption}"
                </p>
                <div className="flex items-center justify-between text-[11px] text-pink-500 font-semibold pt-2 mt-2 border-t border-pink-100">
                  <span className="font-script text-sm text-pink-600">Lusi Pookie ♡</span>
                  <span className="bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    {photo.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-Screen Crystal Clear Lightbox Modal */}
        <AnimatePresence>
          {activePhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
              onClick={() => setActivePhotoIndex(null)}
            >
              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                title="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                title="Next Photo"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Modal Container */}
              <motion.div
                key={activePhotoIndex}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border-4 border-pink-300 relative text-center flex flex-col items-center max-h-[92vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Top Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎀</span>
                  <span className="text-xs font-black uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    Photo {activePhotoIndex + 1} of {photos.length} • High Resolution
                  </span>
                  <span className="text-xl">✨</span>
                </div>

                {/* High Resolution Image Box */}
                <div className="relative w-full max-h-[58vh] aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-neutral-900 mb-4 border border-pink-100">
                  <img
                    src={photos[activePhotoIndex].url}
                    alt={photos[activePhotoIndex].caption}
                    className={`w-full h-full object-contain sm:object-cover ${getFilterStyle()}`}
                    style={{
                      imageRendering: 'auto',
                    }}
                  />
                  {/* Floating sticker badge */}
                  <div className="absolute bottom-3 right-3 text-3xl filter drop-shadow-lg">
                    {photos[activePhotoIndex].sticker}
                  </div>
                </div>

                {/* Caption & Date */}
                <h3 className="font-handwriting text-2xl sm:text-3xl font-bold text-pink-900 leading-snug px-2">
                  "{photos[activePhotoIndex].caption}"
                </h3>
                <p className="text-xs text-pink-500 font-bold uppercase tracking-wider mt-1">
                  {photos[activePhotoIndex].date} • Archita (Lusi)
                </p>

                {/* Lightbox Controls */}
                <div className="mt-4 pt-3 border-t border-pink-100 flex flex-wrap items-center justify-center gap-3 w-full">
                  <button
                    onClick={() => {
                      soundEngine.playHeartSound();
                      firePinkHeartConfetti();
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Drop Love on this Photo! 💖
                  </button>

                  <button
                    onClick={() => {
                      handleOpenEdit(photos[activePhotoIndex]);
                      setActivePhotoIndex(null);
                    }}
                    className="px-4 py-2.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-200 transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Caption
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit / Upload Photo Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setIsEditing(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl border-4 border-pink-200 relative text-pink-900"
              >
                <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📸</span>
                    <h3 className="text-xl font-bold font-cute">Personalize This Snapshot</h3>
                  </div>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1 rounded-full text-pink-400 hover:bg-pink-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4">
                  {/* File Upload or URL */}
                  <div>
                    <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider mb-1.5">
                      Upload from Device:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-xs text-pink-700 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider mb-1">
                      Or Image URL:
                    </label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="/assets/aistudio/... or https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider mb-1">
                      Cute Caption:
                    </label>
                    <input
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      placeholder="My favorite pookie moment ♡"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  {/* Date Tag */}
                  <div>
                    <label className="block text-xs font-bold text-pink-700 uppercase tracking-wider mb-1">
                      Tag / Date:
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="2 November 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  {/* Preview */}
                  {newUrl && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-pink-400 uppercase mb-1">Preview:</p>
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-pink-200 shadow-sm">
                        <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-pink-600 hover:bg-pink-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
                    >
                      Save Photo 🎀
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
