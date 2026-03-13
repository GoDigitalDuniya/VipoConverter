import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter, useSegments } from "expo-router";
import type { JSX } from "react";
import React, { createContext, useMemo, useState } from "react";
import {
  Image,
  Modal,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import useConversionHistoryStore from "../src/store/useConversionHistoryStore";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";

type RouteName = "converter" | "hardness" | "videos" | "contact" | "settings" | "calculator" | "history";
type MenuRouteName = "converter" | "hardness" | "videos" | "contact";

const ROUTE_META: Record<RouteName, { title: string; label?: string }> = {
  converter: { title: "Converter", label: "Converter" },
  hardness: { title: "Hardness", label: "Hardness" },
  videos: { title: "Videos", label: "Videos" },
  contact: { title: "Contact", label: "Contact" },
  settings: { title: "Settings & Privacy", label: "Settings" },
  calculator: { title: "Calculator" },
  history: { title: "History" },
};

function getActiveRouteName(segments: string[]) {
  if (!segments || segments.length === 0) return ROUTE_META.converter.title;
  const last = segments[segments.length - 1];
  const key = (last || "converter") as RouteName;
  return ROUTE_META[key]?.title ?? ROUTE_META.converter.title;
}

export const TitleContext = createContext<{ setTitle: (v?: string) => void }>({ setTitle: () => {} });

export default function RootLayout(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function LayoutContent(): JSX.Element {
  const segments = useSegments();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [overrideTitle, setOverrideTitle] = useState<string | undefined>(undefined);
  const insets = useSafeAreaInsets();
  const t = useTheme();
  const clearHistory = useConversionHistoryStore((state) => state.clearHistory);
  const backgroundColor = t.colors.background;
  const statusBarStyle = t.statusBarStyle;
  const isHistoryRoute = segments?.[0] === "history";

  const title = useMemo(() => overrideTitle ?? getActiveRouteName(segments), [segments, overrideTitle]);
  const activeKey: RouteName = (segments && segments.length > 0 ? (segments[segments.length - 1] as RouteName) : 'converter');

  const menuItems: { key: MenuRouteName; label: string }[] = [
    { key: "converter", label: ROUTE_META.converter.label ?? ROUTE_META.converter.title },
    { key: "hardness", label: ROUTE_META.hardness.label ?? ROUTE_META.hardness.title },
    { key: "videos", label: ROUTE_META.videos.label ?? ROUTE_META.videos.title },
    { key: "contact", label: ROUTE_META.contact.label ?? ROUTE_META.contact.title },
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={["top", "right", "left"]}>
      <RNStatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} translucent={false} />

      <View style={[styles.header, { backgroundColor, paddingTop: 0, borderBottomColor: t.colors.border }]}> 
        <View style={[styles.left, { width: 70 }]}> 
          <Image
            source={require("../assets/images/app-logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.center}>
            <Text numberOfLines={1} style={[styles.title, { color: t.colors.text}]}>
            {title}
            </Text>
        </View>

        <View style={styles.right}>
          {isHistoryRoute && (
            <TouchableOpacity
              accessibilityLabel="Clear history"
              onPress={clearHistory}
              style={styles.iconButton}
            >
              <Ionicons name="trash-outline" size={30} color={t.colors.primary} />
            </TouchableOpacity>
          )}

          {!isHistoryRoute && activeKey !== 'settings' && (
            <TouchableOpacity
              accessibilityLabel="Open settings"
              onPress={() => router.push('/settings')}
              style={styles.iconButton}
            >
              <Ionicons name="settings" size={30} color={t.colors.primary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            accessibilityLabel="Open more menu"
            onPress={() => setMenuVisible(true)}
            style={styles.iconButton}
          >
            <Ionicons name="ellipsis-vertical" size={22} color={t.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor, paddingBottom: insets.bottom }}>
        <TitleContext.Provider value={{ setTitle: setOverrideTitle }}>
          <Slot />
        </TitleContext.Provider>
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={[
            styles.modalOverlay,
            { backgroundColor: t.name === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.2)" },
          ]}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuContainer,
              { backgroundColor: t.colors.surface, borderColor: t.colors.border, borderWidth: StyleSheet.hairlineWidth },
            ]}
          >
            {menuItems.map((it) => (
              <TouchableOpacity
                key={it.key}
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  if (it.key !== activeKey) router.push(`/${it.key}` as const);
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    { color: it.key === activeKey ? t.colors.primary : t.colors.text },
                  ]}
                >
                  {it.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  left: { width: 40, justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  right: { width: 80, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
  appIcon: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#ddd" },
  logo: { width: 70, height: 70 },
  title: { fontSize: 18, fontWeight: "600" },
  iconButton: { marginLeft: 6, padding: 3 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "flex-start" },
  menuContainer: { marginRight: 12, alignSelf: "flex-end", borderRadius: 8, paddingVertical: 8, minWidth: 160, elevation: 4, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 8 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuText: { fontSize: 15 },
});
