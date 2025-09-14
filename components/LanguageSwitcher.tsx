import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Globe } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'EN', label: 'English' },
    { code: 'hi', name: 'हिं', label: 'Hindi' },
    { code: 'pa', name: 'ਪੰ', label: 'Punjabi' },
  ];

  const currentLangIndex = languages.findIndex(lang => lang.code === language);
  
  const handleLanguageSwitch = () => {
    const nextIndex = (currentLangIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code as any);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLanguageSwitch}>
      <Globe size={16} color="#2563EB" />
      <Text style={styles.text}>
        {languages[currentLangIndex].name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
});