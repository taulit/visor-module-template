import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import { dockExample } from './examples/dock.js';
import { connectVisor, type VisorConnection } from './visor/connect.js';

// This template ships one example module per slot, in src/examples/:
//   dock.ts   an icon in the dock with a view of its own   (used here)
//   now.ts    a row in "Now"
//   ahead.ts  a section in "Up Next"
// A module takes exactly one slot. Keep one example, delete the other two, and import
// the one you keep above. Set the same slot in metadata.json ("visor").

export default class ExampleModule extends Extension {
  private connection: VisorConnection | null = null;

  override enable(): void {
    // Registers the module when Visor is active, now or later, and again when Visor
    // comes back after it was disabled. Does nothing when Visor is not installed.
    this.connection = connectVisor(
      this,
      dockExample(s => this.gettext(s)),
    );
  }

  override disable(): void {
    this.connection?.disconnect();
    this.connection = null;
  }
}
