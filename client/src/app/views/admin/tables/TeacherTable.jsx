import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";

import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { userGetAll, userUpdate, userDelete } from 'app/lib/api/user';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const initialValues = {
  name: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Tên giảng viên phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có tên giảng viên!'),
  username: Yup.string()
    .min(6, 'Tên đăng nhập phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có tên đăng nhập!'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có mật khẩu!'),
});

const PaginationTable = ({ isReload }) => {
  const [subscribarList, setAllUserData] = useState([]);
  const [isRendered, isRenderedTable] = useState(false);


  const getAllUser = async () => {
    try {
      const [result, err] = await userGetAll({ role: "lecturer" });
      if (result) {
        console.log("Get all user successfully", result);
        setAllUserData(result.content);
        isRenderedTable(false);
      } else {
        console.log("Get all user fail", err);
      }
    } catch (e) {
      console.log("Process get all user fail", e);
    }
  }

  useEffect(() => {
    getAllUser();
  }, [isRendered]);

  useEffect(() => {
    //Flag: sau khi tạo giảng viên thì trigger +1, -1 đẻ chạy api
    if (isReload > 0)
      getAllUser();
  }, [isReload])

  // Modal Delete
  const [openDeleteModal, setOpenDelete] = useState(false);
  const handleClickOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);
  const handleSubmitDeleteModal = async () => {
    try {
      const request = {
        "userId": currentEditUser._id,
      };

      console.log(request)
      const [result, err] = await userDelete(request);
      if (result) {
        console.log("Delete successfully", result);
        setOpenDelete(false);
        isRenderedTable(true);
      } else {
        console.log("Delete fail", err);
      }
    } catch (e) {
      console.log("Process delete fail", e);
    }
  }

  // Modal Edit
  const [currentEditUser, setCurrentEditUser] = useState({});
  const [openEditModal, setOpenEdit] = useState(false);
  const handleClickOpenEditModal = () => setOpenEdit(true);
  const handleCloseEditModal = () => setOpenEdit(false);
  const [majorValue, setMajorValue] = useState("software");
  const [isLeader, setIsLeader] = useState(false);
  const handleChangeCheckBox = (event) => {
    setIsLeader(event.target.checked);
  };
  const handleChangeRadioGroup = (event) => {
    setMajorValue(event.target.value);
  };

  // Edit Submit
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const request = {
        "userId": currentEditUser._id,
        "name": values.name,
        "username": values.username,
        "password": values.password,
        "major": majorValue,
        "isLeader": isLeader,
        "role": "lecturer",
      };

      console.log(request)
      const [result, err] = await userUpdate(request);
      if (result) {
        console.log("Update successfully", result);
        setOpenEdit(false);
        setLoading(false);
        isRenderedTable(true);
      } else {
        console.log("Update fail", err);
        setLoading(false);
      }
    } catch (e) {
      console.log("Process update fail", e);
      setLoading(false);
    }
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên giảng viên</TableCell>
            <TableCell align="center">Chuyên ngành</TableCell>
            <TableCell align="center">Trưởng bộ môn</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribarList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{subscriber.name}</TableCell>
                <TableCell align="center">
                  {(() => {
                    switch (subscriber.major?.toLowerCase()) {
                      case "software":
                        return "Phần mềm";
                      case "hardware":
                        return "Phần cứng";
                      case "security":
                        return "An ninh mạng";
                      default:
                        return subscriber.major;
                    }
                  })()}
                </TableCell>
                <TableCell align="center">
                  {(subscriber.isLeader) ? <Icon color="success">done</Icon> : <></>}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => { setCurrentEditUser(subscriber); handleClickOpenEditModal(); }}>
                    <Icon color="primary">create</Icon>
                  </IconButton>
                  <IconButton onClick={() => { setCurrentEditUser(subscriber); handleClickOpenDeleteModal(); }}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={subscribarList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        labelRowsPerPage="Số dòng mỗi trang"
      />

      {/* Delete modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa giảng viên này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="error">
            Hủy
          </Button>
          <Button onClick={handleSubmitDeleteModal} variant="outlined" color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thông tin giảng viên</DialogTitle>
        <DialogContent>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={currentEditUser}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>

                <TextField
                  fullWidth
                  size="small"
                  type="name"
                  name="name"
                  label="Tên giảng viên"
                  variant="outlined"
                  onBlur={handleBlur}
                  //defaultValue={currentEditUser?.name}
                  value={values?.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(errors.name && touched.name)}
                  sx={{ mb: 3, mt: 1 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  name="username"
                  type="username"
                  label="Tên đăng nhập"
                  variant="outlined"
                  onBlur={handleBlur}
                  //defaultValue={currentEditUser?.username}
                  value={values?.username}
                  onChange={handleChange}
                  helperText={touched.username && errors.username}
                  error={Boolean(errors.username && touched.username)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  variant="outlined"
                  onBlur={handleBlur}
                  //defaultValue={currentEditUser?.password}
                  value={values?.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={Boolean(errors.password && touched.password)}
                  sx={{ mb: 1.5 }}
                />

                <FormControl
                  sx={{ mb: 1.5 }}
                >
                  <FormLabel id="major">Chuyên ngành</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="major"
                    defaultValue={currentEditUser.major}
                    name="major"
                    onChange={handleChangeRadioGroup}
                  >
                    <FormControlLabel value="software" control={<Radio />} label="Phần mềm" />
                    <FormControlLabel value="hardware" control={<Radio />} label="Phần cứng" />
                    <FormControlLabel value="security" control={<Radio />} label="An ninh mạng" />
                  </RadioGroup>
                </FormControl>

                <br />

                <FormControl
                  sx={{ mb: 1.5 }}
                >
                  <FormLabel >Phân công</FormLabel>
                  <FormControlLabel required control={<Checkbox defaultChecked={currentEditUser.isLeader} onChange={handleChangeCheckBox} />} label="Trưởng bộ môn" />
                </FormControl>


                <DialogActions>
                  <Button color="error" onClick={handleCloseEditModal}>
                    Hủy
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ mr: 2 }}
                  >
                    Chỉnh sửa
                  </LoadingButton>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box >
  );
};

export default PaginationTable;
