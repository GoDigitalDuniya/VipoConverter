import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSettingsStore from '../store/useSettingsStore';
import { useTheme } from '../theme/ThemeProvider';

const DIGIT_OPTIONS = [0, 1, 2, 3, 4, 5, 6];

export default function SettingsScreen() {
  const themeMode = useSettingsStore((s) => s.theme);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const dashboardStyle = useSettingsStore((s) => s.dashboardStyle);
  const setDashboardStyle = useSettingsStore((s) => s.setDashboardStyle);
  const numberOfDigits = useSettingsStore((s) => s.numberOfDigits);
  const setNumberOfDigits = useSettingsStore((s) => s.setNumberOfDigits);

  const t = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const formatDigits = (value: number) => {
    if (value === 0) return '0';
    return `0,${'0'.repeat(value)}`;
  };

  const onToggleTheme = () => toggleTheme();
  const onToggleDashboard = () => setDashboardStyle(dashboardStyle === 'grid' ? 'list' : 'grid');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.colors.background, paddingTop: 0, paddingBottom: 0 }]}>
      <View style={[styles.section] }>
        <SettingsRow
          label="Theme"
          value={themeMode === 'dark' ? 'Dark' : 'Light'}
          onPress={onToggleTheme}
          textColor={t.colors.text}
          valueColor={t.colors.primary}
        />

        <SettingsRow
          label="Number of digits"
          value={formatDigits(numberOfDigits)}
          onPress={() => setModalVisible(true)}
          textColor={t.colors.text}
          valueColor={t.colors.primary}
        />

        <SettingsRow
          label="Dashboard style"
          value={dashboardStyle === 'grid' ? 'Grid View' : 'List View'}
          onPress={onToggleDashboard}
          textColor={t.colors.text}
          valueColor={t.colors.primary}
        />
      </View>

    <View style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 12 }}
        ListHeaderComponent={
          <View style={styles.disclaimerSection}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.disclaimerLink, { color: t.colors.text }]}>Disclaimer</Text>
              <Text style={[styles.disclaimerLink, { color: t.colors.primary }]}>Privacy Notice</Text>
            </View>

            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>------------------------</Text>
            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>Hardness Conversion</Text>
            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>------------------------</Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>The results of this application are based on ISO Standard 18265:2003 and ASTM E-140-07.</Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>Hardness conversions are no substitute for direct measurements. These tables should be used with caution.</Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>Note: Values in parentheses are those lying outside the defined range of the standard test method but which may be used as estimates.</Text>

            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>------------------------</Text>
            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>Hardness & Unit Converter</Text>
            <Text style={[styles.separator, { color: t.colors.text, marginVertical: 0 }]}>------------------------</Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>Although every effort has been made to ensure the accuracy of the information within this application, it is your responsibility to verify the accuracy of any and all data presented. </Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>Trelleborg Sealing Solutions makes no representations or warranties of any kind, expressed or implied, of the completeness, accuracy, reliability or suitability of the information provided by this application. Any reliance placed on the information obtained through this application is strictly at your own risk. </Text>

            <Text style={[styles.disclaimerText, { color: t.colors.text }]}>In no event will Trelleborg Sealing Solutions be held liable for damages of any kind.</Text>
          </View>
        }
      />
    </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: t.name === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }]}>
          <View style={[styles.modalContainer, { backgroundColor: t.colors.surface }]}>
            <Text style={[styles.modalTitle, { color: t.colors.text, borderBottomColor: t.colors.border }]}>Select number of digits</Text>

            <FlatList
              data={DIGIT_OPTIONS}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalRow, { borderBottomColor: t.colors.border }]}
                  onPress={() => {
                    setNumberOfDigits(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalOption, { color: t.colors.text }]}> 
                    {formatDigits(item)}
                  </Text>

                  <MaterialCommunityIcons
                    name={
                      numberOfDigits === item
                        ? 'radiobox-marked'
                        : 'radiobox-blank'
                    }
                    size={22}
                    color={numberOfDigits === item ? t.colors.primary : t.colors.border}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const SettingsRow = ({
  label,
  value,
  onPress,
  textColor,
  valueColor,
}: {
  label: string;
  value: string;
  onPress: () => void;
  textColor?: string;
  valueColor?: string;
}) => (
  <TouchableOpacity style={[styles.row, { borderBottomColor: '#ccc' }]} onPress={onPress}>
    <Text style={[styles.rowLabel, { color: textColor || '#222' }]}>{label}</Text>
    <Text style={[styles.rowValue, { color: valueColor || '#b48a2c' }]}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
  },

  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowLabel: {
    fontSize: 16,
  },

  rowValue: {
    fontSize: 16,
    fontWeight: '500',
  },

  disclaimerSection: {
    padding: 12,
  },

  disclaimerLink: {
    marginBottom: 10,
  },

  separator: {
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: '600',
  },

  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  modalContainer: {
    borderRadius: 8,
    paddingVertical: 12,
  },

  modalTitle: {
    fontSize: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  modalRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalOption: {
    fontSize: 16,
  },
});
