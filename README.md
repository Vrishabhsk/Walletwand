<img src="https://github.com/Vrishabhsk/Walletwand/blob/master/assets/adaptive-icon.png" width=150 /> 

# Walletwand
This is an expenditure manager app I've developed using React Native (Expo) and Typescript. In this app you can record your new expenditures category wise and also
add the date on which the transaction took place. You can modify it later on and if you wish to remove a partiuclar expense you can do that as well. The app also shows analytics in the form of a piechart
based on the expenses categorically. The app is currently only available for android devices only.

## Libraries Used:
```
Expo
Typescript
@react-native-async-storage/async-storage: Storing Expense locally
@react-native-community/datetimepicker:    selecting date stamp of expense
Context-API ( React ):                     State Management
@react-navigation:                         For navigation
short-uuid:                                ID for each expense
native-base:                               styling
react-native-paper:                        styling
react-native-chart-kit:                    For rendering pie-chart
```

## Instructions to get Started:
This app is open source. The master branch of this repo contains the expo app. I have also provided the react-native
version of this app in the [main branch](https://github.com/Vrishabhsk/Walletwand/tree/main).

To get started with expo app
- Install the expo-cli globally
```
npm install --global expo-cli
```
- Clone the Repo
```
git clone https://github.com/Vrishabhsk/Walletwand.git
```
- Install dependencies
```
npm install
```
- Run your android simulator and run this line
```
expo start
```
After running this line you will be prompted with options and you can choose the one suited to your need.
