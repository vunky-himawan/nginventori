## Simple Inventory Management Project

This is simple Inventory Management System built with [Next.js](https://nextjs.org/), [Prisma](https://prisma.io/), [Tailwind CSS](https://tailwindcss.com/), and [Clerk](https://clerk.com/). This project is used to learn about Clerk, RBAC (Role-Based Access Control), and also because I had some free time (gabut).

## Features

- Authentication with Clerk
- Role-Based Access Control (RBAC)
- CRUD operations for users, roles, permissions, and activities
- CRUD operations for departments, office locations, levels, and inventory items
- CRUD operations for inventory categories, inventory item units, and inventory locations
- CRUD operations for maintenances, loans, and reports
- CRUD operations for monthly reports and audits
- CRUD operations for submissions and approvals
- CRUD operations for users and their subordinates

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/vunky-himawan/nginventori.git
```

2. Change the working directory:

```bash
cd nginventori
```

3. Install the dependencies:

```bash
pnpm install
```

4. Create a `.env` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # your clerk publishable key
CLERK_SECRET_KEY= # your clerk secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL= # your clerk sign in url
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL= # your clerk after sign in url

NEXT_PUBLIC_APP_URL= # base url
DB_URL=postgresql://user:password@host:port/database
```

5. Create migrations:

```bash
npx prisma migrate dev

# or

pnpm db:migrate:dev
```

6. Run migrations:

```bash
npx prisma migrate deploy

# or

pnpm db:migrate
```

7. Generate types:

```bash
npx prisma generate

# or

pnpm db:generate
```

8. Run the development server:

```bash
pnpm dev
```

9. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
.
├── src/
│   ├── app/
│   |   ├── _components/
│   |   ├── _hooks/
│   |   ├── (authenticated)/
│   |   |   ├── (module-name)/
│   |   |   |   ├── _components/
│   |   |   |   ├── _hooks/
│   |   |   |   ├── path/
│   |   |   |   |   ├── page.tsx
│   |   ├── (public)/
│   |   |   ├── (module-name)/
│   |   |   |   ├── _components/
│   |   |   |   ├── _hooks/
│   |   |   |   ├── path/
│   |   |   |   |   ├── page.tsx
│   |   ├── api/
│   ├── common/
|   |   ├── enums/
|   |   ├── types/
│   ├── libs/
│   ├── server/
│   |   ├── module-name/
│   |   |   ├── actions/
│   |   |   ├── repositories/
│   |   |   ├── validations/

│   ├── types/
│   ├── utils/
│   ├── middleware.ts
│   └── ...
```

## Key Directories

- **`src/app/`**: Contains the application logic, including components, pages, and API routes.
  - **`src/app/_components/`**: Contains shared components used throughout the application.
  - **`src/app/_hooks/`**: Contains shared hooks used throughout the application.
  - **`src/app/(authenticated)/`**: Contains components and pages that require authentication. See [Modules Structure](#modules-structure) for more details.
  - **`src/app/(public)/`**: Contains components and pages that are publicly accessible. See [Modules Structure](#modules-structure) for more details.
  - **`src/app/api/`**: Contains API routes.
- **`src/common/`**: Contains common utilities, types, and enums.
- **`src/libs/`**: Contains libraries and utilities used throughout the application.
- **`src/server/`**: Contains server-side logic, including React Server Actions.
  - **`src/server/(module-name)/`**: Contains server-side logic for a specific module.
    - **`src/server/(module-name)/actions/`**: Contains server-action functions that ready to be called from the client.
    - **`src/server/(module-name)/repositories/`**: Contains repositories for getting data from the database.
    - **`src/server/(module-name)/validations/`**: Contains validation rules.
- **`src/types/`**: Contains type definitions used throughout the application.
- **`src/utils/`**: Contains utility functions used throughout the application.
- **`src/middleware.ts`**: Contains middleware functions used throughout the application.

## Modules Structure

- Module name should be inside brackets, e.g. `(module-name)`.
- Each module will have its own directories:
  - **`_components/`**: Contains components used within the module.
  - **`_hooks/`**: Contains hooks used within the module.
  - **`path/`**: Contains the page components for the module. Follow the [NextJS routing rules](https://nextjs.org/docs/app/building-your-application/routing).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
