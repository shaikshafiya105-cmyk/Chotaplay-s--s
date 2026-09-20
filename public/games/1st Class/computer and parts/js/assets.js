/**
 * Computer Quest - Asset Manifest & Loader
 * Uses the authoritative real computer part images provided in the project.
 */

const GameAssets = {
  // Primary 6 Computer Parts for Class 1 learning
  parts: {
    monitor: {
      id: 'monitor',
      name: 'Monitor',
      shortDesc: 'We use it to see.',
      speechIntro: 'Find the monitor!',
      speechSuccess: 'Monitor! We use it to see.',
      img: 'assets/computer-parts/monitor.webp',
      fallbackImg: 'computer and parts/monitor.webp',
      slotId: 'slot-monitor',
      badge: '🖥️'
    },
    cpu: {
      id: 'cpu',
      name: 'CPU / System Unit',
      shortDesc: 'It helps the computer work.',
      speechIntro: 'Find the CPU!',
      speechSuccess: 'This is the CPU! It is the brain that helps the computer work.',
      img: 'assets/computer-parts/cpu.webp',
      fallbackImg: 'computer and parts/cpu.webp',
      slotId: 'slot-cpu',
      badge: '🎛️'
    },
    keyboard: {
      id: 'keyboard',
      name: 'Keyboard',
      shortDesc: 'We use it to type.',
      speechIntro: 'Find the keyboard!',
      speechSuccess: 'Keyboard! We use it to type words and numbers.',
      img: 'assets/computer-parts/keyboard.webp',
      fallbackImg: 'computer and parts/keyboard.webp',
      slotId: 'slot-keyboard',
      badge: '⌨️'
    },
    mouse: {
      id: 'mouse',
      name: 'Mouse',
      shortDesc: 'We use it to point and click.',
      speechIntro: 'Find the mouse!',
      speechSuccess: 'Mouse! We use it to point and click.',
      img: 'assets/computer-parts/mouse.webp',
      fallbackImg: 'computer and parts/mouse.webp',
      slotId: 'slot-mouse',
      badge: '🖱️'
    },
    speaker: {
      id: 'speaker',
      name: 'Speakers',
      shortDesc: 'They give us sound.',
      speechIntro: 'Find the speakers!',
      speechSuccess: 'Speakers! They give us music and sound.',
      img: 'assets/computer-parts/speaker.webp',
      fallbackImg: 'computer and parts/speaker.webp',
      slotId: 'slot-speaker',
      badge: '🔊'
    },
    printer: {
      id: 'printer',
      name: 'Printer',
      shortDesc: 'It prints our work on paper.',
      speechIntro: 'Find the printer!',
      speechSuccess: 'Printer! It prints our pictures and work on paper.',
      img: 'assets/computer-parts/printer.webp',
      fallbackImg: 'computer and parts/printer.webp',
      slotId: 'slot-printer',
      badge: '🖨️'
    }
  },

  // Room distractors from provided images
  distractors: [
    { id: 'teddy_bear', name: 'Teddy Bear', img: 'assets/computer-parts/teddy bear.webp', fallbackImg: 'computer and parts/teddy bear.webp' },
    { id: 'book', name: 'Book', img: 'assets/computer-parts/book.webp', fallbackImg: 'computer and parts/book.webp' },
    { id: 'pencil', name: 'Pencil', img: 'assets/computer-parts/pencil.webp', fallbackImg: 'computer and parts/pencil.webp' },
    { id: 'clock', name: 'Clock', img: 'assets/computer-parts/clock.webp', fallbackImg: 'computer and parts/clock.webp' },
    { id: 'school_bag', name: 'School Bag', img: 'assets/computer-parts/school bag.webp', fallbackImg: 'computer and parts/school bag.webp' },
    { id: 'water_bottle', name: 'Water Bottle', img: 'assets/computer-parts/wter bottle.webp', fallbackImg: 'computer and parts/wter bottle.webp' },
    { id: 'chair', name: 'Chair', img: 'assets/computer-parts/chair.webp', fallbackImg: 'computer and parts/chair.webp' },
    { id: 'notebook', name: 'Notebook', img: 'assets/computer-parts/notebook.webp', fallbackImg: 'computer and parts/notebook.webp' }
  ],

  // Extra accessories discoverable in free play or lab scenery
  accessories: [
    { id: 'headphones', name: 'Headphones', img: 'assets/computer-parts/headphones.webp', fallbackImg: 'computer and parts/headphones.webp' },
    { id: 'web_cam', name: 'Webcam', img: 'assets/computer-parts/web cam.webp', fallbackImg: 'computer and parts/web cam.webp' },
    { id: 'microphone', name: 'Microphone', img: 'assets/computer-parts/microhphone.webp', fallbackImg: 'computer and parts/microhphone.webp' },
    { id: 'usb_flash_drive', name: 'USB Flash Drive', img: 'assets/computer-parts/usb flash drive.webp', fallbackImg: 'computer and parts/usb flash drive.webp' }
  ],

  preload() {
    const allImages = [];
    Object.values(this.parts).forEach(p => allImages.push(p.img));
    this.distractors.forEach(d => allImages.push(d.img));
    this.accessories.forEach(a => allImages.push(a.img));

    let loadedCount = 0;
    return new Promise((resolve) => {
      if (allImages.length === 0) return resolve();
      allImages.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount >= allImages.length) {
            resolve();
          }
        };
        img.src = src;
      });
    });
  }
};
