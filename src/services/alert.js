import { notifier } from '@beyonk/svelte-notifications'

class AlertService {
  showError(message) {
    notifier.danger(message)
  }
  showSuccess(message) {
    notifier.success(message)
  }
  showWarning(message) {
    notifier.warning(message)
  }
  showInfo(message) {
    notifier.info(message)
  }
}

export const alertService = new AlertService()
