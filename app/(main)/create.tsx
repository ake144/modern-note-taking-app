import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import { StyleSheet, TextInput } from "react-native"



const Create=()=>{
    return(

      <ThemedView style={styles.container}>
        <ThemedView>
          
        
           <ThemedText type="title" style={styles.texth1}>
                  Create New Note
             </ThemedText>
           <ThemedText type='subtitle'>
                make everything unforgotable by storing here 
            </ThemedText>
        </ThemedView>
        <TextInput style={{height:75, padding:12,marginTop:32, justifyContent:'center', alignItems:"center", width:400, backgroundColor:"rgba(93, 175, 175, 1)"}}>
             
        </TextInput>

        
        </ThemedView>
    )
}



export default Create

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop:32,
      // justifyContent: 'center',
      padding: 16,
    },
    texth1:{
    fontSize:50,
    fontWeight: 'bold',
    marginBottom: 6,
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