# Overview

This is a modern full-stack web application for "Tubs of Fun", a home and backyard leisure dealership. The application features a content management system (CMS) with visual editing capabilities, allowing administrators to manage page content through a dynamic layout block system. The frontend is built with React and TypeScript, while the backend uses Express.js with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 1, 2025)

**Migration Completed**: Successfully migrated the project from Replit Agent to standard Replit environment.
- **Dependency Resolution**: Fixed Node.js version conflicts by updating @types/node to v22.12.0 and Vite to v6.0.0
- **Package Installation**: Resolved dependency conflicts and installed all required packages successfully  
- **File Upload System**: Verified image upload and static file serving is working correctly
- **Application Status**: Full-stack application now running properly on port 5000 with all features functional

**Header Layout Redesign**: Updated navigation component to match target design specifications.
- **Top Bar Layout**: Restructured top header with contact info and menu links aligned to the left
- **White Divider**: Added 1px vertical divider line between contact elements
- **Mascot Positioning**: Positioned single large Tubby mascot (24x24) spanning between top header and main navigation
- **Menu Organization**: Moved top bar navigation links to left side after contact information
- **Visual Hierarchy**: Improved layout to match provided design mockups exactly

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Development Server**: Custom Vite integration for hot reloading

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage fallback for development

## Key Components

### Database Schema
The application uses a flexible content management structure:
- **Users**: Admin authentication and role management
- **Pages**: Website pages with slug-based routing
- **Layout Blocks**: Modular content blocks (hero, about, services, testimonials, gallery, etc.)
- **Testimonials**: Customer reviews and ratings
- **Gallery Images**: Image management for galleries

### Content Management System
- **Visual Editor**: Drag-and-drop interface for reordering content blocks
- **Block Types**: Hero sections, about sections, services grids, testimonials, galleries, and scheduling forms
- **Real-time Updates**: Live preview of content changes
- **Authentication**: Supabase-based authentication for admin access

### UI Components
- **Layout Components**: Navigation, footer, and responsive layouts
- **Section Components**: Reusable content blocks for different page sections
- **Admin Components**: Visual editor, block editor, and authentication guards
- **Utility Components**: Toasts, modals, forms, and interactive elements

## Data Flow

1. **Content Management**: Administrators log in through Supabase authentication
2. **Visual Editing**: Admins use the visual editor to modify page content blocks
3. **API Communication**: Frontend communicates with Express backend via REST APIs
4. **Database Operations**: Drizzle ORM handles PostgreSQL operations
5. **Real-time Updates**: TanStack Query manages cache invalidation and updates
6. **Public Display**: Visitors view dynamically rendered content based on database state

## External Dependencies

### Authentication
- **Supabase**: User authentication and session management
- **Integration**: Custom auth hooks and guards for admin access

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Environment variable-based configuration

### Development Tools
- **Replit Integration**: Custom vite plugins for Replit environment
- **Runtime Error Handling**: Development error overlay for debugging

## Deployment Strategy

### Development
- **Build Process**: Vite handles frontend bundling, esbuild handles server bundling
- **Hot Reloading**: Vite middleware integrated with Express server
- **Environment**: NODE_ENV-based configuration switching

### Production
- **Build Output**: Static assets in `dist/public`, server bundle in `dist/`
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection
- **Static Serving**: Express serves built frontend assets in production

### Architecture Decisions

**Content Management Approach**: The application uses a flexible layout block system instead of fixed page templates. This allows administrators to build pages by combining different content blocks (hero, about, services, etc.) in any order, providing maximum flexibility for content creation.

**Authentication Strategy**: Supabase was chosen for authentication to provide a robust, managed solution with minimal backend complexity. The system uses session-based authentication with custom hooks for React integration.

**Database Design**: The schema prioritizes flexibility with JSON content fields for layout blocks, allowing different block types to store varying content structures while maintaining type safety through Zod validation.

**State Management**: TanStack Query handles all server state, eliminating the need for complex client state management while providing excellent caching and synchronization capabilities.

**Styling Architecture**: Tailwind CSS with shadcn/ui provides a consistent design system while allowing for easy customization through CSS variables and component composition.