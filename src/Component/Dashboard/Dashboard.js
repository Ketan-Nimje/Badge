import React, { useState, useCallback } from 'react';
import {
    Page,
    Card, Layout, ResourceList, TextStyle, Thumbnail, Heading, DataTable, ButtonGroup, Button, Icon, Stack
} from '@shopify/polaris';
import {
    AnalyticsMinor, ViewMajor, HorizontalDotsMinor
} from '@shopify/polaris-icons';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './../../App.css';

export default function Dashboard() {

    const options = {
        chart: {
            type: "spline"
        },
        yAxis: [{ //--- Primary yAxis
            title: {
                text: ''
            }
        }],
        colors: ["#008060"],
        title: {
            text: ""
        },
        legend: {
            align: 'left',
            enabled: false
        },
        series: [
            {
                name: 'Dates',
                data: [{ x: 1, y: 10 }, { x: 2, y: 30 }, { x: 3, y: 20 }, { x: 4, y: 10 }, { x: 5, y: 70 }, { x: 6, y: 0 }, { x: 7, y: 60 }]
            }
        ],
        credits: {
            enabled: false
        }
    };

    const rows = [
        [<TextStyle variation="strong">Emerald Silk Gown</TextStyle>,
            '$875.00',
            124689,
            140,
            '$122,500.00',
        <ButtonGroup segmented spacing="tight">
            <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
            <Button size='slim'><Icon source={ViewMajor} /></Button>
            <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
        </ButtonGroup>],
        [<TextStyle variation="strong">Mauve Cashmere Scarf</TextStyle>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
        <ButtonGroup segmented spacing="tight">
            <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
            <Button size='slim'><Icon source={ViewMajor} /></Button>
            <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
        </ButtonGroup>],
        [
            <TextStyle variation="strong">Navy Merino Wool Blazer with khaki chinos and yellow belt</TextStyle>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            <ButtonGroup segmented spacing="tight">
                <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
                <Button size='slim'><Icon source={ViewMajor} /></Button>
                <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
            </ButtonGroup>
        ],
    ];
    return (<React.Fragment>
        <Page title="Dashboard">
            <Layout>
                <Layout.Section>
                    <Card>
                        <Card.Section>
                            <Layout>
                                <Layout.Section oneThird >
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                                <Layout.Section oneThird>
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                                <Layout.Section oneThird>
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                                <Layout.Section oneThird>
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                                <Layout.Section oneThird>
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                                <Layout.Section oneThird>
                                    <div className='Polaris-grid'>
                                        <Heading>Online store dashboard</Heading>
                                        <TextStyle variation="strong">100</TextStyle>
                                    </div>
                                </Layout.Section>
                            </Layout>

                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Stack>
                        <Stack.Item fill>
                            <Heading>Recently Activity</Heading>
                        </Stack.Item>
                        <Stack.Item>
                            <TextStyle variation="subdued">455 units available</TextStyle>
                        </Stack.Item>
                    </Stack>
                </Layout.Section>
                <Layout.Section oneHalf >
                    <Card title="New subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                        <Card.Section>
                            {/* <TextStyle variation="subdued">455 units available</TextStyle> */}
                            <div style={{ width: '100%' }}>
                                <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                            </div>
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <Card title="Finished subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                        <Card.Section>
                            {/* <TextStyle variation="subdued">455 units available</TextStyle> */}
                            <div style={{ width: '100%' }}>
                                <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                            </div>
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <Card title="Finished subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                        <Card.Section>
                            {/* <TextStyle variation="subdued">455 units available</TextStyle> */}
                            <div style={{ width: '100%' }}>
                                <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                            </div>
                        </Card.Section>
                    </Card>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <Card title="Finished subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                        <Card.Section>
                            {/* <TextStyle variation="subdued">455 units available</TextStyle> */}
                            <div style={{ width: '100%' }}>
                                <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                            </div>
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    </React.Fragment>);
}
