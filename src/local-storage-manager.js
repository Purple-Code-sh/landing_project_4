class LocalStorageManager {
  constructor() {
    this.storage = localStorage;
    this.isAvailable = this.checkAvailability();
  }

  checkAvailability() {
    try {
      const test = '__localStorage_test__';
      this.storage.setItem(test, test);
      this.storage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage no está disponible:', e);
      return false;
    }
  }

  getItem(key) {
    if (!this.isAvailable) {
      console.warn('localStorage no está disponible');
      return null;
    }

    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error al obtener el item '${key}' del localStorage:`, error);
      return null;
    }
  }

  setItem(key, value) {
    if (!this.isAvailable) {
      console.warn('localStorage no está disponible');
      return false;
    }

    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error al guardar el item '${key}' en localStorage:`, error);
      return false;
    }
  }

  removeItem(key) {
    if (!this.isAvailable) {
      console.warn('localStorage no está disponible');
      return false;
    }

    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el item '${key}' del localStorage:`, error);
      return false;
    }
  }

  clear() {
    if (!this.isAvailable) {
      console.warn('localStorage no está disponible');
      return false;
    }

    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
      return false;
    }
  }

  hasItem(key) {
    if (!this.isAvailable) return false;

    try {
      return this.storage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error al verificar el item '${key}':`, error);
      return false;
    }
  }

  getAllKeys() {
    if (!this.isAvailable) return [];

    try {
      const keys = [];
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    } catch (error) {
      console.error('Error al obtener todas las claves:', error);
      return [];
    }
  }

  getStorageSize() {
    if (!this.isAvailable) return 0;

    try {
      let total = 0;
      for (let key in this.storage) {
        if (this.storage.hasOwnProperty(key)) {
          total += this.storage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error al calcular el tamaño del storage:', error);
      return 0;
    }
  }

  updateItem(key, updateFn) {
    if (!this.isAvailable) return false;

    try {
      const currentValue = this.getItem(key);
      const newValue = updateFn(currentValue);
      return this.setItem(key, newValue);
    } catch (error) {
      console.error(`Error al actualizar el item '${key}':`, error);
      return false;
    }
  }

  deleteItem(key) {
    if (!this.isAvailable) return false;

    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el item '${key}':`, error);
      return false;
    }
  }
}
