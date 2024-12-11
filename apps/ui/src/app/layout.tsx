import { getUserQuery } from "@/services/user/query";
import { TanStackProvider } from "@/state/context/tanstack";
import { ThemeProvider } from "@/state/context/theme";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SidebarProvider, Toaster } from "design-library";
import type { Metadata } from "next";
import { FC, ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Todo App",
  description: "App to manage family todo list",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = async (props) => {
  const queryClient = new QueryClient();

  await getUserQuery("1").useOnServer(queryClient);

  return (
    <html lang="en" suppressHydrationWarning>
      <TanStackProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <body className="antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>{props.children}</SidebarProvider>
              <Toaster />
            </ThemeProvider>
          </body>
        </HydrationBoundary>
      </TanStackProvider>
    </html>
  );
};

export default RootLayout;
