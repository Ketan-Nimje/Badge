import React, { useState, useCallback } from "react";
import {
  Page,
  Card,
  Layout,
  ResourceList,
  TextStyle,
  Thumbnail,
  Heading,
  DataTable,
  ButtonGroup,
  Button,
  Icon,
  Stack,
} from "@shopify/polaris";
import { useSelector } from "react-redux";
import {
  AnalyticsMinor,
  ViewMajor,
  HorizontalDotsMinor,
} from "@shopify/polaris-icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./../../App.css";

export default function Dashboard() {
  const options = {
    chart: {
      type: "spline",
    },
    yAxis: [
      {
        //--- Primary yAxis
        title: {
          text: "",
        },
      },
    ],
    colors: ["#008060"],
    title: {
      text: "",
    },
    legend: {
      align: "left",
      enabled: false,
    },
    series: [
      {
        name: "Dates",
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 30 },
          { x: 3, y: 20 },
          { x: 4, y: 10 },
          { x: 5, y: 70 },
          { x: 6, y: 0 },
          { x: 7, y: 60 },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  const shopDetail = useSelector((data) => data.shopDetails);
  console.log(shopDetail);
  const rows = [
    [
      <TextStyle variation="strong">Emerald Silk Gown</TextStyle>,
      "$875.00",
      124689,
      140,
      "$122,500.00",
      <ButtonGroup segmented spacing="tight">
        <Button size="slim">
          <Icon source={AnalyticsMinor} />
        </Button>
        <Button size="slim">
          <Icon source={ViewMajor} />
        </Button>
        <Button size="slim">
          <Icon source={HorizontalDotsMinor} />
        </Button>
      </ButtonGroup>,
    ],
    [
      <TextStyle variation="strong">Mauve Cashmere Scarf</TextStyle>,
      "$230.00",
      124533,
      83,
      "$19,090.00",
      <ButtonGroup segmented spacing="tight">
        <Button size="slim">
          <Icon source={AnalyticsMinor} />
        </Button>
        <Button size="slim">
          <Icon source={ViewMajor} />
        </Button>
        <Button size="slim">
          <Icon source={HorizontalDotsMinor} />
        </Button>
      </ButtonGroup>,
    ],
    [
      <TextStyle variation="strong">
        Navy Merino Wool Blazer with khaki chinos and yellow belt
      </TextStyle>,
      "$445.00",
      124518,
      32,
      "$14,240.00",
      <ButtonGroup segmented spacing="tight">
        <Button size="slim">
          <Icon source={AnalyticsMinor} />
        </Button>
        <Button size="slim">
          <Icon source={ViewMajor} />
        </Button>
        <Button size="slim">
          <Icon source={HorizontalDotsMinor} />
        </Button>
      </ButtonGroup>,
    ],
  ];
  return (
    <React.Fragment>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <Layout>
                  <Layout.Section oneThird>
                    <div className="Polaris-grid">
                      <Heading>Online store dashboard</Heading>
                      <TextStyle variation="strong">100</TextStyle>
                    </div>
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <div className="Polaris-grid">
                      <Heading>Online store dashboard</Heading>
                      <TextStyle variation="strong">100</TextStyle>
                    </div>
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <div className="Polaris-grid">
                      <Heading>Online store dashboard</Heading>
                      <TextStyle variation="strong">100</TextStyle>
                    </div>
                  </Layout.Section>
                </Layout>
              </Card.Section>
            </Card>
          </Layout.Section>

        </Layout>
      </Page>
    </React.Fragment>
  );
}
