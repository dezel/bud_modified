import "./userdatatable.scss";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import noImg from "./../../images/no_img.jpg";

const UserDatatable = ({ users, toggleModal, onUserDelete }) => {
  const columns = [
    { field: "staff_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userImgContainer">
            <img className="userImg" src={noImg} alt="" />
            {params.row.fullname}
          </div>
        );
      },
    },
    { field: "username", headerName: "Username", width: 200 },
    {
      field: "user_type",
      headerName: "User Type",
      width: 120,
    },
    {
      field: "user_status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="actionContainer">
            {/* <Link
              style={{ textDecoration: "none" }}
              to={"/users/" + params.row.id}
            > */}
            <div className="editButton" onClick={() => toggleModal()}>
              Edit
            </div>
            {/* </Link> */}
            <DeleteOutline
              className="deleteButton"
              onClick={() => onUserDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="userdatatable">
      <div className="userdatatableTitle">
        Add New user
        <Link to="/users/new" className="link">
          Add new
        </Link>
      </div>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        rowsPerPageOptions={[8]}
      />
    </div>
  );
};

export default UserDatatable;
