import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { resetPassword } from '@/services/auth';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const textColor = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Enter email', 'Please enter your account email to reset password.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert('Email sent', 'If an account exists for that email, a password reset link has been sent.');
      navigation.replace('Login');
    } catch (e: any) {
      console.warn('resetPassword error', e);
      const message = e?.message || 'Unable to send password reset email.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: background }]}>
      <ThemedText type="title" style={styles.title}>Forgot password</ThemedText>

      <ThemedText type="subtitle" style={styles.label}>Email</ThemedText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { color: textColor, borderColor: tint, backgroundColor: background === '#fff' ? '#f6f8fa' : '#1a1c1d' }]}
        placeholder="you@example.com"
        placeholderTextColor={background === '#fff' ? '#6b7280' : '#9BA1A6'}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tint }]}
        onPress={handleReset}
        disabled={loading}
        accessibilityLabel="Send password reset email"
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>{loading ? 'Sending...' : 'Send reset link'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.secondaryButton]} onPress={() => navigation.replace('Login')}>
        <Text style={[styles.buttonText, { color: tint }]}>Back to login</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    width: '100%',
    marginBottom: 8,
  },
});
