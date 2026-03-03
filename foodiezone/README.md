# Foodiezone - Restaurant Management App

A Next.js-based restaurant management application with customer ordering, kitchen management, and delivery tracking capabilities.

## Deployment to Railway

### Prerequisites
- Railway account
- Git repository

### Steps to Deploy

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Railway in your project**
   ```bash
   railway init
   ```

4. **Deploy to Railway**
   ```bash
   railway up
   ```

### Environment Variables

The app uses the following environment variables (configured in Railway dashboard):

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (optional)
- `NEXT_PUBLIC_VAPID_KEY` - VAPID key for push notifications (optional)
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Project Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/context/` - React contexts for state management
- `src/hooks/` - Custom React hooks
- `public/` - Static assets

### Technologies Used
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Next-PWA
- Leaflet (for maps)