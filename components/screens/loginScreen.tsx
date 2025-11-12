import { Colors } from '@/constants/theme';
import { login, register } from '@/services/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
    navigation.replace('Notes');
  };

  const handleRegister = async () => {
    await register(email, password);
    navigation.replace('Notes');
  };

  return (
    <View style={styles.container}>
        <Text style={{fontSize:30, marginBottom:20, color:Colors.light, fontWeight:'bold'}}>My Church Login</Text>
      <Text style={styles.text1}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text style={styles.text1}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
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
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
       
        paddingHorizontal: 10,
    },
    text1:{
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    
    },
    button: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});