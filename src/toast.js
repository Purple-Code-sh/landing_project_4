// Primero incluye el ToastManager completo
class ToastManager {
  constructor(options = {}) {
    // Configuration options
    this.position = options.position || 'right'; // 'left' or 'right'

    // Icons for each toast type
    this.icons = {
      success: `<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
      error: `<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`,
      info: `<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`,
      warning: `<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
    };

    // Styles by type
    this.styles = {
      success: 'bg-[#2F2F2F]/95 border border-[#2F2F2F]/30 text-white',
      error: 'bg-red-500/95 border border-red-400/30 text-white',
      info: 'bg-blue-500/95 border border-blue-400/30 text-white',
      warning: 'bg-yellow-500/95 border border-yellow-400/30 text-white',
    };

    // Initialize styles
    this.injectStyles();

    // Bind reorderToasts to window if not already bound
    if (!window.reorderToasts) {
      window.reorderToasts = this.reorderToasts.bind(this);
    }
  }

  /**
   * Inject CSS styles for toasts into the document head
   */
  injectStyles() {
    if (document.querySelector('#toast-manager-styles')) {
      return; // Styles already injected
    }

    const toastStyles = `
              <style id="toast-manager-styles">
                /* Animaciones por defecto para posición derecha */
                .toast-enter {
                  animation: slideInRight 0.3s ease-out;
                }
                
                .toast-exit {
                  animation: slideOutRight 0.3s ease-in;
                }
                
                /* Animaciones para posición izquierda */
                .toast-enter.left-4 {
                  animation: slideInLeft 0.3s ease-out;
                }
                
                .toast-exit.left-4 {
                  animation: slideOutLeft 0.3s ease-in;
                }
                
                .toast-progress {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 3px;
                  background: rgba(255, 255, 255, 0.2);
                  border-radius: 0 0 12px 12px;
                  overflow: hidden;
                }
                
                .toast-progress-fill {
                  height: 100%;
                  background: rgba(255, 255, 255, 0.8);
                  animation-name: progress;
                  animation-timing-function: linear;
                  animation-fill-mode: forwards;
                }
                
                /* Animaciones para la derecha */
                @keyframes slideInRight {
                  from {
                    transform: translateX(calc(100% + 1rem));
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                @keyframes slideOutRight {
                  from {
                    transform: translateX(0);
                    opacity: 1;
                  }
                  to {
                    transform: translateX(calc(100% + 1rem));
                    opacity: 0;
                  }
                }
                
                /* Animaciones para la izquierda */
                @keyframes slideInLeft {
                  from {
                    transform: translateX(calc(-100% - 1rem));
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                @keyframes slideOutLeft {
                  from {
                    transform: translateX(0);
                    opacity: 1;
                  }
                  to {
                    transform: translateX(calc(-100% - 1rem));
                    opacity: 0;
                  }
                }
                
                @keyframes progress {
                  from {
                    width: 100%;
                  }
                  to {
                    width: 0%;
                  }
                }
              </style>
            `;

    const styleElement = document.createElement('div');
    styleElement.innerHTML = toastStyles;
    document.head.appendChild(styleElement);
  }

  reorderToasts() {
    const toasts = document.querySelectorAll('[data-toast-id]');
    toasts.forEach((toast, index) => {
      const newBottom = 16 + index * 90;
      toast.style.bottom = `${newBottom}px`;
      toast.style.transition = 'bottom 0.3s ease-out';
    });
  }

  show(message, type = 'error', duration = 3000) {
    // Clear existing toasts of the same type to avoid spam
    const existingToasts = document.querySelectorAll(`[data-toast-type="${type}"]`);
    existingToasts.forEach(toast => {
      if (toast.parentElement) {
        toast.remove();
      }
    });

    const toast = document.createElement('div');
    const toastId = Date.now();

    const toastStyle = this.styles[type] || this.styles.error;
    const icon = this.icons[type] || this.icons.error;

    // Calculate position based on existing toasts
    const remainingToasts = document.querySelectorAll('[data-toast-id]');
    const offset = remainingToasts.length * 90;

    // Apply position based on configuration
    const positionClass = this.position === 'left' ? 'left-4' : 'right-4';
    toast.className = `fixed ${positionClass} z-[80] max-w-sm w-full backdrop-blur-lg rounded-xl shadow-2xl toast-enter ${toastStyle}`;
    toast.style.bottom = `${16 + offset}px`;

    toast.innerHTML = `
              <div class="flex items-center p-4 relative">
                ${icon}
                <div class="flex-1 text-sm font-medium">${message}</div>
                <button onclick="this.parentElement.parentElement.remove(); window.reorderToasts();" class="ml-4 text-white/70 hover:text-white transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
              <div class="toast-progress">
                <div class="toast-progress-fill" style="animation-duration: ${duration}ms;"></div>
              </div>
            `;

    toast.setAttribute('data-toast-id', toastId);
    toast.setAttribute('data-toast-type', type);
    document.body.appendChild(toast);

    // Auto-remove
    const timeoutId = setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-exit');
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
            this.reorderToasts();
          }
        }, 300);
      }
    }, duration);

    toast.setAttribute('data-timeout-id', timeoutId);

    return toast;
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 3000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  warning(message, duration = 3000) {
    return this.show(message, 'warning', duration);
  }

  clearAll() {
    const toasts = document.querySelectorAll('[data-toast-id]');
    toasts.forEach(toast => {
      if (toast.parentElement) {
        toast.remove();
      }
    });
  }

  clearType(type) {
    const toasts = document.querySelectorAll(`[data-toast-type="${type}"]`);
    toasts.forEach(toast => {
      if (toast.parentElement) {
        toast.remove();
      }
    });
    this.reorderToasts();
  }

  getCount() {
    return document.querySelectorAll('[data-toast-id]').length;
  }

  getCountByType(type) {
    return document.querySelectorAll(`[data-toast-type="${type}"]`).length;
  }

  setPosition(position) {
    if (position === 'left' || position === 'right') {
      this.position = position;
    }
  }

  getPosition() {
    return this.position;
  }
}
