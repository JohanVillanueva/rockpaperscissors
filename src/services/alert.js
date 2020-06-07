import * as Toastr from 'toastr'
class AlertService {
  constructor() {}
  showError() {
    Toastr.error('mensaje')
  }
  showSuccess(message) {}
  showWarning(message) {}
  showInfo(message) {}
}
export const alertService = new AlertService()
