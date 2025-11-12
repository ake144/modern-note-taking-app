import { logout } from '@/services/auth';
import { auth } from '@/services/firebaseConfig';
import { getNotes } from '@/services/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export default function NotesScreen({ navigation }: any) {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      getNotes(auth.currentUser.uid).then(setNotes);
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Note" onPress={() => navigation.navigate('AddNote')} />
      <Button title="Logout" onPress={logout} />
      <ScrollView style={{ marginTop: 20 }}>
        {notes.map(note => (
          <View key={note.id} style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{note.title}</Text>
            <Text>{note.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
