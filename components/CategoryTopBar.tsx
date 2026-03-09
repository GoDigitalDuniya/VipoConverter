import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useUnitSearchStore from '../src/store/useUnitSearchStore';
import useUnitFavoritesStore from '../store/useUnitFavoritesStore';
import { useTheme } from '../theme/ThemeProvider';

export default function CategoryTopBar() {
    const theme = useTheme();
    const favoritesFilterEnabled = useUnitFavoritesStore((state) => state.favoritesFilterEnabled);
    const toggleFavoritesFilter = useUnitFavoritesStore((state) => state.toggleFavoritesFilter);
    const leftSearch = useUnitSearchStore((state) => state.leftSearch);
    const rightSearch = useUnitSearchStore((state) => state.rightSearch);
    const setLeftSearch = useUnitSearchStore((state) => state.setLeftSearch);
    const setRightSearch = useUnitSearchStore((state) => state.setRightSearch);
    const clearLeftSearch = useUnitSearchStore((state) => state.clearLeftSearch);
    const clearRightSearch = useUnitSearchStore((state) => state.clearRightSearch);

    const [searchMode, setSearchMode] = useState(false);
    const [searchSide, setSearchSide] = useState<'left' | 'right' | null>(null);

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(anim, {
        toValue: searchMode ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
        }).start();
    }, [searchMode, anim]);

    const onPressLeftSearch = () => {
        setSearchSide('left');
        setSearchMode(true);
    };

    const onPressRightSearch = () => {
        setSearchSide('right');
        setSearchMode(true);
    };

    const exitSearch = (clear = false) => {
        setSearchMode(false);
        const activeSide = searchSide;
        setSearchSide(null);
        if (clear) {
            if (activeSide === 'left') clearLeftSearch();
            if (activeSide === 'right') clearRightSearch();
        }
    };

    const currentSearchText = searchSide === 'right' ? rightSearch : leftSearch;

    const handleSearchChange = (value: string) => {
        if (searchSide === 'right') {
            setRightSearch(value);
            return;
        }

        setLeftSearch(value);
    };

    const iconsOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
    const searchOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

    return (
        <View style={[styles.topSection, { borderBottomColor: theme.colors.border }]}> 
        <Animated.View pointerEvents={searchMode ? 'none' : 'auto'} style={[styles.absoluteFill, styles.iconsRow, { opacity: iconsOpacity }]}>
            <TouchableOpacity onPress={onPressLeftSearch} style={styles.iconTouch} accessibilityLabel="Search left">
            <MaterialCommunityIcons name="magnify" size={28} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFavoritesFilter} style={styles.iconTouch} accessibilityLabel="Favorites">
            <MaterialCommunityIcons
              name={favoritesFilterEnabled ? 'star' : 'star-outline'}
              size={28}
              color={favoritesFilterEnabled ? theme.colors.primary : theme.colors.text}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconTouch} accessibilityLabel="History">
            <MaterialCommunityIcons name="history" size={28} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressRightSearch} style={styles.iconTouch} accessibilityLabel="Search right">
                <MaterialCommunityIcons name="magnify" size={28} color={theme.colors.text} style={{ transform: [{ scaleX: -1 }] }} />
            </TouchableOpacity>   
        </Animated.View>

        <Animated.View pointerEvents={searchMode ? 'auto' : 'none'} style={[styles.absoluteFill, styles.searchRow, { opacity: searchOpacity }]}> 
            <TouchableOpacity onPress={() => exitSearch(false)} style={styles.iconTouch} accessibilityLabel="Back">
                        <MaterialCommunityIcons name="arrow-left" size={22} color={theme.colors.text} />
                        </TouchableOpacity>

                        <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.text} style={[styles.searchIcon, searchSide === 'right' ? { transform: [{ scaleX: -1 }] } : undefined]} />

                        <TextInput
                        placeholder="Search"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={currentSearchText}
                        onChangeText={handleSearchChange}
                        style={[styles.searchInput, { color: theme.colors.text, backgroundColor: theme.colors.background }]}
                        autoFocus={searchMode}
                        /><TouchableOpacity onPress={() => exitSearch(true)} style={styles.cancelTouch} accessibilityLabel="Cancel search">
            <Text style={[styles.cancelText, { color: theme.colors.primary }]}>Cancel</Text>
            </TouchableOpacity>
        </Animated.View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    topSection: {
        height: 64,
        position: 'relative',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    absoluteFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 64,
        justifyContent: 'center',
    },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    iconTouch: {
        padding: 10,
        borderRadius: 24,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    searchIcon: {
        marginHorizontal: 6,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 16,
    },
    cancelTouch: {
        paddingHorizontal: 8,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
    },
    });
