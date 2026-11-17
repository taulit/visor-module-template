# Visor: Example

**Visor: Example – an example module in the Visor notch for GNOME**

> Requires [Visor](https://github.com/taulit/visor). Replace this text with one sentence on what your module shows.

![Screenshot of the module in Visor](docs/screenshot.png)

<!-- Add docs/screenshot.png: 1600×1000, the module inside Visor, honest and unedited. -->

This repository is a template for modules of [Visor](https://github.com/taulit/visor), the notch for GNOME Shell 50/51.
A module is a GNOME extension of its own that takes **one place** in Visor: rows in "Now", a section in "Up Next", or an icon with a view of its own in the dock.
Click **Use this template** on GitHub to start your own module.

## Start

1. Pick the slot and keep one example: `src/examples/now.ts`, `ahead.ts` or `dock.ts`. Delete the other two and import the one you keep in `src/extension.ts`.
2. Rename the module: UUID, name, description (start it with "Requires Visor."), `visor.slot` in `metadata.json`, the settings schema and the gettext domain (`visor-example`) in `metadata.json`, `schemas/` and `scripts/`.
3. Change the example setting and its text in `src/prefs.ts`, or remove it.
4. Replace the text of this README and add a screenshot.

The module API is described in [docs/api-v1.md](https://github.com/taulit/visor/blob/main/docs/api-v1.md). The rules for modules are in the [SDK readme](https://github.com/taulit/visor/blob/main/sdk/README.md).

## Install

From the [GNOME extension store](https://extensions.gnome.org/) (once released), or from a release ZIP:

```sh
gnome-extensions install --force visor-example@taulit.github.io.shell-extension.zip
```

Log out and in again on Wayland, then enable the extension. Install and enable Visor as well.

## Build

Requires Node 22 or newer, pnpm, `glib-compile-schemas` (libglib2.0-bin), gettext and zip.

```sh
pnpm install
pnpm build      # build/ is an installable extension directory
pnpm pack:zip   # dist/<uuid>.shell-extension.zip, the file for extensions.gnome.org
```

| Script           | Purpose                                                         |
| ---------------- | --------------------------------------------------------------- |
| `pnpm build`     | Compile TypeScript and assemble `build/`                        |
| `pnpm pack:zip`  | Build and create the store ZIP                                  |
| `pnpm lint`      | ESLint and `prettier --check`                                   |
| `pnpm typecheck` | Type-check with `tsc --noEmit`                                  |
| `pnpm pot`       | Regenerate `po/<domain>.pot` and merge it into `po/*.po`        |
| `pnpm sync:sdk`  | Update `src/visor/` from the npm package `@taulit/visor-module` |

`src/visor/` holds copies of `connect.js` and the types of `@taulit/visor-module`: a GNOME extension has no `node_modules` at run time and no bundler.

## Release

Push a tag such as `v1.0.0`: the workflow `.github/workflows/release.yml` builds the ZIP and attaches it to a GitHub release. Upload that ZIP to [extensions.gnome.org](https://extensions.gnome.org/upload/) by hand.

## Submit to the catalog

Visor's catalog lists only modules that the maintainer has looked at. Before you submit, check:

- [ ] The module takes exactly **one slot** and its benefit is clear.
- [ ] It **looks like Visor**: kit elements only, no colours of your own.
- [ ] It is **released in the GNOME extension store**.
- [ ] It has an **open-source license**.
- [ ] The **screenshots are honest**: 1–4 images, 1600×1000, showing the module inside Visor.
- [ ] It **collects no data** without telling the user.

## License

MIT
