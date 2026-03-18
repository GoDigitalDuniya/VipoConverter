import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { getCategoryType } from "../../src/conversion/registry/categoryRegistry";
import { prettyName } from "../../src/utils/stringUtils";
import BMIScreen from "./screens/category-types/BMIScreen";
import BusinessScreen from "./screens/category-types/BusinessScreen";
import GlucoseScreen from "./screens/category-types/GlucoseScreen";
import MappingScreen from "./screens/category-types/MappingScreen";
import NumberSystemScreen from "./screens/category-types/NumberSystemScreen";
import PaceScreen from "./screens/category-types/PaceScreen";
import PercentageScreen from "./screens/category-types/PercentageScreen";
import PowerPlugScreen from "./screens/category-types/PowerPlugScreen";
import StandardCategoryScreen from "./screens/category-types/StandardCategoryScreen";
import TimezoneScreen from "./screens/category-types/TimezoneScreen";

/**
 * CategoryScreen: Router for different category types
 *
 * This screen routes to different UI implementations based on category type:
 * - "standard" → StandardCategoryScreen (2-column unit converter)
 * - Other types → Placeholder screens (to be implemented)
 */
export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoryKey = category || "data";
  const displayName = prettyName(category);
  const categoryType = getCategoryType(categoryKey);

  // Render the appropriate screen based on category type
  const renderScreen = useMemo(() => {
    switch (categoryType) {
      case "standard":
        return (
          <StandardCategoryScreen
            categoryKey={categoryKey}
            displayName={displayName}
          />
        );
      // BMI Calculator  
      case "calculator":
        return <BMIScreen categoryKey={categoryKey} />;
      // Clothing, Show Size 
      case "mapping":
        return <MappingScreen categoryKey={categoryKey} />;
      // Timezone
      case "timezone":
        return <TimezoneScreen categoryKey={categoryKey} />;
      // power plug types
      case "power_plug":
        return <PowerPlugScreen categoryKey={categoryKey} />;
      //percentage
      case "percentage":
        return <PercentageScreen categoryKey={categoryKey} />;
      // pace
      case "pace":
        return <PaceScreen categoryKey={categoryKey} />;
      // number system
      case "number_system":
        return <NumberSystemScreen categoryKey={categoryKey} />;
      // glucose
      case "glucose":
        return <GlucoseScreen categoryKey={categoryKey} />;
      // business CAGR
      case "business":
        return <BusinessScreen categoryKey={categoryKey} />;

      default:
        return <StandardCategoryScreen categoryKey={categoryKey} displayName={displayName} />;
    }
  }, [categoryType, categoryKey, displayName]);

  return renderScreen;
}