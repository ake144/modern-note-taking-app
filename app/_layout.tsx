import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack  screenOptions={{
        headerStyle:{backgroundColor: '#ddd'},
        headerTintColor:"#333",
      }}>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        
        <Stack.Screen  name='(main)' options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="(notes)" options={{ headerShown: false }} />
      </Stack> 
        <StatusBar style="auto" />
    </ThemeProvider>

  );
}
