import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogConfirmDel = ({ open, closeDialog, title, desc, deleteFunction }) => {
    return (
        <>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {desc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" onClick={closeDialog}>Cancel</Button>
                    <Button color="error" onClick={deleteFunction}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogConfirmDel