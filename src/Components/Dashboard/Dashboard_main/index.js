import React, { Fragment, useState, useEffect } from "react";
import { Typography } from "@mui/material"; // Keeping Typography from MUI
import { Container, Row, Col } from "react-bootstrap"; // For fluid container and row/col
import axios from "axios";
import CommunicationStatus from "../../charts/CommunicationStatus";
import NonCommunicatedMeters from "../../charts/NonCommunicatedMeters";
import NeverCommunicatedMeters from "../../charts/NeverCommunicatedMeters";
import CommunicationStatusonMITypes from "../../charts/CommunicationStatusonMITypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { RiBillLine } from "react-icons/ri";
import { TreeSelect } from "antd"; // Keeping TreeSelect from Ant Design
import "./Dashboard.css";
import LoadSwitchStatus from "../../charts/LoadSwitch";
import OlderonMITypes from "../../charts/OlderonMITypes";

const { SHOW_PARENT } = TreeSelect;

const renameKeys = (data, keyMap) => {
  return data.map((item) => {
    const newItem = {
      [keyMap.title]: item.text,
      [keyMap.value]: item.id,
      [keyMap.code]: item.code,
    };
    if (item.inc) {
      newItem[keyMap.children] = renameKeys(item.inc, keyMap);
    }
    return newItem;
  });
};

