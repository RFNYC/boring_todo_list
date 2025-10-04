import * as React from 'react';
import { AppRegistry, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { IconButton, MD3Colors, List } from 'react-native-paper';

const ButtonComponent = () => (
  <IconButton
    icon="camera"
    iconColor={MD3Colors.error50}
    size={20}
    onPress={() => console.log('Pressed')}
  />
);


const ListComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props}/>}
        description={"hello"}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title={"Instructions:"} left={props => <ButtonComponent/>} descriptionNumberOfLines={10} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      </List.Accordion>
    </List.Section>
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
      <Text>Hello World</Text>
      <MyComponent/>
      <ListComponent/>
    </PaperProvider>
  );
}