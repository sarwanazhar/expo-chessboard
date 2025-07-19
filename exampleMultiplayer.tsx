import Chessboard, { ChessboardRef } from 'expo-chessboard';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// allow white to move

const index = () => {
  const [turn, setTurn] = useState('b');
  const chessRef = useRef<ChessboardRef>(null)

  // set your socket connection to backend with useeffect and move pieces with when opponent make a move with chessRef?.current?.move({ thier move right here for black })

  return (
    <>
      <Chessboard
        onMove={(state) => {
          console.log("move", state)
          setTurn(state.move.color)
        }}
        gestureEnabled={turn === 'b'}
        orientation='white'
        ref={chessRef}
      />
      <TouchableOpacity style={styles.background} onPress={async () => {
        await chessRef.current?.move({ from: 'e7', to: 'e5' })
      }}>
        <Text>
          click here to move black
        </Text>
      </TouchableOpacity>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  background: {
    backgroundColor: "red",
    marginBottom: 100
  }
})
