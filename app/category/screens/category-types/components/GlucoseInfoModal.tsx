import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";

interface GlucoseInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

function FormulaRow({ formula }: { formula: string }) {
  const theme = useTheme();
  const styles = formulaStyles(theme);

  return (
    <Text
      style={styles.row}
    >
      {formula}
    </Text>
  );
}

const formulaStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    row: {
      fontSize: 13,
        fontWeight: "400",
        color: theme.colors.text,
        textAlign: "center",
        paddingVertical: 4,
        lineHeight: 20,
    },
  });

function RuleSection({
  title,
  formulas,
}: {
  title: string;
  formulas: string[];
}) {
  const theme = useTheme();
  const styles = sectionStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      {formulas.map((formula) => (
        <FormulaRow key={formula} formula={formula} />
      ))}
    </View>
  );
}

const sectionStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    section: {
      marginBottom: 4,
    },
    title: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.primary,
      textAlign: "center",
      marginBottom: 10,
      letterSpacing: 0.2,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border,
      marginBottom: 4,
    },
  });

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function GlucoseInfoModal({ visible, onClose }: GlucoseInfoModalProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Tap outside to dismiss */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Card — stopPropagation so tapping inside doesn't dismiss */}
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, { backgroundColor: theme.colors.background }]}
        >
          {/* Modal title */}
          <Text style={styles.modalTitle}>Calculation Rules</Text>

          <RuleSection
            title="Exact calculation rule"
            formulas={[
              "mg/dl × 0.0555 = mmol/l",
              "mmol/l × 18.0182 = mg/dl",
            ]}
          />

          <View style={styles.sectionSeparator} />

          <RuleSection
            title="Approximate calculation rule"
            formulas={[
              "mg/dl ÷ 18 = mmol/l",
              "mmol/l × 18 = mg/dl",
            ]}
          />

          {/* OK Button */}
          <TouchableOpacity
            style={[styles.okButton, { backgroundColor: theme.colors.primary }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 28,
    },

    card: {
      borderRadius: 16,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 20,
      width: "100%",
      // Subtle shadow
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
    },

    modalTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 20,
    },

    sectionSeparator: {
      height: 16,
    },

    okButton: {
      marginTop: 20,
      paddingVertical: 13,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },

    okButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#ffffff",
      letterSpacing: 0.5,
    },
  });