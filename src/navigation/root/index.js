import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainScreen from "../../screens/MainScreen";
import AddTaskScreen from "../../screens/AddTaskScreen";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen options={{headerShown: false}} name="Main" component={MainScreen}/>
            <Stack.Screen options={{headerShown: false}} name="AddTask" component={AddTaskScreen}/>
        </Stack.Navigator>
    );
}

export default RootNavigation;