/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Folder, FileText, CheckCircle, HelpCircle, Laptop, Settings, ArrowRight, Download, Terminal, BadgeAlert, CircleDot } from 'lucide-react';

export default function VSCodeSetupGuide() {
  const [downloadStep, setDownloadStep] = useState(false);

  const files = [
    { name: '01_script_head.html', desc: 'Script lié au clic défini dans <head>' },
    { name: '02_script_body.html', desc: 'Exécution directe automatique dans <body>' },
    { name: '03_script_externe.html', desc: 'Appel et liaison externe' },
    { name: 'Visualiser.js', desc: 'Fichier de script externe associé' },
    { name: '04_script_lien.html', desc: 'Insertion via balise de lien <a>' },
    { name: '05_variables.html', desc: 'Déclarations et opérateurs arithmétiques' },
    { name: '06_alternative.html', desc: 'Test d\'alternative conditionnelle simple' },
    { name: '07_switch.html', desc: 'Cas multiples commutés (Switch/Case)' },
    { name: '08_boucles.html', desc: 'Boucles For, While, et Do...While' },
    { name: '09_fonctions.html', desc: 'Fonction de calcul cumulatif de somme' },
    { name: '10_document_dom.html', desc: 'Manipulation DOM par ID et balise' },
    { name: '11_formulaires_radio.html', desc: 'Contrôles d\'options de boutons radio' },
    { name: '12_cases_cocher.html', desc: 'Questionnaire multi-choix de cases' },
    { name: '13_evenements_focus.html', desc: 'Événements interactifs onFocus/onBlur' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Laptop className="w-5 h-5 text-sky-600" />
        <h3 className="text-sm sm:text-base font-bold text-slate-800">
          Guide d'organisation & de Compilation VS Code
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
        Ce guide explique étape par étape comment configurer votre espace de travail <strong className="font-semibold text-slate-800">VS Code</strong> et exécuter vos scripts. Toutes les signatures d'attribution <strong className="font-mono text-sky-600 text-xs">DOMGUIA TAKAM JOEL ISMAEL_23V2313</strong> ont été intégrées pour chaque livrable.
      </p>

      {/* Grid of structure and steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Directory Structure Mock */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl p-4 text-slate-350 border border-slate-800 shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Structure de Dossier Requise</span>
              <span className="text-[9px] bg-sky-900/40 text-sky-400 border border-sky-800/30 px-1.5 py-0.2 rounded font-mono">VS Code project</span>
            </div>
            
            {/* Tree root folder */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-white font-bold mb-2">
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
              <span>DOMGUIA TAKAM</span>
              <span className="text-[10px] text-slate-500 font-normal font-sans">(Dossier Racine)</span>
            </div>

            {/* Tree files list */}
            <div className="pl-4 border-l border-slate-800 space-y-1.5 font-mono text-xs">
              {files.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5 group hover:text-slate-200 transition-all">
                  <div className="text-slate-600 select-none">├──</div>
                  {f.name.endsWith('.js') ? (
                    <Settings className="w-3.5 h-3.5 text-sky-450 mt-0.5 shrink-0" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="text-slate-200 font-bold">{f.name}</span>
                    <span className="text-[10px] text-slate-500 font-sans block truncate max-w-[200px] leading-tight">
                      {f.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 text-center text-[10px] text-slate-500 font-mono italic">
            Livrables pour DOMGUIA TAKAM (23V2313)
          </div>
        </div>

        {/* Right Side: Step details inside VS Code */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="bg-sky-50 text-sky-600 rounded-full w-6 h-6 shrink-0 flex items-center justify-center font-bold text-xs border border-sky-200">
                1
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Créer le Répertoire de l'étudiant</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Créez un dossier nommé <strong className="font-mono text-slate-800 bg-slate-100 px-1 rounded">DOMGUIA TAKAM</strong> sur votre disque dur locale, puis faites glisser ce dossier dans <strong className="font-semibold">VS Code</strong> pour l'ouvrir comme espace de travail principal.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="bg-sky-50 text-sky-600 rounded-full w-6 h-6 shrink-0 flex items-center justify-center font-bold text-xs border border-sky-200">
                2
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Recopier les Fichiers avec Signature</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Pour chaque exemple listé dans le menu de gauche, copiez le code du bloc <strong className="text-sky-600 bg-sky-50 px-1 rounded font-normal">Code Sécurisé Corrigé</strong>. Ces codes comportent les commentaires et structures HTML5 normalisés pour validation académique.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3">
              <div className="bg-sky-50 text-sky-600 rounded-full w-6 h-6 shrink-0 flex items-center justify-center font-bold text-xs border border-sky-200">
                3
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Exécuter via l'Extension 'Live Server'</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Installez l'extension <strong className="text-sky-600">Live Server</strong> (par Ritwick Dey) dans VS Code. Faites un clic droit sur un fichier HTML puis cliquez sur <strong className="font-mono bg-slate-100 px-1 rounded">Open with Live Server</strong>. Une page web locale lancera le JavaScript de manière synchrone.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3">
              <div className="bg-sky-50 text-sky-600 rounded-full w-6 h-6 shrink-0 flex items-center justify-center font-bold text-xs border border-sky-200">
                4
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Pourquoi pas de Compilation ?</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Contrairement au C/C++ ou Java, JavaScript sur navigateur est un <strong className="font-semibold">langage interprété</strong>. Il n'a pas besoin de d'étape de compilation préalable distincte. Votre navigateur (Chrome, Firefox, Edge, Safari) compile les instructions à la volée !
                </p>
              </div>
            </div>

          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-sky-600 animate-pulse" />
              <span className="text-[11px] font-medium text-slate-700">Prêt pour copie d'examens et de TPs.</span>
            </div>
            <div className="text-[9px] text-slate-500 font-mono">
              ID : DOMGUIA TAKAM JOEL ISMAEL_23V2313
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
