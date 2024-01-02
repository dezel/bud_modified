import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import {
  EditOutlined,
  Search,
  PeopleOutlineTwoTone,
} from "@mui/icons-material";
import './setup.scss'
import AddIcon from "@mui/icons-material/Add";
import Controls from "../components/controls/Controls";
import PageHeader from "../components/pageheader/PageHeader";
import Popup from "../modals/Popup";
import { useState } from "react";
import AddCompany from "./AddCompany";
import AddBranch from "./AddBranch";
import AddFuneral from "./AddFuneral"

import { tryParse } from "../utils/tryParse";

const Setup = () => {
  const [openCompanyPopup, setOpenCompanyPopup] = useState(false)
  const [openBranchPopup, setOpenBranchPopup] = useState(false)
  const [openFuneralPopup, setOpenFuneralPopup] = useState(false)





  return (
    <div className="userlist">
      <Sidebar />
      <div className="userlistContainer">
        <Navbar />
        <div className="innerContainer">
          <PageHeader
            icon={<PeopleOutlineTwoTone className="headerIcon" />}
            mainTitle="Setup"
          />
          <Controls.Button
            text="Add Company"
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            className="add-button"
            onClick={() => {
              setOpenCompanyPopup(true);
            }}
          />

          <Controls.Button
            text="Add Branch"
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            className="add-button"
            onClick={() => {
              setOpenBranchPopup(true);
            }}
          />
                    <Controls.Button
            text="Add Funeral"
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            className="add-button"
            onClick={() => {
              setOpenFuneralPopup(true);
            }}
          />
          <Popup
            title="Add Company"
            openPopup={openCompanyPopup}
            setOpenPopup={setOpenCompanyPopup}
          >
            <AddCompany />
          </Popup>

          <Popup
            title="Add Branch"
            openPopup={openBranchPopup}
            setOpenPopup={setOpenBranchPopup}
          >
            <AddBranch />
          </Popup>

          <Popup
            title="Add Funeral"
            openPopup={openFuneralPopup}
            setOpenPopup={setOpenFuneralPopup}
          >
            <AddFuneral />
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default Setup