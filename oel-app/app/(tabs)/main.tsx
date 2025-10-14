import * as React from 'react';
import { AppRegistry, Text, View, StyleSheet, Animated } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { IconButton, MD3Colors, List } from 'react-native-paper';

/**
 * @param {{isExpanded: boolean, children: React.ReactNode}} props
 */
const AnimatedAccordionContent = ({ isExpanded, children }) => {
  // 1. Animated.Value to control the height
  const animatedHeight = React.useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentHeight > 0) {
      Animated.timing(animatedHeight, {
        toValue: isExpanded ? contentHeight : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded, contentHeight, animatedHeight]);

  const onLayout = React.useCallback((event) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height);
    }
  }, [contentHeight]);

  return (
    <Animated.View style={[styles.animatedWrapper, { height: animatedHeight }]}>
      <View onLayout={onLayout} style={styles.contentContainer}>
        {children}
      </View>
    </Animated.View>
  );
};

const ButtonComponent = () => (
  <IconButton
    icon="camera"
    iconColor={MD3Colors.error50}
    size={20}
    onPress={() => console.log('Pressed')}
  />
);

const ListComponent = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
      <List.Accordion
        title="First Animated Accordion"
        left={props => <List.Icon {...props} icon="folder"/>}
        description={expanded ? "Click to collapse" : "Click to expand"}
        expanded={expanded}
        onPress={handlePress}
      >
        <AnimatedAccordionContent isExpanded={expanded}>
          <List.Item
            title={"Instructions:"}
            left={props => <ButtonComponent />}
            descriptionNumberOfLines={10}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </AnimatedAccordionContent>
      </List.Accordion>
  );
};

const MyComponent = () => (
  <IconButton
    icon="camera"
    iconColor={MD3Colors.error50}
    size={20}
    onPress={() => console.log('Pressed')}
  />
);

export default function Main() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Hello World</Text>
        <MyComponent/>
        <ListComponent/>
        <ListComponent/>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1, // 
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    animatedWrapper: {
        overflow: 'hidden', 
    },
    contentContainer: {
        position: 'absolute', 
        top: 0, 
        width: '100%',
    }
});