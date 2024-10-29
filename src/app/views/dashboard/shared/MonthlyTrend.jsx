import React, { useState, useEffect } from "react";
import { Grid, Box,Paper, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlyPatientCount, monthlyPredictionCount, patientFollowups } from "app/apis/patients_api";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
const MonthlyTrend = () => {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [monthlyPatient, setMonthlyPatient] = useState([]);
    const [monthlyPrediction, setMonthlyPrediction] = useState([]);

    useEffect(() => {
        const fetchMonthlyData = async (year) => {
            try {
                const patientData = await monthlyPatientCount(year);
                setMonthlyPatient(patientData);
            } catch (error) {
                console.error("Error fetching patient trends", error);
                throw error;
            }

            try {
                const predictionData = await monthlyPredictionCount(year);
                setMonthlyPrediction(predictionData);
            } catch (error) {
                console.error("Error fetching prediction trends", error);
                throw error;
            }

        };

        fetchMonthlyData(selectedYear);
    }, [selectedYear]);

    const chartData = monthlyPatient.map(patient => {
        const prediction = monthlyPrediction.find(pred => pred.month === patient.month);
        return {
            month: patient.month,
            patient_count: patient.patient_count,
            prediction_count: prediction ? prediction.prediction_count : 0,
        };
    });
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={3} style={{
                    padding: 20,
                    borderRadius: 10,
                    border: '1px solid rgba(95, 96, 164, 0.5)',
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={1} md={1} sm={1} lg={1}></Grid>
                        <Grid item xs={4} md={3} sm={3} lg={3}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    label="Year"
                                    sx={{ height: '40px', lineHeight: '56px' }}
                                >
                                    {[...Array(7).keys()].map(i => (
                                        <MenuItem key={i} value={2024 + i}>{2024 + i}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7} md={8} sm={8} lg={8}>
                            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                                <QueryStatsIcon sx={{ marginRight: 2 }} />
                                <Typography variant="h9" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#181b62' }}>
                                    Monthly Statistics
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} />
                                <YAxis tick={{ fontSize: 12, fill: '#555' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#333',
                                        borderRadius: '8px',
                                        border: 'none',
                                        color: '#fff'
                                    }}
                                    labelStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" align="center" wrapperStyle={{ bottom: -10, right: 10 }} />
                                <Line
                                    type="monotone"
                                    dataKey="patient_count"
                                    stroke="#43A047"
                                    strokeWidth={1.5}
                                    name="Patient"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="prediction_count"
                                    stroke="#FB8C00"
                                    strokeWidth={1.5}
                                    name="Prediction"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
                            No data available for {selectedYear}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MonthlyTrend;