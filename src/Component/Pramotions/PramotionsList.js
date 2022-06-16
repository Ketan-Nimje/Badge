import React, { useEffect, useState } from "react";
import { Page, Card, Button, Spinner, Pagination } from "@shopify/polaris";
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
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState("");
  const [totalReacord, setTotalReacord] = useState("");
  const [pageno, setPageno] = useState(0);
  useEffect(() => {
    getPramotionsList();
  }, [pageno]);

  const getPramotionsList = async () => {
    setIsLoading(true);
    const payload = { page_no: pageno };
    const data = await apiService.getPramotionsList(payload);
    if (data.status === true) {
      setPramotionsList(data.data);
      setTotalPage(data.totalPage);
      setTotalReacord(data.totalReacord);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const onNext = () => {
    setPageno(pageno + 1);
  };
  const onPrevious = () => {
    setPageno(pageno - 1);
  };

  const onRedirect = (id) => {
    navigation(`${baseUrl}/pramotions/${id}?${urlParams.toString()}`);
  };

  const updateStatus = async (id, status) => {
    const data = await apiService.updateStatus({ id: id, status: status });
    if (data.status) {
      const clone = [...pramotionsList];
      const index = clone.findIndex((x) => x.pramotions_id === id);
      if (status === "2") {
        if (index !== -1) {
          clone.splice(index, 1);
          setPramotionsList(clone);
        }
      } else {
        clone[index].status = status;
        setPramotionsList(clone);
      }
    } else {
    }
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
                    className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header"
                    scope="col"
                  >
                    Status
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
                {isLoading ? (
                  <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                    <th
                      colSpan={3}
                      className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                      scope="row"
                    >
                      <div
                        className="d-flex justify-content-center"
                        style={{ padding: "50px 0" }}
                      >
                        <Spinner />
                      </div>
                    </th>
                  </tr>
                ) : (
                  pramotionsList.map((x, i) => {
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
                        <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop ">
                          <div className="switch-button">
                            <input
                              id={`Switch${i}`}
                              type="checkbox"
                              className="switch-btn-input"
                              checked={x.status == 1}
                              onChange={(e) =>
                                updateStatus(
                                  x.pramotions_id,
                                  e.target.checked ? "1" : "0"
                                )
                              }
                            />
                            <label
                              htmlFor={`Switch${i}`}
                              className="witch-button-label"
                            />
                          </div>
                        </td>
                        <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                          <Button
                            icon={EditMinor}
                            onClick={() => onRedirect(x.pramotions_id)}
                          />
                          &nbsp;&nbsp;
                          <Button
                            icon={DeleteMinor}
                            onClick={() => updateStatus(x.pramotions_id, "2")}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
                <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                  <th
                    colSpan={3}
                    className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                    scope="row"
                  >
                    <Pagination
                      hasPrevious={pageno === 0 ? false : true}
                      onPrevious={onPrevious}
                      hasNext={pageno < totalPage - 1 ? true : false}
                      onNext={onNext}
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Page>
  );
};
export default PramotionsList;
