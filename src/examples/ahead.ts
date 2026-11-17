// Example for the slot "Up Next": a section in the right column.
// Keep one example, delete the other two (and their import in extension.ts).
//
// An "Up Next" module shows what is coming. Visor calls buildSection() once per
// enable(), when the panel is first shown, and destroys the returned widget when the
// module is disabled.
import type { ModuleContext, VisorModule } from '../visor/index.js';

export function aheadExample(gettext: (s: string) => string): VisorModule {
  let ctx: ModuleContext | null = null;

  return {
    id: 'example-ahead',
    name: gettext('Example'),
    icon: 'face-smile-symbolic',
    slot: 'ahead',

    enable(context) {
      ctx = context;
    },

    disable() {
      ctx = null;
    },

    buildSection() {
      const { kit, t } = ctx!;
      const greeting = ctx!.settings?.get_string('greeting') || t('Hello from Visor');
      const clock = () => new Date().toLocaleTimeString([], { timeStyle: 'short' });

      const row = kit.row({
        icon: 'face-smile-symbolic',
        title: greeting,
        subtitle: t('Example module'),
        meta: clock(),
      });
      // Links appear on the right of the title while the pointer is over the section.
      const section = kit.section({
        title: t('Example'),
        links: [{ label: t('Refresh'), run: () => row.update({ title: greeting, meta: clock() }) }],
      });
      section.body.add_child(row.actor);
      return section.actor;
    },
  };
}
