import { auth } from '@/services/firebaseConfig';
import { addNote } from '@/services/firestore';
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function AddNoteScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = async () => {
    if (!auth.currentUser) return;
    await addNote(auth.currentUser.uid, title, content);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
        style={{ borderWidth: 1, textAlignVertical: 'top' }}
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
}
