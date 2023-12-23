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
  Radio,
  FormControlLabel,
} from "@mui/material";

import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { topicGetAll, topicUpdate, topicDelete } from 'app/lib/api/topic';

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
  major: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Tên đề tài phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có tên đề tài!'),
  major: Yup.string()
    .min(6, 'Chuyên ngành phải nhiều hơn 6 kí tự')
    .required('Bắt buộc phải có chuyên ngành!'),
});

const PaginationTable = ({ isReload }) => {
  const [subscribarList, setAllTopicData] = useState([]);
  const [isRendered, isRenderedTable] = useState(false);

  const getAllTopic = async () => {
    try {
      const [result, err] = await topicGetAll();
      if (result) {
        console.log("Get all topic successfully", result);
        setAllTopicData(result.content);
        isRenderedTable(false);
      } else {
        console.log("Get all topic fail", err);
      }
    } catch (e) {
      console.log("Process get all topic fail", e);
    }
  }

  useEffect(() => {
    getAllTopic();
  }, [isRendered]);

  useEffect(() => {
    //Flag: sau khi tạo giảng viên thì trigger +1, -1 đẻ chạy api
    if (isReload > 0)
      getAllTopic();
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
      const [result, err] = await topicDelete(request);
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
  const handleChangeRadioGroup = (event) => {
    setMajorValue(event.target.value);
  };

  // Edit Submit
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    console.log("here")
    setLoading(true);
    try {
      const request = {
        "userId": currentEditUser._id,
        "name": values.name,
        "major": majorValue,
      };

      console.log(request)
      const [result, err] = await topicUpdate(request);
      if (result) {
        console.log("Update successfully", result);
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
                <TableCell align="left">{subscriber.name}</TableCell>
                <TableCell align="center">{subscriber.major}</TableCell>
                <TableCell align="center">{subscriber.startDate}</TableCell>
                <TableCell align="center">{subscriber.endDate}</TableCell>
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
            Bạn có chắc chắn muốn xóa đề tài này?
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
                  type="name"
                  name="name"
                  label="Tên đề tài"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(errors.name && touched.name)}
                  sx={{ mb: 3, mt: 1 }}
                />

                <FormControl>
                  <FormLabel id="major">Chuyên ngành</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="major"
                    defaultValue="software"
                    name="major"
                    onChange={handleChangeRadioGroup}
                  >
                    <FormControlLabel value="software" control={<Radio />} label="Phần mềm" />
                    <FormControlLabel value="hardware" control={<Radio />} label="Phần cứng" />
                    <FormControlLabel value="security" control={<Radio />} label="An ninh mạng" />
                  </RadioGroup>
                </FormControl>

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
