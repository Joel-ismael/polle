/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChessPiece {
  id: string; // e.g., 'w_p_1'
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k'; // pawn, rook, knight, bishop, queen, king
  color: 'white' | 'black';
  hasMoved?: boolean;
}

export type BoardCell = ChessPiece | null;
export type ChessBoard = BoardCell[][]; // 8x8 matrix

export interface MoveRecord {
  from: { row: number; col: number };
  to: { row: number; col: number };
  piece: ChessPiece;
  capturedPiece: ChessPiece | null;
  notation: string;
}

// Convert board coordinates to standard chess notation, e.g. (7, 0) -> "a1"
export function getCellNotation(row: number, col: number): string {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  return `${files[col]}${ranks[row]}`;
}

// Initialize standard chess board setup
export function createInitialBoard(): ChessBoard {
  const board: ChessBoard = Array(8).fill(null).map(() => Array(8).fill(null));

  // Helper to place non-pawn pieces
  const backRow = (color: 'white' | 'black'): ChessPiece[] => {
    const types: ChessPiece['type'][] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    return types.map((type, index) => ({
      id: `${color}_${type}_${index}`,
      type,
      color,
      hasMoved: false
    }));
  };

  // Place Back Row Black pieces (row 0) and White pieces (row 7)
  board[0] = backRow('black');
  board[7] = backRow('white');

  // Place Pawns (row 1 black, row 6 white)
  for (let col = 0; col < 8; col++) {
    board[1][col] = {
      id: `black_p_${col}`,
      type: 'p',
      color: 'black',
      hasMoved: false
    };
    board[6][col] = {
      id: `white_p_${col}`,
      type: 'p',
      color: 'white',
      hasMoved: false
    };
  }

  return board;
}

// Check boundaries
export function inBounds(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Calculate raw prospective valid moves for a piece on a cell, ignoring check check bounds
export function getRawMoves(row: number, col: number, board: ChessBoard): { row: number; col: number }[] {
  const piece = board[row][col];
  if (!piece) return [];

  const moves: { row: number; col: number }[] = [];
  const color = piece.color;
  const oppositeColor = color === 'white' ? 'black' : 'white';

  switch (piece.type) {
    case 'p': {
      // Direction: white moves up (-1), black moves down (+1)
      const dir = color === 'white' ? -1 : 1;
      
      // Moving 1 step forward
      const f1Row = row + dir;
      if (inBounds(f1Row, col) && !board[f1Row][col]) {
        moves.push({ row: f1Row, col });
        
        // Moving 2 steps forward from initial rank
        const startRank = color === 'white' ? 6 : 1;
        const f2Row = row + (2 * dir);
        if (row === startRank && inBounds(f2Row, col) && !board[f2Row][col]) {
          moves.push({ row: f2Row, col });
        }
      }

      // Diagonal captures
      const diagCols = [col - 1, col + 1];
      for (const dCol of diagCols) {
        if (inBounds(f1Row, dCol)) {
          const targetCell = board[f1Row][dCol];
          if (targetCell && targetCell.color === oppositeColor) {
            moves.push({ row: f1Row, col: dCol });
          }
        }
      }
      break;
    }

    case 'r': {
      // Look 4 orthogonal directions
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;
        while (inBounds(r, c)) {
          const occupant = board[r][c];
          if (!occupant) {
            moves.push({ row: r, col: c });
          } else {
            if (occupant.color === oppositeColor) {
              moves.push({ row: r, col: c });
            }
            break; // path blocked
          }
          r += dr;
          c += dc;
        }
      }
      break;
    }

    case 'b': {
      // Look 4 diagonal directions
      const dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;
        while (inBounds(r, c)) {
          const occupant = board[r][c];
          if (!occupant) {
            moves.push({ row: r, col: c });
          } else {
            if (occupant.color === oppositeColor) {
              moves.push({ row: r, col: c });
            }
            break; // path blocked
          }
          r += dr;
          c += dc;
        }
      }
      break;
    }

    case 'q': {
      // Queen combines Rook and Bishop rules
      const dirs = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];
      for (const [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;
        while (inBounds(r, c)) {
          const occupant = board[r][c];
          if (!occupant) {
            moves.push({ row: r, col: c });
          } else {
            if (occupant.color === oppositeColor) {
              moves.push({ row: r, col: c });
            }
            break;
          }
          r += dr;
          c += dc;
        }
      }
      break;
    }

    case 'n': {
      // Knight hops in L-shape
      const movesOffsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of movesOffsets) {
        const r = row + dr;
        const c = col + dc;
        if (inBounds(r, c)) {
          const target = board[r][c];
          if (!target || target.color === oppositeColor) {
            moves.push({ row: r, col: c });
          }
        }
      }
      break;
    }

    case 'k': {
      // King moves 1 square in all directions
      const kingDirs = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];
      for (const [dr, dc] of kingDirs) {
        const r = row + dr;
        const c = col + dc;
        if (inBounds(r, c)) {
          const target = board[r][c];
          if (!target || target.color === oppositeColor) {
            moves.push({ row: r, col: c });
          }
        }
      }
      break;
    }
  }

  return moves;
}

