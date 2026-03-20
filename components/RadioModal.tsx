import React from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Option = { key: string; label: string; value: any };

type Props = {
  visible: boolean;
  options: Option[];
  selectedKey?: string;
  onSelect: (option: Option) => void;
  onClose: () => void;
  title?: string;
};

export function RadioModal({ visible, options, selectedKey, onSelect, onClose, title }: Props) {
  const t = useTheme();
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: t.name === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)" }]} onPress={onClose}>
        <View style={[styles.container, { backgroundColor: t.colors.surface }]}> 
          {title ? <Text style={[styles.title, { color: t.colors.text }]}>{title}</Text> : null}
          <FlatList
            data={options}
            keyExtractor={(i) => i.key}
            renderItem={({ item }) => {
              const selected = item.key === selectedKey;
              return (
                <Pressable style={[styles.item, selected && { backgroundColor: t.colors.border }]} onPress={() => onSelect(item)}>
                  <Text style={[styles.itemText, selected && styles.itemTextSelected, { color: t.colors.text }]}>{item.label}</Text>
                </Pressable>
              );
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" },
  container: { padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: "50%" },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  item: { paddingVertical: 12 },
  itemSelected: { backgroundColor: "rgba(0,0,0,0.04)" },
  itemText: { fontSize: 16 },
  itemTextSelected: { fontWeight: "700" },
});

export default RadioModal;
