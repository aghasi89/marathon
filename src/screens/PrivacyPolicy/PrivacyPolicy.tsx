import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import Header from '../ProfileStack/components/Header/Header';

const PrivacyPolicy = () => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack();
    }
    const awsSecurityLink = () => {
        Linking.openURL('https://aws.amazon.com/security/');
      };
      const supportEmail = 'support@marathon.me';

  const sendEmail = () => {
    Linking.openURL(`mailto:${supportEmail}`);
  };
  return (<View style={{flex: 1, backgroundColor: "white"}}>
      <Header title='' goBack={goBack}/>
    <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
    <Text style={styles.heading}>
        Privacy Policy
      </Text>
      <Text style={styles.paragraph}>
        SOFISCO Ltd (“We”) is committed to protecting and respecting your privacy.
      </Text>
      <Text style={styles.paragraph}>
        This policy (together with our Terms of Use www.marathon.me/terms and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. By visiting https://www.marathon.me you are accepting and consenting to the practices described in this policy.
      </Text>
      <Text style={styles.paragraph}>
        For the purpose of the Data Protection Act 2018 (the Act) and/or (for so long as and to the extent that the law of the European Union has legal effect in the United Kingdom) the General Data Protection Regulation (EU) 20167/679, the data controller is Sofisco Ltd. (Marathon.me), 3 RUE DE LA CROIX DE FER 78100 SAINT GERMAIN EN LAYE.
      </Text>
      <Text style={styles.subHeading}>
        Information we may collect from you
      </Text>
      <Text style={styles.paragraph}>
        We may collect and process the following data about you:
      </Text>
      <Text style={styles.subHeading}>
        Information you may give us
      </Text>
      <Text style={styles.paragraph}>
        You may give us information about you by filling in forms on our site www.marathon.me (our site) or by corresponding with us by phone, e-mail or otherwise. This includes information you provide when you register to use our site, subscribe to our service, and when you report a problem with our site. The information you give us may include your name, address, e-mail address and phone number, financial and credit card information, personal description and photograph, nutritional information, fitness exercises, biometric data and data relating to a person’s physical fitness.
      </Text>
      <Text style={styles.subHeading}>
        Information we collect about you
      </Text>
      <Text style={styles.paragraph}>
        With regard to each of your visits to our site we may automatically collect the following information (whether for your use of our site, any purchases you make through it or links to authorised and reputable third party providers such as Apple Health, Fitbit and Google Fit):
      </Text>
      <Text style={styles.paragraph}>
        Technical information, including the Internet protocol (IP) address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, GPS location, device, browser plug-in types and versions, operating system and platform.
      </Text>
      <Text style={styles.paragraph}>
        Information about your visit, including the full Uniform Resource Locators (URL) clickstream to, through and from our site (including date and time); products you viewed or searched for; page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page and any phone number used to call our customer service number.
      </Text>
      <Text style={styles.subHeading}>
        Information we receive from other sources
      </Text>
      <Text style={styles.paragraph}>
        We may receive information about you if you use any other websites we operate or reputable third party websites with which our site is integrated for you to purchase third party goods and services or other services we provide. In this case we will have informed you when we collected that data that it may be shared internally and combined with data collected on this site. We are also working closely with third parties (including, for example, business partners, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, search information providers, credit reference agencies) and may receive information about you from them.
      </Text>
      <Text style={styles.subHeading}>Information you give to us</Text>
      <Text style={styles.paragraph}>
        We will use this information:
      </Text>
      <Text style={styles.paragraph}>
        - to pass through on your behalf as you require by and when you access the reputable third party sites and services integrated with our site relevant information you have chosen to have passed through;
      </Text>
      <Text style={styles.paragraph}>
        - to carry out our obligations arising from any contracts entered into between you and us and to provide you with the information, products and services that you request from us;
      </Text>
      <Text style={styles.paragraph}>
        - to provide you with information about other goods and services we offer that are similar to those that you have already purchased or enquired about;
      </Text>
      <Text style={styles.paragraph}>
        - to provide you, or permit selected third parties to provide you, with information about services we feel may interest you. If you are an existing customer, we may contact you by electronic means (e-mail or SMS) or by phone call (using the contact number you have provided) with information about services similar to those which were the subject of a previous sale or negotiations of a sale to you. If you are a new customer, and where we permit selected third parties to use your data, we (or they) may contact you by electronic means (email or SMS) or by phone call (using the contact number you have provided) if you have consented to this;
      </Text>
      <Text style={styles.paragraph}>
        - to notify you about changes to our service;
      </Text>
      <Text style={styles.paragraph}>
        - to ensure that content from our site is presented in the most effective manner for you and for your computer.
      </Text>

      <Text style={styles.subHeading}>Information we collect about you</Text>
      <Text style={styles.paragraph}>
        We will use this information:
      </Text>
      <Text style={styles.paragraph}>
        - to administer our site and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes;
      </Text>
      <Text style={styles.paragraph}>
        - to improve our site to ensure that content is presented in the most effective manner for you and for your computer;
      </Text>
      <Text style={styles.paragraph}>
        - to allow you to participate in interactive features of our service, when you choose to do so and to facilitate your use other reputable third party services through our site that you choose to use;
      </Text>
      <Text style={styles.paragraph}>
        - as part of our efforts to keep our site safe and secure;
      </Text>
      <Text style={styles.paragraph}>
        - to measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising to you;
      </Text>
      <Text style={styles.paragraph}>
        - to make suggestions and recommendations to you and other users of our site about goods or services that may interest you or them.
      </Text>

      <Text style={styles.subHeading}>Information we receive from other sources</Text>
      <Text style={styles.paragraph}>
        We may combine this information with information you give to us and information we collect about you. We may use this information and the combined information for the purposes set out above (depending on the types of information we receive).
      </Text>
      <Text style={styles.subHeading}>Disclosure of your information</Text>
      <Text style={styles.paragraph}>
        We may share your information with selected third parties including:
      </Text>
      <Text style={styles.subHeading}>Business partners, suppliers, and sub-contractors</Text>
      <Text style={styles.paragraph}>
        for the performance of any contract we enter into with them or you, or reputable third party supplier sites you may choose to use and sign up to through our site, such as Apple Health, Fitbit, and Google Fit
      </Text>

      <Text style={styles.subHeading}>Advertisers and advertising networks</Text>
      <Text style={styles.paragraph}>
        that require the data to select and serve relevant adverts to you and others. We do not disclose information about identifiable individuals to our advertisers, but we may provide them with aggregate information about our users (for example, we may inform them that 500 men aged under 30 have clicked on their advertisement on any given day). We may also use such aggregate information to help advertisers reach the kind of audience they want to target (for example, women in SW1). We may make use of the personal data we have collected from you to enable us to comply with our advertisers' wishes by displaying their advertisement to that target audience.
      </Text>

      <Text style={styles.subHeading}>Analytics and search engine providers</Text>
      <Text style={styles.paragraph}>
        that assist us in the improvement and optimization of our site.
      </Text>

      <Text style={styles.paragraph}>
        We may disclose your personal information to third parties:
      </Text>

      <Text style={styles.subHeading}>In the event that we sell or buy any business or assets</Text>
      <Text style={styles.paragraph}>
        in which case we may disclose your personal data to the prospective seller or buyer of such business or assets.
      </Text>

      <Text style={styles.subHeading}>If Sofisco Ltd or substantially all of its assets are acquired by a third party</Text>
      <Text style={styles.paragraph}>
        in which case personal data held by it about its customers will be one of the transferred assets.
      </Text>

      <Text style={styles.subHeading}>If we are under a duty to disclose or share your personal data</Text>
      <Text style={styles.paragraph}>
        in order to comply with any legal obligation, or in order to enforce or apply our Terms of Use and other agreements; or to protect the rights, property, or safety of Sofisco Ltd, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.
      </Text>

      <Text style={styles.subHeading}>In the event and as requested by you in your choosing to facilitate your individual arrangement with one of the integrated reputable third party suppliers of services through our site</Text>

      <Text style={styles.subHeading}>Your trainer will have visibility of your Personal Data</Text>
      <Text style={styles.subHeading}>Where we store your personal data</Text>
      <Text style={styles.paragraph}>
        The data that we collect from you may be transferred to, and stored at, a destination outside the European Economic Area (“EEA”). It may also be processed by staff operating outside the EEA who work for us or for one of our suppliers. Such staff maybe engaged in, among other things, the fulfillment of your order, the processing of your payment details, and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy.
      </Text>
      <Text style={styles.paragraph}>
        We always ensure that your data is only transferred in full accordance with UK data protection laws. In particular, that means your data will only be transferred to a country that the European Commission has determined provides an adequate level of protection, or to service providers who have an agreement with us committing to the Model Contract Clauses, which are defined by the European Commission.
      </Text>
      <Text style={styles.paragraph}>
        Sofisco Ltd and your data are hosted in the United States on Amazon Web Services (AWS). Amazon takes physical and network security seriously. You can read more about the specifics of their approach at
        {' '}
        <Text style={styles.link} onPress={awsSecurityLink}>
          https://aws.amazon.com/security/
        </Text>
        . We have signed an agreement with AWS that enables the transfer of personal data to the US and commits to the Model Contract Clauses, which are defined by the European Commission in accordance with UK data protection laws.
      </Text>
      <Text style={styles.paragraph}>
        All information you provide to us is stored on our secure servers. Any payment transactions will be encrypted using SSL technology. Where we have given you (or where you have chosen) a password which enables you to access certain parts of our site, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.
      </Text>
      <Text style={styles.paragraph}>
        Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access.
      </Text>
      <Text style={styles.paragraph}>
        If you choose to facilitate and use services of the reputable third party providers of services integrated with our site, the relevant Personal Data required to fulfill your choice will pass through our site directly to that third party provider with which you have created an individual contractual/service providing arrangement (and this is agreed and taken to be done with your full knowledge and desire). You will need to check that that provider’s storage of your Personal Data is acceptable to you.
      </Text>
      <Text style={styles.subHeading}>Your rights</Text>
      <Text style={styles.paragraph}>
        You have the right to ask us not to process your personal data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the forms we use to collect your data. You can also exercise the right at any time by contacting us at{' '}
        <Text style={styles.link} onPress={sendEmail}>
          {supportEmail}
        </Text>
        .
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Data Deletion:</Text>{' '}
        You have the right to request the deletion of your personal data at any time. To do so, please send a written request to{' '}
        <Text style={styles.link} onPress={sendEmail}>
          {supportEmail}
        </Text>
        . Upon receipt of such a request, we will confirm receipt and begin the process of deleting your data, subject to any legal obligations we may have to retain such data. Once the deletion process is complete, we will notify you accordingly.
      </Text>
      <Text style={styles.paragraph}>
        Our site may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.
      </Text>
      <Text style={styles.subHeading}>User Account and Profile Deletion</Text>
      <Text style={styles.paragraph}>
        As a user, you are entitled to control the personal data you've provided us. Within your user account, there is a section in the profile edit page where you can submit a request for data deletion. To access this, please follow these steps:
      </Text>
      <Text style={styles.paragraph}>1. Log into your account.</Text>
      <Text style={styles.paragraph}>2. Navigate to your profile edit page.</Text>
      <Text style={styles.paragraph}>3. Scroll down to the section labeled "Remove Profile"</Text>
      <Text style={styles.paragraph}>4. Click on "Remove profile."</Text>
      <Text style={styles.paragraph}>
        Upon clicking "Remove profile," you will be asked to confirm your decision as this action is irreversible. Once confirmed, a request will be sent to our data management team, who will process your request in accordance with the applicable laws and regulations. Note that this process may take some time, as we need to ensure that all data linked to your account is properly deleted. You will receive a confirmation email once this process has been completed.
      </Text>
      <Text style={styles.paragraph}>
        Please be aware that, due to legal obligations or for reasons related to service provision, some data may need to be retained even after your deletion request. For example, transactional records may need to be retained for financial auditing purposes.
      </Text>
      <Text style={styles.paragraph}>
        Please note that once the data is deleted, your account will no longer be accessible, and the user experience of our services may be affected.
      </Text>
      <Text style={styles.paragraph}>
        If you have any queries or issues with the data deletion process, please do not hesitate to contact us at{' '}
        <Text style={styles.link} onPress={sendEmail}>
          {supportEmail}
        </Text>
        . We are committed to protecting your privacy and will assist you in exercising your rights concerning your personal data.
      </Text>
      <Text style={styles.subHeading}>Access to information</Text>
      <Text style={styles.paragraph}>
        The Act gives you the right to access information held about you. Your right of access can be exercised in accordance with the Act.
      </Text>
      <Text style={styles.subHeading}>Changes to our privacy policy</Text>
      <Text style={styles.paragraph}>
        Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail. Please check back frequently to see any updates or changes to our privacy policy.
      </Text>
      <Text style={styles.subHeading}>Contact</Text>
      <Text style={styles.paragraph}>
        Questions, comments, and requests regarding this privacy policy are welcomed and should be addressed to{' '}
        <Text style={styles.link} onPress={sendEmail}>
          {supportEmail}
        </Text>
        . This includes any questions about data processing or requests for data deletion.
      </Text>
      <Text style={styles.paragraph}>
        We strive to ensure that all our data processing activities are conducted in accordance with the applicable laws and regulations. If you have any concerns, please do not hesitate to get in touch. We value your privacy and will always aim to handle your personal data responsibly and with transparency.
      </Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  }
});

export default PrivacyPolicy;
