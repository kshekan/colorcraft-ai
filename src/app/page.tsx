"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import GeneratorForm from "@/components/GeneratorForm";
import ColoringPagePreview from "@/components/ColoringPagePreview";
import PasscodeModal from "@/components/PasscodeModal";
import { useGenerate } from "@/hooks/useGenerate";
import { useGallery } from "@/hooks/useGallery";
import { useRateLimit } from "@/hooks/useRateLimit";
import type { PageMode } from "@/lib/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialDescription = searchParams.get("description") ?? "";
  const initialMode =
    (searchParams.get("mode") as PageMode | null) ?? "coloring";
  const { imageData, generatedPrompt, loading, error, generate, reset } =
    useGenerate();
  const { addPage } = useGallery();
  const { remaining, needsPasscode, recordGeneration, verifyPasscode } =
    useRateLimit();
  const descriptionRef = useRef("");
  const modeRef = useRef<PageMode>("coloring");
  const [showPasscode, setShowPasscode] = useState(false);
  const [pendingDescription, setPendingDescription] = useState<string | null>(
    null
  );
  const [pendingMode, setPendingMode] = useState<PageMode>("coloring");

  const doGenerate = useCallback(
    async (description: string, mode: PageMode) => {
      descriptionRef.current = description;
      modeRef.current = mode;
      recordGeneration();
      const result = await generate(description, mode);
      if (result) {
        await addPage(description, result, mode);
      }
    },
    [generate, addPage, recordGeneration]
  );

  const handleGenerate = useCallback(
    async (description: string, mode: PageMode) => {
      if (needsPasscode) {
        setPendingDescription(description);
        setPendingMode(mode);
        setShowPasscode(true);
        return;
      }
      await doGenerate(description, mode);
    },
    [needsPasscode, doGenerate]
  );

  const handlePasscodeClose = useCallback(() => {
    setShowPasscode(false);
    setPendingDescription(null);
  }, []);

  const handlePasscodeVerify = useCallback(
    (code: string): boolean => {
      const ok = verifyPasscode(code);
      if (ok && pendingDescription) {
        setShowPasscode(false);
        doGenerate(pendingDescription, pendingMode);
        setPendingDescription(null);
      }
      return ok;
    },
    [verifyPasscode, pendingDescription, pendingMode, doGenerate]
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Own Coloring Page
        </h1>
        <p className="text-gray-500">
          Describe what you&apos;d like to color or trace, and AI will generate
          a printable page just for you.
        </p>
      </div>

      {!imageData && !loading && (
        <div className="text-center mb-4">
          <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {remaining > 0
              ? `${remaining} of 3 free generations remaining today`
              : "Free generations used — passcode required"}
          </span>
        </div>
      )}

      {!imageData && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <GeneratorForm
            onGenerate={handleGenerate}
            loading={loading}
            initialDescription={initialDescription}
            initialMode={initialMode}
          />
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-8 h-8 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">
                Generating your page...
              </p>
              <p className="text-xs text-gray-500">
                This usually takes 10-30 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {imageData && (
        <div className="mt-6">
          <ColoringPagePreview
            imageData={imageData}
            generatedPrompt={generatedPrompt}
            description={descriptionRef.current}
            onReset={reset}
          />
        </div>
      )}

      {showPasscode && (
        <PasscodeModal
          onVerify={handlePasscodeVerify}
          onClose={handlePasscodeClose}
        />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
