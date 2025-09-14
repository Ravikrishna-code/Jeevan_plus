import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { useVoice } from '@/hooks/useVoice';

interface VoiceButtonProps {
  text: string;
  style?: ViewStyle;
  size?: number;
  color?: string;
}

export default function VoiceButton({ 
  text, 
  style, 
  size = 20, 
  color = 'white' 
}: VoiceButtonProps) {
  const { speak, isSpeaking } = useVoice();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => speak(text)}
      disabled={isSpeaking}
    >
      <Volume2 size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});