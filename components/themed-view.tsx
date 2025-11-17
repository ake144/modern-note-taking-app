import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safe?: boolean;
};

export function ThemedView({ style, lightColor,safe=false, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const insets = useSafeAreaInsets();


  if(safe){
    return <SafeAreaView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
  }

  return <View style={[{ backgroundColor, 
     paddingBottom: insets.bottom,
     paddingTop: insets.top
   }, style]} {...otherProps} />;
}
