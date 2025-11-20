import { auth } from '@/services/firebaseConfig';
import { addNote } from '@/services/firestore';
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const saveNote = async () => {
    if (!auth.currentUser) return;
    await addNote(auth.currentUser.uid, title, content);
    router.back();
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