// Find king square for a given color
export function findKing(color: 'white' | 'black', board: ChessBoard): { row: number; col: number } | null {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === color && piece.type === 'k') {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

// Determine if the specified king is currently checked
export function isKingInCheck(color: 'white' | 'black', board: ChessBoard): boolean {
  const kingPos = findKing(color, board);
  if (!kingPos) return false;

  const opponentColor = color === 'white' ? 'black' : 'white';

  // Check if any opponent piece can capture the king on the next turn
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === opponentColor) {
        // We use raw moves because check checking is symmetric
        const potentialAttacks = getRawMoves(r, c, board);
        if (potentialAttacks.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Clone board to run speculative moves
export function cloneBoard(board: ChessBoard): ChessBoard {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

// Safely filter moves: a move is only valid if it doesn't leave own King in check
export function getValidMoves(row: number, col: number, board: ChessBoard): { row: number; col: number }[] {
  const piece = board[row][col];
  if (!piece) return [];

  const rawMoves = getRawMoves(row, col, board);
  const color = piece.color;

  return rawMoves.filter(move => {
    // Speculate moving
    const testBoard = cloneBoard(board);
    testBoard[move.row][move.col] = testBoard[row][col];
    testBoard[row][col] = null;

    return !isKingInCheck(color, testBoard);
  });
}

// Check if a color has any legal moves left
export function hasLegalMoves(color: 'white' | 'black', board: ChessBoard): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === color) {
        const moves = getValidMoves(r, c, board);
        if (moves.length > 0) return true;
      }
    }
  }
  return false;
}

// Simple computer moves selector (AI)
// Scans for active captures, values them, picks the highest scoring option
export function getComputerMove(board: ChessBoard): { from: { row: number; col: number }; to: { row: number; col: number } } | null {
  const allMoves: { from: { row: number; col: number }; to: { row: number; col: number }; score: number }[] = [];

  const pieceValues: Record<ChessPiece['type'], number> = {
    'p': 10,
    'n': 30,
    'b': 30,
    'r': 50,
    'q': 90,
    'k': 999
  };

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === 'black') {
        const moves = getValidMoves(r, c, board);
        for (const m of moves) {
          const targetPiece = board[m.row][m.col];
          let score = 0;
          
          if (targetPiece) {
            score = pieceValues[targetPiece.type] * 2; // high score for captures
          }
          
          // Small reward for central advance
          const centerDist = Math.abs(3.5 - m.row) + Math.abs(3.5 - m.col);
          score += (6 - centerDist); // up to 6 points for positioning in the center

          allMoves.push({
            from: { row: r, col: c },
            to: m,
            score
          });
        }
      }
    }
  }

  if (allMoves.length === 0) return null;

  // Sort descending by score
  allMoves.sort((a, b) => b.score - a.score);

  // Group high scores to add randomness between same valued moves
  const topScore = allMoves[0].score;
  const bestOptions = allMoves.filter(m => m.score >= topScore - 2);

  const randIdx = Math.floor(Math.random() * bestOptions.length);
  return bestOptions[randIdx];
}
