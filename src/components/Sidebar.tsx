/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { CodeSnippet } from '../types';
import { Search, ChevronRight, FileCode, GraduationCap, Award, BookOpen } from 'lucide-react';

interface SidebarProps {
  snippets: CodeSnippet[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ snippets, selectedId, onSelect }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSnippets = snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300 w-full md:w-80 shrink-0">
      {/* Title & Stats */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-3 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
          <GraduationCap className="w-5 h-5 text-sky-400 shrink-0" />
          <div className="text-left leading-none">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider block uppercase">Cours & Travaux Pratiques</span>
            <span className="text-xs font-semibold text-slate-300">DOMGUIA TAKAM_23V2313</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher if, boucle, radio, head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-serif"
          />
        </div>
      </div>

      {/* Snippets navigation list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        <span className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-slate-500 font-bold block uppercase mb-1">
          Index Des Exemples ({filteredSnippets.length})
        </span>

        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => {
            const isSelected = snippet.id === selectedId;
            return (
              <button
                key={snippet.id}
                onClick={() => onSelect(snippet.id)}
                className={`w-full text-left p-3 rounded-lg flex items-start gap-2.5 transition-all outline-none border transition duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600/10 text-white border-sky-500/30 shadow-sm'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/45 hover:border-slate-800'
                }`}
              >
                <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                <div className="flex-1 leading-normal overflow-hidden">
                  <div className="flex justify-between items-center gap-1.5 overflow-hidden">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-tight truncate max-w-[120px]">
                      {snippet.section}
                    </span>
                    <span className="text-[9px] bg-slate-950 px-1 py-0.2 rounded shrink-0 text-sky-400/80 font-mono">
                      {snippet.page}
                    </span>
                  </div>
                  <h3 className={`text-xs font-bold leading-tight mt-1 truncate ${isSelected ? 'text-sky-305' : 'text-slate-350'}`}>
                    {snippet.title}
                  </h3>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 self-center transition-transform ${isSelected ? 'translate-x-0.5 text-sky-405' : 'text-slate-600'}`} />
              </button>
            );
          })
        ) : (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            Aucun code ne correspond
          </div>
        )}
      </div>

      {/* Footer Credentials */}
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono font-medium">
        <p>© 2026 DOMGUIA TAKAM</p>
        <p className="mt-0.5">JOEL ISMAEL - ID: 23V2313</p>
      </div>
    </div>
  );
}
