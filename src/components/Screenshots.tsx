import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/customers-sc/1.jpg';
import image2 from '../assets/customers-sc/2.jpg';
import image3 from '../assets/customers-sc/3.jpg';
import image4 from '../assets/customers-sc/4.jpg';
import image5 from '../assets/customers-sc/5.jpg';
import image6 from '../assets/customers-sc/6.jpg';
import image7 from '../assets/customers-sc/7.jpg';
import image8 from '../assets/customers-sc/8.jpg';
import image9 from '../assets/customers-sc/9.jpg';
import image10 from '../assets/customers-sc/10.jpg';
import image11 from '../assets/customers-sc/11.jpg';
import image12 from '../assets/customers-sc/12.jpg';
import image13 from '../assets/customers-sc/13.jpg';
import image14 from '../assets/customers-sc/14.jpg';
import image15 from '../assets/customers-sc/15.jpg';
import image16 from '../assets/customers-sc/16.jpg';
import image17 from '../assets/customers-sc/17.jpg';
import image18 from '../assets/customers-sc/18.jpg';
import image19 from '../assets/customers-sc/19.jpg';
import image20 from '../assets/customers-sc/20.jpg';
import image21 from '../assets/customers-sc/21.jpg';

const Screenshots = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageAspectRatios, setImageAspectRatios] = useState<number[]>(
    Array(21).fill(1.5),
  );
  const [imagesReady, setImagesReady] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>('50vh');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const images = useMemo(
    () => [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
      image12,
      image13,
      image14,
      image15,
      image16,
      image17,
      image18,
      image19,
      image20,
      image21,
    ],
    [],
  );

  // Preload only first 6 images (visible ones) for aspect ratios
  useEffect(() => {
    const loadImageData = () => {
      const heights: number[] = [];
      const aspectRatios: number[] = [];
      let loadedCount = 0;
      const imagesToPreload = Math.min(6, images.length); // Only preload first 6

      // Preload first few images for layout calculation
      for (let index = 0; index < imagesToPreload; index++) {
        const img = new Image();
        img.onload = () => {
          heights[index] = img.height;
          aspectRatios[index] = img.width / img.height;
          loadedCount++;

          // Update aspect ratio immediately
          setImageAspectRatios((prev) => {
            const updated = [...prev];
            updated[index] = aspectRatios[index];
            return updated;
          });

          if (loadedCount === imagesToPreload) {
            setImageHeights(heights);
            setImagesReady(true);
            // Mark first few images as loaded
            setLoadedImages(
              new Set(Array.from({ length: imagesToPreload }, (_, i) => i)),
            );
          }
        };
        img.src = images[index];
      }
    };

    loadImageData();
  }, [images]);

  // Distribute images into 2 columns based on height
  const { column1, column2 } = useMemo(() => {
    const col1: number[] = [];
    const col2: number[] = [];
    let col1Height = 0;
    let col2Height = 0;

    if (imageHeights.length === 0) {
      images.forEach((_, index) => {
        if (index % 2 === 0) {
          col1.push(index);
        } else {
          col2.push(index);
        }
      });
    } else {
      images.forEach((_, index) => {
        const height = imageHeights[index] || 300;

        if (col1Height <= col2Height) {
          col1.push(index);
          col1Height += height;
        } else {
          col2.push(index);
          col2Height += height;
        }
      });
    }

    return { column1: col1, column2: col2 };
  }, [imageHeights, images]);

  // Calculate responsive maxHeight based on breakpoints
  useEffect(() => {
    const calculateMaxHeight = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg and above: 100vh
        setMaxHeight('100vh');
      } else if (width >= 768) {
        // md and above (but below lg): 80vh
        setMaxHeight('80vh');
      } else {
        // below md: 60vh
        setMaxHeight('60vh');
      }
    };

    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, []);

  // Track image loading with Intersection Observer for better performance tracking
  useEffect(() => {
    if (!imagesReady) return;

    const observerOptions = {
      root: null,
      rootMargin: '50px', // Start tracking 50px before image enters viewport
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;
          const imageIndex = parseInt(imgElement.dataset.index || '0', 10);

          // Mark as intersecting (browser will handle lazy loading)
          if (!loadedImages.has(imageIndex)) {
            observer.unobserve(imgElement);
          }
        }
      });
    }, observerOptions);

    // Observe all image elements that haven't been loaded yet
    const timeoutId = setTimeout(() => {
      imageRefs.current.forEach((imgElement) => {
        if (imgElement) {
          const imageIndex = parseInt(imgElement.dataset.index || '0', 10);
          if (!loadedImages.has(imageIndex)) {
            observer.observe(imgElement);
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [imagesReady, loadedImages, column1, column2]);

  // Measure actual content height after render
  useEffect(() => {
    const measureHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    if (imagesReady) {
      setTimeout(measureHeight, 200);
    }

    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [imagesReady, column1, column2]);

  return (
    <section className="main-section relative">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 md:h1 mb-12 text-center"
          style={{ textWrap: 'balance' }}
        >
          What type of results you can expect from our ad strategies
        </motion.h1>

        <div className="relative overflow-hidden">
          <motion.div
            ref={contentRef}
            className="flex flex-col gap-2 md:flex-row md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              maxHeight: isExpanded
                ? `${Math.max(contentHeight || 10000, 10000)}px`
                : maxHeight,
              overflow: isExpanded ? 'visible' : 'hidden',
              transition: 'max-height 0.6s ease-in-out',
            }}
          >
            {/* Column 1 */}
            <div className="flex w-full flex-col gap-2 md:w-[calc(50%-0.75rem)] md:gap-6">
              {column1.map((imageIndex, idx) => {
                const aspectRatio = imageAspectRatios[imageIndex] || 1.5;
                const shouldLoad = loadedImages.has(imageIndex) || idx < 3; // Load first 3 in each column
                return (
                  <motion.div
                    key={`col1-${imageIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="overflow-hidden rounded-lg"
                    style={{
                      width: '100%',
                      aspectRatio: aspectRatio,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      ref={(el) => {
                        if (el) {
                          imageRefs.current.set(imageIndex, el);
                        }
                      }}
                      data-index={imageIndex}
                      src={images[imageIndex]}
                      alt={`Screenshot ${imageIndex + 1}`}
                      className="border-accentPrimary block h-full w-full rounded-lg border-2 object-cover"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                      loading={shouldLoad ? 'eager' : 'lazy'}
                      decoding="async"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        const index = parseInt(img.dataset.index || '0', 10);
                        if (!loadedImages.has(index)) {
                          setLoadedImages((prev) => {
                            const updated = new Set(prev);
                            updated.add(index);
                            return updated;
                          });
                        }
                        // Update aspect ratio
                        if (img.naturalHeight > 0) {
                          const ratio = img.naturalWidth / img.naturalHeight;
                          setImageAspectRatios((prev) => {
                            const updated = [...prev];
                            updated[index] = ratio;
                            return updated;
                          });
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex w-full flex-col gap-2 md:w-[calc(50%-0.75rem)] md:gap-6">
              {column2.map((imageIndex, idx) => {
                const aspectRatio = imageAspectRatios[imageIndex] || 1.5;
                const shouldLoad = loadedImages.has(imageIndex) || idx < 3; // Load first 3 in each column
                return (
                  <motion.div
                    key={`col2-${imageIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="overflow-hidden rounded-lg"
                    style={{
                      width: '100%',
                      aspectRatio: aspectRatio,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      ref={(el) => {
                        if (el) {
                          imageRefs.current.set(imageIndex, el);
                        }
                      }}
                      data-index={imageIndex}
                      src={images[imageIndex]}
                      alt={`Screenshot ${imageIndex + 1}`}
                      className="border-accentPrimary block h-full w-full rounded-lg border-2 object-cover"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                      loading={shouldLoad ? 'eager' : 'lazy'}
                      decoding="async"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        const index = parseInt(img.dataset.index || '0', 10);
                        if (!loadedImages.has(index)) {
                          setLoadedImages((prev) => {
                            const updated = new Set(prev);
                            updated.add(index);
                            return updated;
                          });
                        }
                        // Update aspect ratio
                        if (img.naturalHeight > 0) {
                          const ratio = img.naturalWidth / img.naturalHeight;
                          setImageAspectRatios((prev) => {
                            const updated = [...prev];
                            updated[index] = ratio;
                            return updated;
                          });
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Mask */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="from-bgPrimary via-bgPrimary/65 pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t to-transparent"
            />
          )}
        </div>

        {/* Load More Button - Below Section */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="text-accentPrimary hover:text-accentSecondary cursor-pointer text-lg font-medium underline transition-colors"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Screenshots;
