import React, { useEffect, useState } from "react";
import { Page, Card, Button } from "@shopify/polaris";

import ApiService from "../../Apiservice";

const PramotionsList = () => {
  const apiService = new ApiService();
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

  return (
    <Page title="Pramotions List">
      <Card>
        <div class="Polaris-DataTable Polaris-DataTable__ShowTotals">
          <div class="Polaris-DataTable__ScrollContainer">
            <table class="Polaris-DataTable__Table">
              <thead>
                <tr>
                  <th
                    data-polaris-header-cell="true"
                    class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header "
                    scope="col"
                  >
                    Title
                  </th>
                  <th
                    class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
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
                      class="Polaris-DataTable__TableRow Polaris-DataTable--hoverable"
                      key={i}
                    >
                      <th
                        class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                        scope="row"
                      >
                        {x.title}
                      </th>
                      <td class="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        <Button>Edit</Button>&nbsp;&nbsp;
                        <Button>Delete</Button>
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
