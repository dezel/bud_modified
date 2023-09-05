export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    header: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img src={params.row.img} alt="avatar" className="cellImg" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "age", headerName: "Age", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => (
      <div className={`cellWithStatus ${params.row.status}`}>
        {params.row.status}
      </div>
    ),
  },
];

export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/12883503/pexels-photo-12883503.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jaime Lannister",
    img: "https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "passive",
    email: "2snow@gmail.com",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1633682/pexels-photo-1633682.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "active",
    email: "3snow@gmail.com",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "pending",
    email: "4snow@gmail.com",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/157728/straw-field-hair-nature-157728.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "passive",
    email: "5snow@gmail.com",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/4153188/pexels-photo-4153188.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "active",
    email: "6snow@gmail.com",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "passive",
    email: "7snow@gmail.com",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/2312250/pexels-photo-2312250.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "active",
    email: "8snow@gmail.com",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/821417/pexels-photo-821417.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "pending",
    email: "9snow@gmail.com",
    age: 65,
  },
  {
    id: 10,
    username: "Frances",
    img: "https://images.pexels.com/photos/4156344/pexels-photo-4156344.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "active",
    email: "10snow@gmail.com",
    age: 65,
  },
];
