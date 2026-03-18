import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";

interface AnchoredDropdownProps {
  options: { key: string; label: string }[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export default function AnchoredDropdown({
  options,
  selectedKey,
  onSelect,
}: AnchoredDropdownProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<View>(null);

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ top: y + height, left: x, width });
      setOpen(true);
    });
  };

  const selectedLabel = options.find((o) => o.key === selectedKey)?.label ?? "";

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        style={[
          styles.unitButton,
          { borderColor: theme.colors.border, backgroundColor: theme.colors.background },
        ]}
        onPress={handleOpen}
      >
        <Text style={[styles.unitButtonText, { color: theme.colors.text }]}>
          {selectedLabel}
        </Text>
        <MaterialCommunityIcons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      {open && anchor && (
        <Modal transparent animationType="none" visible onRequestClose={() => setOpen(false)} statusBarTranslucent>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={() => setOpen(false)} />
          <View
            style={[
              dropdownStyles.menu,
              {
                top: anchor.top,
                left: anchor.left,
                minWidth: anchor.width,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
          >
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={dropdownStyles.option}
                onPress={() => {
                  onSelect(opt.key);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    dropdownStyles.optionText,
                    {
                      color: opt.key === selectedKey ? theme.colors.primary : theme.colors.text,
                      fontWeight: opt.key === selectedKey ? "700" : "400",
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </>
  );
}

const dropdownStyles = StyleSheet.create({
  menu: {
    position: "absolute",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 999,
    minWidth: 140,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
  },
});

const styles = StyleSheet.create({
  unitButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
  },
  unitButtonText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
});