const Index = () => {
  const [tods, setTods] = useState([]);
  const [prds, setProducts] = useState([]);
  const [psts, setPosts] = useState([]);
  const [menclCount, setmenclCount] = useState();
  const [womenclCount, setwomenclCount] = useState();
  const [jewCount, setjewCount] = useState();
  const [electCount, setelectCount] = useState();
  const [office, setOffice] = useState("3459274e-f20f-4df8-a960-b10c5c228d3e");
  const data = [{
    "code": "Fluentgrid",
    "text": "Fluentgrid",
    "id": "3459274e-f20f-4df8-a960-b10c5c228d3e",
    "inc": [
        {
            "code": "Vishakhapatnam",
            "text": "FG LOCAL",
            "id": "94ca1bc1-6fb2-459e-acf8-8c943ca7bd5a",
            "inc": [
                {
                    "code": "Rushikonda",
                    "text": "Rushikonda",
                    "id": "194ba864-ba77-4442-abf9-e5ddc7bd4a16",
                    "inc": [
                        {
                            "code": "FGRF_Wirepas",
                            "text": "FGRF_Wirepas",
                            "id": "072ec111-14f4-4eb0-958d-acd3f3b03603",
                            "inc": []
                        },
                        {
                            "code": "00121",
                            "text": "FG-Smart Meter Lab",
                            "id": "20a080b9-4f4e-4a51-9feb-d88ec09b90d8",
                            "inc": [
                                {
                                    "code": "FG-AMI_Smart_Meter_Lab_Wall",
                                    "text": "FG-AMI_Smart_Meter_Lab_Wall",
                                    "id": "4c53f194-268d-42c9-99c4-cd8520050dbb",
                                    "inc": []
                                },
                                {
                                    "code": "FG-AMI_Smart_Meter_Lab_Stand",
                                    "text": "FG-AMI Smart Meter Lab Test Bench",
                                    "id": "a2059d97-4aed-41d0-b1b4-350e5b6e21de",
                                    "inc": [
                                        {
                                            "code": "STREET_LIGHT",
                                            "text": "Street Light",
                                            "id": "a85a8884-a85f-4b72-9ce2-d7d6c4d2a143",
                                            "inc": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "code": "ESKOM",
                            "text": "ISKRAEMECO",
                            "id": "28a14582-5416-40cf-b1b5-cc147a8f7ace",
                            "inc": []
                        },
                        {
                            "code": "Cyan AMISP",
                            "text": "Cyan AMISP",
                            "id": "28e465ed-c351-454f-9ca8-4f97205599f3",
                            "inc": [
                                {
                                    "code": "Schniederami",
                                    "text": "Schniederami",
                                    "id": "0e2a7a11-f2fd-46a3-8fad-42e884b9dbf9",
                                    "inc": []
                                },
                                {
                                    "code": "Genusami",
                                    "text": "Genusami",
                                    "id": "981f7326-8562-4821-a685-791989e24525",
                                    "inc": []
                                }
                            ]
                        },
                        {
                            "code": "TINYMESH AMISP",
                            "text": "TINYMESH AMISP",
                            "id": "34d7e675-d70c-47b5-a835-809f3460ec9d",
                            "inc": [
                                {
                                    "code": "TM-CPS",
                                    "text": "TM-CAPITAL",
                                    "id": "270528a0-4d71-4125-84c2-a2117584e4d1",
                                    "inc": []
                                },
                                {
                                    "code": "TM-VTK",
                                    "text": "TM-VTK",
                                    "id": "89e12ae5-1366-41b2-95e5-1582e8bac2cf",
                                    "inc": []
                                },
                                {
                                    "code": "TM-ALLIED",
                                    "text": "TM-ALLIED",
                                    "id": "e050bdea-86b1-4dc3-a4c9-42b3e730cda9",
                                    "inc": []
                                }
                            ]
                        },
                        {
                            "code": "TATAPOWER AMISP",
                            "text": "TATAPOWER AMISP",
                            "id": "4dfd5a57-a92d-4e25-b5c5-725b9ecf5c83",
                            "inc": []
                        },
                        {
                            "code": "VijayEle",
                            "text": "VijayEle",
                            "id": "5a19fba7-f2e4-453d-bca5-c9662ad21313",
                            "inc": []
                        },
                        {
                            "code": "HPLAMISP",
                            "text": "HPLAMISP",
                            "id": "5fd1ea95-1ac7-4a9b-b2e8-b5e5241ff50d",
                            "inc": []
                        },
                        {
                            "code": "PGCIL HPL",
                            "text": "PGCIL HPL",
                            "id": "66fcd4cb-1de6-4268-b81e-ed0c87837798",
                            "inc": []
                        },
                        {
                            "code": "ALLIED_AMISP",
                            "text": "ALLIED_AMISP",
                            "id": "774054e5-dd42-41b7-bb2e-ebae8766f675",
                            "inc": [
                                {
                                    "code": "VISIONTK",
                                    "text": "VISIONTK",
                                    "id": "4e21c1f5-1cb7-4c19-80ea-13c971aa5c89",
                                    "inc": []
                                },
                                {
                                    "code": "ALLIED_SP",
                                    "text": "ALLIED_SP",
                                    "id": "8b9afcf4-cb83-451d-98ff-21a6804aa734",
                                    "inc": []
                                }
                            ]
                        },
                        {
                            "code": "MPAdani",
                            "text": "MPAdani",
                            "id": "794c74d4-c2bf-4eb7-ac3e-e0d6cb66ec18",
                            "inc": []
                        },
                        {
                            "code": "Bundu",
                            "text": "Bundu",
                            "id": "7aede65f-cc4f-458f-b05e-8e6c4a5cbede",
                            "inc": []
                        },
                        {
                            "code": "FG_AMISP_1",
                            "text": "FG_AMISP_1",
                            "id": "7e0a879d-efcd-4858-99ad-30c408c96f22",
                            "inc": []
                        },
                        {
                            "code": "MP-Jabhalpur",
                            "text": "MP-Jabhalpur",
                            "id": "866143ae-acb8-4cec-a499-cbc3fbe5390a",
                            "inc": []
                        },
                        {
                            "code": "FGAMISP",
                            "text": "FGAMISP",
                            "id": "8c543aa7-f8f3-44ff-b64b-5523b3f5007b",
                            "inc": []
                        },
                        {
                            "code": "JabalpurMP",
                            "text": "JabalpurMP",
                            "id": "8ecdff69-fa83-46d6-a045-8d49e8263193",
                            "inc": []
                        },
                        {
                            "code": "IIPL_APDCL",
                            "text": "IIPL_APDCL",
                            "id": "984e505e-c7a1-4585-b988-c441e5c5cf5b",
                            "inc": []
                        },
                        {
                            "code": "Electrify",
                            "text": "Electrify",
                            "id": "9cdb2206-6dd2-4ade-b669-1330d4ecd367",
                            "inc": []
                        },
                        {
                            "code": "CS_Test",
                            "text": "CS_Test",
                            "id": "b417d2ca-13c2-43da-8874-8c2ec4c7b580",
                            "inc": []
                        },
                        {
                            "code": "MP",
                            "text": "MP",
                            "id": "b7bce2a7-41b7-4366-906d-da7fb16fb81b",
                            "inc": []
                        },
                        {
                            "code": "Vijaya Elec AMI SP",
                            "text": "Vijaya Elec AMI SP",
                            "id": "baa4fa16-dd41-4a40-89a0-8156a4e48296",
                            "inc": []
                        },
                        {
                            "code": "Adani-AMISP-3",
                            "text": "Adani-AMISP-3",
                            "id": "bb985b84-5b5c-42a3-9e60-a1aea9f7e672",
                            "inc": []
                        },
                        {
                            "code": "VISIONTEK_AMISP",
                            "text": "VISIONTEK_AMISP",
                            "id": "bdd2d0ea-422d-44ef-9b00-a8907a05bdd5",
                            "inc": []
                        },
                        {
                            "code": "GMR",
                            "text": "GMR",
                            "id": "c876d4ab-c2b2-4e9e-9013-0f45b4305257",
                            "inc": []
                        },
                        {
                            "code": "MPVisionTK",
                            "text": "MPVisionTK",
                            "id": "ca7b26d8-8455-4147-b286-c63045ff6ab6",
                            "inc": []
                        },
                        {
                            "code": "BhopalAdani",
                            "text": "BhopalAdani",
                            "id": "e1bbc9e5-6f13-412d-8449-e349de274c90",
                            "inc": []
                        },
                        {
                            "code": "AMI-SP",
                            "text": "SECURE AMI-SP",
                            "id": "e67bf16c-c3e0-430e-93dd-1be303d1b21b",
                            "inc": []
                        },
                        {
                            "code": "PSPCL",
                            "text": "PSPCL",
                            "id": "e9f02712-b302-4f9e-850a-b99629bd0dbc",
                            "inc": []
                        },
                        {
                            "code": "Adani-AMISP-1",
                            "text": "Adani-AMISP-1",
                            "id": "ee936009-fa4a-46c2-84dc-58b97cbe2c2f",
                            "inc": []
                        },
                        {
                            "code": "AMI-LAB",
                            "text": "AMI-LAB",
                            "id": "f40af32e-c631-447e-8df6-600446f6210d",
                            "inc": []
                        },
                        {
                            "code": "Adani-AMISP-2",
                            "text": "Adani-AMISP-2",
                            "id": "f737a241-ead8-4950-9f4a-48a82f171b14",
                            "inc": []
                        },
                        {
                            "code": "AVON",
                            "text": "AVON",
                            "id": "ffeb1b86-9a05-4190-8621-c2198d80b37c",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "ADANI MUMBAI",
                    "text": "ADANI MUMBAI",
                    "id": "2111828d-1ab9-4fba-9d20-a4a4515109a8",
                    "inc": [
                        {
                            "code": "BCITS RF ADANI",
                            "text": "BCITS RF ADANI",
                            "id": "301364a0-25a4-4829-bbbe-700bf947ccd4",
                            "inc": []
                        },
                        {
                            "code": "PROBUS ADANI",
                            "text": "PROBUS ADANI",
                            "id": "6ada13f5-e5a4-45fa-adca-a5d053f0c8e5",
                            "inc": []
                        },
                        {
                            "code": "GPRS ADANI",
                            "text": "GPRS ADANI",
                            "id": "6c98ff5f-5efc-4488-b106-13ae2f01bf46",
                            "inc": []
                        },
                        {
                            "code": "CC RF Adani",
                            "text": "CC RF Adani",
                            "id": "b15951ef-b207-48df-9d90-c7f5ad7d7ec7",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "Elecrama2023",
                    "text": "Elecrama2023",
                    "id": "21169a50-ed64-4ebe-8cd2-5b23fef2bfd3",
                    "inc": []
                },
                {
                    "code": "IEEMA",
                    "text": "IEEMA",
                    "id": "360a5c01-04df-439a-928b-8358dd816840",
                    "inc": [
                        {
                            "code": "IEEMA_GPRS",
                            "text": "IEEMA_GPRS",
                            "id": "81b1e0b4-795f-4cef-8848-aab2a476f592",
                            "inc": []
                        },
                        {
                            "code": "IEEMA_ RF",
                            "text": "IEEMA_ RF",
                            "id": "c488c4c6-9c4e-464c-9d59-a52dfc2cd9f7",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "EA",
                    "text": "Energy Audit",
                    "id": "40b74c19-c769-4753-a230-bb2a890c13c8",
                    "inc": []
                },
                {
                    "code": "FG EL Sewedy",
                    "text": "FG EL Sewedy",
                    "id": "4e0c55d3-710c-4239-b572-6e5f0a8b4b13",
                    "inc": []
                },
                {
                    "code": "MegaHz",
                    "text": "MegaHz",
                    "id": "5050728e-b304-407c-87c7-104462987809",
                    "inc": [
                        {
                            "code": "Allied",
                            "text": "Allied",
                            "id": "75b1f2d0-b04a-4035-9bc2-5247c44dafe8",
                            "inc": []
                        },
                        {
                            "code": "HP",
                            "text": "HP",
                            "id": "d87e1026-8965-4564-8121-2cab9a7ad434",
                            "inc": []
                        },
                        {
                            "code": "TestAllied",
                            "text": "TestAllied",
                            "id": "ec21c501-6501-44d0-a780-08cce4b8b7f2",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "Probus_Adani",
                    "text": "Probus_Adani",
                    "id": "60c3fdb2-9620-4ff9-8a2c-cdd1402dcdf3",
                    "inc": []
                },
                {
                    "code": "GVPR",
                    "text": "GVPR",
                    "id": "66274ea0-1c17-491f-bb15-9a7a6d5d31d1",
                    "inc": [
                        {
                            "code": "Secure",
                            "text": "Secure",
                            "id": "c2fc4eb4-c24a-4d39-ba28-27c7005f06fb",
                            "inc": []
                        },
                        {
                            "code": "Capital",
                            "text": "Capital",
                            "id": "dbe00897-c1c8-4a52-b1bf-d9c22eec0d8c",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "JPM",
                    "text": "JPM",
                    "id": "6bf85c1d-8507-4865-845d-11e7ed925ba8",
                    "inc": []
                },
                {
                    "code": "NURI_PNG",
                    "text": "NURI_PNG",
                    "id": "77389d86-ea96-4b4a-aca5-9a918b631c59",
                    "inc": []
                },
                {
                    "code": "Bhopal_AMI",
                    "text": "Bhopal_AMI",
                    "id": "8eab53cb-0c58-48b1-b336-e224b9988a2c",
                    "inc": [
                        {
                            "code": "HPL",
                            "text": "HPL",
                            "id": "07b4cf6a-762c-41bb-ae9e-4e67ac945b03",
                            "inc": []
                        },
                        {
                            "code": "VisionTek",
                            "text": "VisionTek",
                            "id": "6ecca4f0-8891-4a30-a472-7a22f5b94194",
                            "inc": []
                        },
                        {
                            "code": "Schnieder",
                            "text": "Schnieder",
                            "id": "a44a1b8e-e7e1-494e-9dc0-b4587691dae5",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "GOA",
                    "text": "GOA",
                    "id": "9cc2c29c-64a3-41d1-ab9b-8598aa3c6166",
                    "inc": []
                },
                {
                    "code": "TPL_Probus",
                    "text": "TPL_Probus",
                    "id": "ab26f111-3a64-4453-b4e0-901310f8031d",
                    "inc": []
                },
                {
                    "code": "2102",
                    "text": "FGRFWP",
                    "id": "d8a52430-fad7-4a33-853b-2d5fecc421fd",
                    "inc": []
                },
                {
                    "code": "BEST_MUMBAI",
                    "text": "BEST_MUMBAI",
                    "id": "f3488c58-8fb0-4838-bfeb-e3566f3f4ff7",
                    "inc": []
                },
                {
                    "code": "Uttarakhand_POC",
                    "text": "Uttarakhand POC",
                    "id": "f9680ef6-54aa-42f3-8b92-73ea16342b70",
                    "inc": [
                        {
                            "code": "Schnieder1",
                            "text": "Schnieder1",
                            "id": "230b6dec-b912-4731-b4d6-18c52031d73c",
                            "inc": []
                        },
                        {
                            "code": "GENUS",
                            "text": "GENUS",
                            "id": "a9f8d3c8-6bc3-4a5b-ab3f-1253fd73fec9",
                            "inc": []
                        }
                    ]
                },
                {
                    "code": "FG RF AMISP",
                    "text": "FG RF AMISP",
                    "id": "fdb4d501-4b4a-4a48-aa2a-67c438bc4e3b",
                    "inc": [
                        {
                            "code": "VTK RF Office",
                            "text": "VTK RF Office",
                            "id": "15c57d15-5d22-4823-9945-2f3cbdc46b46",
                            "inc": []
                        },
                        {
                            "code": "CPS RF Office",
                            "text": "CPS RF Office",
                            "id": "4680df37-2aa6-4ca5-83d8-4327e3dcb25f",
                            "inc": []
                        }
                    ]
                }
            ]
        },
        {
            "code": "0012",
            "text": "spmtest",
            "id": "cb007375-5fe6-497c-a6a0-a61420ca01e8",
            "inc": []
        },
        {
            "code": "001",
            "text": "TP-M",
            "id": "fd4c1f15-4660-43fe-bb2d-4af034ef1ca8",
            "inc": []
        }
    ]
  }
  ]
  const keyMap = {
    title: "title",
    children: "children",
    value: "value",
    code: "code",
  };

  const transformedData = renameKeys(data, keyMap);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTods(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const ps = response.data;
        const d1 = ps.filter((p) => p.category === "men's clothing");
        const d2 = ps.filter((p) => p.category === "women's clothing");
        const d3 = ps.filter((p) => p.category === "jewelery");
        const d4 = ps.filter((p) => p.category === "electronics");
        setmenclCount(d1.length);
        setwomenclCount(d2.length);
        setjewCount(d3.length);
        setelectCount(d4.length);
        setProducts(ps);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  const onChange = (newValue) => {
    console.log("onChange ", newValue);
    setOffice(newValue);
  };

  return (
    <Fragment>
      <div id="pdfdownload">
      <Container fluid>
        <Row className="mb-3">
          <Col xs={12} md={{ span: 4, offset: 3 }}>
            <TreeSelect
              style={{ width: "100%" }}
              value={office}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              onChange={onChange}
              treeData={transformedData}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          {[menclCount, womenclCount, jewCount, electCount].map((count, index) => (
            <Col key={index} xs={12} md={6} lg={3}>
              <div className="iq-card">
                <div
                  className={`iq-card-body iq-bg-${
                    ["primary", "warning", "danger", "info"][index]
                  } rounded-4`}
                  style={{
                    backgroundColor: ["#ceebee", "#fae9dd", "#fcecec", "#e5faff"][index],
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      backgroundColor: ["#ceebee ", "#fae9dd", "#fcecec", "#e5faff"][index],
                      borderRadius: "10px",
                      padding: "10px 10px",
                    }}
                  >
                    <div
                      className={`rounded-circle iq-card-icon bg-${
                        ["primary", "warning", "danger", "info"][index]
                      }`}
                    >
                      <RiBillLine style={{ fontSize: "30px" }} />
                    </div>
                    <div
                      className="text-end"
                      style={{ width: "20vh", height: "11vh" }}
                    >
                      <Typography variant="p" style={{ fontSize: "14px" }}>
                        {
                          [
                            "Meter Count",
                            "Active Meters",
                            "De-active Meters",
                            "Today Active",
                          ][index]
                        }
                      </Typography>
                      <Typography variant="h5" className="mb-0">
                        <span className="counter" style={{ fontSize: "14px" }}>
                          {count}
                        </span>
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>


        <Row className="mb-3 g-2">
          <Col md={4}>
            <CommunicationStatus key={office} officeid={office} />
          </Col>
          <Col md={4}>
            <NonCommunicatedMeters key={office} officeid={office} />
          </Col>
          <Col md={4}>
            <NeverCommunicatedMeters key={office} officeid={office} />
          </Col>
        </Row>


        <Row className="mb-3">
          <Col md={12}>
            <LoadSwitchStatus key={office} officeid={office} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <CommunicationStatusonMITypes key={office} officeid={office} />
          </Col>
          <Col md={6}>
            <OlderonMITypes key={office} officeid={office} />
          </Col>
        </Row>
      </Container>
      </div>
    </Fragment>
  );
};

export default Index;