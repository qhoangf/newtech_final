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
} from "@mui/material";

import { useState } from "react";

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
    name: "john doe",
    major: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    major: "My Fintech LTD.",
  },
  {
    name: "kessy bryan",
    major: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    major: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    students: [],
  },
];

const PaginationTable = () => {
  // Modal Delete
  const [openDeleteModal, setOpenDelete] = useState(false);
  const handleClickOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

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
            <TableCell align="center">Giáo viên hướng dẫn</TableCell>
            <TableCell align="center">Giáo viên phản biện</TableCell>
            <TableCell align="center">Số lượng thành viên (Tối đa: 3)</TableCell>
            <TableCell align="right"></TableCell>
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
                <TableCell align="center">{subscriber.lecturer}</TableCell>
                <TableCell align="center">{subscriber.reviewer}</TableCell>
                <TableCell align="center">{subscriber.students}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleClickOpenDeleteModal}>
                    <Icon color="error">deleteforever</Icon>
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

      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn hủy hướng dẫn đề tài này?
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
    </Box>
  );
};

export default PaginationTable;
