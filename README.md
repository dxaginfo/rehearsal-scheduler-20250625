# Rehearsal Scheduler

A comprehensive web application for bands and musical groups to efficiently organize rehearsals, track attendance, send automated reminders, and optimize practice time based on member availability.

## Features

- **User Authentication & Profiles** - Create accounts, join multiple bands, manage availability preferences
- **Band Management** - Create band profiles, invite members, assign roles and permissions
- **Rehearsal Scheduling** - Create events, view member availability, get optimal time suggestions
- **Availability Tracking** - Mark weekly availability, set exceptions, RSVP to rehearsals
- **Automated Notifications** - Receive reminders, send updates, get notified of changes
- **Attendance Tracking** - Mark attendance, view statistics, see personal records
- **Setlist Management** - Create rehearsal setlists, view songs in advance, make notes
- **Resource Sharing** - Upload and share sheet music, audio files, and notes

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI component library
- FullCalendar.js for calendar views
- Formik with Yup for form validation

### Backend
- Node.js with Express
- JWT authentication
- Swagger/OpenAPI documentation

### Database
- PostgreSQL
- Prisma ORM

### DevOps
- Vercel (Frontend)
- Heroku/Railway (Backend)
- GitHub Actions (CI/CD)
- Docker

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/rehearsal-scheduler-20250625.git
cd rehearsal-scheduler-20250625
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
```bash
# Create .env file in backend directory
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

5. Run database migrations
```bash
npm run migrate
```

6. Start the development servers
```bash
# In frontend directory
npm start

# In backend directory
npm run dev
```

7. Access the application at http://localhost:3000

## Project Structure

```
rehearsal-scheduler/
├── frontend/                # React frontend application
│   ├── public/              # Static files
│   └── src/                 # Source files
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components
│       ├── store/           # Redux store setup
│       ├── hooks/           # Custom React hooks
│       ├── services/        # API services
│       └── utils/           # Utility functions
│
├── backend/                 # Express backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   └── prisma/              # Prisma schema and migrations
│
├── .github/                 # GitHub Actions workflows
└── docs/                    # Documentation
```

## API Documentation

API documentation is available at `/api/docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* Inspired by the needs of musicians and bands worldwide
* Special thanks to all contributors