import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Checkbox,
  Heading,
  RadioButton,
  DropZone,
} from "@shopify/polaris";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

const Pramotions = () => {
  const [state, setState] = useState({
    startDate: moment().subtract(29, "days"),
    endDate: moment(),
  });
  const [selectedDay, setSelectedDay] = useState("Last 30 days");
  return (
    <Page title="Pramotions">
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Layout>
                <Layout.Section oneThird>
                  <TextField label="Pramotion Name" />
                </Layout.Section>
                <Layout.Section oneThird></Layout.Section>
                <Layout.Section oneThird></Layout.Section>
              </Layout>
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <Heading>
                1. Choose where you want to place your pramotion atmosphere
              </Heading>
              <div className="mt-2">
                <Layout>
                  <Layout.Section oneThird>
                    <Checkbox label="Product Listing Page" />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <Checkbox label="Product Display Page" />
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <Checkbox label="Cart" />
                  </Layout.Section>
                </Layout>
              </div>
            </Card.Section>
            <Card.Section>
              <Heading>
                2. Choose the dates for which pramotion is applicable
              </Heading>
              <div className="mt-2">
                <Layout>
                  <Layout.Section oneThird>
                    <DateRangePicker autoApply={true}>
                      <div className="date-filter-btn">
                        <TextField
                          label="Promo Period"
                          placeholder="Start Date - End Date"
                        />
                      </div>
                    </DateRangePicker>
                  </Layout.Section>
                  <Layout.Section oneThird></Layout.Section>
                  <Layout.Section oneThird></Layout.Section>
                </Layout>
              </div>
            </Card.Section>
            <Card.Section>
              <Heading>3. Choose Your Badges</Heading>
              <div className="mt-2">
                <Layout>
                  <Layout.Section oneThird>
                    <RadioButton label="Upload Images" />
                    <div style={{ width: 114, height: 114 }} className="mt-2">
                      <DropZone>
                        <DropZone.FileUpload />
                      </DropZone>
                    </div>
                  </Layout.Section>
                  <Layout.Section oneThird>
                    <RadioButton label="Choose from Color palette and Text" />
                    <div className="mt-2">
                      <TextField />
                    </div>
                  </Layout.Section>
                  <Layout.Section oneThird></Layout.Section>
                </Layout>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
export default Pramotions;
