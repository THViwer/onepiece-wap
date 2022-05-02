import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";

@inject("homeStore")
@observer
class SeoView extends Component {
    @computed get appName() {
        return this.props.homeStore.appName;
    }

    @computed get seoTitle() {
        return this.props.homeStore.seoTitle;
    }

    @computed get appKeywords() {
        return this.props.homeStore.appKeywords;
    }

    @computed get appDescription() {
        return this.props.homeStore.appDescription;
    }

    @computed get googleStatisticsId() {
        return this.props.homeStore.googleStatisticsId;
    }

    @computed get facebookTr() {
        return this.props.homeStore.facebookTr;
    }

    @computed get appLogo() {
        return this.props.homeStore.icoLogo;
    }

    @computed get asgContent() {
        return this.props.homeStore.asgContent;
    }

    render() {
        return (
            <Helmet>
                <title>{this.seoTitle}</title>
                <meta name="og:title" content={this.seoTitle} />
                <meta name="og:keywords" content={this.appKeywords} />
                <meta name="og:description" content={this.appDescription} />
                <meta name="title" content={this.seoTitle} />
                <meta name="keywords" content={this.appKeywords} />
                <meta name="description" content={this.appDescription} />
                <link rel="icon" href={this.appLogo} />
                <meta name="description" content={this.appDescription} />
                {this.asgContent !== "" ? (
                    <meta name="asg_verification" content={this.asgContent} />
                ) : null}
                {this.googleStatisticsId !== "" ? (
                    <script
                        type="text/javascript"
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${this.googleStatisticsId}`}
                    />
                ) : null}
                {this.googleStatisticsId !== "" ? (
                    <script>
                        {` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${this.googleStatisticsId}');`}
                    </script>
                ) : null}
                {this.facebookTr !== "" ? (
                    <script>
                        {` !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${this.facebookTr}');
              fbq('track', 'PageView');`}
                    </script>
                ) : null}
            </Helmet>
        );
    }
}

export default SeoView;
