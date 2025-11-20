import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@/services/firebaseConfig';
import { addNote, type NotePayload } from '@/services/firestore';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

const COLOR_SWATCHES = ['#FECACA', '#FDE68A', '#FEF3C7', '#DCFCE7', '#E0F2FE', '#E9D5FF', '#F5F3FF'];

export default function AddNoteScreen() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const surface = useThemeColor({ light: '#F7F9FC', dark: '#1F2326' }, 'background');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_SWATCHES[0]);
  const [isPinned, setIsPinned] = useState(false);
  const [lastEdited, setLastEdited] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const wordCount = useMemo(() => {
    if (!content.trim()) return 0;
    return content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }, [content]);

  const characterCount = content.length;

  const handleAddTag = () => {
    const input = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    if (!input.length) return;

    const unique = Array.from(new Set([...tags, ...input]));
    setTags(unique);
    setTagsInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
    setLastEdited(new Date());
  };

  const handleChangeContent = (value: string) => {
    setContent(value);
    setLastEdited(new Date());
  };

  const handleTagSubmit = () => {
    handleAddTag();
  };

  const resetFields = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setTagsInput('');
    setIsPinned(false);
    setSelectedColor(COLOR_SWATCHES[0]);
    setLastEdited(null);
  };

  const saveNote = async () => {
    if (!auth.currentUser) {
      Alert.alert('Not signed in', 'Please sign in before creating a note.');
      return;
    }

    if (!title.trim() && !content.trim()) {
      Alert.alert('Add some content', 'Please add a title or some content before saving.');
      return;
    }

    const payload: NotePayload = {
      title: title.trim(),
      content: content.trim(),
      color: selectedColor,
      tags,
      isPinned,
    };

    try {
      setIsSaving(true);
      Keyboard.dismiss();
      await addNote(auth.currentUser.uid, payload);
      resetFields();
      router.back();
    } catch (error: any) {
      console.warn('addNote error', error);
      Alert.alert('Save failed', error?.message || 'Unable to save note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ThemedView safe style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.iconButton, { borderColor: iconColor }]}
            onPress={() => router.back()}
          >
            <ThemedText style={{ color: iconColor, fontSize: 18 }}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.topBarTitle}>
            Craft A Note
          </ThemedText>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: tint, opacity: isSaving ? 0.6 : 1 }]}
            onPress={saveNote}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, { backgroundColor: surface }]}> 
            <TextInput
              value={title}
              onChangeText={handleChangeTitle}
              placeholder="Untitled masterpiece"
              placeholderTextColor={iconColor}
              style={[styles.titleInput, { color: textColor }]}
              autoFocus
              returnKeyType="next"
            />
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaText}>{characterCount} characters</ThemedText>
              <ThemedText style={styles.metaText}>{wordCount} words</ThemedText>
              {lastEdited && (
                <ThemedText style={styles.metaText}>Edited {lastEdited.toLocaleTimeString()}</ThemedText>
              )}
            </View>
            <TextInput
              value={content}
              onChangeText={handleChangeContent}
              placeholder="Let the inspiration flow..."
              placeholderTextColor={iconColor}
              style={[styles.bodyInput, { color: textColor }]}
              multiline
              textAlignVertical="top"
              numberOfLines={10}
            />
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Mood & priority
            </ThemedText>
            <View style={styles.colorRow}>
              {COLOR_SWATCHES.map(color => {
                const isSelected = selectedColor === color;
                return (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorSwatch,
                      {
                        backgroundColor: color,
                        transform: [{ scale: isSelected ? 1.1 : 1 }],
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? tint : '#d1d5db',
                      },
                    ]}
                    onPress={() => setSelectedColor(color)}
                    accessibilityLabel={`Select color ${color}`}
                  />
                );
              })}
            </View>
            <View style={styles.pinRow}>
              <ThemedText style={styles.pinLabel}>Pin to top</ThemedText>
              <Switch value={isPinned} onValueChange={setIsPinned} thumbColor={isPinned ? tint : '#d1d5db'} />
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Tags
            </ThemedText>
            <View style={styles.tagInputRow}>
              <TextInput
                value={tagsInput}
                onChangeText={setTagsInput}
                onSubmitEditing={handleTagSubmit}
                placeholder="Press enter or comma to add"
                placeholderTextColor={iconColor}
                style={[styles.tagInput, { color: textColor, borderColor: iconColor }]}
                autoCapitalize="none"
              />
              <TouchableOpacity style={[styles.addTagButton, { borderColor: tint }]} onPress={handleAddTag}>
                <Text style={[styles.addTagText, { color: tint }]}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
              {tags.length === 0 ? (
                <ThemedText style={[styles.metaText, { color: iconColor }]}>No tags yet</ThemedText>
              ) : (
                tags.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagPill, { borderColor: tint }]}
                    onPress={() => handleRemoveTag(tag)}
                  >
                    <Text style={[styles.tagText, { color: tint }]}>{tag}</Text>
                    <Text style={[styles.tagRemove, { color: tint }]}>×</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Live preview
            </ThemedText>
            <View style={[styles.previewCard, { backgroundColor: selectedColor }]}> 
              <Text style={styles.previewTitle}>{title.trim() || 'Untitled note'}</Text>
              <Text style={styles.previewBody} numberOfLines={4}>
                {content.trim() || 'Start typing to see a live preview of your note here.'}
              </Text>
              {tags.length > 0 && (
                <View style={styles.previewTagsRow}>
                  {tags.slice(0, 3).map(tag => (
                    <Text key={tag} style={styles.previewTag}>#{tag}</Text>
                  ))}
                  {tags.length > 3 && <Text style={styles.previewTag}>+{tags.length - 3}</Text>}
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.clearButton} onPress={resetFields}>
            <Text style={[styles.clearButtonText, { color: iconColor }]}>Reset form</Text>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  primaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  contentContainer: {
    padding: 20,
    gap: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaText: {
    fontSize: 13,
    opacity: 0.7,
  },
  bodyInput: {
    minHeight: 200,
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSwatch: {
    width: 42,
    height: 42,
    borderRadius: 16,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  addTagButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  addTagText: {
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  tagText: {
    fontWeight: '600',
  },
  tagRemove: {
    fontSize: 14,
  },
  previewCard: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  previewBody: {
    color: '#334155',
    lineHeight: 22,
  },
  previewTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  previewTag: {
    fontWeight: '600',
    color: '#1e293b',
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 15,
  },
});
