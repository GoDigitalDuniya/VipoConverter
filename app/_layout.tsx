import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import type { JSX } from "react";
import React, { createContext, useMemo, useRef, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useConversionHistoryStore from "../src/store/useConversionHistoryStore";
import useCurrencyRatesStore from "../src/store/useCurrencyRatesStore";
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

function toExpoStatusBarStyle(style: string | undefined): StatusBarStyle {
  if (style === "dark-content") return "dark";
  if (style === "light-content") return "light";
  return (style ?? "auto") as StatusBarStyle;
}

function LayoutContent(): JSX.Element {
  const segments = useSegments();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [overrideTitle, setOverrideTitle] = useState<string | undefined>(undefined);
  // Store the measured position of the "more" button so we can anchor the menu to it
  const [menuAnchor, setMenuAnchor] = useState<{ top: number; right: number } | null>(null);
  const moreButtonRef = useRef<View>(null);
  const t = useTheme();
  const clearHistory = useConversionHistoryStore((state) => state.clearHistory);
  const fetchCurrencyRates = useCurrencyRatesStore((state) => state.fetchRates);
  const backgroundColor = t.colors.background;
  const statusBarStyle = toExpoStatusBarStyle(t.statusBarStyle);
  const isHistoryRoute = segments?.[0] === "history";

  React.useEffect(() => {
    fetchCurrencyRates();
  }, [fetchCurrencyRates]);

  const title = useMemo(() => overrideTitle ?? getActiveRouteName(segments), [segments, overrideTitle]);
  const activeKey: RouteName = (segments && segments.length > 0 ? (segments[segments.length - 1] as RouteName) : 'converter');

  const menuItems: { key: MenuRouteName; label: string }[] = [
    { key: "converter", label: ROUTE_META.converter.label ?? ROUTE_META.converter.title },
    { key: "hardness", label: ROUTE_META.hardness.label ?? ROUTE_META.hardness.title },
    { key: "videos", label: ROUTE_META.videos.label ?? ROUTE_META.videos.title },
    { key: "contact", label: ROUTE_META.contact.label ?? ROUTE_META.contact.title },
  ];

  /**
   * Measure the "more options" button's absolute screen position using
   * `measureInWindow`. This is the correct approach for Modals on both iOS
   * and Android because the Modal renders outside the normal view hierarchy —
   * `onLayout` coordinates are relative to the parent and won't match.
   */
  const handleOpenMenu = () => {
    if (moreButtonRef.current) {
      moreButtonRef.current.measureInWindow((x, y, width, height) => {
        setMenuAnchor({ top: y + height + 4, right: x + width });
        setMenuVisible(true);
      });
    } else {
      setMenuVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={["top", "right", "left", "bottom"]}>
      <StatusBar style={statusBarStyle} backgroundColor={backgroundColor} translucent={false} />

      <View style={[styles.header, { backgroundColor, paddingTop: 0, borderBottomColor: t.colors.border }]}>
        <View style={[styles.left, { width: 70 }]}>
          <Image
            source={require("../assets/images/app-logo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.center}>
          <Text numberOfLines={1} style={[styles.title, { color: t.colors.text }]}>
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

          {/* Attach ref here so we can measure its exact screen position */}
          <TouchableOpacity
            ref={moreButtonRef as any}
            accessibilityLabel="Open more menu"
            onPress={handleOpenMenu}
            style={styles.iconButton}
          >
            <Ionicons name="ellipsis-vertical" size={22} color={t.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor }}>
        <TitleContext.Provider value={{ setTitle: setOverrideTitle }}>
          <Slot />
        </TitleContext.Provider>
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuVisible(false)}
        // `statusBarTranslucent` ensures the modal covers the full screen on
        // Android so our absolute coordinates (from measureInWindow) line up.
        statusBarTranslucent
      >
        {/* Full-screen invisible tap-away overlay */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        />

        {/* Menu positioned absolutely at the measured anchor.
            top  = just below the button
            left = buttonRightFromLeft - MENU_WIDTH so the menu's right edge
                   aligns with the button's right edge, clamped to avoid
                   going off-screen on the left. */}
        {menuAnchor && (
          <View
            style={[
              styles.menuContainer,
              {
                backgroundColor: t.colors.surface,
                borderColor: t.colors.border,
                borderWidth: StyleSheet.hairlineWidth,
                top: menuAnchor.top,
                left: Math.max(8, menuAnchor.right - MENU_WIDTH),
              },
            ]}
          >
            <MenuContent
              menuItems={menuItems}
              activeKey={activeKey}
              t={t}
              onClose={() => setMenuVisible(false)}
              onNavigate={(key) => {
                setMenuVisible(false);
                if (key !== activeKey) router.push(`/${key}` as MenuRouteName);
              }}
            />
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

/**
 * Separate component so we can use onLayout to get the menu's own width,
 * which lets us right-align it precisely against the anchor button.
 */
function MenuContent({
  menuItems,
  activeKey,
  t,
  onNavigate,
}: {
  menuItems: { key: MenuRouteName; label: string }[];
  activeKey: string;
  t: ReturnType<typeof useTheme>;
  onClose: () => void;
  onNavigate: (key: MenuRouteName) => void;
}) {
  return (
    <>
      {menuItems.map((it) => (
        <TouchableOpacity
          key={it.key}
          style={styles.menuItem}
          onPress={() => onNavigate(it.key)}
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
    </>
  );
}

const MENU_WIDTH = 160;

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
  logo: { width: 70, height: 70 },
  title: { fontSize: 18, fontWeight: "600" },
  iconButton: { marginLeft: 6, padding: 3 },
  menuContainer: {
    position: "absolute",
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: MENU_WIDTH,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuText: { fontSize: 15 },
});