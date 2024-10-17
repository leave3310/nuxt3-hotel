import Swal from "sweetalert2";

export const swalWithCheckButtons = Swal.mixin({
  customClass: {
    confirmButton: "baseButton isStylePrimary",
    cancelButton: "baseButton isStyleSecondary",
    actions: "check-actions",
  },
  confirmButtonText: "確定",
  cancelButtonText: "取消",
  buttonsStyling: false,
});

export const swalWithButtons = Swal.mixin({
  customClass: {
    confirmButton: "baseButton isStylePrimary",
    cancelButton: "baseButton isStyleSecondary",
  },
  confirmButtonText: "確定",
  cancelButtonText: "取消",
  buttonsStyling: false,
});

export function errorSweetAlert(text: string, callback?: () => void) {
  swalWithButtons
    .fire({
      icon: "error",
      title: "錯誤訊息",
      text,
      customClass: {
        confirmButton: "rounded-lg border border-primary bg-white px-8 py-4",
      },
    })
    .then(() => {
      if (callback) {
        callback();
      }
    });
}

export function successSweetAlert(title: string, text: string, callback?: () => void) {
  swalWithButtons
    .fire({
      icon: "success",
      title,
      text,
      customClass: {
        confirmButton: "bg-primary text-white hover:bg-primary-120 flex max-w-full items-center justify-center rounded-lg px-8 py-4 text-base font-bold tracking-[0.02rem] transition-colors",
      },
    })
    .then(() => {
      if (callback) {
        callback();
      }
    });
}
