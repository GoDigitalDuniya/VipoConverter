import { useTheme } from "@/theme/ThemeProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  standard: string;
  table: string;
  title: string;
  onPress?: () => void;
};

export default function HardnessRow({
  standard,
  table,
  title,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      {/* Left */}
      <View style={styles.left}>
        <Text style={styles.standard}>{standard}</Text>
        <Text style={styles.table}>{table}</Text>
      </View>

      {/* Center */}
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>

      {/* Right Arrow */}
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },

    left: {
      width: 56,
    },

    standard: {
      fontWeight: "500",
      color: theme.colors.primary,
    },

    table: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },

    center: {
      flex: 1,
    },

    title: {
      fontSize: 12,
      color: theme.colors.text,
    },
  });