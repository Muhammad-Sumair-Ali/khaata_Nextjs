import Swal from 'sweetalert2';


// Success alert
export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
};

// Error alert
export const showError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: message,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
};

// Confirmation alert
export const showConfirmation = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  });
};
