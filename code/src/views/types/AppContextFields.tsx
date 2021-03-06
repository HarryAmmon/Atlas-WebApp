import {UserStoryFields} from "../../components/cards/UserStory/types";

export interface AppContextFields{
    UserStories :UserStoryFields[],
    SetUserStories :(UserStories :UserStoryFields[]) => void,
}