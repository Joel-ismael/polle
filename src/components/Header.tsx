/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Copy, Check, Terminal, ExternalLink, Moon, Sun, BookOpen } from 'lucide-react';

export default function Header() {
  const [copied, setCopied] = useState(false);
  const studentID = "DOMGUIA TAKAM JOEL ISMAEL_23V2313";

  const handleCopy = () => {
    navigator.clipboard.writeText(studentID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white py-5 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-600 rounded-lg text-white shadow-inner flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 id="header-title" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Guide Interactif JavaScript 
              <span className="text-xs bg-sky-505/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-normal">
                DOM & Formulaires
              </span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-sans mt-0.5">
              Visualisation, exécution et guides de compilation pour VS Code des travaux pratiques
            </p>
          </div>
        </div>

        {/* Student ID Badge and metadata */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto shadow-lg">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                ID Étudiant Certifié
              </div>
              <div className="text-xs sm:text-sm font-semibold font-mono text-slate-200">
                {studentID}
              </div>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto hover:bg-slate-800 active:bg-slate-900 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Copier les références étudiant"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copié !</span>
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
    </header>
  );
}
