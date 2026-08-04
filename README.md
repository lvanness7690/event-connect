# Event Connect

![Status](https://img.shields.io/badge/Status-Live-16a34a?style=for-the-badge)
![Hosting](https://img.shields.io/badge/Hosting-Vercel-000000?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MVC-000000?style=for-the-badge)
![Focus](https://img.shields.io/badge/Focus-Event%20Discovery-000000?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Events-000000?style=for-the-badge)

Event discovery and community app with accounts, event search, and message boards.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Links](#links)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)
- [License](#license)

## Overview

A full-stack MVC application that combines live event search with user accounts and event-specific message-board functionality.

## Features

- 🎟️ Live event search through StungEvents, with optional Ticketmaster support
- 🏙️ City and date filtering
- 👤 User registration and login
- 💬 Event-specific message boards
- 📱 Responsive Handlebars/Tailwind interface
- 🗃️ MongoDB persistence for users, saved events, messages, and sessions

## Tech Stack

- JavaScript
- Node.js
- Express
- Handlebars
- MongoDB
- Mongoose
- Tailwind CSS
- StungEvents API
- Ticketmaster Discovery API (optional)

## Links

- Repository: [https://github.com/lvanness7690/event-connect](https://github.com/lvanness7690/event-connect)
- Live application: [https://event-connect-pi.vercel.app](https://event-connect-pi.vercel.app)

## Deployment

The Express/Handlebars application is configured for Vercel's Node.js runtime and uses MongoDB Atlas for application data and persistent sessions.

Required production environment variables:

- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret used to sign application sessions
- `TICKETMASTER_API_KEY` (optional): when present, search uses Ticketmaster; otherwise the no-key StungEvents API is used

## Getting Started

1. `npm install`
2. `Create a MongoDB database`
3. `Create a .env file with MONGODB_URI and SESSION_SECRET`
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
