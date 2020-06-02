## 🆕 PSO2 Notifications

Show Windows alerts for Phantasy Star Online 2 Official NA site's news.

![Screenshot](https://i.ibb.co/LPJtLP7/notification-example.png)

## Usage

Select [Releases](https://github.com/PabloWestphalen/pso2-notifications/releases) and download the latest pso2-notifications.zip

Extract the zip and run pso2-notifications.exe

## Known Issues / WIP

⚠ Notifications are shown as if from an app named [SnoreToast](https://github.com/KDE/snoretoast). This is the library used for displaying notifications on Windows 10 from Node. Work is under way in figuring out a better way to uniquely identify the notifier.

⚠ Launching the app brings up a mildly annoying console window. Work is under way for surpressing it.

## For developers

### Installation

With git and node installed, clone and enter the repo

```
git clone https://github.com/PabloWestphalen/pso2-notifications.git
cd pso2-notifications/
```

Install dependencies

```
npm install
```

### Available scripts

- `npm start` Launch script
- `npm run build` Build executable





