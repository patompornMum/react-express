import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button, Container, FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Components
import DialogConfirmDel from '../../DialogConfirmDel';

//React Toastify
import { toast } from 'react-toastify';

//service
import { changeRole, changeStatus, deleteUser, list } from '../../../services/user';

//redux
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function UserManage() {
  //state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //state delete user
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  //redux
  const { user: reduxUser } = useSelector((state) => ({ ...state }));
  const token = reduxUser.info.token;

  useEffect(() => {
    loadDataUser(token);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeStatus = async (event, id) => {
    const status = (event.target.checked) ? 'enable' : 'disable';

    await changeStatus(token, id, { status: status })
      .then((res) => {
        toast.success(res.data.msg)
        loadDataUser(token);
      })
      .catch((err) => console.log(err))
  };

  const handleChangeRole = async (event, id) => {
    console.log(event.target.value, id)
    const role = event.target.value;

    await changeRole(token, id, { role: role })
      .then((res) => {
        toast.success(res.data.msg)
        loadDataUser(token);
      })
      .catch((err) => console.log(err))
  }

  const openModalConfirmDelete = (dataUser) => {
    setModalConfirmOpen(true)
    setDeleteData(dataUser)
  }

  // const handleDeleteUser = async (id) => {
  //   console.log(`Delete ${id}`);
  //   await deleteUser(token, id)
  //     .then((res) => {
  //       toast.success(res.data.msg)
  //       loadDataUser(token)
  //     })
  //     .catch((err) => console.log(err))
  // }
  const serviceDeleteUser = async () => {
    let deleteId = deleteData?.id;
    await deleteUser(token, deleteId)
      .then((res) => {
        setModalConfirmOpen(false)
        toast.success(res.data.msg)
        loadDataUser(token)
      })
      .catch((err) => console.log(err))
  }

  const loadDataUser = async (token) => {
    console.log('LoadData')
    await list(token)
      .then((res) => {
        setData(res.data)
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tool</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        {item.username}
                      </TableCell>
                      {/* <TableCell>
                        {item.role}
                      </TableCell> */}
                      <TableCell>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel id="">Role</InputLabel>
                          <Select
                            value={item.role}
                            label="Role"
                            onChange={(e) => handleChangeRole(e, item.id)}
                          >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status === 'enable'}
                          // defaultChecked={item.status === 'enable'}
                          onChange={(e) => handleChangeStatus(e, item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => openModalConfirmDelete(item)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <DialogConfirmDel
        open={modalConfirmOpen}
        closeDialog={() => setModalConfirmOpen(false)}
        title={`Are you sure Delete?`}
        desc={`Delete Username : ${deleteData?.username}`}
        deleteFunction={serviceDeleteUser}
      />
    </Container>
  );
}
