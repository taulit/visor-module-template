// Example for the slot "Now": a row in the left column while something is going on.
// Keep one example, delete the other two (and their import in extension.ts).
//
// A "Now" module shows rows only while something is running, such as a download or a
// timer. This one shows a row for a greeting until you dismiss it. Rows are matched by
// id, so calling now.set() again changes the row in place.
import type { ModuleContext, VisorModule } from '../visor/index.js';

export function nowExample(gettext: (s: string) => string): VisorModule {
  let ctx: ModuleContext | null = null;
  // Token for the signal connections of this module, so disable() can remove them all.
  const token = {};

  const show = (): void => {
    if (!ctx) return;
    const current = ctx;
    const greeting = current.settings?.get_string('greeting') || current.t('Hello from Visor');
    current.now.set([
      {
        id: 'greeting',
        icon: 'face-smile-symbolic',
        title: greeting,
        subtitle: current.t('Example module'),
        activate: () => current.close(),
        primary: { label: current.t('Dismiss'), run: () => current.now.clear() },
      },
    ]);
  };

  return {
    id: 'example-now',
    name: gettext('Example'),
    icon: 'face-smile-symbolic',
    slot: 'now',

    enable(context) {
      ctx = context;
      show();
      // React to changes instead of polling.
      ctx.settings?.connectObject('changed::greeting', show, token);
    },

    // Visor removes the rows. The module removes what it made itself.
    disable() {
      ctx?.settings?.disconnectObject(token);
      ctx = null;
    },
  };
}
