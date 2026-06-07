/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeDisplay from './components/CodeDisplay';
import SandboxRunner from './components/SandboxRunner';
import VSCodeSetupGuide from './components/VSCodeSetupGuide';
import { ChessGame } from './components/ChessGame';
import { snippets } from './data';
import { FileText, Play, Code, CheckCircle, Lightbulb, Info, BookOpen, UserCheck, HelpCircle, Trophy } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chess' | 'tp'>('chess');
  const [selectedSnippetId, setSelectedSnippetId] = useState(snippets[0].id);

  const selectedSnippet = snippets.find(s => s.id === selectedSnippetId) || snippets[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Top Header Badge */}
      <Header />

      {/* Tabs navigation */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 pb-3 shadow-sm z-10 flex items-center justify-center">
        <div className="bg-slate-950 p-1 rounded-xl border border-slate-800/80 flex items-center gap-1.5 w-full max-w-lg shadow-inner">
          <button
            id="tab-chess-selector"
            onClick={() => setActiveTab('chess')}
            className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${activeTab === 'chess' ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
            🏆 Jeu d'Échecs Royal Pro
          </button>
          
          <button
            id="tab-tp-selector"
            onClick={() => setActiveTab('tp')}
            className={`flex-1 py-2.5 rounded-lg text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${activeTab === 'tp' ? 'bg-gradient-to-r from-sky-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
            📚 Base TP JavaScript (DOMGUIA)
          </button>
        </div>
      </div>

      {activeTab === 'chess' ? (
        // Chess game view mode
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1240px] w-full mx-auto flex flex-col justify-center">
          <ChessGame />
        </div>
      ) : (
        // Existing high-quality interactive TP guide view mode
        <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto shadow-inner">
          {/* Left Navigation Sidebar */}
          <Sidebar
            snippets={snippets}
            selectedId={selectedSnippetId}
            onSelect={setSelectedSnippetId}
          />

          {/* Right Active Content Area */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Section Heading & Explanation Banner */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
              {/* Absolute decorative background layout element */}
              <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl pointer-events-none" />
              <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-sky-500/10 rounded-full -ml-8 -mb-8 blur-lg pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-white/20 text-white border border-white/10 px-2 py-0.5 rounded font-mono font-medium tracking-wider uppercase">
                    {selectedSnippet.section}
                  </span>
                  <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-mono font-medium">
                    {selectedSnippet.page}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text">
                  {selectedSnippet.title}
                </h2>

                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed mt-2 max-w-3xl font-sans font-medium">
                  {selectedSnippet.description}
                </p>

                {/* Expected Output indicator banner */}
                <div className="mt-4 p-3 bg-white/10 border border-white/10 rounded-lg flex items-start gap-2.5 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-250 font-bold">Résultat Attendu de l'exécution :</strong>{' '}
                    <span className="text-indigo-50">{selectedSnippet.expectedOutput}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Interactive Workspace: Code Display and Live Sandbox side-by-side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
              
              {/* Code and compiling directions column */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <Code className="w-4 h-4 text-slate-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Éditeur & Code Source
                  </h3>
                </div>
                <div className="flex-1">
                  <CodeDisplay snippet={selectedSnippet} />
                </div>
              </div>

              {/* Sandbox Visual Run simulator column */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <Play className="w-4 h-4 text-slate-500" />
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Évaluateur Interactif Intégré
                  </h3>
                </div>
                <div className="flex-1">
                  <SandboxRunner snippet={selectedSnippet} />
                </div>
              </div>

            </div>

            {/* Full Setup instructions & Tree guide */}
            <VSCodeSetupGuide />

            {/* Educational Quick Reference Card */}
            <div className="bg-slate-200/60 rounded-xl p-5 border border-slate-300">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-800">
                  L'essentiel sur les objets JavaScript du document PDF
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-sky-700 font-mono mb-1">L'objet Window (Canal direct)</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Représente le cadre ou l'onglet actif du navigateur. Gère les fonctions majeures de messagerie comme <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">alert()</code>, <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">confirm()</code> ou <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">prompt()</code>.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-indigo-700 font-mono mb-1">L'objet Document (DOM)</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Gère toute la structure interne de la page web. Ses méthodes célèbres incluent <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">getElementById()</code>, <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">getElementsByTagName()</code> ou l'écriture brute <code className="bg-slate-100 font-mono text-[10px] px-0.8 py-0.2 rounded text-red-650">write()</code>.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-emerald-700 font-mono mb-1">JavaScript & Formulaires</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Permet la validation instantanée côté client. On accède aux valeurs saisies via le chemin d'accès d'élément parent : <code className="bg-slate-100 font-mono text-[10.5px] px-0.8 py-0.2 rounded text-red-650 font-semibold font-bold">Formulaire.NomDuChamp.value</code>.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-300 flex justify-between items-center text-[11px] text-slate-550">
                <span className="font-mono">Travaux Pratiques rédigés pour validation académique de :</span>
                <strong className="font-mono text-slate-700">DOMGUIA TAKAM JOEL ISMAEL_23V2313</strong>
              </div>
            </div>

          </main>
        </div>
      )}
    </div>
  );
}
