# Lendsqr Admin Dashboard

A modern, responsive admin dashboard for managing users, loans, and financial operations. Built with React, TypeScript, and Vite.

## Features

- **User Management**: View, filter, and manage user accounts with detailed profile information
- **Authentication**: Secure login system with session persistence
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar
- **User Filtering**: Advanced filtering by organization, username, email, phone number, and status
- **User Details View**: Comprehensive user profiles with personal info, education, socials, and guarantor details
- **Pagination**: Efficient navigation through large datasets
- **Mock Data**: 500 dynamically generated user records for testing

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **SCSS Modules** - Scoped styling
- **Lucide React** - Icon library
- **Faker.js v10.4.0** - Mock data generation (@faker-js/faker)

## Project Structure

```
src/
├── assets/              # Static assets (logo, images)
├── components/          # Reusable UI components
│   ├── Icons/          # Custom stat icons
│   ├── Loader/         # Loading spinner
│   ├── LoginForm/      # Login form component
│   ├── Modal/          # Modal dialog
│   ├── Navbar/         # Top navigation bar
│   ├── Notifications/  # Notification bell
│   ├── Pagination/     # Pagination controls
│   ├── Search/         # Search input
│   └── Sidebar/        # Navigation sidebar
├── context/            # React context providers
│   └── UserContext.tsx # Global user state
├── hooks/              # Custom React hooks
├── layout/             # Layout components
│   ├── AuthLayout.tsx  # Authentication pages layout
│   └── dashboard/      # Dashboard layout wrapper
├── pages/              # Route pages
│   ├── Docs/           # Documentation page
│   ├── GenericPage/    # Placeholder pages
│   ├── Login/          # Login page
│   ├── NotFound/       # 404 page
│   ├── UserDetails/    # User detail view
│   └── Users/          # Users list with filtering
├── services/           # Data services
│   └── db.ts           # Local storage operations
├── types/              # TypeScript type definitions
│   └── user.ts         # User interface types
└── utils/              # Utility functions
    └── mockData.ts     # Mock data generator
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lendsqr-fe-test-joseph-bawo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Email**: `admin@lendsqr.com`
- **Password**: `password123`

Click "auto-fill demo credentials" on the login page to populate these automatically.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Routes

| Path | Description |
|------|-------------|
| `/login` | Login page |
| `/dashboard` | Users list (default landing) |
| `/dashboard/users/:id` | User details page |
| `/dashboard/docs` | Documentation page |
| `/dashboard/guarantors` | Guarantors (placeholder) |
| `/dashboard/loans` | Loans (placeholder) |
| `/dashboard/*` | Various other admin pages |

## Key Components

### UserContext
Global state management for users, filtering, pagination, and current user profile. Persisted in localStorage.

### Users Page
Displays a filterable, paginated table of users with status badges and action menus. Supports filtering by:
- Organization
- Username
- Email
- Phone number
- Status (Active/Inactive/Pending/Blacklisted)

### UserDetails Page
Detailed user profile with tabbed sections:
- General Details (personal info, education, socials, guarantor)
- Documents
- Bank Details
- Loans
- Savings
- App and System

### Sidebar
Collapsible navigation with three sections:
- **Customers**: Users, Guarantors, Loans, Savings, etc.
- **Businesses**: Organization, Products, Transactions, Reports
- **Settings**: Preferences, Pricing, Audit Logs

## Data Storage

User data is stored in browser localStorage. On first load, 500 mock users are generated using Faker.js and seeded into localStorage. This data persists across sessions.

## Styling

- SCSS modules for component-scoped styling
- Global styles in `index.scss`
- Responsive design with mobile breakpoints
- Status badges with color-coded backgrounds

## Browser Support

Built for modern browsers supporting ES2020+ features.

## License

Private project - All rights reserved.
