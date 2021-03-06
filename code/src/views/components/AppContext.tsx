import {createContext} from "react";
import { AppContextFields } from "../types/AppContextFields";
import {UserStoryFields} from "../../components/cards/UserStory/types";

export const AppContext = createContext<AppContextFields>({
    UserStories: [],
    SetUserStories :(UserStories :UserStoryFields[]) => {},
});