import React, { useEffect, useState } from "react";
import { Page, Card, Button } from "@shopify/polaris";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../Apiservice";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
import { baseUrl } from "../../routesList";

const PramotionsList = () => {
  const apiService = new ApiService();
  const navigation = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [pramotionsList, setPramotionsList] = useState([]);

  useEffect(() => {
    getPramotionsList();
  }, []);

  const getPramotionsList = async () => {
    const payload = { page_no: "" };
    const data = await apiService.getPramotionsList(payload);
    if (data.status === true) {
      setPramotionsList(data.data);
    }
  };

  const onRedirect = (id) => {
    navigation(`${baseUrl}/pramotions/${id}?${urlParams.toString()}`);
  };

  return (
    <Page
      title="Pramotions List"
      primaryAction={
        <Button primary onClick={() => onRedirect("new")}>
          New Pramotions
        </Button>
      }
    >
      <Card>
        <div className="Polaris-DataTable Polaris-DataTable__ShowTotals">
          <div className="Polaris-DataTable__ScrollContainer">
            <table className="Polaris-DataTable__Table">
              <thead>
                <tr>
                  <th
                    data-polaris-header-cell="true"
                    className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header "
                    scope="col"
                  >
                    Title
                  </th>
                  <th
                    className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pramotionsList.map((x, i) => {
                  return (
                    <tr
                      className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable"
                      key={i}
                    >
                      <th
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                        scope="row"
                      >
                        {x.title}
                      </th>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        <Button
                          icon={EditMinor}
                          onClick={() => onRedirect(x.pramotions_id)}
                        />
                        &nbsp;&nbsp;
                        <Button icon={DeleteMinor} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Page>
  );
};
export default PramotionsList;
