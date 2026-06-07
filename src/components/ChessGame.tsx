/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Crown,
  RotateCcw,
  Sparkles,
  Users,
  Timer,
  Check,
  Award,
  History,
  AlertTriangle,
  Palette,
  Info
} from 'lucide-react';
import { ChessPieceIcon } from './ChessPieceIcon';
import {
  ChessBoard,
  ChessPiece,
  MoveRecord,
  createInitialBoard,
  getValidMoves,
  isKingInCheck,
  hasLegalMoves,
  getCellNotation,
  getComputerMove,
  cloneBoard
} from '../utils/chessLogic';

export const ChessGame: React.FC = () => {
  // Game state
  const [board, setBoard] = useState<ChessBoard>(createInitialBoard());
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: ChessPiece[]; black: ChessPiece[] }>({
    white: [], // Pieces captured by White (i.e. Black pieces)
    black: []  // Pieces captured by Black (i.e. White pieces)
  });
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([]);
  const [gameMode, setGameMode] = useState<'vsAI' | 'pvp'>('vsAI');
  const [boardTheme, setBoardTheme] = useState<'classic' | 'emerald' | 'wood' | 'cosmic'>('emerald');
  const [lastMove, setLastMove] = useState<{ from: { row: number; col: number }; to: { row: number; col: number } } | null>(null);
  const [checkState, setCheckState] = useState<'none' | 'white' | 'black'>('none');
  const [winner, setWinner] = useState<'white' | 'black' | 'draw' | null>(null);
  const [reason, setReason] = useState<string>('');
  
  // Pawn promotion modal state
  const [promotionPending, setPromotionPending] = useState<{
    row: number;
    col: number;
    fromRow: number;
    fromCol: number;
  } | null>(null);

  // Clocks
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [whiteTime, setWhiteTime] = useState<number>(600); // 10 minutes default
  const [blackTime, setBlackTime] = useState<number>(600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active AI trigger timer
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Theme color maps
  const themes = {
    classic: {
      light: 'bg-slate-200 border-slate-300',
      dark: 'bg-slate-600 border-slate-700',
      boardBg: 'border-slate-800',
      accent: 'border-slate-500 fill-slate-300',
      label: 'Slate classique'
    },
    emerald: {
      light: 'bg-emerald-100 border-emerald-200',
      dark: 'bg-emerald-800 border-emerald-900',
      boardBg: 'border-emerald-950',
      accent: 'border-emerald-600 fill-emerald-200',
      label: 'Émeraude Royal'
    },
    wood: {
      light: 'bg-orange-100 border-orange-200',
      dark: 'bg-amber-800 border-amber-900',
      boardBg: 'border-amber-950',
      accent: 'border-amber-600 fill-amber-200',
      label: 'Chêne & Noyer'
    },
    cosmic: {
      light: 'bg-indigo-200 border-indigo-300',
      dark: 'bg-indigo-950 border-indigo-950',
      boardBg: 'border-indigo-950',
      accent: 'border-violet-600 fill-violet-300',
      label: 'Nébuleuse Cosmique'
    }
  };

  // Turn timer handler
  useEffect(() => {
    if (timerEnabled && !winner && !promotionPending) {
      timerRef.current = setInterval(() => {
        if (turn === 'white') {
          setWhiteTime(prev => {
            if (prev <= 1) {
              setWinner('black');
              setReason('Temps écoulé (Drapeau)');
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime(prev => {
            if (prev <= 1) {
              setWinner('white');
              setReason('Temps écoulé (Drapeau)');
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerEnabled, turn, winner, promotionPending]);

  // Restart handler
  const resetGame = () => {
    setBoard(createInitialBoard());
    setTurn('white');
    setSelectedCell(null);
    setValidMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setMoveHistory([]);
    setLastMove(null);
    setCheckState('none');
    setWinner(null);
    setReason('');
    setPromotionPending(null);
    setWhiteTime(600);
    setBlackTime(600);
    setIsAiThinking(false);
  };

  // AI trigger effect
  useEffect(() => {
    if (gameMode === 'vsAI' && turn === 'black' && !winner && !promotionPending) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        handleAiTurn();
      }, 700); // realistic short delay
      return () => clearTimeout(timer);
    }
  }, [turn, gameMode, winner, promotionPending]);

  const handleAiTurn = () => {
    const aiMove = getComputerMove(board);
    if (!aiMove) {
      // AI has no moves, check game over states
      if (isKingInCheck('black', board)) {
        setWinner('white');
        setReason('Échec et Mat du joueur Blanc !');
      } else {
        setWinner('draw');
        setReason('Pat (Nulle)');
      }
      setIsAiThinking(false);
      return;
    }

    const { from, to } = aiMove;
    const movingPiece = board[from.row][from.col]!;
    const destPiece = board[to.row][to.col];

    // execute move
    const newBoard = cloneBoard(board);
    newBoard[to.row][to.col] = { ...movingPiece, hasMoved: true };
    newBoard[from.row][from.col] = null;

    // Handle regular pawn promotion for AI (promotes auto to Queen)
    if (movingPiece.type === 'p' && to.row === 7) {
      newBoard[to.row][to.col] = {
        id: `${movingPiece.id}_q`,
        type: 'q',
        color: 'black',
        hasMoved: true
      };
    }

    // Capture accounting
    const newCaptures = { ...capturedPieces };
    if (destPiece) {
      newCaptures.black.push(destPiece); // black captures white piece
    }

    // Notation and history record
    const moveNotation = `${movingPiece.type.toUpperCase()}${getCellNotation(from.row, from.col)}→${getCellNotation(to.row, to.col)}${destPiece ? 'x' : ''}`;
    const newRecord: MoveRecord = {
      from,
      to,
      piece: movingPiece,
      capturedPiece: destPiece,
      notation: moveNotation
    };

    // Diagnostics/Check states
    const isInCheckLocal = isKingInCheck('white', newBoard);
    
    setBoard(newBoard);
    setCapturedPieces(newCaptures);
    setMoveHistory(prev => [...prev, newRecord]);
    setLastMove({ from, to });
    setCheckState(isInCheckLocal ? 'white' : 'none');
    
    // Switch turn
    setTurn('white');
    setIsAiThinking(false);

    // Verify game state for opponent
    if (!hasLegalMoves('white', newBoard)) {
      if (isInCheckLocal) {
        setWinner('black');
        setReason('Échec et Mat de l\'I.A. !');
      } else {
        setWinner('draw');
        setReason('Pat (Nulle)');
      }
    }
  };

  // Square selection / move handler
  const handleCellClick = (row: number, col: number) => {
    if (winner || isAiThinking) return;

    // Check if player clicked a valid target move square
    const isTargetMove = validMoves.some(m => m.row === row && m.col === col);

    if (isTargetMove && selectedCell) {
      executePlayerMove(selectedCell.row, selectedCell.col, row, col);
    } else {
      // Regular selection
      const clickedPiece = board[row][col];
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedCell({ row, col });
        const moves = getValidMoves(row, col, board);
        setValidMoves(moves);
      } else {
        // click empty square cancels selection
        setSelectedCell(null);
        setValidMoves([]);
      }
    }
  };

  // Perform legal player movement
  const executePlayerMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const piece = board[fromRow][fromCol]!;
    const destPiece = board[toRow][toCol];

    // Check for Pawn Promotion triggering
    const promoRank = piece.color === 'white' ? 0 : 7;
    if (piece.type === 'p' && toRow === promoRank) {
      setPromotionPending({ row: toRow, col: toCol, fromRow, fromCol });
      return;
    }

    applyConfirmedMove(fromRow, fromCol, toRow, toCol, piece, destPiece);
  };

  // Apply final move (either normal, or after promotion confirmation)
  const applyConfirmedMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    piece: ChessPiece,
    destPiece: ChessPiece | null,
    promotedTo: ChessPiece['type'] = 'p'
  ) => {
    const newBoard = cloneBoard(board);
    
    let activePiece = { ...piece, hasMoved: true };
    if (promotedTo !== 'p') {
      activePiece.type = promotedTo;
      activePiece.id = `${piece.color}_${promotedTo}_promo_${Date.now()}`;
    }

    newBoard[toRow][toCol] = activePiece;
    newBoard[fromRow][fromCol] = null;

    // Capture auditing
    const newCaptures = { ...capturedPieces };
    if (destPiece) {
      if (piece.color === 'white') {
        newCaptures.white.push(destPiece); // White captured Black
      } else {
        newCaptures.black.push(destPiece); // Black captured White
      }
    }

    // Create history listing
    const notationAndCap = `${promotedTo !== 'p' ? "P("+promotedTo.toUpperCase()+")" : piece.type.toUpperCase()}${getCellNotation(fromRow, fromCol)}→${getCellNotation(toRow, toCol)}${destPiece ? 'x' : ''}`;
    const newRecord: MoveRecord = {
      from: { row: fromRow, col: fromCol },
      to: { row: toRow, col: toCol },
      piece: activePiece,
      capturedPiece: destPiece,
      notation: notationAndCap
    };

    const nextTurnColor = turn === 'white' ? 'black' : 'white';
    const opponentInCheck = isKingInCheck(nextTurnColor, newBoard);

    // Commit state
    setBoard(newBoard);
    setCapturedPieces(newCaptures);
    setMoveHistory(prev => [...prev, newRecord]);
    setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
    setCheckState(opponentInCheck ? nextTurnColor : 'none');
    setSelectedCell(null);
    setValidMoves([]);
    setPromotionPending(null);

    // Verify next states
    if (!hasLegalMoves(nextTurnColor, newBoard)) {
      if (opponentInCheck) {
        setWinner(turn);
        setReason(`Échec et Mat de l'adversaire ! Victoire des ${turn === 'white' ? 'Blancs' : 'Noirs'}.`);
      } else {
        setWinner('draw');
        setReason('Pat (Nulle)');
      }
      return;
    }

    setTurn(nextTurnColor);
  };

  // Cancel pending promotion choosing modal and execute regular selection instead
  const handlePromotionSelection = (type: ChessPiece['type']) => {
    if (!promotionPending) return;
    const { fromRow, fromCol, row, col } = promotionPending;
    const movingPiece = board[fromRow][fromCol]!;
    const destPiece = board[row][col];
    
    applyConfirmedMove(fromRow, fromCol, row, col, movingPiece, destPiece, type);
  };

  const undoLastMove = () => {
    if (moveHistory.length === 0) return;
    
    // For single player, undo both the AI move and the player move
    let movesToPop = 1;
    if (gameMode === 'vsAI' && moveHistory.length >= 2) {
      movesToPop = 2;
    }

    const newHistory = [...moveHistory];
    let restoredBoard = cloneBoard(board);

    for (let i = 0; i < movesToPop; i++) {
      const popped = newHistory.pop();
      if (!popped) break;

      restoredBoard[popped.from.row][popped.from.col] = {
        ...popped.piece,
        hasMoved: popped.piece.hasMoved ? true : false
      };
      
      // Put back captured piece or clear target
      restoredBoard[popped.to.row][popped.to.col] = popped.capturedPiece;
    }

    // Recalculate captured lists
    const capWhite: ChessPiece[] = [];
    const capBlack: ChessPiece[] = [];
    newHistory.forEach(record => {
      if (record.capturedPiece) {
        if (record.piece.color === 'white') {
          capWhite.push(record.capturedPiece);
        } else {
          capBlack.push(record.capturedPiece);
        }
      }
    });

    setBoard(restoredBoard);
    setMoveHistory(newHistory);
    setCapturedPieces({ white: capWhite, black: capBlack });
    
    const lastRecord = newHistory[newHistory.length - 1];
    setLastMove(lastRecord ? { from: lastRecord.from, to: lastRecord.to } : null);
    
    // Set proper turn
    const newTurn = lastRecord ? (lastRecord.piece.color === 'white' ? 'black' : 'white') : 'white';
    setTurn(newTurn);
    setCheckState(isKingInCheck(newTurn, restoredBoard) ? newTurn : 'none');
    setWinner(null);
    setReason('');
    setSelectedCell(null);
    setValidMoves([]);
  };

  // Convert digital timer display
  const formatTime = (timeInSecs: number) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Count values of captured pieces for score difference display
  const scoreWeight = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const getCapturedScore = (pieces: ChessPiece[]) => {
    return pieces.reduce((sum, p) => sum + (scoreWeight[p.type] || 0), 0);
  };

  const whiteScore = getCapturedScore(capturedPieces.white);
  const blackScore = getCapturedScore(capturedPieces.black);
  const scoreDiff = whiteScore - blackScore;

  return (
    <div id="chess-workspace-root" className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      
      {/* Visual background ambient details */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

      {/* Responsive upper grid holding header options & settings */}
      <div className="relative mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] tracking-widest font-bold rounded-full uppercase">
              👑 Échec Royal Pro
            </span>
            <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded font-mono">
              v1.5
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white flex items-center gap-2">
            Plateau d'Échecs Académique
          </h2>
          <p className="text-xs text-slate-400">
            Étudiant : <strong className="text-slate-300">DOMGUIA TAKAM JOEL ISMAEL_23V2313</strong> • Code Propre et Authentifié
          </p>
        </div>

        {/* Global Toolbar actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Game Mode switchers */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              id="switch-vs-ai"
              onClick={() => { resetGame(); setGameMode('vsAI'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${gameMode === 'vsAI' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Intelligence Artificielle
            </button>
            <button
              id="switch-pvp"
              onClick={() => { resetGame(); setGameMode('pvp'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${gameMode === 'pvp' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Users className="w-3.5 h-3.5" />
              1 vs 1 Local
            </button>
          </div>

          {/* Theme switcher */}
          <div className="relative group">
            <button
              id="theme-select-toggle"
              className="p-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 rounded-lg flex items-center gap-1.5 font-medium transition cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>{themes[boardTheme].label}</span>
            </button>
            
            {/* Quick dropdown hover panel */}
            <div className="absolute right-0 mt-1.5 hidden group-hover:block w-44 bg-slate-950 border border-slate-800 rounded-xl shadow-xl z-30 p-1 animate-fadeIn">
              {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
                <button
                  key={t}
                  onClick={() => setBoardTheme(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-slate-800 transition ${boardTheme === t ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
                >
                  {themes[t].label}
                  {boardTheme === t && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Undo Action */}
          <button
            id="undo-btn"
            disabled={moveHistory.length === 0 || isAiThinking}
            onClick={undoLastMove}
            className="p-2 bg-slate-800 hover:bg-slate-705 text-slate-200 hover:text-white rounded-lg border border-slate-700 hover:border-slate-650 text-xs flex items-center gap-1.5 transition disabled:opacity-40 disabled:pointer-events-none"
            title="Annuler le dernier coup joué"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            Retour
          </button>

          {/* Reset Action */}
          <button
            id="reset-btn"
            onClick={resetGame}
            className="p-2 bg-rose-950/20 hover:bg-rose-900/30 text-rose-200 border border-rose-900/50 hover:border-rose-800 rounded-lg text-xs flex items-center gap-1.5 transition font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Main Grid: Left statistics pane / Board central / Right historic ledger */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Side Info Panel: capture states and timers */}
        <div className="xl:col-span-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between space-y-6">
          
          {/* Active Turn and AI compute status indicators */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mb-3">
              État de la Partie
            </h3>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">À qui de jouer ?</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full border ${turn === 'white' ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-800'}`} />
                  <span className="text-sm font-bold text-white capitalize">
                    {turn === 'white' ? 'Blancs' : 'Noirs'}
                  </span>
                </div>
              </div>

              {isAiThinking ? (
                <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/30 px-3 py-1.5 rounded-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono animate-pulse">L'I.A. réfléchit...</span>
                </div>
              ) : (
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-mono font-bold uppercase">
                  En Attente
                </span>
              )}
            </div>
          </div>

          {/* Capture Collectors */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
              Pièces Capturées
            </h3>

            {/* Captures by White (i.e., Black pieces captured) */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-820">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                <span>Captures de Blanc (Noirs)</span>
                {scoreDiff > 0 && <span className="text-emerald-400 font-bold">+{scoreDiff}</span>}
              </div>
              <div className="min-h-12 flex flex-wrap gap-1 p-2 bg-slate-950 rounded-lg">
                {capturedPieces.white.map((p, i) => (
                  <div key={i} className="hover:scale-110 transition bg-slate-900 rounded border border-slate-800 p-0.5">
                    <ChessPieceIcon type={p.type} color="black" size={20} />
                  </div>
                ))}
                {capturedPieces.white.length === 0 && (
                  <span className="text-[10px] text-slate-650 italic m-auto">Aucune capture</span>
                )}
              </div>
            </div>

            {/* Captures by Black (i.e., White pieces captured) */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-820">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                <span>Captures de Noir (Blancs)</span>
                {scoreDiff < 0 && <span className="text-amber-500 font-bold">+{Math.abs(scoreDiff)}</span>}
              </div>
              <div className="min-h-12 flex flex-wrap gap-1 p-2 bg-slate-950 rounded-lg">
                {capturedPieces.black.map((p, i) => (
                  <div key={i} className="hover:scale-110 transition bg-slate-900 rounded border border-slate-800 p-0.5">
                    <ChessPieceIcon type={p.type} color="white" size={20} />
                  </div>
                ))}
                {capturedPieces.black.length === 0 && (
                  <span className="text-[10px] text-slate-650 italic m-auto">Aucune capture</span>
                )}
              </div>
            </div>
          </div>

          {/* Bullet Blitz Timers */}
          <div className="border-t border-slate-800/60 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <Timer className="w-3.5 h-3.5 text-slate-400" />
                Horloges de Blitz
              </span>
              <label className="flex items-center gap-1.5 text-[10px] font-mono cursor-pointer text-slate-400 hover:text-slate-250">
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500"
                />
                Activer
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className={`p-2.5 rounded-lg border ${turn === 'white' && timerEnabled ? 'bg-white text-slate-950 border-emerald-500 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
                <div className="text-[9px] uppercase tracking-wider opacity-60">Blancs</div>
                <div className="text-base font-bold tracking-tight">{formatTime(whiteTime)}</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${turn === 'black' && timerEnabled ? 'bg-white text-slate-950 border-emerald-500 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
                <div className="text-[9px] uppercase tracking-wider opacity-60">Noirs</div>
                <div className="text-base font-bold tracking-tight">{formatTime(blackTime)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Canvas: Interactive Chess Board Grid */}
        <div className="xl:col-span-2 flex flex-col items-center justify-center relative">
          
          {/* Warning banner when King is Checked */}
          {checkState !== 'none' && !winner && (
            <div className="w-full max-w-[420px] mb-3 bg-rose-950/40 border border-rose-800 text-rose-200 px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-2 animate-bounce">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>
                Attention ! Le Roi <strong>{checkState === 'white' ? 'Blanc' : 'Noir'}</strong> est en échec !
              </span>
            </div>
          )}

          {/* Outer board casing border line */}
          <div className={`relative p-2.5 rounded-2xl border bg-slate-950 shadow-2xl transition duration-300 ${themes[boardTheme].boardBg}`}>
            
            {/* 8x8 Board Container */}
            <div className="grid grid-cols-8 grid-rows-8 w-full max-w-[440px] aspect-square rounded-lg overflow-hidden border border-slate-900">
              {board.map((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) => {
                  const isBlackSquare = (rowIndex + colIndex) % 2 === 1;
                  const cellColorClass = isBlackSquare ? themes[boardTheme].dark : themes[boardTheme].light;
                  
                  // Highlights checking
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const isSuggestedMove = validMoves.some(m => m.row === rowIndex && m.col === colIndex);
                  
                  const isLastMoveSrc = lastMove?.from.row === rowIndex && lastMove?.from.col === colIndex;
                  const isLastMoveDest = lastMove?.to.row === rowIndex && lastMove?.to.col === colIndex;
                  
                  // King check highlight
                  const isKingChecked = cell?.type === 'k' && checkState === cell?.color;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`relative aspect-square flex items-center justify-center cursor-pointer transition-all duration-150 border-[0.5px] select-none ${cellColorClass}
                        ${isSelected ? 'ring-3 ring-sky-500 ring-inset z-10' : ''}
                        ${isLastMoveSrc || isLastMoveDest ? 'after:absolute after:inset-0 after:bg-sky-500/10' : ''}
                        ${isKingChecked ? 'bg-red-500/40 animate-pulse border-red-500' : ''}
                        hover:brightness-105
                      `}
                    >
                      {/* Chess vector graphic element */}
                      {cell && (
                        <div className="transform active:scale-95 transition-transform duration-100 p-0.5">
                          <ChessPieceIcon type={cell.type} color={cell.color} size={38} />
                        </div>
                      )}

                      {/* Suggested Move Indicators */}
                      {isSuggestedMove && (
                        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center z-10">
                          {cell ? (
                            // Capture suggested: soft glowing ring
                            <div className="w-8 h-8 rounded-full border-3 border-emerald-400 bg-emerald-500/15" />
                          ) : (
                            // Normal target move suggested: centered green dot
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 opacity-80" />
                          )}
                        </div>
                      )}

                      {/* Small coordinate labels for visual aids inside border cells (bottom file letter and left rank number) */}
                      {colIndex === 0 && (
                        <span className="absolute top-0.5 left-1 text-[8px] font-mono text-slate-400/70 select-none">
                          {8 - rowIndex}
                        </span>
                      )}
                      {rowIndex === 7 && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-slate-400/70 select-none">
                          {['a','b','c','d','e','f','g','h'][colIndex]}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Pawn Promotion Pending Overlay */}
            {promotionPending && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center z-40 p-4">
                <Crown className="w-8 h-8 text-amber-500 mb-2 animate-bounce" />
                <h4 className="text-sm font-extrabold text-white mb-1">Promotion de Pion</h4>
                <p className="text-[11px] text-slate-400 mb-4 text-center max-w-[240px]">
                  Votre pion a atteint la dernière travée. Choisissez l'élévation souhaitée :
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {(['q', 'r', 'b', 'n'] as ChessPiece['type'][]).map((type) => {
                    const label = { q: 'Reine', r: 'Tour', b: 'Fou', n: 'Cavalier' }[type];
                    return (
                      <button
                        key={type}
                        onClick={() => handlePromotionSelection(type)}
                        className="bg-slate-900 border border-slate-800 hover:border-emerald-500 p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] hover:text-white transition group"
                      >
                        <div className="bg-slate-950 p-1 rounded-lg group-hover:scale-115 transition">
                          <ChessPieceIcon type={type} color={turn} size={30} />
                        </div>
                        <span className="font-medium text-slate-300">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Game Over Outcome Screen Overlay */}
            {winner && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center z-40 p-4 text-center animate-fadeIn">
                <Award className="w-12 h-12 text-amber-500 mb-3 animate-bounce" />
                <h3 className="text-lg font-black text-white">Fin de Partie</h3>
                
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-full mt-2 inline-block">
                  {winner === 'white' && "Victoire des Blancs"}
                  {winner === 'black' && "Victoire des Noirs"}
                  {winner === 'draw' && "Partie Nulle"}
                </span>

                <p className="text-xs text-slate-400 mt-2 max-w-[280px]">
                  {reason}
                </p>

                <button
                  onClick={resetGame}
                  className="mt-5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Recommencer une Partie
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Info Pane: Moves log ledger + tutorial instruction index */}
        <div className="xl:col-span-1 flex flex-col justify-between gap-4">
          
          {/* History ledger card */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex-1 flex flex-col h-full min-h-[220px]">
            <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-850 mb-3">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Historique des Coups
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[180px] sm:max-h-[240px] md:max-h-none pr-1">
              {moveHistory.map((rec, idx) => {
                const stepNum = Math.floor(idx / 2) + 1;
                const isWhiteMove = idx % 2 === 0;

                return (
                  <div key={idx} className={`p-1.5 rounded text-xs flex justify-between items-center ${idx === moveHistory.length - 1 ? 'bg-slate-900 border border-slate-800' : 'hover:bg-slate-900/40'}`}>
                    <span className="font-mono text-slate-500 text-[10px]">
                      {isWhiteMove ? `${stepNum}. ` : '\u00A0\u00A0\u00A0\u00A0'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${rec.piece.color === 'white' ? 'bg-white' : 'bg-slate-750'}`} />
                      <span className="font-mono font-medium text-slate-200">
                        {rec.notation}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono font-mono select-none">
                      {rec.capturedPiece ? `capture : ${rec.capturedPiece.type.toUpperCase()}` : ''}
                    </span>
                  </div>
                );
              })}
              {moveHistory.length === 0 && (
                <div className="m-auto text-center py-6 text-slate-600 text-xs italic">
                  Déplacez les pièces blanches pour lancer l'histoire
                </div>
              )}
            </div>
          </div>

          {/* Quick Rules tutorial guidelines reference helpful box */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center gap-1.5 mb-2 text-slate-400">
              <Info className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Règles Simplifiées</h4>
            </div>
            <div className="text-[10px] text-slate-400 leading-relaxed space-y-1">
              <p>📍 <strong>Pion (P) :</strong> 1 case vers l'avant (2 pour début). Prend en diagonale.</p>
              <p>📍 <strong>Cavalier (N) :</strong> Saute les pièces en formant un "L".</p>
              <p>📍 <strong>Fou (B) :</strong> Glisse à l'infini en diagonale.</p>
              <p>📍 <strong>Tour (R) :</strong> Glisse à l'infini en ligne droite.</p>
              <p>📍 <strong>Reine (Q) :</strong> Combine les pouvoirs du Fou et de la Tour.</p>
              <p>📍 <strong>Roi (K) :</strong> Avance d'une seule case. À protéger à tout prix.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
