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
} from "@mui/material";

import * as Yup from 'yup';
import { useState } from "react";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    topicname: "john doe",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "kessy bryan",
    topicmajor: "My Fintech LTD.",
  },
  {
    topicname: "kessy bryan",
    topicmajor: "My Fintech LTD.",
  },
  {
    topicname: "james cassegne",
    topicmajor: "Collboy Tech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
];


const initialValues = {
  topicname: '',
  topicmajor: '',
};

const validationSchema = Yup.object().shape({
  topicname: Yup.string()
    .min(6, 'Tên đề tài phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có tên đề tài!'),
  topicmajor: Yup.string()
    .min(6, 'Chuyên ngành phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có chuyên ngành!'),
});

const PaginationTable = () => {
  // Modal Delete
  const [openDeleteModal, setOpenDelete] = useState(false);
  const handleClickOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

  // Modal Edit
  const [openEditModal, setOpenEdit] = useState(false);
  const handleClickOpenEditModal = () => setOpenEdit(true);
  const handleCloseEditModal = () => setOpenEdit(false);

  // Edit Submit
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Do something", values);
    } catch (e) {
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
            <TableCell align="left">Tên đề tài</TableCell>
            <TableCell align="center">Chuyên ngành</TableCell>
            <TableCell align="center">Ngày tạo</TableCell>
            <TableCell align="center">Ngày hết hạn</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribarList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{subscriber.topicname}</TableCell>
                <TableCell align="center">{subscriber.topicmajor}</TableCell>
                <TableCell align="center">{subscriber.startDate}</TableCell>
                <TableCell align="center">{subscriber.endDate}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleClickOpenEditModal}>
                    <Icon color="primary">create</Icon>
                  </IconButton>
                  <IconButton onClick={handleClickOpenDeleteModal}>
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
            Bạn có chắc chắn muốn xóa đề tài này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="error">
            Hủy
          </Button>
          <Button onClick={handleCloseDeleteModal} variant="outlined" color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit modal */}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Dialog open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Thông tin đề tài</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  size="small"
                  type="topicname"
                  name="topicname"
                  label="Tên đề tài"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.topicname}
                  onChange={handleChange}
                  helperText={touched.topicname && errors.topicname}
                  error={Boolean(errors.topicname && touched.topicname)}
                  sx={{ mb: 3, mt: 1 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  name="topicmajor"
                  type="topicmajor"
                  label="Chuyên ngành"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.topicmajor}
                  onChange={handleChange}
                  helperText={touched.topicmajor && errors.topicmajor}
                  error={Boolean(errors.topicmajor && touched.topicmajor)}
                />
              </DialogContent>
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
            </Dialog>
          </form>
        )}
      </Formik>
    </Box >
  );
};

export default PaginationTable;