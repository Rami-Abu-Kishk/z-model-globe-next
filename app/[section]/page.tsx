"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useZModelStore, ModuleId } from "@/lib/store";
import Home from "@/app/page";

export default function DeepLinkedPage() {
  const params = useParams();
  const setActiveModule = useZModelStore((state) => state.setActiveModule);
  const setViewState = useZModelStore((state) => state.setViewState);
  const setFocusedCardId = useZModelStore((state) => state.setFocusedCardId);

  useEffect(() => {
    const section = params.section as string;
    const validModules: ModuleId[] = [
      "economy",
      "investment",
      "political",
      "media",
      "research",
      "companies",
      "masterObserver",
      "abudhabi",
      "calendar",
    ];

    if (validModules.includes(section as ModuleId)) {
      // Small delay to ensure the main component is hydrated
      const timer = setTimeout(() => {
        setActiveModule(section as ModuleId);
        setViewState("CARD_FOCUS");
        setFocusedCardId(section as ModuleId);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [params.section, setActiveModule, setViewState, setFocusedCardId]);

  return <Home />;
}
