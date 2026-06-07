/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, Monitor, Sparkles, HelpCircle, Check, Plus, Minus, Info } from 'lucide-react';
import { CodeSnippet } from '../types';

interface SandboxRunnerProps {
  snippet: CodeSnippet;
}

export default function SandboxRunner({ snippet }: SandboxRunnerProps) {
  // Global simulated dialog state (IE Explorer Dialog)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'alert' | 'prompt'>('alert');
  const [inputValue, setInputValue] = useState('');
  const [promptCallback, setPromptCallback] = useState<((val: string) => void) | null>(null);

  // States for specific interactive sandbox scripts
  const [alternativeTime, setAlternativeTime] = useState(8); // Slider 0-23
  const [switchDay, setSwitchDay] = useState(5); // 0-6 day select
  const [inputNbre, setInputNbre] = useState('5'); // for somme_N_entiers
  const [sommeResult, setSommeResult] = useState<Array<{ i: number; sum: number }> | null>(null);
  
  // document-dom mock state
  const [mockImages, setMockImages] = useState<string[]>([
    'https://picsum.photos/id/10/120/80',
    'https://picsum.photos/id/20/120/80',
    'https://picsum.photos/id/30/120/80'
  ]);
  const [titreText, setTitreText] = useState("Titre Interactif (Cliquez-moi...)");

  // form states
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const [checkedCases, setCheckedCases] = useState({
    Case1: false, // Algorithmie
    Case2: false, // Mathématiques
    Case3: false  // Espagnol
  });

  // events states
  const [focusFields, setFocusFields] = useState({
    fname: false,
    lname: false
  });

  // variables & opérateurs states
  const [simulatedDocWrite, setSimulatedDocWrite] = useState<string | null>(null);

  // Auto trigger for script-body or script-externe on snippet change
  useEffect(() => {
    // Reset secondary states
    setAlternativeTime(8);
    setSwitchDay(5);
    setInputNbre('5');
    setSommeResult(null);
    setSimulatedDocWrite(null);
    setSelectedRadio('');
    setCheckedCases({ Case1: false, Case2: false, Case3: false });
    setFocusFields({ fname: false, lname: false });

    if (snippet.id === 'script-body') {
      triggerIeAlert("Afficher ce message : Bonjour à Tous (DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
    } else if (snippet.id === 'script-externe') {
      triggerIeAlert("si vous voyez ce message c'est que votre code de DOMGUIA TAKAM a été exécuté (DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
    }
  }, [snippet.id]);

  // Handler to trigger the custom simulated IE popup
  const triggerIeAlert = (msg: string) => {
    setDialogType('alert');
    setDialogMessage(msg);
    setDialogOpen(true);
  };

  const triggerIePrompt = (msg: string, callback: (val: string) => void) => {
    setDialogType('prompt');
    setDialogMessage(msg);
    setInputValue('');
    setPromptCallback(() => callback);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (dialogType === 'prompt' && promptCallback) {
      promptCallback(inputValue);
    }
    setDialogOpen(false);
  };

  // Run initial actions
  const handleReload = () => {
    if (snippet.id === 'script-body') {
      triggerIeAlert("Afficher ce message : Bonjour à Tous (DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
    } else if (snippet.id === 'script-externe') {
      triggerIeAlert("si vous voyez ce message c'est que votre code de DOMGUIA TAKAM a été exécuté (DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
    } else {
      // General reset
      setSommeResult(null);
      setSimulatedDocWrite(null);
      setSelectedRadio('');
      setCheckedCases({ Case1: false, Case2: false, Case3: false });
      setFocusFields({ fname: false, lname: false });
    }
  };

  // Calculate dynamic sum for Section 9
  const handleCalculateSomme = () => {
    const nb = parseInt(inputNbre, 10);
    if (isNaN(nb) || nb < 1) {
      triggerIeAlert("Veuillez saisir un nombre entier supérieur à 0");
      return;
    }
    const steps: Array<{ i: number; sum: number }> = [];
    let currentSum = 0;
    for (let i = 1; i <= nb; i++) {
      currentSum += i;
      steps.push({ i, sum: currentSum });
    }
    setSommeResult(steps);
  };

  // Handle Radio Test Section 11
  const handleRadioTest = () => {
    if (!selectedRadio) {
      triggerIeAlert("Veuillez choisir une matière d'abord ! (DOMGUIA TAKAM JOEL ISMAEL)");
    } else {
      triggerIeAlert(`Vous avez choisi : ${selectedRadio}\n\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)`);
    }
  };

  // Handle Checkbox Choice validation Section 12
  const handleCheckboxTest = () => {
    if (checkedCases.Case1 && checkedCases.Case2 && !checkedCases.Case3) {
      triggerIeAlert("Félicitations ! Vous avez choisi la bonne réponse d'informatique.\n\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)");
    } else {
      triggerIeAlert("Vous n'avez pas la bonne réponse...\n\nRappel : Algorithmie & Mathématiques sont requis, l'Espagnol n'est pas un cours obligatoire d'informatique !");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full text-slate-100">
      {/* Sandbox Header bar resembling a browser window */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex justify-between items-center text-slate-400">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono tracking-wide text-slate-300">DÉMO INTERACTIVE DE LA PAGE</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-1 px-2.5 rounded hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer bg-slate-900 border border-slate-800"
            title="Relancer / Reset la démo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Sandbox display container */}
      <div className="flex-1 p-5 overflow-y-auto bg-slate-100 text-slate-800 font-sans min-h-[300px] flex flex-col">
        
        {/* Render a custom screen layout depending on the selected sandbox ID */}
        
        {/* 1. SCRIPT HEAD */}
        {snippet.id === 'script-head' && (
          <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
            <h4 className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Exécution d'événement</h4>
            <p className="text-slate-600 max-w-sm text-xs mb-6">
              Cliquez ci-dessous pour déclencher la fonction <strong className="font-mono text-slate-900">Message()</strong> définie préalablement dans l'en-tête HTML.
            </p>
            <input
              type="button"
              value="Afficher"
              onClick={() => triggerIeAlert("Afficher ce message lorsque vous cliquez sur le bouton Afficher - DOMGUIA TAKAM")}
              className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm border border-sky-700 transition-all cursor-pointer transform hover:-translate-y-0.5"
            />
          </div>
        )}

        {/* 2. SCRIPT BODY */}
        {snippet.id === 'script-body' && (
          <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3 flex items-center justify-center animate-bounce">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Script direct exécuté !</h4>
            <p className="text-slate-500 text-xs mt-1.5 max-w-sm">
              Ce script s'exécute immédiatement lors du premier accès sans requérir d'interaction utilisateur.
            </p>
            <button
              onClick={() => triggerIeAlert("Afficher ce message : Bonjour à Tous (DOMGUIA TAKAM JOEL ISMAEL_23V2313)")}
              className="mt-6 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
            >
              Simuler à nouveau le chargement
            </button>
          </div>
        )}

        {/* 3. SCRIPT EXTERNE */}
        {snippet.id === 'script-externe' && (
          <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
            <h4 className="text-sm font-mono text-amber-600 uppercase tracking-wider mb-2">Importation Externe accomplie</h4>
            <p className="text-slate-600 text-xs max-w-sm mb-4">
              L'appel au script <code className="font-mono bg-slate-200 px-1 py-0.5 rounded text-red-600">Visualiser.js</code> a déclenché l'alerte sur la page.
            </p>
            <button
              onClick={() => triggerIeAlert("si vous voyez ce message c'est que votre code de DOMGUIA TAKAM a été exécuté (DOMGUIA TAKAM JOEL ISMAEL_23V2313)")}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
            >
              Ré-exécuter le script Visualiser.js
            </button>
          </div>
        )}

        {/* 4. SCRIPT LIEN */}
        {snippet.id === 'script-lien' && (
          <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
            <h4 className="text-sm text-slate-400 uppercase font-mono tracking-wider mb-2">Protocole URL javascript:</h4>
            <p className="text-slate-600 text-xs max-w-xs mb-6">
              Cliquez sur le lien hypertexte ci-dessous pour déclencher la fonction JavaScript liée.
            </p>
            <a
              href="javascript:void(0)"
              onClick={() => triggerIeAlert("Note d'information : Cette fonction est appelée directement par le lien href de DOMGUIA TAKAM (23V2313) !")}
              className="text-sky-600 hover:text-sky-800 font-semibold font-mono underline text-sm transition-all cursor-pointer block p-4 bg-white/70 border border-slate-200 rounded-lg hover:shadow-md"
            >
              javascript:Afficher_Note() (cliquer pour résultat)
            </a>
          </div>
        )}

        {/* 5. VARIABLES ET OPÉRATEURS */}
        {snippet.id === 'variables-operateurs' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            {!simulatedDocWrite ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <h4 className="text-sm font-bold text-slate-800 mb-1">Démonstration des Variables</h4>
                <p className="text-slate-500 text-xs max-w-md mb-6">
                  Le clic sur les boutons écrit directement sur le document web. Cliquez pour simuler l'écriture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <input
                    type="button"
                    value="Afficher le Nom (Emile Zola)"
                    onClick={() => setSimulatedDocWrite(`<h4>Nom d'auteur :</h4> <p class="text-lg font-semibold text-slate-900 font-mono">Emile Zola</p><br/><br/><p class="text-xs text-slate-500 italic">Signature de simulation : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>`)}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-lg shadow-sm text-xs cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Calculer et Afficher la Note (85 + 5 - 1)"
                    onClick={() => setSimulatedDocWrite(`<h4>Résultat du calcul de Note :</h4> <p class="text-3xl font-mono font-bold text-emerald-600">89 / 100</p><p class="text-xs text-slate-500 mt-4">Le code a exécuté :<br/>Note = 85;<br/>Note = Note + 5; // 90<br/>Note--; // 89</p><br/><br/><p class="text-xs text-slate-500 italic">Signature de simulation : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-xs cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg border border-slate-300 flex-1 flex flex-col justify-between">
                <div className="prose text-xs text-slate-800 max-w-none" dangerouslySetInnerHTML={{ __html: simulatedDocWrite }} />
                <button
                  onClick={() => setSimulatedDocWrite(null)}
                  className="mt-6 self-start bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3" />
                  <span>Réinitialiser la page</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. CONTRÔLE ALTERNATIVE (IF) */}
        {snippet.id === 'alternative-if' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Modifier l'heure du client :</span>
                <span className="font-mono text-sm font-bold bg-sky-100 text-sky-850 px-2 py-0.5 rounded border border-sky-200">
                  {alternativeTime} h 00
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                value={alternativeTime}
                onChange={(e) => setAlternativeTime(parseInt(e.target.value, 10))}
                className="w-full cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>Minuit (0h)</span>
                <span>Matin (8h)</span>
                <span>Midi (12h)</span>
                <span>Soir (20h)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200/80 mt-4 flex-1 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-emerald-600 mb-1 font-mono">CODE EVALUATION ACTIVE</span>
              <p className="text-slate-600 text-xs mb-3">L'heure simulée est {alternativeTime} h</p>
              
              <div className="text-lg font-bold text-slate-900 border-2 border-dashed border-slate-200 px-6 py-4 rounded-xl bg-slate-50 min-w-[200px]">
                {alternativeTime < 10 ? (
                  <span className="text-amber-600 font-serif font-semibold">Good morning</span>
                ) : (
                  <span className="text-indigo-600 font-serif font-semibold">Good day</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-3 font-mono">Condition: if (time &lt; 10) &#123; Good morning &#125; else &#123; Good day &#125;</p>
            </div>
          </div>
        )}

        {/* 7. CONTRÔLE SWITCH */}
        {snippet.id === 'alternative-switch' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">Sélectionner un Jour de la semaine :</span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSwitchDay(idx)}
                    className={`px-2 py-1.5 rounded text-xs font-medium border font-mono transition-all cursor-pointer ${
                      switchDay === idx
                        ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {name} ({idx})
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200/80 mt-4 flex-1 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-indigo-600 mb-1 font-mono">EVALUATION SWITCH (theDay = {switchDay})</span>
              <p className="text-slate-500 text-xs mb-3">Jour actif : {["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][switchDay]}</p>
              
              <div className="text-lg font-mono font-bold text-slate-900 border-2 border-dashed border-slate-200 px-6 py-4 rounded-xl bg-slate-50 min-w-[200px]">
                {switchDay === 5 ? "Finally Friday" 
                 : switchDay === 6 ? "Super Saturday" 
                 : switchDay === 0 ? "Sleepy Sunday"
                 : "I'm looking forward to this weekend!"}
              </div>
              <p className="text-[10px] text-slate-400 mt-3 font-mono">Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313</p>
            </div>
          </div>
        )}

        {/* 8. BOUCLES ITERA */}
        {snippet.id === 'boucles-itera' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Simulateur d'itération (0 à 5) :</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* For column */}
              <div className="bg-white p-3 rounded-lg border border-slate-250 flex flex-col">
                <span className="text-xs font-bold text-sky-700 border-b pb-1.5 mb-2 font-mono">for (var i=0; i&lt;=5; i++)</span>
                <div className="font-mono text-xs text-slate-600 space-y-1">
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="bg-slate-50 p-0.5 px-2 rounded">
                      The number is {n}
                    </div>
                  ))}
                </div>
              </div>

              {/* While column */}
              <div className="bg-white p-3 rounded-lg border border-slate-250 flex flex-col">
                <span className="text-xs font-bold text-amber-700 border-b pb-1.5 mb-2 font-mono">while (j &lt;= 5)</span>
                <div className="font-mono text-xs text-slate-600 space-y-1">
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="bg-slate-50 p-0.5 px-2 rounded">
                      The number is {n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Do-While column */}
              <div className="bg-white p-3 rounded-lg border border-slate-250 flex flex-col">
                <span className="text-xs font-bold text-teal-700 border-b pb-1.5 mb-2 font-mono">do ... while (k &lt;= 5)</span>
                <div className="font-mono text-xs text-slate-600 space-y-1">
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="bg-slate-50 p-0.5 px-2 rounded text-slate-600 font-mono">
                      The number is {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-mono">Les trois boucles produisent exactement le même affichage sous des syntaxes alternatives.</p>
          </div>
        )}

        {/* 9. FONCTIONS SOMME */}
        {snippet.id === 'fonctions-somme' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <label htmlFor="nbreInt" className="block text-xs font-semibold text-slate-700 mb-1.5">Entrer un nombre (nb) :</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="nbreInt"
                  min="1"
                  max="50"
                  value={inputNbre}
                  onChange={(e) => setInputNbre(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm px-3 py-1.5 w-24"
                />
                <button
                  onClick={handleCalculateSomme}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  Calculer
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200/80 mt-4 flex-1 font-mono text-xs text-slate-700 overflow-y-auto max-h-[160px]">
              {sommeResult ? (
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs border-b pb-1 mb-2">Simulated Console.write output :</h4>
                  {sommeResult.map((step) => (
                    <div key={step.i} className="py-0.5">
                      Pour i = <span className="font-bold text-sky-600">{step.i}</span> , somme = <span className="font-bold text-emerald-600">{step.sum}</span>
                    </div>
                  ))}
                  <div className="mt-3 font-sans text-xs font-bold text-slate-900 border-t pt-2 flex justify-between items-center">
                    <span>Somme Cumulative : {sommeResult[sommeResult.length - 1].sum}</span>
                    <span className="text-[10px] text-slate-500 italic">DOMGUIA TAKAM_23V2313</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 italic text-center py-6">
                  Saisissez un nombre entier positif et cliquez sur "Calculer" pour voir la boucle cumulative.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 10. DOCUMENT (DOM) */}
        {snippet.id === 'document-dom' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3
                  id="titreMock"
                  onClick={() => triggerIeAlert(`La valeur textuelle lue via x.innerHTML est :\n"${titreText}"\n\n(Auteur : DOMGUIA TAKAM JOEL ISMAEL_23V2313)`)}
                  className="font-bold text-sm text-sky-600 underline cursor-pointer hover:text-sky-850"
                  title="Cliquez pour simuler .innerHTML"
                >
                  {titreText}
                </h3>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-500">ID="titre"</span>
              </div>
              
              {/* Dynamic image controllers */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Galerie d'images (Cibles du Code) :</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      if (mockImages.length < 8) {
                        setMockImages([...mockImages, `https://picsum.photos/id/${10 + mockImages.length * 5}/120/80`]);
                      }
                    }}
                    className="p-1 px-2 text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-semibold cursor-pointer flex items-center gap-1"
                    title="Ajouter une image"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Ajouter</span>
                  </button>
                  <button
                    onClick={() => {
                      if (mockImages.length > 0) {
                        setMockImages(mockImages.slice(0, -1));
                      }
                    }}
                    className="p-1 px-2 text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-semibold cursor-pointer flex items-center gap-1"
                    title="Enlever une image"
                  >
                    <Minus className="w-3 h-3" />
                    <span>Enlever</span>
                  </button>
                </div>
              </div>

              {/* Thumbnails list */}
              <div className="flex flex-wrap gap-2.5 p-2 bg-white rounded-lg border border-slate-200 mb-4 min-h-[96px]">
                {mockImages.length > 0 ? (
                  mockImages.map((src, i) => (
                    <div key={i} className="relative group border border-slate-300 rounded p-0.5 bg-slate-50">
                      <img src={src} alt={`Image mock ${i}`} className="w-12 h-10 object-cover rounded-sm" />
                      <span className="absolute -bottom-1 -right-1 bg-slate-800 text-white text-[9px] font-mono rounded-full w-4 h-4 flex items-center justify-center border border-white">
                        {i + 1}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-slate-400 italic">
                    Aucune balise img présente !
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="button"
                onClick={() => triggerIeAlert(`Il y a : ${mockImages.length} image(s) détectée(s) dans ce document par le script de DOMGUIA TAKAM !`)}
                value="Compter les images (getElementsByTagName)"
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
              />
            </div>
          </div>
        )}

        {/* 11. FORMULAIRES RADIO */}
        {snippet.id === 'formulaires-radio' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="block text-xs font-bold text-slate-700 mb-2.5">Choisissez votre matière de spécialité :</span>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="testMath"
                    id="simMath"
                    value="Mathématiques"
                    checked={selectedRadio === 'Mathématiques'}
                    onChange={() => setSelectedRadio('Mathématiques')}
                    className="w-4 h-4 cursor-pointer text-sky-600"
                  />
                  <label htmlFor="simMath" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Mathématiques
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="testMath"
                    id="simInfo"
                    value="Informatique"
                    checked={selectedRadio === 'Informatique'}
                    onChange={() => setSelectedRadio('Informatique')}
                    className="w-4 h-4 cursor-pointer text-sky-600"
                  />
                  <label htmlFor="simInfo" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Informatique
                  </label>
                </div>
              </form>
            </div>

            <button
              onClick={handleRadioTest}
              className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm text-center"
            >
              Essayer (Tester le formulaire)
            </button>
          </div>
        )}

        {/* 12. FORMULAIRES CHECKBOX */}
        {snippet.id === 'formulaires-checkbox' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="block text-xs font-bold text-slate-800 mb-1.5 leading-tight">
                Citer deux cours obligatoires en informatique :
              </span>
              <span className="text-[10px] text-slate-400 block mb-3">Sélectionnez les affirmations correctes</span>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chkCase1"
                    checked={checkedCases.Case1}
                    onChange={(e) => setCheckedCases({ ...checkedCases, Case1: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chkCase1" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Algorithmie
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chkCase2"
                    checked={checkedCases.Case2}
                    onChange={(e) => setCheckedCases({ ...checkedCases, Case2: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chkCase2" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Mathématiques
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chkCase3"
                    checked={checkedCases.Case3}
                    onChange={(e) => setCheckedCases({ ...checkedCases, Case3: e.target.checked })}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="chkCase3" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Espagnol
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckboxTest}
              className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm text-center"
            >
              Essayer (Tester les réponses)
            </button>
          </div>
        )}

        {/* 13. ÉVÉNEMENTS FOCUS / BLUR */}
        {snippet.id === 'evenement-events' && (
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="block text-xs font-bold text-slate-700 mb-3">Déclencheur onFocus / onBlur :</span>
              
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label htmlFor="evFname" className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-1">
                    PRÉNOM (First name) :
                  </label>
                  <input
                    type="text"
                    id="evFname"
                    placeholder="Cliquez ici pour donner le Focus"
                    onFocus={() => setFocusFields({ ...focusFields, fname: true })}
                    onBlur={() => setFocusFields({ ...focusFields, fname: false })}
                    style={{ backgroundColor: focusFields.fname ? 'yellow' : 'white' }}
                    className="w-full text-xs font-medium p-2.5 border border-slate-300 rounded focus:outline-none transition-all duration-150 text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="evLname" className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider mb-1">
                    NOM (Last name) :
                  </label>
                  <input
                    type="text"
                    id="evLname"
                    placeholder="Cliquez ou tabulez ici"
                    onFocus={() => setFocusFields({ ...focusFields, lname: true })}
                    onBlur={() => setFocusFields({ ...focusFields, lname: false })}
                    style={{ backgroundColor: focusFields.lname ? 'yellow' : 'white' }}
                    className="w-full text-xs font-medium p-2.5 border border-slate-300 rounded focus:outline-none transition-all duration-150 text-slate-900"
                  />
                </div>
              </form>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-mono leading-tight">
              Le champ actif change instantanément d'arrière-plan en jaune grâce au handler onFocus. La perte de sélection réinitialise la couleur via onBlur !
            </p>
          </div>
        )}

      </div>

      {/* Retro IE-style custom Dialog modal */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          {/* Main Dialog Window with classic Windows look */}
          <div className="bg-[#f0f0ea] border-2 border-[#0054e3] rounded-t-lg shadow-2xl w-full max-w-sm overflow-hidden select-none select-none text-slate-900 font-sans">
            
            {/* IE XP Title bar */}
            <div className="bg-gradient-to-r from-[#0054e3] to-[#277df5] px-3 py-1.5 flex justify-between items-center text-white font-bold text-xs shadow-inner">
              <span className="flex items-center gap-1">
                <span className="bg-sky-500 text-white rounded w-3.5 h-3.5 inline-flex items-center justify-center text-[10px] border border-white font-serif italic text-right font-black">e</span>
                Microsoft Internet Explorer
              </span>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 hover:bg-red-650 active:bg-red-700 text-white font-extrabold w-4 h-4 flex items-center justify-center rounded border border-white/60 text-[10px] cursor-pointer"
                title="Fermer"
              >
                X
              </button>
            </div>

            {/* Dialog Content body */}
            <div className="p-4 flex gap-4 text-xs font-medium text-slate-900 leading-normal border-b border-slate-300 bg-white">
              <div className="shrink-0">
                {/* Yellow triangle warning icon similar to standard IE errors */}
                <div className="bg-amber-100 p-2.5 rounded-full text-amber-500 border border-amber-300 shadow-sm flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-5 h-5 fill-amber-300 text-amber-600" />
                </div>
              </div>
              <div className="flex-1 whitespace-pre-line text-slate-800 break-words font-sans">
                {dialogMessage}
                
                {dialogType === 'prompt' && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full mt-2.5 p-1 border border-slate-400 bg-white shadow-inner font-mono text-xs focus:outline-none focus:border-sky-500"
                    autoFocus
                  />
                )}
              </div>
            </div>

            {/* Dialog Action bar */}
            <div className="bg-[#f0f0ea] p-2 flex justify-center gap-2">
              <button
                onClick={handleCloseDialog}
                className="bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-800 font-medium px-5 py-1 text-xs border border-slate-400 rounded cursor-pointer min-w-[70px] shadow-sm transform active:scale-95 transition-transform"
              >
                OK
              </button>
              {dialogType === 'prompt' && (
                <button
                  onClick={() => setDialogOpen(false)}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-medium px-5 py-1 text-xs border border-slate-400 rounded cursor-pointer min-w-[70px] shadow-sm"
                >
                  Annuler
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
