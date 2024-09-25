import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import styles from '../SystemDisagn/SystemDisagn.style';

import {
  formFieldGrey,
  green,
  primaryBlack,
  primaryBlue,
} from '../../../assets/styles/colors.styles';

import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import MealCard from '../../../components/mealCard/MealCard';
import DashBoardItem from '../../../components/dashboardItem/DashBoardItem';
import RecentInfoCard from '../../../components/recentInfoCard/RecentInfoCard';
import PlayButton from '../../../components/playButton/PlayButton';
import MarathonCard from '../../../components/marathonCard/MarathonCard';
import NotificationCard from '../../../components/notificationCard/NotificationCard';
import PaymentCard from '../../../components/paymentCard/PaymentCard';
import ParagraphComponenet from '../../../components/paragraph/Paragraph';
import ModalComponent from '../../../components/modal/ModalComponent';
import {PrimeryButton} from '../../../components/buttons';
import ProgramCard from '../../../components/programCard/ProgramCard';
import ConnectUserCard from '../../../components/connectUserCard/ConnectUserCard';
import WorkoutCard from '../../../components/workoutCard/WorkoutCard';
import PieChartComponent from '../../../components/pieChart/PieChartComponent';
import Card from '../../../components/card/Card';
import ProgressViewGradientCard from '../../../components/progressViewGradient/ProgressViewGradient';

