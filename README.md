# Virtual Mark - Digital Marketing Agency Website

![Virtual Mark](./public/favicon.svg)

A modern, responsive website for a digital marketing agency built with React, TypeScript, and Tailwind CSS. Features smooth animations, dynamic content management through Supabase, and a clean, professional design.

## 🚀 Features

- Modern UI/UX with Framer Motion animations
- Responsive design for all devices
- Dynamic content management with Supabase
- Blog system with CMS
- Case studies showcase
- Contact form with validation
- Service pages with detailed information
- Admin dashboard for content management

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router v6
- Supabase
- Vite
- Hero Icons
- React Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/virtual-mark.git
cd virtual-mark
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🗂️ Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── contexts/        # Context providers
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── supabase/            # Supabase configurations and migrations
└── package.json         # Project dependencies and scripts
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### GitHub Setup

1. Create a new repository on GitHub

2. Initialize Git and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/virtual-mark.git
git push -u origin main
```

### Netlify Deployment

1. Sign up/Login to [Netlify](https://www.netlify.com/)

2. Connect your GitHub repository:
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Select the `main` branch

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Add environment variables:
   - Go to Site settings > Build & deploy > Environment
   - Add your Supabase environment variables:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. Deploy:
   - Netlify will automatically build and deploy your site
   - Any future pushes to the main branch will trigger automatic deployments

### Custom Domain Setup (Optional)

1. In Netlify:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Follow the instructions to configure your domain

2. Configure SSL:
   - Netlify automatically provisions SSL certificates
   - Enable "Force HTTPS" in your site settings

## 🔧 Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m "Add some feature"`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Rafael Paragon - Initial work

## 🙏 Acknowledgments 

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.io/)
- [Vite](https://vitejs.dev/)