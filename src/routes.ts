/**
 * routes.ts
 * 
 * Defines the routes for the app
 * location of definitions for screen navigation and names
 */
import { StackScreenProps } from "@react-navigation/stack";
import { PhotoFile } from "react-native-vision-camera";

/**
 * Defines the parameters to a screen
 * 
 * ::App Route Plan::
 * 
 * HomeScreen: choose LP type 4000 or 8000
 * 
 * BattleScreen: two buttons with animations for LPs
 * 
 * CalculationScreen: edit LP counter.
 */
export type IStackParamList = {
    [route_names.CAMERA_SCREEN]: undefined,
    [route_names.IMAGE_EDITOR_SCREEN]: {image_photo_file: PhotoFile}
};

export interface IRoutes {
    CAMERA_SCREEN: "Camera",
    IMAGE_EDITOR_SCREEN: "Image Editor"
};

//defined route names
const route_names: IRoutes = {
    CAMERA_SCREEN: "Camera",
    IMAGE_EDITOR_SCREEN: "Image Editor"
};

// Stack Screen Props. ie provides parameter information and such when within a screen
export type ICameraScreenProps = StackScreenProps<IStackParamList, typeof route_names.CAMERA_SCREEN>;
export type IImageEditorScreenProps = StackScreenProps<IStackParamList, typeof route_names.IMAGE_EDITOR_SCREEN>;

export default route_names;