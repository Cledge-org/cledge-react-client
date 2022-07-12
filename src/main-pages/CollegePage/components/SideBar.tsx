import React, { useCallback, useEffect, useState } from "react";
import { Menu, Divider, Row, Col } from "antd";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import CheckBoxFilter from "src/main-pages/CollegePage/components/CheckBoxFilter/CheckBoxFilter";
import MinMaxFilter from "src/main-pages/CollegePage/components/MinMaxFilter/MinMaxFilter";
import dicts from "../../../../college-search-tool/assets/cst_result_parse.json";

const { SubMenu } = Menu;
const SiderWrapper = styled.div`
  & .MuiFormGroup-root {
    padding-left: 48px;
  }

  & .ant-menu {
    background-color: #fafafa;
  }

  & .ant-menu-submenu {
    background-color: #fafafa;
  }

  & .ant-menu-title-content {
    font-weight: 700;
    font-size: 0.9rem;
  }

  & .ant-menu-submenu-title {
    width: 100% !important;
  }

  & .MuiFormControlLabel-root .MuiTypography-root {
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
  }

  & .MuiFormControlLabel-root {
    align-items: start;
  }

  & .MuiCheckbox-root {
    padding-top: 0;
  }

  & .MuiTypography-root {
    padding-top: 2px;
  }

  & .text-secondary {
    padding-left: 12px;
    font-size: 12px;
  }
`;

interface SiderProps {
  setFilter: Function;
}

