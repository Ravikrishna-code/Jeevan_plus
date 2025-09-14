import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThermometerSun, Headphones as HeadphonesIcon, Heart, Activity, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/hooks/useVoice';
import VoiceButton from '@/components/VoiceButton';

export default function SymptomCheckerScreen() {
  const { t } = useLanguage();
  const { speak } = useVoice();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const symptoms = [
    { id: 'fever', name: t('fever'), icon: ThermometerSun, color: '#ef4444' },
    { id: 'headache', name: t('headache'), icon: HeadphonesIcon, color: '#f59e0b' },
    { id: 'chest_pain', name: t('chestPain'), icon: Heart, color: '#dc2626' },
    { id: 'breathing', name: t('breathingIssues'), icon: Activity, color: '#2563EB' },
  ];

  const questions = [
    { id: 'duration', text: t('symptomDuration'), type: 'yesno' },
    { id: 'severity', text: t('symptomSeverity'), type: 'yesno' },
    { id: 'previous', text: t('previousOccurrence'), type: 'yesno' },
  ];

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedSymptoms.length === 0) {
      Alert.alert(t('error'), t('selectSymptom'));
      return;
    }
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show results
      Alert.alert(
        t('recommendation'),
        t('consultDoctorRecommendation'),
        [
          { text: t('ok'), onPress: () => setCurrentStep(0) }
        ]
      );
    }
  };

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const renderSymptomSelection = () => (
    <View style={styles.symptomsGrid}>
      {symptoms.map((symptom) => (
        <TouchableOpacity
          key={symptom.id}
          style={[
            styles.symptomCard,
            selectedSymptoms.includes(symptom.id) && styles.selectedSymptom
          ]}
          onPress={() => handleSymptomSelect(symptom.id)}
        >
          <symptom.icon size={40} color={symptom.color} />
          <Text style={styles.symptomName}>{symptom.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuestion = () => {
    const question = questions[currentStep - 1];
    if (!question) return null;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        <VoiceButton text={question.text} style={styles.questionVoice} />
        
        <View style={styles.answersContainer}>
          <TouchableOpacity
            style={[
              styles.answerButton,
              answers[question.id] === true && styles.selectedAnswer
            ]}
            onPress={() => handleAnswer(question.id, true)}
          >
            <Text style={[
              styles.answerText,
              answers[question.id] === true && styles.selectedAnswerText
            ]}>
              {t('yes')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.answerButton,
              answers[question.id] === false && styles.selectedAnswer
            ]}
            onPress={() => handleAnswer(question.id, false)}
          >
            <Text style={[
              styles.answerText,
              answers[question.id] === false && styles.selectedAnswerText
            ]}>
              {t('no')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('symptomChecker')}</Text>
        <VoiceButton 
          text={t('symptomCheckerInstructions')}
          style={styles.voiceButton}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }
            ]} 
          />
        </View>

        {currentStep === 0 ? (
          <View>
            <Text style={styles.stepTitle}>{t('selectSymptoms')}</Text>
            {renderSymptomSelection()}
          </View>
        ) : (
          renderQuestion()
        )}

        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <ArrowLeft size={20} color="#6b7280" />
              <Text style={styles.backButtonText}>{t('back')}</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === questions.length ? t('getRecommendation') : t('next')}
            </Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  voiceButton: {
    backgroundColor: '#2563EB',
  },
  content: {
    padding: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  symptomCard: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedSymptom: {
    borderColor: '#2563EB',
    backgroundColor: '#dbeafe',
  },
  symptomName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  questionVoice: {
    backgroundColor: '#059669',
    marginBottom: 32,
  },
  answersContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  answerButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  selectedAnswer: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },
  answerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  selectedAnswerText: {
    color: 'white',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});