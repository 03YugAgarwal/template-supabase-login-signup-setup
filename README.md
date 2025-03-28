# Next.js + Supabase Auth Template

A production-ready Next.js template with Supabase authentication pre-configured. This is my personal starter template for projects requiring authentication.

## Features

- 🔐 **Supabase Authentication** (Email/Password, Magic Links, OAuth)
- ⚡️ **Next.js 14** (App Router)
- 🔄 **Real-time session management**
- 🛡️ **Protected routes** example

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/03YugAgarwal/template-supabase-login-signup-setup.git
   cd template-supabase-login-signup-setup
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. Set up environment variables
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```
4. Run the development server
    ```bash
    npm run dev
    ```