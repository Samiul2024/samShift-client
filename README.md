# 📦 SendParcel Feature

## Overview

The **SendParcel** component is a complete parcel booking system with:

- Parcel Type selection (document / non-document)  
- Parcel title and weight input (weight only for non-documents)  
- Dynamic sender and receiver information including:  
  - Name, contact, region, district, service center, address, and instructions  
- **Live delivery cost calculation** based on parcel type, weight, and whether the sender & receiver are in the same district  
- **Confirmation toast** showing delivery cost and a confirm button  
- Console logging of parcel data upon confirmation  
- Automatic form reset after confirmation  

---

## 🔧 Dependencies

Install the required dependencies:

```bash
npm install react-hook-form react-hot-toast react-router