const DesignSystemItem = ({title, children}) => {
  return (
    <View style={styles.itemsContainer}>
      <Text style={styles.item}>{title}</Text>
      {children}
    </View>
  );
};
const SystemDisagn2: React.FC = () => {
  const [isFocus, setIsfocus] = useState(false);
  const [searchText, setSearchText] = useState();
  const filterText = text => {
    setSearchText(text);
  };
  const [selectedText, setSelectedText] = useState('1');
  const [valueNumber, setValueNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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
  const leftIcon = () => {
    return (
      <View style={styles.leftIcon}>
        <Icons.Ceck />
      </View>
    );
  };
  const rightIcon = () => {
    return <Text style={styles.rightText}>60 min</Text>;
  };
  return (
    <ScrollView style={styles.container}>
      <DesignSystemItem title={'MainHeader'}>
        <MainHeader
          title={'Nutritions'}
          search={true}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponent={
            <View>
              <Icons.Filter fill={'red'} />
            </View>
          }
        />
        <MainHeader
          title={'Nutritions'}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponentStyle={{width: '20%', marginLeft: -40}}
          leftComponent={
            <View>
              <Text style={{color: primaryBlack}}>Create New</Text>
            </View>
          }
        />
        <MainHeader
          title={'Authentic Tacos al Pastor'}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponent={<Icons.EllipsisIcon />}
        />
        <MainHeader
          title={'Authentic Tacos al Pastor'}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponentStyle={{
            width: '20%',
            marginLeft: -20,
            paddingHorizontal: calcWidth(5),
          }}
          leftComponent={
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={styles.selected}>
                <Icons.Ceck fill={primaryBlue} width={calcHeight(15)} />
              </View>
              <View style={styles.menuIcon}>
                <Icons.EllipsisIcon />
              </View>
            </View>
          }
        />
      </DesignSystemItem>
      <DesignSystemItem title={'MealCard'}>
        <MealCard
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
          title="Juicy Roasted Chicken"
          selectedTypesList={list}
          selectedTypeText={selectedText}
          setSelectedTypeText={value => {
            setSelectedText(value);
          }}
          valueNumber={valueNumber}
          onChangeNumberValue={(val: string) => {
            setValueNumber(val);
          }}
          kcalSize={250}
          kcalSizeStyle={{color: green}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'DashboardItem'}>
        <DashBoardItem
          icon={<Icons.Filter fill={primaryBlue} />}
          title={'Nutrition'}
          description={'Recipes / Foods / Meals / Day plans'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgramCard'}>
        <RecentInfoCard
          info={{
            title: 'Program name',
            imageUrl:
              'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            count: '30 day',
            time: 'Lose weight',
            type: 'Gain muscle',
          }}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'PlayButton'}>
        <PlayButton onPress={() => {}} />
      </DesignSystemItem>
      <DesignSystemItem title={'MarathonCard'}>
        <MarathonCard
          title="90 Days Weight Loss"
          userCount="10"
          price="80$"
          imageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          startDate="29.06.2020 "
          endDate="29.07.2020"
          time="30 day"
          listTags={['TAG1', 'TAG2', 'TAG1', 'TAG2', 'TAG1', 'TAG2']}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'NotificationCard'}>
        <NotificationCard
          name="Maya Crouch"
          title="Sent a ‘’Marathon Name’’ participation request"
          imageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          date="20 June 2020"
          onPress={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Payment Card'}>
        <PaymentCard
          name="Maya Crouch"
          title="Subscribe marathon"
          imageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          date="27.04.2021"
          price={'80 $'}
          onPress={() => {}}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Paragraph'}>
        <ParagraphComponenet
          title="Step 1"
          text="Contrary to popular belasief, Lorem Ipsum is not simply random text. has roots in a piece of clasassical Latin literature from BC, making over 2000 years . Richard McCsasalintock, a Latin fessor at Hampden Sydney College in Virginia, looked up one of the mdfdore obscure."
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Modal'}>
        <PrimeryButton
          title="Open Modal"
          type="default"
          onPress={() => {
            setIsVisible(true);
          }}
          style={styles.button}
        />
        <ModalComponent
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          content={
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                You have invited 2 users to "30 days challenge training with
                Ilona" marathon.
              </Text>
              <Text style={styles.modalText}>
                You will receive a notification once user accepts the invitation
              </Text>
            </View>
          }
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgramCard'}>
        <ProgramCard
          image="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          userCount={5}
          time={'30 day'}
          programName="Program name"
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgramCard'}>
        <ConnectUserCard
          image="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          title={'Maya Crouch'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'WorkoutCard'}>
        <WorkoutCard
          imageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          title={'Workout name'}
          kcal={200}
          rightIcon={<Icons.Close fill={formFieldGrey} />}
          percent={100}
          restTime={10}
          time={'20min'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'WorkoutCard'}>
        <WorkoutCard
          imageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
          title={'Workout name'}
          kcal={200}
          rightIcon={<Icons.Close fill={formFieldGrey} />}
          percent={50}
          time={'20min'}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'PieChart'}>
        <PieChartComponent title={'Fat'} percent={34} weight={200} />
      </DesignSystemItem>
      <DesignSystemItem title={'Card'}>
        <Card
          title={'Fat'}
          leftIcon={leftIcon()}
          rightIcon={rightIcon()}
          rightIconVisible={true}
          color={primaryBlack}
          list={[
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          ]}
          isFile={true}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Card'}>
        <Card
          title={'Fat'}
          leftIcon={leftIcon()}
          rightIcon={rightIcon()}
          rightIconVisible={true}
          color={primaryBlue}
          list={[
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          ]}
          isFile={false}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'Card'}>
        <Card
          title={'Fat'}
          leftIcon={leftIcon()}
          rightIcon={rightIcon()}
          rightIconVisible={false}
          color={primaryBlack}
          list={[
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
          ]}
          isFile={false}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgressViewGradient'}>
        <ProgressViewGradientCard
          title={'60.0 kg'}
          progress={0.7}
          icon={<Icons.Clock />}
          startTitle={'March 25 Complete'}
          timeTitle={'20 days / -3 kg'}
          weightOne={'72.0 kg'}
          weightTwo={'66.0 kg'}
          weightThree={'60.0 kg'}
          isProgress={true}
        />
      </DesignSystemItem>
      <DesignSystemItem title={'ProgressViewGradient'}>
        <ProgressViewGradientCard
          title={'60.0 kg'}
          icon={<Icons.Clock />}
          startTitle={'March 25 Complete'}
          timeTitle={'20 days / -3 kg'}
          weightOne={'72.0 kg'}
          weightTwo={'66.0 kg'}
          weightThree={'60.0 kg'}
          isProgress={false}
        />
      </DesignSystemItem>
    </ScrollView>
  );
};
export default SystemDisagn2;