const Sider = (props: SiderProps) => {
  const [allFilters, setAllFilters] = useState({});
  const { setFilter } = props;
  const titleToOdataKeys = {
    "School Type": "CONTROL",
    Region: "REGION",
    "Areas of Study": "",
    "Calendar System": "CALSYS",
    "Overall Acceptance Rate": "ADM_RATE",
    "Acceptance Rate: Men": "DVADM02",
    "Acceptance Rate: Women": "DVADM03",
    "In-state tuition": "TUITIONFEE_IN",
    "Out-of-state tuition": "TUITIONFEE_OUT",
    "SAT/ACT": "ADMCON7",
    "SAT range": "SAT_AVG",
    "ACT range": "ACT_AVG",
    "Total undergraduate population": "EFUG",
    "Median debt after graduation": "GRAD_DEBT_MDN",
    "Average salary 10 years after graduation": "MN_EARN_WNE_P10",
    "Freshman satisfaction (%)": "",
    "Students receiving aid (%)": "ANYAIDP",
  };
  const onChangeCheckBoxFilter = useCallback(
    (newOptions: string[] | number[], title: string) => {
      const copyOfFilters = { ...allFilters };
      if (newOptions.length > 0) {
        copyOfFilters[titleToOdataKeys[title]] = newOptions;
      } else if (copyOfFilters[titleToOdataKeys[title]]) {
        delete copyOfFilters[titleToOdataKeys[title]];
      }
      setAllFilters(copyOfFilters);
      setFilter(copyOfFilters);
    },
    [allFilters]
  );
  const onChangeMinMaxFilter = useCallback(
    (min: number, max: number, title: string, isDecimal?: boolean) => {
      const copyOfFilters = { ...allFilters };
      if (!isNaN(min)) {
        copyOfFilters[`${titleToOdataKeys[title]} min`] = isDecimal
          ? min / 100
          : min;
      } else if (copyOfFilters[`${titleToOdataKeys[title]} min`]) {
        delete copyOfFilters[`${titleToOdataKeys[title]} min`];
      }
      if (!isNaN(max)) {
        copyOfFilters[`${titleToOdataKeys[title]} max`] = isDecimal
          ? max / 100
          : max;
      } else if (copyOfFilters[`${titleToOdataKeys[title]} max`]) {
        delete copyOfFilters[`${titleToOdataKeys[title]} max`];
      }
      setAllFilters(copyOfFilters);
      setFilter(copyOfFilters);
    },
    [allFilters]
  );
  return (
    <SiderWrapper>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className="py-2"
        style={{ overflowY: "scroll", height: "calc(100vh - 59px)" }}
      >
        <h6 className="text-secondary">GENERAL</h6>
        <SubMenu key="sub1" title="School Type">
          <CheckBoxFilter
            title={"School Type"}
            key={"sub1"}
            mappedValues={[1, 2, 3]}
            options={["Public School", "Private School", "Community College"]}
            onChange={(newOptions: string[]) => {
              onChangeCheckBoxFilter(newOptions, "School Type");
            }}
          />
        </SubMenu>
        <SubMenu title={"Region"} key={"sub2"}>
          <CheckBoxFilter
            title={"Region"}
            key={"sub2"}
            mappedValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            options={[
              "U.S. Service Schools",
              "New England",
              "Mid East",
              "Great Lakes",
              "Plains",
              "Southeast",
              "Southwest",
              "Rocky Mountains",
              "Far West",
              "Outlying Areas",
            ]}
            onChange={(newOptions: string[]) => {
              onChangeCheckBoxFilter(newOptions, "Region");
            }}
          />
        </SubMenu>
        <SubMenu title={"Areas of Study"} key={"sub3"}>
          <CheckBoxFilter
            title={"Areas of Study"}
            key={"sub3"}
            options={[
              "Agriculture",
              "Natural resources and conservation",
              "Architecture",
              "Area, ethnic, and gender studies",
              "Communication/journalism",
              "Communication technologies",
              "Computer and information sciences",
              "Personal and culinary services",
              "Education",
              "Engineering",
              "Engineering technologies",
              "Foreign languages, literatures, and linguistics",
              "Family and consumer sciences",
              "Law/legal studies",
              "English",
              "Liberal arts/general studies",
              "Library science",
              "Biological/life sciences",
              "Mathematics and statistics",
              "Military science and military technologies",
              "Interdisciplinary studies",
              "Parks and recreation",
              "Philosophy and religious studies",
              "Theology and religious vocations",
              "Physical sciences",
              "Science technologies",
              "Psychology",
              "Homeland Security, law enforcement, firefighting, and protective services",
              "Public administration and social services",
              "Social sciences",
              "Construction trades",
              "Mechanic and repair technologies",
              "Precision production",
              "Transportation and materials moving",
              "Visual and performing arts",
              "Health professions and related programs",
              "Business/marketing",
              "History",
            ]}
            onChange={useCallback(
              (newOptions: string[]) => {
                const copyOfFilters = { ...allFilters };
                const newlyAdded = [];
                newOptions.forEach((newOption) => {
                  copyOfFilters[
                    `${dicts.cds_categories[newOption]} min`
                  ] = 0.000001;
                  newlyAdded.push(dicts.cds_categories[newOption]);
                });
                Object.keys(copyOfFilters).forEach((filter) => {
                  if (
                    filter.includes("PCI") &&
                    !newlyAdded.includes(filter.split(" ")[0])
                  ) {
                    delete copyOfFilters[filter];
                  }
                });
                setAllFilters(copyOfFilters);
                setFilter(copyOfFilters);
              },
              [allFilters]
            )}
          />
        </SubMenu>
        <SubMenu title={"Calendar System"} key={"sub4"}>
          <CheckBoxFilter
            title={"Calendar System"}
            key={"sub4"}
            mappedValues={[1, 2]}
            options={["Semester", "Quarter"]}
            onChange={(newOptions: string[]) => {
              onChangeCheckBoxFilter(newOptions, "Calendar System");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub5"} title={"Overall Acceptance Rate"}>
          <MinMaxFilter
            key={"sub5"}
            title={"Overall Acceptance Rate"}
            endAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Overall Acceptance Rate", true);
            }}
          />
        </SubMenu>
        <SubMenu key={"sub6"} title={"Acceptance Rate: Men"}>
          <MinMaxFilter
            key={"sub6"}
            title={"Acceptance Rate: Men"}
            endAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Acceptance Rate: Men", true);
            }}
          />
        </SubMenu>
        <SubMenu key={"sub7"} title={"Acceptance Rate: Women"}>
          <MinMaxFilter
            key={"sub7"}
            title={"Acceptance Rate: Women"}
            endAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Acceptance Rate: Women", true);
            }}
          />
        </SubMenu>
        <Divider />
        <h6 className="text-secondary">COST</h6>
        <SubMenu key={"sub8"} title={"In-state tuition"}>
          <MinMaxFilter
            key={"sub8"}
            title={"In-state tuition"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "In-state tuition");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub9"} title={"Out-of-state tuition"}>
          <MinMaxFilter
            key={"sub9"}
            title={"Out-of-state tuition"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Out-of-state tuition");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub10"} title={"Estimated cost of attendance"}>
          <MinMaxFilter
            key={"sub10"}
            hasSlider
            minInput={0}
            maxInput={100000}
            title={"Estimated cost of attendance"}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Estimated cost of attendance");
            }}
          />
        </SubMenu>
        <Divider />
        <h6 className="text-secondary">APPLICATION REQUIREMENTS</h6>
        <SubMenu title={"SAT/ACT"} key={"sub11"}>
          <CheckBoxFilter
            title={"SAT/ACT"}
            key={"sub11"}
            mappedValues={[1, 5]}
            options={["Requires SAT/ACT", "Test-optional"]}
            onChange={(newOptions: string[]) => {
              onChangeCheckBoxFilter(newOptions, "SAT/ACT");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub12"} title={"SAT range"}>
          <MinMaxFilter
            key={"sub12"}
            title={"SAT range"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "SAT range");
            }}
            customMaxTxt="Max: 1600"
          />
        </SubMenu>
        <SubMenu key={"sub13"} title={"ACT range"}>
          <MinMaxFilter
            key={"sub13"}
            title={"ACT range"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "ACT range");
            }}
            customMaxTxt="Max: 36"
          />
        </SubMenu>
        <Divider />
        <h6 className="text-secondary">STUDENTS</h6>
        <SubMenu key={"sub14"} title={"Total undergraduate population"}>
          <MinMaxFilter
            key={"sub14"}
            title={"Total undergraduate population"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Total undergraduate population");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub15"} title={"Median debt after graduation"}>
          <MinMaxFilter
            key={"sub15"}
            title={"Median debt after graduation"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Median debt after graduation");
            }}
          />
        </SubMenu>
        <SubMenu
          key={"sub16"}
          title={"Average salary 10 years after graduation"}
        >
          <MinMaxFilter
            key={"sub16"}
            title={"Average salary 10 years after graduation"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(
                min,
                max,
                "Average salary 10 years after graduation"
              );
            }}
          />
        </SubMenu>
        <SubMenu key={"sub17"} title={"Freshman satisfaction (%)"}>
          <MinMaxFilter
            key={"sub17"}
            title={"Freshman satisfaction (%)"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Freshman satisfaction (%)");
            }}
          />
        </SubMenu>
        <SubMenu key={"sub18"} title={"Students receiving aid (%)"}>
          <MinMaxFilter
            key={"sub18"}
            title={"Students receiving aid (%)"}
            onChange={(min: number, max: number): void => {
              onChangeMinMaxFilter(min, max, "Students receiving aid (%)");
            }}
          />
        </SubMenu>
        {/* <div className="center-child w-100">
          <button
            onClick={() => {
              setAllFilters({});
              setFilter({});
            }}
            className="cl-btn-blue py-4"
            style={{ width: "90%" }}
          >
            Clear Filters
          </button>
        </div> */}
      </Menu>
    </SiderWrapper>
  );
};

export default Sider;
