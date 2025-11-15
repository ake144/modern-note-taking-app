import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { StyleSheet } from "react-native"


const Create=()=>{
    return(

        <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
             Create New Note
        </ThemedText>

        
        </ThemedView>
    )
}



export default Create

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
    },
    input: {
      width: '100%',
      height: 48,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
      fontSize: 16,
    },
    button: {
      width: '100%',
      height: 48,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',     
        marginTop: 8,   
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });