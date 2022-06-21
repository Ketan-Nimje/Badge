import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import {
  Page,
  Layout,
  Card,
  TextField,
  Checkbox,
  DropZone,
  PageActions,
  FormLayout,
  Select,
  Stack,
  RadioButton,
  Button,
  Thumbnail,
} from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import ApiService from "../../Apiservice";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { baseUrl } from "../../routesList";

const initialState = {
  chooseYourBadges: "1",
  badgePosition: "1",
  labelRatio: "1",
  width: "0",
  height: "0",
  marginTop: "0",
  marginBottom: "0",
  fontSize: "12",
  textStyle: "1",
  fontcolor: "#000000",
  backgroundcolor: "#ffffff",
  shadow: "0",
  shadowColor: "#ffffff",
  borderRadius: "0",
  opacity: "1",
  badgesText: "",
  badgesImage: "",
  appliesTo: "AllProduct",
};

const Pramotions = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { id } = useParams();
  const apiService = new ApiService();
  const [date, setDate] = useState({
    startDate: moment().subtract(29, "days"),
    endDate: moment(),
  });
  const [pramotionsDetails, setPramotionsDetails] = useState(initialState);
  const [title, setTitle] = useState("");
  const [showOn, setShowOn] = useState([]);
  const [specificCollectionsId, setSpecificCollectionsId] = useState([]);
  const [specificProductId, setSpecificProductId] = useState([]);
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      getPramotion();
    }
  }, []);

  const getPramotion = async () => {
    const data = await apiService.editPramotions({ id });
    if (data.status) {
      setTitle(data.data.title);
      setShowOn(data.data.show_on.split(","));
      const jsonDecode = JSON.parse(data.data.pramotions_json);
      setPramotionsDetails(jsonDecode);
      setSpecificCollectionsId(data.data.specific_collections_id || []);
      setSpecificProductId(data.data.specific_product_id || []);
      setDate({ startDate: data.data.start_date, endDate: data.data.end_date });
    }
  };

  const onChangeCheckBox = (value) => {
    const clone = [...showOn];
    const index = clone.findIndex((x) => x === value);
    if (index === -1) {
      clone.push(value);
    } else {
      clone.splice(index, 1);
    }
    setShowOn(clone);
  };

  const onChangeDate = (start, end) => {
    setDate({ startDate: moment(start), endDate: moment(end) });
  };

  const handleDropZoneDrop = (_dropFiles, acceptedFiles, _rejectedFiles) => {
    setPramotionsDetails({
      ...pramotionsDetails,
      badgesImage: acceptedFiles[0],
    });
  };

  const onChangeText = (event) => {
    const { name, value } = event.target;
    setPramotionsDetails({ ...pramotionsDetails, [name]: value });
  };

  const savePramotions = async () => {
    setIsSave(true);
    const formData = new FormData();
    if (id !== "new") {
      formData.append("id", id);
    }
    formData.append("title", title);
    formData.append("show_on", JSON.stringify(showOn));
    formData.append(
      "specific_collections_id",
      JSON.stringify(specificCollectionsId)
    );
    formData.append("specific_product_id", JSON.stringify(specificProductId));
    formData.append("start_date", date.startDate);
    formData.append("end_date", date.endDate);
    Object.keys(pramotionsDetails).map((x) => {
      formData.append(`pramotions_json[${x}]`, pramotionsDetails[x]);
    });

    const data = await apiService.savePramotions(formData);
    if (data.status) {
      setIsSave(false);
      navigation(`${baseUrl}/pramotions-list?${urlParams.toString()}`);
    } else {
      setIsSave(false);
    }
  };

  const onOpenProductModal = () => {
    setIsOpenProductModal(true);
  };
  const onCloseProductModal = () => {
    setIsOpenProductModal(false);
  };

  const onSelectProduct = (record) => {
    if (pramotionsDetails.appliesTo === "Collection") {
      let collectionList = [];
      record.selection.map((x) => {
        let obj = {
          handle: x.handle,
          id: x.id,
          image: x.image,
          title: x.title,
        };
        collectionList.push(obj);
      });
      setSpecificCollectionsId(collectionList);
      setIsOpenProductModal(false);
    } else {
      let productList = [];
      record.selection.map((x) => {
        let obj = {
          handle: x.handle,
          id: x.id,
          image: x && x.images && x.images[0] && x.images[0].originalSrc,
          title: x.title,
        };
        productList.push(obj);
      });
      setSpecificProductId(productList);
      setIsOpenProductModal(false);
    }
  };

  return (
    <Page
      title="Pramotions"
      breadcrumbs={[
        {
          content: "Settings",
          onAction: () =>
            navigation(`${baseUrl}/pramotions-list?${urlParams.toString()}`),
        },
      ]}
    >
      {isOpenProductModal && (
        <ResourcePicker
          resourceType={
            pramotionsDetails.appliesTo == "Collection"
              ? "Collection"
              : "Product"
          }
          showVariants={false}
          open={isOpenProductModal}
          onCancel={onCloseProductModal}
          onSelection={onSelectProduct}
          initialSelectionIds={
            pramotionsDetails.appliesTo == "Collection"
              ? specificCollectionsId
              : specificProductId
          }
        />
      )}

      <Layout>
        <Layout.AnnotatedSection title="Pramotion Name">
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Pramotion Name"
                value={title}
                onChange={(value) => setTitle(value)}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Choose where you want to place your pramotion atmosphere">
          <Card sectioned>
            <FormLayout>
              <Checkbox
                label="Product Listing Page"
                onChange={() => onChangeCheckBox("1")}
                checked={showOn.findIndex((x) => x === "1") !== -1}
              />
              <Checkbox
                label="Product Display Page"
                onChange={() => onChangeCheckBox("2")}
                checked={showOn.findIndex((x) => x === "2") !== -1}
              />
              <Checkbox
                label="Cart"
                onChange={() => onChangeCheckBox("3")}
                checked={showOn.findIndex((x) => x === "3") !== -1}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Choose the dates for which pramotion is applicable">
          <Card sectioned>
            <FormLayout>
              <DateRangePicker
                autoApply={true}
                onCallback={(start, end) => onChangeDate(start, end)}
              >
                <div className="date-filter-btn">
                  <TextField
                    readOnly={true}
                    label="Promo Period"
                    placeholder="Start Date - End Date"
                    value={`${moment(date.startDate).format(
                      "DD-MM-YYYY"
                    )} - ${moment(date.endDate).format("DD-MM-YYYY")}`}
                  />
                </div>
              </DateRangePicker>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Badge customization">
          <Card sectioned>
            <FormLayout>
              <Select
                label={"Choose Your Badges"}
                options={[
                  { label: "Color palette and Text", value: "1" },
                  { label: "Upload Images", value: "2" },
                ]}
                value={pramotionsDetails.chooseYourBadges}
                onChange={(value) =>
                  onChangeText({ target: { name: "chooseYourBadges", value } })
                }
              />
            </FormLayout>
            {pramotionsDetails.chooseYourBadges === "1" ? (
              <div className="mt-5">
                <FormLayout>
                  <TextField
                    label="Badges Text"
                    value={pramotionsDetails.badgesText}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "badgesText", value },
                      })
                    }
                  />
                </FormLayout>
              </div>
            ) : (
              <div className="mt-5">
                <FormLayout>
                  <DropZone
                    label="Badges Image"
                    allowMultiple={false}
                    onDrop={handleDropZoneDrop}
                  >
                    {!pramotionsDetails.badgesImage && <DropZone.FileUpload />}
                    {pramotionsDetails.badgesImage && (
                      <div className="badgesImage">
                        <img
                          src={
                            pramotionsDetails &&
                              pramotionsDetails.badgesImage &&
                              pramotionsDetails.badgesImage.name
                              ? window.URL.createObjectURL(
                                pramotionsDetails.badgesImage
                              )
                              : pramotionsDetails.badgesImage
                          }
                        />
                      </div>
                    )}
                  </DropZone>
                </FormLayout>
              </div>
            )}

            <div className="mt-3">
              <FormLayout>
                <FormLayout.Group>
                  <Select
                    label={"Badge Position"}
                    options={[
                      { label: "Bottom Left", value: "1" },
                      { label: "Bottom Right", value: "2" },
                      { label: "Top Left", value: "3" },
                      { label: "Top Right", value: "4" },
                      { label: "Full Top", value: "5" },
                      { label: "Full Bottom", value: "6" },
                    ]}
                    value={pramotionsDetails.badgePosition}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "badgePosition", value },
                      })
                    }
                  />
                  <Select
                    label={"Label Ratio"}
                    options={[
                      { label: "Fixed (px)", value: "1" },
                      { label: "Percentage (%)", value: "2" },
                    ]}
                    value={pramotionsDetails.labelRatio}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "labelRatio", value },
                      })
                    }
                  />
                  <TextField
                    label="Width"
                    suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                    type="number"
                    value={pramotionsDetails.width}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "width", value },
                      })
                    }
                  />
                  <TextField
                    label="Height"
                    type="number"
                    suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                    value={pramotionsDetails.height}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "height", value },
                      })
                    }
                  />
                  <TextField
                    label="Margin top"
                    type="number"
                    suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                    value={pramotionsDetails.marginTop}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "marginTop", value },
                      })
                    }
                  />
                  <TextField
                    label="Margin bottom"
                    type="number"
                    suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                    value={pramotionsDetails.marginBottom}
                    onChange={(value) =>
                      onChangeText({
                        target: { name: "marginBottom", value },
                      })
                    }
                  />
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      label="Font size"
                      type="number"
                      suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                      value={pramotionsDetails.fontSize}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "fontSize", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <Select
                      label={"Text style"}
                      options={[
                        { label: "Normal", value: "1" },
                        { label: "Italic", value: "2" },
                      ]}
                      value={pramotionsDetails.textStyle}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "textStyle", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      suffix={pramotionsDetails.fontcolor}
                      label="Font color"
                      type="color"
                      value={pramotionsDetails.fontcolor}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "fontcolor", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      suffix={pramotionsDetails.backgroundcolor}

                      label="Background color"
                      type="color"
                      value={pramotionsDetails.backgroundcolor}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "backgroundcolor", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      label="Shadow"
                      type="number"
                      suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                      value={pramotionsDetails.shadow}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "shadow", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      suffix={pramotionsDetails.shadowColor}

                      label="Shadow color"
                      type="color"
                      value={pramotionsDetails.shadowColor}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "shadowColor", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      label="Border radius"
                      type="number"
                      suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                      value={pramotionsDetails.borderRadius}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "borderRadius", value },
                        })
                      }
                    />
                  )}
                  {pramotionsDetails.chooseYourBadges === "1" && (
                    <TextField
                      label="Opacity"
                      type="number"
                      suffix={pramotionsDetails.labelRatio === "1" ? "px" : "%"}
                      value={pramotionsDetails.opacity}
                      onChange={(value) =>
                        onChangeText({
                          target: { name: "opacity", value },
                        })
                      }
                    />
                  )}
                </FormLayout.Group>
              </FormLayout>
            </div>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Condition">
          <Card>
            <Card.Section>
              <Stack vertical>
                <Stack.Item>
                  <RadioButton
                    label="All products"
                    checked={pramotionsDetails.appliesTo === "AllProduct"}
                    id="Allproducts"
                    name="appliesTo"
                    onChange={() =>
                      onChangeText({
                        target: { name: "appliesTo", value: "AllProduct" },
                      })
                    }
                  />
                </Stack.Item>
                <Stack.Item>
                  <RadioButton
                    label="Specific collections"
                    id="specificCollections"
                    name="appliesTo"
                    checked={pramotionsDetails.appliesTo === "Collection"}
                    onChange={() =>
                      onChangeText({
                        target: { name: "appliesTo", value: "Collection" },
                      })
                    }
                  />
                </Stack.Item>
                <Stack.Item>
                  <RadioButton
                    label="Specific products"
                    id="specificProducts"
                    name="appliesTo"
                    checked={pramotionsDetails.appliesTo === "Product"}
                    onChange={() =>
                      onChangeText({
                        target: { name: "appliesTo", value: "Product" },
                      })
                    }
                  />
                </Stack.Item>
                <Stack.Item>
                  {pramotionsDetails.appliesTo !== "AllProduct" ? (
                    <Button primary onClick={onOpenProductModal}>
                      {pramotionsDetails.appliesTo === "Collection"
                        ? "Select Collection"
                        : "Select Product"}
                    </Button>
                  ) : (
                    ""
                  )}
                </Stack.Item>
              </Stack>
            </Card.Section>
            {pramotionsDetails.appliesTo !== "AllProduct" ? (
              <Card.Section
                title={
                  pramotionsDetails.appliesTo === "Collection"
                    ? "Selected Collections"
                    : "Selected Products"
                }
              >
                {pramotionsDetails.appliesTo === "Collection"
                  ? specificCollectionsId.map((x, i) => {
                    return (
                      <div
                        className="row row5 align-item-center mb-2"
                        key={i}
                      >
                        <div className="col col-auto">
                          <Thumbnail
                            size="small"
                            source={x.image ? x.image : ImageMajor}
                          />
                        </div>
                        <div className="col">{x.title}</div>
                      </div>
                    );
                  })
                  : specificProductId.map((x, i) => {
                    return (
                      <div
                        className="row row5 align-item-center mb-2"
                        key={i}
                      >
                        <div className="col col-auto">
                          <Thumbnail
                            size="small"
                            source={x.image ? x.image : ImageMajor}
                          />
                        </div>
                        <div className="col">{x.title}</div>
                      </div>
                    );
                  })}
              </Card.Section>
            ) : (
              ""
            )}
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <br />
      <PageActions
        primaryAction={{
          content: "Save",
          loading: isSave,
          onAction: savePramotions,
        }}
      />
    </Page>
  );
};
export default Pramotions;
