import React from 'react';
import { useChessboardProps } from '../context/props-context/hooks';

import { useBoard } from '../context/board-context/hooks';
import { usePieceRefs } from '../context/board-refs-context/hooks';

import Piece from './piece';
import { useReversePiecePosition } from '../notation';

const Pieces = React.memo(() => {
  const board = useBoard();
  const refs = usePieceRefs();
  const { pieceSize, orientation } = useChessboardProps();
  const { toPosition } = useReversePiecePosition();

  return (
    <>
      {board.map((row, yBoard) =>
        row.map((piece, xBoard) => {
          if (piece !== null) {
            const xView = orientation === 'black' ? 7 - xBoard : xBoard;
            const yView = orientation === 'black' ? 7 - yBoard : yBoard;

            const square = toPosition({
              x: xView * pieceSize,
              y: yView * pieceSize,
            });

            return (
              <Piece
                ref={refs?.current?.[square]}
                key={`${xBoard}-${yBoard}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x: xView, y: yView }}
                square={square}
                size={pieceSize}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
});

export { Pieces };
