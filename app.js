const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiKeyAuth = require('./middleware/apiKeyAuth');


dotenv.config();

const deliveryTracking = require('./data/deliveryTrackingSample.json');
const relationshipData = require('./data/RelationshipSample.json');
const shipmentDetails = require('./data/shipmentDetailsSample.json'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiKeyAuth);


/* 
----------------------------------------
Delivery Tracking API Endpoint
----------------------------------------
*/

//get all Delivery Tracking Data
app.get('/api/delivery-tracking', (req, res) => {

    res.json({
        success: true,
        count: deliveryTracking.length,
        message: 'Delivery tracking records retrieved successfully',
        data: deliveryTracking
    });

});


// Get Delivery Tracking Data by AWBTrackingNo
app.get('/api/delivery-tracking/:awb', (req, res) => {
    const awb = req.params.awb;
    const record = deliveryTracking.find(item => item.AWBTrackingNo === awb);

    if (!record) {
        return res.status(200).json({
            success: true,
            message: 'Delivery tracking record not found',
            count: 0,
            data: null
        });
    }

    res.json({
        success: true,
        message: 'Delivery tracking record found',
        count: 1,
        data: record
    });
});


// Get Delivery Tracking Data by CIFNumber
app.get('/api/delivery-tracking-cif/:cif', (req, res) => {
    const cif = req.params.cif;
    const records = deliveryTracking.filter(item => item.CIFNumber === cif);   
     if (!records) {
        return res.status(200).json({
            success: true,
            message: 'Delivery tracking record not found',
            count: 0,
            data: null
        });
    }

    res.json({
        success: true,
        message: 'Delivery tracking records found',
        count: records.length,
        data: records
    });
    
});


/*
----------------------------------------
Shipment Detail API Endpoint
----------------------------------------
*/

// Get Shipment Details by AWBTrackingNo
app.get('/api/shipment-details/:awb', (req, res) => {
    
    const awb = req.params.awb;

    const records = shipmentDetails.filter(
        item => item.AWBTrackingNo === awb);

    if (records.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'Shipment details not found',
            count: 0,
            data: null
        });
    }   

    res.json({
        success: true,
        message: 'Shipment details found',
        count: records.length,
        data: records
    });
});


/*

Get Relationship Data by Customer CIF
*/

app.get('/api/relationship/:cif', (req, res) => {
    const cif = req.params.cif;
    const records = relationshipData.filter(item => item.customercif === cif).sort((a, b) => a.sortorder - b.sortorder);

    if (records.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'Relationship data not found',
            count: 0,
            data: null
        });
    }   

    res.json({
        success: true,
        message: 'Relationship data found',
        count: records.length,
        data: records
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 