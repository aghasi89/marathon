import {useEffect, useState, useCallback, useContext} from 'react';
import {useSelector} from 'react-redux';
import {languageListSelector} from '../../../../../../store/selectors/marathons-selector';
import {ILanguageList} from '../../../../../../types/types';
import {StateContext, StateContextType} from '../../../../contexts';

export const props = navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const [searchText, setSearchText] = useState<string>('');
  const languageList = useSelector(languageListSelector);
  const [languages, setLanguages] = useState<Array<ILanguageList>>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<
    Array<ILanguageList>
  >([]);
  const newList = languageList?.map(item => JSON.parse(JSON.stringify(item)));
  const newSelected = state.selectedLanguages?.map(item =>
    JSON.parse(JSON.stringify(item)),
  );

  useEffect(() => {
    if (languageList && newList) {
      setLanguages(newList);
    }
    if (
      state.selectedLanguages &&
      state.selectedLanguages.length > 0 &&
      newSelected
    ) {
      setSelectedLanguages(newSelected);
      newSelected.map(selected => {
        newList?.map(item => {
          if (item.id === selected.id) {
            item.checked = selected.checked;
          }
        });
      });
    }
  }, [languageList, state.selectedLanguages]);
  const filterText = useCallback((text: string) => {
    setSearchText(text);
  }, []);
  const search = useCallback(
    (searchItem: ILanguageList) => {
      return (
        searchText.toLowerCase() ===
          searchItem.title
            .slice(0, searchText.length)
            .toString()
            .toLowerCase() || searchText === ''
      );
    },
    [searchText],
  );
  const checkIsSubmited = useCallback(
    (id: number) => {
      let isSubmited = selectedLanguages.find(item => item.id == id);
      if (isSubmited) {
        return true;
      }
      return false;
    },
    [selectedLanguages],
  );
  const selectCategory = useCallback(
    (category: ILanguageList) => {
      if (!checkIsSubmited(category.id)) {
        setSelectedLanguages([...selectedLanguages, category]);
      } else {
        let array = [...selectedLanguages];
        const findIndex = array.findIndex(element => {
          return element.id == category.id;
        });
        array.splice(findIndex, 1);
        setSelectedLanguages(array);
      }
    },
    [selectedLanguages],
  );
  const onLanguageSelect = useCallback(
    (language: ILanguageList) => {
      const newList = [...languageList];
      newList.map(item => {
        if (item.id === language.id) {
          item.checked = !item.checked;
        }
      });
      setLanguages(newList);
      selectCategory(language);
    },
    [languageList, selectedLanguages],
  );
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onSaveSelectedLanguages = useCallback(() => {
    navigation.navigate('CreateGroupMarathon', {
      languageList: state.selectedLanguages,
    });
    dispatchState &&
      dispatchState({
        type: 'SET_MARATHON_LANGUAGE',
        payload: selectedLanguages,
      });
  }, [navigation, selectedLanguages]);
  return {
    searchText,
    filterText,
    languages,
    onLanguageSelect,
    leftIconPress,
    onSaveSelectedLanguages,
    search,
  };
};
export default props;
