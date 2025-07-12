import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useChessboardProps } from '../../context/props-context/hooks';

import { useChessEngine } from '../../context/chess-engine-context/hooks';
import { useReversePiecePosition } from '../../notation';
import { HighlightedSquare } from './highlighted-square';
import { useSquareRefs } from '../../context/board-refs-context/hooks';

const HighlightedSquares: React.FC = React.memo(() => {
  const chess = useChessEngine();
  const board = useMemo(() => chess.board(), [chess]);
  const { pieceSize, orientation } = useChessboardProps();
  const { toPosition, toTranslation } = useReversePiecePosition();
  const refs = useSquareRefs();

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {board.map((row, yBoard) =>
        row.map((_, xBoard) => {
          const xView = orientation === 'black' ? 7 - xBoard : xBoard;
          const yView = orientation === 'black' ? 7 - yBoard : yBoard;

          const square = toPosition({ x: xView * pieceSize, y: yView * pieceSize });
          const translation = toTranslation(square);

          return (
            <HighlightedSquare
              key={`${xBoard}-${yBoard}`}
              ref={refs?.current?.[square]}
              style={[
                styles.highlightedSquare,
                {
                  width: pieceSize,
                  transform: [
                    { translateX: translation.x },
                    { translateY: translation.y },
                  ],
                },
              ]}
            />
          );
        })
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  highlightedSquare: {
    position: 'absolute',
    aspectRatio: 1,
  },
});

export { HighlightedSquares };
