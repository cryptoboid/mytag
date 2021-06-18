
<p align="center">
    <img alt="mytag" height="128" src="./assets/icon.png">
    <h1 align="center">myTag</h1>
</p>

<p align="center">
  <a aria-label="Build" href="https://github.com/cryptoboid/mytag/actions" target="_blank">
    <img alt="Build" src="https://img.shields.io/github/workflow/status/cryptoboid/mytag/CI?style=flat-square" />
  </a>
   <a aria-label="Release version" href="https://github.com/cryptoboid/mytag/releases" target="_blank">
    <img alt="Release version" src="https://img.shields.io/github/v/release/cryptoboid/mytag?style=flat-square" />
  </a>
  <a aria-label="License" href="https://github.com/cryptoboid/mytag/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/cryptoboid/mytag?style=flat-square" target="_blank" />
  </a>
</p>

<p align="center">
Find your images quickly! myTag aims to be a simple auto-tagging image gallery.
</p>
<p align="center">
Powered by a Tensorflow model with on-device classification. Built with Expo+React Native.
</p>

## Current status

Right now, the first prototype achieves:

- On start, asks user for media library permissions. On the background, the app initializes the pre-trained model (COCO-SSD).
- When given, the app grabs all available images on the device and classifies one by one, caching results in local storage.
- After each new result, the app shows the currently selected category and images associated with it (photos with a `person` in it, for example).
- From the dropdown, the user can choose different categories and view the corresponding images.
- If the app is open later, the "analysis" will be much much faster, as results were cached locally.

We are currently working towards [v1.1.0](https://github.com/cryptoboid/mytag/projects/3), with a new UI, dark theme and new features!

**APK available:** find these features and more in [Releases](https://github.com/cryptoboid/mytag/releases)

## Contribute

You can either use the Docker container, or install Expo.

### Docker

1. Install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).
2. Clone and start the container:
```bash
git clone git@github.com:cryptoboid/mytag.git
cd mytag
docker-compose run expo
```

3. Duplicate `.env.template` and rename to `.env`. If you will build/publish on Expo, complete your username and password, otherwise they are not necessary.
4. Once inside, start the expo server (with hot reloading): `expo start`
5. Download the [Expo Go](https://expo.io/client) app in your phone and test it!

### Locally

1. Install Expo CLI: `https://expo.io/tools#cli`
2. Clone repo:

```bash
git clone git@github.com:cryptoboid/mytag.git
cd mytag
```

3. Install npm packages: `npm install`
4. Duplicate `.env.template` and rename to `.env`. If you will build/publish on Expo, complete your username and password, otherwise they are not necessary.
5. Start the expo server (with hot reloading): `expo start`
6. Download the [Expo Go](https://expo.io/client) app in your phone and test it!

## Next steps

You can see our to-do list in [this project](https://github.com/cryptoboid/mytag/projects/3). Feel free to work on any of these issues!

## License

MIT
