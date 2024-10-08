import { NextApiRequest, NextApiResponse } from "next";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import dicts from "../../../../college-search-tool/assets/cst_result_parse.json";
import { MongoClient } from "mongodb";

// References:
// https://docs.microsoft.com/en-us/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest

// Data Master List:
// https://docs.google.com/document/d/1K6c2FKCbVZgcndtt0A7tJAf2QgC4rzy9Tmxvf-mus9M/edit

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const { college_id } = req.body;
    const collegeSearchResult = await getSingleCollegeInfo(college_id);
    resolve.status(200).send(collegeSearchResult);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Return a list of colleges that contains formatted attributes
// *For Searching colleges based on filters and search text*
export const getSingleCollegeInfo = (collegeId: String): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegedata_db = await client.db("colleges");
      const singleCollegeData = await collegedata_db
        .collection("colleges-data")
        .findOne({ college_id: collegeId });
      let output = formatOutput(singleCollegeData, client, err);
      res(output);
    } catch (e) {
      err(res);
    }
  });
};

const formatOutput = async (college: any,  client: MongoClient, err: any) => {
  try {
    const image_db = await client.db("images");
    const imageRes = await image_db
      .collection("college_images")
      .findOne({ INSTID: college["college_id"] });
    const output = {
      img_title: imageRes["img_title"],
      img_wiki_link: imageRes["img_wiki_link"],
      img_link: imageRes["img_link"],
      img_description: imageRes["img_description"],
      college_id: college["college_id"],
      title: college["INSTNM"],
      region: college["REGION"],
      college_abbrev: college["IALIAS"],
      institution_url: college["INSTURL"],
      net_price_url: college["NPCURL"],
      location: college["CITY"] + ", " + college["STABBR"],
      college_type: dicts.college_type_dict[college["CONTROL"]],
      tuition_and_fee: college["TUFEYR3"],
      "in-state_tuition": college["TUITIONFEE_IN"],
      "out-state_tuition": college["TUITIONFEE_OUT"],
      abbreviation: college["IALIAS"],
      coordinates: {
        latitude: college["LATITUDE"],
        longitude: college["LONGITUDE"],
      },
      introduction: null,
      urbanization: college["LOCALE2"],
      inst_size: dicts.inst_size[college["INSTSIZE"]],
      religious_affiliation: dicts.religious_affiliation[college["RELAFFIL"]],
      standard_address:
        college["ADDR"] +
        "\n" +
        college["CITY"] +
        ", " +
        college["STABBR"] +
        " " +
        college["ZIP"],
      contact_phone_num: college["GENTELE"],
      application_requirement: null,
      application_fee: college["APPLFEEU"],
      "sat/act_score": {
        sat_critical_reading_25: college["SATVR25"],
        sat_critical_reading_75: college["SATVR75"],
        sat_math_25: college["SATMT25"],
        sat_math_75: college["SATMT75"],
        sat_writing_25: null, // college["SATWR25"]; need to find valid data
        sat_writing_75: null, // college["SATWR75"]
        sat_critical_reading_50: college["SATVRMID"],
        sat_math_50: college["SATMTMID"],
        sat_writing_50: null, // college["SATWRMID"]
        act_cumulative_25: college["ACTCM25"],
        act_cumulative_50: college["ACTCMMID"],
        act_cumulative_75: college["ACTCM75"],
        sat_avg: college["SAT_AVG"],
      },
      acceptance_rate: {
        acceptance_rate_total: college["ADM_RATE"],
        acceptance_rate_men: college["DVADM02"],
        acceptance_rate_women: college["DVADM03"],
        commit_rate_men: college["DVADM08"],
        commit_rate_women: college["DVADM09"],
      },
      submit_sat_percent: college["SATPCT"],
      submit_act_percent: college["ACTPCT"],
      offer_rotc: dicts.binary[college["SLO5"]],
      ncaa: {
        member_ncaa: dicts.binary[college["ASSOC1"]],
        ncaa_football: dicts.binary_2[college["SPORT1"]],
        ncaa_basketball: dicts.binary_2[college["SPORT2"]],
        ncaa_baseball: dicts.binary_2[college["SPORT3"]],
        ncaa_cross_country_track: dicts.binary_2[college["SPORT4"]],
      },
      applicants_per_year: (college["APPLCNM"] && college["APPLCNW"]) ? (college["APPLCNW"] + college["APPLCNM"]) : null,
      matriculation_rate: null,
      student_faculty_ratio: college["STUFACR"],
      calendar_system: dicts.calendar_system[college["CALSYS"]],
      study_disciplines: formatStudyDisciplines(college, dicts.cds_categories),
      bachelor_degree_disciplines: formatBachlStudyDisciplines(
        college,
        dicts.cds_categories_bachl
      ),
      enrollment: {
        total_undergrad: college["EFUG"],
        total_grad: college["EFGRAD"],
        full_time_undergrad: college["FT_UG"],
        first_year_students: null,
        enrolled_men: college["ENRLM"],
        enrolled_women: college["ENRLW"],
        admission_yield: college["DVADM04"],
      },
      percent_first_gen: college["FIRST_GEN"],
      percent_undergrad_out_state: college["RMOUSTTP"],
      percent_undergrad_in_state: college["RMINSTTP"],
      percent_undergrad_residence_unknown: college["RMUNKNWP"],
      instructional_staff: {
        total: college["SAINSTT"],
        women: college["SAINSTW"],
        men: college["SAINSTM"],
      },
      research_staff_count: college["SANIN02"],
      grant: {
        pell_administered: college["F2C01"],
        other_federal: college["F2C02"],
        state_grant: college["F2C03"],
        local_grant: college["F2C04"],
        total_grant: college["F2C07"],
        net_grant_aided: college["F2E081"],
      },
      student_service_expense_per_fte: college["F1STSVFT"],
      instruction_expense_per_fte: college["F1ACSPFT"],
      other_expense_per_fte: college["F1OTEXFT"],
      live_off_campus_student_count: college["GIS4OF1"],
      avg_grant_scholarship_75_110_18_19: college["GIS4A41"],
      tt_grant_scholarship_gt110_18_19: college["GIS4T51"],
      avg_net_48_75_iv_federal_aid_17_18: college["NPT430"],
      avg_net_75_110_iv_federal_aid_17_18: college["NPT440"],
      avg_net_gt110_iv_federal_aid_17_18: college["NPT450"],
      num_grant_scholarship_0_30_18_19: college["GRN4G11"],
      num_grant_scholarship_30_48_18_19: college["GRN4G21"],
      num_grant_scholarship_48_75_18_19: college["GRN4G31"],
      avg_cost_room_and_board: college["RMBRDAMT"],
      mission_statement: college["MISSION"],
      estimate_cost_in_state_living_on_campus: college["CINSON"],
      estimate_cost_out_state_living_on_campus: college["COTNSON"],
      estimate_cost_in_state_living_off_campus: college["CINSOFF"],
      estimate_cost_out_state_living_off_campus: college["COTSOFF"],
      estimate_tuition_in_state: college["TUITION2"],
      estimate_tuition_out_state: college["TUITION3"],
      instituional_category: dicts.institutional_category[college["INSTCAT"]],
      "land_grant_institution?":
        dicts["land_grant_institution?"][college["LANDGRNT"]],
      carnegie_class_18_undergrad_instructional_program:
        dicts.carnegie_class_18_undergrad_instructional_program[
          college["C18IPUG"]
        ],
      carnegie_class_18_undergrad_profile:
        dicts.carnegie_class_18_undergrad_profile[college["C18UGPRF"]],
      carnegie_class_18_undergrad_enrollment_profile:
        dicts.carnegie_class_18_undergrad_enrollment_profile[
          college["C18ENPRF"]
        ],
      carnegie_class_18_size_setting:
        dicts.carnegie_class_18_size_setting[college["C18SZSET"]],
      retention_rate_4_years: college["RET_FT4"],
      retention_rate_lt_4_years: college["RET_FTL4"],
      "4_year_graduation_rate": college["BAGR100"],
      "6_year_graduation_rate": college["BAGR150"],
      num_no_pell_stafford_loan_award_lt4_academic_150: college["NRCMOBA"],
      num_no_pell_stafford_loan_award_150: college["NRCMTOT"],
      open_admission_policy: dicts.binary_2[college["OPENADMP"]],
      "admission policy": {
        coeducational: null,
        men_only: college["MENONLY"] == 1,
        women_only: college["WOMENONLY"] == 1,
      },
      admission_factors: {
        high_school_gpa: dicts.adm_factors[college["ADMCON1"]],
        high_school_rank: dicts.adm_factors[college["ADMCON2"]],
        high_school_record: dicts.adm_factors[college["ADMCON3"]],
        completion_college_prep: dicts.adm_factors[college["ADMCON4"]],
        letters_of_recommendation: dicts.adm_factors[college["ADMCON5"]],
        formal_demonstration_of_competencies:
          dicts.adm_factors[college["ADMCON6"]],
        standardized_test_scores: dicts.adm_factors[college["ADMCON7"]],
      },
      tt_undergrad: college["SCFA2"],
      percent_full_time_first_time_finance: {
        any_aid: college["ANYAIDP"],
        pell_grants: college["PGRNT_P"],
        other_federal_grant_aid: college["OFGRT_P"],
        federal_loan: college["FLOAN_P"],
        other_loan: college["OLOAN_P"],
      },
      percent_undergrad_grant_aid: college["UAGRNTP"],
      percent_undergrad_pell_grant: college["UPGRNTP"],
      percent_undergrad_federal_loan: college["UFLOANP"],
      avg_grant_aid: college["AGRNT_A"],
      avg_grant_scholarship_19_20: {
        "0_30": college["GIS4A12"],
        "30_48": college["GIS4A22"],
        "48_75": college["GIS4A32"],
        "75_110": college["GIS4A42"],
        gt110: college["GIS4A52"],
        net_price: college["NPIST2"],
      },
      non_resident_alien_total: college["EFNRALT"],
      grand_total_men: college["EFAGE07"],
      grand_total_women: college["EFAGE08"],
      total_enrollment_size: college["ENRTOT"],
      student_ethnicity_ratio: {
        white: college["UGDS_WHITE"],
        black_african_american: college["UGDS_BLACK"],
        hispanic_or_latino: college["UGDS_HISP"],
        asian: college["UGDS_ASIAN"],
        american_indian_or_alaska_native: college["UGDS_AIAN"],
        native_hawaiian_or_pacific_islander: college["UGDS_NHPI"],
        non_resident_aliens: college["UGDS_NRA"],
        unknown: college["UGDS_UNKN"],
        two_or_more_races: college["UGDS_2MOR"],
      },
      family_income_public: {
        "0_30": college["NPT41_PUB"],
        "30_48": college["NPT42_PUB"],
        "48_75": college["NPT43_PUB"],
        "75_110": college["NPT44_PUB"],
        "110+": college["NPT45_PUB"],
      },
      family_income_private: {
        "0_30": college["NPT41_PRIV"],
        "30_48": college["NPT42_PRIV"],
        "48_75": college["NPT43_PRIV"],
        "75_110": college["NPT44_PRIV"],
        "110+": college["NPT45_PRIV"],
      },
      median_debt: {
        completed: college["GRAD_DEBT_MDN"],
        "0_30": college["LO_INC_DEBT_MDN"],
        "30_75": college["MD_INC_DEBT_MDN"],
        "75+": college["HI_INC_DEBT_MDN"],
        first_gen: college["FIRSTGEN_DEBT_MDN"],
        not_first_gen: college["NOTFIRSTGEN_DEBT_MDN"],
      },
      unemployment_rate: college["UNEMP_RATE"],
      "10_yrs_after_entry.working_not_enrolled": {
        mean_earnings: college["MN_EARN_WNE_P10"],
        "earnings_percentile.10": college["PCT10_EARN_WNE_P10"],
        "earnings_percentile.25": college["PCT25_EARN_WNE_P10"],
        "earnings_percentile.75": college["PCT75_EARN_WNE_P10"],
        "earnings_percentile.90": college["PCT90_EARN_WNE_P10"],
      },
      "6_yrs_after_entry.working_not_enrolled": {
        "earnings_percentile.10": college["PCT10_EARN_WNE_P6"],
        "earnings_percentile.25": college["PCT25_EARN_WNE_P6"],
        "earnings_percentile.75": college["PCT75_EARN_WNE_P6"],
        "earnings_percentile.90": college["PCT90_EARN_WNE_P6"],
      },
      college_fit_metric: {
        target: college["TARGET_TIER"],
        safety: college["SAFETY_TIER"],
      },
    };
      output["admission"] = college["admission"];
      output["financials"] = college["financials"];
      output["academics"] = college["academics"];
      output["campus_life"] = college["campus_life"];
      output["students"] = college["students"];
      output["undergraduate majors"] = college["undergraduate majors"];

    return output;
  } catch (e) {
    console.log(e)
    err(e);
    return {};
  }
};

const formatStudyDisciplines = (college, cds_categories) => {
  const studyDisciplines = {};
  Object.keys(cds_categories).forEach(function (curDisName) {
    studyDisciplines[curDisName] = college[cds_categories[curDisName]];
  });
  return studyDisciplines;
};

const formatBachlStudyDisciplines = (college, cds_categories_bachl) => {
  const bachl = {};
  Object.keys(cds_categories_bachl).forEach(function (curDisName) {
    bachl[curDisName] = college[cds_categories_bachl[curDisName]] == 1;
  });
  return bachl;
};

const getCollegeLabel = (userTier, targetTier, safetyTier) => {
  if (userTier < targetTier) {
    return 2;
  } else if (userTier >= safetyTier) {
    return 0;
  } else {
    return 1;
  }
};

const truncateNumericalResult = (collegeField) => {
  return typeof collegeField === "number"
    ? Math.round((collegeField + Number.EPSILON) * 100) / 100
    : collegeField;
};

const reportZeroAsNoData = (collegeField) => {
  return collegeField === 0 ? null : collegeField;
};
