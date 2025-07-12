import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useBoardOperations } from '../../context/board-operations-context/hooks';
import { useChessEngine } from '../../context/chess-engine-context/hooks';
import { useChessboardProps } from '../../context/props-context/hooks';

import { PlaceholderDot } from './PlaceholderDot';

const SuggestedDots: React.FC = React.memo(() => {
  const chess = useChessEngine();
  const { moveTo, selectableSquares } = useBoardOperations();
  const board = useMemo(() => chess.board(), [chess]);
  const { orientation } = useChessboardProps();

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
          return (
            <PlaceholderDot
              key={`${xBoard}-${yBoard}`}
              x={xView}
              y={yView}
              selectableSquares={selectableSquares}
              moveTo={moveTo}
            />
          );
        })
      )}
    </View>
  );
});

export { SuggestedDots };
