/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useChessboardProps } from '../context/props-context/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

type BackgroundProps = {
  letters: boolean;
  numbers: boolean;
};

interface BaseProps extends BackgroundProps {
  white: boolean;
}

interface RowProps extends BaseProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = React.memo(
  ({ white, row, col, letters, numbers }: SquareProps) => {
    const { colors, orientation } = useChessboardProps();
    const backgroundColor = white ? colors.black : colors.white;
    const color = white ? colors.white : colors.black;
    const textStyle = { fontWeight: '500' as const, fontSize: 10, color };
    const newLocal = orientation === 'black' ? col === 7 : col === 0;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          padding: 4,
          justifyContent: 'space-between',
        }}
      >
        {numbers && (
          <Text style={[textStyle, { opacity: newLocal ? 1 : 0 }]}>
            {'' + (8 - row)}
          </Text>
        )}
        {row === (orientation === 'black' ? 0 : 7) && letters && (
          <Text style={[textStyle, { alignSelf: 'flex-end' }]}>
            {String.fromCharCode(97 + col)}
          </Text>
        )}
      </View>
    );
  }
);

const Row = React.memo(({ white, row, ...rest }: RowProps) => {
  const { orientation } = useChessboardProps();
  const offset = white ? 0 : 1;
  const cols = new Array(8).fill(0).map((_, i) => i);
  const colIndexes = orientation === 'black' ? [...cols].reverse() : cols;
  return (
    <View style={styles.container}>
      {colIndexes.map((col) => (
        <Square
          {...rest}
          row={row}
          col={col}
          key={col}
          white={(col + offset) % 2 === 1}
        />
      ))}
    </View>
  );
});

const Background: React.FC = React.memo(() => {
  const { withLetters, withNumbers, orientation } = useChessboardProps();
  const rows = new Array(8).fill(0).map((_, i) => i);
  const rowIndexes = orientation === 'black' ? [...rows].reverse() : rows;
  return (
    <View style={{ flex: 1 }}>
      {rowIndexes.map((rowIdx) => (
        <Row
          key={rowIdx}
          white={rowIdx % 2 === 0}
          row={rowIdx}
          letters={withLetters}
          numbers={withNumbers}
        />
      ))}
    </View>
  );
});

export default Background;
