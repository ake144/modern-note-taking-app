import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { login, register } from '@/services/auth';
import { useRouter } from 'expo-router';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const textColor = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');
  const router = useRouter();

  const handleLogin = async () => {
    await login(email, password);
    router.replace('/notes');
  };

  const handleRegister = async () => {
    // If you want to save `name` to the user profile, update `services/auth` to accept it
    await register(email, password);
    router.replace('/notes');
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: background }] }>
      <ThemedText type="title" style={styles.title}>
        Create your account
      </ThemedText>

      <ThemedText type="subtitle" style={styles.label}>
        Full name (optional)
      </ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        style={[styles.input, { color: textColor, borderColor: tint, backgroundColor: background === '#fff' ? '#f6f8fa' : '#1a1c1d' }]}
        placeholder="Jane Doe"
        placeholderTextColor={background === '#fff' ? '#6b7280' : '#9BA1A6'}
        autoCapitalize="words"
      />

      <ThemedText type="subtitle" style={styles.label}>
        Email
      </ThemedText>
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

      <ThemedText type="subtitle" style={styles.label}>
        Password
      </ThemedText>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { color: textColor, borderColor: tint, backgroundColor: background === '#fff' ? '#f6f8fa' : '#1a1c1d' }]}
        placeholder="••••••••"
        placeholderTextColor={background === '#fff' ? '#6b7280' : '#9BA1A6'}
        autoCapitalize="none"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: tint }]} onPress={handleRegister} accessibilityLabel="Sign up">
        <Text style={[styles.buttonText, { color: '#fff' }]}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.secondaryButton]} onPress={() => router.replace('/login')} accessibilityLabel="Have an account login">
        <Text style={[styles.buttonText, { color: tint }]}>Already have an account? Log in</Text>
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
        height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 1,
    elevation: 1,
    },
    text1:{
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    
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
    }
});