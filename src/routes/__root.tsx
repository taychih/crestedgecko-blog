import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Outlet, // 必须导入 Outlet 来渲染子页面
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/common/theme-provider";
import Toaster from "@/components/ui/toaster";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import appCss from "@/styles.css?url";
import { blogConfig } from "@/blog.config";
import { clientEnv } from "@/lib/env/client.env";
import { useState } from "react";
import Header from "@/components/layout/Header"; // 确保这个路径正确

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const env = clientEnv();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: blogConfig.title },
        { name: "description", content: blogConfig.description },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  // 1. 在根路由维护登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  const handleLogin = (userData: { name: string; avatar: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body class="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          {/* 2. 注入全局 Header */}
          <Header 
            isLoggedIn={isLoggedIn} 
            user={user} 
            onLogin={handleLogin} 
            onLogout={handleLogout} 
          />

          {/* 3. Outlet 渲染具体的路由页面 (Home, Articles, etc.) */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 4. 全局 Footer */}
          <footer className="bg-moss-dark text-white py-12 text-center border-t border-green-900/10">
            <p className="font-serif text-xl mb-2">睫角守宫咖啡馆 © 2026</p>
            <p className="text-[10px] opacity-50 font-mono tracking-widest uppercase">
              Professional Crested Gecko Care & Community Cafe
            </p>
          </footer>
        </ThemeProvider>

        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}