'use client';

import { useState, useRef } from 'react';
import { Check, Copy, Info, FileCode, FileJson, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentShowcaseProps } from '@/lib/types';

type TabType = 'preview' | 'tsx' | 'css' | 'usage';

const UTILS_CODE_SNIPPET = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export const ComponentShowcase = ({
  title,
  description,
  component,
  tsxCode,
  cssCode,
  usage,
  usageCode,
  dependencies,
  requiresUtils = false,
}: ComponentShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async (text: string, sectionKey: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      timeoutRef.current = setTimeout(() => {
        setCopiedSection(null);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error('Error copy:', err);
    }
  };

  return (
    <div className="group w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        <div className="flex self-start rounded-lg border border-white/5 bg-black/50 p-1 sm:self-auto">
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'preview'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Vista Previa
          </button>
          <button
            onClick={() => setActiveTab('tsx')}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'tsx'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            <FileCode className="h-3 w-3" /> React
          </button>
          {cssCode && (
            <button
              onClick={() => setActiveTab('css')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                activeTab === 'css'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <FileJson className="h-3 w-3" /> CSS
            </button>
          )}
          {usageCode && (
            <button
              onClick={() => setActiveTab('usage')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
                activeTab === 'usage'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <Terminal className="h-3 w-3" /> Ejemplo
            </button>
          )}
        </div>
      </div>

      <div className="relative min-h-[300px] bg-black/20">
        {activeTab === 'preview' && (
          <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center gap-6 p-10 duration-300">
            <div className="scale-110 transform rounded-xl border border-white/5 bg-linear-to-br from-black/40 to-black/0 p-8">
              {component}
            </div>
            {usage && (
              <div className="mt-4 flex max-w-md items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-900/10 p-3 text-xs text-blue-300">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{usage}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tsx' && (
          <div className="custom-scrollbar max-h-[500px] w-full space-y-6 overflow-auto bg-[#0d0d0d] p-6 text-left">
            {(dependencies || requiresUtils) && (
              <div className="mb-6 space-y-4 border-b border-white/10 pb-6">
                <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                  <Terminal className="h-4 w-4" /> Requisitos Previos
                </h4>

                {dependencies && (
                  <div className="group/cmd flex items-center justify-between rounded-md border border-white/10 bg-zinc-900 p-3">
                    <code className="font-mono text-sm text-green-400">
                      npm install {dependencies}
                    </code>
                    <button
                      onClick={() =>
                        handleCopy(
                          `npm install ${dependencies}`,
                          'dependencies'
                        )
                      }
                      className="cursor-pointer opacity-50 transition-opacity group-hover/cmd:opacity-100 hover:text-white"
                    >
                      {copiedSection === 'dependencies' ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}

                {requiresUtils && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      Asegúrate de tener{' '}
                      <code className="text-gray-300">src/lib/utils.ts</code>:
                    </p>
                    <div className="group/utils relative rounded-md border border-white/10 bg-zinc-900 p-3">
                      <pre className="overflow-x-auto font-mono text-xs text-gray-300">
                        {UTILS_CODE_SNIPPET}
                      </pre>
                      <button
                        onClick={() => handleCopy(UTILS_CODE_SNIPPET, 'utils')}
                        className="absolute top-2 right-2 cursor-pointer opacity-50 transition-opacity group-hover/utils:opacity-100 hover:text-white"
                      >
                        {copiedSection === 'utils' ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="group/code relative">
              <div className="absolute -top-3 right-0">
                <button
                  onClick={() => handleCopy(tsxCode, 'tsx')}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  {copiedSection === 'tsx' ? (
                    <>
                      <Check className="h-3 w-3 text-green-400" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copiar Componente
                    </>
                  )}
                </button>
              </div>
              <pre className="pt-4 font-mono text-sm leading-relaxed text-gray-300">
                <code>{tsxCode}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'css' && cssCode && (
          <div className="custom-scrollbar relative max-h-[500px] w-full overflow-auto bg-[#0d0d0d] p-6 text-left">
            <button
              onClick={() => handleCopy(cssCode, 'css')}
              className="absolute top-6 right-6 flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
            >
              {copiedSection === 'css' ? (
                <>
                  <Check className="h-3 w-3 text-green-400" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copiar CSS
                </>
              )}
            </button>
            <pre className="font-mono text-sm leading-relaxed text-orange-200/80">
              <code>{cssCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'usage' && usageCode && (
          <div className="custom-scrollbar relative max-h-[500px] w-full overflow-auto bg-[#0d0d0d] p-6 text-left">
            <button
              onClick={() => handleCopy(usageCode, 'usage')}
              className="absolute top-6 right-6 flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
            >
              {copiedSection === 'usage' ? (
                <>
                  <Check className="h-3 w-3 text-green-400" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copiar Ejemplo
                </>
              )}
            </button>
            <pre className="font-mono text-sm leading-relaxed text-emerald-200/80">
              <code>{usageCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
