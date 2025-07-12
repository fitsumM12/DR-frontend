import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardContent, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';

// Function to find the index of the highest probability
const findMaxIndex = (data) => {
    if (!data || data.length === 0) return null; // Handle null or empty data
    let maxIndex = 0;
    let maxValue = data[0];

    for (let i = 1; i < data.length; i++) {
        if (data[i] > maxValue) {
            maxValue = data[i];
            maxIndex = i;
        }
    }
    return maxIndex;
};

// PredictionResult Component
const PredictionResult = ({ data = [0, 0, 0], eye }) => {
    const values = {
      0: 'Non Proliferative DR',
      1: 'Normal',
      2: 'Proliferative DR',
    };
  
    const maxIndex = data ? findMaxIndex(data) : null;
    const result = maxIndex !== null ? values[maxIndex] : 'No data available';
  
    return (
      <Card variant="outlined" sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {eye.charAt(0).toUpperCase() + eye.slice(1)} Eye Diagnosis
          </Typography>
          <Typography variant="subtitle1" color="#fa931d" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowForwardIosIcon sx={{ color: '#fa931d', marginRight: 1, height: '20px' }} /> {result}
          </Typography>
        </CardContent>
      </Card>
    );
  };
// AbnormalityDetection Component

const AbnormalityDetection = ({ leftData, rightData }) => {
  // Helper function to check if the data is abnormal
  const isAbnormal = (data) => data && findMaxIndex(data) !== 1;

  // Determine if the left and right eyes are abnormal
  const leftAbnormal = leftData && isAbnormal(leftData);
  const rightAbnormal = rightData && rightData.length > 0 && isAbnormal(rightData);

  return (
      <Card variant="outlined" sx={{ margin: 2 }}>
          <CardContent>
              <Typography variant="h6" component="div">
                  Abnormality Detection
              </Typography>
              <Typography variant="body1">
                  {/* Display left eye abnormality */}
                  {leftAbnormal && !rightAbnormal ? (
                      <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                          <ReportIcon sx={{ color: 'red', marginRight: 1 }} />
                          Left Eye Abnormality has been detected.
                      </div>
                  ) : null}

                  {/* Display right eye abnormality */}
                  {rightAbnormal && !leftAbnormal ? (
                      <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                          <ReportIcon sx={{ color: 'red', marginRight: 1 }} />
                          Right Eye Abnormality has been detected.
                      </div>
                  ) : null}

                  {/* Display both eyes abnormality */}
                  {leftAbnormal && rightAbnormal ? (
                      <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                          <ReportIcon sx={{ color: 'red', marginRight: 1 }} />
                          Both Eyes Abnormalities have been detected.
                      </div>
                  ) : null}

                  {/* Display no abnormality message */}
                  {!leftAbnormal && !rightAbnormal ? (
                      <div style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
                          <ReportIcon sx={{ color: 'green', marginRight: 1 }} />
                          No abnormality detected.
                      </div>
                  ) : null}
              </Typography>
          </CardContent>
      </Card>
  );
};

export { PredictionResult, AbnormalityDetection };