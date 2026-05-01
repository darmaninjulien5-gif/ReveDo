import React from "react";
import "@/App.css";
import { Toaster } from "sonner";
import Home from "@/pages/Home";

export default function App() {
  return (
    <div className="App font-body">
      <Home />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
