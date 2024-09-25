import { registerSheet } from 'react-native-actions-sheet';
import ChatGptSheet from './components/chatGptSheet/chatGptSheet';
import ChangeExeciseModal from './screens/FeedStack/CreateFeed/screenComponents/ChangeExeciseModal/ChangeExeciseModal';
import SendWorkoutSheet from './components/sendWorkoutSheet/SendWorkoutSheet';
import SendRecipeSheet from './components/sendRecipeSheet/SendRecipeSheet';
import ExerciseListSheet from './components/exerciseListSheet/ExerciseListSheet';
import CommentSheet from './components/commentSheet/CommentSheet';
import FeedShareSheet from "./components/feedShareSheet/FeedShareSheet"
import CategoriesSheet from './components/categoriesSheet/CategoriesSheet';
import BodyPartsSheet from './components/bodyPartsSheet/BodyPartsSheet';
import ShowGroupMembers from './components/showMembersSheet/ShowMembersSheet';
import WithdrawSheet from './components/withdrawSheet/WithdrawSheet';
import AlbumsSheet from './components/albumsSheet/albumsSheet';
import RegionsSheet from './components/regionsSheet/RegionsSheet';

registerSheet('chatGptSheet', ChatGptSheet);
registerSheet('changeExeciseSheet', ChangeExeciseModal);
registerSheet('sendWorkoutSheet', SendWorkoutSheet);
registerSheet('sendRecipeSheet', SendRecipeSheet);
registerSheet('exerciseListSheet', ExerciseListSheet);
registerSheet('commentSheet', CommentSheet);
registerSheet('feedShareSheet', FeedShareSheet);
registerSheet('categoriesSheet', CategoriesSheet);
registerSheet('bodyPartsSheet', BodyPartsSheet);
registerSheet('showGroupMembers', ShowGroupMembers);
registerSheet('withdrawSheet', WithdrawSheet);
registerSheet('albumsSheet', AlbumsSheet);
registerSheet('regionsSheet', RegionsSheet);
export { };

