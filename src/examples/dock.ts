// Example for the slot "Dock": an icon next to the search field with a view of its own.
// Keep one example, delete the other two (and their import in extension.ts).
//
// A dock module is the place for something the user opens on purpose: a list, a form,
// controls. Visor calls buildView() once per enable(), on the first click on the icon,
// and shows the view below a header with a back button and the name of the module.
import Clutter from 'gi://Clutter';
import St from 'gi://St';

import type { ModuleContext, RowProps, VisorModule } from '../visor/index.js';

export function dockExample(gettext: (s: string) => string): VisorModule {
  let ctx: ModuleContext | null = null;
  // Redraws the row of the view, once the view exists.
  let refresh: (() => void) | null = null;
  let count = 0;

  const setCount = (value: number): void => {
    count = value;
    // A number on the dock icon; null removes it.
    ctx?.badge(count > 0 ? count : null);
    refresh?.();
  };

  return {
    id: 'example-dock',
    name: gettext('Example'),
    icon: 'face-smile-symbolic',
    slot: 'dock',

    // Buttons on the right of the header of the view.
    viewActions: [{ label: gettext('Reset'), run: () => setCount(0) }],

    enable(context) {
      ctx = context;
      setCount(0);
    },

    // Visor destroys the view and removes the badge; the module lets go of its references.
    disable() {
      ctx = null;
      refresh = null;
    },

    buildView() {
      const { kit, t } = ctx!;
      const greeting = ctx!.settings?.get_string('greeting') || t('Hello from Visor');

      // update() changes the row in place; every call passes the whole row.
      const props = (): RowProps => ({
        icon: 'emblem-ok-symbolic',
        title: t('Clicks'),
        value: String(count),
        controls: [{ label: t('Add'), icon: 'list-add-symbolic', run: () => setCount(count + 1) }],
      });
      const counter = kit.row(props());
      refresh = () => counter.update(props());

      const section = kit.section({ title: greeting });
      section.body.add_child(counter.actor);

      // Arrange kit elements with plain St containers; never set colours of your own.
      const box = new St.BoxLayout({ orientation: Clutter.Orientation.VERTICAL, x_expand: true });
      box.add_child(section.actor);
      box.add_child(kit.empty(t('This view belongs to the example module.')));
      return box;
    },
  };
}
