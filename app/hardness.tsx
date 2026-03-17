import { useTheme } from "@/theme/ThemeProvider";
import { FlatList, StyleSheet, View } from "react-native";
import HardnessRow from "../src/features/hardness/components/HardnessRow";
import { hardnessData } from "../src/features/hardness/data/hardnessData";

export default function HardnessScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <FlatList
        data={hardnessData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HardnessRow
            standard={item.standard}
            table={item.table}
            title={item.title}
            onPress={() => {
              // TODO: Navigation later
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    listContent: {
      backgroundColor: theme.colors.background,
    },
  });