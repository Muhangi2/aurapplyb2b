import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aurapply — Stop applying. Start being matched." },
      {
        name: "description",
        content:
          "Build your professional profile once. AI matches you to relevant European jobs and recruiters reach out directly. EU-compliant and candidate-first.",
      },
      { property: "og:title", content: "Aurapply — Stop applying. Start being matched." },
      {
        property: "og:description",
        content:
          "Build your profile once and let recruiters come to you. EU-compliant AI matching, transparent and candidate-first.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Aurapply — Stop applying. Start being matched." },
      { name: "description", content: "Aurapply Connect is an EU-compliant platform for job seekers to be matched with employers." },
      { property: "og:description", content: "Aurapply Connect is an EU-compliant platform for job seekers to be matched with employers." },
      { name: "twitter:description", content: "Aurapply Connect is an EU-compliant platform for job seekers to be matched with employers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b8ec3a0-240d-44fa-abe5-8577af14c5a3/id-preview-1a97ad06--92bc7cb2-7ddc-4bfc-a30c-f43f1905d26f.lovable.app-1778545583667.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b8ec3a0-240d-44fa-abe5-8577af14c5a3/id-preview-1a97ad06--92bc7cb2-7ddc-4bfc-a30c-f43f1905d26f.lovable.app-1778545583667.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-muted-foreground">This page does not exist.</p>
        <a href="/" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          Back to home
        </a>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
