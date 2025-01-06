import React, { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as XLSX from 'xlsx'; // Import for Excel
import jsPDF from 'jspdf'; // Import for PDF
import 'jspdf-autotable'; // Import for using autotable with jsPDF
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import loadingGif from '../../Assets/img2.gif'

const GetDataAvailability = ({ selecteddate, profile, officess, names }) => {
    const [tableData, setTableData] = useState([]);
    const [start, setStart] = useState(0);
    const [loading, setLoading] = useState(true);
    const [exportFormat, setExportFormat] = useState(''); 
    const [recordsTotal, setRecordsTotal] = useState(null);
    const length = 10;
    console.log(selecteddate);
    const fetchTableData = useCallback(async () => {
        if (!profile) return;
    
        const endpoints = {
          "Daily Load Profile": {
            received: `/api/server3/UHES-0.0.1/WS/ServerpaginationForEDDARReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            notReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForEDDANotRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`
          },
          "Block Load Profile": {
            received: `/api/server3/UHES-0.0.1/WS/ServerpaginationForLPDARReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            notReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForLPDANRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            partiallyReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForLPDAPRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`
          },
           "Monthly Billing": {
            received:`/api/server3/UHES-0.0.1/WS/ServerpaginationForEOBDAReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            notReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForEOBDANRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`
          },
          "Instantaneous": {
            received: `/api/server3/UHES-0.0.1/WS/ServerpaginationForInstantaneousDARReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            notReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForInstantaneousDANotRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`
          },
          "Instantaneous Push": {
            received: `/api/server3/UHES-0.0.1/WS/ServerpaginationForINSTDPushDARReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`,
            notReceived: `/api/server3/UHES-0.0.1/WS/ServerpaginationForINSTDPushDANRReport?applyMaskingFlag=N&draw=2&length=${length}&lpDate=${selecteddate}&office=${officess}&start=${start}`
          }
          // Additional profile endpoints as required...
        };
    
        try {
          const tokenResponse = await fetch('/api/server3/UHES-0.0.1/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'password',
              username: 'Admin',
              password: 'Admin@123',
              client_id: 'fooClientId',
              client_secret: 'secret',
            }),
          });
          if (!tokenResponse.ok) throw new Error('Failed to authenticate');
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            if(names === 'Received'){
                const response = await fetch(endpoints[profile].received, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataresponse = await response.json();
                console.log(dataresponse)
                setTableData(dataresponse.data);
                setRecordsTotal(dataresponse.recordsTotal);
            }
            else if(names === 'Yet to receive'){
                const response = await fetch(endpoints[profile].notReceived, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataresponse = await response.json();
                console.log(dataresponse)
                setTableData(dataresponse.data);
                setRecordsTotal(dataresponse.recordsTotal);
            }
            else if(names === 'Partially Received'){
                const response = await fetch(endpoints[profile].partiallyReceived, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const dataresponse = await response.json();
                console.log(dataresponse)
                setTableData(dataresponse.data);
                setRecordsTotal(dataresponse.recordsTotal);
            }
        } catch (error) {
          console.error("Error fetching table data:", error);
        }finally {
          setLoading(false);
        }
      }, [start]);
    
      const exportToCSV = () => {
        const csvData = tableData.map(row => ({
          METERNO: row.METERNO,
          MeterLastCommunicated: row.MeterLastCommunicated,
          // Add other fields as needed
        }));
    
        const csvContent = [
          Object.keys(csvData[0]).join(','), // Header
          ...csvData.map(row => Object.values(row).join(','))
        ].join('\n');
    
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      // Export function for Excel with adjusted column widths
      const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');
        const headers = Object.keys(tableData[0] || {});
        const title = worksheet.addRow([`${selecteddate}`]); // Replace with your title text
        title.font = { bold: true, size: 16, color: { argb: 'FFFF00' } }; // Set font color and size
        title.alignment = { horizontal: 'center' };
        worksheet.mergeCells('A1', `${String.fromCharCode(64 + headers.length)}1`);
    
        const headerRow = worksheet.addRow(headers);
    
        headerRow.eachCell((cell) => {
          cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // White font color
          cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFADD8E6' }, // Black background color
          };
      });
    
        // Add data rows
        tableData.forEach(row => {
            worksheet.addRow(Object.values(row));
        });
    
        worksheet.autoFilter = {
          from: 'A2', // Starting cell of the filter (top-left corner)
          to: `${String.fromCharCode(64 + headers.length)}2` // Ending cell (top-right corner based on header count)
      };
    
        // Adjust column widths based on the max length of the column data
        headers.forEach((header, index) => {
            const maxLength = Math.max(
                header.length, // Length of the header
                ...tableData.map(row => row[header] ? row[header].toString().length : 0) // Length of the content
            );
            worksheet.getColumn(index + 1).width = maxLength + 2; // Adding padding
        });
    
        // Generate Excel file and trigger download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${selecteddate}.xlsx`);
    };
    
      // Export function for PDF
      const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["METERNO", "MeterLastCommunicated"]; // Add more columns based on your data structure
        const tableRows = [];
    
        tableData.forEach(row => {
          tableRows.push([row.METERNO, row.MeterLastCommunicated]);
          // Add other fields as needed
        });
    
        doc.autoTable(tableColumn, tableRows);
        doc.save('data.pdf');
      };
    
      const columnDefs = [
        { headerName: "MTR_NUMBER", field: "MTR_NUMBER", sortable: true, filter: true, flex:1 },
        { headerName: "LAST_CAPTURE_TIME", field: "LAST_CAPTURE_TIME", sortable: true, filter: true,flex:1 },
      ];
    
      useEffect(() => {
        fetchTableData();
      }, [start]);
    
      const handleNextPage = () => setStart((prevStart) => prevStart + length);
      const handlePreviousPage = () => setStart((prevStart) => Math.max(prevStart - length, 0));
    
      // Calculate the current page number
      const currentPage = Math.floor(start / length) + 1;
      const totalPages = Math.ceil(recordsTotal / length);
    
    
      const handleExport = (value) => {
        switch (value) {
          case 'csv':
            exportToCSV();
            break;
          case 'excel':
            exportToExcel();
            break;
          case 'pdf':
            exportToPDF();
            break;
          default:
            break;
        }
      };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <div>
        <select
          id="export-format"
          value={exportFormat}
          onChange={(e) => handleExport(e.target.value)}
          style={{height:'30px'}}
        >
          <option value="">Export</option>
          <option value="csv">CSV</option>
          <option value="excel">Excel</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
      {loading ? (
        <img src={loadingGif} alt="Loading..." style={{ width: '150px', height: '150px', margin:'50px 350px' }} />
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <AgGridReact rowData={tableData} columnDefs={columnDefs} onGridReady={fetchTableData} />
        </div>
      )}

      <div style={{ marginTop: '20px', display:'flex', justifyContent:'space-between' }}>
        <span style={{ marginLeft: '10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handlePreviousPage} disabled={start === 0} style={{backgroundColor:'black', color:'white'}}>Previous</button>
        <button onClick={handleNextPage} disabled={start + length >= recordsTotal} style={{backgroundColor:'black', color:'white'}}>Next</button>
      </div>
    </div>
  );
};

export default GetDataAvailability;
