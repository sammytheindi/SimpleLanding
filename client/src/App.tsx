import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor, NoiseOverlay } from "@/components/ui/global-effects";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CV from "@/pages/cv";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Ventures from "@/pages/ventures";
import Contact from "@/pages/contact";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  // Simple effect to scroll to top when location changes
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cv" component={CV} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/ventures" component={Ventures} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <NoiseOverlay />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
