/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, FileCode, Folder, Terminal, Info, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { CodeSnippet } from '../types';

interface CodeDisplayProps {
  snippet: CodeSnippet;
}

export default function CodeDisplay({ snippet }: CodeDisplayProps) {
  const [useCorrected, setUseCorrected] = useState(true);
  const [copied, setCopied] = useState(false);

  const activeCode = useCorrected ? snippet.correctedCode : snippet.originalCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Code Control Tab Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* File and destination */}
        <div className="flex items-center gap-2.5">
          <Folder className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-[11px] font-mono text-slate-400">/</span>
          <span className="text-xs font-semibold font-mono text-slate-700 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300/40">
            {snippet.filename}
          </span>
        </div>

        {/* Mode Toggler and copy */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setUseCorrected(!useCorrected)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              useCorrected
                ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-sm'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {useCorrected ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>Code Sécurisé (Recommandé)</span>
              </>
            ) : (
              <>
                <span>Code Original (PDF Brut)</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-slate-905 hover:bg-slate-800 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-slate-100 active:bg-slate-200 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Textarea / Viewer */}
      <div className="relative flex-1 bg-slate-950 font-mono text-sm leading-relaxed p-4 text-slate-300 overflow-auto max-h-[440px] border-b border-slate-800 scrollbar-thin">
        <pre className="text-xs sm:text-sm whitespace-pre">
          <code>{activeCode}</code>
        </pre>
      </div>

      {/* VS Code Implementation & Compilation Guide */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 mt-auto">
        <div className="flex items-start gap-2.5 mb-3 text-slate-850">
          <Terminal className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              Comment Compiler et Exécuter dans VS Code :
            </h4>
            <div className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1 whitespace-pre-line">
              {snippet.vsCodeInstructions}
            </div>
          </div>
        </div>

        <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200/60 flex gap-2.5 text-amber-900 text-[11px] sm:text-xs leading-relaxed">
          <Info className="w-4 h-4 text-amber-505 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-amber-800 mb-0.5">Instruction d'exécution direct :</strong>
            En JavaScript client, le <strong className="font-semibold">navigateur web</strong> fait office d'interpréteur de code. Il n'y a pas besoin de compiler le fichier. Vous avez juste besoin d'ouvrir le fichier HTML directement dans votre navigateur ou via l'extension <strong className="font-mono bg-yellow-100 text-yellow-800 px-1 rounded font-normal">Live Server</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
