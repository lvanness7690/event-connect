# Event Connect

![Status](https://img.shields.io/badge/Status-Local%20database%20app-000000?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MVC-000000?style=for-the-badge)
![Focus](https://img.shields.io/badge/Focus-Ticketmaster%20API-000000?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Events-000000?style=for-the-badge)

Event discovery and community app with accounts, event search, and message boards.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Links](#links)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)
- [License](#license)

## Overview

A full-stack MVC application that combines Ticketmaster event search with user accounts and event-specific message-board functionality.

## Features

- 🎟️ Ticketmaster event search
- 🏙️ City and date filtering
- 👤 User registration and login
- 💬 Event-specific message boards
- 📱 Responsive Handlebars/Tailwind interface
- 🗃️ MySQL and Sequelize data model

## Tech Stack

- JavaScript
- Node.js
- Express
- Handlebars
- MySQL
- Sequelize
- Tailwind CSS
- Ticketmaster API

## Links

- Repository: [https://github.com/lvanness7690/event-connect](https://github.com/lvanness7690/event-connect)
- Live application: Not currently deployed. This repository is intended to run locally or serve as a code sample.

## Getting Started

1. `npm install`
2. `Create a MySQL database using db/schema.sql`
3. `Create a .env file with DB credentials, SESSION_SECRET, and TICKETMASTER_API_KEY`
4. `npm run build:css`
5. `node server.js`

Common scripts:

- `npm run build:css`
- `npm run test`

## Usage

Run locally, create an account, search for events, and participate in event message boards.

## Project Structure

- `LICENSE.txt`
- `README.md`
- `config`
- `controllers`
- `db`
- `models`
- `package-lock.json`
- `package.json`
- `postcss.config.js`
- `public`
- `server.js`
- `tailwind.config.js`

## Credits

Developed and maintained by Leighton Van Ness. Additional project collaboration by Kevin Pierce, Stephanie Nunez, and Giovanni Strangio.

## License

This project is licensed under the MIT license. See the license file in the repository for details.
