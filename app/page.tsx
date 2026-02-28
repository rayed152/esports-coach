import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
            VALORANT <span className="text-red-500 italic">AI AGENT</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            Next-generation analytics and AI coaching for competitive play.
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <p className="text-slate-300 text-sm">
            Sign in to access your dashboard and match history.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors ring-2 ring-transparent ring-offset-2 ring-offset-slate-900 shadow-lg text-center"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 shadow-lg text-center"
            >
              Register
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </main>
  );
}