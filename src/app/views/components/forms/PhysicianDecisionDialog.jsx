import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { submitPhysicianDecision } from 'app/apis/patients_api';

const PhysicianDecisionDialog = ({ open, onClose, Result }) => {
  const [approval, setApproval] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [disease, setDisease] = useState('');
  // console.log("id", Result)
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('approval', approval);
    formData.append('feedback', feedback);
    formData.append('disease', disease);
    if (Result && Result?.id) {
      formData.append('result', Result.id); 
    }

    try {
      await submitPhysicianDecision(formData);
      onClose(); 
    } catch (error) {
      console.error("Error submitting decision:", error);
    }
  };

  const values = {
    0: 'Non Proliferative DR',
    1: 'Normal',
    2: 'Proliferative DR',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="physician-decision-dialog-title"
    >
      <DialogTitle id="physician-decision-dialog-title">
        Physician Decision
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your decision and feedback regarding the patient's condition.
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={approval}
              onChange={(e) => setApproval(e.target.checked)}
              color="primary"
            />
          }
          label="Approve Decision"
        />
        <TextField
          autoFocus
          margin="dense"
          label="Feedback"
          type="text"
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          fullWidth
          variant="outlined"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select Disease</option>
          {Object.entries(values).map(([key, label]) => (
            <option key={key} value={label}>
              {label}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhysicianDecisionDialog;
