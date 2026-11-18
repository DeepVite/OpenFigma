import type { AppMenuGroupSchema } from './types'

/** The Help menu: the tour, diagnostics, and support. */
export const HELP_MENU: AppMenuGroupSchema = {
  // Last, where every platform expects it; macOS adds its menu search here (`desktop/src/menu`).
  label: 'Help',
  items: [
    { id: 'open-tour', label: 'Open the Tour', handler: 'shell' },
    { type: 'separator' },
    {
      id: 'diagnostics',
      label: 'Diagnostics…',
      handler: 'shell',
      palette: { keywords: ['log', 'report', 'bug', 'problem', 'troubleshoot'] }
    },
    { type: 'separator' },
    {
      id: 'support-openpencil',
      feature: 'donation',
      label: 'Support OpenFigma…',
      handler: 'shell',
      palette: { keywords: ['donate', 'donation', 'sponsor', 'fund', 'tip'] }
    }
  ]
}
