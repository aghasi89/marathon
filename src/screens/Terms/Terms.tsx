import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import Header from '../ProfileStack/components/Header/Header';

const Terms = () => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack();
    }
  return (<View style={{flex: 1, backgroundColor: "white"}}>
      <Header title='' goBack={goBack}/>
    <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms of Use</Text>
      <Text style={styles.paragraph}>
        PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE
      </Text>
      <Text style={styles.paragraph}>
        www.marathon.me is a website operated by Sofisco Ltd ('we', 'our', 'us'),
        a limited company registered in France with company number 891 320 863
        and having its registered office at 3 RUE DE LA CROIX DE FER 78100 SAINT
        GERMAIN EN LAYE, FRANCE; this is also our main trading address. Our VAT
        number is FR73891320863. Our main email address is{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('mailto:support@marathon.me')}>
          support@marathon.me
        </Text>{' '}
        to which general enquiries should be made.
      </Text>
      <Text style={styles.paragraph}>
        These Terms of Use (together with the documents referred to in it) ('Terms')
        inform you, the visitor and user, about the terms of on which you may make
        use of our website www.marathon.me ('site'), whether as a guest or a
        registered user. Use of our site includes accessing, browsing, or
        registering to use our site.
      </Text>
      <Text style={styles.paragraph}>
        Please read these Terms carefully before you start to use our site, as these
        will apply to your use of our site and are intended to be legally binding on
        you. We recommend that you print a copy of this for future reference.
      </Text>
      <Text style={styles.paragraph}>
        By using our site, you confirm that you accept these Terms and that you agree
        to comply with them.
      </Text>
      <Text style={styles.paragraph}>
        If you do not agree to these Terms, you must not use our site and should
        leave it immediately.
      </Text>
      <Text style={styles.subHeading}>Other applicable terms</Text>
      <Text style={styles.paragraph}>
        These Terms refer to the following Policies which include additional terms
        to which, by entering and using our site, you are agreeing to be bound by:
      </Text>
      <Text style={styles.bullet}>
        • Our Data Protection Policy at{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.marathon.me/legal/privacy')
          }>
          www.marathon.me/legal/privacy
        </Text>
        , which sets out the terms on which we process any personal data we collect
        from you, or that you provide to us. By using our site, you consent to such
        processing of your personal data and you warrant that all data provided by
        you is accurate.
      </Text>
      <Text style={styles.bullet}>
        • Our Acceptable Use Policy at{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.marathon.me/legal/acceptable-use-policy')
          }>
          www.marathon.me/legal/acceptable-use-policy
        </Text>
        , which sets out the permitted uses and prohibited uses of our site. When
        using our site, you must comply with this Acceptable Use Policy.
      </Text>
      <Text style={styles.bullet}>
        • Our Cookie Policy at{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.marathon.me/legal/cookie-policy')
          }>
          www.marathon.me/legal/cookie-policy
        </Text>
        , which sets out information about the use of cookies when our site is being
        used by you.
      </Text>
      <Text style={styles.paragraph}>
        If you purchase services from our site, our service sales terms and
        conditions contained within our 'Subscription Agreement' which is at{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.marathon.me/legal/subscription-services-agreement')
          }>
          www.marathon.me/legal/subscription-services-agreement
        </Text>{' '}
        will apply to the sales. That Subscription Agreement is a binding legal
        contract and must be fully performed and observed by both you and us. You
        will be required, as you navigate the site to purchase services, to
        positively read and agree that Subscription Agreement which is binding upon
        you.
      </Text>
      <Text style={styles.subHeading}>Changes to these Terms</Text>
      <Text style={styles.paragraph}>
        We reserve the right to change and revise these Terms at any time by amending
        this page without any express notice to you. Please check this page from time
        to time to take notice of any changes we made, as they are binding on you.
      </Text>
      <Text style={styles.subHeading}>Changes to our site</Text>
      <Text style={styles.paragraph}>
        We may update our site from time to time, and may change the content at any
        time without any express notice to you. However, please note that any of the
        content on our site may be out of date at any given time, and we are under no
        obligation to update it.
      </Text>
      <Text style={styles.paragraph}>
        We do not guarantee or warrant that our site, or any content on it, will be
        free from errors or omissions.
      </Text>
      <Text style={styles.subHeading}>Accessing our site</Text>
      <Text style={styles.paragraph}>
        Our site is available free of charge.
      </Text>
      <Text style={styles.paragraph}>
        We do not guarantee or warrant that our site, or any content on it, will
        always be available or be uninterrupted. Access to our site is permitted on a
        temporary basis. We may suspend, withdraw, discontinue or change all or any
        part of our site without notice to you and for any reason whatsoever. By using
        the site, you are agreeing that we will not have any liability to you in
        contract, or for any tort if for any reason our site is unavailable at any
        time or for any period.
      </Text>
      <Text style={styles.paragraph}>
        You are responsible for making all arrangements necessary for you to have access to
        our site.
      </Text>
      <Text style={styles.paragraph}>
        You are also responsible for ensuring that all persons who access our site through
        your internet connection and/or hardware are aware of these Terms and other applicable terms and conditions,
        agree them and that they comply with them.
      </Text>
      <Text style={styles.subHeading}>Your account and password</Text>
      <Text style={styles.paragraph}>
        If you choose, or you are provided with, a user identification code, password or any
        other piece of information as part of our security procedures, you must treat such information as
        confidential. You must not disclose it to any third party.
      </Text>
      <Text style={styles.paragraph}>
        We have the right to disable any user identification code or password, whether chosen
        by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of
        the provisions of these Terms.
      </Text>
      <Text style={styles.paragraph}>
        If you know or suspect that anyone other than you knows your user identification code
        or password, you must promptly notify us at{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('mailto:support@marathon.me')}>
          support@marathon.me
        </Text>
        . You will, be liable for all acts and omissions undertaken on your registered account, whoever
        does or does not do such things.
      </Text>
      <Text style={styles.heading}>Personal data and data protection laws</Text>
      <Text style={styles.paragraph}>
        We take our responsibilities opposite data protection very seriously. We comply with
        the data protection laws in the United Kingdom and the European Economic Area and in particular the
        provisions of the General Data Protection Regulations. We abide by our Data Protection Policy at
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://www.marathon.me')}>
          {' '}www.marathon.me{' '}
        </Text>
        (&lsquo;DPP&rsquo;). We have a GDPR Complaints Policy for any issues or complaints or
        possible GDPR breaches that may occur and this is also at
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://www.marathon.me')}>
          {' '}www.marathon.me{' '}
        </Text>
        . In particular please note the following:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            Our Subscription Agreement at{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://www.marathon.me')}>
              {' '}www.marathon.me{' '}
            </Text>
            contains the relevant and suitable GDPR and data protection provisions required, including customers contracting themselves to abide by GDPR and to have certain express clauses in their own contracts for services with individuals who may use the site.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We control data in accordance with GDPR and have established the lawful basis of our processing of it, as is set out in the DPP.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We review our technological capability to comply with GDPR to hold all information as securely as we can on an ongoing basis.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            All information is stored on encrypted servers controlled by us and we take all reasonable precautions to safeguard personal data and to ensure that no GDPR breaches take place by us or by our third party sub-processors.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We hold personal data only for the purposes we describe and for as long as we need to (as is set out in the DPP).
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            If we are to be given or collect any special categories of data, the reason for that and our instructions we need from you will be set out at the outset.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We have an appointed Data Protection Officer.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We fully recognise the rights of data subjects such as the right of knowing what we hold, the rights to be forgotten, erased, the right to rectification (subject to legal justifications).
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We have a GDPR Complaints Policy and procedure should any complaints be received, and will contact and co-operate with the Information Commissioner’s Office (or other statutory recognised supervisory body) as required.
          </Text>
        </Text>
        <Text style={styles.bullet}>
          <Text style={styles.bulletText}>
            We do on occasions use sub-processors who may be outside the EEA and in such cases we ensure that suitable contractual and other safeguards are in place to avoid GDPR breach.
          </Text>
        </Text>
      </View>
      <Text style={styles.paragraph}>
        Accordingly, any personal data that we receive from you when you use our site will be
        held and treated in accordance with the data protection laws and as we set out in our DPP.
      </Text>
      <Text style={styles.heading}>Intellectual property rights</Text>
      <Text style={styles.paragraph}>
        We are the owner or the licensee of all intellectual property rights in our site, its
        content and in the material published on it. Those works are protected by copyright and we hereby affirm our
        moral rights within the contents and material. All the intellectual property and our right through all laws
        around the world in the contents and material of our site are vested in us and we give no consent other than
        by agreed usage pursuant to a Subscription Agreement, these Terms or the Acceptable Use Policy. All such
        rights are reserved.
      </Text>
      <Text style={styles.paragraph}>
        You may print off one copy, and may download extracts, of any page(s) from our site
        for your personal use only and you may draw the attention of others within your organisation to content
        posted on our site. You agree you will not use that material in any commercial manner or purpose without
        obtaining a licence to do so from us or our licensors.
      </Text>
      <Text style={styles.paragraph}>
        You agree that you shall not modify the paper or digital copies of any materials you
        have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or
        audio sequences or any graphics separately from any accompanying text.
      </Text>
      <Text style={styles.paragraph}>
        Our status (and that of any identified contributors) as the authors of content on our
        site must always be acknowledged in your use of any material or content form the site, and you agree to do
        this in every instance.
      </Text>
      <Text style={styles.paragraph}>
        If you print off, copy or download any part of our site in breach of these Terms,
        your right to use our site will cease immediately and you must, at our option, return or destroy any copies
        of the materials you have made from it.
      </Text>
      <Text style={styles.heading}>No reliance on information</Text>
      <Text style={styles.paragraph}>
        The content on our site is provided for general information only. It is not intended
        to amount to advice on which you should rely and is provided only on the basis that you know and fully
        accept this, so do not rely on it. As we have no control over it, we have no liability to you for any use by
        you of the materials or content on the site. You must obtain professional or specialist advice before
        taking, or refraining from, any action on the basis of the content on our site.
      </Text>
      <Text style={styles.paragraph}>
        Although we make reasonable efforts to update the information on our site, we make no
        representations, warranties or guarantees, whether express or implied, that the materials content on our
        site is accurate, complete or up-to-date or do any particular thing.
      </Text>
      <Text style={styles.heading}>Limitation of our liability</Text>
      <Text style={styles.paragraph}>
        Nothing in these terms of use excludes or limits our liability for death or personal
        injury arising from our negligence, or our fraud or fraudulent misrepresentation, or any other liability
        that cannot be excluded or limited by English law.
      </Text>
      <Text style={styles.paragraph}>
        To the extent permitted by law, we exclude all conditions, warranties,
        representations or other terms which may apply to our site or any material or content on it, whether express
        or implied, and by using the site you are expressly agreeing to this.
      </Text>
      <Text style={styles.paragraph}>
        We will not be liable to any user for any loss, claims, expenses or damage, whether
        in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable,
        howsoever, wheresoever or whatsoever arising under or in connection with:
      </Text>
      <Text style={styles.paragraph}>
        If you are a business user rather than a consumer, please note that you are agreeing
        that as you control what you do with the site materials and content then it is fair and reasonable that by
        and when using this site you are agreeing that we will not be liable to you for:
      </Text>
      <Text style={styles.heading}>Limitation of Liability for Business Users:</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>•</Text> Your use of, or inability to use, our site; or{'\n'}
        <Text style={styles.listItem}>•</Text> Your use of or reliance on any material content displayed on our
        site or developed by you from it.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>•</Text> Any loss of profits, sales, business, or revenue you incur;{'\n'}
        <Text style={styles.listItem}>•</Text> Any Business interruption you incur;{'\n'}
        <Text style={styles.listItem}>•</Text> Any loss of anticipated savings by you;{'\n'}
        <Text style={styles.listItem}>•</Text> Any loss of business opportunity, goodwill or reputation by you; or{'\n'}
        <Text style={styles.listItem}>•</Text> Any other indirect or consequential loss or damage,
      </Text>
      <Text style={styles.paragraph}>
        howsoever or wheresoever arising.
      </Text>
      <Text style={styles.paragraph}>
        If you are a consumer user, please note that we provide our site for domestic and
        private use only. You agree not to use our site for any commercial or business purposes, and we have no
        liability to you for any loss of profit, loss of business, business interruption, or loss of business
        opportunity goodwill or reputation by you if you do.
      </Text>
      <Text style={styles.paragraph}>
        You are agreeing that we will not be liable for any loss, claim expense or damage to
        you caused by a virus, distributed denial-of-service attack, or other technologically harmful material that
        may infect your computer equipment, computer programs, data or other proprietary material due to your use of
        our site or to your downloading of any materials or content on it, or on any website linked to it.
      </Text>
      <Text style={styles.paragraph}>
        You use any links on our site to third party websites entirely at your own risk. If
        you do not want to take such risk, do not use any links. We do not check them or what they do and so we
        assume no responsibility whatsoever and you agree that it would be unfair and unreasonable for us to do so
        for the content, links, materials and any actions undertaken of and by websites linked on our site. Such
        links should not be interpreted as endorsement by us of any of those linked websites. You agree that we will
        not be liable to you for any loss, expense, claim or damage that may arise from your use of them.
      </Text>
      <Text style={styles.paragraph}>
        Different limitations and exclusions of liability will apply to liability arising as
        a result of the supply of any services to you, which will be set out in our
        Subscription Agreement which sets out our terms and
        conditions of the supply of our services. This is set out at
        www.marathon.me/legal/subscription-services-agreement.
      </Text>
      <Text style={styles.heading}>Uploading content to our site</Text>
      <Text style={styles.paragraph}>
        Whenever you make use of a feature that allows you to upload content to our site, or
        to make contact with other users of our site, you must comply with the content standards set out in our
        Acceptable Use Policy at www.marathon.me/legal/acceptable-use-policy.
      </Text>
      <Text style={styles.paragraph}>
        You warrant to us that any such contribution by you will comply with those standards,
        and you expressly agree that, as that is entirely your activity and we have no control over what you do,
        will be liable to us and indemnify us for any breach of that warranty. If you are a consumer user, this
        means you will be directly responsible for all and any loss, expense, claim or damage we suffer as a result
        of your breach of warranty.
      </Text>
      <Text style={styles.paragraph}>
        Do not upload any confidential information to our site or any information which is
        the intellectual property of a third party. Any content you upload to our site will be considered
        non-confidential and non-proprietary and we and other users will be free to use the same in any manner
        whatsoever. You retain all of your ownership rights in your content, but you are required to grant us and
        other users of the Site a free, worldwide licence to use, store and copy that content and to distribute and
        make it available to third parties. The rights you license to us are described in the next paragraph (Rights
        you licence).
      </Text>
      <Text style={styles.paragraph}>
        Subject to the Data Protection laws effective in the United Kingdom and our Data
        Protection Policy (at www.marathon.me), we also have the right if we consider it is justified to disclose
        your identity to any third party who is claiming that any content posted or uploaded by you to our site
        constitutes a violation of their intellectual property rights, or of their right to privacy or protection of
        their personal data.
      </Text>
      <Text style={styles.paragraph}>
        We will not be responsible, or liable to any third party, for the content or accuracy
        of any content posted by you or any other user of our site.
      </Text>
      <Text style={styles.paragraph}>
        We have the right to remove any posting you make on our site if, in our opinion, your
        post does not comply with the content standards set out in our Acceptable Use Policy
        www.marathon.me/legal/acceptable-use-policy.
      </Text>
      <Text style={styles.paragraph}>
        The views expressed by other users on our site do not represent our views or
        values.
      </Text>
      <View>
      <Text style={styles.paragraph}>
        You are solely responsible for securing and backing up your content.
      </Text>
      <Text style={styles.paragraph}>
        Viruses
      </Text>
      <Text style={styles.paragraph}>
        Whilst we take reasonable precautions we do not guarantee or warrant that our site will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programmes and platform in order to access our site. You will always use your own virus protection software.
      </Text>
      <Text style={styles.paragraph}>
        You agree you will not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. To do so would be deemed a material breach and we are entitled in such circumstances to claim against you on an indemnity basis, in equity and at law, all losses, costs, claims, expenses and damages we incur or sustain (including reasonable remedial and professional costs) that howsoever arise from you doing that)
      </Text>
      <Text style={styles.paragraph}>
        You agree you will not:
      </Text>
      <Text style={styles.listItem}>
        • attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site; or
      </Text>
      <Text style={styles.listItem}>
        • not attack our site via a denial-of-service attack or a distributed denial-of service attack.
      </Text>
      <Text style={styles.paragraph}>
        By breaching these provisions, you would be committing a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate fully with those authorities. In the event of such a breach, your right to use our site will cease immediately.
      </Text>
    </View>
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
});

export default Terms;
