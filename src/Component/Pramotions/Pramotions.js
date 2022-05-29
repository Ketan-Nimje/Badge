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
  Thumbnail,
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
          <Card sectioned title="Product title">
            <div className="row row-0">
              <div className="col col-md-3 col-12">
                <Card>
                  <div className="product-card-content">
                    <img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg" />
                  </div>
                  <Card.Section>
                    <Heading>$700 CAD</Heading>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </Card.Section>
                </Card>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col col-md-6 col-12">
                <div style={{ maxWidth: 114 }} className="mt-2">
                  <DropZone label="Mobile">
                    <DropZone.FileUpload />
                  </DropZone>
                </div>
              </div>
              <div className="col col-md-6 col-12">
                <div style={{ maxWidth: 114 }} className="mt-2">
                  <DropZone label="Desktop">
                    <DropZone.FileUpload />
                  </DropZone>
                </div>
              </div>
            </div>
            <div className="mt-5 mb-2">
              <Heading>Product Image title</Heading>
            </div>
            <div className="row row5">
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Bottom Left" />
                </div>
              </div>
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Bottom Right" />
                </div>
              </div>
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Top Left" />
                </div>
              </div>
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Top Right" />
                </div>
              </div>
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Full Top" />
                </div>
              </div>
              <div className="col col-md-2 col-12">
                <Thumbnail
                  source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg"
                  size="large"
                  alt="Black choker necklace"
                />
                <div className="mt-1">
                  <RadioButton label="Full Bottom" />
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col col-md-6 col-12">
                <div style={{ maxWidth: 114 }} className="mt-2">
                  <DropZone label="Color Title ">
                    <DropZone.FileUpload />
                  </DropZone>
                </div>
              </div>
              <div className="col col-md-6 col-12">
                <div style={{ maxWidth: 114 }} className="mt-2">
                  <DropZone label="Full image Title">
                    <DropZone.FileUpload />
                  </DropZone>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
export default Pramotions;
