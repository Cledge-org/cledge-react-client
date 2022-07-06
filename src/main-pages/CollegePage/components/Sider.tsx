import React, { useEffect, useState } from "react";
import { Layout, Menu, Divider, Row, Col } from "antd";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";

const { SubMenu } = Menu;
const SiderWrapper = styled.div`
    & .MuiFormGroup-root {
        padding-left: 48px;
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

    & .text-secondary {
        padding-left: 12px;
        font-size: 12px;
    }
`;

interface SiderProps {
    callBack: Function;
}

const Sider = (props: SiderProps) => {
    const [schoolType, setSchoolType] = useState([]);
    const [inStateMax, setinStateMax] = useState(null);
    const [inStateMin, setinStateMin] = useState(null);
    const [outStateMax, setoutStateMax] = useState(null);
    const [outStateMin, setoutStateMin] = useState(null);

    console.log(schoolType);

    let filter = {
        CONTROL: schoolType[0],
        "TUITIONFEE_IN max": inStateMax,
        "TUITIONFEE_IN min": inStateMin,
        "TUITIONFEE_OUT max": outStateMax,
        "TUITIONFEE_OUT min": outStateMin,
    };

    if (
        schoolType.toString() === [].toString() ||
        schoolType.toString() === [2, 1].toString() ||
        schoolType.toString() === [1, 2].toString()
    ) {
        delete filter.CONTROL;
    }

    if (
        filter["TUITIONFEE_IN max"] == null ||
        filter["TUITIONFEE_IN max"] == ""
    ) {
        delete filter["TUITIONFEE_IN max"];
    }
    if (
        filter["TUITIONFEE_IN min"] == null ||
        filter["TUITIONFEE_IN min"] == ""
    ) {
        delete filter["TUITIONFEE_IN min"];
    }
    if (
        filter["TUITIONFEE_OUT max"] == null ||
        filter["TUITIONFEE_OUT max"] == ""
    ) {
        delete filter["TUITIONFEE_OUT max"];
    }
    if (
        filter["TUITIONFEE_OUT min"] == null ||
        filter["TUITIONFEE_OUT min"] == ""
    ) {
        delete filter["TUITIONFEE_OUT min"];
    }
    console.log(filter);

    useEffect(() => {
        props.callBack(filter);
    }, [schoolType, inStateMax, inStateMin, outStateMax, outStateMin]);

    function handleChange(target) {
        const currentIndex = schoolType.indexOf(target.id);
        const newChecked = [...schoolType];
        if (currentIndex === -1) {
            newChecked.push(target.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSchoolType(newChecked);
    }

    return (
        <SiderWrapper>
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ overflow: "scroll", height: "calc(100vh - 59px)" }}>
                <h6 className="text-secondary">GENERAL</h6>
                <SubMenu key="sub1" title="Public / private">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="1"
                                    onChange={(e) => {
                                        handleChange(e.target);
                                    }}
                                />
                            }
                            label="Public School"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="2"
                                    onChange={(e) => {
                                        handleChange(e.target);
                                    }}
                                />
                            }
                            label="Private School"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub2" title="Prestige">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub3" title="College type">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <Divider />
                <h6 className="text-secondary">COST</h6>
                <SubMenu key="sub4" title="In-state tuition">
                    <Box sx={{ display: "flex", flexWrap: "no-wrap" }}>
                        <FormControl sx={{ m: 1, width: "45%" }}>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Min
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                onChange={(e) => {
                                    setinStateMin(e.target.value);
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                label="Amount"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "45%" }}>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Max
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                onChange={(e) => {
                                    setinStateMax(e.target.value);
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                label="Amount"
                            />
                        </FormControl>
                    </Box>
                </SubMenu>
                <SubMenu key="sub5" title="Out-of-state tuition">
                    <Box sx={{ display: "flex", flexWrap: "no-wrap" }}>
                        <FormControl sx={{ m: 1, width: "45%" }}>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Min
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                onChange={(e) => {
                                    setoutStateMin(e.target.value);
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                label="Amount"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "45%" }}>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Max
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                onChange={(e) => {
                                    setoutStateMax(e.target.value);
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                label="Amount"
                            />
                        </FormControl>
                    </Box>
                </SubMenu>
                <Divider />
                <h6 className="text-secondary">APPLICATION REQUIREMENTS</h6>
                <SubMenu key="sub6" title="SAT/ACT policy">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub7" title="SAT average">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub8" title="TOEFL/IELTS">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <Divider />
                <h6 className="text-secondary">STUDENTS</h6>
                <SubMenu key="sub9" title="First year enrollment">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub10" title="Total undergraduate population">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub11" title="Diversity">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub12" title="International student rate">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub13" title="4-year graduation rate">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
                <SubMenu key="sub14" title="6-year graduation rate">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox id="1" />}
                            label="Public School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Private School"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Community College"
                        />
                    </FormGroup>
                </SubMenu>
            </Menu>
        </SiderWrapper>
    );
};

export default Sider;
