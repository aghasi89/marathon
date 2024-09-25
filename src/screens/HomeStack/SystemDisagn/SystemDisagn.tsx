import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import Loading from '../../../components/loading/Loading';
import SliderLine from '../../../components/sliderLine/SliderLine';
import SwitchComponenet from '../../../components/switch/SwitchComponenet';
import {PrimeryButton} from '../../../components/buttons';
import styles from './SystemDisagn.style';
import TextWithIcon from '../../../components/textWithicon/TextWithIcon';
import Progress from '../../../components/progress/Progress';
import TextInputComponent from '../../../components/textInput/TextInputComponent';
import HeaderWithImage from '../../../components/headerWithImage/HeaderWithImage';
import ChipsGroup from '../../../components/chipsGroup/ChipsGroup';
import SelectColor from '../../../components/selectColor/SelectColor';
import TabNavigationHeader from '../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import {
  green,
  inputBorder,
  lightRed,
  primaryBlack,
  purple,
} from '../../../assets/styles/colors.styles';
import DropDownComponent from '../../../components/dropDown/DropDown';
import NumberInput from '../../../components/numberInput/NumberInput';
import FileInfoCard from '../../../components/fileInfoCard/FileInfoCard';
import MultiSelectSelectedChips from '../../../components/multiSelect/MultiSelectSelectedChips';
import SegmentedHeader from '../../../components/headers/segmentedHeader/SegmentedHeader';
import UserProgressCard from '../../../components/userProgressCard/userProgressCard';
import MultiSelectChips from '../../../components/multiSelect/MultiSelectChips';
import IngredientsItem from '../../../components/IngredientsItem/IngredientsItem';
import Toaster from '../../../components/toester/Toester';
import PlusButton from '../../../components/plusButton/plusButton';
import VideoInfoCard from '../../../components/videoInfoCard/VideoInfoCard';
import BottomBar from '../../../components/bottomBar/BottomBar';
import ActivitiesCard from '../../../components/activitiesCard/ActivitiesCard';
import UpploadButton from '../../../components/uploadbutton/UploadButton';
import {calcWidth} from '../../../assets/dimensions';
import AddToDo from '../../../components/addToDo/AddToDo';
import TagCard from '../../../components/tagCard/TagCard';
import UserInfoCard from '../../../components/userInfoCard/UserInfoCard';
import FoodCard from '../../../components/foodCard/FoodCard';
import Search from '../../../components/search/Search';
import RecentInfoCard from '../../../components/recentInfoCard/RecentInfoCard';
import EditSheet from '../../../components/editSheet/EditSheet';
import Stepper from '../../../components/stepper/Stepper';
import VideoExerciseCard from '../../../components/videoExerciseCard/VideoExerciseCard';
import BottomButtonGroup from '../../../components/buttonGroup/BottomButtonGroup';
import ButtonGroup from '../../../components/buttonGroup/ButtonGroup';
enum ToDoTypes {
  eat,
  play,
  file,
  edit,
  size,
  live,
  rest,
}
const DesignSystemItem = ({title, children}) => {
  return (
    <View style={styles.itemsContainer}>
      <Text style={styles.item}>{title}</Text>
      {children}
    </View>
  );
};
const SystemDisagn: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState(0);
  const [textInputValue, setTextInputValue] = useState('');
  const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg';
  const chiprGroupItems = [
    {title: 'SystemDisagn', Icon: <Icons.Clock />},
    {title: 'Marathons', Icon: <Icons.Close fill={'red'} />},
    {title: 'Nutrition'},
    {title: 'Programs'},
  ];
  const chipsGroupItems = [
    {title: '20 min', id: 0, iconType: 'clock'},
    {title: 'French', id: 1},
    {title: 'Gluten Free', id: 2},
    {title: 'Egg Free', id: 3},
  ];

  const appleimageUrl =
    'https://cdn1.vectorstock.com/i/1000x1000/96/55/red-apple-vector-679655.jpg';
  const list = [
    {
      value: '1',
      lable: 'Gram 1',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '2',
      lable: 'Gram 2',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '3',
      lable: 'Gram 3',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '4',
      lable: 'Gram 4',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
    {
      value: '5',
      lable: 'Gram 5',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
  ];
  const [selected, setSelected] = useState('1');
  const selectedList = [
    {
      value: '1',
      lable: 'Gram 1',
    },
    {
      value: '2',
      lable: 'Gram 2',
    },
    {
      value: '3',
      lable: 'Gram 3',
    },
    {
      value: '4',
      lable: 'Gram 4',
    },
    {
      value: '5',
      lable: 'Gram 5',
    },
  ];
  const [selectedText, setSelectedText] = useState('1');
  const colorList = [
    '#000000',
    '#C0C0C0',
    '#808080',
    '#000080',
    '#800080',
    '#FF00FF',
    '#008000',
    '#00FF00',
    '#808000',
    '#FFFF00',
  ];
  const [selectedColor, setSelectedColor] = useState('');
  const [valueNumber, setValueNumber] = useState('');
  const listForMultiSelect = [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const checksetSelectedItems = (selectedItem: any) => {
    for (let index = 0; index < selectedItems.length; index++) {
      if (selectedItems[index].id === selectedItem.id) {
        let list = [...selectedItems];
        list.splice(index, 1);
        setSelectedItems(list);
        return;
      }
    }
    setSelectedItems([...selectedItems, selectedItem]);
  };
  const deleteItem = (value: any) => {
    for (let index = 0; index < selectedItems.length; index++) {
      if (selectedItems[index].id === value.id) {
        let list = [...selectedItems];
        list.splice(index, 1);
        setSelectedItems(list);
      }
    }
  };
  const [seletedSegmendIndex, setSelectedSegmentIndex] = useState<number>(0);
  const [isVisibleSwiper, setisVisibleSwiper] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState(false);
  const [active, setActive] = useState(0);

  const MyComponent = (props: any) => {
    return (
      <View style={styles.myComponentContainer}>
        <Text style={styles.myComponenetText}>{props.title}</Text>
      </View>
    );
  };
  const content = [
    <MyComponent title="Component 1" />,
    <MyComponent title="Component 2" />,
    <MyComponent title="Component 3" />,
    <MyComponent title="Component 4" />,
  ];
  return (
    <ScrollView style={styles.container}>
      <DesignSystemItem title={'TabNavigator'}>
        <TabNavigationHeader data={chiprGroupItems} />
      </DesignSystemItem>
      <DesignSystemItem title={'Icon'}>
        <Icons.Clock />
      </DesignSystemItem>
      <DesignSystemItem title={'Switch'}>
        <SwitchComponenet
          checked={checked}
          setChecked={(value: boolean) => {
            setChecked(value);
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Slider Line'}>
        <View style={styles.sliderContainer}>
          <SliderLine
            value={value}
            setValue={(val: number) => {
              setValue(val);
            }}
            maximumValue={100}
            minimumValue={0}
            step={1}
          />
        </View>
      </DesignSystemItem>

      <DesignSystemItem title={'OutLineButton'}>
        <PrimeryButton
          title="Save changes"
          type="outline"
          onPress={() => {}}
          style={styles.button}
          Icon={<Icons.Account />}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'DefaultButton'}>
        <PrimeryButton
          title="Save changes"
          type="default"
          onPress={() => {}}
          style={styles.button}
          Icon={<Icons.CheckIcon />}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'DefaultButton'}>
        <PrimeryButton
          title="Save changes"
          type="default"
          onPress={() => {}}
          style={styles.button}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Loading'}>
        <Loading />
      </DesignSystemItem>
      <DesignSystemItem title={'Text with icon'}>
        <TextWithIcon icon={<Icons.Image />} text={'Cooking Steps'} />
      </DesignSystemItem>
      <DesignSystemItem title={'Progress'}>
        <Progress title="Calories" percent={15} point={'kcal'} />
      </DesignSystemItem>
      <DesignSystemItem title={'TextInput'}>
        <View style={styles.textInputContainer}>
          <TextInputComponent
            value={textInputValue}
            onChangetext={(value: string) => {
              setTextInputValue(value);
            }}
            close={() => {}}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'Header with image '}>
        <View style={styles.headerWithImageContainer}>
          <HeaderWithImage source={{uri: imageUrl}} />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'Header with image from left  icon'}>
        <View style={styles.headerWithImageContainer}>
          <HeaderWithImage
            source={{uri: imageUrl}}
            leftIcon={<Icons.CheckIcon />}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'Header with image from right  icon'}>
        <View style={styles.headerWithImageContainer}>
          <HeaderWithImage
            source={{uri: imageUrl}}
            rightIcon={<Icons.CheckIcon />}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'Header with image from left and right icons'}>
        <View style={styles.headerWithImageContainer}>
          <HeaderWithImage
            source={{uri: imageUrl}}
            leftIcon={<Icons.CheckIcon />}
            rightIcon={<Icons.CheckIcon />}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'ChipsGroup items with horizontal scrolling'}>
        <ChipsGroup elements={chipsGroupItems} />
      </DesignSystemItem>
      <DesignSystemItem title={'DropDown with inside image'}>
        <View style={styles.dropDownContainer}>
          <DropDownComponent
            list={list}
            selected={selected}
            setSelected={value => {
              setSelected(value);
            }}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'DropDown'}>
        <View style={styles.dropDownContainerWithoutImage}>
          <DropDownComponent
            list={selectedList}
            selected={selectedText}
            setSelected={value => {
              setSelectedText(value);
            }}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'Select Color'}>
        <SelectColor
          colorList={colorList}
          selectedColor={selectedColor}
          onSelectColor={(value: string) => {
            setSelectedColor(value);
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'BottomButtonGroup save and Cancel'}>
        <BottomButtonGroup
          firstTitle="Cancel"
          secondTitle="Save"
          onFirstButtonPress={() => {}}
          onSecondButtonPress={() => {}}
          firstTitleColor={primaryBlack}
          secondTitleColor={inputBorder}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ButtonGroup'}>
        <ButtonGroup
          firstTitle="Upload"
          secondTitle="Youtube"
          onFirstButtonPress={() => {}}
          onSecondButtonPress={() => {}}
          firstTitleColor={primaryBlack}
          secondTitleColor={inputBorder}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Number Input'}>
        <View style={styles.numberInputContainer}>
          <NumberInput
            value={valueNumber}
            onChangeValue={(val: string) => {
              setValueNumber(val);
            }}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'File upload card'}>
        <FileInfoCard
          fileName="File Name"
          fileType="PNG"
          onClose={() => {}}
          image={
            'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg'
          }
        />
      </DesignSystemItem>
      <DesignSystemItem title={'File upload card'}>
        <FileInfoCard fileName="File Name" fileType="PDF" onClose={() => {}} />
      </DesignSystemItem>

      <DesignSystemItem title={'SegmentedHeader'}>
        <SegmentedHeader
          selectedIndex={seletedSegmendIndex}
          lebalList={['Recent', 'Library', 'Tags', 'Bookmarks']}
          onChange={(item: any) => {
            setSelectedSegmentIndex(item);
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgressCard'}>
        <View style={styles.progressCard}>
          <UserProgressCard
            Icon={<Icons.Trainer fill={primaryBlack} />}
            title="Calories"
            value={{amount: '1800', currency: 'kcal'}}
          />
          <UserProgressCard
            Icon={<Icons.Close fill={primaryBlack} />}
            title="Calories"
            value={[
              'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
            ]}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'MultiSelect Selected Chips'}>
        <View style={{width: '100%'}}>
          <MultiSelectSelectedChips
            list={selectedItems}
            onDelete={(value: any) => {
              deleteItem(value);
            }}
          />
        </View>
      </DesignSystemItem>
      <DesignSystemItem title={'MultiSelect Chips'}>
        <MultiSelectChips
          list={listForMultiSelect}
          selectedItems={selectedItems}
          onPressItem={value => {
            checksetSelectedItems(value);
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Swiper'}>
        <PrimeryButton
          title="open swiper"
          type="default"
          onPress={() => {
            setisVisibleSwiper(true);
          }}
          style={styles.button}
        />
        <Toaster
          height={400}
          isVisible={isVisibleSwiper}
          onClose={() => {
            setisVisibleSwiper(false);
          }}
          Screen={
            <View>
              <FileInfoCard
                fileName="File Name"
                fileType="PDF"
                onClose={() => {}}
              />
              <FileInfoCard
                fileName="File Name"
                fileType="PDF"
                onClose={() => {}}
              />
            </View>
          }
        />
      </DesignSystemItem>
      <DesignSystemItem title={'MultiSelect Chips'}>
        <IngredientsItem title={'Tomat'} weight={'400 gm'} />
      </DesignSystemItem>
      <DesignSystemItem title={'Plus Button'}>
        <PlusButton onPress={() => {}} />
      </DesignSystemItem>
      <DesignSystemItem title={'BottomBar'}>
        <BottomBar
          count={0}
          onImport={() => {}}
          onPressMenu={() => {}}
          buttonType={'menu'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'BottomBar'}>
        <BottomBar
          count={5}
          onImport={() => {}}
          onPressMenu={() => {}}
          buttonType={'close'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Plus Button'}>
        <PlusButton onPress={() => {}} />
      </DesignSystemItem>

      <DesignSystemItem title={'Activities Card'}>
        <ActivitiesCard
          imageUri={
            'https://www.pngfind.com/pngs/m/238-2382437_basketball-silhouette-vector-at-getdrawings-basketball-player-icon.png'
          }
          title="Basketball"
          selected={false}
          onSelect={() => {}}
        />
        <ActivitiesCard
          imageUri={
            'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png'
          }
          title="Basketball"
          selected={true}
          onSelect={() => {}}
        />
        <ActivitiesCard
          imageUri={
            'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png'
          }
          title="Basketball"
          isClose
          onClose={() => {}}
        />
      </DesignSystemItem>

      <DesignSystemItem title={'Plus Button'}>
        <PlusButton onPress={() => {}} />
      </DesignSystemItem>
      <DesignSystemItem title={'input image'}>
        <View style={styles.uploadImage}>
          <UpploadButton goBackImage={() => {}} />
        </View>
      </DesignSystemItem>

      <DesignSystemItem title={'Add todo'}>
        <View style={styles.progressCard}>
          <AddToDo
            date={'2022-03-08'}
            list={[
              {type: ToDoTypes.eat},
              {type: ToDoTypes.eat, isActive: true},
              {type: ToDoTypes.rest},
              {type: ToDoTypes.rest, isActive: true},
              {type: ToDoTypes.file},
              {type: ToDoTypes.file, isActive: true},
            ]}
          />
          <AddToDo
            date={'2022-03-08'}
            list={[
              {type: ToDoTypes.edit},
              {type: ToDoTypes.edit, isActive: true},
              {type: ToDoTypes.play},
              {type: ToDoTypes.play, isActive: true},
            ]}
          />
          <AddToDo
            date={'2022-03-08'}
            list={[
              {type: ToDoTypes.live},
              {type: ToDoTypes.live, isActive: true},
            ]}
          />
          <AddToDo
            date={'2022-03-08'}
            list={[
              {type: ToDoTypes.size},
              {type: ToDoTypes.size, isActive: true},
            ]}
          />
          <AddToDo date={'2022-03-08'} list={[]} borderStyleType={'dashed'} />
        </View>
      </DesignSystemItem>

      <DesignSystemItem title={'VideoInfoCard'}>
        <VideoInfoCard
          image={imageUrl}
          title={'Glute Bridges'}
          time={'2 min 10 sec'}
          deleteVisable={false}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'VideoInfoCard'}>
        <VideoInfoCard
          image={imageUrl}
          title={'Glute Bridges'}
          time={'2 min 10 sec'}
          deleteVisable={true}
          onPressDelete={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'TagCard'}>
        <TagCard
          title="Fat Burning Fitness Yoga"
          color={lightRed}
          count={'4'}
          onPress={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'TagCard'}>
        <TagCard
          title="Fat Burning Fitness Yoga"
          color={purple}
          count={'2'}
          onPress={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'UserInfocard Connected'}>
        <UserInfoCard
          userData={{
            first_name: 'Olivie',
            last_name: 'Gibson',
            address: 'Belgium, Brussels',
            isConnect: true,
            image_url:
              'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          }}
          onConnect={() => {}}
          onSelectChat={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'UserInfocard'}>
        <UserInfoCard
          userData={{
            first_name: 'Olivie',
            last_name: 'Gibson',
            address: 'Belgium, Brussels',
            isConnect: false,
            image_url:
              'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          }}
          onConnect={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'UserInfocard'}>
        <UserInfoCard
          userData={{
            first_name: 'Olivie',
            last_name: 'Gibson',
            address: 'Belgium, Brussels',
            isConnect: false,
            image_url:
              'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          }}
          onSelectChat={() => {}}
          onConnect={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'FoodCard'}>
        <FoodCard
          title="Apple"
          image={appleimageUrl}
          weight={'Whole (125g)'}
          kcal={'50 kcal'}
          isDisabled={true}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'FoodCard'}>
        <FoodCard
          title="Apple"
          image={appleimageUrl}
          weight={'Whole (125g)'}
          kcal={'50 kcal'}
          isDisabled={false}
          isSubmited={isSubmited}
          onPress={() => {
            setIsSubmited(!isSubmited);
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Stepper'}>
        <Stepper
          content={content}
          active={active}
          setActive={(value: number) => {
            setActive(value);
          }}
        />
      </DesignSystemItem>

      <DesignSystemItem title={'VideoExerciseCard'}>
        <VideoExerciseCard
          image={imageUrl}
          title={'Glute Bridges'}
          time={'2 min 10 sec'}
          restTime={'30sec'}
          setCount={2}
          exerciseCount={2}
          onPressDelete={() => {}}
          onPressCopy={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'VideoExerciseCard'}>
        <VideoExerciseCard
          image={imageUrl}
          title={'Glute Bridges'}
          time={'2 min 10 sec'}
          exerciseCount={2}
          onPressDelete={() => {}}
          onPressCopy={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'RecentInfoCard'}>
        <RecentInfoCard
          info={{
            title: 'Best Steak Marinade in Existence',
            imageUrl:
              'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            count: '1 portion',
            amount: '200 kcal',
            time: '30 min',
            saleType: 'Soy Free',
            type: 'Salad',
          }}
          onLongPress={() => {
            setIsOpenedEditSheet(true);
          }}
        />
        <EditSheet
          isVisible={isOpenedEditSheet}
          onClose={() => setIsOpenedEditSheet(false)}
          list={[
            {
              title: 'Edit',
              onSelect: () => {
                setIsOpenedEditSheet(false);
              },
              Icon: <Icons.Edit />,
            },
            {
              title: 'Diplicate',
              onSelect: () => {
                setIsOpenedEditSheet(false);
              },
              Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
            },
            {
              title: 'Bookmark',
              onSelect: () => {
                setIsOpenedEditSheet(false);
              },
              Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
            },
          ]}
        />
      </DesignSystemItem>
    </ScrollView>
  );
};
export default SystemDisagn;
