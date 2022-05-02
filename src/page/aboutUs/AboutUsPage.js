import React from "react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import styles from "./AboutUsPage.module.less";
import {FormattedMessage} from "react-intl";
import clientConfig from "clientTheme/config";

function AboutUsView() {
  return (
    <JxPage>
      <JxNavBar>
        <FormattedMessage id="page.about" defaultMessage="关于我们" />
      </JxNavBar>
      <JxContent className={styles.container}>
        <h3 className={styles.title}>
          <FormattedMessage id="page.about" defaultMessage="关于我们" />
        </h3>
        <div className={styles.content}>
          <FormattedMessage
            id="aboutPage.text1"
            defaultMessage="{clientName} offers state-of-the-art technology that has innovated, Asia’s best gaming products and games that has rapidly become higher in class for innovative and revolutionized in Sports betting,E-sport betting, Live Dealer Casino and Slots Games.<br/>
Our mission is to be dominating as market leader in providing you best quality service, gaming innovation, values, user-friendly interface and the best betting experience on the net, confidential safety, secured and regulated environment.
{clientName} team strives to give you, as our member in wide range of state-of-the-art products, services, quick and easy secure payouts of winnings and best values for member promotions.
We offer a wide range of betting innovative and opportunities in Sports betting, Live Dealers Casino, Slots, Keno, Super Bull, that are easy to bet and entertaining. We strive in providing our members to place bets in their own language and currency on the net and secured.
Your betting account can be used for all products and we upkeep to common members betting account for seamless funds transfer betting experience. In our Sports betting product, we offer the widest range of choice for different Asian Handicap, the popular Odds/Even and High/Low, and many other betting opportunities including live betting opportunities up to 90 minutes, quick payout on winnings and competitive odds.

We are proud to offer our members the innovated Live Dealers Casino experience without download version and moving up the notch of today’s Mobile apps technology such as Baccarat, Blackjack, Dragon/Tiger, Roulette, Sic Bo and many more exciting games. We offer the best value to our members with multi-level casino table limit selections and high cash rebates value. Members can choose and bet on Non-commission Baccarat and many more comprehensive selections. Nevertheless, Casino games are of high interest in Asian betting members till today.

Besides betting on our Live Dealers Casino games, you can also play Slots and Casino Games. We offer you various selections of Slots and Casino Games without any download needed, mobile apps made available and social apps. You will find all the latest and innovative Slots and Casino games such as Slots Machine, Blackjack and many more. 
"
            values={{
              p: (...chunks) => <p>{chunks}</p>,
              clientName: clientConfig.name
            }}
          />
        </div>
      </JxContent>
    </JxPage>
  );
}

export default AboutUsView;
