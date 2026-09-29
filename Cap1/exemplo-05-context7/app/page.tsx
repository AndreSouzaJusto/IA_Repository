"use client";

import { authClient } from "@/lib/auth-client";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-1.025-.013-1.86-2.782.604-3.369-1.18-3.369-1.18-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.092.39-1.985 1.029-2.685-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.756a9.59 9.59 0 012.504.337c1.91-1.295 2.749-1.026 2.749-1.026.545 1.377.202 2.394.099 2.647.64.7 1.028 1.593 1.028 2.685 0 3.842-2.339 4.687-4.566 4.935.359.31.679.919.679 1.852 0 1.338-.012 2.416-.012 2.745 0 .268.18.579.688.481A10.004 10.004 0 0022 12c0-5.523-4.477-10-10-10Z" />
    </svg>
  );
}

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  async function signIn() {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_48%,_#fefce8)] px-6 py-12">
      <section className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40 sm:p-10">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Better Auth Demo</p>
        <h1 className="text-4xl font-semibold text-slate-950">Hello World</h1>
        <div className="mt-8 border-l-4 border-blue-600 bg-slate-50 px-5 py-4 text-slate-700">
          {isPending ? "Verificando sessao..." : session?.user ? <>Logado como <strong>{session.user.email ?? session.user.name}</strong></> : "Você não está logado"}
        </div>
        {session?.user ? (
          <button type="button" onClick={() => authClient.signOut()} className="mt-8 w-full border border-slate-300 px-4 py-3 font-medium text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">Sair</button>
        ) : (
          <button type="button" onClick={signIn} className="mt-8 flex w-full items-center justify-center gap-3 bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-700"><GitHubIcon />Entrar com GitHub</button>
        )}
      </section>
    </main>
  );
}
