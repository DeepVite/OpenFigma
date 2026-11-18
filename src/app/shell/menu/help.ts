import { openTourFromMenu } from '@/app/demo/document'
import { donate } from '@/app/donation'
import { openSettingsDialog } from '@/app/settings/dialog'

/** The Help menu's actions, the same in the web app's menu and the desktop app's. */
export function createHelpMenuActions(): Record<string, () => void> {
  return {
    'open-tour': openTourFromMenu,
    diagnostics: () => openSettingsDialog('diagnostics'),
    'support-openpencil': () => donate('menu')
  }
}
