/**
 * @format
 */

import {AppRegistry, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict:false,
});

if(Text.defaultProps){
    Text.defaultProps.allowFontScaling=false;
}else{
    Text.defaultProps={},
    Text.defaultProps.allowFontScaling=false
}
if(Text.defaultProps){
    Text.defaultProps.allowFontScaling=false;
}else{
    Text.defaultProps={},
    Text.defaultProps.allowFontScaling=false
}

Text.defaultProps={}
TextInput.defaultProps={}
AppRegistry.registerComponent(appName, () => App);
