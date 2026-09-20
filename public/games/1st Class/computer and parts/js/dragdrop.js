/**
 * Computer Quest - Pointer-based Drag & Drop Engine
 * Supports Mouse, Touch, Smartboard Stylus
 */

class DragDropEngine {
  constructor() {
    this.activeDrag = null;
    this.startX = 0;
    this.startY = 0;
    this.initialLeft = 0;
    this.initialTop = 0;
    this.attempts = 0;
    this.onCorrectDrop = null;
    this.onWrongDrop = null;
  }

  init(onCorrectDrop, onWrongDrop) {
    this.onCorrectDrop = onCorrectDrop;
    this.onWrongDrop = onWrongDrop;
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    document.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    document.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
  }

  makeDraggable(element, itemData) {
    element.style.touchAction = 'none';
    element.dataset.itemId = itemData.id;
    element.dataset.isPart = itemData.isPart ? 'true' : 'false';

    element.addEventListener('pointerdown', (e) => {
      // Don't drag if game is paused or locked
      if (element.classList.contains('locked') || element.classList.contains('placed')) return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      e.preventDefault();
      element.setPointerCapture(e.pointerId);

      const rect = element.getBoundingClientRect();
      this.activeDrag = {
        element: element,
        data: itemData,
        pointerId: e.pointerId,
        parent: element.parentElement,
        homeX: element.offsetLeft,
        homeY: element.offsetTop,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        width: rect.width,
        height: rect.height
      };

      element.classList.add('dragging');
      element.style.position = 'fixed';
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      element.style.left = `${e.clientX - this.activeDrag.offsetX}px`;
      element.style.top = `${e.clientY - this.activeDrag.offsetY}px`;
      element.style.zIndex = '9999';

      AudioController.playPickup();
      AnimationController.setGuideState('curious');
    });
  }

  handlePointerMove(e) {
    if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;
    const el = this.activeDrag.element;
    const x = e.clientX - this.activeDrag.offsetX;
    const y = e.clientY - this.activeDrag.offsetY;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Highlight drop targets if hovering
    this.checkHoverTargets(e.clientX, e.clientY);
  }

  checkHoverTargets(x, y) {
    const buildDesk = document.getElementById('build-desk-zone');
    if (!buildDesk) return;
    const deskRect = buildDesk.getBoundingClientRect();
    const isHoveringDesk = (
      x >= deskRect.left &&
      x <= deskRect.right &&
      y >= deskRect.top &&
      y <= deskRect.bottom
    );

    if (isHoveringDesk) {
      buildDesk.classList.add('zone-hover');
    } else {
      buildDesk.classList.remove('zone-hover');
    }
  }

  handlePointerUp(e) {
    if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;

    const drag = this.activeDrag;
    const el = drag.element;
    el.releasePointerCapture(e.pointerId);

    const buildDesk = document.getElementById('build-desk-zone');
    if (buildDesk) buildDesk.classList.remove('zone-hover');

    const dropX = e.clientX;
    const dropY = e.clientY;

    // Hit test with build desk zone or specific target slot
    let isDroppedOnDesk = false;
    if (buildDesk) {
      const deskRect = buildDesk.getBoundingClientRect();
      // Generous hit box for 5-7 year olds
      const padding = 20;
      isDroppedOnDesk = (
        dropX >= deskRect.left - padding &&
        dropX <= deskRect.right + padding &&
        dropY >= deskRect.top - padding &&
        dropY <= deskRect.bottom + padding
      );
    }

    // Also check specific target slot if exists
    if (!isDroppedOnDesk && drag.data.slotId) {
      const slotEl = document.getElementById(drag.data.slotId);
      if (slotEl) {
        const slotRect = slotEl.getBoundingClientRect();
        isDroppedOnDesk = (
          dropX >= slotRect.left - 40 &&
          dropX <= slotRect.right + 40 &&
          dropY >= slotRect.top - 40 &&
          dropY <= slotRect.bottom + 40
        );
      }
    }

    if (isDroppedOnDesk) {
      if (this.onCorrectDrop && this.onCorrectDrop(drag.data, el)) {
        // Drop was valid for current mission!
        el.classList.remove('dragging');
        el.classList.add('placed');
        this.attempts = 0;
        this.activeDrag = null;
        return;
      }
    }

    // Wrong drop or dropped outside
    this.handleWrongDrop(drag);
  }

  handleWrongDrop(drag) {
    const el = drag.element;
    this.attempts++;

    AudioController.playWrong();
    AnimationController.setGuideState('thinking');

    // Smooth return transition
    el.style.transition = 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    el.style.position = '';
    el.style.left = '';
    el.style.top = '';
    el.style.width = '';
    el.style.height = '';
    el.style.zIndex = '';
    el.classList.remove('dragging');

    setTimeout(() => {
      el.style.transition = '';
    }, 360);

    this.activeDrag = null;

    if (this.onWrongDrop) {
      this.onWrongDrop(drag.data, this.attempts);
    }
  }

  resetAttempts() {
    this.attempts = 0;
  }
}

const DragDropController = new DragDropEngine();
